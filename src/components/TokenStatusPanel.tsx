import type { TokenStatusPanelData } from "@/lib/token-status-service";

type TokenStatusPanelProps = {
  data: TokenStatusPanelData;
};

export function TokenStatusPanel({ data }: TokenStatusPanelProps) {
  return (
    <div className="token-status-panel">
      <div className="token-status-panel__headline">
        <p className="token-status-panel__state">{data.headline}</p>
        <p className="token-status-panel__summary">{data.summary}</p>
      </div>
      <dl className="token-status-panel__grid">
        <div>
          <dt>Network</dt>
          <dd>{data.network}</dd>
        </div>
        <div>
          <dt>Deployed</dt>
          <dd>Yes</dd>
        </div>
        <div>
          <dt>Contract</dt>
          <dd className="token-status-panel__mono">
            {data.contractAddress}
          </dd>
        </div>
        <div>
          <dt>Trading enabled</dt>
          <dd>
            {data.tradingEnabled === null ? "Unknown" : data.tradingEnabled ? "Yes" : "No"}
          </dd>
        </div>
        <div>
          <dt>Liquidity live</dt>
          <dd>{data.liquidityLive ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt>Owner controls</dt>
          <dd>{data.ownerStatus}</dd>
        </div>
        <div>
          <dt>Governance</dt>
          <dd>{data.governanceStatus}</dd>
        </div>
      </dl>
      {data.fetchedAt || data.fetchError ? (
        <p className="token-status-panel__footnote">
          {data.fetchError
            ? `Live read unavailable: ${data.fetchError}`
            : `Last chain read: ${new Date(data.fetchedAt as string).toUTCString()}`}
        </p>
      ) : null}
    </div>
  );
}
