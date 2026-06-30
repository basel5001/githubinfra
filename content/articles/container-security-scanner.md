# One GitHub Action to Scan Every Container You Ship

**TL;DR:** I built a composite GitHub Action that runs Trivy, Grype, and Syft against your container images in a single step -- producing vulnerability reports and a full SBOM without any pipeline boilerplate.

## The Problem

Container security scanning is non-negotiable, but configuring it properly is tedious. Most teams bolt on a single scanner and call it done. The problem? No single tool catches everything. Trivy excels at OS-level CVEs, Grype is strong on application dependencies, and Syft generates the SBOM you need for compliance. Running all three means maintaining three separate workflow steps, three sets of configs, and three output formats. Multiply that by a dozen repositories and you have a maintenance nightmare.

## What I Built

`container-security-scanner` is a reusable GitHub Action that wraps Trivy, Grype, and Syft into a single, configurable step. Point it at an image (or a Dockerfile), and it runs all three scanners in sequence, merges the results, and fails the build if any vulnerability exceeds your severity threshold.

- **Triple-scanner coverage** -- Trivy for OS and language vulnerabilities, Grype for dependency-level scanning, Syft for SBOM generation in SPDX and CycloneDX formats
- **Configurable severity gates** -- set your threshold to `CRITICAL`, `HIGH`, or `MEDIUM`; the action exits non-zero if anything exceeds it
- **Unified SARIF output** -- results are uploaded to GitHub's Security tab via code scanning, so vulnerabilities appear alongside your code
- **SBOM as an artifact** -- the generated Software Bill of Materials is attached to the workflow run for download or forwarding to your compliance tooling
- **Minimal config** -- add four lines to your workflow and you are scanning

## Tech Stack

GitHub Actions (composite action), Trivy, Grype, Syft, SARIF, Docker

## Usage

```yaml
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: basel5001/container-security-scanner@main
        with:
          image: myapp:latest
          severity-threshold: HIGH
          generate-sbom: true
```

## Results

Integrating this action across my repositories caught 14 high-severity CVEs in base images during the first week -- vulnerabilities that had been sitting in production undetected. SBOM generation now runs automatically on every release, and the compliance team pulls artifacts directly from GitHub without asking engineering. The unified SARIF view means developers see container vulnerabilities in the same place they see CodeQL findings, reducing context switching.

---

GitHub: https://github.com/basel5001/container-security-scanner
