const HOUR_TOKEN_ADDRESS = "0xFC1c0FFF99845676A588CE21c28C4859F3035866";
const HOUR_TOKEN_RPC_URL =
  process.env.HOUR_TOKEN_RPC_URL || "https://mainnet.base.org";

const SELECTORS = {
  owner: "0x8da5cb5b",
  tradingEnabled: "0x76e6e8db",
  burnFee: "0xe45cbab0",
  liquidityFee: "0xb2af8dca",
  rewardFee: "0x3113e817",
  witchingStart: "0x6800b116",
  witchingEnd: "0xd5bd0f5d",
} as const;

export type HourTokenStatus = {
  owner: string | null;
  tradingEnabled: boolean | null;
  burnFee: number | null;
  liquidityFee: number | null;
  rewardFee: number | null;
  witchingStart: number | null;
  witchingEnd: number | null;
  fetchedAt: string;
  fetchError: string | null;
};

type JsonRpcResponse<T> = {
  result?: T;
  error?: {
    code: number;
    message: string;
  };
};

function hexToBigInt(value: string): bigint {
  return BigInt(value);
}

function decodeBool(value: string): boolean {
  return hexToBigInt(value) !== BigInt(0);
}

function decodeNumber(value: string): number {
  return Number(hexToBigInt(value));
}

function decodeAddress(value: string): string {
  return `0x${value.slice(-40)}`;
}

async function ethCall(data: string): Promise<string> {
  const response = await fetch(HOUR_TOKEN_RPC_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [
        {
          to: HOUR_TOKEN_ADDRESS,
          data,
        },
        "latest",
      ],
    }),
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(`rpc_http_${response.status}`);
  }

  const payload = (await response.json()) as JsonRpcResponse<string>;

  if (!payload.result) {
    throw new Error(payload.error?.message || "rpc_empty_result");
  }

  return payload.result;
}

export async function getHourTokenStatus(): Promise<HourTokenStatus> {
  try {
    const [
      owner,
      tradingEnabled,
      burnFee,
      liquidityFee,
      rewardFee,
      witchingStart,
      witchingEnd,
    ] = await Promise.all([
      ethCall(SELECTORS.owner),
      ethCall(SELECTORS.tradingEnabled),
      ethCall(SELECTORS.burnFee),
      ethCall(SELECTORS.liquidityFee),
      ethCall(SELECTORS.rewardFee),
      ethCall(SELECTORS.witchingStart),
      ethCall(SELECTORS.witchingEnd),
    ]);

    return {
      owner: decodeAddress(owner),
      tradingEnabled: decodeBool(tradingEnabled),
      burnFee: decodeNumber(burnFee),
      liquidityFee: decodeNumber(liquidityFee),
      rewardFee: decodeNumber(rewardFee),
      witchingStart: decodeNumber(witchingStart),
      witchingEnd: decodeNumber(witchingEnd),
      fetchedAt: new Date().toISOString(),
      fetchError: null,
    };
  } catch (error) {
    return {
      owner: null,
      tradingEnabled: null,
      burnFee: null,
      liquidityFee: null,
      rewardFee: null,
      witchingStart: null,
      witchingEnd: null,
      fetchedAt: new Date().toISOString(),
      fetchError: error instanceof Error ? error.message : "unknown_error",
    };
  }
}
