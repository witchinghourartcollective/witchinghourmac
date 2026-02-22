#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA_DIR="${HEADSCALE_DATA_DIR:-$ROOT_DIR/data}"
CONFIG_FILE="${HEADSCALE_CONFIG_FILE:-$ROOT_DIR/config/headscale.yaml}"
ACL_FILE="${HEADSCALE_ACL_FILE:-$ROOT_DIR/config/acl.hujson}"
HOST_HTTP_PORT="${HEADSCALE_HOST_HTTP_PORT:-18080}"
HOST_GRPC_PORT="${HEADSCALE_HOST_GRPC_PORT:-15443}"

mkdir -p "$DATA_DIR"

docker rm -f headscale >/dev/null 2>&1 || true

docker run -d \
  --name headscale \
  --restart unless-stopped \
  -p "${HOST_HTTP_PORT}:8080" \
  -p "${HOST_GRPC_PORT}:50443" \
  -v "$DATA_DIR:/var/lib/headscale" \
  -v "$CONFIG_FILE:/etc/headscale/config.yaml:ro" \
  -v "$ACL_FILE:/etc/headscale/acl.hujson:ro" \
  headscale/headscale:latest serve

echo "Headscale is starting on http://127.0.0.1:${HOST_HTTP_PORT}"
