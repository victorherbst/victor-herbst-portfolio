import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer, Header, RevealObserver, LegacyLinks } from "./Chrome";
import type { Lang } from "@/lib/site";
import "@/app/globals.css";
const display = localFont({
  src: "../public/fonts/Bricolage.ttf",
  variable: "--font-display",
  weight: "200 800",
  display: "swap",
});
const body = localFont({
  src: "../public/fonts/Manrope.ttf",
  variable: "--font-body",
  weight: "200 800",
  display: "swap",
});
export const baseMetadata: Metadata = {
  metadataBase: new URL("https://victorherbst.com.br"),
  applicationName: "Victor Herbst",
  authors: [{ name: "Victor Herbst" }],
  creator: "Victor Herbst",
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};
const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Victor Herbst",
  url: "https://victorherbst.com.br",
  image: "https://victorherbst.com.br/work/victor.webp",
  sameAs: [
    "https://www.linkedin.com/in/victor-herbst-772362248/",
    "https://www.99freelas.com.br/user/victor-herbst",
  ],
  knowsAbout: ["Design", "Web development", "Education", "Linguistics"],
};
export default function Document({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) {
  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      className={`${display.variable} ${body.variable}`}
    >
      <body id="top">
        <a href="#main" className="skip-link">
          {lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}
        </a>
        <Header lang={lang} />
        {children}
        <Footer lang={lang} />
        <RevealObserver />
        <LegacyLinks lang={lang} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
