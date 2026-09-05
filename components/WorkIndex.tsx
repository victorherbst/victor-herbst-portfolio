"use client";
import { useState } from "react";
import Link from "next/link";
import { Category, projects, text } from "@/lib/projects";
import { Lang, paths, tr } from "@/lib/site";
import ProjectArt from "./ProjectArt";
import { Arrow } from "./Chrome";
export default function WorkIndex({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const list = projects.filter(
    (p) =>
      (filter === "all" || p.category.includes(filter)) &&
      `${p.name} ${text(p.type, lang)}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(
          query
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim(),
        ),
  );
  const filters: [Category, string][] = [
    ["all", tr(lang, "Tudo", "All")],
    ["brand", tr(lang, "Identidade", "Identity")],
    ["web", tr(lang, "Web & lojas", "Web & stores")],
    ["product", tr(lang, "Plataformas", "Platforms")],
  ];
  return (
    <main id="main" className="work-index shell">
      <header className="page-heading">
        <p className="eyebrow">
          {tr(lang, "Índice de projetos / 2026", "Project index / 2026")}
        </p>
        <h1>
          {tr(lang, "Ideias em", "Ideas in")}
          <br />
          <span className="serif-em">
            {tr(lang, "boa companhia.", "good company.")}
          </span>
        </h1>
        <p>
          {tr(
            lang,
            "Marcas, produtos e experiências digitais. Cada case explica o problema, as escolhas e o que foi construído.",
            "Brands, products and digital experiences. Each case explains the problem, the decisions and what was built.",
          )}
        </p>
      </header>
      <div className="work-toolbar">
        <div
          className="work-filters"
          role="group"
          aria-label={tr(lang, "Filtrar projetos", "Filter projects")}
        >
          {filters.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
            >
              {label}
              <span>
                {id === "all"
                  ? projects.length
                  : projects.filter((p) => p.category.includes(id)).length}
              </span>
            </button>
          ))}
        </div>
        <label className="work-search">
          <span className="sr-only">
            {tr(lang, "Buscar projeto", "Search projects")}
          </span>
          <input
            type="search"
            placeholder={tr(lang, "Buscar projeto…", "Search projects…")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </label>
      </div>
      <p className="work-count" role="status">
        {list.length}{" "}
        {tr(
          lang,
          list.length === 1 ? "projeto" : "projetos",
          list.length === 1 ? "project" : "projects",
        )}
      </p>
      {list.length ? (
        <div className="work-grid">
          {list.map((project) => (
            <article className="project-tile" key={project.slug}>
              <Link
                href={`${paths(lang).work}/${project.slug}`}
                className="project-image-link"
                aria-label={`${tr(lang, "Ver case", "View case")} ${project.name}`}
              >
                <ProjectArt project={project} />
                <span className="project-hover">
                  {tr(lang, "Abrir projeto", "Open project")}
                  <Arrow diagonal />
                </span>
              </Link>
              <div className="project-meta">
                <div>
                  <p className="micro">{text(project.type, lang)}</p>
                  <h2>
                    <Link href={`${paths(lang).work}/${project.slug}`}>
                      {project.name}
                    </Link>
                  </h2>
                  <p>{text(project.headline, lang)}</p>
                </div>
                <span className="project-number">↗</span>
              </div>
              <p className="project-status">{text(project.status, lang)}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h2>
            {tr(
              lang,
              "Ainda não há um projeto com esse nome.",
              "No project by that name yet.",
            )}
          </h2>
          <p>
            {tr(
              lang,
              "Experimente outra busca ou veja a seleção completa.",
              "Try another search or explore the full selection.",
            )}
          </p>
          <button
            className="button primary"
            onClick={() => {
              setFilter("all");
              setQuery("");
            }}
          >
            {tr(lang, "Limpar filtros", "Clear filters")}
            <Arrow />
          </button>
        </div>
      )}
      <aside className="index-lab">
        <div>
          <p className="eyebrow">
            {tr(lang, "Além dos cases", "Beyond the cases")}
          </p>
          <h2>{tr(lang, "A curiosidade continua.", "Curiosity continues.")}</h2>
          <p>
            {tr(
              lang,
              "Linguagem, publicação e aprendizagem no laboratório autoral.",
              "Language, publishing and learning in my independent lab.",
            )}
          </p>
        </div>
        <Link className="button primary" href={paths(lang).lab}>
          {tr(lang, "Entrar no laboratório", "Enter the lab")}
          <Arrow diagonal />
        </Link>
      </aside>
    </main>
  );
}
