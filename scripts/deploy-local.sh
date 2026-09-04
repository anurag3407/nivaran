#!/usr/bin/env bash
set -Eeuo pipefail

# ==============================================================================
# Nivaran Local Deployment Runner
# Connects to AWS Lightsail VPS (3.6.209.14) and triggers remote deploy
# ==============================================================================

SERVER_IP="3.6.209.14"
SERVER_USER="ubuntu"
APP_NAME="nivaran"
DOMAIN="nivaran.sayalabs.in"
PORT="3001"

KEY_FILE="${HOME}/Downloads/LightsailDefaultKey-ap-south-1.pem"

echo "========================================================"
echo "🚀 Nivaran Deployment Trigger"
echo "   Server: ${SERVER_USER}@${SERVER_IP}"
echo "   Domain: https://${DOMAIN}"
echo "========================================================"

if [ ! -f "${KEY_FILE}" ]; then
  # Fallback search for any LightsailDefaultKey
  FOUND_KEY=$(find "${HOME}/Downloads" -name "LightsailDefaultKey*.pem" | head -n 1)
  if [ -n "${FOUND_KEY}" ]; then
    KEY_FILE="${FOUND_KEY}"
  else
    echo "❌ SSH Key not found at ${KEY_FILE}!"
    echo "Please download the default key from AWS Lightsail Mumbai region."
    exit 1
  fi
fi

chmod 400 "${KEY_FILE}"
echo "🔑 Using SSH key: ${KEY_FILE}"

# Test TCP port 22 reachability
echo "📡 Testing connectivity to ${SERVER_IP}:22..."
if ! nc -zv -w 4 "${SERVER_IP}" 22 2>/dev/null; then
  echo "⚠️ Direct outbound port 22 is currently blocked on your local network (e.g., campus/corporate Wi-Fi)."
  echo ""
  echo "💡 You can deploy in any of these ways:"
  echo "  1) Trigger via GitHub Actions (Cloud runners have open port 22):"
  echo "     gh workflow run deploy.yml"
  echo "  2) Switch to mobile hotspot / unrestricted network and re-run this script."
  echo ""
  read -p "Would you like to trigger GitHub Actions CI/CD now? [Y/n] " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
    gh workflow run deploy.yml
    echo "✅ GitHub Actions deploy workflow triggered! Track it with:"
    echo "   gh run watch"
    exit 0
  else
    exit 1
  fi
fi

echo "✅ SSH port 22 reachable! Executing server deploy script..."
ssh -i "${KEY_FILE}" -o StrictHostKeyChecking=no "${SERVER_USER}@${SERVER_IP}" "
  if [ ! -d '/home/ubuntu/apps/nivaran' ]; then
    mkdir -p /home/ubuntu/apps
    git clone https://github.com/anurag3407/nivaran.git /home/ubuntu/apps/nivaran
  fi
  cd /home/ubuntu/apps/nivaran
  git fetch origin main
  git reset --hard origin/main
  chmod +x ./scripts/deploy-server.sh
  ./scripts/deploy-server.sh
"

echo "========================================================"
echo "🎉 Deployment command completed successfully!"
echo "========================================================"
