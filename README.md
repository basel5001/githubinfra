# githubinfra

Centralized GitHub Actions workflows and composite actions shared across all basel5001 repos.

## Usage

Each workflow is a reusable workflow. Reference it from any repo's `.github/workflows/*.yml` file:

```yaml
jobs:
  ci:
    uses: basel5001/githubinfra/.github/workflows/ci.yml@main
    with:
      language: python
```

## Available Workflows

| Workflow | Description |
|----------|-------------|
| `ci.yml` | Generic CI pipeline (lint + test) for Python/Node/Go |
| `linting.yml` | Multi-language linting (super-linter, ruff, eslint, golangci, swiftlint) |
| `secret-scan.yml` | Secret scanning with Gitleaks and/or TruffleHog |
| `ioc-scan.yml` | IOC & supply chain security (Trivy, CodeQL, OSV-Scanner) |
| `docker-build-publish.yml` | Build and push Docker images to GHCR/DockerHub |
| `terraform-validate.yml` | Terraform fmt/init/validate + tfsec security scan |
| `sbom-generate.yml` | Generate SBOM using Anchore Syft |
| `stale-management.yml` | Stale issue and PR management |
| `release-notify.yml` | Release notifications to Discord/Slack |
| `branch-copy.yml` | Copy repo content to multiple branches |
| `label-checker.yml` | Enforce PR labeling standards |

## Composite Actions

| Action | Description |
|--------|-------------|
| `actions/setup-env` | Setup Python/Node/Go environment with caching |
| `actions/docker-build` | Build Docker images with Buildx caching |
| `actions/notify` | Send Discord/Slack webhook notifications |

## Repos Using githubinfra

- `supply_chain_security` → `sbom-generate.yml`
- `devops-exercises` → `linting.yml`
- `Whisky` → `linting.yml`, `release-notify.yml`
- `devbox` → `stale-management.yml`
- `microservices-demo` → `terraform-validate.yml`
- `learning-jenkins-3003221` → `branch-copy.yml`
- `github-actions-for-ci-cd-4375061` → `branch-copy.yml`
- `cert-prep-terraform-associate-003-3330038` → `branch-copy.yml`
- `advanced-terraform-3099246` → `branch-copy.yml`

## Repo Management

All repos are managed as code from this repository.

### Configuration

Edit `repos.yml` to change any repo's settings:
- Description, topics, visibility
- Branch protection rules
- Merge settings
- Workflow assignments

### Commands

```bash
cd management
npm install

# Show what would change
GITHUB_TOKEN=ghp_xxx npm run diff

# Preview changes (dry run)
GITHUB_TOKEN=ghp_xxx npm run sync:dry-run

# Apply changes
GITHUB_TOKEN=ghp_xxx npm run sync
```

### Terraform

```bash
cd terraform
terraform init
terraform plan -var="github_token=$GITHUB_TOKEN"
terraform apply -var="github_token=$GITHUB_TOKEN"
```

### CI

Changes to `repos.yml` are automatically applied on merge to main via the `manage-repos.yml` workflow.

Requires a `REPO_MANAGEMENT_TOKEN` secret with `repo` and `admin:org` scopes.
