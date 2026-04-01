import Image from "next/image";

import {
  getArtifactAvailabilityLabel,
  resolveArtifactImage,
  type ArtifactEntry,
} from "@/lib/archive-media";

type ArtifactPreviewProps = {
  artifact: ArtifactEntry;
};

export function ArtifactPreview({ artifact }: ArtifactPreviewProps) {
  return (
    <figure className="artifact-preview">
      <div className="artifact-preview__frame">
        <Image
          src={resolveArtifactImage(artifact)}
          alt={artifact.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="artifact-preview__image"
        />
      </div>
      <figcaption className="artifact-preview__caption">
        {artifact.id} / {getArtifactAvailabilityLabel(artifact)}
      </figcaption>
    </figure>
  );
}
