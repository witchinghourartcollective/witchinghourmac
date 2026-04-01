import { dropConfig, getCreatorById, getPrimaryCollection } from "@/lib/drop-config";
import type { ArtifactEntry } from "@/lib/archive-media";

export type CollectorStatus = "visitor" | "collector" | "holder" | "inner_circle";

export type CollectorProfile = {
  status: CollectorStatus;
  statusLabel: string;
  statusSummary: string;
  totalCollected: number;
  hourBalance: number;
  ownedArtifacts: ArtifactEntry[];
  creator: {
    id: string;
    name: string;
    shortName: string;
  } | null;
};

const MOCK_OWNED_ARTIFACT_IDS = ["artifact-fragment-001", "artifact-fragment-002"];
const MOCK_HOUR_BALANCE = 7380;

export function deriveCollectorStatus(ownedArtifacts: ArtifactEntry[], hourBalance: number): CollectorStatus {
  if (ownedArtifacts.some((artifact) => artifact.tier === "og-scars")) {
    return "inner_circle";
  }

  if (hourBalance > 0 || ownedArtifacts.length >= 2) {
    return "holder";
  }

  if (ownedArtifacts.length >= 1) {
    return "collector";
  }

  return "visitor";
}

export function getCollectorStatusLabel(status: CollectorStatus): string {
  switch (status) {
    case "collector":
      return "collector";
    case "holder":
      return "holder";
    case "inner_circle":
      return "inner circle";
    case "visitor":
    default:
      return "visitor";
  }
}

export function getCollectorStatusSummary(status: CollectorStatus): string {
  switch (status) {
    case "collector":
      return "Archive entry achieved. The collector has taken something home, but the deeper rooms are still gated.";
    case "holder":
      return "The collector is carrying both archive pieces and hOUR residue. Future doors can key off that balance.";
    case "inner_circle":
      return "The collector has reached the original layer. Access stops being browse-only and starts becoming custodial.";
    case "visitor":
    default:
      return "The archive is open to view, but nothing is carried yet.";
  }
}

export function getMockCollectorProfile(): CollectorProfile {
  const ownedArtifacts = dropConfig.artifacts.filter((artifact) =>
    MOCK_OWNED_ARTIFACT_IDS.includes(artifact.id),
  );
  const status = deriveCollectorStatus(ownedArtifacts, MOCK_HOUR_BALANCE);
  const creatorId = ownedArtifacts[0]?.creatorId ?? getPrimaryCollection(dropConfig).creatorId;
  const creator = getCreatorById(dropConfig, creatorId);

  return {
    status,
    statusLabel: getCollectorStatusLabel(status),
    statusSummary: getCollectorStatusSummary(status),
    totalCollected: ownedArtifacts.length,
    hourBalance: MOCK_HOUR_BALANCE,
    ownedArtifacts,
    creator: creator
      ? {
          id: creator.id,
          name: creator.name,
          shortName: creator.shortName,
        }
      : null,
  };
}
