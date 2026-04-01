"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ArtifactPreview } from "@/components/ArtifactPreview";
import { MintActionPanel } from "@/components/MintActionPanel";
import { SectionFrame } from "@/components/SectionFrame";
import { createPurchaseIntent } from "@/lib/checkout/createPurchaseIntent";
import {
  dropConfig,
  getCreatorById,
  getPrimaryCollection,
  getTierArtifacts,
  getTierRewardLabel,
  getTierStatusLabel,
  getTierSupplyLabel,
} from "@/lib/drop-config";
import { getArtifactAvailabilityLabel } from "@/lib/archive-media";
import { usePassport } from "@/hooks/usePassport";
import { useWalletState } from "@/hooks/useWalletState";
import { getMintActionModel } from "@/lib/mint-flow";

export function MintTierBrowser() {
  const searchParams = useSearchParams();
  const requestedTier = searchParams.get("tier");
  const { session } = usePassport();
  const { walletAddress, walletState } = useWalletState(session);
  const collection = getPrimaryCollection(dropConfig);
  const selectedTier =
    dropConfig.tiers.find((tier) => tier.slug === requestedTier) ?? dropConfig.tiers[0];
  const artifacts = getTierArtifacts(dropConfig, selectedTier);
  const selectedArtifact = artifacts[0];
  const creator = getCreatorById(dropConfig, selectedTier.creatorId);
  const purchaseIntent = createPurchaseIntent({
    artifact: selectedArtifact,
    walletAddress,
    accessRequired: dropConfig.launchState.mintState !== "live",
    launchState: walletState === "unavailable" ? "unavailable" : selectedArtifact.status,
  });
  const mintModel = getMintActionModel({
    tier: selectedTier,
    artifact: selectedArtifact,
    purchaseIntent,
    walletState,
    walletAddress,
    launchState: dropConfig.launchState.mintState,
    passportProvider: dropConfig.integrations.passport.provider,
    checkoutProvider: dropConfig.integrations.checkout.provider,
  });

  return (
    <>
      <SectionFrame
        eyebrow="Purchase / claim"
        title={collection.volume}
        subtitle="Canonical mint surface for the archive collection. No split prelaunch language, no alternate product framing."
      >
        <MintActionPanel tier={selectedTier} model={mintModel} />
      </SectionFrame>
      <SectionFrame
        eyebrow="Selected artifact"
        title={selectedArtifact.title}
        subtitle={selectedArtifact.description}
      >
        <div className="mint-detail-grid">
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Supply</p>
            <p>{getTierSupplyLabel(selectedTier)}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Reward</p>
            <p>{getTierRewardLabel(selectedTier)}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Tier status</p>
            <p>{getTierStatusLabel(selectedTier.status)}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Availability</p>
            <p>{getArtifactAvailabilityLabel(selectedArtifact)}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Creator</p>
            <p>{creator ? creator.name : selectedTier.creatorId}</p>
          </div>
          <div className="mint-detail-card mint-detail-card--wide">
            <p className="mint-detail-card__eyebrow">Artifact preview</p>
            <ArtifactPreview artifact={selectedArtifact} />
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
            <p className="mint-detail-card__eyebrow">Artifact entries</p>
            <ul className="mint-detail-card__list">
              {artifacts.map((artifact) => (
                <li key={artifact.id}>
                  {artifact.id} / {artifact.status} / {getArtifactAvailabilityLabel(artifact)} /{" "}
                  {artifact.image ? "image ready" : "fallback image"}
                </li>
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
                    {getTierArtifacts(dropConfig, tier)[0].availability === "visible" ? (
                      <Link href={tier.callToAction.href}>{tier.title}</Link>
                    ) : (
                      <span>{tier.title}</span>
                    )}{" "}
                    / {getTierStatusLabel(tier.status)} / {getTierSupplyLabel(tier)} /{" "}
                    {getArtifactAvailabilityLabel(getTierArtifacts(dropConfig, tier)[0])}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </SectionFrame>
    </>
  );
}
