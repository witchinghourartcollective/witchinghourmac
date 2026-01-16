import "./globals.css";
import Header from "../components/Header";

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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XZYG0YRGV5"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XZYG0YRGV5');
            `,
          }}
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
