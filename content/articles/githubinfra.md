# How I Centralized CI/CD Governance Across 22+ Repos with a Single Repository

**TL;DR:** I built a single "infrastructure" repo that owns every reusable GitHub Actions workflow, composite action, and repository setting across my entire GitHub organization.

## The Problem

Managing CI/CD pipelines across dozens of repositories is painful. Every repo had its own copy of linting configs, security scans, and Docker build steps. A single change -- like upgrading a scanner version -- meant opening 20+ PRs. Drift was inevitable, and nobody could answer "which repos actually run secret scanning?"

## What I Built

`githubinfra` is a mono-repo that treats GitHub itself as infrastructure. Every workflow is a reusable workflow that any repo can reference with a one-liner. Repository settings (branch protection, merge strategies, topics, descriptions) are declared in a single `repos.yml` and synced via a TypeScript management tool.

- **11 reusable workflows** covering CI, linting, secret scanning, IOC/supply-chain checks, Docker builds, Terraform validation, SBOM generation, stale management, release notifications, branch copying, and label enforcement
- **3 composite actions** for environment setup (Python/Node/Go with caching), Docker Buildx builds, and Discord/Slack notifications
- **Declarative repo management** -- edit `repos.yml`, run `npm run sync`, and every repo's settings converge to the desired state
- **Diff & dry-run modes** so I can preview exactly what will change before applying
- **Automated workflow assignment** -- new repos inherit the right pipelines from day one

## Tech Stack

GitHub Actions, TypeScript, Terraform, GitHub REST API, YAML

## Usage

Any repo references a shared workflow with two lines:

```yaml
jobs:
  ci:
    uses: basel5001/githubinfra/.github/workflows/ci.yml@main
    with:
      language: python
```

To sync repository settings:

```bash
cd management && npm install
GITHUB_TOKEN=ghp_xxx npm run diff    # preview
GITHUB_TOKEN=ghp_xxx npm run sync    # apply
```

## Results

What used to require touching 20+ repos now takes a single PR. Workflow updates roll out instantly to every consumer. The `repos.yml` file serves as a living inventory of the entire organization -- I can answer "what scanning does repo X run?" by reading one file. Onboarding a new repo takes under a minute: add it to `repos.yml`, push, done.

---

GitHub: https://github.com/basel5001/githubinfra
