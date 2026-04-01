import type { PurchaseIntent } from "@/lib/checkout/types";

export async function beginCheckout(intent: PurchaseIntent) {
  return {
    ok: false,
    intent,
    reason: "Checkout execution is not wired yet.",
  };
}
