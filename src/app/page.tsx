import Image from "next/image";

export default function Home() {
  return (
    <main className="whm-home-shell" style={{ padding: 48, maxWidth: 900, margin: "0 auto" }}>
      <h1 className="whm-home-title">Witching Hour Music</h1>

      <p className="whm-home-title whm-home-kicker">
        Welcome to the Witching Hour Music & Art Collective.
      </p>

<section className="whm-home-copy">
  <p>
    Witching Hour is a signal — a convergence of sound, symbol, and system.
    We work at the intersection of music, art, technology, and ritual,
    building structures that speak both to the machine and the human.
  </p>

  <div className="whm-sigil-solid-wrap" aria-hidden="true">
    <Image
      src="/brand/sigils/whm-sigil%20edit%203.22.26%20v2.svg"
      alt="WHM Sigil"
      width={420}
      height={241}
      className="whm-sigil-solid"
    />
  </div>

  <p>
    This is not content for passive consumption. It is an invocation.
    What you interact with here is meant to be used, altered, and carried forward.
  </p>

  <p>
    Our NFT layer is designed for long-term creative access: music, visuals,
    studio sessions, and collaboration. See the hOUR Token page for the live
    framework, About notes, and access links.
  </p>
</section>
    </main>
  );
}
