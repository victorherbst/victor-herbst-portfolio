import type { Lang } from "./site";
export type Category = "all" | "brand" | "web" | "product";
type Text = [string, string];
export type Project = {
  slug: string;
  composition: "editorial" | "graphic" | "workbench" | "operations" | "craft" | "commerce" | "object" | "archive";
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
    slug: "verbete", name: "VERBETE", composition: "archive", category: ["brand", "web", "product"],
    type: ["Arquivo cultural · Pesquisa · Leitura", "Cultural archive · Search · Reading"],
    headline: ["Uma imagem leva a outra.", "One image leads to another."],
    intro: ["Um acervo para pesquisar, observar e reunir referências. A interface deixa as obras em primeiro plano e mantém autoria, contexto e procedência por perto.", "An archive for searching, observing and gathering references. The interface foregrounds the works while keeping authorship, context and provenance close at hand."],
    role: ["Identidade, curadoria, arquitetura de informação, UX/UI e desenvolvimento", "Identity, curation, information architecture, UX/UI and development"],
    cover: "verbete-acervo", color: "#edf0e7", ink: "#293f32", concept: true,
    status: ["Arquivo conceitual · obras com fontes · coleções locais", "Concept archive · sourced artworks · local collections"],
    challenge: ["Uma coleção de imagens só se torna um arquivo útil quando é possível encontrar, entender e voltar ao que interessa. O projeto precisava acolher a descoberta livre e a pesquisa com intenção.", "An image collection becomes a useful archive when people can find, understand and return to what matters. The project needed to welcome both open discovery and intentional research."],
    decision: ["A busca abre a experiência. Assuntos e tipos de obra organizam o acervo; fichas preservam a procedência; percursos propõem relações visuais. Literata dá ritmo à leitura, e Atkinson Hyperlegible Next mantém os controles abertos e claros. A marca usa a linguagem de uma entrada de dicionário: verbete seguido de dois-pontos.", "Search opens the experience. Subjects and artwork types organise the archive; records preserve provenance; reading paths propose visual relationships. Literata gives reading its rhythm, while Atkinson Hyperlegible Next keeps controls open and clear. The identity follows the language of a dictionary entry: verbete followed by a colon."],
    result: ["Doze obras em domínio público, busca com filtros combináveis, grade e lista, ampliação de imagens, três percursos editoriais e coleções persistentes no navegador. As referências podem ser organizadas e exportadas em CSV, com autoria, fonte e direitos.", "Twelve public-domain works, search with combined filters, grid and list views, image enlargement, three editorial paths and persistent browser collections. References can be organised and exported as CSV, including authorship, source and rights."],
    tags: ["Identidade", "Acervo", "Arquitetura de informação", "Next.js"],
    images: [
      {src:"verbete-acervo",caption:["Um índice visual: a busca, os assuntos e as obras dividem a mesma superfície.","A visual index: search, subjects and works share the same surface."],layout:"wide"},
      {src:"verbete-pesquisa",caption:["A vista em lista aproxima título, autoria e data. Os filtros permanecem visíveis.","List view brings title, authorship and date together. Filters stay visible."],layout:"wide"},
      {src:"verbete-ficha",caption:["Cada imagem abre uma ficha com técnica, dimensões, crédito e acesso à fonte.","Each image opens a record with medium, dimensions, credit and access to its source."],layout:"wide"},
      {src:"verbete-percurso",caption:["Percursos de leitura aproximam as obras por perguntas de observação.","Reading paths bring works together through questions of observation."],layout:"wide"},
      {src:"verbete-caderno",caption:["Coleções pessoais ficam salvas no navegador. A exportação leva as referências para fora do site.","Personal collections stay in the browser. Exporting takes the references beyond the website."],layout:"wide"},
      {src:"verbete-mobile",caption:["O acervo se reorganiza para o celular, com os mesmos caminhos de pesquisa e leitura.","The archive adapts to mobile, with the same search and reading paths."],layout:"portrait"}
    ]
  },
  {
    slug: "vinco", name: "VINCO", composition: "object", category: ["brand", "web"],
    type: ["Joalheria · Identidade · E-commerce", "Jewellery · Identity · E-commerce"],
    headline: ["Uma dobra. Toda uma linguagem.", "One fold. An entire language."],
    intro: ["O desenho das joias, a identidade e a loja partem do mesmo gesto. A peça ocupa a tela; a campanha mostra como ela encontra o corpo.", "Jewellery, identity and store grow from the same gesture. The piece fills the screen; the campaign shows how it meets the body."],
    role: ["Conceito, desenho de coleção, identidade, campanha e desenvolvimento", "Concept, collection design, identity, campaign and development"],
    cover: "vinco-object", color: "#dae5de", ink: "#103e43", concept: true,
    status: ["Loja conceitual · exploração de produto · checkout simulado", "Concept store · product exploration · simulated checkout"],
    challenge: ["Apresentar uma joia exige explicar forma, acabamento e proporção. A campanha também precisava manter Maia Ventura reconhecível em uma marca diferente do seu projeto original.", "Presenting jewellery requires communicating form, finish and proportion. The campaign also needed to keep Maia Ventura recognisable in a brand distinct from her original project."],
    decision: ["Uma abertura de catálogo de objetos permite alternar peça, detalhe e corpo. Letras geométricas e legendas contidas deixam a matéria conduzir. Retrato original e campanha ficam lado a lado para tornar a continuidade de Maia visível.", "An object-catalogue opening alternates piece, detail and body. Geometric type and restrained captions let the material lead. Original portrait and campaign sit side by side to make Maia’s continuity visible."],
    result: ["Oito joias, variações de acabamento, guia de medidas, filtros, estados de indisponibilidade, sacola persistente e compra demonstrativa. Maia Ventura e Nara Azevedo compõem a campanha com peças coerentes entre os enquadramentos.", "Eight pieces, finish variants, a sizing guide, filters, unavailable states, a persistent bag and demonstration purchase. Maia Ventura and Nara Azevedo feature in a campaign with consistent jewellery across views."],
    tags: ["Identidade", "Joalheria", "Campanha", "E-commerce"],
    images: [
      {src:"vinco-object",caption:["A joia abre a experiência. Três vistas aproximam forma, detalhe e corpo.","The jewellery opens the experience. Three views bring together form, detail and body."],layout:"wide"},
      {src:"vinco-detail",caption:["Medida, acabamento e disponibilidade acompanham a escolha.","Size, finish and availability accompany the choice."],layout:"wide"},
      {src:"vinco-continuity",caption:["Maia Ventura: retrato original e nova campanha. O mesmo rosto em universos diferentes.","Maia Ventura: original portrait and new campaign. The same face across different worlds."],layout:"wide"},
      {src:"vinco-mobile",caption:["A exploração da joia continua por toque, com acesso direto à compra.","Jewellery exploration continues by touch, with direct access to purchase."],layout:"portrait"},
      {src:"vinco-cart",caption:["Uma revisão de compra legível, com valores e condições demonstrativos.","A readable purchase review, with demonstration prices and conditions."],layout:"wide"}
    ]
  },
  {
    slug: "rasante", name: "RASANTE", composition: "graphic", category: ["brand", "web"],
    type: ["Identidade cultural · Programação", "Cultural identity · Programme"],
    headline: ["Um cartaz que vira encontro.", "A poster becomes a meeting place."],
    intro: ["Cinema e artes visuais ganham uma identidade de rua. A programação deixa a pessoa montar o próprio festival, com escolhas que continuam salvas depois da visita.", "Cinema and visual arts find a street-level identity. The programme lets visitors assemble their own festival, keeping their choices after the visit."],
    role: ["Conceito, identidade, tipografia, direção de arte e desenvolvimento", "Concept, identity, typography, art direction and development"],
    cover: "rasante-home", color: "#b80030", ink: "#e6e2eb", concept: true,
    status: ["Festival fictício · roteiro persistente · reserva simulada", "Fictional festival · persistent itinerary · simulated booking"],
    challenge: ["A energia de um cartaz precisa continuar na tela sem atrapalhar quem procura um filme, um horário ou um espaço.", "The energy of a poster needs to carry onto the screen without getting in the way of finding a film, a time or a venue."],
    decision: ["Letras recortadas, uma serifada de leitura e mudanças de escala criam duas vozes. A programação usa uma linha por atividade; o roteiro identifica sobreposições antes da reserva demonstrativa.", "Cut stencil letters, a reading serif and shifts in scale create two voices. The programme uses one row per activity; the itinerary identifies overlaps before a demonstration booking."],
    result: ["Doze atividades em três dias, filtros por espaço e formato, páginas de atividade, roteiro salvo no navegador e resolução de conflitos. Identidade vetorial, cartazes, sinalização e ingresso ilustrativo completam o sistema.", "Twelve activities over three days, venue and format filters, activity pages, a browser-saved itinerary and conflict resolution. Vector identity, posters, signage and an illustrative ticket complete the system."],
    tags: ["Identidade", "Tipografia", "Programação", "UX/UI"],
    images: [
      {src:"rasante-home",caption:["Uma abertura de cartaz: a tipografia desenha a composição.","A poster opening: typography draws the composition."],layout:"wide"},
      {src:"rasante-program",caption:["A programação transforma expressão em escolhas legíveis.","The programme turns expression into readable choices."],layout:"wide"},
      {src:"rasante-detail",caption:["Cada história tem contexto, horário e um próximo passo.","Every story has context, a time and a next step."],layout:"wide"},
      {src:"rasante-mobile",caption:["A agenda se reorganiza para leitura e toque no celular.","The programme adapts to reading and touch on mobile."],layout:"portrait"},
      {src:"rasante-route",caption:["Escolhas persistentes e uma reserva explicitamente demonstrativa.","Persistent choices and an explicitly simulated booking."],layout:"wide"}
    ]
  },

  {
    slug: "maia-ventura",
    composition: "editorial",
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
    composition: "workbench",
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
    composition: "operations",
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
    cover: "oficio-operation-new",
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
        src: "oficio-operation-new",
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
        src: "oficio-client-new",
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
    composition: "workbench",
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
    cover: "cadencia-study-new",
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
        src: "cadencia-study-new",
        caption: [
          "A partitura ocupa a entrada. Andamento, trecho e escuta permanecem juntos.",
          "The score leads the entry. Tempo, loop and listening remain together.",
        ],
        layout: "wide",
      },
      {
        src: "cadencia-teacher-new",
        caption: [
          "A professora escuta, marca o instante e publica o próximo passo no mesmo contexto.",
          "The teacher listens, marks a moment and publishes the next step in context.",
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
    composition: "craft",
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
    composition: "commerce",
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
    cover: "avesso-catalog-new",
    color: "#dce8ed",
    ink: "#30111b",
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
      "Tipografia de traços pesados abre a campanha. O catálogo deixa preços e tamanhos próximos das peças; a escolha de tamanho segue para a página de produto e permanece no endereço. Campanha e produto mantêm os mesmos desenhos.",
      "Heavy display lettering opens the campaign. The catalogue keeps prices and sizes close to garments; size choices carry into product pages and remain in the URL. Campaign and product views keep the same designs.",
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
        src: "avesso-catalog-new",
        caption: [
          "Vitrine editorial e navegação por produto.",
          "An editorial storefront with product-led navigation.",
        ],
        layout: "wide",
      },
      {
        src: "avesso-product-new",
        caption: [
          "Imagem, detalhes e escolha de tamanho no mesmo fluxo.",
          "Image, details and size selection in the same flow.",
        ],
        layout: "wide",
      },
      {src:"avesso-mobile-new",caption:["Um catálogo que continua legível no celular, com tamanhos junto às peças.","A catalogue that stays readable on mobile, with sizes beside each garment."],layout:"portrait"},
      {src:"avesso-checkout-new",caption:["Resumo, frete e total explícitos antes da conclusão demonstrativa.","Summary, shipping and total are explicit before the demonstration confirmation."],layout:"wide"},
    ],
  },
  {
    slug: "nitida",
    composition: "editorial",
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
