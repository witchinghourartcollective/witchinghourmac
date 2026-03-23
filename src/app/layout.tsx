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
            <Link href="/ritual">Ritual</Link>
            <Link href="/sigils">Sigils</Link>
            <Link href="/token">hOUR Token</Link>
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
