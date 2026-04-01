import type { ArtifactEntry, ArtifactTierSlug, ArtifactStatus } from "@/lib/archive-media";

export type MintState = "comingSoon" | "accessRequired" | "live";
export type TokenTradingState =
  | "notLiveYet"
  | "liquidityPending"
  | "tradingEnabled";
export type TierStatus = ArtifactStatus;

export type CreatorConfig = {
  id: string;
  name: string;
  shortName: string;
  description: string;
};

export type CollectionConfig = {
  id: string;
  creatorId: string;
  name: string;
  volume: string;
  manifesto: string[];
  overview: string;
  mintStatusLabel: string;
};

export type TierConfig = {
  slug: ArtifactTierSlug;
  creatorId: string;
  collectionId: string;
  title: string;
  shortDescription: string;
  artifactLabel: string;
  status: TierStatus;
  supply: number | null;
  maxSupply: number | null;
  rewardAmount: number;
  physicalIncluded: boolean;
  includes: string[];
  artifactIds: string[];
  callToAction: {
    label: string;
    href: string;
  };
};

export type DropConfig = {
  creators: CreatorConfig[];
  collections: CollectionConfig[];
  primaryCollectionId: string;
  launchState: {
    publicFocus: "collection";
    mintState: MintState;
  };
  tiers: TierConfig[];
  artifacts: ArtifactEntry[];
  token: {
    name: string;
    symbol: string;
    network: string;
    deployed: boolean;
    contractAddress: string;
    liquidityLive: boolean;
    tradingEnabled: boolean;
    ownerControlStatus: string;
    governanceStatus: string;
    utilitySummary: string;
    launchState: TokenTradingState;
  };
  integrations: {
    passport: {
      provider: string;
      status: "planned" | "wiring" | "live";
    };
    checkout: {
      provider: string;
      status: "planned" | "wiring" | "live";
    };
  };
  links: {
    collectionManifest: string;
  };
};

const creators: CreatorConfig[] = [
  {
    id: "whm",
    name: "Witching Hour Music",
    shortName: "WHM",
    description: "Founding archive creator for the hOUR collection surface.",
  },
];

const collections: CollectionConfig[] = [
  {
    id: "whm-hour-archives-vol-1",
    creatorId: "whm",
    name: "WHM: hOUR ARCHIVES",
    volume: "VOL. 1: TROPHY SCARS FROM THE hOUR",
    manifesto: [
      "The archive comes first. The token follows as the utility, reward, and proof layer around the work.",
      "Each artifact preserves process: notebook pages, scar tissue, edits, residue, and the marks that survived the room.",
      "This is a collectible proof-of-process release, not a generic prelaunch splash page.",
    ],
    overview:
      "TROPHY SCARS FROM THE hOUR is structured as a collector archive: 1/1 originals, limited editions, and lower-cost fragments that still carry the process record forward.",
    mintStatusLabel:
      "Collector access window active. Primary sale flow is modular and ready for Passport + Checkout wiring.",
  },
];

const primaryCollectionId = collections[0].id;

const tiers: TierConfig[] = [
  {
    slug: "og-scars",
    creatorId: "whm",
    collectionId: primaryCollectionId,
    title: "OG SCARS",
    shortDescription:
      "One-of-one originals tied directly to notebook pages, edits, and physical proof-of-process fragments.",
    artifactLabel: "Original notebook-linked artifact",
    status: "locked",
    supply: 1,
    maxSupply: 1,
    rewardAmount: 21369,
    physicalIncluded: true,
    includes: [
      "Original archive-grade collectible",
      "Notebook page provenance",
      "Priority collector status for future archive drops",
    ],
    artifactIds: ["artifact-og-scar-001"],
    callToAction: {
      label: "Request OG Access",
      href: "/mint?tier=og-scars",
    },
  },
  {
    slug: "echo-scars",
    creatorId: "whm",
    collectionId: primaryCollectionId,
    title: "ECHO SCARS",
    shortDescription:
      "Limited digital editions carrying the image, residue, and atmosphere of the original source materials.",
    artifactLabel: "Editioned scar echo",
    status: "early",
    supply: 0,
    maxSupply: 77,
    rewardAmount: 7777,
    physicalIncluded: false,
    includes: [
      "Editioned collectible artifact",
      "Collector reward layer through hOUR",
      "Future archive utility and gated drops",
    ],
    artifactIds: ["artifact-echo-scar-001", "artifact-echo-scar-002"],
    callToAction: {
      label: "View Editions",
      href: "/mint?tier=echo-scars",
    },
  },
  {
    slug: "scar-fragments",
    creatorId: "whm",
    collectionId: primaryCollectionId,
    title: "SCAR FRAGMENTS",
    shortDescription:
      "Lower-cost entry artifacts for collectors who want a piece of the archive without the full original footprint.",
    artifactLabel: "Fragment / entry artifact",
    status: "live",
    supply: 0,
    maxSupply: 369,
    rewardAmount: 3690,
    physicalIncluded: false,
    includes: [
      "Accessible archive fragment",
      "Entry point into the collector ecosystem",
      "Expandable into future gated experiences",
    ],
    artifactIds: [
      "artifact-fragment-001",
      "artifact-fragment-002",
      "artifact-fragment-003",
    ],
    callToAction: {
      label: "Claim Fragment Access",
      href: "/mint?tier=scar-fragments",
    },
  },
];

const artifacts: ArtifactEntry[] = [
  {
    id: "artifact-og-scar-001",
    title: "Trophy Scar / Original 001",
    creatorId: "whm",
    tier: "og-scars",
    image: null,
    thumbnail: null,
    audio: null,
    rewardAmount: 21369,
    physicalIncluded: true,
    status: "locked",
    availability: "locked",
    description:
      "Primary original held behind the inner ring. The page is visible, but the object itself stays withheld until access is earned.",
    emotion: "seared",
  },
  {
    id: "artifact-echo-scar-001",
    title: "Echo Scar / Plate 001",
    creatorId: "whm",
    tier: "echo-scars",
    image: null,
    thumbnail: null,
    audio: null,
    rewardAmount: 7777,
    physicalIncluded: false,
    status: "early",
    availability: "comingSoon",
    description:
      "Edition plate prepared for scan ingestion. Structure is live, media slot is waiting on the page.",
    emotion: "held breath",
  },
  {
    id: "artifact-echo-scar-002",
    title: "Echo Scar / Plate 002",
    creatorId: "whm",
    tier: "echo-scars",
    image: null,
    thumbnail: null,
    audio: null,
    rewardAmount: 7777,
    physicalIncluded: false,
    status: "early",
    availability: "comingSoon",
    description:
      "Second edition plate reserved for a later scan drop, present in the registry before the page itself is ready.",
    emotion: "residue",
  },
  {
    id: "artifact-fragment-001",
    title: "Fragment / Entry 001",
    creatorId: "whm",
    tier: "scar-fragments",
    image: null,
    thumbnail: null,
    audio: null,
    rewardAmount: 3690,
    physicalIncluded: false,
    status: "live",
    availability: "visible",
    description:
      "First fragment slot for collectors entering through the open archive tier.",
    emotion: "trace",
  },
  {
    id: "artifact-fragment-002",
    title: "Fragment / Entry 002",
    creatorId: "whm",
    tier: "scar-fragments",
    image: null,
    thumbnail: null,
    audio: null,
    rewardAmount: 3690,
    physicalIncluded: false,
    status: "live",
    availability: "visible",
    description:
      "Second fragment slot, built to accept scan media later without changing the collector surface.",
    emotion: "echo",
  },
  {
    id: "artifact-fragment-003",
    title: "Fragment / Entry 003",
    creatorId: "whm",
    tier: "scar-fragments",
    image: null,
    thumbnail: null,
    audio: null,
    rewardAmount: 3690,
    physicalIncluded: false,
    status: "live",
    availability: "visible",
    description:
      "Third fragment slot, ready for notebook-page ingestion and later reward handoff.",
    emotion: "ash",
  },
];

export function getPrimaryCollection(config: DropConfig): CollectionConfig {
  return (
    config.collections.find((collection) => collection.id === config.primaryCollectionId) ??
    config.collections[0]
  );
}

export function getCollectionById(
  config: DropConfig,
  collectionId: string,
): CollectionConfig | undefined {
  return config.collections.find((collection) => collection.id === collectionId);
}

export function getCreatorById(
  config: DropConfig,
  creatorId: string,
): CreatorConfig | undefined {
  return config.creators.find((creator) => creator.id === creatorId);
}

export function getTierSupplyLabel(tier: TierConfig): string {
  if (tier.supply !== null && tier.maxSupply !== null && tier.supply === tier.maxSupply) {
    return `${tier.supply}/${tier.maxSupply}`;
  }

  if (tier.supply !== null && tier.maxSupply !== null) {
    return `${tier.supply} of ${tier.maxSupply}`;
  }

  if (tier.maxSupply !== null) {
    return `max ${tier.maxSupply}`;
  }

  if (tier.supply !== null) {
    return `${tier.supply}`;
  }

  return "unmetered";
}

export function getTierRewardLabel(tier: TierConfig): string {
  return `${tier.rewardAmount.toLocaleString()} hOUR`;
}

export function getTierStatusLabel(status: TierStatus): string {
  switch (status) {
    case "live":
      return "live";
    case "early":
      return "early";
    case "locked":
    default:
      return "locked";
  }
}

export function getTierArtifacts(config: DropConfig, tier: TierConfig): ArtifactEntry[] {
  return tier.artifactIds.map((id) => {
    const artifact = config.artifacts.find((entry) => entry.id === id);

    if (artifact) {
      return artifact;
    }

    return {
      id,
      title: `${tier.title} placeholder`,
      creatorId: tier.creatorId,
      tier: tier.slug,
      image: null,
      thumbnail: null,
      audio: null,
      rewardAmount: tier.rewardAmount,
      physicalIncluded: tier.physicalIncluded,
      status: tier.status,
      availability: tier.status === "live" ? "visible" : tier.status === "early" ? "comingSoon" : "locked",
      description: `${tier.title} placeholder artifact awaiting scan ingestion.`,
      emotion: null,
    };
  });
}

export function getTierPrimaryArtifact(config: DropConfig, tier: TierConfig): ArtifactEntry {
  return getTierArtifacts(config, tier)[0];
}

export const dropConfig: DropConfig = {
  creators,
  collections,
  primaryCollectionId,
  launchState: {
    publicFocus: "collection",
    mintState: "accessRequired",
  },
  tiers,
  artifacts,
  token: {
    name: "hOUR",
    symbol: "hOUR",
    network: "Base",
    deployed: true,
    contractAddress: "0x47D0cA2dA0b56D7e3eA62dB174a5f0f2fF0fD39F",
    liquidityLive: false,
    tradingEnabled: false,
    ownerControlStatus: "Single-owner custody pre-launch. Planned post-launch multisig transfer after stability is confirmed.",
    governanceStatus: "Operator-controlled before launch. Reduced post-launch unless emergency intervention is required.",
    utilitySummary:
      "hOUR remains the reward and access substrate around the archive. It is not framed here as a live-trading spectacle.",
    launchState: "notLiveYet",
  },
  integrations: {
    passport: {
      provider: "Immutable Passport",
      status: "wiring",
    },
    checkout: {
      provider: "Immutable Checkout",
      status: "wiring",
    },
  },
  links: {
    collectionManifest: "/collection",
  },
};
