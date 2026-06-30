# Automated AWS Audits That Run Themselves and Land in S3

**TL;DR:** I built an AWS Lambda function that audits your infrastructure on a schedule and exports detailed compliance reports to S3 -- no manual spreadsheet wrangling required.

## The Problem

AWS audits are one of those tasks everyone knows they should do but nobody enjoys. Security teams ask for a list of public S3 buckets, unencrypted volumes, overly permissive IAM policies, and unused resources. The typical response is someone spending half a day clicking through the console, pasting screenshots into a spreadsheet, and emailing it around. By the time the report is finished, the infrastructure has already drifted. I needed something that runs automatically and produces a consistent, timestamped report.

## What I Built

`aws-audit-reporter` is a Python Lambda function triggered by EventBridge on a configurable schedule. It queries AWS APIs across multiple services, evaluates resources against a set of compliance checks, and writes structured JSON and human-readable HTML reports to an S3 bucket.

- **Multi-service coverage** -- audits EC2, S3, IAM, RDS, VPC, Lambda, EBS, and CloudTrail configurations
- **Compliance checks** -- flags public buckets, unencrypted volumes, root account usage, security groups with 0.0.0.0/0, unused Elastic IPs, and more
- **Scheduled execution** -- EventBridge cron triggers the Lambda daily, weekly, or on-demand
- **S3 report storage** -- reports are versioned and organized by date, making it trivial to track compliance over time
- **SNS notifications** -- sends a summary alert when critical findings are detected
- **Lightweight deployment** -- a single Lambda function with no infrastructure beyond the function itself, an S3 bucket, and an EventBridge rule

## Tech Stack

Python, AWS Lambda, Boto3, AWS EventBridge, S3, SNS, IAM, CloudFormation

## Usage

```bash
# Deploy with CloudFormation
aws cloudformation deploy \
  --template-file template.yml \
  --stack-name aws-audit-reporter \
  --capabilities CAPABILITY_IAM

# Trigger manually
aws lambda invoke --function-name aws-audit-reporter output.json

# Reports appear in s3://your-audit-bucket/reports/YYYY-MM-DD/
```

## Results

The first automated run flagged three S3 buckets with public ACLs and two security groups allowing SSH from anywhere -- findings that had been sitting in the account for months. Weekly reports now land in S3 without anyone lifting a finger, and the SNS integration means critical findings trigger a Slack alert within minutes. Audit prep that used to take a full day now takes zero.

---

GitHub: https://github.com/basel5001/aws-audit-reporter
