# Electrs Runbook - 2026-02-14

## Current Deployment
Electrum server is running as Docker container `electrs` using image `getumbrel/electrs`.

Start command used:
```bash
docker run -d --name electrs --restart unless-stopped --network host -v /home/fletchervaughn/.bitcoin-pruned:/bitcoin:ro -v /home/fletchervaughn/.electrs-db:/db getumbrel/electrs --network bitcoin --db-dir /db --daemon-dir /bitcoin --cookie-file /bitcoin/.cookie --daemon-rpc-addr 127.0.0.1:8332 --daemon-p2p-addr 127.0.0.1:8333 --electrum-rpc-addr 127.0.0.1:50001
```

## Verify
```bash
docker ps --filter name=electrs
docker logs --tail 100 electrs
```

## Restart / Stop
```bash
docker restart electrs
docker stop electrs
```

## Remove and recreate
```bash
docker rm -f electrs
```

## Notes
- Electrum RPC endpoint: `127.0.0.1:50001`
- Uses bitcoind cookie auth from `~/.bitcoin-pruned/.cookie`
- Index data path: `~/.electrs-db`
- If bitcoind is not running, electrs will not sync.
