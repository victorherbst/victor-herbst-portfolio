"use client";
import { useState } from "react";
import Link from "next/link";
import { Category, projects, text } from "@/lib/projects";
import { Lang, paths, tr } from "@/lib/site";
import ProjectArt from "./ProjectArt";
import { Arrow } from "./Chrome";
import {ReferenceButton,ReferenceSelection} from "./ReferencePicker";
export default function WorkIndex({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState<Category>("all");
  const [composition,setComposition]=useState("all");
  const directions=[["all","Todas as composições","All compositions"],["graphic","Gráfica & cultural","Graphic & cultural"],["workbench","Bancada & estudo","Workbench & learning"],["operations","Operação & documentos","Operations & documents"],["editorial","Editorial & fotografia","Editorial & photography"],["craft","Marca & embalagem","Brand & packaging"],["commerce","Catálogo & compra","Catalogue & shopping"]];
  const [query, setQuery] = useState("");
  const list = projects.filter(
    (p) =>
      (filter === "all" || p.category.includes(filter)) &&
      (composition === "all" || p.composition===composition) &&
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
      <div className="composition-filter"><label htmlFor="composition">{tr(lang,"Explore também pela composição","Also explore by composition")}</label><select id="composition" value={composition} onChange={e=>setComposition(e.target.value)}>{directions.map(([id,pt,en])=><option key={id} value={id}>{tr(lang,pt,en)}</option>)}</select><p>{tr(lang,"Guarde até três referências e escolha o que mais combina com sua ideia.","Save up to three references and choose what best fits your idea.")}</p></div>
      <ReferenceSelection lang={lang} compact/>
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
              <ReferenceButton slug={project.slug} lang={lang}/>
              <p className="project-status">{text(project.status, lang)}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h2>
            {tr(
              lang,
              "Nenhum projeto nessa combinação.",
              "No projects match this combination.",
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
              setComposition("all");
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
