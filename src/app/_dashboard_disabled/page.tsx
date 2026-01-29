"use client";

import { useEffect, useState } from "react";
import { useWax } from "../components/WaxProvider";

export default function Dashboard() {
  const { account, isLoggedIn, login, logout } = useWax();

  const [waxBalance, setWaxBalance] = useState<string>("loading...");

  useEffect(() => {
    if (!account) return;

    fetch("https://wax.greymass.com/v1/chain/get_currency_balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: "eosio.token",
        account,
        symbol: "WAX",
      }),
    })
      .then(r => r.json())
      .then(d => setWaxBalance(d[0] ?? "0.00000000 WAX"));
  }, [account]);

  return (
    <main style={{ padding: 32 }}>
      <h1>WAX Dashboard</h1>

      {!isLoggedIn && (
        <button onClick={login}>Login with WAX</button>
      )}

      {isLoggedIn && (
        <>
          <p><strong>Account:</strong> {account}</p>
          <p><strong>WAX Balance:</strong> {waxBalance}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </main>
  );
}
