import { getPassportAvailability, type PassportSession } from "@/lib/immutable/passport";

export function canUsePassport(): boolean {
  return getPassportAvailability() === "available";
}

export function getPassportDisabledReason(): string {
  return "Passport is not configured in this environment yet.";
}

export function isWalletConnected(session: PassportSession): boolean {
  return session.connectionState === "connected";
}
