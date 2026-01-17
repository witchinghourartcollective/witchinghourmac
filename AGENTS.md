# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` contains the Next.js App Router routes, layouts, and page components (e.g., `page.tsx`, `layout.tsx`).
- `src/components/` holds reusable UI components shared across routes.
- `public/` stores static assets served from the site root (images, icons, etc.).
- `evolving-cellular-automata/` is a standalone experiment with its own README and assets; treat it as a separate project area.

## Build, Test, and Development Commands
- `npm run dev`: start the local Next.js development server at `http://localhost:3000`.
- `npm run build`: produce an optimized production build in `.next/`.
- `npm run start`: run the production server after `npm run build`.
- `npm run lint`: run ESLint with the Next.js core-web-vitals + TypeScript rules.
- ESLint is configured via Next.js defaults; run `npm run lint` before commits when possible.

## Coding Style & Naming Conventions
- Use TypeScript + React with Next.js App Router conventions.
- Indentation is 2 spaces; strings use double quotes, matching existing files.
- Tailwind CSS utility classes are used for styling.
- Use path aliases like `@/` as configured in `tsconfig.json`.
- Component files and exported components use PascalCase (e.g., `HeroSection.tsx`).

## Testing Guidelines
- There is no automated test runner configured yet.
- For changes, validate manually via `npm run dev` and ensure pages render without console errors.
- If tests are added, document the command in `package.json` and place tests alongside code (e.g., `src/components/__tests__/` or `src/app/...`).

## Commit & Pull Request Guidelines
- Commit messages follow a short, imperative sentence style (e.g., "Add Google tag", "Fix app routing and cleanup").
- PRs should include a concise summary, steps to verify, and screenshots for UI changes.
- Link related issues or notes about design/behavior changes when relevant.

## Security & Configuration Tips
- Store secrets in `.env.local` (not committed) and keep production keys out of the repo.
- Review analytics or third-party integrations carefully before enabling in production.
- The Base app id meta tag is set globally in `src/app/layout.tsx` as `<meta name="base:app_id" content="696949ddeffdef4d6af2c433" />`.

## Working Preferences
- Don’t redesign — preserve the Witching Hour look + layout and only make targeted fixes.
- Prefer minimal diffs (small, safe changes instead of rewrites).
- Keep routing + structure stable (App Router, no random Pages Router stuff).
- Don’t break production (no experimental refactors unless asked).
- Fix bugs first, style second (but keep the vibe consistent).
- Always give copy/paste commands to run + verify.
- If you touch the header/layout, do it once and apply everywhere (no per-page Franken-header).
- Don’t delete assets / don’t rename paths unless necessary.
- Explain what changed + where (file list + short summary).

## Visual + Build Guardrails
- Keep the Witching Hour visual style + sigil animation intact; do not redesign.
- DO NOT change `public/brand/sigil-whm.svg` (locked WHM sigil).
- Keep the background sigil symmetry/animation exactly as-is.
- Make minimal diffs; no refactors unless required.
- Do not break routing or layout; keep App Router structure.
- Run checks locally: `npm run lint`, `npm run build`; fix issues with smallest possible changes.
- Verify global styling didn’t regress; confirm all pages keep the same theme and `globals.css` + `layout.tsx` apply consistently.
- Confirm sigil assets + references: use `/brand/sigil-whm.svg` wherever needed; fix old/broken paths without renaming files.
- SEO + deploy basics (only if missing): confirm metadata in `src/app/layout.tsx` (title/description/OpenGraph); add sitemap + `robots.txt` via `next-sitemap` if not present.
- Deliverables: list files changed, explain changes in 5 bullets max, provide verify commands (`npm run dev`, `npm run lint`, `npm run build`).
