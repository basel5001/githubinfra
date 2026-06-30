import { readFileSync } from "fs"
import { parse } from "yaml"
import { resolve } from "path"

export interface BranchProtection {
  required_reviews: number
  dismiss_stale_reviews: boolean
  require_code_owner_reviews: boolean
  enforce_admins: boolean
  required_status_checks: string[]
}

export interface RepoConfig {
  description: string
  topics: string[]
  visibility?: string
  default_branch?: string
  delete_branch_on_merge?: boolean
  allow_squash_merge?: boolean
  allow_merge_commit?: boolean
  allow_rebase_merge?: boolean
  has_issues?: boolean
  has_wiki?: boolean
  has_projects?: boolean
  vulnerability_alerts?: boolean
  branch_protection?: Partial<BranchProtection>
  workflows?: string[]
}

export interface Config {
  owner: string
  defaults: RepoConfig & { branch_protection: BranchProtection }
  repos: Record<string, Partial<RepoConfig>>
}

export function load(path?: string): Config {
  const file = path || resolve(import.meta.dirname, "../../repos.yml")
  const raw = readFileSync(file, "utf8")
  return parse(raw) as Config
}

export function resolve_repo(config: Config, name: string): RepoConfig {
  const repo = config.repos[name]
  if (!repo) throw new Error(`Repo ${name} not found in config`)
  return {
    description: repo.description || "",
    topics: repo.topics || [],
    visibility: repo.visibility || config.defaults.visibility,
    default_branch: repo.default_branch || "main",
    delete_branch_on_merge: repo.delete_branch_on_merge ?? config.defaults.delete_branch_on_merge,
    allow_squash_merge: repo.allow_squash_merge ?? config.defaults.allow_squash_merge,
    allow_merge_commit: repo.allow_merge_commit ?? config.defaults.allow_merge_commit,
    allow_rebase_merge: repo.allow_rebase_merge ?? config.defaults.allow_rebase_merge,
    has_issues: repo.has_issues ?? config.defaults.has_issues,
    has_wiki: repo.has_wiki ?? config.defaults.has_wiki,
    has_projects: repo.has_projects ?? config.defaults.has_projects,
    vulnerability_alerts: repo.vulnerability_alerts ?? config.defaults.vulnerability_alerts,
    branch_protection: { ...config.defaults.branch_protection, ...repo.branch_protection },
    workflows: repo.workflows ?? config.defaults.workflows,
  }
}
