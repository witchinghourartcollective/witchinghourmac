import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}


