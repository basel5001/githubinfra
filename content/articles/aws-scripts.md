# Python Scripts That Automate the AWS Tasks I Used to Do by Hand

**TL;DR:** I built a collection of Python scripts that automate common AWS operations -- backups, cost tracking, CloudFormation stack management, and resource cleanup -- so I stop repeating the same console clicks every week.

## The Problem

AWS administration involves a surprising amount of repetitive manual work. Every week I was doing the same things: checking which EC2 instances were running, verifying backup status, looking up CloudFormation stack outputs, reviewing cost trends, and hunting for orphaned resources. Each task individually takes five minutes in the console, but collectively they eat an hour or more per week. Worse, manual processes are error-prone -- I once forgot to stop a dev instance that ran for an entire weekend.

## What I Built

`aws-scripts` is a collection of standalone Python scripts using Boto3 that automate the AWS tasks I found myself doing repeatedly. Each script is self-contained, well-documented, and designed to run locally, in a Lambda function, or as a cron job.

- **Backup automation** -- creates EBS snapshots and RDS snapshots on a schedule, tags them with retention policies, and cleans up expired snapshots automatically
- **Cost tracker** -- pulls daily spend from AWS Cost Explorer, groups by service, and outputs a summary with week-over-week comparison. Optionally sends a Slack notification if spend exceeds a threshold
- **CloudFormation utilities** -- list all stacks with their status, export stack outputs to a JSON file, detect stacks stuck in `ROLLBACK_COMPLETE`, and bulk-delete stacks matching a pattern
- **Resource inventory** -- enumerates running EC2 instances, RDS databases, Lambda functions, and S3 buckets with key metadata (region, size, state, cost tags)
- **Cleanup scripts** -- find and optionally terminate stopped EC2 instances older than N days, release unattached Elastic IPs, and delete unused security groups
- **Off-hours scheduler** -- stops tagged dev/staging instances at 7 PM and starts them at 8 AM on weekdays

## Tech Stack

Python, Boto3, AWS (EC2, RDS, S3, CloudFormation, Cost Explorer, Lambda, CloudWatch), Click CLI

## Usage

```bash
# Install dependencies
pip install -r requirements.txt

# Run cost summary
python cost_tracker.py --days 7 --slack-webhook $SLACK_URL

# Backup all tagged volumes
python backup.py --tag Environment:production

# Clean up old snapshots
python cleanup_snapshots.py --older-than 30
```

## Results

The off-hours scheduler alone saves roughly $200/month by stopping 6 dev instances during nights and weekends. The cost tracker caught a misconfigured NAT Gateway that was generating $45/day in unexpected data transfer charges. Automating snapshot cleanup freed 2.3 TB of stale EBS snapshots in the first run. What used to be an hour of weekly console clicking now runs unattended.

---

GitHub: https://github.com/basel5001/AWS_Scripts
