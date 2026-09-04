# Nivaran Deployment & CI/CD Architecture Guide

This document outlines the complete production deployment setup, infrastructure analysis, and CI/CD pipeline for **Nivaran** hosted on the **AWS Lightsail VPS** under the custom domain [https://nivaran.sayalabs.in](https://nivaran.sayalabs.in).

---

## 🏗️ Architecture & Server Deep-Dive

* **Cloud Provider:** Amazon Web Services (AWS Lightsail)
* **Instance Name:** `projects`
* **AWS Region:** Mumbai, Zone A (`ap-south-1a`)
* **Specs:** 8 GB RAM, 2 vCPUs, 160 GB SSD, 4 GB Swap
* **OS:** Ubuntu Linux (x86_64)
* **Static IPv4 Address:** `3.6.209.14`
* **Default User:** `ubuntu`
* **SSH Authentication:** Default Mumbai Region Key (`~/Downloads/LightsailDefaultKey-ap-south-1.pem`)
* **Multi-Project Setup:**
  * All applications are isolated inside `/home/ubuntu/apps/`
  * Existing projects: `storinary` running on Port `3000`
  * Nivaran project: `nivaran` assigned to Port `3001`
* **Domain & DNS:**
  * Subdomain: `nivaran.sayalabs.in`
  * DNS Provider: BigRock DNS (`dns1.bigrock.in` .. `dns4.bigrock.in`)
  * Record: `A` record pointing directly to `3.6.209.14` (also covered by `*.sayalabs.in` wildcard)
* **Web Server & SSL:**
  * Reverse Proxy: Nginx (`/etc/nginx/sites-available/nivaran.sayalabs.in`)
  * SSL Certificate: Let's Encrypt Automated HTTPS via Certbot (`certbot --nginx`)
* **Process Supervisor:** PM2 configured to auto-restart on crashes and system reboot (`pm2 save` + systemd)

---

## 🔄 CI/CD Pipeline (`.github/workflows/deploy.yml`)

The repository is configured with an automated GitHub Actions CI/CD pipeline.

### Pipeline Workflow:
1. **Trigger:** Triggers automatically on any `git push` to the `main` branch, or manually via `workflow_dispatch` in the GitHub Actions tab.
2. **Phase 1 (Validate):**
   * Checks out code on `ubuntu-latest`
   * Sets up Node.js 22 LTS with npm cache
   * Installs dependencies (`npm ci`)
   * Runs TypeScript validation (`npx tsc --noEmit`)
   * Runs production build verification (`npm run build`)
3. **Phase 2 (Deploy via SSH):**
   * Authenticates securely to the Lightsail instance using GitHub Secrets (`LIGHTSAIL_HOST`, `LIGHTSAIL_USERNAME`, `LIGHTSAIL_SSH_KEY`).
   * Fetches the latest commits in `/home/ubuntu/apps/nivaran`.
   * Executes `./scripts/deploy-server.sh`.
   * Installs production dependencies and builds Next.js.
   * Reloads PM2 without downtime (`pm2 restart nivaran --update-env`).
   * Ensures Nginx virtual host configuration and SSL renewal are configured.
4. **Phase 3 (Smoke Test):**
   * Probes `https://nivaran.sayalabs.in/` to confirm HTTP 200/30x availability.

### Configured GitHub Repository Secrets:
* `LIGHTSAIL_HOST`: `3.6.209.14`
* `LIGHTSAIL_USERNAME`: `ubuntu`
* `LIGHTSAIL_SSH_KEY`: AWS Lightsail Mumbai Region RSA Private Key
* `APP_PORT`: `3001`
* `APP_DOMAIN`: `nivaran.sayalabs.in`

---

## 🚀 How to Deploy

### Option 1: Automated Git Push (Recommended)
Simply commit and push your changes to the `main` branch:
```bash
git push origin main
```
GitHub Actions will automatically validate the code, build it, deploy it to Lightsail, and reload the PM2 service.

### Option 2: GitHub CLI / Web UI Trigger
Trigger the deployment directly without making a commit:
```bash
gh workflow run deploy.yml
gh run watch
```
Or open **GitHub Repository** $\rightarrow$ **Actions** $\rightarrow$ **CI/CD Deploy to AWS Lightsail** $\rightarrow$ **Run workflow**.

### Option 3: Local Deployment Script
Run the local deployment script:
```bash
npm run deploy
# or
./scripts/deploy-local.sh
```
*(Note: If your local ISP or Wi-Fi restricts outbound SSH port 22, the script detects it and prompts you to trigger GitHub Actions cloud deployment with one keystroke).*

---

## 🛠️ Server Management & Troubleshooting

When SSHed into `ubuntu@3.6.209.14`:

| Task | Command |
| :--- | :--- |
| **Check PM2 status & memory** | `pm2 status` |
| **View live logs for Nivaran** | `pm2 logs nivaran --lines 50` |
| **Restart Nivaran** | `pm2 restart nivaran` |
| **Stop Nivaran** | `pm2 stop nivaran` |
| **List all running apps on server** | `list-apps` |
| **Test Nginx configuration** | `sudo nginx -t` |
| **Reload Nginx reverse proxy** | `sudo systemctl reload nginx` |
| **Manually renew SSL certificates** | `sudo certbot renew` |
