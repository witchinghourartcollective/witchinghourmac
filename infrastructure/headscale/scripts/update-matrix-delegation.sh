#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
TUNNEL_URL="${MATRIX_TUNNEL_URL:-}"

if [[ -z "$TUNNEL_URL" ]]; then
  TUNNEL_URL="$(docker logs --tail 200 matrix-quick-tunnel 2>&1 | grep -Eo 'https://[a-z0-9-]+\\.trycloudflare\\.com' | tail -n 1 || true)"
fi

if [[ -z "$TUNNEL_URL" ]]; then
  echo "Could not determine Matrix tunnel URL."
  echo "Set MATRIX_TUNNEL_URL or start matrix-quick-tunnel first."
  exit 1
fi

TUNNEL_HOST="${TUNNEL_URL#https://}"

cat > "$REPO_ROOT/public/.well-known/matrix/client" <<EOF
{
  "m.homeserver": {
    "base_url": "$TUNNEL_URL"
  },
  "org.matrix.msc3575.proxy": {
    "url": "$TUNNEL_URL"
  }
}
EOF

cat > "$REPO_ROOT/public/.well-known/matrix/server" <<EOF
{
  "m.server": "$TUNNEL_HOST:443"
}
EOF

mkdir -p "$REPO_ROOT/out/.well-known/matrix"
cp "$REPO_ROOT/public/.well-known/matrix/client" "$REPO_ROOT/out/.well-known/matrix/client"
cp "$REPO_ROOT/public/.well-known/matrix/server" "$REPO_ROOT/out/.well-known/matrix/server"

echo "Updated well-known to: $TUNNEL_URL"
echo "Deploying to Cloudflare Pages..."
cd "$REPO_ROOT"
npx wrangler pages deploy out --project-name witching-hour --commit-dirty=true
