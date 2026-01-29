import MintCTA from "@/components/MintCTA";
import { track } from "@/lib/track";

export default function MintPage() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-6 py-16 text-center">
      <section className="max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] opacity-80">Mint</p>
        <h1 className="text-3xl sm:text-4xl font-semibold">Witching Hour Mint</h1>
        <p>
          Select your tier. Each number is intentional and aligned to a distinct
          access profile. One number per drop. No mixing.
        </p>
      </section>

      <section className="max-w-3xl w-full space-y-4 text-left border border-white/10 rounded-lg p-6 bg-white/5">
        <h2 className="text-xl font-semibold text-center">Genesis CTA (Pre-mint)</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            className="rounded-md border border-white/20 px-4 py-2"
            href="/access"
            onClick={() =>
              track("cta_click", {
                location: "mint_page",
                state: "pre_mint",
              })
            }
          >
            Access
          </a>
          <span className="rounded-md border border-white/10 px-4 py-2 opacity-70">
            Genesis Mint — Coming Soon
          </span>
        </div>
        <p className="text-center opacity-80">
          Canon decision: Access before mint. No fake mint buttons.
        </p>
      </section>

      <section className="max-w-3xl w-full space-y-4 text-left border border-white/10 rounded-lg p-6 bg-white/5">
        <h2 className="text-xl font-semibold text-center">Genesis CTA (Post-mint)</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <div
            onClick={() =>
              track("mint_click", {
                location: "mint_page",
                state: "post_mint",
              })
            }
          >
            <MintCTA />
          </div>
          <a
            className="rounded-md border border-white/20 px-4 py-2"
            href="/access"
            onClick={() =>
              track("cta_click", {
                location: "mint_page",
                state: "post_mint",
              })
            }
          >
            Enter the Witching Hour
          </a>
        </div>
        <p className="text-center opacity-80">
          Swap in the real Zora URL when live via NEXT_PUBLIC_GENESIS_MINT_URL.
        </p>
      </section>

      <section className="max-w-4xl w-full grid gap-6 sm:grid-cols-2 text-left">
        <div className="border border-white/10 rounded-lg p-5 bg-white/5">
          <h2 className="text-xl font-semibold">Genesis</h2>
          <p className="opacity-80">333 @ 0.0333 ETH</p>
          <p className="mt-3">Foundation / Origin · Core Access</p>
          <ul className="mt-3 space-y-1">
            <li>Founding member status</li>
            <li>Early access to all future drops</li>
            <li>Exclusive music releases</li>
            <li>Private Discord channels</li>
            <li>Priority studio access</li>
          </ul>
          <button className="mt-4 w-full rounded-md border border-white/20 px-4 py-2">
            Join Genesis
          </button>
        </div>

        <div className="border border-white/10 rounded-lg p-5 bg-white/5">
          <h2 className="text-xl font-semibold">Alignment</h2>
          <p className="opacity-80">777 @ 0.0777 ETH</p>
          <p className="mt-3">Expansion / Momentum · Advanced Access</p>
          <ul className="mt-3 space-y-1">
            <li>All Genesis utilities</li>
            <li>Expanded music drops</li>
            <li>Priority physical art & merch</li>
            <li>Early access to events</li>
            <li>Creative decision input</li>
          </ul>
          <button className="mt-4 w-full rounded-md border border-white/20 px-4 py-2">
            Join Alignment
          </button>
        </div>

        <div className="border border-white/10 rounded-lg p-5 bg-white/5">
          <h2 className="text-xl font-semibold">Ritual</h2>
          <p className="opacity-80">666 @ 0.0666 ETH</p>
          <p className="mt-3">Shadow / Edge · Specialist Access</p>
          <ul className="mt-3 space-y-1">
            <li>Experimental releases</li>
            <li>Alt editions & limited art</li>
            <li>Behind-the-scenes process</li>
            <li>Invite-only collaborations</li>
            <li>Non-public community role</li>
          </ul>
          <button className="mt-4 w-full rounded-md border border-white/20 px-4 py-2">
            Join Ritual
          </button>
        </div>

        <div className="border border-white/10 rounded-lg p-5 bg-white/5">
          <h2 className="text-xl font-semibold">Completion</h2>
          <p className="opacity-80">999 @ 0.0999 ETH</p>
          <p className="mt-3">Open Gate · General Access</p>
          <ul className="mt-3 space-y-1">
            <li>Core music & art access</li>
            <li>Entry to the ecosystem</li>
            <li>Eligibility for upgrades</li>
            <li>Public-facing membership</li>
          </ul>
          <button className="mt-4 w-full rounded-md border border-white/20 px-4 py-2">
            Join Completion
          </button>
        </div>
      </section>

      <section className="max-w-3xl w-full space-y-4 text-left border border-white/10 rounded-lg p-6 bg-white/5">
        <h2 className="text-xl font-semibold text-center">Special Drop</h2>
        <div className="border border-white/10 rounded-lg p-5 bg-white/5">
          <h3 className="text-lg font-semibold">Frequency</h3>
          <p className="opacity-80">369 @ 0.0369 ETH</p>
          <p className="mt-3">Experimental / Signal · Unknown Access</p>
          <ul className="mt-3 space-y-1">
            <li>One-off utilities or art concepts</li>
            <li>Cross-medium experiments</li>
            <li>Surprise mechanics</li>
            <li>No guarantees, no roadmap promises</li>
          </ul>
        </div>
      </section>

      <section className="max-w-3xl space-y-4 text-center">
        <p className="opacity-80">
          Mint flow will be activated when the drop opens. Until then, this page
          serves as the canonical tier map.
        </p>
      </section>
    </main>
  );
}
