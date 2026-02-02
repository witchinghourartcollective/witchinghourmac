![Primary sigil](public/brand/sigil-primary.svg)

# Witching Hour

Witching Hour is a Next.js App Router site for the Witching Hour music + art collective.
This repo also includes a few standalone experiments and research folders.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run supermemory -- "Remember my favorite synths."
```

### Supermemory script

- Set `SUPERMEMORY_API_KEY` in `.env.local` before running.
- Pass a custom prompt after `--` to override the default.

## Project structure

- `src/app/` App Router routes, layouts, and pages.
- `src/components/` Shared UI components.
- `public/` Static assets served from the site root.
- `evolving-cellular-automata/` Standalone experiment (see its README).
- `hello-arc/` Standalone Circle SCP/Wallets example.
- `scp-bytecode-deploy/` Standalone Circle SCP/Wallets example.
- `prana-map/`, `mining-research/`, `codex/` Additional research and documentation.

## Editing

- Primary page: `src/app/page.tsx`
- Global layout + metadata: `src/app/layout.tsx`
- Global styles: `src/app/globals.css`

## Configuration

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
