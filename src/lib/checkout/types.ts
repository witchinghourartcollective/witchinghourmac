import type { ArtifactStatus, ArtifactTierSlug } from "@/lib/archive-media";

export type PurchaseIntent = {
  tierId: ArtifactTierSlug;
  artifactId: string;
  rewardAmount: number;
  walletAddress: string | null;
  accessRequired: boolean;
  launchState: ArtifactStatus | "unavailable";
};
