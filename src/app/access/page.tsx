const accessLink = ""; // TODO: add NativeForms or Discord invite URL

export default function AccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-10 px-6 py-16 text-center">
      <section className="max-w-3xl space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] opacity-80">Access</p>
        <h1 className="text-3xl sm:text-4xl font-semibold">Enter the Witching Hour</h1>
        <p className="text-lg">This is not a mint page. This is an access point.</p>
      </section>

      <section className="max-w-3xl w-full space-y-4 text-left border border-white/10 rounded-lg p-6 bg-white/5">
        <p>
          Witching Hour exists at the intersection of sound, symbol, and intention.
          Each release is a key - some open doors, some unlock rooms, some are meant
          only for those willing to go deeper.
        </p>
        <p>
          The Genesis drop is limited to 333 keys. There will not be more.
        </p>
        <p>
          Holding a Witching Hour token grants access to exclusive music, visual
          art, studio sessions, and collaborative opportunities as the project
          evolves. This is not speculation. This is participation.
        </p>
        <p>
          If you are here for hype, you are early in the wrong way. If you are here
          for access, you are on time.
        </p>
      </section>

      <section className="max-w-3xl w-full space-y-4 text-center">
        <a
          className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3"
          href={accessLink || "#"}
        >
          Request Genesis Access
        </a>
        <p className="text-sm opacity-80">
          Genesis: 333 @ 0.0333 ETH. Minting soon on Base via Zora.
        </p>
      </section>
    </main>
  );
}
