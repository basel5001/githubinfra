# Building an Internal Developer Platform with an AI Advisor

**TL;DR:** I built a self-hosted developer portal where teams register services, provision AWS environments with one click, track costs, and get AI-powered infrastructure recommendations -- all backed by FastAPI and Terraform.

## The Problem

Developers shouldn't need to write Terraform to spin up a staging environment. They also shouldn't wait three days for an ops ticket to get resolved. At the same time, giving everyone raw AWS console access is a recipe for cost blowouts and security incidents. I needed a paved road: self-service with guardrails.

## What I Built

Cloud Platform is an Internal Developer Portal that wraps Terraform behind a REST API and a dark-themed single-page dashboard. Developers register their services, click "Create Environment," and the platform runs `terraform plan && terraform apply` under the hood -- provisioning VPCs, ALBs, ECS services, or Lambda functions.

- **Service Catalog** -- register and track microservices by type (web, API, worker) with ownership metadata
- **Self-Service Provisioning** -- create dev/staging/prod environments in one click; Terraform runs behind the scenes
- **AI Advisor** -- ask AWS Bedrock (Claude Haiku) for infrastructure recommendations, Terraform code generation, and cost explanations
- **Cost Tracking** -- per-service cost breakdown pulled from AWS Cost Explorer daily
- **Zero-Build Dashboard** -- a single-page HTML app with Tailwind CSS; no Node build step required

## Tech Stack

Python, FastAPI, SQLite, Terraform, AWS Bedrock (Claude), Tailwind CSS, AWS (ECS, Lambda, VPC, ALB, Cost Explorer)

## Usage

```bash
# Start the platform
make dev
# Open http://localhost:8000

# Register a service via API
curl -X POST http://localhost:8000/api/services \
  -H "Content-Type: application/json" \
  -d '{"name": "payment-api", "type": "api", "owner": "platform-team"}'

# Ask the AI advisor
curl -X POST http://localhost:8000/api/ai/suggest \
  -d '{"question": "What instance type should I use for a Node.js API handling 500 RPS?"}'
```

## Results

Environment provisioning dropped from a multi-day ticket-based process to under five minutes. The AI advisor handles the most common "how should I architect this?" questions that used to land in the platform team's Slack channel. Cost visibility per service caught two orphaned environments in the first week, saving roughly $400/month.

---

GitHub: https://github.com/basel5001/cloud-platform
