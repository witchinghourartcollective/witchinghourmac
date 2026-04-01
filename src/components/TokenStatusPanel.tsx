import type { HourTokenStatus } from "@/lib/hourToken";
import { dropConfig, type TokenTradingState } from "@/lib/drop-config";

function resolveTradingState(
  onChainTradingEnabled: boolean | null,
): TokenTradingState {
  if (onChainTradingEnabled === true) {
    return "tradingEnabled";
  }

  if (dropConfig.token.liquidityLive) {
    return "liquidityPending";
  }

  return "notLiveYet";
}

function statusLabel(state: TokenTradingState) {
  switch (state) {
    case "tradingEnabled":
      return "Trading enabled";
    case "liquidityPending":
      return "Liquidity pending";
    case "notLiveYet":
    default:
      return "Not live yet";
  }
}

type TokenStatusPanelProps = {
  status?: HourTokenStatus;
};

export function TokenStatusPanel({ status }: TokenStatusPanelProps) {
  const tradingEnabled =
    status?.tradingEnabled ?? dropConfig.token.tradingEnabled;
  const launchState = resolveTradingState(status?.tradingEnabled ?? null);

  return (
    <div className="token-status-panel">
      <div className="token-status-panel__headline">
        <p className="token-status-panel__state">{statusLabel(launchState)}</p>
        <p className="token-status-panel__summary">{dropConfig.token.utilitySummary}</p>
      </div>
      <dl className="token-status-panel__grid">
        <div>
          <dt>Deployed</dt>
          <dd>{dropConfig.token.deployed ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt>Contract</dt>
          <dd className="token-status-panel__mono">
            {dropConfig.token.contractAddress}
          </dd>
        </div>
        <div>
          <dt>Trading enabled</dt>
          <dd>{tradingEnabled ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt>Liquidity live</dt>
          <dd>{dropConfig.token.liquidityLive ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt>Owner controls</dt>
          <dd>{dropConfig.token.ownerControlStatus}</dd>
        </div>
        <div>
          <dt>Governance</dt>
          <dd>{dropConfig.token.governanceStatus}</dd>
        </div>
      </dl>
      {status ? (
        <p className="token-status-panel__footnote">
          {status.fetchError
            ? `Live read unavailable: ${status.fetchError}`
            : `Last chain read: ${new Date(status.fetchedAt).toUTCString()}`}
        </p>
      ) : null}
    </div>
  );
}
