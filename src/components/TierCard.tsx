import Link from "next/link";

import { ArtifactPreview } from "@/components/ArtifactPreview";
import { getArtifactAvailabilityLabel } from "@/lib/archive-media";
import {
  dropConfig,
  getCreatorById,
  getTierPrimaryArtifact,
  getTierRewardLabel,
  getTierStatusLabel,
  getTierSupplyLabel,
  type TierConfig,
} from "@/lib/drop-config";

type TierCardProps = {
  tier: TierConfig;
};

export function TierCard({ tier }: TierCardProps) {
  const artifact = getTierPrimaryArtifact(dropConfig, tier);
  const creator = getCreatorById(dropConfig, tier.creatorId);
  const isAccessible = artifact.availability === "visible";

  return (
    <article className="tier-card">
      <ArtifactPreview artifact={artifact} />
      <div className="tier-card__body">
        <div className="tier-card__head">
          <p className="tier-card__artifact">{tier.artifactLabel}</p>
          <h3 className="tier-card__title">{tier.title}</h3>
        </div>
        <p className="tier-card__description">{tier.shortDescription}</p>
        <p className="tier-card__meta">
          {creator ? creator.shortName : tier.creatorId} / {getArtifactAvailabilityLabel(artifact)}
        </p>
        <dl className="tier-card__stats">
          <div>
            <dt>Status</dt>
            <dd>{getTierStatusLabel(tier.status)}</dd>
          </div>
          <div>
            <dt>Supply</dt>
            <dd>{getTierSupplyLabel(tier)}</dd>
          </div>
          <div>
            <dt>Reward</dt>
            <dd>{getTierRewardLabel(tier)}</dd>
          </div>
        </dl>
        <ul className="tier-card__includes">
          {tier.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {isAccessible ? (
          <Link href={tier.callToAction.href} className="tier-card__cta">
            {tier.callToAction.label}
          </Link>
        ) : (
          <span className="tier-card__cta tier-card__cta--disabled" aria-disabled="true">
            {artifact.availability === "locked" ? "Locked in archive" : "Coming soon"}
          </span>
        )}
      </div>
    </article>
  );
}
