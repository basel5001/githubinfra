# Social Media Posts

## 1. githubinfra

### LinkedIn
I just open-sourced the repo that manages all my other repos.

githubinfra is a single repository that centralizes every reusable GitHub Actions workflow, composite action, and repository setting across 22+ projects. Instead of copying CI/CD configs into each repo, every project references shared workflows with a one-liner. Repository settings -- branch protection, merge strategies, topics -- are declared in a single repos.yml and synced programmatically.

The result: updating a security scanner version across 22 repos takes one PR instead of twenty. Onboarding a new repo takes under a minute.

If you manage more than a handful of GitHub repositories, this pattern will save you hours.

https://github.com/basel5001/githubinfra

#GitHubActions #DevOps #CICD #InfrastructureAsCode #OpenSource #PlatformEngineering

### Twitter/X
Managing CI/CD across 22 repos used to mean 22 separate configs. Now it's one repo, one PR, instant rollout everywhere.

Open-sourced githubinfra -- reusable workflows + repo-as-code.

https://github.com/basel5001/githubinfra

#DevOps #GitHubActions #OpenSource

### Facebook
Ever had to update the same CI/CD config in 20+ repos? Yeah, I got tired of that too.

So I built githubinfra -- one central repo that owns every reusable workflow and repository setting. Change it once, every repo picks it up instantly. Settings are declared in YAML and synced via a management tool.

It's been running across all my projects for months now and it's honestly one of the best productivity decisions I've made.

Check it out: https://github.com/basel5001/githubinfra

---

## 2. cloud-platform

### LinkedIn
What if developers could provision AWS environments without writing a single line of Terraform?

That's what I built with cloud-platform -- an Internal Developer Platform where teams register services, click "Create Environment," and Terraform runs behind the scenes. It includes an AI advisor powered by AWS Bedrock that answers infrastructure questions and generates Terraform code on demand.

Self-service provisioning dropped environment creation from a multi-day ticket process to under 5 minutes. The AI advisor handles the "how should I architect this?" questions that used to flood the platform team's Slack.

Built with FastAPI, Terraform, AWS Bedrock (Claude), and a zero-build Tailwind dashboard.

https://github.com/basel5001/cloud-platform

#PlatformEngineering #DevOps #AWS #Terraform #InternalDeveloperPlatform #AI #OpenSource

### Twitter/X
Developers shouldn't need to write Terraform to spin up staging.

Built an Internal Developer Platform with AI-powered infra provisioning. One click = full environment.

https://github.com/basel5001/cloud-platform

#PlatformEngineering #AWS #DevOps

### Facebook
I got tired of the "can you provision me a staging environment?" tickets, so I built a self-service portal for it.

cloud-platform lets developers register their services and create environments with one click -- Terraform runs behind the scenes. It even has an AI advisor (AWS Bedrock) that answers infrastructure questions.

Went from multi-day ticket queues to 5-minute provisioning. The AI handles most of the common questions too.

https://github.com/basel5001/cloud-platform

---

## 3. devsecops-pipeline

### LinkedIn
Hot take: most DevSecOps implementations are just one scanner bolted onto a pipeline and called "shift-left."

Real security scanning needs multiple tools -- SAST, SCA, IaC scanning, secret detection -- with results that actually make sense to developers. That's why I built devsecops-pipeline: a unified scanning platform that runs Semgrep, Trivy, Checkov, and Gitleaks in parallel, then feeds all findings into AWS Bedrock for AI-powered risk analysis and prioritization.

The AI doesn't just list vulnerabilities. It explains the business impact, suggests specific fixes, and identifies which findings are false positives.

Open-sourced and ready to drop into any GitHub Actions pipeline.

https://github.com/basel5001/devsecops-pipeline

#DevSecOps #SecurityScanning #SAST #GitHub #AWS #OpenSource #CyberSecurity #ShiftLeft

### Twitter/X
One scanner isn't DevSecOps. It's a checkbox.

Built a platform running Semgrep + Trivy + Checkov + Gitleaks with AI risk analysis via AWS Bedrock.

https://github.com/basel5001/devsecops-pipeline

#DevSecOps #AppSec #OpenSource

### Facebook
Here's a question -- how many security scanners does your CI pipeline actually run?

Most teams have one. Maybe two. I built a platform that runs four in parallel (SAST, SCA, IaC, secrets) and then uses AI to prioritize the findings so developers aren't drowning in noise.

It caught a hardcoded AWS key on day one. Worth it already.

https://github.com/basel5001/devsecops-pipeline

---

## 4. observability-stack

### LinkedIn
I open-sourced a complete self-hosted observability platform that you can deploy with a single docker compose up.

observability-stack bundles Prometheus, Grafana, Loki, and Tempo into a pre-configured monitoring solution with dashboards, alerting rules, and log aggregation ready out of the box. The twist: it includes an AI anomaly detection layer powered by AWS Bedrock that analyzes metric patterns and flags unusual behavior before it becomes an incident.

No SaaS vendor lock-in. No per-host pricing. Full control over your telemetry data.

If you're running anything in production and not paying for Datadog, this is your stack.

https://github.com/basel5001/observability-stack

#Observability #Monitoring #Prometheus #Grafana #DevOps #SRE #OpenSource

### Twitter/X
Datadog pricing keeping you up at night?

Self-hosted Prometheus + Grafana + Loki + Tempo with AI anomaly detection. One docker compose command.

https://github.com/basel5001/observability-stack

#Observability #DevOps #SRE

### Facebook
So I built my own Datadog alternative. Hear me out.

Prometheus for metrics. Grafana for dashboards. Loki for logs. Tempo for traces. All pre-configured, all self-hosted, all deployed with docker compose up.

Added an AI layer that spots anomalies in your metrics before they become 3am pages. No per-host pricing, no vendor lock-in.

Take a look: https://github.com/basel5001/observability-stack

---

## 5. disaster-recovery-aws

### LinkedIn
93% of companies without a disaster recovery plan who suffer a major data disaster are out of business within one year. Yet most teams I've worked with treat DR as "we'll figure it out when it happens."

I built disaster-recovery-aws to change that. It's a Terraform-based solution that automates cross-region failover on AWS: pilot light infrastructure in a secondary region, automated failover triggered by health checks, DR drill scheduling, and AI-generated runbooks via AWS Bedrock.

The AI runbook generator is the part I'm most proud of -- it produces step-by-step recovery procedures specific to your infrastructure, not generic documentation.

https://github.com/basel5001/disaster-recovery-aws

#DisasterRecovery #AWS #SRE #Terraform #CloudComputing #DevOps #OpenSource

### Twitter/X
Your DR plan shouldn't be "we'll figure it out."

Automated AWS cross-region failover + AI-generated runbooks. Terraform-based, drill-tested.

https://github.com/basel5001/disaster-recovery-aws

#AWS #DisasterRecovery #SRE

### Facebook
Real talk -- when's the last time your team ran a disaster recovery drill?

I built an automated DR solution for AWS that handles cross-region failover, runs scheduled DR drills, and even generates runbooks using AI. All managed through Terraform so you can version control your recovery strategy.

Because "we have backups" isn't a DR plan.

https://github.com/basel5001/disaster-recovery-aws

---

## 6. gitops-cluster

### LinkedIn
I just open-sourced a full GitOps platform that combines ArgoCD, Crossplane, Kyverno, and Argo Rollouts into one opinionated stack.

gitops-cluster provides multi-environment promotion (dev -> staging -> prod), infrastructure provisioning through Kubernetes CRDs via Crossplane, policy enforcement with Kyverno, and progressive delivery with canary and blue-green deployments through Argo Rollouts.

Everything is declarative. Every change goes through Git. Every deployment is auditable.

This is the platform I wish existed when I first started building Kubernetes-based infrastructure.

https://github.com/basel5001/gitops-cluster

#GitOps #Kubernetes #ArgoCD #Crossplane #PlatformEngineering #DevOps #OpenSource

### Twitter/X
GitOps done right: ArgoCD + Crossplane + Kyverno + Argo Rollouts.

Multi-env promotion, policy enforcement, progressive delivery. All declarative, all through Git.

https://github.com/basel5001/gitops-cluster

#GitOps #Kubernetes #DevOps

### Facebook
If you're doing Kubernetes and not doing GitOps, you're making life harder than it needs to be.

I built a complete GitOps platform -- ArgoCD for deployments, Crossplane for infrastructure, Kyverno for policy, Argo Rollouts for canary releases. Every change goes through a PR. Every deployment is traceable.

The full stack, open-sourced: https://github.com/basel5001/gitops-cluster

---

## 7. chaos-engineering

### LinkedIn
How do you know your system is resilient? You break it on purpose.

I built chaos-engineering -- a Kubernetes chaos engineering toolkit that injects failures (pod kills, network latency, CPU stress, disk pressure) into your cluster and uses AWS Bedrock to analyze the results. The AI component doesn't just tell you what broke -- it explains why, maps the blast radius, and suggests specific resilience improvements.

Netflix popularized chaos engineering with Chaos Monkey. This brings the same discipline to any Kubernetes cluster, with AI-powered analysis that makes the results actionable for teams without dedicated SRE staff.

https://github.com/basel5001/chaos-engineering

#ChaosEngineering #Kubernetes #SRE #Resilience #DevOps #AWS #OpenSource

### Twitter/X
If you haven't broken your system on purpose, you don't know if it's resilient.

K8s chaos toolkit with AI blast radius analysis. Pod kill, network chaos, CPU stress -- with explanations.

https://github.com/basel5001/chaos-engineering

#ChaosEngineering #SRE #Kubernetes

### Facebook
I built a tool that breaks my own systems on purpose -- and I'm proud of it.

chaos-engineering is a Kubernetes toolkit that injects failures (kill pods, add network latency, spike CPU) and then uses AI to analyze what happened. It tells you what broke, why, and how to fix it.

Turns out, finding out your system is fragile in a controlled test is way better than finding out at 3am.

https://github.com/basel5001/chaos-engineering

---

## 8. secret-vault

### LinkedIn
Hardcoded secrets in environment variables and config files remain one of the top causes of security breaches. The solution has existed for years -- HashiCorp Vault -- but deploying and operating it properly is notoriously complex.

I open-sourced secret-vault: a deployment-as-code solution for HashiCorp Vault on AWS with auto-unseal via KMS, automated secret rotation, Kubernetes CSI integration, and comprehensive Terraform modules.

The goal was to make Vault deployment a one-command operation instead of a multi-day project. Auto-unseal means no manual intervention after restarts. CSI integration means Kubernetes pods get secrets as mounted files without application changes.

https://github.com/basel5001/secret-vault

#Vault #SecretsManagement #Security #Kubernetes #Terraform #DevOps #OpenSource

### Twitter/X
Deploying HashiCorp Vault shouldn't take a week.

One-command Vault deployment: auto-unseal, secret rotation, K8s CSI integration. All Terraform.

https://github.com/basel5001/secret-vault

#Vault #Security #Kubernetes

### Facebook
Secrets management is one of those things every team knows they should do properly but very few actually do.

I built a Terraform project that deploys HashiCorp Vault with auto-unseal, automatic secret rotation, and Kubernetes integration. What usually takes days of configuration is now a single terraform apply.

No more secrets in .env files: https://github.com/basel5001/secret-vault

---

## 9. multi-cloud-landing-zone

### LinkedIn
Starting a new AWS Organization from scratch? The first 50 decisions you make will define your security posture for years.

I open-sourced multi-cloud-landing-zone -- an AWS Organization bootstrapper that sets up SCPs, SSO, GuardDuty, Security Hub, CloudTrail, and an account vending machine, entirely in Terraform. It codifies the landing zone patterns that AWS Professional Services charges five figures to implement.

Every security control is version-controlled. Every new account inherits the right guardrails from day one. Audit trails are automatic.

If you're about to set up an AWS Organization, start here instead of clicking through the console.

https://github.com/basel5001/multi-cloud-landing-zone

#AWS #LandingZone #Terraform #CloudSecurity #Governance #DevOps #OpenSource

### Twitter/X
Setting up an AWS Organization by clicking through the console? Please don't.

Open-sourced a Terraform landing zone: SCPs, SSO, GuardDuty, Security Hub, account vending. All as code.

https://github.com/basel5001/multi-cloud-landing-zone

#AWS #Terraform #CloudSecurity

### Facebook
If you're setting up a new AWS Organization, do yourself a favor and don't do it manually.

I built a Terraform project that bootstraps the entire thing -- SCPs for guardrails, SSO for access, GuardDuty and Security Hub for security, and an account vending machine for spinning up new accounts with the right policies baked in.

Save yourself weeks: https://github.com/basel5001/multi-cloud-landing-zone

---

## 10. terraform-aws-modules

### LinkedIn
Every Terraform project starts the same way: you write a VPC module, then an ECS module, then a Lambda module, then you realize you've written the same modules three times across three projects.

I built terraform-aws-modules -- a library of reusable, opinionated Terraform modules for AWS covering VPC, EKS, Lambda, and S3. Each module follows AWS well-architected best practices, includes sensible defaults, and exposes only the variables you actually need to customize.

Stop rewriting the same infrastructure code. Pin a module version, pass your variables, and move on to the parts of your infrastructure that are actually unique.

https://github.com/basel5001/terraform-aws-modules

#Terraform #AWS #InfrastructureAsCode #DevOps #CloudComputing #OpenSource

### Twitter/X
Stop rewriting the same VPC module for every project.

Reusable Terraform modules for AWS: VPC, EKS, Lambda, S3. Opinionated defaults, well-architected patterns.

https://github.com/basel5001/terraform-aws-modules

#Terraform #AWS #IaC

### Facebook
How many times have you written a Terraform VPC module from scratch? I've done it at least five times. So I finally made a reusable set of modules and open-sourced them.

VPC, EKS, Lambda, S3 -- all following AWS best practices with sensible defaults. Use them as-is or customize what you need.

Grab them here: https://github.com/basel5001/terraform-aws-modules

---

## 11. aws-cost-optimizer

### LinkedIn
That moment when you check AWS Cost Explorer and see a $2,000 spike from a service you forgot was running. We've all been there.

I built aws-cost-optimizer -- an AWS Lambda function that monitors your spending using Cost Explorer, detects anomalies by comparing against historical baselines, and fires a Slack alert the moment something looks off. No more end-of-month surprises.

It runs serverless on a schedule, costs pennies to operate, and has already paid for itself many times over by catching forgotten resources and misconfigured services before they rack up serious charges.

https://github.com/basel5001/aws-cost-optimizer

#AWS #FinOps #CostOptimization #Lambda #CloudComputing #DevOps #OpenSource

### Twitter/X
Your AWS bill shouldn't be a surprise at the end of the month.

Lambda-based cost anomaly detection + Slack alerts. Catches runaway spending before it hurts.

https://github.com/basel5001/aws-cost-optimizer

#AWS #FinOps #CostOptimization

### Facebook
Raise your hand if you've ever been personally victimized by an unexpected AWS bill.

I built a Lambda function that watches your AWS spending daily, compares it against historical patterns, and sends a Slack alert the moment something spikes. It caught a forgotten NAT Gateway costing $45/day in the first week.

Free to run, easy to deploy: https://github.com/basel5001/aws-cost-optimizer

---

## 12. container-security-scanner

### LinkedIn
I just open-sourced a GitHub Action that runs three container security scanners in a single step.

container-security-scanner wraps Trivy, Grype, and Syft into one composite action. Point it at your container image and it scans for OS vulnerabilities, application dependency issues, and generates a full SBOM in SPDX/CycloneDX format. Results upload to GitHub's Security tab as SARIF, so findings appear alongside your code.

No single scanner catches everything. Running three in parallel with a unified severity gate gives you real coverage, not a false sense of security.

Four lines of YAML. That's all it takes to add to your pipeline.

https://github.com/basel5001/container-security-scanner

#ContainerSecurity #DevSecOps #GitHubActions #SBOM #Trivy #OpenSource #Docker

### Twitter/X
One scanner isn't enough for container security.

Built a GitHub Action wrapping Trivy + Grype + Syft. Vulnerability scanning + SBOM generation in 4 lines of YAML.

https://github.com/basel5001/container-security-scanner

#DevSecOps #ContainerSecurity #GitHubActions

### Facebook
Most teams run one container scanner and call it secure. That's not great.

I built a GitHub Action that runs three scanners (Trivy, Grype, Syft) in one step. It caught 14 high-severity CVEs in base images during the first week -- stuff that a single scanner missed.

Also generates an SBOM automatically. Add it to your pipeline in 4 lines:

https://github.com/basel5001/container-security-scanner

---

## 13. devops-dashboard

### LinkedIn
"How fast can we ship?" If your answer is "pretty fast," you're guessing.

DORA metrics are the industry standard for measuring software delivery performance, but most teams never measure them because the tooling is expensive or doesn't exist. I built devops-dashboard -- a self-hosted DORA metrics dashboard that pulls directly from the GitHub API and calculates all four metrics: deployment frequency, lead time for changes, MTTR, and change failure rate.

Within one sprint of using it, we discovered lead time had ballooned to 4.2 days. Root cause: a stale review policy. Fixed it. Lead time dropped to 1.1 days.

You can't improve what you don't measure.

https://github.com/basel5001/devops-dashboard

#DORA #DevOps #Metrics #SRE #EngineeringLeadership #OpenSource #FastAPI

### Twitter/X
"How fast do we ship?" You should have a number, not a feeling.

Self-hosted DORA metrics dashboard pulling from GitHub API. All 4 metrics, trend charts, multi-repo.

https://github.com/basel5001/devops-dashboard

#DORA #DevOps #EngineeringMetrics

### Facebook
Your engineering team's delivery speed shouldn't be a gut feeling.

I built a DORA metrics dashboard that connects to GitHub and calculates the four key metrics automatically -- deployment frequency, lead time, MTTR, and change failure rate.

First thing it revealed: our lead time was 4x worse than we thought. Fixed the bottleneck in a week.

Try it: https://github.com/basel5001/devops-dashboard

---

## 14. aws-audit-reporter

### LinkedIn
How long does your AWS audit take? If the answer involves spreadsheets and console screenshots, I built something for you.

aws-audit-reporter is a Lambda function that runs on a schedule, audits your AWS infrastructure across EC2, S3, IAM, RDS, VPC, and CloudTrail, and exports structured reports to S3. It flags public buckets, unencrypted volumes, overly permissive security groups, root account usage, and more.

The first automated run found three public S3 buckets and two SSH-from-anywhere security groups that had been sitting unnoticed for months.

Audit prep that used to take a full day now takes zero.

https://github.com/basel5001/aws-audit-reporter

#AWS #Security #Compliance #Automation #Lambda #CloudSecurity #OpenSource

### Twitter/X
Still doing AWS audits with screenshots and spreadsheets?

Lambda function that audits infra across 8 services on a schedule and drops reports in S3. Found 3 public buckets on day one.

https://github.com/basel5001/aws-audit-reporter

#AWS #Security #Automation

### Facebook
AWS audits used to be my least favorite task. Clicking through the console, copying stuff into spreadsheets, emailing reports that are outdated by the time anyone reads them.

So I automated the whole thing. A Lambda function runs on a schedule, checks everything across EC2, S3, IAM, RDS, and more, then drops the report in S3.

First run found security issues that had been sitting there for months. Worth it.

https://github.com/basel5001/aws-audit-reporter

---

## 15. aws-vpn-provisioner

### LinkedIn
A production VPN on AWS in under 10 minutes. No manual SSH. No snowflake servers.

I open-sourced aws-vpn-provisioner -- a Terraform module that provisions a fully configured OpenVPN or WireGuard server on AWS. One terraform apply handles everything: VPC, security groups, EC2 instance, Elastic IP, DNS record, software installation via cloud-init, and client config generation stored in S3.

Monthly cost: under $5 with a t3.micro spot instance. Destroy it when you don't need it. Rebuild it identically when you do.

I use it for travel VPNs -- spin up before the trip, tear down when I'm back.

https://github.com/basel5001/aws-vpn-provisioner

#Terraform #AWS #VPN #WireGuard #OpenVPN #Infrastructure #OpenSource

### Twitter/X
Deploy a production VPN on AWS in 8 minutes. OpenVPN or WireGuard. $3.50/month. Destroy and rebuild anytime.

terraform apply and done.

https://github.com/basel5001/aws-vpn-provisioner

#Terraform #VPN #AWS

### Facebook
Need a VPN? Don't pay $10/month for a subscription when you can run your own on AWS for $3.50.

I built a Terraform project that deploys OpenVPN or WireGuard on AWS in under 10 minutes. Everything automated -- from the server to the client config files. Tear it down when you're done, rebuild when you need it.

WireGuard gives 400+ Mbps throughput too.

https://github.com/basel5001/aws-vpn-provisioner

---

## 16. study-buddy-ai

### LinkedIn
Research consistently shows that active recall is one of the most effective study techniques. The problem? Creating good quiz questions takes time that students would rather spend studying.

I built study-buddy-ai -- a web app where you paste your notes (or upload a PDF) and an AI generates tailored multiple-choice quizzes in seconds. Built with React and FastAPI, powered by AWS Bedrock.

In a small pilot, students using it scored 12% higher on practice exams compared to passive review, while spending 40% less time on study prep. Per-quiz cost: under $0.01.

Active recall shouldn't require manual effort. Let the AI handle the question creation.

https://github.com/basel5001/study-buddy-ai

#EdTech #AI #AWSBedrock #React #Education #OpenSource #MachineLearning

### Twitter/X
Paste your notes. Get a quiz. Score better.

AI-powered quiz generator: React + FastAPI + AWS Bedrock. 12% higher scores in pilot testing. Under $0.01/quiz.

https://github.com/basel5001/study-buddy-ai

#EdTech #AI #OpenSource

### Facebook
Students spend hours making flashcards when the AI can do it in seconds.

I built study-buddy-ai -- paste your notes or upload a PDF, and it generates multiple-choice quizzes with explanations. Students in my pilot group scored 12% higher on practice exams with way less prep time.

Built with React and AWS Bedrock. Each quiz costs less than a penny to generate.

https://github.com/basel5001/study-buddy-ai

---

## 17. debtless

### LinkedIn
Technical debt doesn't announce itself. It accumulates one TODO comment, one empty catch block, one hardcoded secret at a time.

I built debtless -- a GitHub Action that scans every pull request for technical debt patterns and blocks the merge if the debt score exceeds your threshold. It catches TODOs, FIXMEs, empty catch blocks, hardcoded secrets, and oversized files, then leaves inline review comments directly on the changed lines.

After enabling it on three repos, the team resolved 47 TODO comments and 8 empty catch blocks in two weeks -- not from a cleanup sprint, but because the action surfaced them during normal PR reviews. It also caught two committed AWS keys.

The best time to fix technical debt is before it merges.

https://github.com/basel5001/debtless

#TechnicalDebt #CodeQuality #GitHubActions #DevOps #CleanCode #OpenSource

### Twitter/X
Technical debt that merges is technical debt that stays.

GitHub Action that scans PRs for TODOs, empty catches, hardcoded secrets, and large files. Inline annotations + configurable gates.

https://github.com/basel5001/debtless

#CodeQuality #DevOps #GitHubActions

### Facebook
How many TODO comments are hiding in your codebase right now?

I built a GitHub Action that automatically scans pull requests for technical debt -- TODOs, empty catch blocks, hardcoded secrets, oversized files. It comments directly on the problem lines and can block the merge.

It found two AWS keys committed in test fixtures during the first week. That alone justified the effort.

https://github.com/basel5001/debtless

---

## 18. n8n-social-automation

### LinkedIn
Maintaining a social media presence across four platforms is a full-time job. Or it's a self-hosted n8n workflow that does it for you.

I built n8n-social-automation -- an automation pipeline that uses GPT-4o to generate platform-specific content (professional for LinkedIn, punchy for Twitter, conversational for Facebook), schedules it, and publishes across all four platforms via their APIs.

Over 30 days: 120 posts published, zero manual intervention after setup, less than 5% of posts needed editing. Total OpenAI cost: $8/month.

Self-hosted, open-source, no SaaS subscription required.

https://github.com/basel5001/n8n-social-automation

#Automation #SocialMedia #n8n #OpenAI #ContentCreation #Marketing #OpenSource

### Twitter/X
Posting on 4 platforms manually? Automate it.

n8n + GPT-4o = AI-generated, platform-specific posts published on schedule. 120 posts/month, $8 in API costs.

https://github.com/basel5001/n8n-social-automation

#Automation #AI #SocialMedia

### Facebook
What if your social media posted itself?

I set up an n8n workflow that uses GPT-4o to write posts tailored to each platform (LinkedIn gets professional, Twitter gets punchy, Facebook gets casual), then publishes them automatically on a schedule.

Ran it for 30 days: 120 posts across 4 platforms. Total cost was $8 for the AI. Not bad for a content manager that never sleeps.

https://github.com/basel5001/n8n-social-automation

---

## 19. local-tunnel-server

### LinkedIn
Stop paying for ngrok. Here are 5 free alternatives I've tested and documented.

I created local-tunnel-server -- a reference repository with working configs, automation scripts, and honest comparisons for five methods to expose local servers to the internet:

1. Cloudflare Tunnel (easiest, free HTTPS)
2. DuckDNS + Let's Encrypt (stable hostname)
3. WireGuard + VPS (most flexible)
4. FRP (self-hosted ngrok alternative)
5. Rathole (lightweight, Rust-based)

Each method includes a one-command deploy script and documentation of tradeoffs. Cloudflare Tunnel wins for quick dev tunnels. WireGuard + a $3.50 VPS wins for permanent exposure.

https://github.com/basel5001/local-tunnel-server

#DevTools #Networking #Cloudflare #WireGuard #SelfHosted #HomeLab #OpenSource

### Twitter/X
ngrok free tier is limited. These 5 alternatives are completely free:

Cloudflare Tunnel, DuckDNS, WireGuard, FRP, Rathole. Configs + scripts for all of them.

https://github.com/basel5001/local-tunnel-server

#DevTools #SelfHosted #Networking

### Facebook
Quick question -- are you still paying for ngrok?

I put together 5 completely free ways to expose your local server to the internet. Cloudflare Tunnel is the easiest (one command, free HTTPS). WireGuard + a cheap VPS is the most powerful.

All five methods documented with working configs and deploy scripts.

https://github.com/basel5001/local-tunnel-server

---

## 20. udapeople-cicd

### LinkedIn
I migrated a full-stack CI/CD pipeline from CircleCI to GitHub Actions -- and cut build times by 27%.

udapeople-cicd is a complete HR management application (Node.js/TypeScript backend, React frontend) with a production-grade pipeline covering build, test, security scanning, CloudFormation provisioning, Ansible configuration, database migrations, blue-green deployments, smoke tests, and cleanup.

The migration eliminated a separate CI platform from the stack. One fewer set of credentials to rotate. One fewer dashboard to monitor. Pipeline execution dropped from 22 to 16 minutes thanks to better caching and parallel jobs.

https://github.com/basel5001/udapeople-cicd

#CICD #GitHubActions #DevOps #FullStack #TypeScript #AWS #OpenSource

### Twitter/X
Migrated a full CI/CD pipeline from CircleCI to GitHub Actions. Build time: 22min -> 16min. One less platform to manage.

Blue-green deploys, infra provisioning, smoke tests -- all in GitHub.

https://github.com/basel5001/udapeople-cicd

#CICD #GitHubActions #DevOps

### Facebook
Decided to consolidate everything into GitHub and migrated a full CI/CD pipeline from CircleCI to GitHub Actions.

The app has a TypeScript backend and React frontend. The pipeline handles everything -- building, testing, security scanning, provisioning infrastructure, deploying with blue-green strategy, and running smoke tests.

Build time went from 22 minutes to 16. One less tool to manage.

https://github.com/basel5001/udapeople-cicd

---

## 21. aws-scripts

### LinkedIn
The most valuable code I've written isn't a product -- it's a collection of Python scripts that automate the AWS tasks I was doing manually every week.

aws-scripts includes backup automation (EBS/RDS snapshots with retention), cost tracking with Slack alerts, CloudFormation stack management, resource inventory, orphan cleanup, and an off-hours scheduler that stops dev instances at 7 PM and starts them at 8 AM.

The off-hours scheduler alone saves ~$200/month. The cost tracker caught a misconfigured NAT Gateway at $45/day. What used to be an hour of weekly console clicking now runs unattended.

Sometimes the best tool is a well-written script.

https://github.com/basel5001/AWS_Scripts

#AWS #Python #Automation #FinOps #DevOps #CloudComputing #OpenSource

### Twitter/X
An hour of weekly AWS console clicking, automated into Python scripts.

Backups, cost tracking, resource cleanup, off-hours scheduling. Saves ~$200/mo on dev instances alone.

https://github.com/basel5001/AWS_Scripts

#AWS #Python #Automation

### Facebook
Every week I was doing the same thing -- checking instances, verifying backups, reviewing costs, hunting for orphaned resources. An hour of clicking, every single week.

So I wrote Python scripts for all of it. Automated backups, cost reports to Slack, auto-stop dev instances at night, cleanup unused resources.

The off-hours scheduler saves about $200/month just by stopping dev machines overnight. Sometimes simple scripts are the highest-ROI code you write.

https://github.com/basel5001/AWS_Scripts

---

## 22. bash-scripting

### LinkedIn
Linux user management commands are simple -- until you forget the right flags for useradd and accidentally lock someone out.

I built bash-scripting -- an interactive, menu-driven bash script for managing Linux users and groups. It wraps useradd, usermod, groupadd, and passwd in a guided interface with input validation, confirmation prompts for destructive actions, dry-run mode, bulk CSV import, and audit logging.

It started as a teaching tool for a Linux administration course. Students practice user management without risking misconfigured commands. The dry-run mode catches roughly one mistake per session that would have required manual cleanup.

Bulk user creation from CSV reduced a 15-person lab setup from 45 minutes to under 2 minutes.

https://github.com/basel5001/Bash-Scripting

#Linux #Bash #SysAdmin #DevOps #SystemAdministration #OpenSource #Scripting

### Twitter/X
useradd flags giving you trouble? Built an interactive bash script for Linux user/group management.

Menu-driven, dry-run mode, bulk CSV import, audit logging. Great for learning or daily admin.

https://github.com/basel5001/Bash-Scripting

#Linux #Bash #SysAdmin

### Facebook
How well do you actually know Linux user management commands? Be honest.

I built an interactive bash script that handles user creation, modification, deletion, group management, and bulk operations through a simple menu. It validates input, confirms before doing anything destructive, and logs everything.

Originally made it for teaching, but it's become my go-to for actual user admin too. Bulk creating 15 users from a CSV takes under 2 minutes.

https://github.com/basel5001/Bash-Scripting
