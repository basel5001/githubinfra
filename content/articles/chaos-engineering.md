# A Kubernetes Chaos Engineering Toolkit with AI-Powered Analysis

**TL;DR:** I built a chaos engineering toolkit that runs five experiment types against Kubernetes clusters and uses AWS Bedrock to analyze the results and recommend resilience improvements.

## The Problem

"Our system is resilient" is a claim, not a fact, until you've tested it. Most teams discover their failure modes during actual incidents -- the worst possible time. I needed a way to systematically inject failures into Kubernetes workloads, observe how the system responds, and get actionable recommendations, not just pass/fail results.

## What I Built

`chaos-engineering` is a CLI-driven toolkit that defines experiments as YAML manifests (CRD-style), executes them against a target Kubernetes cluster, collects metrics during the blast radius, and feeds everything into AWS Bedrock for AI-powered analysis. The AI doesn't just say "the pod restarted" -- it explains whether the recovery was fast enough, what the impact radius was, and what to harden next.

- **5 experiment types** -- pod kill (random pod termination), network latency (tc netem injection), CPU stress (stress-ng on target nodes), disk fill (hostPath exhaustion), and DNS failure (CoreDNS SERVFAIL injection)
- **Declarative experiment plans** -- define target namespace, label selectors, duration, and success criteria in YAML
- **AI-powered analysis** -- Bedrock correlates experiment timeline with cluster metrics and provides a risk assessment with specific remediation steps
- **Dry-run mode** -- validate experiments and see what would be affected without injecting any faults
- **HTML results dashboard** -- a self-contained visualization of experiment timelines, impact metrics, and AI recommendations

## Tech Stack

Python, Kubernetes (kubectl), AWS Bedrock, Docker, stress-ng, tc/netem, Terraform, GitHub Actions

## Usage

```yaml
# manifests/experiment-pod-kill.yml
apiVersion: chaos.xops.io/v1alpha1
kind: ChaosExperiment
metadata:
  name: kill-frontend-pods
spec:
  type: pod-kill
  target:
    namespace: production
    labelSelector:
      matchLabels:
        app: frontend
  schedule:
    duration: 60s
    count: 3
```

```bash
# Dry-run to preview impact
chaos --manifest manifests/experiment-pod-kill.yml --dry-run

# Execute with AI analysis
chaos --manifest manifests/experiment-pod-kill.yml --analyze

# Export results
chaos --manifest manifests/experiment-network.yml --output json --outfile results.json
```

## Results

Running weekly chaos experiments surfaced three critical resilience gaps: a service without a PodDisruptionBudget that went fully unavailable during pod kills, a DNS-dependent service with no caching that cascaded failures during DNS experiments, and a CPU-bound workload with no horizontal autoscaler. Each was caught and fixed before a real incident.

---

GitHub: https://github.com/basel5001/chaos-engineering
