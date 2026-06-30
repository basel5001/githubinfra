import { Octokit } from "@octokit/rest"
import { load, resolve_repo } from "./config.js"

const token = process.env.GITHUB_TOKEN
if (!token) throw new Error("GITHUB_TOKEN required")

const octokit = new Octokit({ auth: token })
const config = load()
const owner = config.owner

async function diff_repo(name: string) {
  const desired = resolve_repo(config, name)
  
  try {
    const { data: current } = await octokit.repos.get({ owner, repo: name })
    const { data: topics } = await octokit.repos.getAllTopics({ owner, repo: name })
    
    const changes: string[] = []
    
    if (current.description !== desired.description)
      changes.push(`  description: "${current.description}" -> "${desired.description}"`)
    if (current.delete_branch_on_merge !== desired.delete_branch_on_merge)
      changes.push(`  delete_branch_on_merge: ${current.delete_branch_on_merge} -> ${desired.delete_branch_on_merge}`)
    
    const currentTopics = topics.names.sort().join(",")
    const desiredTopics = desired.topics.sort().join(",")
    if (currentTopics !== desiredTopics)
      changes.push(`  topics: [${currentTopics}] -> [${desiredTopics}]`)
    
    if (changes.length > 0) {
      console.log(`\n${name}:`)
      changes.forEach(c => console.log(c))
    }
  } catch (e: any) {
    console.log(`\n${name}: ERROR - ${e.message}`)
  }
}

async function main() {
  console.log("Checking diffs...")
  let count = 0
  for (const name of Object.keys(config.repos)) {
    await diff_repo(name)
    count++
  }
  console.log(`\nChecked ${count} repos.`)
}

main().catch(e => { console.error(e); process.exit(1) })
