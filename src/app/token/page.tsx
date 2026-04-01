import { getHourTokenStatus } from "@/lib/hourToken";
import { SectionFrame } from "@/components/SectionFrame";
import { TokenStatusPanel } from "@/components/TokenStatusPanel";
import { dropConfig } from "@/lib/drop-config";

export const revalidate = 300;

export default async function TokenPage() {
  const status = await getHourTokenStatus();

  return (
    <main className="archive-page">
      <SectionFrame
        eyebrow="Token layer"
        title={`${dropConfig.token.name} supports the archive.`}
        subtitle="The collection is the public-facing drop. The token stays as utility, rewards, and future access infrastructure."
      >
        <TokenStatusPanel status={status} />
      </SectionFrame>
      <SectionFrame
        eyebrow="Launch operations"
        title="State-driven token framing"
        subtitle="The page is ready to swap from manual launch state into real on-chain reads without changing the structure."
      >
        <div className="mint-detail-grid">
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Utility</p>
            <p>{dropConfig.token.utilitySummary}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Owner</p>
            <p>{status.owner ?? dropConfig.token.ownerControlStatus}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Trading</p>
            <p>{status.tradingEnabled ? "Enabled" : "Not active"}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Liquidity</p>
            <p>{dropConfig.token.liquidityLive ? "Live" : "Pending"}</p>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}
