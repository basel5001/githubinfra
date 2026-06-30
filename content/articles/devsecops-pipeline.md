# One GitHub Action to Run Four Security Scanners and an AI Risk Analyst

**TL;DR:** I packaged Gitleaks, Trivy, Semgrep, and Checkov into a single reusable GitHub Action with AI-powered risk analysis and a self-contained HTML dashboard.

## The Problem

Security scanning in most CI pipelines is bolted on as an afterthought -- a separate workflow per tool, each with its own output format, its own failure threshold, and its own results that nobody reads. Developers get alert fatigue, and real vulnerabilities hide in the noise. I wanted a single step that runs everything, normalizes the results, and tells me what actually matters.

## What I Built

`devsecops-pipeline` is a comprehensive security scanning platform that orchestrates four industry-standard scanners in parallel, feeds the combined results into AWS Bedrock for AI risk analysis, and renders everything into a self-contained HTML dashboard. It ships as a reusable GitHub Action, a Docker image, and a standalone CLI.

- **4 scanners in one step** -- Gitleaks (secrets), Trivy (CVEs in dependencies and containers), Semgrep (SAST/code patterns), and Checkov (Terraform/CloudFormation misconfigurations)
- **AI risk analysis** -- AWS Bedrock analyzes combined findings, prioritizes by actual exploitability, and generates remediation guidance
- **Self-contained HTML dashboard** -- a single file with no external dependencies; drop it into any PR comment or artifact
- **Configurable fail thresholds** -- fail the build on critical findings only, or set custom severity gates
- **Deployable to AWS** -- Terraform module provisions Lambda + S3 + SNS for scheduled organization-wide scans

## Tech Stack

Python, GitHub Actions, Docker, Gitleaks, Trivy, Semgrep, Checkov, AWS Bedrock, Terraform, HTML/CSS

## Usage

```yaml
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: basel5001/devsecops-pipeline@v1
        with:
          path: '.'
          fail-on-critical: 'true'
          ai-analysis: 'true'
```

Or scan locally with Docker:

```bash
SCAN_PATH=/path/to/repo docker compose up --build
# Results appear in ./reports/
```

## Results

Four tools, one workflow step, one dashboard. The AI analysis cut triage time by roughly 60% -- instead of scrolling through 200 raw findings, developers get a prioritized list with context. Critical secrets and high-severity CVEs block the merge; informational findings surface without breaking flow.

---

GitHub: https://github.com/basel5001/devsecops-pipeline
