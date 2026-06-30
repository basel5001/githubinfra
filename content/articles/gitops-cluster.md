# Building a Full GitOps Platform with Progressive Delivery

**TL;DR:** I built a production-grade GitOps platform on Kubernetes using ArgoCD, Crossplane, Kyverno, and Argo Rollouts -- enabling multi-environment promotion with policy enforcement and canary/blue-green deployments.

## The Problem

Kubernetes gives you primitives, not a platform. After the cluster is running, you still need to answer: How do deployments promote from dev to prod? Who enforces that every pod has resource limits? How do you provision cloud resources without leaving the Git workflow? I needed a complete platform, not a collection of tools.

## What I Built

`gitops-cluster` is a fully integrated GitOps platform where Git is the single source of truth for both application manifests and infrastructure. ArgoCD syncs the desired state, Crossplane provisions cloud resources as Kubernetes CRDs, Kyverno enforces policies at admission time, and Argo Rollouts handles progressive delivery with canary and blue-green strategies.

- **Multi-environment promotion** -- dev uses canary rollouts (automatic), staging uses blue-green (auto-promote), prod uses blue-green (manual gate)
- **Infrastructure as CRDs** -- Crossplane compositions provision S3 buckets, RDS instances, and IAM roles via `kubectl apply`
- **Policy enforcement** -- Kyverno blocks deployments without resource limits, requires labels, enforces image pull policies, and restricts privilege escalation
- **App-of-Apps pattern** -- a single ArgoCD Application bootstraps the entire platform; adding a new service is a YAML file in the right directory
- **Local development** -- `kind create cluster && make bootstrap` gives you the full platform locally

## Tech Stack

Kubernetes, ArgoCD, Crossplane, Kyverno, Argo Rollouts, Terraform (EKS bootstrap), Helm, Kustomize

## Usage

```bash
# Local: bootstrap a kind cluster with the full platform
kind create cluster --name gitops-cluster
make bootstrap

# AWS: provision EKS, then bootstrap
cd terraform && terraform apply
make bootstrap-eks

# Deploy an app: just add a manifest and push
cat > apps/dev/my-service.yml <<EOF
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: my-service
spec:
  strategy:
    canary:
      steps:
        - setWeight: 20
        - pause: {duration: 30s}
        - setWeight: 50
        - pause: {duration: 30s}
EOF
git add . && git commit -m "deploy my-service" && git push
```

## Results

Deployments flow from dev to prod through a Git-driven pipeline with automatic canary analysis. Kyverno has blocked over 40 non-compliant deployments in staging before they reached production. Crossplane eliminated the context switch between "I need a Kubernetes deployment" and "I need an RDS database" -- both are just YAML in the same repo.

---

GitHub: https://github.com/basel5001/gitops-cluster
