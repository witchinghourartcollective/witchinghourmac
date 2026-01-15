import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Witching Hour",
  description: "Witching Hour Music & Art Collective",
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
        <Analytics />
      </body>
    </html>
  );
}


