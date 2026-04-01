export default function AccessPage() {
  return (
    <main className="archive-page">
      <section className="access-ledger">
        <p className="access-ledger__eyebrow">Collector access</p>
        <h1 className="access-ledger__title">Archive entry, not vague prelaunch.</h1>
        <p className="access-ledger__copy">
          This route is for collector access, early holder pathways, and future
          gated experiences tied to the scars archive system. It exists to map
          who gets into the room first, who holds the work, and what opens next.
        </p>
        <div className="access-ledger__grid">
          <article>
            <h2>Collector access</h2>
            <p>
              Priority routing for OG SCARS and ECHO SCARS collectors when
              archive inventory is constrained.
            </p>
          </article>
          <article>
            <h2>Early holder access</h2>
            <p>
              Future hOUR holders can be admitted into claim windows, gated
              archives, and holder-only purchase moments from the same surface.
            </p>
          </article>
          <article>
            <h2>Future gated experiences</h2>
            <p>
              Sessions, editions, notebooks, proofs, and whatever else survives
              the room can route through this access layer without changing the
              page architecture.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
