import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VictorMonogram from "../components/VictorMonogram";

export const metadata: Metadata = {
  title: "Sobre Victor Herbst | Educação, linguagem e tecnologia",
  description:
    "Conheça Victor Herbst, educador de inglês e aquisição de linguagem, linguista e desenvolvedor de produtos educacionais e sistemas editoriais.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre Victor Herbst | Educação, linguagem e tecnologia",
    description:
      "Educador, linguista e desenvolvedor de produtos educacionais, sistemas editoriais e aplicações de IA.",
    url: "https://victorherbst.com.br/sobre",
    type: "profile",
    images: [
      {
        url: "https://victorherbst.com.br/og.png",
        width: 1200,
        height: 630,
        alt: "Victor Herbst — Educação, linguagem e tecnologia",
      },
    ],
  },
};

const areas = [
  [
    "Educação e linguagem",
    "Ensino de inglês e aquisição de linguagem desde 2020, com foco em explicações claras, prática contextual e progressão observável.",
  ],
  [
    "Produto e desenvolvimento",
    "Arquitetura de conteúdo, interfaces e sistemas completos que conectam pedagogia, operações e engenharia de software.",
  ],
  [
    "Editorial e publicação",
    "Preparação, revisão e composição automatizada de livros e materiais didáticos com saídas reproduzíveis e prontas para produção.",
  ],
  [
    "Linguística e IA",
    "Pesquisa em FrameNet e processamento de linguagem natural, participação no Data to Stop GBV e desenvolvimento de IA com proveniência e controle de fidelidade.",
  ],
] as const;

export default function AboutVictorHerbst() {
  return (
    <main className="profile-page">
      <nav className="nav shell" aria-label="Navegação da página sobre Victor Herbst">
        <Link className="signature" href="/" aria-label="Voltar ao portfólio de Victor Herbst">
          <VictorMonogram />
        </Link>
        <p>Victor Herbst · perfil</p>
        <div className="nav-actions">
          <Link className="nav-link" href="/">
            Portfólio <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>

      <header className="profile-hero shell">
        <div className="profile-hero-copy">
          <p className="eyebrow">Educador · linguista · desenvolvedor</p>
          <h1>Victor Herbst</h1>
          <p className="lede">
            Trabalho na interseção entre ensino, linguagem, conteúdo e tecnologia. Transformo conhecimento especializado em produtos, publicações e experiências que pessoas reais conseguem usar.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://victorherbst.com.br/#work-with-me">
              Contato no site oficial
            </a>
            <a
              className="button button-quiet"
              href="https://www.linkedin.com/in/victor-herbst-772362248/"
              target="_blank"
              rel="me noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <figure className="profile-portrait">
          <Image
            src="/portfolio/victor-editorial-v2.png"
            alt="Retrato de Victor Herbst"
            width={1060}
            height={1484}
            priority
          />
        </figure>
      </header>

      <section className="profile-statement shell" aria-labelledby="trajetoria-title">
        <p className="eyebrow">Trajetória</p>
        <div>
          <h2 id="trajetoria-title">Da sala de aula ao sistema em produção.</h2>
          <p>
            Ensino línguas desde 2020 e participo de comunidades online desde 2012. Essa experiência sustenta um trabalho que combina julgamento pedagógico, linguística aplicada, arquitetura de conteúdo, design editorial e desenvolvimento web.
          </p>
          <p>
            Entre os projetos estão o Céu Canto, uma plataforma de aprendizagem de inglês; um motor editorial próprio para livros e materiais didáticos; o Myriad, um motor de transformação textual com proveniência, contratos e linhagem autoral; e contribuições em pesquisa e tecnologia linguística com FrameNet e processamento de linguagem natural.
          </p>
        </div>
      </section>

      <section className="profile-areas shell" aria-labelledby="areas-title">
        <header>
          <p className="eyebrow">Áreas de atuação</p>
          <h2 id="areas-title">Problemas que consigo assumir do início ao fim.</h2>
        </header>
        <div className="profile-area-list">
          {areas.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-links shell" aria-labelledby="projetos-title">
        <div>
          <p className="eyebrow">Projetos selecionados</p>
          <h2 id="projetos-title">Trabalho verificável, com contexto e processo.</h2>
        </div>
        <div className="profile-link-list">
          <Link href="/#ceucanto">
            <strong>Céu Canto</strong>
            <span>Produto educacional e engenharia full-stack ↗</span>
          </Link>
          <Link href="/#editorial-engine">
            <strong>Motor editorial</strong>
            <span>Livros, poesia e materiais prontos para produção ↗</span>
          </Link>
          <Link href="/#fidelity-engine">
            <strong>Myriad</strong>
            <span>Transformação textual, proveniência e autoria verificável ↗</span>
          </Link>
          <a href="https://datatostopgbv.org/pt-br/" target="_blank" rel="noreferrer">
            <strong>Data to Stop GBV</strong>
            <span>FrameNet, semântica e processamento de linguagem natural ↗</span>
          </a>
        </div>
      </section>

      <footer className="footer shell">
        <p>Victor Herbst · Brasil · Remoto</p>
        <p>Educação · linguagem · tecnologia</p>
      </footer>
    </main>
  );
}
