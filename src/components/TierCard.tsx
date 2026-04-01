import Link from "next/link";

import type { TierConfig } from "@/lib/drop-config";
import { ArtifactPreview } from "@/components/ArtifactPreview";

type TierCardProps = {
  tier: TierConfig;
};

export function TierCard({ tier }: TierCardProps) {
  return (
    <article className="tier-card">
      <ArtifactPreview preview={tier.preview} />
      <div className="tier-card__body">
        <div className="tier-card__head">
          <p className="tier-card__artifact">{tier.artifactLabel}</p>
          <h3 className="tier-card__title">{tier.title}</h3>
        </div>
        <p className="tier-card__description">{tier.shortDescription}</p>
        <dl className="tier-card__stats">
          <div>
            <dt>Supply</dt>
            <dd>{tier.supplyLabel}</dd>
          </div>
          <div>
            <dt>Reward</dt>
            <dd>{tier.rewardLabel}</dd>
          </div>
        </dl>
        <ul className="tier-card__includes">
          {tier.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link href={tier.callToAction.href} className="tier-card__cta">
          {tier.callToAction.label}
        </Link>
      </div>
    </article>
  );
}
