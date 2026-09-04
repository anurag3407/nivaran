#!/usr/bin/env bash
set -Eeuo pipefail

# ==============================================================================
# Nivaran Production Server Deployment Script
# Target: AWS Lightsail VPS (3.6.209.14)
# Domain: nivaran.sayalabs.in | Port: 3001
# ==============================================================================

APP_NAME="nivaran"
APP_DIR="/home/ubuntu/apps/${APP_NAME}"
REPO_URL="https://github.com/anurag3407/nivaran.git"
PORT="${PORT:-3001}"
DOMAIN="${DOMAIN:-nivaran.sayalabs.in}"

echo "========================================================"
echo "🚀 Starting Deployment for ${APP_NAME} (${DOMAIN})"
echo "   Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "   Target Port: ${PORT}"
echo "   Directory:   ${APP_DIR}"
echo "========================================================"

mkdir -p /home/ubuntu/apps

# 1. Sync / Clone Git Repository
if [ ! -d "${APP_DIR}/.git" ]; then
  echo "📥 Cloning repository from ${REPO_URL}..."
  git clone "${REPO_URL}" "${APP_DIR}"
  cd "${APP_DIR}"
else
  echo "🔄 Updating existing codebase..."
  cd "${APP_DIR}"
  git fetch origin main
  git reset --hard origin/main
  git clean -fd
fi

# 2. Configure Environment (.env)
if [ ! -f "${APP_DIR}/.env" ]; then
  echo "⚙️ Creating production .env file..."
  cat << ENV_EOF > "${APP_DIR}/.env"
PORT=${PORT}
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://${DOMAIN}
ENV_EOF
else
  echo "⚙️ Updating PORT and NEXT_PUBLIC_APP_URL in .env..."
  grep -q "^PORT=" "${APP_DIR}/.env" && sed -i "s/^PORT=.*/PORT=${PORT}/" "${APP_DIR}/.env" || echo "PORT=${PORT}" >> "${APP_DIR}/.env"
  grep -q "^NEXT_PUBLIC_APP_URL=" "${APP_DIR}/.env" && sed -i "s|^NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=https://${DOMAIN}|" "${APP_DIR}/.env" || echo "NEXT_PUBLIC_APP_URL=https://${DOMAIN}" >> "${APP_DIR}/.env"
fi

# 3. Install Dependencies
echo "📦 Installing project dependencies..."
if command -v pnpm &>/dev/null; then
  pnpm install --frozen-lockfile --config.minimum-release-age=0 --dangerously-allow-all-builds || \
  pnpm install --frozen-lockfile --config.minimum-release-age=0 --ignore-scripts || \
  pnpm install --config.minimum-release-age=0 --dangerously-allow-all-builds || \
  npm install
elif command -v npm &>/dev/null; then
  npm install
fi

# 4. Build Next.js Production Bundle
echo "🏗️ Building Next.js application..."
if command -v pnpm &>/dev/null; then
  pnpm run build
else
  npm run build
fi

# 5. Start / Reload with PM2
echo "⚡ Starting/Reloading process in PM2..."
if pm2 describe "${APP_NAME}" > /dev/null 2>&1; then
  echo "♻️ Restarting existing PM2 instance '${APP_NAME}'..."
  pm2 restart "${APP_NAME}" --update-env
else
  echo "✨ Starting new PM2 instance '${APP_NAME}' on port ${PORT}..."
  if [ -f "ecosystem.config.cjs" ]; then
    pm2 start ecosystem.config.cjs
  else
    PORT="${PORT}" pm2 start npm --name "${APP_NAME}" -- start -- -p "${PORT}"
  fi
fi
pm2 save

# 6. Configure Nginx Reverse Proxy
echo "🌐 Configuring Nginx reverse proxy for ${DOMAIN} -> 127.0.0.1:${PORT}..."

if command -v add-app &>/dev/null; then
  echo "Using system 'add-app' utility..."
  sudo add-app "${DOMAIN}" "${PORT}" || true
fi

# Ensure full robust Nginx site config exists
NGINX_AVAILABLE="/etc/nginx/sites-available/${DOMAIN}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DOMAIN}"

if [ ! -f "${NGINX_AVAILABLE}" ]; then
  echo "Writing Nginx virtual host configuration..."
  sudo bash -c "cat << 'VHOST_EOF' > ${NGINX_AVAILABLE}
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
VHOST_EOF"
fi

if [ ! -f "${NGINX_ENABLED}" ]; then
  sudo ln -s "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"
fi

echo "🔍 Validating Nginx configuration..."
sudo nginx -t
sudo systemctl reload nginx

# 7. Provision SSL Certificate (Let's Encrypt Certbot)
echo "🔒 Checking SSL certificate for ${DOMAIN}..."
if [ -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
  echo "✅ Existing SSL certificate found for ${DOMAIN}."
else
  echo "📜 Requesting new SSL certificate with Certbot..."
  sudo certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos --register-unsafely-without-email --redirect || {
    echo "⚠️ Certbot completed with warnings. Check DNS propagation if domain is newly pointed."
  }
  sudo systemctl reload nginx || true
fi

# 8. Health Check Verification
echo "🩺 Running health check on 127.0.0.1:${PORT}..."
HEALTH_PASSED=false
for i in {1..30}; do
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}/" || true)
  if [[ "$HTTP_STATUS" =~ ^(200|301|302|307|308)$ ]]; then
    echo "✅ Application responded with HTTP ${HTTP_STATUS} (Attempt ${i}/30)"
    HEALTH_PASSED=true
    break
  fi
  sleep 1
done

if [ "$HEALTH_PASSED" != "true" ]; then
  echo "❌ Health check timed out! Recent PM2 logs:"
  pm2 logs "${APP_NAME}" --lines 30 --nostream
  exit 1
fi

echo "========================================================"
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "   URL:    https://${DOMAIN}"
echo "   Port:   ${PORT}"
echo "   PM2:    ${APP_NAME}"
echo "   Status: Online & Healthy"
echo "========================================================"
