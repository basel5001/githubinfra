# Deploying HashiCorp Vault as Code on AWS

**TL;DR:** I deployed a production-grade HashiCorp Vault cluster on AWS ECS with KMS auto-unseal, DynamoDB HA backend, dynamic secrets, and Kubernetes CSI integration -- entirely managed as Terraform.

## The Problem

Secrets management is one of those things that's easy to get wrong and painful to fix. Environment variables in `.env` files, hardcoded API keys in config, shared credentials in a team password manager -- I've seen all of it. Setting up Vault properly involves dozens of moving parts: storage backend, unseal mechanism, TLS, audit logging, auth methods, secret engines. I wanted to codify the entire deployment so it's reproducible, auditable, and doesn't require a Vault expert to maintain.

## What I Built

`secret-vault` is a complete Vault deployment on AWS, defined entirely in Terraform. Vault runs on ECS Fargate behind an ALB with TLS 1.3, stores data in DynamoDB with point-in-time recovery, and auto-unseals using AWS KMS. Secret engines, auth methods, and policies are all configured as code.

- **KMS auto-unseal** -- no manual unseal keys to manage; Vault recovers automatically after restarts or scaling events
- **Dynamic secrets** -- AWS IAM credentials and PostgreSQL database credentials are generated on-demand with automatic TTL-based revocation
- **Kubernetes CSI integration** -- pods mount secrets as files via the Vault CSI Provider; no application code changes required
- **AppRole auth** -- machine-to-machine authentication for CI/CD pipelines and automated tooling
- **Automated backups** -- Raft snapshots shipped to S3 with KMS encryption on a schedule

## Tech Stack

Terraform, HashiCorp Vault, AWS (ECS Fargate, KMS, DynamoDB, ALB, CloudWatch, S3), Docker, Kubernetes CSI

## Usage

```bash
# Local development
make dev
# Access Vault UI at http://localhost:8200/ui (token: root)

# Production deployment
cp .env.example .env && source .env
make init && make plan && make apply
```

After deployment, applications retrieve secrets via the API or CSI driver:

```bash
# Read a static secret
vault kv get secret/my-app/config

# Generate dynamic AWS credentials
vault read aws/creds/deploy-role

# K8s CSI: mount secrets as files
# (SecretProviderClass references Vault path)
```

## Results

Zero hardcoded secrets in application code or CI configs. Dynamic AWS credentials rotate automatically, eliminating long-lived IAM keys. The Kubernetes CSI integration means applications consume secrets as mounted files without any Vault SDK dependency. The entire stack rebuilds from scratch with `terraform apply` in under 10 minutes.

---

GitHub: https://github.com/basel5001/secret-vault
