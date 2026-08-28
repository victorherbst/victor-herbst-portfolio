"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import EducationVisit from "./components/EducationVisit";
import FidelityEngine from "./components/FidelityEngine";
import PetBlueprints from "./components/PetBlueprints";
import SkyAtlas from "./components/SkyAtlas";
import TechnicalSignature from "./components/TechnicalSignature";
import VictorMonogram from "./components/VictorMonogram";

type Language = "pt" | "en";

type EditorialSpecimenKey = "technical" | "prose" | "poetry";

const contactHref = "https://victorherbst.com.br/#work-with-me";

const prismRoles = [
  ["Atmosphere", "#240B05"], ["Surface", "#32140B"], ["Primary text", "#F8E7E2"],
  ["Noun phrase", "#945736"], ["Adjunct", "#31447A"], ["Target", "#895F22"],
  ["Accent", "#9CB679"], ["Identity", "#3E5289"], ["Positive", "#90DAB9"],
  ["Negative", "#DE6573"],
];

const editorialAssets: Record<EditorialSpecimenKey, { pages: string[] }> = {
  technical: {
    pages: [
      "/editorial/technical-cover.png",
      "/editorial/technical-table.png",
      "/editorial/technical-flow.png",
    ],
  },
  prose: {
    pages: [
      "/editorial/prose-cover.png",
      "/editorial/prose-opener.png",
      "/editorial/prose-colophon.png",
    ],
  },
  poetry: {
    pages: [
      "/editorial/poetry-cover.png",
      "/editorial/poetry-spread.png",
      "/editorial/poetry-index.png",
    ],
  },
};

const content = {
  pt: {
    nav: { descriptor: "educação × linguagem × tecnologia", talk: "Vamos conversar", aria: "Navegação principal", language: "Escolher idioma" },
    hero: {
      eyebrow: "Victor Herbst · educador, linguista e desenvolvedor",
      title: "Construo sistemas de aprendizagem em que cada erro informa a próxima experiência.",
      lede: "Conecto pedagogia, linguagem, IA e engenharia de produto para transformar problemas complexos de aprendizagem em experiências que as pessoas realmente conseguem usar.",
      primary: "Conheça o projeto principal", secondary: "Comece um projeto",
      aria: "Céu Canto em computador, tablet e iPhone", product: "produto real · responsivo por natureza",
      view: "Prática, revisão e leitura com a mesma profundidade em cada tela.",
    },
    proof: [["14+", "anos dentro de comunidades online"], ["1.000+", "objetos de aprendizagem em produção"], ["54/54", "verificações externas de produção"]],
    case: {
      label: "produto principal", eyebrow: "Céu Canto · plataforma de aprendizagem de inglês",
      title: "Uma filosofia de ensino transformada em sistema de produção.",
      text: "Curso, leitura guiada, baralhos curados, revisão espaçada, acompanhamento docente e experiências de aula ao vivo compartilham a mesma progressão de aprendizagem.",
      tags: ["Estratégia de produto", "Design de aprendizagem", "Engenharia full-stack", "Fluxos com IA"],
      techLabel: "Ficha técnica",
      stack: [["Aplicação", "Next.js 16 · React 19"], ["Dados", "Supabase Auth · PostgreSQL · RLS"], ["Aprendizagem", "FSRS · voz neural Kokoro"], ["Operação", "Mercado Pago · Analytics · Speed Insights"]],
      caption: "Até o nome é uma decisão de produto: linguagem, poesia e legibilidade de máquina vivendo na mesma marca.", link: "Visite o produto no ar",
    },
    systemsHeading: { eyebrow: "Sistemas selecionados do Céu Canto", title: "Um produto, quatro tipos de problema difícil." },
    systems: [
      { number: "01", title: "Prática contextual", text: "O feedback reconstrói a interpretação do aluno, explica o mecanismo do erro e agenda o retorno no momento adequado.", meta: "pedagogia · interação · revisão espaçada" },
      { number: "02", title: "Uma biblioteca viva de linguagem", text: "Baralhos curados, leitura guiada e uma trilha estruturada de gramática compartilham uma camada de vocabulário. Cada encontro prepara o próximo.", meta: "sistemas de conteúdo · leitura · currículo" },
      { number: "03", title: "Visibilidade para o professor", text: "O produto trata o professor como parte do sistema: jornadas do aluno, prática em sala e pontos de intervenção são desenhados juntos.", meta: "ferramentas docentes · dados de aprendizagem · operações" },
      { number: "04", title: "Disciplina de produção", text: "Pagamentos, revisão offline, privacidade, migrações, critérios de release e smoke tests externos transformam uma ideia educacional em um serviço confiável.", meta: "engenharia · qualidade · lançamento" },
    ],
    engines: {
      eyebrow: "Motores originais de produto", title: "Três sistemas reutilizáveis sustentam o produto.",
      character: { index: "MOTOR 01 · ENGENHARIA DE MOVIMENTO", title: "Anatomias diferentes, movimento autoral e provas reproduzíveis.", text: "Neo mede rotação, atraso e overshoot em uma grade semântica 48 × 48. Haru testa transferência de massa, pouso e onion skin. Bori amplia o sistema com microgestos e ciclos de atuação. As pranchas registram cada decisão antes da exportação.", facts: ["Corpos decompostos em regiões semânticas", "Força, trajetória e onion skin auditáveis", "Ciclos de atuação prontos para o runtime"], techLabel: "Implementação", stack: [["Forja", "Python · geometria paramétrica"], ["Artefatos", "JSON canônico · SVG · PNG"], ["Runtime", "JavaScript · React"], ["Estado", "Supabase · PostgreSQL"]] },
      prism: { index: "MOTOR 02 · MATEMÁTICA DE COR OKLCH", title: "Sementes viram uma interface completa e acessível.", text: "De uma a cinco cores entram no Prisma. Um solver determinístico produz 13 papéis semânticos, estados derivados e um rastro de decisões — com gamut mapping, regras de colisão e contraste WCAG AA verificado nas cores emitidas.", techLabel: "Implementação", stack: [["Núcleo", "JavaScript determinístico"], ["Cor", "OKLCH · gamut mapping sRGB"], ["Qualidade", "WCAG AA · node:test"], ["Saída", "Design tokens · CSS · JSON trace"]], seeds: "3 sementes", passes: "3 passes de validação" },
      skies: { index: "MOTOR 03 · ATMOSFERAS ADAPTATIVAS", title: "Vinte e quatro céus, pareados entre dia e noite.", text: "Cada céu governa fundo, superfícies, texto, ações, identidade e mapas de calor de aprendizagem por meio de tokens validados. O produto persiste IDs previamente aprovados.", techLabel: "Implementação", stack: [["Interface", "React · CSS custom properties"], ["Modelo", "Design tokens semânticos"], ["Estado", "Supabase · PostgreSQL"], ["Regras", "Desbloqueios determinísticos"]], aria: "Doze céus representativos do Céu Canto", note: "12 exibidos · 24 céus em produção · 12 famílias pareadas" },
    },
    editorial: {
      eyebrow: "Motor editorial autoral · Livro Pronto",
      title: "Duas provas do motor. Um laboratório poético.",
      text: "O Livro Pronto transforma um BookDocument validado em publicação fechada: paginação em duas passagens, páginas editoriais, sumário medido, aberturas ímpares, cabeçalhos, fólios, caixas de produção e preflight. A prosa demonstra o fluxo completo até a gráfica; a poesia preserva um laboratório visual autoral.",
      techLabel: "Arquitetura de produção",
      stack: [["Núcleo", "TypeScript · Node.js"], ["PDF", "PDFKit · composição em duas passagens"], ["Editáveis", "DOCX · importação com Mammoth"], ["Digital", "EPUB 3 · JSZip"]],
      items: {
        technical: {
          tab: "Técnico",
          number: "01",
          title: "Cartografia do erro",
          descriptor: "A4 · 16 páginas · caderno técnico",
          text: "Uma publicação técnica completa: capa, mapa de leitura, páginas de seção, matriz de sinais, anatomia da devolutiva, blueprint de interface, cronologia de retorno, fluxo de decisão, governança, referências e colofão.",
          facts: ["Matriz editorial legível", "Diagramas integralmente vetoriais", "Arial e Georgia incorporadas", "Sangria e preflight aprovados"],
          alt: "Páginas do caderno técnico Cartografia do erro",
        },
        prose: {
          tab: "Prosa",
          number: "02",
          title: "A oficina das horas baixas",
          descriptor: "140 × 210 mm · 28 páginas · miolo fechado",
          text: "Um livro completo, da falsa folha de rosto ao colofão: créditos, direitos, epígrafe, sumário, quatro capítulos, sobre o autor e especificação técnica de produção. O arquivo inclui sangria, marcas, caixas de página e fontes incorporadas.",
          facts: ["Front matter e end matter completos", "TrimBox, BleedBox e ArtBox", "Georgia incorporada", "Preflight aprovado"],
          alt: "Páginas da narrativa A oficina das horas baixas",
        },
        poetry: {
          tab: "Poesia",
          number: "03",
          title: "Atlas para coisas que quase somem",
          descriptor: "150 × 220 mm · 13 páginas · laboratório poético",
          text: "Um laboratório visual autoral preservado por sua composição específica. Quatro movimentos exploram silêncio, deslocamento e densidade, com um índice de primeiros versos.",
          facts: ["Ritmos de página variáveis", "Quatro aberturas de seção", "Doze poemas originais", "Índice de primeiros versos"],
          alt: "Páginas do livro de poesia Atlas para coisas que quase somem",
        },
      },
      pipelineLabel: "Livro Pronto · fluxo canônico",
      pipeline: ["BookDocument validado", "paginação medida", "composição em duas passagens", "caixas de produção", "preflight certificado"],
    },
    intelligence: {
      eyebrow: "Inteligência aplicada", title: "IA é útil quando melhora uma decisão.",
      text: "Uma próxima atividade melhor. Uma intervenção docente mais clara. Um fluxo de conteúdo em que a equipe pode confiar. Um processo que poupa tempo. O valor da IA aparece na qualidade da decisão produzida.",
      leverage: [["Aluno", "Trilhas e feedback personalizados com base em comportamento observável."], ["Professor", "Ferramentas que deixam claro onde atenção e julgamento humano mais importam."], ["Equipe", "Conteúdo e operações assistidos por IA, com padrões, revisão e rastreabilidade."], ["Negócio", "Funis, instrumentação e fluxos confiáveis que melhoram com o uso."]],
    },
    method: {
      eyebrow: "Como eu trabalho", title: "Do insight de sala de aula ao software funcionando.",
      steps: [["01", "Encontrar o problema real de aprendizagem", "Começar pelo erro do aluno, pela restrição do professor e pelo comportamento que queremos mudar."], ["02", "Modelar a pedagogia", "Traduzir julgamento linguístico em regras de conteúdo, estruturas de dados, interações e sinais mensuráveis."], ["03", "Entregar uma fatia completa", "Desenhar, implementar e conectar a menor experiência que uma pessoa real consegue usar do começo ao fim."], ["04", "Aprender com a realidade", "Usar feedback, evidência de produto e resultados de ensino para deixar a próxima iteração mais precisa."]],
    },
    engagementsHeading: { eyebrow: "Formas de trabalhar comigo", kicker: "Do diagnóstico à entrega completa.", title: "Comece pelo menor projeto capaz de produzir evidência." },
    engagements: [
      { number: "01", title: "Diagnóstico educacional e editorial", text: "Uma sessão focada seguida por um plano de ação escrito: o que está confuso, o que custa caro, o que deve mudar primeiro e como é uma próxima versão crível.", meta: "sessão de 90 minutos · plano escrito · 2–3 dias úteis", subject: "Diagnóstico educacional e editorial" },
      { number: "02", title: "Sistema para material, livro ou curso", text: "Uma publicação ou sequência de aprendizagem pequena, mas acabada, com estrutura, linguagem, hierarquia visual e lógica de produção desenhadas em conjunto.", meta: "escopo fechado · fonte editável · saída pronta para produção", subject: "Sistema para material, livro ou curso" },
      { number: "03", title: "Produto educacional ou protótipo de IA", text: "Uma fatia vertical funcional para equipes que precisam provar a pedagogia, a interação e o caminho técnico antes de investir numa plataforma inteira.", meta: "descoberta · protótipo · roteiro de implementação", subject: "Produto educacional ou protótipo de IA" },
      { number: "04", title: "Desenvolvimento full-stack de produto", text: "Uma entrega de ponta a ponta, da arquitetura e interface ao banco de dados, APIs, autenticação, integrações, testes e publicação. Para produtos que precisam sair do plano e funcionar em produção.", meta: "React / Next.js · TypeScript · Supabase / PostgreSQL · cloud e integrações", subject: "Desenvolvimento full-stack de produto" },
    ],
    requestScope: "Pedir um escopo",
    about: { eyebrow: "Educação · linguagem · engenharia", title: "Trabalho na interseção entre ensino, conteúdo e produto.", text: "Ensino línguas desde 2020, construo produtos digitais do zero e vivo em comunidades online desde 2012. Essa experiência conecta explicação gramatical, fluxo de produto, arquitetura de conteúdo e operação, preservando a voz humana em cada camada." },
    footer: ["Victor Herbst · Brasil · Remoto", "Evidência orienta cada decisão."],
    alts: { practice: "Tela real de feedback contextual do Céu Canto", desktop: "Céu Canto aberto em uma interface de desktop", tablet: "Modo revisão do Céu Canto aberto em um tablet", mobile: "Biblioteca de leitura do Céu Canto aberta em um iPhone", mark: "Marca reconstruída do Céu Canto", pets: "Quatro pets reais renderizados pelo motor do Céu Canto", portrait: "Retrato de Victor Herbst" },
  },
  en: {
    nav: { descriptor: "education × language × technology", talk: "Let’s talk", aria: "Primary navigation", language: "Choose language" },
    hero: {
      eyebrow: "Victor Herbst · educator, linguist & developer",
      title: "I build learning systems where each error informs the next experience.",
      lede: "I connect pedagogy, language, AI and product engineering to turn complex learning problems into experiences people can actually use.",
      primary: "Explore the flagship case", secondary: "Start a project",
      aria: "Céu Canto on desktop, tablet and iPhone", product: "real product · responsive by design",
      view: "Practice, review and reading with the same depth on every screen.",
    },
    proof: [["14+", "years inside online communities"], ["1,000+", "learning objects in production"], ["54/54", "external production checks"]],
    case: {
      label: "flagship product", eyebrow: "Céu Canto · English learning platform",
      title: "A teaching philosophy turned into a production system.",
      text: "Course, guided reading, curated decks, spaced review, teacher monitoring and live-class experiences share one learning progression.",
      tags: ["Product strategy", "Learning design", "Full-stack engineering", "AI workflows"],
      techLabel: "Technical profile",
      stack: [["Application", "Next.js 16 · React 19"], ["Data", "Supabase Auth · PostgreSQL · RLS"], ["Learning", "FSRS · Kokoro neural voice"], ["Operations", "Mercado Pago · Analytics · Speed Insights"]],
      caption: "Even the name is a product decision: language, poetry and machine legibility living in the same mark.", link: "Visit the live product",
    },
    systemsHeading: { eyebrow: "Selected systems inside Céu Canto", title: "One product, four kinds of hard problem." },
    systems: [
      { number: "01", title: "Contextual practice", text: "Feedback reconstructs the learner’s interpretation, explains the mechanism behind the error and schedules the next encounter at the right time.", meta: "pedagogy · interaction · spaced review" },
      { number: "02", title: "A living language library", text: "Curated decks, guided reading and a structured grammar path share one vocabulary layer. Each encounter prepares the next.", meta: "content systems · reading · curriculum" },
      { number: "03", title: "Teacher visibility", text: "The product treats the teacher as part of the system: learner journeys, classroom practice and intervention points are designed together.", meta: "teacher tools · learning data · operations" },
      { number: "04", title: "Production discipline", text: "Payments, offline review, privacy, migrations, release gates and external smoke checks turn an educational idea into a dependable service.", meta: "engineering · quality · launch" },
    ],
    engines: {
      eyebrow: "Original product engines", title: "Three reusable systems power the product.",
      character: { index: "ENGINE 01 · MOTION ENGINEERING", title: "Distinct anatomies, authored motion and reproducible proofs.", text: "Neo measures rotation, lag and overshoot on a semantic 48 × 48 grid. Haru tests weight transfer, landing and onion skin. Bori extends the system with micro-gestures and acting cycles. Every decision is recorded before export.", facts: ["Bodies decomposed into semantic regions", "Auditable force, trajectory and onion skin", "Acting cycles ready for the runtime"], techLabel: "Implementation", stack: [["Forge", "Python · parametric geometry"], ["Artifacts", "Canonical JSON · SVG · PNG"], ["Runtime", "JavaScript · React"], ["State", "Supabase · PostgreSQL"]] },
      prism: { index: "ENGINE 02 · OKLCH COLOR MATH", title: "Seeds become a complete, accessible interface.", text: "One to five colors enter Prisma. A deterministic solver produces 13 semantic roles, derived states and a trace — with gamut mapping, collision rules and WCAG AA contrast judged on the emitted colors.", techLabel: "Implementation", stack: [["Core", "Deterministic JavaScript"], ["Color", "OKLCH · sRGB gamut mapping"], ["Quality", "WCAG AA · node:test"], ["Output", "Design tokens · CSS · JSON trace"]], seeds: "3 seeds", passes: "3 validation passes" },
      skies: { index: "ENGINE 03 · ADAPTIVE ATMOSPHERES", title: "Twenty-four skies, paired across day and night.", text: "Each sky governs background, surfaces, text, actions, identity and learning heatmaps through validated tokens. The product stores allowlisted IDs exclusively.", techLabel: "Implementation", stack: [["Interface", "React · CSS custom properties"], ["Model", "Semantic design tokens"], ["State", "Supabase · PostgreSQL"], ["Rules", "Deterministic unlocks"]], aria: "Twelve representative Céu Canto skies", note: "12 shown · 24 production skies · 12 paired families" },
    },
    editorial: {
      eyebrow: "Original editorial engine · Livro Pronto",
      title: "Two engine proofs. One poetry laboratory.",
      text: "Livro Pronto turns a validated BookDocument into a closed publication: two-pass pagination, editorial pages, measured contents, recto openings, running heads, folios, production boxes and preflight. The prose specimen carries the workflow through print delivery; poetry remains an authored visual laboratory.",
      techLabel: "Production architecture",
      stack: [["Core", "TypeScript · Node.js"], ["PDF", "PDFKit · two-pass composition"], ["Editable", "DOCX · Mammoth import"], ["Digital", "EPUB 3 · JSZip"]],
      items: {
        technical: {
          tab: "Technical",
          number: "01",
          title: "Cartography of error",
          descriptor: "A4 · 16 pages · technical field guide",
          text: "A complete technical publication: cover, reading map, section openers, signal matrix, feedback anatomy, interface blueprint, return timeline, decision flow, governance, references and colophon.",
          facts: ["Legible editorial matrix", "Fully vector diagrams", "Embedded Arial and Georgia", "Bleed and preflight approved"],
          alt: "Pages from the technical field guide Cartography of error",
        },
        prose: {
          tab: "Prose",
          number: "02",
          title: "The workshop of low hours",
          descriptor: "140 × 210 mm · 28 pages · closed interior",
          text: "A complete book from half title to colophon: credits, rights, epigraph, contents, four chapters, author page and production specification. The file includes bleed, marks, page boxes and embedded fonts.",
          facts: ["Complete front and end matter", "TrimBox, BleedBox and ArtBox", "Embedded Georgia", "Preflight approved"],
          alt: "Pages from the story The workshop of low hours",
        },
        poetry: {
          tab: "Poetry",
          number: "03",
          title: "Atlas for things that nearly vanish",
          descriptor: "150 × 220 mm · 13 pages · poetry laboratory",
          text: "An authored visual laboratory preserved for its specific composition. Four movements explore silence, displacement and density, with a first-line index.",
          facts: ["Variable page rhythms", "Four section openings", "Twelve original poems", "First-line index"],
          alt: "Pages from the poetry book Atlas for things that nearly vanish",
        },
      },
      pipelineLabel: "Livro Pronto · canonical workflow",
      pipeline: ["validated BookDocument", "measured pagination", "two-pass composition", "production boxes", "certified preflight"],
    },
    intelligence: {
      eyebrow: "Applied intelligence", title: "AI is useful when it improves a decision.",
      text: "A better next activity. A clearer teacher intervention. A content workflow the team can trust. A process that saves time. The value of AI appears in the quality of the decision it produces.",
      leverage: [["Learner", "Personalized paths and feedback grounded in observable behavior."], ["Teacher", "Tools that clarify where attention and human judgment matter most."], ["Team", "AI-assisted content and operations with standards, review and traceability."], ["Business", "Reliable funnels, instrumentation and workflows that improve with use."]],
    },
    method: {
      eyebrow: "How I work", title: "From teaching insight to working software.",
      steps: [["01", "Find the real learning problem", "Start with the learner’s mistake, the teacher’s constraint and the behavior we want to change."], ["02", "Model the pedagogy", "Translate linguistic judgment into content rules, data structures, interactions and measurable signals."], ["03", "Ship a complete slice", "Design, implement and connect the smallest experience that can be used by a real person end to end."], ["04", "Learn from reality", "Use feedback, product evidence and teaching outcomes to make the next iteration more precise."]],
    },
    engagementsHeading: { eyebrow: "Ways to work together", kicker: "From diagnosis to complete delivery.", title: "Start with the smallest engagement that can create evidence." },
    engagements: [
      { number: "01", title: "Learning & editorial diagnostic", text: "A focused working session followed by a written action plan: what is unclear, what is expensive, what should change first and what a credible next version looks like.", meta: "90-minute session · written plan · 2–3 business days", subject: "Learning and editorial diagnostic" },
      { number: "02", title: "Material, book or course system", text: "A small but finished publication or learning sequence with structure, language, visual hierarchy and production logic designed as one system.", meta: "scoped build · editable source · production-ready output", subject: "Material, book or course system" },
      { number: "03", title: "Learning product or AI prototype", text: "A working vertical slice for teams that need to prove the pedagogy, interaction and technical path before committing to a full platform.", meta: "discovery · prototype · implementation roadmap", subject: "Learning product or AI prototype" },
      { number: "04", title: "Full-stack product development", text: "An end-to-end delivery spanning architecture, interface, database, APIs, authentication, integrations, testing and deployment. For products that need to move from plan to reliable production software.", meta: "React / Next.js · TypeScript · Supabase / PostgreSQL · cloud and integrations", subject: "Full-stack product development" },
    ],
    requestScope: "Request a scope",
    about: { eyebrow: "Education · language · engineering", title: "I work where teaching, content and product meet.", text: "I have taught language since 2020, built digital products from the ground up and lived inside online communities since 2012. That experience connects grammar explanations, product flows, content architecture and operations while preserving a human voice at every layer." },
    footer: ["Victor Herbst · Brazil · Remote", "Evidence guides every decision."],
    alts: { practice: "Real Céu Canto contextual feedback screen", desktop: "Céu Canto open in a desktop interface", tablet: "Céu Canto review mode open on a tablet", mobile: "Céu Canto reading library open on an iPhone", mark: "Céu Canto reconstructed wordmark", pets: "Four real pixel pets rendered by the Céu Canto engine", portrait: "Portrait of Victor Herbst" },
  },
} as const;

function DeviceShowcase({ language }: { language: Language }) {
  const hero = content[language].hero;
  return (
    <div className="hero-visual" aria-label={hero.aria}>
      <div className="device-glow" aria-hidden="true" />
      <div className="device device-mac">
        <span className="mac-screen"><Image src="/portfolio/ceucanto-desktop.png" alt={content[language].alts.desktop} fill priority sizes="(max-width: 620px) 90vw, 540px" /></span><span className="mac-base" aria-hidden="true" />
      </div>
      <div className="device device-ipad">
        <Image src="/portfolio/ceucanto-tablet-revisao-clean.png" alt={content[language].alts.tablet} fill priority sizes="(max-width: 620px) 52vw, 330px" />
      </div>
      <div className="device device-iphone">
        <span className="iphone-screen"><Image src="/portfolio/ceucanto-iphone-leitura-clean.png" alt={content[language].alts.mobile} fill priority sizes="(max-width: 620px) 26vw, 170px" /></span>
      </div>
      <div className="device-caption"><span>{hero.product}</span><strong>{hero.view}</strong></div>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("pt");
  const [specimen, setSpecimen] = useState<EditorialSpecimenKey>("technical");
  const t = content[language];
  const editorial = t.editorial.items[specimen];
  const specimenAssets = editorialAssets[specimen];
  const specimenProof = specimen === "technical"
    ? (language === "pt" ? "16 PÁGINAS / DIAGRAMAS VETORIAIS / PREFLIGHT APROVADO" : "16 PAGES / VECTOR DIAGRAMS / PREFLIGHT APPROVED")
    : specimen === "prose"
      ? (language === "pt" ? "28 PÁGINAS / SANGRIA 3 MM / PREFLIGHT APROVADO" : "28 PAGES / 3 MM BLEED / PREFLIGHT APPROVED")
      : (language === "pt" ? "3 FORMATOS / 1 MOTOR / SAÍDAS REPRODUZÍVEIS" : "3 FORMATS / 1 ENGINE / REPRODUCIBLE OUTPUTS");
  useEffect(() => { document.documentElement.lang = language === "pt" ? "pt-BR" : "en"; }, [language]);

  return (
    <main>
      <nav className="nav shell" aria-label={t.nav.aria}>
        <a className="signature" href="#top" aria-label="Victor Herbst, top"><VictorMonogram /></a>
        <p>{t.nav.descriptor}</p>
        <div className="nav-actions">
          <div className="language-switch" role="group" aria-label={t.nav.language}>
            <button type="button" className={language === "pt" ? "is-active" : ""} aria-pressed={language === "pt"} onClick={() => setLanguage("pt")}>PT</button>
            <button type="button" className={language === "en" ? "is-active" : ""} aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
          </div>
          <a className="nav-link" href={contactHref} target="_blank" rel="noreferrer">{t.nav.talk} <span aria-hidden="true">↗</span></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy"><p className="eyebrow">{t.hero.eyebrow}</p><h1>{t.hero.title}</h1><p className="lede">{t.hero.lede}</p>
          <div className="hero-actions"><a className="button button-primary" href="#ceucanto">{t.hero.primary} <span aria-hidden="true">↓</span></a><a className="button button-quiet" href="#work-with-me">{t.hero.secondary} <span aria-hidden="true">↗</span></a></div>
        </div>
        <DeviceShowcase language={language} />
      </section>

      <EducationVisit language={language} />

      <section className="proof shell" aria-label="Selected evidence">{t.proof.map(([number, label]) => <div className="proof-item" key={number}><strong>{number}</strong><span>{label}</span></div>)}</section>

      <section className="case shell" id="ceucanto">
        <div className="case-label"><span>01</span><p>{t.case.label}</p></div>
        <div className="case-intro"><p className="eyebrow">{t.case.eyebrow}</p><h2>{t.case.title}</h2><p>{t.case.text}</p><div className="tag-list" aria-label="Céu Canto disciplines">{t.case.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><TechnicalSignature label={t.case.techLabel} items={t.case.stack} /></div>
        <figure className="case-mark"><Image src="/portfolio/ceucanto-golden.png" alt={t.alts.mark} width={1200} height={630} /><figcaption>{t.case.caption}</figcaption><a className="case-link" href="https://ceucanto.com/">{t.case.link} <span aria-hidden="true">↗</span></a></figure>
      </section>

      <section className="systems shell" aria-labelledby="systems-title">
        <header className="section-heading"><p className="eyebrow">{t.systemsHeading.eyebrow}</p><h2 id="systems-title">{t.systemsHeading.title}</h2></header>
        <div className="systems-grid">{t.systems.map((system) => <article className="system-card" key={system.number}><span className="system-number">{system.number}</span><h3>{system.title}</h3><p>{system.text}</p><small>{system.meta}</small></article>)}</div>
      </section>

      <section className="engines shell" aria-labelledby="engines-title">
        <header className="section-heading engines-heading"><p className="eyebrow">{t.engines.eyebrow}</p><h2 id="engines-title">{t.engines.title}</h2></header>
        <article className="engine-card pet-engine"><div className="engine-copy"><span className="engine-index">{t.engines.character.index}</span><h3>{t.engines.character.title}</h3><p>{t.engines.character.text}</p><ul className="engine-facts">{t.engines.character.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><TechnicalSignature label={t.engines.character.techLabel} items={t.engines.character.stack} tone="dark" /></div><PetBlueprints language={language} /></article>
        <div className="engine-pair">
          <article className="engine-card prism-engine"><div className="engine-copy"><span className="engine-index">{t.engines.prism.index}</span><h3>{t.engines.prism.title}</h3><p>{t.engines.prism.text}</p><TechnicalSignature label={t.engines.prism.techLabel} items={t.engines.prism.stack} /></div><div className="seed-flow" aria-label="Example Prisma color transformation"><div className="seed-row"><span style={{ background: "#ED5528" }} /><span style={{ background: "#6F9272" }} /><span style={{ background: "#2A49CF" }} /><small>{t.engines.prism.seeds}</small></div><span className="seed-arrow" aria-hidden="true">→</span><small>{t.engines.prism.passes}</small></div><div className="role-grid">{prismRoles.map(([name, color]) => <div className="role-swatch" key={name}><i style={{ background: color }} /><span>{name}</span><code>{color}</code></div>)}</div></article>
          <article className="engine-card skies-engine"><div className="engine-copy"><span className="engine-index">{t.engines.skies.index}</span><h3>{t.engines.skies.title}</h3><p>{t.engines.skies.text}</p><TechnicalSignature label={t.engines.skies.techLabel} items={t.engines.skies.stack} /></div><SkyAtlas language={language} /><p className="sky-note">{t.engines.skies.note}</p></article>
        </div>
      </section>

      <section className="editorial-lab shell" id="editorial-engine" aria-labelledby="editorial-title">
        <header className="section-heading editorial-heading">
          <div><p className="eyebrow">{t.editorial.eyebrow}</p><p className="editorial-intro">{t.editorial.text}</p></div>
          <h2 id="editorial-title">{t.editorial.title}</h2>
        </header>
        <TechnicalSignature label={t.editorial.techLabel} items={t.editorial.stack} className="editorial-technical-signature" />
        <div className="specimen-tabs" role="tablist" aria-label={t.editorial.title}>
          {(Object.keys(editorialAssets) as EditorialSpecimenKey[]).map((key) => (
            <button
              type="button"
              role="tab"
              id={`specimen-tab-${key}`}
              aria-controls="specimen-panel"
              aria-selected={specimen === key}
              className={specimen === key ? "is-active" : ""}
              onClick={() => setSpecimen(key)}
              key={key}
            >
              <span>{t.editorial.items[key].number}</span>{t.editorial.items[key].tab}
            </button>
          ))}
        </div>
        <div
          className={`specimen-stage specimen-${specimen}`}
          id="specimen-panel"
          role="tabpanel"
          aria-labelledby={`specimen-tab-${specimen}`}
        >
          <div className="specimen-copy">
            <span className="specimen-index">PROVA {editorial.number}</span>
            <h3>{editorial.title}</h3>
            <p className="specimen-descriptor">{editorial.descriptor}</p>
            <p>{editorial.text}</p>
            <ul className="specimen-facts">{editorial.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          </div>
          <div
            className="specimen-pages"
            key={specimen}
            aria-live="polite"
            data-proof={specimenProof}
          >
            {specimenAssets.pages.map((src, index) => (
              <figure className="specimen-sheet" key={src}>
                <Image src={src} alt={index === 0 ? editorial.alt : ""} fill sizes="(max-width: 900px) 55vw, 28vw" />
              </figure>
            ))}
          </div>
        </div>
        <div className="editorial-pipeline" aria-label={t.editorial.pipelineLabel}>
          <strong>{t.editorial.pipelineLabel}</strong>
          <ol>{t.editorial.pipeline.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
        </div>
      </section>

      <FidelityEngine language={language} />

      <section className="intelligence"><div className="intelligence-inner shell"><div className="intelligence-copy"><p className="eyebrow">{t.intelligence.eyebrow}</p><h2>{t.intelligence.title}</h2><p>{t.intelligence.text}</p></div><div className="leverage-grid">{t.intelligence.leverage.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="method shell" aria-labelledby="method-title"><header className="section-heading method-heading"><p className="eyebrow">{t.method.eyebrow}</p><h2 id="method-title">{t.method.title}</h2></header><ol className="method-list">{t.method.steps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>

      <section className="engagements shell" id="work-with-me" aria-labelledby="engagements-title">
        <header className="section-heading engagements-heading"><div><p className="eyebrow">{t.engagementsHeading.eyebrow}</p><p className="engagements-kicker">{t.engagementsHeading.kicker}</p></div><h2 id="engagements-title">{t.engagementsHeading.title}</h2></header>
        <div className="engagement-list">{t.engagements.map((engagement) => <article className="engagement" key={engagement.number}><span className="engagement-number">{engagement.number}</span><div className="engagement-copy"><h3>{engagement.title}</h3><p>{engagement.text}</p><small>{engagement.meta}</small></div><a className="engagement-link" href={contactHref} target="_blank" rel="noreferrer">{t.requestScope} <span aria-hidden="true">↗</span></a></article>)}</div>
      </section>

      <section className="about shell" aria-labelledby="about-title"><figure className="portrait"><Image src="/portfolio/victor-editorial-v2.png" alt={t.alts.portrait} width={1060} height={1484} /></figure><div className="about-copy"><p className="eyebrow">{t.about.eyebrow}</p><h2 id="about-title">{t.about.title}</h2><p>{t.about.text}</p><div className="about-actions"><a className="button button-primary" href={contactHref} target="_blank" rel="noreferrer">victorherbst.com.br</a><a className="button button-quiet" href="/sobre">{language === "pt" ? "Perfil completo" : "Full profile"}</a><a className="button button-quiet" href="https://www.linkedin.com/in/victor-herbst-772362248/" target="_blank" rel="me noreferrer">LinkedIn</a></div></div></section>

      <footer className="footer shell"><p>{t.footer[0]}</p><p>{t.footer[1]}</p></footer>
    </main>
  );
}
