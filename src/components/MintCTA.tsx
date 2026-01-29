import Link from "next/link";

const isLive = process.env.NEXT_PUBLIC_GENESIS_MINT_LIVE === "true";
const mintUrl = process.env.NEXT_PUBLIC_GENESIS_MINT_URL || "/access";

export default function MintCTA() {
  return isLive ? (
    <Link
      href={mintUrl}
      className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-black text-white hover:opacity-90"
    >
      Mint Genesis (333)
    </Link>
  ) : (
    <Link
      href="/access"
      className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-black text-white hover:opacity-90"
    >
      Join the Witching Hour
    </Link>
  );
}
