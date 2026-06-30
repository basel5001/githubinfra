# Measuring What Matters: A DORA Metrics Dashboard Built on the GitHub API

**TL;DR:** I built a FastAPI dashboard that pulls deployment data from the GitHub API and calculates the four DORA metrics in real time -- giving engineering teams actual numbers instead of gut feelings about delivery performance.

## The Problem

Every engineering manager has been asked "how fast can we ship?" and answered with a vague "pretty fast." DORA metrics -- deployment frequency, lead time for changes, mean time to recovery (MTTR), and change failure rate -- are the industry standard for measuring software delivery performance. But most teams either pay for expensive platforms or simply never measure. I wanted a self-hosted, open-source alternative that pulls directly from where the work already happens: GitHub.

## What I Built

`devops-dashboard` is a Python application that connects to the GitHub API, ingests deployment and pull request data, and computes all four DORA metrics with historical trends. A clean web dashboard presents the numbers alongside DORA's Elite/High/Medium/Low benchmarks so teams can see exactly where they stand.

- **Deployment Frequency** -- calculated from GitHub Deployments or tagged releases, shown as daily/weekly/monthly rates
- **Lead Time for Changes** -- measured from first commit on a branch to production deployment, broken down by percentile
- **Mean Time to Recovery** -- tracked by correlating incident-labeled issues with the deployment that resolved them
- **Change Failure Rate** -- ratio of deployments followed by a rollback or hotfix within a configurable window
- **Trend charts** -- week-over-week sparklines for each metric so you can spot regressions early
- **Multi-repo aggregation** -- track metrics across your entire organization, not just one repo

## Tech Stack

Python, FastAPI, GitHub REST API, SQLite, Jinja2, Chart.js, Docker

## Usage

```bash
# Clone and start
git clone https://github.com/basel5001/devops-dashboard.git
cd devops-dashboard
cp .env.example .env  # add GITHUB_TOKEN
docker compose up -d
# Open http://localhost:8000
```

## Results

Within the first sprint of running the dashboard, the team discovered that lead time had ballooned to 4.2 days -- well above the "Elite" threshold of under one day. The root cause turned out to be a stale review policy requiring two approvals on trivial changes. After adjusting the policy, lead time dropped to 1.1 days. Without the numbers, that bottleneck would have stayed invisible.

---

GitHub: https://github.com/basel5001/devops-dashboard
