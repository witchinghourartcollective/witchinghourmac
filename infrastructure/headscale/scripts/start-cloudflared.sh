#!/usr/bin/env bash
set -euo pipefail

# Create a remotely-managed tunnel in Cloudflare Zero Trust first, then paste its token:
#   Zero Trust -> Networks -> Tunnels -> Create Tunnel -> Cloudflared
#
# Recommended hostname route:
#   headscale.witchinghourmac.com  ->  http://127.0.0.1:18080
#
# Run:
#   CLOUDFLARE_TUNNEL_TOKEN='...' ./scripts/start-cloudflared.sh

if [[ -z "${CLOUDFLARE_TUNNEL_TOKEN:-}" ]]; then
  echo "CLOUDFLARE_TUNNEL_TOKEN is required."
  exit 1
fi

docker rm -f cloudflared-headscale >/dev/null 2>&1 || true

docker run -d \
  --name cloudflared-headscale \
  --restart unless-stopped \
  --network host \
  cloudflare/cloudflared:latest tunnel --no-autoupdate run --token "$CLOUDFLARE_TUNNEL_TOKEN"

echo "cloudflared tunnel started (container: cloudflared-headscale)"
