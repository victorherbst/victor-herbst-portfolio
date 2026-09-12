"use client";
import { useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Lang, tr } from "@/lib/site";
const EducationVisit = dynamic(
  () => import("@/app/components/EducationVisit"),
  { loading: () => <p className="demo-loading">…</p> },
);
const FidelityEngine = dynamic(
  () => import("@/app/components/FidelityEngine"),
  { loading: () => <p className="demo-loading">…</p> },
);
const books = [
  {
    id: "technical",
    title: "Cartografia do erro",
    pages: ["cover", "table", "flow"],
    detail: "A4 · 16 páginas",
  },
  {
    id: "prose",
    title: "Prosa — Livro Pronto",
    pages: ["cover", "opener", "colophon"],
    detail: "28 páginas",
  },
  {
    id: "poetry",
    title: "Laboratório poético",
    pages: ["cover", "spread", "index"],
    detail: "13 páginas",
  },
];
const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const getHash = () => window.location.hash;
export default function Lab({ lang }: { lang: Lang }) {
  const hash = useSyncExternalStore(subscribeHash, getHash, () => "");
  const [selected, setActive] = useState<number | null>(null);
  const active =
    selected ??
    (hash === "#fidelity-engine" ? 1 : hash === "#editorial-engine" ? 2 : 0);
  const [book, setBook] = useState(0);
  const tabs =
    lang === "pt"
      ? ["Aprendizagem", "Myriad · Linguagem", "Livro Pronto · Editorial"]
      : ["Learning", "Myriad · Language", "Livro Pronto · Editorial"];
  return (
    <main id="main" className="lab-page">
      <header className="page-heading shell">
        <p className="eyebrow">
          {tr(lang, "Laboratório autoral", "Independent lab")}
        </p>
        <h1>
          {tr(lang, "O que acontece", "What happens")}
          <br />
          <span className="serif-em">
            {tr(lang, "por trás do clique.", "behind a click.")}
          </span>
        </h1>
        <p>
          {tr(
            lang,
            "Investigações em linguagem, aprendizagem e publicação. Aqui, o processo também é algo que você pode explorar.",
            "Investigations in language, learning and publishing. Here, the process is something you can explore too.",
          )}
        </p>
      </header>
      <div
        className="lab-nav shell"
        role="tablist"
        aria-label={tr(lang, "Áreas do laboratório", "Lab areas")}
      >
        {tabs.map((name, i) => (
          <button
            id={`lab-tab-${i}`}
            key={name}
            role="tab"
            aria-selected={active === i}
            aria-controls={`lab-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              let n = i;
              if (e.key === "ArrowRight") n = (i + 1) % 3;
              else if (e.key === "ArrowLeft") n = (i + 2) % 3;
              else if (e.key === "Home") n = 0;
              else if (e.key === "End") n = 2;
              else return;
              e.preventDefault();
              setActive(n);
              document.getElementById(`lab-tab-${n}`)?.focus();
            }}
          >
            {name}
            <span>0{i + 1}</span>
          </button>
        ))}
      </div>
      <div
        className="lab-panel"
        role="tabpanel"
        tabIndex={0}
        id={`lab-panel-${active}`}
        aria-labelledby={`lab-tab-${active}`}
      >
        {active === 0 ? (
          <div className="legacy-lab">
            <EducationVisit language={lang} />
            <div className="lab-explanation shell">
              <h2>
                {tr(
                  lang,
                  "O erro também ensina o produto.",
                  "A mistake teaches the product too.",
                )}
              </h2>
              <p>
                {tr(
                  lang,
                  "Esta visita demonstra o raciocínio pedagógico do Céu Canto. Escolha uma resposta, observe o feedback e veja como o contexto muda a próxima decisão de estudo. É um exemplo interativo preparado, sem acesso a dados de alunos.",
                  "This visit demonstrates the pedagogical reasoning behind Céu Canto. Choose an answer, observe the feedback and see how context changes the next learning decision. This is a prepared interactive example with no access to student data.",
                )}
              </p>
            </div>
          </div>
        ) : active === 1 ? (
          <div className="legacy-lab">
            <p className="lab-disclaimer shell">
              {tr(
                lang,
                "Demonstração explicativa com exemplos preparados.",
                "An explanatory demonstration with prepared examples. This page makes no calls to AI models.",
              )}
            </p>
            <FidelityEngine language={lang} />
          </div>
        ) : (
          <section className="editorial-lab shell" id="editorial-engine">
            <div className="editorial-heading">
              <div>
                <p className="eyebrow">Livro Pronto</p>
                <h2>
                  {tr(lang, "Do conteúdo à página.", "From content to page.")}
                </h2>
                <p>
                  {tr(
                    lang,
                    "Composição de livros e materiais com estrutura, paginação e saídas reproduzíveis. Abra os PDFs para examinar a tipografia e o acabamento.",
                    "Books and materials composed with structure, pagination and reproducible outputs. Open the PDFs to inspect the typography and finish.",
                  )}
                </p>
              </div>
              <div
                className="book-options"
                role="group"
                aria-label={tr(
                  lang,
                  "Escolher publicação",
                  "Choose a publication",
                )}
              >
                {books.map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => setBook(i)}
                    aria-pressed={book === i}
                  >
                    {tr(
                      lang,
                      ["Técnico", "Prosa", "Poesia"][i],
                      ["Technical", "Prose", "Poetry"][i],
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="book-preview">
              {books[book].pages.map((part, i) => (
                <Image
                  key={part}
                  src={`/editorial/${books[book].id}-${part}.png`}
                  width={700}
                  height={990}
                  alt={`${books[book].title} — ${tr(lang, ["capa", "página interna", "detalhe editorial"][i], ["cover", "inside page", "editorial detail"][i])}`}
                  sizes="(max-width:760px) 90vw, 30vw"
                />
              ))}
            </div>
            <div className="book-bottom">
              <div>
                <h3>{books[book].title}</h3>
                <p>{books[book].detail} · PDF</p>
              </div>
              <a
                className="button primary"
                href={`/editorial/${books[book].id}.pdf`}
                download
              >
                {tr(lang, "Baixar publicação", "Download publication")} ↓
              </a>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
