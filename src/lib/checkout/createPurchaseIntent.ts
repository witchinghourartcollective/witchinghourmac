import type { ArtifactEntry } from "@/lib/archive-media";
import type { PurchaseIntent } from "@/lib/checkout/types";

export function createPurchaseIntent(params: {
  artifact: ArtifactEntry;
  walletAddress: string | null;
  accessRequired: boolean;
  launchState: PurchaseIntent["launchState"];
}): PurchaseIntent {
  return {
    tierId: params.artifact.tier,
    artifactId: params.artifact.id,
    rewardAmount: params.artifact.rewardAmount,
    walletAddress: params.walletAddress,
    accessRequired: params.accessRequired,
    launchState: params.launchState,
  };
}
