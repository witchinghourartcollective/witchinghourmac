# Electrs Runbook - 2026-02-14

## Current Deployment
Electrum server is running as native `systemd` service `electrs`.

## Installed Paths
- Binary: `/usr/local/bin/electrs`
- Config: `/etc/electrs/electrs.conf`
- Unit file: `/etc/systemd/system/electrs.service`
- DB path: `/home/fletchervaughn/.electrs-db/bitcoin`

## Service Commands
```bash
sudo systemctl status electrs --no-pager -l
sudo systemctl restart electrs
sudo systemctl stop electrs
sudo systemctl start electrs
sudo journalctl -u electrs -n 100 --no-pager
```

## Config Used
```toml
network = "bitcoin"
db_dir = "/home/fletchervaughn/.electrs-db/bitcoin"
daemon_dir = "/home/fletchervaughn/.bitcoin-pruned"
cookie_file = "/home/fletchervaughn/.bitcoin-pruned/.cookie"
daemon_rpc_addr = "127.0.0.1:8332"
daemon_p2p_addr = "127.0.0.1:8333"
electrum_rpc_addr = "127.0.0.1:50001"
monitoring_addr = "127.0.0.1:4224"
```

## Notes
- Electrum RPC target: `127.0.0.1:50001`
- Prometheus/monitoring: `127.0.0.1:4224`
- If bitcoind is not running or not synced, electrs will not fully serve chain data.
- On this host, Bitcoin is currently at genesis (`blocks=0`), so electrs is running but not fully usable until sync progresses.
