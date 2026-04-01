import { getHourTokenStatus } from "@/lib/hourToken";
import { SectionFrame } from "@/components/SectionFrame";
import { TokenStatusPanel } from "@/components/TokenStatusPanel";
import { dropConfig } from "@/lib/drop-config";
import { getTokenStatusPanelData } from "@/lib/token-status-service";

export const revalidate = 300;

export default async function TokenPage() {
  const status = await getHourTokenStatus();
  const tokenPanelData = getTokenStatusPanelData(status);

  return (
    <main className="archive-page">
      <SectionFrame
        eyebrow="Token layer"
        title={`${dropConfig.token.name} supports the archive.`}
        subtitle="The collection is the public-facing drop. The token stays as utility, rewards, and future access infrastructure."
      >
        <TokenStatusPanel data={tokenPanelData} />
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
            <p>{tokenPanelData.ownerStatus}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Trading</p>
            <p>{tokenPanelData.tradingEnabled ? "Enabled" : "Not active"}</p>
          </div>
          <div className="mint-detail-card">
            <p className="mint-detail-card__eyebrow">Liquidity</p>
            <p>{tokenPanelData.liquidityLive ? "Live" : "Pending"}</p>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}
