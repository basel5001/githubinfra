# Deploy a Production VPN on AWS in Under 10 Minutes with Terraform

**TL;DR:** I built a Terraform module that provisions a fully configured OpenVPN or WireGuard server on AWS -- complete with certificates, firewall rules, and client configs -- in a single `terraform apply`.

## The Problem

Setting up a VPN sounds simple until you actually do it. You need an EC2 instance, security groups, elastic IP, key pairs, DNS records, and then the VPN software itself -- certificates for OpenVPN or key pairs for WireGuard. Most tutorials walk you through 30+ manual steps, and the result is a snowflake server that nobody can reproduce. When the instance dies, you start from scratch. I wanted a VPN I could destroy and recreate in minutes.

## What I Built

`aws-vpn-provisioner` is a Terraform project that automates the entire VPN deployment lifecycle on AWS. Choose OpenVPN or WireGuard, set a few variables, and Terraform handles everything from infrastructure to software configuration via cloud-init user data scripts.

- **Dual protocol support** -- deploy OpenVPN (with Easy-RSA PKI) or WireGuard (with auto-generated peer keys) using the same Terraform codebase
- **Full infrastructure as code** -- VPC (or existing VPC), subnet, security groups, EC2 instance, Elastic IP, and Route53 DNS record
- **Automated server configuration** -- cloud-init scripts install and configure the VPN software on first boot, no SSH required
- **Client config generation** -- `.ovpn` files for OpenVPN or WireGuard `conf` files are generated and stored in S3 for secure retrieval
- **Cost-conscious defaults** -- uses `t3.micro` with spot pricing by default, keeping monthly costs under $5
- **Tear down and rebuild** -- `terraform destroy` cleans up everything; `terraform apply` rebuilds identically

## Tech Stack

Terraform, AWS (EC2, VPC, S3, Route53, IAM), OpenVPN, WireGuard, cloud-init, Bash

## Usage

```bash
# Clone and configure
git clone https://github.com/basel5001/aws-vpn-provisioner.git
cd aws-vpn-provisioner

# Deploy WireGuard
terraform init
terraform apply -var="vpn_type=wireguard" -var="domain=vpn.example.com"

# Download client config from S3
aws s3 cp s3://vpn-configs-bucket/client.conf ./wireguard-client.conf
```

## Results

Total deployment time from clone to connected VPN: under 8 minutes. Destroying and redeploying takes 4 minutes. Monthly cost with a `t3.micro` spot instance sits around $3.50. I have used this to spin up temporary VPN servers for travel, tear them down on return, and avoid paying for idle infrastructure. The WireGuard option consistently delivers 400+ Mbps throughput -- more than enough for any remote work scenario.

---

GitHub: https://github.com/basel5001/aws-vpn-provisioner
