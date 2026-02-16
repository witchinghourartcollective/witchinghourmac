import Link from "next/link";

export default function Ritual() {
  return (
    <main style={{ padding: 48, maxWidth: 900, margin: "0 auto" }}>
      <h1>Ritual</h1>

      <section>
        <p>
          A ritual is a repeated action that encodes intent. In systems both
          digital and human, repetition creates structure.
        </p>

        <p>
          This space documents the working rituals of Witching Hour — creative,
          technical, and symbolic processes that bind intention to output.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 16, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Entries
        </h2>
        <nav aria-label="Ritual entries">
          <ul style={{ lineHeight: "2em", marginTop: 12 }}>
            <li>
              <Link href="/ritual/0001">Ritual 0001</Link>
            </li>
            <li>
              <Link href="/ritual/0002">Ritual 0002</Link>
            </li>
          </ul>
        </nav>
      </section>

    </main>
  );
}
