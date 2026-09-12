import Link from "next/link";
import Image from "next/image";
import { Project, projects, text } from "@/lib/projects";
import { Lang, paths, tr } from "@/lib/site";
import { WorkImage } from "./ProjectArt";
import { Arrow } from "./Chrome";
import {ReferenceButton} from "./ReferencePicker";
export default function CasePage({
  project: p,
  lang,
}: {
  project: Project;
  lang: Lang;
}) {
  const next =
    projects[
      (projects.findIndex((i) => i.slug === p.slug) + 1) % projects.length
    ];
  return (
    <main id="main" className={`case-page case-${p.slug} composition-${p.composition}`} style={{"--case-color":p.color,"--case-ink":p.ink} as React.CSSProperties}>
      <header className="case-header shell">
        <Link className="back-link" href={paths(lang).work}>
          ← {tr(lang, "Todos os projetos", "All projects")}
        </Link>
        <div className="case-top">
          <p className="eyebrow">{text(p.type, lang)}</p>
          <span className="case-kind">
            {p.concept
              ? tr(lang, "Conceito de portfólio", "Portfolio concept")
              : tr(lang, "Produto autoral", "Independent product")}{" "}
            · 2026
          </span>
        </div>
        <h1>{p.slug === "maia-ventura" ? <Image className="case-wordmark maia-wordmark" src="/brand/maia.svg" width={1200} height={250} alt={p.name} priority/> : p.slug === "forno-da-lia" ? <Image className="case-wordmark lia-wordmark" src="/brand/lia.svg" width={640} height={415} alt={p.name} priority/> : p.name}</h1>
        <div className="case-lede">
          <h2>{text(p.headline, lang)}</h2>
          <p>{text(p.intro, lang)}</p>
        </div>
        <div className="case-info">
          <div>
            <span className="micro">
              {tr(lang, "Minha atuação", "My role")}
            </span>
            <p>{text(p.role, lang)}</p>
          </div>
          <div>
            <span className="micro">
              {tr(lang, "Estado do projeto", "Project status")}
            </span>
            <p>{text(p.status, lang)}</p>
          </div>
          <div className="case-actions">
            <ReferenceButton slug={p.slug} lang={lang}/>
            {p.demo && (
              <Link
                className="button primary"
                href={`${paths(lang).home}?demo=${p.demo}#experiencias`}
              >
                {tr(lang, "Experimentar interação", "Try the interaction")}
                <Arrow diagonal />
              </Link>
            )}
            {p.link && (
              <a
                className="text-link"
                href={p.link}
                target="_blank"
                rel="noreferrer"
              >
                {tr(lang, "Visitar site público", "Visit public website")}
                <Arrow diagonal />
              </a>
            )}
            {p.download && (
              <a className="text-link" href={p.download} download>
                {tr(lang, "Baixar media kit · PDF", "Download media kit · PDF")}{" "}
                ↓
              </a>
            )}
          </div>
        </div>
      </header>
      <div
        className={`case-cover cover-${p.slug}`}
        style={{ background: p.color }}
      >
        <div className="shell">
          <WorkImage
            name={p.images[0].src}
            alt={text(p.images[0].caption, lang)}
            priority
            sizes="(max-width:760px) 100vw, 90vw"
          />
        </div>
      </div>
      <section
        className="case-reason shell"
        aria-labelledby="case-decisions"
        data-reveal
      >
        <p className="eyebrow" id="case-decisions">
          {tr(lang, "Por trás do projeto", "Behind the project")}
        </p>
        <div>
          {[
            [tr(lang, "O ponto de partida", "The starting point"), p.challenge],
            [
              tr(lang, "A decisão de design", "The design decision"),
              p.decision,
            ],
            [tr(lang, "O que foi construído", "What was built"), p.result],
          ].map(([title, copy], i) => (
            <article key={i}>
              <span className="micro">0{i + 1}</span>
              <div>
                <h3>{title as string}</h3>
                <p>{text(copy as [string, string], lang)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        className="case-gallery shell"
        aria-label={tr(lang, "Imagens do projeto", "Project images")}
      >
        {p.images.slice(1).map((im, i) => (
          <figure
            className={`case-figure ${im.layout === "wide" ? "wide" : ""}`}
            key={im.src}
            data-reveal
          >
            <div>
              <WorkImage name={im.src} alt={text(im.caption, lang)} />
            </div>
            <figcaption>
              <span className="micro">0{i + 2}</span>
              {text(im.caption, lang)}
            </figcaption>
          </figure>
        ))}
      </section>
      <div className="case-footnote shell">
        {p.concept&&<details><summary>{tr(lang,"Créditos de imagem","Image credits")}</summary><p>{tr(lang,"Fotografias conceituais geradas por IA, com direção e revisão de Victor Herbst. As telas mostram o projeto implementado.","Concept photography generated with AI, directed and reviewed by Victor Herbst. Screens show the implemented project.")}</p></details>}
        <p>
          {p.concept
            ? tr(
                lang,
                "Projeto fictício criado para portfólio. Marcas, pessoas e operações retratadas são conceituais. Imagens ilustrativas.",
                "Fictional portfolio project. Depicted brands, people and operations are concepts. Illustrative imagery.",
              )
            : tr(
                lang,
                "Produto autoral. As imagens e o texto identificam o que está publicado e o que pertence ao protótipo.",
                "Independent product. Images and text distinguish published work from the prototype.",
              )}{" "}
          {p.slug === "cadencia"
            ? tr(
                lang,
                "Estudos musicais originais do projeto CADÊNCIA · CC BY 4.0.",
                "Original CADÊNCIA music studies · CC BY 4.0.",
              )
            : ""}
        </p>
        <div>
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <section className="case-end shell">
        <div>
          <p className="eyebrow">
            {tr(
              lang,
              "Seu projeto pode ser o próximo",
              "Your project could be next",
            )}
          </p>
          <h2>
            {tr(lang, "Vamos tirar do papel?", "Ready to make it happen?")}
          </h2>
        </div>
        <Link href={`${paths(lang).home}#contato`} className="button primary">
          {tr(lang, "Começar uma conversa", "Start a conversation")}
          <Arrow diagonal />
        </Link>
      </section>
      <Link className="next-project" href={`${paths(lang).work}/${next.slug}`}>
        <div className="shell">
          <span className="eyebrow">
            {tr(lang, "Próximo projeto", "Next project")}
          </span>
          <span className="next-project-name">
            {next.name}
            <Arrow diagonal />
          </span>
        </div>
      </Link>
    </main>
  );
}
