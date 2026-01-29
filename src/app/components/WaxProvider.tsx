"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { WaxJS } from "@waxio/waxjs/dist/index.js";

type WaxContextType = {
  wax: WaxJS | null;
  account: string | null;
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => void;
};

type WaxWithLogout = WaxJS & { logout?: () => void };

const WaxContext = createContext<WaxContextType | null>(null);

export function WaxProvider({ children }: { children: React.ReactNode }) {
  const [wax, setWax] = useState<WaxJS | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;

    try {
      const waxInstance = new WaxJS({
        rpcEndpoint: "https://wax.greymass.com",
        tryAutoLogin: false,
      });

      if (cancelled) return;

      setWax(waxInstance);

      waxInstance
        .login()
        .then(user => {
          const nextAccount = typeof user === "string" ? user : null;
          if (!cancelled && nextAccount) {
            setAccount(nextAccount);
            setIsLoggedIn(true);
          }
        })
        .catch(() => {
          // no session yet — normal
        });
    } catch (err) {
      console.error("Wax init failed:", err);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async () => {
    if (!wax) return;
    const user = await wax.login();
    const nextAccount = typeof user === "string" ? user : null;
    if (!nextAccount) return;
    setAccount(nextAccount);
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (!wax) return;
    (wax as WaxWithLogout).logout?.();
    setWax(null);
    setAccount(null);
    setIsLoggedIn(false);
  };

  return (
    <WaxContext.Provider value={{ wax, account, isLoggedIn, login, logout }}>
      {children}
    </WaxContext.Provider>
  );
}

export function useWax() {
  const ctx = useContext(WaxContext);
  if (!ctx) {
    throw new Error("useWax must be used inside WaxProvider");
  }
  return ctx;
}
