export type MintState = "comingSoon" | "accessRequired" | "live";
export type TokenTradingState =
  | "notLiveYet"
  | "liquidityPending"
  | "tradingEnabled";

export type ArtifactPreviewConfig = {
  imageSrc: string;
  imageAlt: string;
  caption: string;
};

export type TierConfig = {
  slug: string;
  title: string;
  shortDescription: string;
  supplyLabel: string;
  rewardLabel: string;
  artifactLabel: string;
  includes: string[];
  callToAction: {
    label: string;
    href: string;
  };
  preview: ArtifactPreviewConfig;
};

export type DropConfig = {
  launchState: {
    publicFocus: "collection";
    mintState: MintState;
  };
  drop: {
    name: string;
    volume: string;
    manifesto: string[];
    overview: string;
    mintStatusLabel: string;
  };
  tiers: TierConfig[];
  token: {
    name: string;
    symbol: string;
    deployed: boolean;
    contractAddress: string;
    liquidityLive: boolean;
    tradingEnabled: boolean;
    ownerControlStatus: string;
    governanceStatus: string;
    utilitySummary: string;
    launchState: TokenTradingState;
  };
  links: {
    passportPlaceholder: string;
    checkoutPlaceholder: string;
    collectionManifest: string;
  };
};

export const dropConfig: DropConfig = {
  launchState: {
    publicFocus: "collection",
    mintState: "accessRequired",
  },
  drop: {
    name: "WHM: hOUR ARCHIVES",
    volume: "VOL. 1: TROPHY SCARS FROM THE hOUR",
    manifesto: [
      "The archive comes first. The token follows as the utility, reward, and proof layer around the work.",
      "Each artifact preserves process: notebook pages, scar tissue, edits, residue, and the marks that survived the room.",
      "This is a collectible proof-of-process release, not a generic prelaunch splash page.",
    ],
    overview:
      "TROPHY SCARS FROM THE hOUR is structured as a collector archive: 1/1 originals, limited editions, and lower-cost fragments that still carry the process record forward.",
    mintStatusLabel: "Collector access window active. Primary sale flow is modular and ready for Passport + Checkout wiring.",
  },
  tiers: [
    {
      slug: "og-scars",
      title: "OG SCARS",
      shortDescription:
        "One-of-one originals tied directly to notebook pages, edits, and physical proof-of-process fragments.",
      supplyLabel: "Supply: 1/1 originals",
      rewardLabel: "Reward: highest hOUR archive allocation",
      artifactLabel: "Original notebook-linked artifact",
      includes: [
        "Original archive-grade collectible",
        "Notebook page provenance",
        "Priority collector status for future archive drops",
      ],
      callToAction: {
        label: "Request OG Access",
        href: "/mint?tier=og-scars",
      },
      preview: {
        imageSrc: "/brand/sigils/whm-sigil-preview.png",
        imageAlt: "OG Scars preview placeholder",
        caption: "Notebook-linked original placeholder asset",
      },
    },
    {
      slug: "echo-scars",
      title: "ECHO SCARS",
      shortDescription:
        "Limited digital editions carrying the image, residue, and atmosphere of the original source materials.",
      supplyLabel: "Supply: limited digital editions",
      rewardLabel: "Reward: mid-tier hOUR archive allocation",
      artifactLabel: "Editioned scar echo",
      includes: [
        "Editioned collectible artifact",
        "Collector reward layer through hOUR",
        "Future archive utility and gated drops",
      ],
      callToAction: {
        label: "View Editions",
        href: "/mint?tier=echo-scars",
      },
      preview: {
        imageSrc: "/brand/sigils/whm-sigil edit 3.22.26 v2 1:1 .png",
        imageAlt: "Echo Scars preview placeholder",
        caption: "Edition preview placeholder asset",
      },
    },
    {
      slug: "scar-fragments",
      title: "SCAR FRAGMENTS",
      shortDescription:
        "Lower-cost entry artifacts for collectors who want a piece of the archive without the full original footprint.",
      supplyLabel: "Supply: open low-cost fragments",
      rewardLabel: "Reward: entry hOUR archive allocation",
      artifactLabel: "Fragment / entry artifact",
      includes: [
        "Accessible archive fragment",
        "Entry point into the collector ecosystem",
        "Expandable into future gated experiences",
      ],
      callToAction: {
        label: "Claim Fragment Access",
        href: "/mint?tier=scar-fragments",
      },
      preview: {
        imageSrc: "/brand/sigil-whm.svg",
        imageAlt: "Scar Fragments preview placeholder",
        caption: "Fragment placeholder asset",
      },
    },
  ],
  token: {
    name: "hOUR",
    symbol: "hOUR",
    deployed: true,
    contractAddress: "0xFC1c0FFF99845676A588CE21c28C4859F3035866",
    liquidityLive: false,
    tradingEnabled: false,
    ownerControlStatus: "Owner controls still active while launch ops remain staged.",
    governanceStatus:
      "Collector and holder governance framing is being defined, but no public governance handoff is live yet.",
    utilitySummary:
      "hOUR acts as the utility and reward layer for archive participation, holder access, and future gated experiences.",
    launchState: "liquidityPending",
  },
  links: {
    passportPlaceholder: "Passport-ready wallet entry point",
    checkoutPlaceholder: "Checkout-ready primary sale slot",
    collectionManifest: "/collection",
  },
};
