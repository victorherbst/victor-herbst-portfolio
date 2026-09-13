"use client";
import Link from "next/link";
import { useState } from "react";
import { projects, text } from "@/lib/projects";
import { Lang, paths, tr } from "@/lib/site";
import ProjectArt from "./ProjectArt";
import { Arrow } from "./Chrome";
export default function Hero({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const slides = ["vinco", "verbete", "ceu-canto"].map(slug => projects.find(p => p.slug === slug)!);
  const project = slides[active];
  const p = paths(lang);
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span>
          {tr(
            lang,
            "Design & desenvolvimento independente",
            "Independent design & development",
          )}
        </span>
        <span>
          {tr(lang, "Brasil, para qualquer lugar", "From Brazil, to anywhere")}{" "}
          <span aria-hidden="true">↗</span>
        </span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">
            {tr(lang, "Da ideia", "From idea")}
            <br />
            {tr(lang, "ao clique", "to click")}
            <span className="hero-period">.</span>
          </h1>
          <p>
            {tr(
              lang,
              "Sou Victor. Crio marcas, sites e plataformas com personalidade — e cuido de fazer tudo funcionar.",
              "I’m Victor. I create brands, websites and platforms with personality — and make sure it all works.",
            )}
          </p>
          <div className="hero-actions">
            <Link className="button primary" href={p.work}>
              {tr(lang, "Ver os projetos", "Explore the work")}
              <Arrow diagonal />
            </Link>
            <a className="text-link" href="#experiencias">
              {tr(lang, "Experimentar ao vivo", "Try the interactions")}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="mini-mark" aria-hidden="true">
              v/h
            </span>
            <span>
              {tr(
                lang,
                "Um olhar para o todo.\nCuidado com cada detalhe.",
                "An eye for the whole.\nCare for every detail.",
              )}
            </span>
          </div>
        </div>
        <div className="hero-work">
          <Link
            href={`${p.work}/${project.slug}`}
            className="hero-feature"
            aria-label={`${tr(lang, "Conhecer", "Explore")} ${project.name}`}
          >
            <div key={project.slug} className="hero-art-enter">
              <ProjectArt project={project} priority={active === 0} />
            </div>
            <span className="feature-arrow">
              <Arrow diagonal />
            </span>
          </Link>
          <div className="hero-caption">
            <div>
              <span className="micro">
                {tr(lang, "Em destaque", "In focus")} / 0{active + 1}
              </span>
              <Link href={`${p.work}/${project.slug}`}>
                {project.name} <span>↗</span>
              </Link>
            </div>
            <div
              className="hero-selectors"
              aria-label={tr(lang, "Projeto em destaque", "Featured project")}
            >
              {slides.map((s, i) => (
                <button
                  key={s.slug}
                  aria-label={`${tr(lang, "Mostrar", "Show")} ${s.name}`}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  <span>0{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="hero-project-kind">
            {text(project.type, lang)} ·{" "}
            {tr(lang, "Conceito de portfólio", "Portfolio concept")}
          </p>
        </div>
      </div>
    </section>
  );
}
