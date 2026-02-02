# Witching Hour - Mint Live Switch

## Environment variables

- `NEXT_PUBLIC_GENESIS_MINT_LIVE`
  - "true" = live mint CTA
  - anything else = pre-mint CTA

- `NEXT_PUBLIC_GENESIS_MINT_URL`
  - Zora mint URL (used only when live flag is true)

## Canon behavior

Pre-mint:

- Primary CTA -> `/access`
- Secondary -> disabled "Genesis Mint - Coming Soon"

Post-mint:

- Primary CTA -> Zora mint URL
- Secondary -> `/access`
