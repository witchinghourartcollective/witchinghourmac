import Link from "next/link";

const tokenLinks = [
  {
    title: "About",
    href: "/about",
    description:
      "Read the Witching Hour frame, creative intent, locked numbers, and utility overview.",
  },
  {
    title: "NFT",
    href: "/nft",
    description:
      "See the collection structure, roles, tiers, and the broader holder utility model.",
  },
  {
    title: "Mint",
    href: "/mint",
    description:
      "Open the mint path, release structure, and current entry logic for the drop.",
  },
  {
    title: "Litepaper",
    href: "/litepaper",
    description:
      "Read the compact written framework for the project, token logic, and rollout.",
  },
  {
    title: "Press",
    href: "/press",
    description:
      "View public-facing media copy, project description, and press-oriented materials.",
  },
  {
    title: "Access",
    href: "/access",
    description:
      "Open the access path for Genesis entry, project participation, and holder-facing utility.",
  },
] as const;

export default function TokenPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-10 px-6 py-16">
      <section className="space-y-5">
        <p className="whm-token-kicker">
          hOUR Token
        </p>
        <h1 className="whm-token-title">
          The hOUR token is the access layer.
        </h1>
        <div className="whm-token-copy space-y-4">
          <p>
            hOUR holds the project context for utility, participation, and
            long-term creative access across the Witching Hour system.
          </p>
          <p>
            This page now carries the links that were split across navigation,
            so the site stays cleaner while the token layer still points people
            to the right places.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        {tokenLinks.map((item) => (
          <div key={item.href} className="border-b border-white/10 pb-6 last:border-b-0">
            <Link
              href={item.href}
              className="whm-token-link"
            >
              {item.title}
            </Link>
            <p className="mt-2 max-w-2xl text-sm leading-7 opacity-80">
              {item.description}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
