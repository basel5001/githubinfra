# A GitHub Action That Catches Technical Debt Before It Merges

**TL;DR:** I built a GitHub Action that scans pull requests for technical debt patterns -- TODOs, FIXMEs, empty catch blocks, hardcoded secrets, and oversized files -- and blocks the merge until they are addressed.

## The Problem

Technical debt accumulates silently. A developer drops a `TODO: fix this later` comment and moves on. Someone writes an empty `catch` block during a quick prototype. A hardcoded API key sneaks into a config file. Individually, none of these are catastrophic. Collectively, they erode codebase quality over months until the team is spending more time fighting the code than building features. Code reviews catch some of it, but reviewers are human -- they miss things, especially under time pressure.

## What I Built

`debtless` is a GitHub Action that runs on every pull request and automatically scans the diff for common technical debt patterns. It annotates the PR with inline comments pointing to each finding and can be configured to block the merge if the debt exceeds a threshold.

- **Pattern detection** -- scans for `TODO`, `FIXME`, `HACK`, `XXX`, `WORKAROUND`, and custom markers
- **Empty catch blocks** -- detects `catch` blocks with no error handling across JavaScript, TypeScript, Python, Java, and Go
- **Hardcoded secrets** -- flags patterns that look like API keys, tokens, passwords, and connection strings
- **Large file detection** -- warns when files exceed a configurable line count, catching monolith classes before they grow
- **Inline PR annotations** -- findings appear as review comments directly on the changed lines, not buried in logs
- **Configurable thresholds** -- set a maximum debt score per PR; exceed it and the check fails
- **Trend tracking** -- outputs a debt score over time so you can measure whether the codebase is getting better or worse

## Tech Stack

GitHub Actions, TypeScript, GitHub Checks API, Regular Expressions, YAML Configuration

## Usage

```yaml
# .github/workflows/debtless.yml
name: Debt Check
on: [pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: basel5001/debtless@main
        with:
          max-debt-score: 10
          fail-on-secrets: true
          ignore-paths: "vendor/,node_modules/"
```

## Results

After enabling `debtless` on three active repositories, the team resolved 47 TODO comments and 8 empty catch blocks within the first two weeks -- not because anyone mandated a cleanup sprint, but because the action surfaced them during normal PR reviews. The hardcoded-secrets check caught two AWS access keys that had been committed in test fixtures. Debt score trending showed a 30% reduction in new debt items per sprint after the first month.

---

GitHub: https://github.com/basel5001/debtless
