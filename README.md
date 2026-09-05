# Victor Herbst — portfólio

Portfólio bilíngue em Next.js: identidade, direção de arte, websites e produtos digitais.

Produção: https://victorherbst.com.br

## Desenvolvimento

```sh
pnpm install --frozen-lockfile
pnpm dev --port 3008
```

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm exec playwright test
pnpm build
```

Os testes usam Google Chrome headless. `PORTFOLIO_URL` permite testar outra URL. A aplicação não precisa de banco, credenciais ou variáveis de ambiente para executar.

## Conteúdo

- `lib/projects.ts`: os sete cases, textos PT/EN, imagens e estados reais de cada projeto.
- `lib/site.ts`: contato, rotas e metadados.
- `components/Home.tsx`: curadoria da página inicial.
- `components/demos/`: loja, orçamento e trecho musical independentes.
- `components/Lab.tsx`: visita pedagógica, Myriad e publicações PDF.
- `public/work/`: imagens selecionadas e otimizadas dos projetos.
- `public/brand/`: marcas originais usadas nas composições.
- `public/fonts/`: fontes locais e licenças.
- `public/editorial/`, `public/downloads/`: PDFs públicos revisados.

PT e EN têm URLs, atributos de idioma, metadados e alternates próprios. Trocar o idioma preserva o case em navegação. Os cases são gerados estaticamente.

## Limites das demonstrações

A loja salva apenas tamanhos e quantidades na chave local `vh:maia-bag:v1`. A finalização não cobra, não solicita dados pessoais e não envia pedidos. Os preços e estoques são fictícios.

O orçamento mantém seu estado na sessão da interface. A aprovação não envia mensagens nem toca no projeto OFÍCIO original.

A partitura e o som sintetizado usam quatro compassos do estudo original **Primeiro respiro**, do projeto CADÊNCIA, CC BY 4.0. VexFlow e fontes musicais só são usados ao abrir o trecho. Áudio depende de ação explícita e para quando a página fica oculta ou o componente é desmontado. Os backends completos de CADÊNCIA e OFÍCIO permanecem em ambiente local.

O formulário de contato prepara uma mensagem e oferece um link para o WhatsApp. O visitante revisa e confirma o envio no próprio WhatsApp; o formulário não transmite nem armazena os campos.

## Publicação

Projeto Vercel existente: `vashe/victor-herbst-portfolio`.

```sh
vercel link --project victor-herbst-portfolio --scope vashe
vercel deploy
# Depois de validar a implantação:
vercel deploy --prod
```

A pasta `.vercel`, arquivos de ambiente e resultados de teste não são versionados. Não adicionar credenciais, dados de contas, arquivos privados das outras aplicações ou conteúdo de clientes.

Os conceitos de portfólio são identificados no site. Céu Canto é produto autoral; suas imagens distinguem o produto público dos protótipos locais. A participação em pesquisa é descrita separadamente, na página sobre.
