import { Suspense } from "react";

import { MintTierBrowser } from "@/components/MintTierBrowser";
import { SectionFrame } from "@/components/SectionFrame";
import { TokenStatusPanel } from "@/components/TokenStatusPanel";
import { dropConfig, getPrimaryCollection } from "@/lib/drop-config";
import { getHourTokenStatus } from "@/lib/hourToken";
import { getTokenStatusPanelData } from "@/lib/token-status-service";

export const revalidate = 300;

export default async function MintPage() {
  const status = await getHourTokenStatus();
  const tokenPanelData = getTokenStatusPanelData(status);
  const collection = getPrimaryCollection(dropConfig);

  return (
    <main className="archive-page">
      <Suspense fallback={null}>
        <MintTierBrowser />
      </Suspense>
      <SectionFrame
        eyebrow="Status area"
        title={collection.mintStatusLabel}
        subtitle="Token state remains visible here so the collector purchase page can stay honest about what is live."
      >
        <TokenStatusPanel data={tokenPanelData} />
      </SectionFrame>
    </main>
  );
}
