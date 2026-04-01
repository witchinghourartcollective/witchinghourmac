import Link from "next/link";

import { getArtifactAvailabilityLabel } from "@/lib/archive-media";
import { getTierRewardLabel, getTierStatusLabel, type TierConfig } from "@/lib/drop-config";
import type { MintActionModel } from "@/lib/mint-flow";

type MintActionPanelProps = {
  tier: TierConfig;
  model: MintActionModel;
};

export function MintActionPanel({ tier, model }: MintActionPanelProps) {
  return (
    <div className="mint-action-panel">
      <div className="mint-action-panel__status">
        <p className="mint-action-panel__label">{model.panelState}</p>
        <p>{model.mint.summary}</p>
      </div>
      <div className="mint-action-panel__stack">
        <div>
          <p className="mint-action-panel__mini">Selected tier</p>
          <p className="mint-action-panel__value">
            {tier.title} / {getTierStatusLabel(tier.status)}
          </p>
        </div>
        <div>
          <p className="mint-action-panel__mini">Selected artifact</p>
          <p className="mint-action-panel__value">
            {model.selectedArtifact.title} / {model.selectedArtifact.id}
          </p>
          <p className="mint-action-panel__hint">
            {getArtifactAvailabilityLabel(model.selectedArtifact.availability)}
          </p>
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
          <p className="mint-action-panel__value">{getTierRewardLabel(tier)}</p>
        </div>
        <div>
          <p className="mint-action-panel__mini">Physical included</p>
          <p className="mint-action-panel__value">
            {model.selectedArtifact.physicalIncluded ? "Yes" : "No"}
          </p>
        </div>
      </div>
      <div className="mint-action-panel__cta-group">
        <Link
          href={model.primaryAction.href}
          className="mint-action-panel__cta"
          aria-disabled={model.primaryAction.href === "#"}
        >
          {model.primaryAction.label}
        </Link>
        <div className="mint-action-panel__modular">
          <p>{model.wallet.label}</p>
          <span>
            {model.wallet.provider ? `${model.wallet.provider} / ` : ""}
            {model.wallet.summary}
          </span>
        </div>
        <div className="mint-action-panel__modular">
          <p>{model.access.label}</p>
          <span>{model.access.summary}</span>
        </div>
        <div className="mint-action-panel__modular">
          <p>{model.mint.label}</p>
          <span>
            {model.mint.provider ? `${model.mint.provider} / ` : ""}
            {model.mint.summary}
          </span>
        </div>
      </div>
    </div>
  );
}
