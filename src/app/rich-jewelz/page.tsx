import Link from "next/link";

export default function RichJewelz() {
  return (
    <main style={{ padding: 48, maxWidth: 900, margin: "0 auto" }}>
      <section className="whm-rich-jewelz">
        <p className="whm-token-kicker">RICH JEWELZ</p>
        <h1 className="whm-token-title">Ritualz in signal form.</h1>
        <p className="whm-token-copy">
          RICH JEWELZ is the ritual branch: a chamber for encoded works,
          symbolic forms, and the pieces that carry the inner language of
          Witching Hour.
        </p>

        <div className="whm-rich-jewelz-links" aria-label="Rich Jewelz links">
          <Link href="/ritual" className="whm-token-link">Ritual</Link>
          <Link href="/sigils" className="whm-token-link">Sigils</Link>
        </div>
      </section>
    </main>
  );
}
