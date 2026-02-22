import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="whm-footer-nav">
          <nav aria-label="Primary">
            <Link href="/ritual">Ritual</Link>
            <Link href="/sigils">Sigils</Link>
            <Link href="/about">About</Link>
            <Link href="/nft">NFT</Link>
            <Link href="/mint">Mint</Link>
            <Link href="/litepaper">Litepaper</Link>
            <Link href="/press">Press</Link>
            <Link href="/access">Access</Link>
            <Link href="/calendar">Calendar</Link>
            <Link href="/links">Links</Link>
            <Link href="/esp32">ESP32</Link>
            <Link href="/dashboard">WAX Dashboard</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
