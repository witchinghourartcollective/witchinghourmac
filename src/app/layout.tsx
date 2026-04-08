import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "WHM: hOUR ARCHIVES",
  description: "VOL. 1: TROPHY SCARS FROM THE hOUR",
  icons: {
    icon: "/brand/sigils/whm-sigil%20edit%203.22.26%20v2.svg",
    shortcut: "/brand/sigils/whm-sigil%20edit%203.22.26%20v2.svg",
    apple: "/brand/sigils/whm-sigil%20edit%203.22.26%20v2.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { brand, links } = siteConfig;

  return (
    <html lang="en">
      <body>
        <header className="site-shell__header">
          <Link href="/" className="site-shell__brand">
            <span className="site-shell__brand-lockup" aria-hidden="true">
              <span className="site-shell__brand-seal">
                <Image
                  src="/brand/sigils/whm-sigil edit 3.22.26 v2.svg"
                  alt=""
                  width={108}
                  height={108}
                  className="site-shell__brand-sigil"
                />
              </span>
            </span>
            <span className="site-shell__brand-copy">
              <span>{brand.mark}</span>
              <small>{brand.name}</small>
            </span>
          </Link>
          <nav aria-label="Primary" className="site-shell__nav">
            {links.primary.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
        <footer className="site-shell__footer">
          <div>
            <p className="site-shell__footer-mark">{brand.collection}</p>
            <p className="site-shell__footer-copy">{brand.tagline}</p>
          </div>
          <nav aria-label="Utility" className="site-shell__footer-nav">
            {links.utility.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </footer>
      </body>
    </html>
  );
}
