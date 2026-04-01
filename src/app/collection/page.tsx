import { CollectionHero } from "@/components/CollectionHero";
import { DropManifesto } from "@/components/DropManifesto";
import { SectionFrame } from "@/components/SectionFrame";
import { TierGrid } from "@/components/TierGrid";
import { dropConfig } from "@/lib/drop-config";

export default function CollectionPage() {
  return (
    <main className="archive-page">
      <CollectionHero />
      <SectionFrame
        eyebrow="Collection overview"
        title={dropConfig.drop.name}
        subtitle={dropConfig.drop.overview}
      >
        <DropManifesto />
      </SectionFrame>
      <SectionFrame
        eyebrow="Tier system"
        title="Three archive paths"
        subtitle="Originals, limited echoes, and fragments all route through the same collector architecture."
      >
        <TierGrid tiers={dropConfig.tiers} />
      </SectionFrame>
    </main>
  );
}
