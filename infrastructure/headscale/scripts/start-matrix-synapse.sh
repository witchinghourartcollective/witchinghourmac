#!/usr/bin/env bash
set -euo pipefail

DATA_DIR="${MATRIX_DATA_DIR:-/home/fletchervaughn/matrix-synapse/data}"
HOST_PORT="${MATRIX_HOST_PORT:-8008}"

if [[ ! -f "$DATA_DIR/homeserver.yaml" ]]; then
  echo "Missing $DATA_DIR/homeserver.yaml"
  echo "Generate it with:"
  echo "  docker run --rm -v \"$DATA_DIR:/data\" -e SYNAPSE_SERVER_NAME=witchinghourmac.com -e SYNAPSE_REPORT_STATS=no matrixdotorg/synapse:latest generate"
  exit 1
fi

docker rm -f synapse >/dev/null 2>&1 || true

docker run -d \
  --name synapse \
  --restart unless-stopped \
  -p "${HOST_PORT}:8008" \
  -v "$DATA_DIR:/data" \
  matrixdotorg/synapse:latest

echo "Synapse is starting on http://127.0.0.1:${HOST_PORT}"
