export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-6 py-16 text-center">
      <p className="text-sm uppercase tracking-[0.35em] opacity-80">About</p>

      <section className="max-w-2xl space-y-6">
        <h1 className="text-3xl sm:text-4xl font-semibold">Witching Hour</h1>
        <p>
          Witching Hour is a creative studio and collective blending music,
          visual art, and technology. The NFT collection functions as a
          membership and utility layer, granting holders access to exclusive
          music releases, studio sessions, digital art, physical drops, and
          collaborative opportunities.
        </p>
        <p>
          Witching Hour is the moment where sound, symbol, and intention align—
          each token a key to creative access, collaboration, and ritual.
        </p>
      </section>

      <section className="max-w-2xl w-full space-y-4 text-left">
        <h2 className="text-xl font-semibold text-center">Locked Numbers</h2>
        <p className="text-center">
          One number per drop. These are intentional, symbolic, and platform-safe.
        </p>
        <ul className="space-y-2">
          <li>333 — 0.033 ETH — Genesis / intimate / early believers</li>
          <li>666 — 0.066 ETH — Edge, counterculture, underground energy</li>
          <li>777 — 0.077 ETH — Luck, alignment, momentum</li>
          <li>999 — 0.099 ETH — Completion, expansion, broad access</li>
          <li>369 — 0.0369 ETH — Tesla code, frequency drop, lore-heavy</li>
        </ul>
      </section>

      <section className="max-w-2xl w-full space-y-3 text-left">
        <h2 className="text-xl font-semibold text-center">Utilities</h2>
        <ul className="space-y-2">
          <li>Access to exclusive music releases and unreleased tracks</li>
          <li>Entry to private Discord channels</li>
          <li>Priority access to studio sessions and collaborations</li>
          <li>Physical art, merch, and limited drops</li>
          <li>Future creative and community-driven utilities</li>
        </ul>
      </section>
    </main>
  );
}
