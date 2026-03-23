export default function Links() {
  return (
    <main className="whm-links-shell">
      <section className="whm-links-panel">
        <h1 className="whm-home-title">Links</h1>

        <div className="whm-links-block">
          <p className="whm-token-kicker">Availability</p>
          <p className="whm-links-copy">
            <a
              href="https://calendar.app.google/B4CX5ZnMk6movn1B7"
              target="_blank"
              rel="noreferrer"
              className="whm-links-anchor"
            >
              Book time with Fletcher Vaughn
            </a>
          </p>
        </div>

        <div className="whm-links-block">
          <p className="whm-token-kicker">Elsewhere</p>
          <ul className="whm-links-list" aria-label="Social links">
            <li>
              <a
                href="https://instagram.com/fletchervaughn"
                className="whm-links-anchor"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/witchinghourmac"
                className="whm-links-anchor"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
