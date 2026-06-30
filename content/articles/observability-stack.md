# A Self-Hosted Datadog Alternative in One Docker Compose Command

**TL;DR:** I built a full observability stack -- metrics, logs, traces, alerting, and AI anomaly detection -- that starts with a single `docker compose up -d`.

## The Problem

Datadog is excellent but expensive. At $23+ per host per month for infrastructure monitoring alone, costs scale fast when you're running multiple environments. I needed production-grade observability -- not a toy Grafana dashboard -- without the SaaS bill. And I wanted it deployable in under two minutes for any new project.

## What I Built

`observability-stack` bundles Prometheus, Grafana, Loki, Tempo, Alertmanager, Node Exporter, cAdvisor, and a custom AI anomaly analyzer into a single Docker Compose file. Every component is pre-wired: Grafana has datasources and dashboards provisioned on first boot, Prometheus scrapes all the right targets, and Alertmanager routes alerts through the AI analyzer before sending notifications.

- **Full metrics pipeline** -- Prometheus + Node Exporter + cAdvisor with pre-built dashboards for host and container metrics
- **Centralized logging** -- Loki ingests logs from all containers; query them directly in Grafana with LogQL
- **Distributed tracing** -- Tempo receives OTLP traces over gRPC (port 4317) and correlates them with logs and metrics
- **AI anomaly detection** -- a Python service connected to AWS Bedrock analyzes alert patterns and identifies root causes
- **Pre-built dashboards** -- Node Overview (CPU, memory, disk, network) and Container Overview (per-container resource usage) ready on boot

## Tech Stack

Docker Compose, Prometheus, Grafana, Loki, Tempo, Alertmanager, Node Exporter, cAdvisor, Python, AWS Bedrock

## Usage

```bash
cp .env.example .env   # configure credentials
docker compose up -d   # start everything

# Access points:
# Grafana:      http://localhost:3000  (admin/admin)
# Prometheus:   http://localhost:9090
# Alertmanager: http://localhost:9093
# AI Analyzer:  http://localhost:8000
```

Add a custom scrape target:

```yaml
# configs/prometheus/prometheus.yml
scrape_configs:
  - job_name: "my-service"
    static_configs:
      - targets: ["my-service:8080"]
```

## Results

New projects get full observability in under two minutes. The pre-wired dashboards mean I stop building the same Grafana panels from scratch every time. The AI analyzer has caught two subtle memory leak patterns that static thresholds missed -- it correlates metric trends with log spikes in ways that simple alerting rules cannot.

---

GitHub: https://github.com/basel5001/observability-stack
