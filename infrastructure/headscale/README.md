# Headscale + Cloudflare Setup (`witchinghourmac.com`)

This is a self-hosted, Tailscale-compatible coordination server setup using:

- `headscale` as the control server
- Cloudflare Tunnel for public ingress
- Domain: `headscale.witchinghourmac.com`

Note: This is **Headscale** (Tailscale-compatible), not Tailscale's hosted control plane.

## 1. Start Headscale

```bash
cd infrastructure/headscale
chmod +x scripts/*.sh
./scripts/start-headscale.sh
```

## 2. Bootstrap User + Auth Key

```bash
cd infrastructure/headscale
HEADSCALE_USER=witchinghour ./scripts/bootstrap-headscale.sh
```

Copy the preauth key printed in the output.

## 3. Expose Through Cloudflare Tunnel

Create a Cloudflare Zero Trust tunnel and map:

- Hostname: `headscale.witchinghourmac.com`
- Service: `http://127.0.0.1:18080`

Then run:

```bash
cd infrastructure/headscale
CLOUDFLARE_TUNNEL_TOKEN='YOUR_TOKEN' ./scripts/start-cloudflared.sh
```

## 4. Join Nodes to Your Coordination Server

On each machine that should join this tailnet:

```bash
sudo tailscale up \
  --login-server https://headscale.witchinghourmac.com \
  --auth-key YOUR_PREAUTH_KEY \
  --accept-dns=true
```

If the node was previously logged into regular Tailscale:

```bash
sudo tailscale logout
```

Then run the `tailscale up` command above.

## 5. Verify

```bash
docker logs --tail 100 headscale
docker exec headscale headscale users list
docker exec headscale headscale nodes list
```

## Notes

- Config file: `config/headscale.yaml`
- ACL policy: `config/acl.hujson`
- Headscale state/data: `data/` (gitignored)
- If you want stricter ACLs, replace the permissive default in `acl.hujson`.
