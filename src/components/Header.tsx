import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="whm-header">
      <Link href="/" className="sigil-lock">
        <Image
          src="/brand/sigil-primary.svg"
          alt="Primary Sigil"
          width={28}
          height={28}
          className="primary-sigil-mark"
        />
      </Link>

      <nav>
        <Link href="/about">About</Link>
        <Link href="/nft">NFT</Link>
        <Link href="/mint">Mint</Link>
        <Link href="/litepaper">Litepaper</Link>
        <Link href="/press">Press</Link>
        <Link href="/ritual">Ritual</Link>
        <Link href="/calendar">Calendar</Link>
        <Link href="/links">Links</Link>
      </nav>
    </header>
  );
}
