# Bootstrapping an AWS Organization with Terraform

**TL;DR:** I built a Terraform-managed AWS landing zone that provisions an entire Organization -- OUs, accounts, SCPs, SSO, GuardDuty, Security Hub, and an account vending machine -- from a single `terraform apply`.

## The Problem

Starting a new AWS Organization the right way involves dozens of manual steps: create OUs, attach SCPs, enable security services in every account, set up SSO, configure networking, establish CloudTrail. Do it by hand and you'll forget something. Do it with ClickOps and there's no audit trail. Every account you add later needs the same baseline applied, and drift is silent.

## What I Built

`multi-cloud-landing-zone` is a Terraform codebase that bootstraps an AWS Organization with enterprise-grade security guardrails. It creates the OU hierarchy, attaches service control policies, enables security services across all accounts, configures IAM Identity Center (SSO), provisions shared networking, and includes an account vending machine that creates new accounts with a full baseline.

- **Service Control Policies** -- region restriction (us-east-1 + eu-west-1), root account denial in member accounts, mandatory encryption for S3/EBS/RDS
- **Security services everywhere** -- GuardDuty, Security Hub (CIS benchmarks), AWS Config, IAM Access Analyzer, and Macie enabled across all accounts with centralized findings
- **IAM Identity Center (SSO)** -- four permission sets (Admin, ReadOnly, Developer, SecurityAudit) federated across all accounts
- **Account vending machine** -- add an account definition to `terraform.tfvars` and the pipeline creates it with baseline IAM roles, CloudTrail, VPC, and Config rules
- **Shared networking** -- Transit Gateway, centralized VPC flow logs, and private Route53 hosted zones

## Tech Stack

Terraform, AWS Organizations, AWS IAM Identity Center, GuardDuty, Security Hub, AWS Config, SCPs, Transit Gateway, Python (policy tests)

## Usage

```hcl
# terraform.tfvars -- add a new account
vended_accounts = {
  team-alpha-dev = {
    email = "aws+alpha-dev@company.com"
    ou    = "Workloads"
    tags  = { Team = "alpha", Environment = "dev" }
  }
}
```

```bash
# Bootstrap the entire organization
cp .env.example .env && source .env
make init && make plan && make apply

# Validate SCPs
make test-policies
```

## Results

A new AWS account goes from zero to fully baselined in under 15 minutes -- CloudTrail enabled, GuardDuty active, VPC provisioned, SSO configured. SCPs enforce encryption and region restrictions at the organizational level, so individual teams can't bypass them. The entire org structure is version-controlled: every change goes through a PR, gets reviewed, and is applied via CI.

---

GitHub: https://github.com/basel5001/multi-cloud-landing-zone
