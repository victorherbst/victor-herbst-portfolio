import type { Lang } from "./site";
export type Category = "all" | "brand" | "web" | "product";
type Text = [string, string];
export type Project = {
  slug: string;
  name: string;
  category: Category[];
  type: Text;
  headline: Text;
  intro: Text;
  role: Text;
  cover: string;
  color: string;
  ink: string;
  concept: boolean;
  status: Text;
  challenge: Text;
  decision: Text;
  result: Text;
  tags: string[];
  images: { src: string; caption: Text; layout?: "wide" | "portrait" }[];
  link?: string;
  download?: string;
  demo?: "shop" | "quote" | "music";
};
export const text = (copy: Text, lang: Lang) => copy[lang === "pt" ? 0 : 1];
export const projects: Project[] = [
  {
    slug: "maia-ventura",
    name: "MAIA VENTURA",
    category: ["brand", "web"],
    type: [
      "Identidade · Editorial · E-commerce",
      "Identity · Editorial · E-commerce",
    ],
    headline: [
      "Uma pessoa. Um universo inteiro.",
      "One person. An entire world.",
    ],
    intro: [
      "Viagem, comida e moda conectadas por uma identidade pessoal. Da primeira fotografia ao último passo da compra, cada detalhe fala a mesma língua.",
      "Travel, food and fashion connected through a personal identity. From the first photograph to the last step of a purchase, every detail speaks the same language.",
    ],
    role: [
      "Conceito, identidade, direção de arte, conteúdo e desenvolvimento",
      "Concept, identity, art direction, content and development",
    ],
    cover: "maia-portrait",
    color: "#f3dae2",
    ink: "#173b29",
    concept: true,
    status: [
      "Conceito funcional · checkout simulado",
      "Functional concept · simulated checkout",
    ],
    challenge: [
      "Uma criadora de conteúdo, três destinos e uma marca de roupas poderiam virar três sites desconectados. O desafio era dar unidade ao conjunto sem apagar o ritmo de cada experiência.",
      "A creator, three destinations and a clothing label could easily become three disconnected websites. The challenge was to unite them while keeping a distinct rhythm for each experience.",
    ],
    decision: [
      "A assinatura tipográfica conduz a navegação; rosa, verde e lima atravessam o editorial e a loja. A mesma persona e as mesmas peças aparecem nas campanhas e nas páginas de produto. A fotografia dá espaço às histórias.",
      "A typographic signature leads the navigation; pink, green and lime carry through the editorial and store. The same persona and garments appear in campaigns and product pages. Photography leaves room for storytelling.",
    ],
    result: [
      "Diários completos, histórias gastronômicas, seis peças, filtros, seleção de tamanhos, sacola persistente e media kit em PDF. A compra é uma demonstração explícita, sem cobrança.",
      "Complete travel journals, food stories, six garments, filters, size selection, a persistent bag and a PDF media kit. Shopping is an explicit demonstration with no charge.",
    ],
    tags: ["Next.js", "Direção de arte", "E-commerce", "PT-BR"],
    demo: "shop",
    download: "/downloads/maia-media-kit.pdf",
    images: [
      {
        src: "maia-home",
        caption: [
          "A assinatura abre o site; a fotografia apresenta a pessoa.",
          "The signature opens the site; the portrait introduces the person.",
        ],
        layout: "wide",
      },
      {
        src: "maia-kyoto",
        caption: [
          "Quioto. Um diário com tempo para observar.",
          "Kyoto. A journal with time to observe.",
        ],
      },
      {
        src: "maia-food",
        caption: [
          "Comida como parte da viagem e da memória.",
          "Food as part of travel and memory.",
        ],
      },
      {
        src: "maia-shop",
        caption: [
          "MAIA STUDIO. A mesma identidade, uma outra intenção de navegação.",
          "MAIA STUDIO. The same identity, a different browsing intention.",
        ],
        layout: "wide",
      },
    ],
  },
  {
    slug: "ceu-canto",
    name: "Céu Canto",
    category: ["product", "web"],
    type: ["Produto autoral · Educação", "Independent product · Education"],
    headline: [
      "Aprender tem que fazer sentido.",
      "Learning should make sense.",
    ],
    intro: [
      "Um produto de aprendizagem de inglês que conecta prática, leitura e revisão. Minha experiência em sala de aula virou decisões de interface e engenharia.",
      "An English learning product connecting practice, reading and review. My teaching experience became interface and engineering decisions.",
    ],
    role: [
      "Concepção de produto, pedagogia, UX e desenvolvimento",
      "Product conception, pedagogy, UX and development",
    ],
    cover: "ceu-home",
    color: "#d9e3d7",
    ink: "#253e2a",
    concept: false,
    status: [
      "Produto autoral no ar · revisão apresentada em protótipo",
      "Live independent product · review shown as a prototype",
    ],
    challenge: [
      "Acertar uma alternativa não significa entender uma frase. Como transformar o erro em informação útil, sem interromper o ritmo do estudo?",
      "Choosing the correct answer does not necessarily mean understanding a sentence. How can a mistake become useful information without interrupting the learning rhythm?",
    ],
    decision: [
      "O contexto permanece visível quando o feedback aparece. Curso, leitura e revisão compartilham uma organização de conteúdo; ferramentas docentes completam a experiência do aluno.",
      "Context remains visible when feedback appears. Courses, reading and review share a content structure; teaching tools complete the learner experience.",
    ],
    result: [
      "Uma plataforma pública com autenticação, conteúdo e progressão. As telas de revisão neste case mostram um protótipo validado localmente, separado do produto público.",
      "A public platform with authentication, content and progression. The review screens in this case show a locally validated prototype, separate from the public product.",
    ],
    tags: ["Next.js", "Supabase", "UX", "Aprendizagem"],
    link: "https://www.ceucanto.com/",
    images: [
      {
        src: "ceu-home",
        caption: [
          "Uma plataforma que nasce de uma prática real de ensino.",
          "A platform rooted in real teaching practice.",
        ],
        layout: "wide",
      },
      {
        src: "ceu-practice",
        caption: [
          "Protótipo de revisão: a escolha acontece dentro da frase.",
          "Review prototype: choices happen inside the sentence.",
        ],
        layout: "wide",
      },
      {
        src: "ceu-feedback",
        caption: [
          "O feedback explica o uso, mantendo o contexto.",
          "Feedback explains usage while keeping the context.",
        ],
        layout: "wide",
      },
    ],
  },
  {
    slug: "oficio",
    name: "OFÍCIO",
    category: ["product"],
    type: [
      "Plataforma · Gestão & atendimento",
      "Platform · Operations & client experience",
    ],
    headline: [
      "Da oficina para a casa. Sem perder o fio.",
      "From workshop to home. Nothing lost along the way.",
    ],
    intro: [
      "Um espaço de trabalho para quem faz sob medida e um portal claro para quem encomenda. Dois pontos de vista, uma única história do pedido.",
      "A workspace for custom makers and a clear portal for their clients. Two perspectives, one continuous order history.",
    ],
    role: [
      "Marca, arquitetura de produto, UX/UI e aplicação full-stack",
      "Brand, product architecture, UX/UI and full-stack application",
    ],
    cover: "oficio-home",
    color: "#e5e8dc",
    ink: "#463b2d",
    concept: true,
    status: [
      "Aplicação full-stack · backend mantido em ambiente local",
      "Full-stack application · backend kept in a local environment",
    ],
    challenge: [
      "Fotos, revisões de preço e aprovações se perdem em conversas. A oficina precisa saber o que executar; o cliente precisa entender o que está aprovando.",
      "Photos, price revisions and approvals get lost in conversations. The workshop needs to know what to build; the client needs to understand what they are approving.",
    ],
    decision: [
      "O orçamento tem versão, o pedido tem etapas e as permissões acompanham cada papel. A informação operacional muda de forma ao chegar ao cliente, sem mudar de significado.",
      "Quotes have versions, orders have stages and permissions follow each role. Operational information changes presentation when it reaches the client, without changing its meaning.",
    ],
    result: [
      "Fluxos de solicitação, orçamento, aprovação, produção, entrega e histórico. O projeto completo usa autenticação, banco e arquivos privados em ambiente local. Aqui, um recorte simula a aprovação sem acessar esses dados.",
      "Request, quote, approval, production, delivery and history flows. The complete project uses authentication, a database and private files locally. Here, a self-contained excerpt simulates approval without accessing that data.",
    ],
    tags: ["Next.js", "PostgreSQL", "Permissões", "Produto"],
    demo: "quote",
    images: [
      {
        src: "oficio-home",
        caption: [
          "A oficina: prioridades, próximos passos e entregas.",
          "The workshop: priorities, next actions and deliveries.",
        ],
        layout: "wide",
      },
      {
        src: "oficio-quote",
        caption: [
          "Cada versão do orçamento tem um contexto.",
          "Every quote version has context.",
        ],
        layout: "wide",
      },
      {
        src: "oficio-client",
        caption: [
          "O cliente: uma proposta legível, com escopo e aprovação.",
          "The client: a readable proposal with scope and approval.",
        ],
        layout: "wide",
      },
    ],
  },
  {
    slug: "cadencia",
    name: "CADÊNCIA",
    category: ["product", "web"],
    type: ["Plataforma · Educação musical", "Platform · Music education"],
    headline: [
      "O estudo continua depois da aula.",
      "Learning continues after the lesson.",
    ],
    intro: [
      "Uma escola de música por inteiro: descoberta, rotina de estudo, acompanhamento docente e gestão. A partitura participa da interface.",
      "A complete music school: discovery, practice routines, teacher feedback and management. The score is part of the interface.",
    ],
    role: [
      "Identidade, produto, notação musical e desenvolvimento full-stack",
      "Identity, product, musical notation and full-stack development",
    ],
    cover: "cadencia-student",
    color: "#c3e6f4",
    ink: "#153ba0",
    concept: true,
    status: [
      "Aplicação full-stack · backend mantido em ambiente local",
      "Full-stack application · backend kept in a local environment",
    ],
    challenge: [
      "Uma escola precisa atender pessoas com necessidades diferentes: quem está conhecendo o curso, quem pratica, quem ensina e quem organiza a operação.",
      "A school serves people with different needs: prospective students, practising musicians, teachers and the people running operations.",
    ],
    decision: [
      "Separei a descoberta pública dos ambientes de aluno, professora e administração. No estudo, notas, áudio e andamento partem da mesma estrutura musical para manter leitura e escuta coerentes.",
      "I separated public discovery from student, teacher and administration spaces. During practice, notes, audio and tempo come from the same musical structure so reading and listening stay consistent.",
    ],
    result: [
      "Site, partitura interativa, caderno de estudo, devolutivas, agenda e financeiro demonstrativo. O backend completo permanece local; o trecho musical abaixo funciona de forma independente no navegador.",
      "A website, interactive score, study notebook, feedback, schedule and demonstration finances. The complete backend stays local; the musical excerpt below runs independently in the browser.",
    ],
    tags: ["Next.js", "VexFlow", "Web Audio", "PostgreSQL"],
    demo: "music",
    images: [
      {
        src: "cadencia-home",
        caption: [
          "O primeiro encontro com a escola.",
          "The first encounter with the school.",
        ],
        layout: "wide",
      },
      {
        src: "cadencia-student",
        caption: [
          "O ambiente da aluna organiza a prática da semana.",
          "The student space organises the week’s practice.",
        ],
        layout: "wide",
      },
      {
        src: "cadencia-admin",
        caption: [
          "A gestão tem linguagem própria, sem perder a identidade.",
          "Management has its own language without losing the identity.",
        ],
        layout: "wide",
      },
    ],
  },
  {
    slug: "forno-da-lia",
    name: "Forno da Lia",
    category: ["brand"],
    type: ["Identidade · Embalagem", "Identity · Packaging"],
    headline: [
      "Feito em casa. Com nome, afeto e presença.",
      "Homemade. With a name, warmth and presence.",
    ],
    intro: [
      "Uma confeitaria de uma pessoa só. Uma identidade que cabe na rotina e no orçamento de quem coloca a mão na massa.",
      "A one-person home bakery. An identity that fits the routine and budget of the person doing the baking.",
    ],
    role: [
      "Conceito, lettering, identidade, fotografia e materiais impressos",
      "Concept, lettering, identity, photography and print materials",
    ],
    cover: "lia-box",
    color: "#ffdc70",
    ink: "#8b2447",
    concept: true,
    status: [
      "Conceito de identidade · aplicações e arquivos vetoriais",
      "Identity concept · applications and vector artwork",
    ],
    challenge: [
      "A marca precisa ser reconhecível sem depender de caixas caras ou processos difíceis de reproduzir em pequena escala.",
      "The brand needs to be recognisable without expensive boxes or processes that are difficult to reproduce at a small scale.",
    ],
    decision: [
      "Lettering expressivo, um motivo desenhado à mão e cores diretas. O mesmo logo vetorial aparece na etiqueta adesiva, no cartão e nas peças digitais. A embalagem parte de uma caixa branca comum.",
      "Expressive lettering, a hand-drawn motif and direct colours. The same vector logo appears on labels, cards and digital materials. Packaging starts with a standard white box.",
    ],
    result: [
      "Sistema de marca, variações de logo, etiquetas, cartão, cardápio de encomendas e presença digital. Uma marca pensada para ser usada todos os dias.",
      "A brand system, logo variants, labels, cards, an order menu and a digital presence. An identity designed for everyday use.",
    ],
    tags: ["Branding", "Lettering", "Embalagem", "SVG"],
    images: [
      {
        src: "lia-box",
        caption: [
          "Uma caixa simples. Uma presença que fica.",
          "A simple box. A lasting impression.",
        ],
        layout: "wide",
      },
      {
        src: "lia-brand",
        caption: [
          "A marca e suas variações, sempre com o mesmo desenho.",
          "The brand and its variants, always using the same artwork.",
        ],
        layout: "wide",
      },
      {
        src: "lia-packaging",
        caption: [
          "Materiais possíveis para uma produção pequena.",
          "Practical materials for a small operation.",
        ],
        layout: "wide",
      },
      {
        src: "lia-social",
        caption: [
          "Da etiqueta ao pedido no celular.",
          "From a label to a mobile order.",
        ],
        layout: "wide",
      },
    ],
  },
  {
    slug: "avesso",
    name: "AVESSO",
    category: ["brand", "web"],
    type: ["Direção de arte · E-commerce", "Art direction · E-commerce"],
    headline: ["Uma coleção. Muitos ângulos.", "One collection. Many angles."],
    intro: [
      "Moda contemporânea com uma vitrine editorial e uma compra direta. A roupa permanece protagonista em cada enquadramento.",
      "Contemporary fashion with an editorial storefront and straightforward shopping. The garments stay in focus in every frame.",
    ],
    role: [
      "Marca, campanha, direção de arte e desenvolvimento",
      "Brand, campaign, art direction and development",
    ],
    cover: "avesso-campaign",
    color: "#d9b9a5",
    ink: "#443022",
    concept: true,
    status: [
      "E-commerce conceitual · checkout simulado",
      "Concept e-commerce · simulated checkout",
    ],
    challenge: [
      "Equilibrar uma campanha expressiva com a clareza que uma pessoa precisa para escolher tamanho, comparar peças e comprar.",
      "Balance an expressive campaign with the clarity people need to choose a size, compare garments and shop.",
    ],
    decision: [
      "Composições assimétricas abrem a coleção; controles de categoria, tamanho e ordenação tornam a exploração objetiva. Campanha e produto mantêm as mesmas peças.",
      "Asymmetric compositions introduce the collection; category, size and sorting controls make browsing useful. Campaign and product views keep the same garments.",
    ],
    result: [
      "Quatro peças, páginas de produto, guia de tamanhos, estados de indisponibilidade, sacola persistente e finalização simulada.",
      "Four garments, product pages, a size guide, unavailable states, a persistent bag and simulated checkout.",
    ],
    tags: ["Next.js", "E-commerce", "Direção de arte"],
    images: [
      {
        src: "avesso-campaign",
        caption: ["Campanha da coleção.", "Collection campaign."],
        layout: "wide",
      },
      {
        src: "avesso-home",
        caption: [
          "Vitrine editorial e navegação por produto.",
          "An editorial storefront with product-led navigation.",
        ],
        layout: "wide",
      },
      {
        src: "avesso-product",
        caption: [
          "Imagem, detalhes e escolha de tamanho no mesmo fluxo.",
          "Image, details and size selection in the same flow.",
        ],
        layout: "wide",
      },
    ],
  },
  {
    slug: "nitida",
    name: "NÍTIDA",
    category: ["brand", "web"],
    type: ["Identidade · Site de serviços", "Identity · Service website"],
    headline: [
      "Clareza desde o primeiro contato.",
      "Clarity from the first contact.",
    ],
    intro: [
      "Uma clínica fictícia de oftalmologia com uma jornada acolhedora e objetiva. O cuidado começa pela forma de explicar.",
      "A fictional ophthalmology clinic with an approachable, clear journey. Care starts with the way things are explained.",
    ],
    role: [
      "Identidade, conteúdo, direção de arte e desenvolvimento",
      "Identity, content, art direction and development",
    ],
    cover: "nitida-eye",
    color: "#e8e4f5",
    ink: "#433b69",
    concept: true,
    status: [
      "Site conceitual · solicitação de consulta demonstrativa",
      "Concept website · demonstration appointment request",
    ],
    challenge: [
      "Organizar especialidades e tratamentos sem criar um catálogo frio ou promessas médicas exageradas.",
      "Organise specialties and treatments without a cold catalogue or exaggerated medical claims.",
    ],
    decision: [
      "Fotografia próxima, tipografia editorial e explicações acessíveis. Filtros ajudam a encontrar uma especialidade; um processo em etapas explica a consulta e conduz à solicitação.",
      "Close photography, editorial typography and approachable explanations. Filters help visitors find a specialty; a step-by-step process explains the consultation and leads to a request.",
    ],
    result: [
      "Seis especialidades, exploração de tratamentos e pedido demonstrativo de consulta. Sem credenciais, profissionais ou depoimentos inventados.",
      "Six specialties, treatment exploration and a demonstration appointment request. No invented credentials, professionals or testimonials.",
    ],
    tags: ["Next.js", "UX", "Branding"],
    images: [
      {
        src: "nitida-home",
        caption: [
          "O olhar orienta a identidade e a composição.",
          "The eye guides the identity and composition.",
        ],
        layout: "wide",
      },
      {
        src: "nitida-flow",
        caption: [
          "Um próximo passo compreensível.",
          "An understandable next step.",
        ],
        layout: "wide",
      },
    ],
  },
];
export const findProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
