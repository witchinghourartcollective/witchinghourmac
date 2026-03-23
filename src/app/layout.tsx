import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Witching Hour Music",
  description: "Witching Hour Music and Art Collective.",
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
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="whm-footer-nav">
          <nav aria-label="Primary">
            <div className="whm-footer-group">
              <Link href="/rich-jewelz" className="whm-footer-group-title">RICH JEWELZ</Link>
              <p className="whm-footer-group-copy">ritualz, sigilz, and signal work</p>
              <div className="whm-footer-subnav">
                <Link href="/ritual">Ritual</Link>
                <Link href="/sigils">Sigils</Link>
              </div>
            </div>
            <Link href="/token">hOUR Token</Link>
            <Link href="/links">Links</Link>
            <Link href="/esp32">ESP32</Link>
            <Link href="/dashboard">WAX Dashboard</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
