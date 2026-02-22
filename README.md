![Primary sigil](public/brand/sigil-primary.svg)

# Witching Hour

Witching Hour is the website for the Witching Hour Music + Art Collective: a living signal of releases, studio sessions, visual systems, and onchain access.

The site is intentionally minimal, fast, and atmospheric. It exists to promote the work (music, art, and collaborations) and to act as the public surface for the NFT layer and access utilities.

## Live

- Production: `https://witching-hour.pages.dev`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Tailscale (LAN/VPN Access)

Bind to all interfaces and access it from another device:

```bash
npm run dev:tail
```

Then open `http://<your-tailscale-hostname-or-ip>:3000`.

## Deploy

This repo deploys to Cloudflare Pages from the static export (`out/` folder). No Vercel account is required.

```bash
npm run build
npx wrangler pages deploy out --project-name witching-hour
```

Or use:

```bash
npm run deploy
```

## Scripts

```bash
npm run dev
npm run dev:tail
npm run lint
npm run build
npm run start
npm run supermemory -- "Remember my favorite synths."
npm run deploy
```

### Supermemory script

- Set `SUPERMEMORY_API_KEY` in `.env.local` before running.
- Pass a custom prompt after `--` to override the default.

## What’s Here

- Website pages: Ritual, Sigils, About, NFT, Mint, Litepaper, Press, Links, Calendar.
- Studio and utilities live alongside the public site and evolve over time.

## Project structure

- `src/app/` App Router routes, layouts, and pages.
- `src/components/` Shared UI components.
- `public/` Static assets served from the site root.
- `evolving-cellular-automata/` Standalone experiment (see its README).
- `hello-arc/` Standalone Circle SCP/Wallets example.
- `scp-bytecode-deploy/` Standalone Circle SCP/Wallets example.
- `prana-map/`, `mining-research/`, `codex/` Additional research and documentation.
- `infrastructure/headscale/` Self-hosted Tailscale-compatible coordination server setup (Headscale + Cloudflare Tunnel).

## Editing

- Primary page: `src/app/page.tsx`
- Global layout + metadata: `src/app/layout.tsx`
- Global styles: `src/app/globals.css`

## Configuration / Guardrails

- Keep secrets in `.env.local` (not committed).
- The Base app id meta tag lives in `src/app/layout.tsx`.
- Use `/brand/sigil-whm.svg` when referencing the WHM sigil.

## Fonts

Fonts are set via CSS in `src/app/globals.css` (no `next/font` loaders).

## WHM Sigil (ASCII Reference)

```
  \  |   /\     /\  |  /  
   \ |  /  \   /  \ | /   
--- \| /     \/    \|/ ---
    /| \     /\    /|\    
   / |  \  /   \  / | \   
  /  |   \/     \/  |  \  
```
