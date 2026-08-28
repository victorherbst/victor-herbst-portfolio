import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://victorherbst.com.br"),
  title: "Victor Herbst — Educação, linguagem & tecnologia",
  description:
    "Portfólio de Victor Herbst: produtos educacionais, sistemas linguísticos, design editorial e IA aplicada.",
  applicationName: "Portfólio de Victor Herbst",
  authors: [{ name: "Victor Herbst", url: "https://victorherbst.com.br/sobre" }],
  creator: "Victor Herbst",
  publisher: "Victor Herbst",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  keywords: [
    "learning design",
    "instructional design",
    "English education",
    "educational technology",
    "editorial systems",
    "applied AI",
    "AI provenance",
    "grounded generation",
    "narrative fidelity",
  ],
  openGraph: {
    title: "Victor Herbst — Educação, linguagem & tecnologia",
    description:
      "Produtos educacionais, sistemas linguísticos e IA aplicada construídos a partir de problemas reais de ensino.",
    url: "https://victorherbst.com.br",
    siteName: "Victor Herbst",
    type: "website",
    images: [
      {
        url: "https://victorherbst.com.br/og.png",
        width: 1200,
        height: 630,
        alt: "Victor Herbst — Educação, linguagem e tecnologia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Herbst — Educação, linguagem & tecnologia",
    description:
      "Produtos educacionais, sistemas linguísticos e IA aplicada construídos a partir de problemas reais de ensino.",
    images: [
      "https://victorherbst.com.br/og.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://victorherbst.com.br/#victor-herbst",
      name: "Victor Herbst",
      url: "https://victorherbst.com.br/",
      image: "https://victorherbst.com.br/portfolio/victor-editorial-v2.png",
      jobTitle: [
        "Educador de inglês e aquisição de linguagem",
        "Desenvolvedor de produtos educacionais",
      ],
      description:
        "Educador, linguista e desenvolvedor brasileiro que cria produtos educacionais, sistemas editoriais e aplicações de inteligência artificial.",
      knowsAbout: [
        "Ensino de inglês",
        "Aquisição de linguagem",
        "Tecnologia educacional",
        "Linguística computacional",
        "Processamento de linguagem natural",
        "Design editorial",
        "Desenvolvimento web",
        "Inteligência artificial aplicada",
        "Proveniência de inteligência artificial",
        "Grounded generation",
        "Fidelidade narrativa",
      ],
      sameAs: ["https://www.linkedin.com/in/victor-herbst-772362248/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://victorherbst.com.br/#website",
      url: "https://victorherbst.com.br/",
      name: "Victor Herbst",
      inLanguage: ["pt-BR", "en"],
      author: { "@id": "https://victorherbst.com.br/#victor-herbst" },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://victorherbst.com.br/#profile-page",
      url: "https://victorherbst.com.br/",
      name: "Victor Herbst — Educação, linguagem e tecnologia",
      isPartOf: { "@id": "https://victorherbst.com.br/#website" },
      mainEntity: { "@id": "https://victorherbst.com.br/#victor-herbst" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
