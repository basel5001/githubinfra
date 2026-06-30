# Automating AWS Disaster Recovery with AI-Generated Runbooks

**TL;DR:** I built a Terraform-managed AWS disaster recovery system with cross-region replication, automated failover, scheduled DR drills that measure RTO/RPO, and AI-generated runbooks via Bedrock.

## The Problem

Every team says they have a DR plan. Few have tested it. Fewer still can tell you their actual RTO and RPO numbers. Manual failover runbooks go stale the moment the infrastructure changes. I needed DR that tests itself, measures itself, and keeps its own documentation current.

## What I Built

`disaster-recovery-aws` is a complete DR automation platform spanning two AWS regions. The primary region (us-east-1) replicates data to a DR region (us-west-2) across S3, RDS, and DynamoDB. Lambda functions continuously monitor health, execute failover when thresholds breach, and run scheduled DR drills that produce hard RTO/RPO measurements.

- **Cross-region replication** -- S3 CRR, RDS read replicas with automatic promotion, DynamoDB global tables
- **Automated failover** -- Lambda detects health check failures and executes DNS switchover, RDS promotion, and ECS scaling without human intervention
- **Scheduled DR drills** -- EventBridge triggers simulated failures; each drill measures actual recovery time and data loss, then reports via SNS
- **AI runbook generation** -- AWS Bedrock generates step-by-step runbooks tailored to the current infrastructure state, not a static wiki page
- **Full observability** -- CloudWatch alarms, a unified dashboard, and Synthetics canaries for external endpoint monitoring

## Tech Stack

Terraform, Python, AWS (Lambda, RDS, S3, DynamoDB, Route53, ECS, ALB, CloudWatch, EventBridge, SNS, Bedrock)

## Usage

```bash
# Deploy the full DR stack
cd terraform
cp backend.tf.example backend.tf
terraform init && terraform plan

# Run a manual DR drill
aws lambda invoke --function-name dr-drill-runner \
  --payload '{"scenario": "rds-failover"}' response.json

# Generate a runbook for a specific scenario
aws lambda invoke --function-name dr-runbook-generator \
  --payload '{"scenario": "full-region-failure"}' runbook.json
```

## Results

DR drills now run weekly on a schedule. The first automated drill revealed an RTO of 12 minutes -- twice what we assumed. After tuning, we consistently hit under 5 minutes. AI-generated runbooks stay current because they query live infrastructure state each time. The biggest win: confidence. When an actual us-east-1 degradation occurred, the system detected it and began failover within 90 seconds.

---

GitHub: https://github.com/basel5001/disaster-recovery-aws
