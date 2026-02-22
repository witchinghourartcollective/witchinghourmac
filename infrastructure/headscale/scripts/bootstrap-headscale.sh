#!/usr/bin/env bash
set -euo pipefail

HEADSCALE_USER="${HEADSCALE_USER:-witchinghour}"
KEY_EXPIRATION="${KEY_EXPIRATION:-90d}"

if ! docker ps --format '{{.Names}}' | grep -qx headscale; then
  echo "headscale container is not running. Start it first: ./scripts/start-headscale.sh"
  exit 1
fi

echo "Ensuring user exists: $HEADSCALE_USER"
docker exec headscale headscale users create "$HEADSCALE_USER" >/dev/null 2>&1 || true

USER_ID="$(docker exec headscale headscale users list -o json | jq -r ".[] | select(.name == \"$HEADSCALE_USER\") | .id" | head -n1)"
if [[ -z "$USER_ID" || "$USER_ID" == "null" ]]; then
  echo "Could not resolve numeric user ID for '$HEADSCALE_USER'."
  exit 1
fi

echo "Creating reusable preauth key (expires in $KEY_EXPIRATION)"
docker exec headscale headscale preauthkeys create \
  --reusable \
  --expiration "$KEY_EXPIRATION" \
  --user "$USER_ID"
