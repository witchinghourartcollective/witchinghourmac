#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CADDYFILE="${MATRIX_PROXY_CADDYFILE:-$ROOT_DIR/config/matrix-proxy.Caddyfile}"

if [[ ! -f "$CADDYFILE" ]]; then
  echo "Missing Caddyfile at $CADDYFILE"
  exit 1
fi

docker rm -f matrix-edge-proxy >/dev/null 2>&1 || true

docker run -d \
  --name matrix-edge-proxy \
  --restart unless-stopped \
  --network host \
  -v "$CADDYFILE:/etc/caddy/Caddyfile:ro" \
  caddy:2-alpine

echo "Matrix edge proxy is listening on http://127.0.0.1:18080"
