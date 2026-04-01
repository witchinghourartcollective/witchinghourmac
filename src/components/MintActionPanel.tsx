import Link from "next/link";

import type { MintState, TierConfig } from "@/lib/drop-config";

const mintStateCopy: Record<
  MintState,
  {
    label: string;
    description: string;
    cta: string;
  }
> = {
  comingSoon: {
    label: "Coming soon",
    description:
      "The collection architecture is live, but the primary sale window has not opened yet.",
    cta: "Mint window not open",
  },
  accessRequired: {
    label: "Access required",
    description:
      "Collector access is being staged first. Wallet auth and allowlist logic stay modular for Passport integration.",
    cta: "Request collector access",
  },
  live: {
    label: "Live",
    description:
      "Primary sale is live. Wallet connect and purchase actions can be routed through the modular Passport + Checkout boundary.",
    cta: "Connect and mint",
  },
};

type MintActionPanelProps = {
  mintState: MintState;
  tier: TierConfig;
};

export function MintActionPanel({ mintState, tier }: MintActionPanelProps) {
  const copy = mintStateCopy[mintState];

  return (
    <div className="mint-action-panel">
      <div className="mint-action-panel__status">
        <p className="mint-action-panel__label">{copy.label}</p>
        <p>{copy.description}</p>
      </div>
      <div className="mint-action-panel__stack">
        <div>
          <p className="mint-action-panel__mini">Selected tier</p>
          <p className="mint-action-panel__value">{tier.title}</p>
        </div>
        <div>
          <p className="mint-action-panel__mini">What&apos;s included</p>
          <ul className="mint-action-panel__list">
            {tier.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mint-action-panel__mini">hOUR reward amount</p>
          <p className="mint-action-panel__value">{tier.rewardLabel}</p>
        </div>
      </div>
      <div className="mint-action-panel__cta-group">
        <Link href={tier.callToAction.href} className="mint-action-panel__cta">
          {copy.cta}
        </Link>
        <div className="mint-action-panel__modular">
          <p>Wallet/Auth Module</p>
          <span>Passport-ready entry seam</span>
        </div>
        <div className="mint-action-panel__modular">
          <p>Primary Sale Module</p>
          <span>Checkout-ready purchase seam</span>
        </div>
      </div>
    </div>
  );
}
