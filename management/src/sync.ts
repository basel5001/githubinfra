import { Octokit } from "@octokit/rest"
import { load, resolve_repo } from "./config.js"

const dry = process.argv.includes("--dry-run")
const token = process.env.GITHUB_TOKEN
if (!token) throw new Error("GITHUB_TOKEN required")

const octokit = new Octokit({ auth: token })
const config = load()
const owner = config.owner

async function sync_settings(name: string) {
  const repo = resolve_repo(config, name)
  const log = (msg: string) => console.log(`  ${dry ? "[DRY RUN] " : ""}${msg}`)

  console.log(`\n=== ${name} ===`)

  // Repo settings
  log(`description: ${repo.description}`)
  log(`topics: ${repo.topics.join(", ")}`)
  log(`delete_branch_on_merge: ${repo.delete_branch_on_merge}`)

  if (!dry) {
    await octokit.repos.update({
      owner, repo: name,
      description: repo.description,
      delete_branch_on_merge: repo.delete_branch_on_merge,
      allow_squash_merge: repo.allow_squash_merge,
      allow_merge_commit: repo.allow_merge_commit,
      allow_rebase_merge: repo.allow_rebase_merge,
      has_issues: repo.has_issues,
      has_wiki: repo.has_wiki,
      has_projects: repo.has_projects,
    })

    await octokit.repos.replaceAllTopics({ owner, repo: name, names: repo.topics })

    // Vulnerability alerts
    if (repo.vulnerability_alerts) {
      await octokit.repos.enableVulnerabilityAlerts({ owner, repo: name }).catch(() => {})
    }
  }

  // Branch protection
  const branch = repo.default_branch || "main"
  const bp = repo.branch_protection!
  log(`branch_protection on ${branch}: reviews=${bp.required_reviews}, enforce_admins=${bp.enforce_admins}`)

  if (!dry) {
    try {
      await octokit.repos.updateBranchProtection({
        owner, repo: name, branch,
        required_status_checks: bp.required_status_checks.length > 0
          ? { strict: true, contexts: bp.required_status_checks }
          : null,
        enforce_admins: bp.enforce_admins,
        required_pull_request_reviews: {
          required_approving_review_count: bp.required_reviews,
          dismiss_stale_reviews: bp.dismiss_stale_reviews,
          require_code_owner_reviews: bp.require_code_owner_reviews,
        },
        restrictions: null,
      })
    } catch (e: any) {
      if (e.status === 403) log(`SKIP branch protection (private repo without Pro)`)
      else throw e
    }
  }
}

async function main() {
  console.log(`Syncing ${Object.keys(config.repos).length} repos${dry ? " (DRY RUN)" : ""}...`)
  for (const name of Object.keys(config.repos)) {
    await sync_settings(name)
  }
  console.log("\nDone!")
}

main().catch(e => { console.error(e); process.exit(1) })
