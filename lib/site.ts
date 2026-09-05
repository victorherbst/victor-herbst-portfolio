import type { Metadata } from "next";
export type Lang = "pt" | "en";
export const tr = (lang: Lang, pt: string, en: string) =>
  lang === "pt" ? pt : en;
export const paths = (lang: Lang) =>
  lang === "pt"
    ? { home: "/", work: "/projetos", about: "/sobre", lab: "/laboratorio" }
    : { home: "/en", work: "/en/work", about: "/en/about", lab: "/en/lab" };
export const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
export const contacts = {
  whatsapp: "https://wa.me/5532985155063",
  email: "thouherbst@gmail.com",
  linkedin: "https://www.linkedin.com/in/victor-herbst-772362248/",
  freelance: "https://www.99freelas.com.br/user/victor-herbst",
};
export function pageMeta(
  lang: Lang,
  title: string,
  description: string,
  path = "",
): Metadata {
  const url = `${paths(lang).home}${path}`.replace(/\/\//g, "/");
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR":
          lang === "pt"
            ? url
            : url
                .replace(/^\/en\/work/, "/projetos")
                .replace(/^\/en\/about/, "/sobre")
                .replace(/^\/en\/lab/, "/laboratorio")
                .replace(/^\/en$/, "/"),
        en:
          lang === "en"
            ? url
            : url
                .replace(/^\/projetos/, "/en/work")
                .replace(/^\/sobre/, "/en/about")
                .replace(/^\/laboratorio/, "/en/lab")
                .replace(/^\/$/, "/en"),
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
