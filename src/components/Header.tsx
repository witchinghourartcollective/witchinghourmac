import Link from "next/link";

export default function Header() {
  return (
    <header className="whm-header">
      <Link href="/" className="sigil-lock">
        <img
          src="/brand/sigil-whm.svg"
          alt="Witching Hour Music Sigil"
        />
      </Link>

      <nav>
        <Link href="/about">About</Link>
        <Link href="/ritual">Ritual</Link>
        <Link href="/links">Links</Link>
      </nav>
    </header>
  );
}
