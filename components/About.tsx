import Link from "next/link";
import { Lang, paths, tr, contacts } from "@/lib/site";
import { WorkImage } from "./ProjectArt";
import { Arrow } from "./Chrome";
export default function About({ lang }: { lang: Lang }) {
  return (
    <main id="main" className="about-page shell">
      <header className="page-heading">
        <p className="eyebrow">
          {tr(lang, "Victor Herbst / Sobre", "Victor Herbst / About")}
        </p>
        <h1>
          {tr(lang, "O trabalho é pessoal.", "The work is personal.")}
          <br />
          <span className="serif-em">
            {tr(lang, "O cuidado também.", "So is the care.")}
          </span>
        </h1>
      </header>
      <section className="about-intro">
        <div className="about-portrait">
          <WorkImage
            name="victor"
            priority
            alt={tr(
              lang,
              "Retrato de Victor Herbst",
              "Portrait of Victor Herbst",
            )}
            sizes="(max-width:760px) 90vw, 35vw"
          />
          <span>
            {tr(lang, "Brasil · Trabalho remoto", "Brazil · Working remotely")}
          </span>
        </div>
        <div>
          <h2>
            {tr(
              lang,
              "Sou Victor. Gosto de entender antes de desenhar.",
              "I’m Victor. I like to understand before I design.",
            )}
          </h2>
          <p>
            {tr(
              lang,
              "Minha trajetória passa pelo ensino de inglês, pela linguística e pelo desenvolvimento de produtos. Ensino línguas desde 2020. A atenção à forma como as pessoas entendem uma ideia foi ficando cada vez mais presente no meu trabalho com interfaces, conteúdo e marcas.",
              "My path runs through English teaching, linguistics and product development. I have taught languages since 2020. An interest in how people understand an idea has become increasingly central to my work with interfaces, content and brands.",
            )}
          </p>
          <p>
            {tr(
              lang,
              "Hoje, conecto direção de arte e implementação. Posso construir a identidade de uma marca, transformar uma operação em plataforma ou cuidar de um site do conteúdo ao código. Gosto de projetos em que uma boa decisão visual também melhora o uso.",
              "Today, I connect art direction and implementation. I can build a brand identity, turn an operation into a platform or take care of a website from content to code. I enjoy projects where a good visual decision also improves the experience.",
            )}
          </p>
          <p>
            {tr(
              lang,
              "O portfólio reúne produtos autorais e conceitos explicitamente identificados. Os conceitos são um espaço para mostrar o trabalho completo: construir um universo, resolver seus detalhes e colocar a experiência para funcionar.",
              "This portfolio includes independent products and clearly labelled concepts. Concepts are a space to show the complete work: build a world, solve its details and make the experience work.",
            )}
          </p>
          <a
            href={contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            LinkedIn
            <Arrow diagonal />
          </a>
        </div>
      </section>
      <section className="about-method">
        <p className="eyebrow">{tr(lang, "Como eu trabalho", "How I work")}</p>
        <div>
          {(lang === "pt"
            ? [
                [
                  "Entender",
                  "O contexto vem primeiro: quem vai usar, o que precisa acontecer e onde a experiência costuma falhar.",
                ],
                [
                  "Dar forma",
                  "Identidade, conteúdo e interface são desenhados juntos. As decisões precisam funcionar fora da apresentação.",
                ],
                [
                  "Construir e verificar",
                  "Implementação, testes de fluxo, celular, teclado e atenção ao carregamento fazem parte da entrega.",
                ],
              ]
            : [
                [
                  "Understand",
                  "Context comes first: who will use it, what needs to happen and where the experience tends to fail.",
                ],
                [
                  "Give it form",
                  "Identity, content and interface are designed together. Decisions must work beyond a presentation.",
                ],
                [
                  "Build and verify",
                  "Implementation, flow testing, mobile, keyboard access and loading behaviour are part of the delivery.",
                ],
              ]
          ).map(([title, desc], i) => (
            <article key={title}>
              <span className="micro">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-research">
        <div>
          <p className="eyebrow">
            {tr(lang, "Linguagem & pesquisa", "Language & research")}
          </p>
          <h2>
            {tr(
              lang,
              "Um olhar que vem de outros lugares.",
              "A perspective shaped elsewhere.",
            )}
          </h2>
          <p>
            {tr(
              lang,
              "Minha participação em pesquisa com FrameNet e processamento de linguagem natural, incluindo o Data to Stop GBV, sustenta o interesse por contexto, significado e responsabilidade na construção de ferramentas.",
              "My involvement in FrameNet and natural language processing research, including Data to Stop GBV, informs my interest in context, meaning and responsibility when building tools.",
            )}
          </p>
        </div>
        <a
          className="text-link"
          href="https://datatostopgbv.org/pt-br/"
          target="_blank"
          rel="noreferrer"
        >
          Data to Stop GBV
          <Arrow diagonal />
        </a>
      </section>
      <div className="case-end">
        <h2>{tr(lang, "Tem uma ideia em mente?", "Have an idea in mind?")}</h2>
        <Link href={`${paths(lang).home}#contato`} className="button primary">
          {tr(lang, "Vamos conversar", "Let’s talk")}
          <Arrow diagonal />
        </Link>
      </div>
    </main>
  );
}
