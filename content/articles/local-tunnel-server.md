# 5 Free Ways to Expose Your Local Server to the Internet

**TL;DR:** I documented and automated five free methods to tunnel local services to the public internet -- Cloudflare Tunnel, DuckDNS + Let's Encrypt, WireGuard, FRP, Rathole, and SSH -- so you never pay for ngrok again.

## The Problem

You are building a webhook integration and Stripe needs to reach your local development server. Or you are self-hosting a home lab service and want to access it remotely. Or you are demoing an app to a client and need a public URL in 30 seconds. The go-to solution is ngrok, but the free tier is limited and the paid plans add up. There are at least five completely free alternatives, but each has different tradeoffs and setup complexity. I wanted a single repo that documents and automates all of them.

## What I Built

`local-tunnel-server` is a reference repository with configuration files, scripts, and step-by-step guides for five different tunneling methods. Each method includes a working setup, a one-command deploy script, and honest documentation of its strengths and limitations.

- **Cloudflare Tunnel** -- the easiest option; install `cloudflared`, run one command, get a public HTTPS URL backed by Cloudflare's network. Zero port forwarding, free custom domains with Cloudflare DNS
- **DuckDNS + Let's Encrypt** -- free dynamic DNS with automated TLS certificates. Best for persistent home lab services that need a stable hostname
- **WireGuard VPN + Reverse Proxy** -- tunnel traffic through a cheap VPS running WireGuard. Gives you a static IP and full control over routing
- **FRP (Fast Reverse Proxy)** -- open-source reverse proxy with a lightweight server/client architecture. Supports TCP, UDP, HTTP, and HTTPS tunnels with dashboard monitoring
- **Rathole** -- a Rust-based alternative to FRP with lower resource usage. Ideal for constrained environments like Raspberry Pi
- **SSH Reverse Tunnel** -- the classic approach; requires only an SSH server. No additional software, works everywhere, but lacks automatic reconnection without tooling

## Tech Stack

Cloudflare Tunnel, WireGuard, FRP, Rathole, DuckDNS, Let's Encrypt, SSH, Nginx, Docker, Bash

## Usage

```bash
# Cloudflare Tunnel (fastest setup)
cloudflared tunnel --url http://localhost:3000

# FRP (self-hosted)
docker compose -f frp/docker-compose.yml up -d

# WireGuard + reverse proxy
./scripts/setup-wireguard.sh
./scripts/setup-nginx-proxy.sh
```

## Results

Cloudflare Tunnel is the winner for quick development tunnels -- zero config, free HTTPS, and sub-100ms latency overhead. For permanent home lab exposure, WireGuard + a $3.50/month VPS provides the most flexibility and performance. FRP hits the sweet spot for teams that want a self-hosted ngrok alternative with a management dashboard. This repo has become my go-to reference every time I need to expose a local service.

---

GitHub: https://github.com/basel5001/local-tunnel-server
