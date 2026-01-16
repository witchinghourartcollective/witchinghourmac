import "./globals.css";

export const metadata = {
  title: "Witching Hour Music",
  description: "Make art with your friends.",
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
