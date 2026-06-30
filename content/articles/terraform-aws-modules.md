# Production-Grade Reusable Terraform Modules for AWS

**TL;DR:** I created a library of four battle-tested Terraform modules -- VPC, EKS, Lambda, and S3 -- with sane defaults, full input/output documentation, and ready-to-use examples.

## The Problem

Every new AWS project starts the same way: copy a VPC module from the last project, tweak the CIDR blocks, fix the broken NAT gateway config, remember to enable flow logs this time. Then do the same dance for EKS, Lambda, and S3. I was spending the first day of every project rebuilding infrastructure primitives that should have been solved once.

## What I Built

`terraform-aws-modules` is a collection of four production-ready Terraform modules designed to be referenced directly from GitHub. Each module follows a consistent interface, includes sensible defaults for production use, and exposes enough variables for customization without overwhelming the consumer. Every module has a corresponding example in the `examples/` directory.

- **VPC module** -- 2-AZ public/private subnets, Internet Gateway, NAT Gateways, VPC Flow Logs, fully configurable CIDRs
- **EKS module** -- managed node groups, IRSA (IAM Roles for Service Accounts) via OIDC provider, CloudWatch logging, configurable instance types and scaling
- **Lambda module** -- function deployment with IAM role, CloudWatch log group, optional VPC attachment, and event source mappings (SQS, API Gateway, EventBridge)
- **S3 module** -- versioning, AES-256 encryption, public access block, lifecycle rules for cost management
- **Consistent interface** -- every module takes `project_name`, `environment`, and `tags`; outputs are predictable and composable

## Tech Stack

Terraform, AWS (VPC, EKS, Lambda, S3, IAM, CloudWatch), HCL

## Usage

```hcl
module "vpc" {
  source = "github.com/basel5001/terraform-aws-modules//modules/vpc?ref=v1.0.0"

  project_name = "my-app"
  environment  = "prod"
  vpc_cidr     = "10.0.0.0/16"
}

module "eks" {
  source = "github.com/basel5001/terraform-aws-modules//modules/eks?ref=v1.0.0"

  cluster_name  = "my-app-prod"
  environment   = "prod"
  vpc_id        = module.vpc.vpc_id
  subnet_ids    = module.vpc.private_subnet_ids
  node_min_size = 2
  node_max_size = 6
}
```

## Results

New projects reach a working VPC + EKS cluster in under 30 minutes instead of a full day. The modules encode production best practices by default -- flow logs are on, public access blocks are set, encryption is enabled. I've used these across seven projects without modification. When I do need to update a default (e.g., bumping the EKS version), one PR to the module repo updates all consumers on their next `terraform init -upgrade`.

---

GitHub: https://github.com/basel5001/terraform-aws-modules
