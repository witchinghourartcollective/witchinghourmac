import { CollectionHero } from "@/components/CollectionHero";
import { DropManifesto } from "@/components/DropManifesto";
import { SectionFrame } from "@/components/SectionFrame";
import { TierGrid } from "@/components/TierGrid";
import { TokenStatusPanel } from "@/components/TokenStatusPanel";
import { dropConfig } from "@/lib/drop-config";
import { getHourTokenStatus } from "@/lib/hourToken";

export const revalidate = 300;

export default async function Home() {
  const status = await getHourTokenStatus();

  return (
    <main className="archive-page">
      <CollectionHero />
      <SectionFrame
        eyebrow="Archive story"
        title="A live collection surface, not a holding page."
        subtitle="The site now opens on the work itself: scars, fragments, notebook residue, and the process record."
      >
        <DropManifesto />
      </SectionFrame>
      <SectionFrame
        eyebrow="Collection overview"
        title="The collection comes first."
        subtitle="hOUR sits underneath it as reward, utility, and future access infrastructure."
      >
        <TierGrid tiers={dropConfig.tiers} />
      </SectionFrame>
      <SectionFrame
        eyebrow="Token status"
        title="hOUR is the utility layer."
        subtitle="This section tracks token state without pretending trading is live when it is not."
      >
        <TokenStatusPanel status={status} />
      </SectionFrame>
    </main>
  );
}
