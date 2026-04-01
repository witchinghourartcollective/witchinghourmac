"use client";

import { useMemo } from "react";

import { canUsePassport, isWalletConnected } from "@/lib/immutable/auth";
import type { PassportSession } from "@/lib/immutable/passport";

export type WalletState = "unavailable" | "disconnected" | "connected";

export function useWalletState(session: PassportSession) {
  return useMemo(() => {
    const walletState: WalletState = !canUsePassport()
      ? "unavailable"
      : isWalletConnected(session)
        ? "connected"
        : "disconnected";

    return {
      walletState,
      walletAddress: session.walletAddress,
    };
  }, [session]);
}
