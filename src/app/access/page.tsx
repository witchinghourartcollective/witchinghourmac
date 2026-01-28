import Link from "next/link";

export default function AccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold mb-4">Enter the Witching Hour</h1>
      <p className="text-lg opacity-80 mb-8">
        This is not a mint page.<br />
        This is an access point.
      </p>

      <div className="space-y-6 text-base leading-relaxed">
        <p>
          Witching Hour exists at the intersection of sound, symbol, and intention.
          Each release is a key—some open doors, some unlock rooms, some are meant
          only for those willing to go deeper.
        </p>

        <p>
          The Genesis drop is limited to <strong>333 keys</strong>.
          There will not be more.
        </p>

        <p>
          Holding a Witching Hour token grants access to exclusive music,
          visual art, studio sessions, and collaborative opportunities
          as the project evolves.
        </p>

        <p className="font-semibold">
          This is not speculation.<br />
          This is access.
        </p>

        <p className="opacity-80">
          If you’re here for hype, you’re early in the wrong way.<br />
          If you’re here for access, you’re on time.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        {/* PRIMARY CTA */}
        <Link
          href="https://f.nativeforms.com/YTMuV1M41jZmoUYtdTUq1Db"
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-black text-white hover:opacity-90"
        >
          Request Genesis Access
        </Link>

        {/* SECONDARY CTA (disabled until mint) */}
        <button
          disabled
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold border opacity-40 cursor-not-allowed"
        >
          Genesis Mint — Coming Soon
        </button>
      </div>

      <footer className="mt-12 text-sm opacity-70">
        Genesis: <strong>333 @ 0.0333 ETH</strong><br />
        Minting on Base via Zora
      </footer>
    </main>
  );
}
