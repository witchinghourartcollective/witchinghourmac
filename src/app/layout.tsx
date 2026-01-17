import "./globals.css";
import Header from "../components/Header";
import Script from "next/script";
import PrimarySigilFooter from "./components/PrimarySigilFooter";
import WHMSigil from "./components/WHMSigil";

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
        <meta name="base:app_id" content="696949ddeffdef4d6af2c433" />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XZYG0YRGV5"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XZYG0YRGV5');
          `}
        </Script>
        <Header />
        <div className="whm-sigil-wrap">
          <WHMSigil />
        </div>
        {children}
        <PrimarySigilFooter />
      </body>
    </html>
  );
}
