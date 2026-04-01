import type { ArtifactEntry } from "@/lib/archive-media";
import type { PurchaseIntent } from "@/lib/checkout/types";
import type { TierConfig, TierStatus } from "@/lib/drop-config";
import type { WalletState } from "@/hooks/useWalletState";

export type MintPanelState =
  | "disconnected"
  | "connected"
  | "gated"
  | "live"
  | "unavailable";

export type MintModuleState = {
  label: string;
  state: string;
  summary: string;
  actionLabel: string;
  provider?: string;
};

export type MintActionModel = {
  panelState: MintPanelState;
  selectedTier: {
    slug: string;
    title: string;
    status: TierStatus;
    rewardAmount: number;
  };
  selectedArtifact: {
    id: string;
    title: string;
    rewardAmount: number;
    physicalIncluded: boolean;
    availability: ArtifactEntry["availability"];
  };
  purchaseIntent: PurchaseIntent;
  wallet: MintModuleState;
  access: MintModuleState;
  mint: MintModuleState;
  primaryAction: {
    label: string;
    href: string;
  };
};

function resolvePanelState(params: {
  artifactAvailability: ArtifactEntry["availability"];
  walletState: WalletState;
  launchState: "comingSoon" | "accessRequired" | "live";
}): MintPanelState {
  if (params.walletState === "unavailable") {
    return "unavailable";
  }

  if (params.walletState === "disconnected") {
    return "disconnected";
  }

  if (params.artifactAvailability === "comingSoon") {
    return "connected";
  }

  if (params.artifactAvailability === "locked") {
    return "gated";
  }

  if (params.launchState === "live") {
    return "live";
  }

  if (params.launchState === "accessRequired") {
    return "gated";
  }

  return "connected";
}

export function getMintActionModel(params: {
  tier: TierConfig;
  artifact: ArtifactEntry;
  purchaseIntent: PurchaseIntent;
  walletState: WalletState;
  walletAddress: string | null;
  launchState: "comingSoon" | "accessRequired" | "live";
  passportProvider: string;
  checkoutProvider: string;
}): MintActionModel {
  const panelState = resolvePanelState({
    artifactAvailability: params.artifact.availability,
    walletState: params.walletState,
    launchState: params.launchState,
  });

  const walletSummary =
    params.walletState === "connected"
      ? `Passport session present${params.walletAddress ? ` for ${params.walletAddress}` : ""}.`
      : params.walletState === "unavailable"
        ? "Passport is not configured in this environment yet."
        : "Passport can connect the collector wallet here without leaking SDK logic into the page shell.";

  const accessSummary =
    params.artifact.availability === "locked"
      ? "This artifact is visible in the archive but stays withheld until access is explicitly granted."
      : panelState === "gated"
      ? "Collector is connected, but access rules still gate the sale path."
      : panelState === "live"
        ? "Collector is connected and the access boundary is ready to hand off to checkout."
        : "Access stays separate from wallet auth so tier gating can be wired later without panel rewrites.";

  const mintSummary =
    params.artifact.availability === "comingSoon"
      ? "This entry exists in the archive registry, but the sale surface stays dormant until media and release state are opened."
      : panelState === "live"
      ? `Checkout handoff is prepared for ${params.purchaseIntent.artifactId}.`
      : panelState === "gated"
        ? "Checkout stays dormant until access is verified."
        : panelState === "connected"
          ? "Collector session is ready, but the sale window is not open."
          : panelState === "unavailable"
            ? "Checkout intent can be built, but wallet-auth is unavailable."
            : "Mint stays closed until a collector session exists.";

  const primaryAction =
    panelState === "unavailable"
      ? { label: "Passport unavailable", href: "#" }
      : panelState === "disconnected"
        ? { label: "Connect with Passport", href: "#" }
        : panelState === "connected"
          ? { label: "Access coming soon", href: "#" }
          : panelState === "gated"
            ? { label: "Verify / request access", href: "/access" }
            : { label: "Continue to checkout", href: params.tier.callToAction.href };

  return {
    panelState,
    selectedTier: {
      slug: params.tier.slug,
      title: params.tier.title,
      status: params.tier.status,
      rewardAmount: params.tier.rewardAmount,
    },
    selectedArtifact: {
      id: params.artifact.id,
      title: params.artifact.title,
      rewardAmount: params.artifact.rewardAmount,
      physicalIncluded: params.artifact.physicalIncluded,
      availability: params.artifact.availability,
    },
    purchaseIntent: params.purchaseIntent,
    wallet: {
      label: "Wallet state",
      state: params.walletState,
      summary: walletSummary,
      actionLabel: primaryAction.label,
      provider: params.passportProvider,
    },
    access: {
      label: "Access state",
      state: panelState === "gated" ? "gated" : panelState === "live" ? "ready" : "staged",
      summary: accessSummary,
      actionLabel: panelState === "gated" ? "Verify access" : "Access staged",
    },
    mint: {
      label: "Mint state",
      state: panelState,
      summary: mintSummary,
      actionLabel: primaryAction.label,
      provider: params.checkoutProvider,
    },
    primaryAction,
  };
}
