#!/usr/bin/env bash
set -euo pipefail

TARGET_URL="${MATRIX_QUICK_TUNNEL_TARGET_URL:-http://127.0.0.1:18080}"

docker rm -f matrix-quick-tunnel >/dev/null 2>&1 || true

docker run -d \
  --name matrix-quick-tunnel \
  --restart unless-stopped \
  --network host \
  --dns 1.1.1.1 \
  --dns 1.0.0.1 \
  cloudflare/cloudflared:latest \
  tunnel --no-autoupdate --url "$TARGET_URL" >/dev/null

sleep 4
URL="$(docker logs --tail 200 matrix-quick-tunnel 2>&1 | grep -Eo 'https://[a-z0-9-]+\\.trycloudflare\\.com' | tail -n 1 || true)"

if [[ -z "$URL" ]]; then
  echo "Matrix quick tunnel started, but URL was not detected yet."
  echo "Check logs: docker logs matrix-quick-tunnel"
  exit 1
fi

echo "Matrix quick tunnel URL: $URL"
