import { MintActionPanel } from "@/components/MintActionPanel";
import { SectionFrame } from "@/components/SectionFrame";
import { TokenStatusPanel } from "@/components/TokenStatusPanel";
import { dropConfig } from "@/lib/drop-config";
import { getHourTokenStatus } from "@/lib/hourToken";

export const revalidate = 300;

export default async function MintPage() {
  const selectedTier = dropConfig.tiers[0];
  const status = await getHourTokenStatus();

  return (
    <main className="archive-page">
      <SectionFrame
        eyebrow="Purchase / claim"
        title={dropConfig.drop.volume}
        subtitle="Canonical mint surface for the archive collection. No split prelaunch language, no alternate product framing."
      >
        <MintActionPanel
          mintState={dropConfig.launchState.mintState}
          tier={selectedTier}
        />
      </SectionFrame>
      <SectionFrame
        eyebrow="Selected artifact"
        title={selectedTier.title}
        subtitle={selectedTier.shortDescription}
      >
        <div className="mint-detail-grid">
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Supply label</p>
            <p>{selectedTier.supplyLabel}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Reward label</p>
            <p>{selectedTier.rewardLabel}</p>
          </div>
          <div className="mint-detail-card mint-detail-card--wide">
            <p className="mint-detail-card__eyebrow">What&apos;s included</p>
            <ul className="mint-detail-card__list">
              {selectedTier.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mint-detail-card mint-detail-card--wide">
            <p className="mint-detail-card__eyebrow">Other archive paths</p>
            <ul className="mint-detail-card__list">
              {dropConfig.tiers
                .filter((tier) => tier.slug !== selectedTier.slug)
                .map((tier) => (
                  <li key={tier.slug}>
                    {tier.title}: {tier.shortDescription}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </SectionFrame>
      <SectionFrame
        eyebrow="Status area"
        title={dropConfig.drop.mintStatusLabel}
        subtitle="Token state remains visible here so the collector purchase page can stay honest about what is live."
      >
        <TokenStatusPanel status={status} />
      </SectionFrame>
    </main>
  );
}
