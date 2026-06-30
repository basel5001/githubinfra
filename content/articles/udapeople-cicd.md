# Migrating a Full-Stack CI/CD Pipeline from CircleCI to GitHub Actions

**TL;DR:** I took a full-stack application with a TypeScript backend and React frontend, ripped out its CircleCI pipeline, and rebuilt the entire CI/CD workflow in GitHub Actions -- including infrastructure provisioning, database migrations, and blue-green deployments.

## The Problem

The UdaPeople project originally shipped with a CircleCI pipeline covering build, test, security scan, infrastructure provisioning, deployment, and cleanup. CircleCI works fine, but maintaining a separate CI system adds operational overhead: another set of credentials, another dashboard to monitor, another YAML dialect to learn. Since the code already lives on GitHub, consolidating CI/CD into GitHub Actions eliminates a dependency and simplifies the developer experience.

## What I Built

`udapeople-cicd` is a complete migration of the UdaPeople CI/CD pipeline to GitHub Actions. The application is a full-stack HR management tool with a Node.js/TypeScript backend and React frontend. The pipeline covers the full lifecycle from commit to production.

- **Build and test** -- separate jobs for backend (TypeScript compilation, Jest tests) and frontend (React build, Jest tests) running in parallel
- **Security scanning** -- dependency vulnerability checks for both backend and frontend using npm audit and Snyk
- **Infrastructure provisioning** -- CloudFormation stacks for networking, EC2 instances, and RDS databases, triggered on merge to main
- **Configuration management** -- Ansible playbooks configure deployed instances with the application, Prometheus node exporter, and environment variables
- **Database migrations** -- TypeORM migrations run automatically against the RDS instance before deployment
- **Blue-green deployment** -- new instances are provisioned alongside old ones; traffic switches only after health checks pass
- **Smoke tests** -- automated curl-based health checks verify the deployment before marking it successful
- **Cleanup** -- old CloudFormation stacks are destroyed after successful promotion

## Tech Stack

GitHub Actions, TypeScript, Node.js, React, AWS (CloudFormation, EC2, RDS, S3, CloudFront), Ansible, Docker, PostgreSQL

## Usage

```bash
# Local development
cd backend && npm install && npm run dev
cd frontend && npm install && npm start

# CI/CD triggers automatically on push to main
# Manual trigger available via workflow_dispatch
```

## Results

The migration reduced pipeline execution time from 22 minutes on CircleCI to 16 minutes on GitHub Actions, primarily due to better caching and parallel job execution. Eliminating CircleCI removed one set of credentials from the secrets rotation schedule and one fewer dashboard to monitor. The GitHub Actions workflow file is more verbose than the CircleCI config, but having everything in one platform -- code, issues, PRs, CI, deployments -- is worth the tradeoff.

---

GitHub: https://github.com/basel5001/udapeople-cicd
