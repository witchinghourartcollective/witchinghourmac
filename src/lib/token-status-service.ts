import { dropConfig, type TokenTradingState } from "@/lib/drop-config";
import type { HourTokenStatus } from "@/lib/hourToken";

export type TokenStatusPanelData = {
  headline: string;
  summary: string;
  network: string;
  contractAddress: string;
  tradingEnabled: boolean | null;
  liquidityLive: boolean;
  launchState: TokenTradingState;
  ownerStatus: string;
  governanceStatus: string;
  fetchedAt: string | null;
  fetchError: string | null;
};

function resolveTradingState(
  onChainTradingEnabled: boolean | null,
  liquidityLive: boolean,
): TokenTradingState {
  if (onChainTradingEnabled === true) {
    return "tradingEnabled";
  }

  if (liquidityLive) {
    return "liquidityPending";
  }

  return "notLiveYet";
}

function resolveHeadline(state: TokenTradingState): string {
  switch (state) {
    case "tradingEnabled":
      return "Trading enabled";
    case "liquidityPending":
      return "Liquidity staged, trading still closed";
    case "notLiveYet":
    default:
      return "Trading disabled";
  }
}

export function getTokenStatusPanelData(status?: HourTokenStatus): TokenStatusPanelData {
  const tradingEnabled = status?.tradingEnabled ?? dropConfig.token.tradingEnabled;
  const liquidityLive = dropConfig.token.liquidityLive;
  const launchState = resolveTradingState(status?.tradingEnabled ?? null, liquidityLive);

  return {
    headline: resolveHeadline(launchState),
    summary: dropConfig.token.utilitySummary,
    network: dropConfig.token.network,
    contractAddress: dropConfig.token.contractAddress,
    tradingEnabled,
    liquidityLive,
    launchState,
    ownerStatus: status?.owner ?? dropConfig.token.ownerControlStatus,
    governanceStatus: dropConfig.token.governanceStatus,
    fetchedAt: status?.fetchedAt ?? null,
    fetchError: status?.fetchError ?? null,
  };
}
