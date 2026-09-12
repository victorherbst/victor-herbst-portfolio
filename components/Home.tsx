import Link from "next/link";
import { projects, text } from "@/lib/projects";
import { Lang, paths, tr } from "@/lib/site";
import Hero from "./Hero";
import ProjectArt, { WorkImage } from "./ProjectArt";
import { Arrow } from "./Chrome";
import Experience from "./Experience";
import Contact from "./Contact";
export default function Home({ lang }: { lang: Lang }) {
  const p = paths(lang);
  return (
    <main id="main">
      <Hero lang={lang} />
      <section
        className="selected-section shell"
        id="projetos"
        aria-labelledby="selected-heading"
      >
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">
              01 / {tr(lang, "Trabalhos selecionados", "Selected work")}
            </p>
            <h2 id="selected-heading">
              {tr(lang, "Cada projeto,", "A different world,")}
              <br />
              <span className="serif-em">
                {tr(lang, "um mundo.", "every time.")}
              </span>
            </h2>
          </div>
          <div className="section-aside">
            <p>
              {tr(
                lang,
                "Da identidade que chama a atenção à interface que resolve o dia.",
                "From the identity that draws you in to the interface that makes your day easier.",
              )}
            </p>
            <Link href={p.work} className="text-link">
              {tr(lang, "Todos os projetos", "All projects")} ({String(projects.length).padStart(2,"0")}){" "}
              <Arrow diagonal />
            </Link>
          </div>
        </div>
        <div className="selected-grid">
          {["rasante","cadencia","forno-da-lia","oficio","maia-ventura","ceu-canto"].map(slug=>projects.find(p=>p.slug===slug)!).map(
            (project, i) => (
              <article
                className={`project-tile tile-${i}`}
                key={project.slug}
                data-reveal
              >
                <Link
                  href={`${p.work}/${project.slug}`}
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
                    <h3>
                      <Link href={`${p.work}/${project.slug}`}>
                        {project.name}
                      </Link>
                    </h3>
                    <p>{text(project.headline, lang)}</p>
                  </div>
                  <span className="project-number">0{i + 1}</span>
                </div>
              </article>
            ),
          )}
        </div>
      </section>
      <Experience lang={lang} />
      <section className="services shell" aria-labelledby="services-heading">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">
              03 / {tr(lang, "O que podemos criar", "What we can create")}
            </p>
            <h2 id="services-heading">
              {tr(lang, "Uma ideia sua.", "Your idea.")}
              <br />
              <span className="serif-em">
                {tr(lang, "Do começo ao fim.", "From start to finish.")}
              </span>
            </h2>
          </div>
          <p className="section-aside">
            {tr(
              lang,
              "Você conversa com quem desenha e desenvolve. Menos distância entre a ideia, a decisão e a entrega.",
              "You talk to the person designing and developing. Less distance between an idea, a decision and the finished work.",
            )}
          </p>
        </div>
        <div className="service-list">
          {(lang === "pt"
            ? [
                [
                  "01",
                  "Marcas que têm voz.",
                  "Identidade visual, direção de arte, embalagem e um sistema que funciona no digital e fora dele.",
                  "Identidade & direção",
                ],
                [
                  "02",
                  "Sites que dão vontade.",
                  "Sites institucionais, portfólios e lojas com conteúdo claro, boa navegação e atenção ao celular.",
                  "Websites & e-commerce",
                ],
                [
                  "03",
                  "Produtos que resolvem.",
                  "Plataformas, portais e ferramentas sob medida. Interface, dados e lógica pensados juntos.",
                  "Produto & desenvolvimento",
                ],
              ]
            : [
                [
                  "01",
                  "Brands with a voice.",
                  "Visual identity, art direction, packaging and a system that works online and beyond.",
                  "Identity & direction",
                ],
                [
                  "02",
                  "Websites that draw you in.",
                  "Company websites, portfolios and stores with clear content, useful navigation and care for mobile.",
                  "Websites & e-commerce",
                ],
                [
                  "03",
                  "Products that solve things.",
                  "Custom platforms, portals and tools. Interface, data and logic designed together.",
                  "Product & development",
                ],
              ]
          ).map(([n, title, desc, label]) => (
            <details key={n} className="service-row">
              <summary>
                <span className="micro">{n}</span>
                <h3>{title}</h3>
                <span className="service-label">{label}</span>
                <span className="details-icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="service-description">
                <p>{desc}</p>
                <a href="#contato" className="text-link">
                  {tr(lang, "Conversar sobre isso", "Let’s talk about it")}
                  <Arrow diagonal />
                </a>
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="about-strip shell" data-reveal>
        <div className="about-photo">
          <WorkImage
            name="victor"
            alt={tr(
              lang,
              "Retrato de Victor Herbst",
              "Portrait of Victor Herbst",
            )}
            sizes="(max-width: 760px) 80vw, 25vw"
          />
          <span>
            Victor, {tr(lang, "por trás das telas.", "behind the screens.")}
          </span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">
            04 / {tr(lang, "Prazer, Victor", "Hi, I’m Victor")}
          </p>
          <h2>
            {tr(lang, "Curiosidade é", "Curiosity is")}
            <br />
            <span className="serif-em">
              {tr(lang, "meu ponto de partida.", "where I start.")}
            </span>
          </h2>
          <p>
            {tr(
              lang,
              "Venho da educação e da linguagem. Esse olhar aparece em tudo que crio: como uma marca se apresenta, como uma interface explica e como um produto ajuda alguém a seguir.",
              "My background is in education and language. That perspective lives in everything I create: how a brand introduces itself, how an interface explains and how a product helps someone move forward.",
            )}
          </p>
          <Link href={p.about} className="text-link">
            {tr(lang, "Mais sobre meu trabalho", "More about my work")}
            <Arrow diagonal />
          </Link>
        </div>
      </section>
      <Contact lang={lang} />
    </main>
  );
}
