import Image from "next/image";

import type { ArtifactPreviewConfig } from "@/lib/drop-config";

type ArtifactPreviewProps = {
  preview: ArtifactPreviewConfig;
};

export function ArtifactPreview({ preview }: ArtifactPreviewProps) {
  return (
    <figure className="artifact-preview">
      <div className="artifact-preview__frame">
        <Image
          src={preview.imageSrc}
          alt={preview.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="artifact-preview__image"
        />
      </div>
      <figcaption className="artifact-preview__caption">
        {preview.caption}
      </figcaption>
    </figure>
  );
}
