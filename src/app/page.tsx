import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main style={{ padding: 48, maxWidth: 900, margin: "0 auto" }}>
      <h1>Witching Hour</h1>

      <p>
        Welcome to the Witching Hour Music & Art Collective.
      </p>

<section>
  <p>
    Witching Hour is a signal — a convergence of sound, symbol, and system.
    We work at the intersection of music, art, technology, and ritual,
    building structures that speak both to the machine and the human.
  </p>

  <div className="whm-sigil-solid-wrap" aria-hidden="true">
    <Image
      src="/brand/sigils/whm-sigil.svg"
      alt="WHM Sigil"
      width={420}
      height={220}
      className="whm-sigil-solid"
    />
  </div>

  <p>
    This is not content for passive consumption. It is an invocation.
    What you interact with here is meant to be used, altered, and carried forward.
  </p>

  <p>
    Our NFT layer is designed for long-term creative access: music, visuals,
    studio sessions, and collaboration. See the About page for the live
    framework and utilities.
  </p>
</section>


      <hr />

      <nav>
        <ul style={{ lineHeight: "2em" }}>
          <li><Link href="/ritual">Ritual</Link></li>
          <li><Link href="/sigils">Sigils</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/nft">NFT</Link></li>
          <li><Link href="/mint">Mint</Link></li>
          <li><Link href="/litepaper">Litepaper</Link></li>
          <li><Link href="/press">Press</Link></li>
          <li><Link href="/access">Access</Link></li>
          <li><Link href="/calendar">Calendar</Link></li>
          <li><Link href="/links">Links</Link></li>
          <li><Link href="/esp32">ESP32</Link></li>
          <li><Link href="/dashboard">WAX Dashboard</Link></li>
        </ul>
      </nav>
    </main>
  );
}
