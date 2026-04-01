export type PassportAvailability = "available" | "disabled";
export type PassportConnectionState = "disconnected" | "connected";

export type PassportSession = {
  availability: PassportAvailability;
  connectionState: PassportConnectionState;
  walletAddress: string | null;
  accountLabel: string | null;
};

export interface PassportAdapter {
  getSession(): PassportSession;
  connect(): Promise<PassportSession>;
  disconnect(): Promise<void>;
}

export function getPassportAvailability(): PassportAvailability {
  return process.env.NEXT_PUBLIC_IMMUTABLE_PASSPORT_CLIENT_ID ? "available" : "disabled";
}

const noopAdapter: PassportAdapter = {
  getSession() {
    return {
      availability: getPassportAvailability(),
      connectionState: "disconnected",
      walletAddress: null,
      accountLabel: null,
    };
  },
  async connect() {
    return {
      availability: getPassportAvailability(),
      connectionState: "disconnected",
      walletAddress: null,
      accountLabel: null,
    };
  },
  async disconnect() {},
};

export function getPassportAdapter(): PassportAdapter {
  return noopAdapter;
}
