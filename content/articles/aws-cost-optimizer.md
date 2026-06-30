# A Lambda-Based AWS Cost Anomaly Detector with Slack Alerts

**TL;DR:** I built a Lambda function that checks AWS Cost Explorer daily, detects spending anomalies by comparing against rolling averages, forecasts monthly spend, and sends a formatted Slack report every morning.

## The Problem

AWS bills are full of surprises. A forgotten NAT Gateway running at $32/day, an accidentally provisioned large RDS instance, a Lambda function in a retry loop -- these things silently drain budget for days before anyone notices. The native AWS Cost Anomaly Detection service exists but is limited in customization and alerting flexibility. I wanted daily cost intelligence in Slack, with anomaly detection tuned to my thresholds.

## What I Built

`aws-cost-optimizer` is a Python Lambda function triggered daily by EventBridge at 8 AM UTC. It pulls the last 7 days of spending from AWS Cost Explorer (grouped by service), computes a rolling average per service, flags any service that exceeds its average by a configurable threshold, forecasts the current month's total, and posts a detailed report to Slack.

- **Daily cost breakdown** -- top services by spend over the trailing 7-day window, formatted as a clean Slack message
- **Anomaly detection** -- compares each service's latest daily cost against its rolling average; configurable percentage threshold (default: 30%)
- **Monthly forecasting** -- uses Cost Explorer's forecast API to project end-of-month spend and compares it against a budget target
- **Slack alerts** -- formatted messages with service-by-service breakdown, flagged anomalies, forecast vs. budget status, and trend indicators
- **Fully IaC** -- Terraform deploys the Lambda, EventBridge rule, IAM role, and CloudWatch log group

## Tech Stack

Python, AWS Lambda, AWS Cost Explorer, EventBridge, Slack Webhooks, Terraform, CloudWatch

## Usage

```bash
# Deploy
cat > terraform/terraform.tfvars <<EOF
slack_webhook_url     = "https://hooks.slack.com/services/XXX/YYY/ZZZ"
monthly_budget        = 500
anomaly_threshold_pct = 30
EOF

cd terraform && terraform init && terraform apply
```

The Lambda runs automatically each morning. To test manually:

```bash
aws lambda invoke --function-name aws-cost-optimizer \
  --payload '{}' response.json
cat response.json
```

## Results

The first week caught a $28/day NAT Gateway that had been running unused for two months. Monthly forecasting flagged a projected 40% budget overrun mid-month, giving enough lead time to right-size resources. The daily Slack report became the team's morning cost standup -- a two-second glance that replaces logging into the AWS console and navigating to Cost Explorer.

---

GitHub: https://github.com/basel5001/aws-cost-optimizer
