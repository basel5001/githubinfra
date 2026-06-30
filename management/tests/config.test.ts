import { describe, it, expect } from "vitest"
import { load, resolve_repo } from "../src/config.js"

describe("config", () => {
  it("loads repos.yml", () => {
    const config = load()
    expect(config.owner).toBe("basel5001")
    expect(Object.keys(config.repos).length).toBeGreaterThan(0)
  })

  it("resolves repo with defaults", () => {
    const config = load()
    const repo = resolve_repo(config, "githubinfra")
    expect(repo.delete_branch_on_merge).toBe(true)
    expect(repo.has_wiki).toBe(false)
    expect(repo.branch_protection?.enforce_admins).toBe(true)
  })

  it("resolves private repo override", () => {
    const config = load()
    const repo = resolve_repo(config, "debtless")
    expect(repo.visibility).toBe("private")
  })

  it("resolves workflow list", () => {
    const config = load()
    const repo = resolve_repo(config, "githubinfra")
    expect(repo.workflows).toEqual([])
  })

  it("uses default workflows when not specified", () => {
    const config = load()
    const repo = resolve_repo(config, "local-tunnel-server")
    expect(repo.workflows).toContain("security.yml")
    expect(repo.workflows).toContain("renovate.yml")
  })
})
