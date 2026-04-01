"use client";

import { useMemo, useState } from "react";

import { getPassportAdapter, type PassportSession } from "@/lib/immutable/passport";

export function usePassport() {
  const adapter = useMemo(() => getPassportAdapter(), []);
  const [session, setSession] = useState<PassportSession>(() => adapter.getSession());

  return {
    session,
    async connect() {
      const nextSession = await adapter.connect();
      setSession(nextSession);
      return nextSession;
    },
    async disconnect() {
      await adapter.disconnect();
      setSession(adapter.getSession());
    },
  };
}
