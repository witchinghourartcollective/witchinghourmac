export type ArtifactTierSlug = "og-scars" | "echo-scars" | "scar-fragments";
export type ArtifactStatus = "locked" | "early" | "live";
export type ArtifactAvailability = "visible" | "locked" | "comingSoon";

export type ArtifactEntry = {
  id: string;
  title: string;
  creatorId: string;
  tier: ArtifactTierSlug;
  image: string | null;
  thumbnail: string | null;
  audio?: string | null;
  rewardAmount: number;
  physicalIncluded: boolean;
  status: ArtifactStatus;
  availability: ArtifactAvailability;
  description: string;
  emotion?: string | null;
};

const FALLBACK_IMAGE = "/assets/placeholders/archival-sheet.svg";
const FALLBACK_THUMBNAIL = "/assets/placeholders/archival-thumb.svg";

export function resolveArtifactImage(entry: ArtifactEntry): string {
  return entry.image || FALLBACK_IMAGE;
}

export function resolveArtifactThumbnail(entry: ArtifactEntry): string {
  return entry.thumbnail || FALLBACK_THUMBNAIL;
}

export function hasArtifactAudio(entry: ArtifactEntry): boolean {
  return Boolean(entry.audio);
}

export function getArtifactAvailabilityLabel(
  entryOrAvailability: ArtifactEntry | ArtifactAvailability,
): string {
  const availability =
    typeof entryOrAvailability === "string"
      ? entryOrAvailability
      : entryOrAvailability.availability;

  switch (availability) {
    case "locked":
      return "locked";
    case "comingSoon":
      return "coming soon";
    case "visible":
    default:
      return "visible";
  }
}
