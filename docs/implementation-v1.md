# Implementação Smart Local V1

Data: 22/10/2026. Branch: `feat/smartlocal-rebranding`. Base: `origin/main` em `3aa0d61`, após `git fetch origin main`; main local e remota estavam iguais. Não foram feitos commit, push, merge, alteração de DNS ou publicação.

## Análise do site anterior

Reaproveitados React 18, TypeScript, Vite 7, Tailwind 3, React Router, ESLint, Vitest, alias `@`, PostCSS e o gerenciador npm com `package-lock.json`. A versão anterior permanece no histórico Git e na main.

Removidos os componentes, hooks, imagens, vídeos, logos, comparativos, depoimentos, FAQ, catálogo e conteúdo específicos de SEO local/tour 360°. Removidos o conjunto shadcn/Radix sem uso, React Query, formulários e gráficos do boilerplate, Framer Motion, widgets externos, speed insights e lovable-tagger. Os chunks manuais do boilerplate foram substituídos por divisão de rotas e carregamento separado de GSAP. Lockfiles Bun/pnpm conflitantes e configuração pnpm sem uso foram removidos. Os SVGs originais e todos os arquivos fornecidos de portfólio foram preservados.

## Estrutura entregue

- Home: hero fluido interativo, saída tipográfica por scroll com pin apenas no desktop, seleção dos oito projetos, manifesto, quatro serviços, benefícios qualitativos e contato.
- `/projetos`: filtros por categoria dos dados, contagem anunciada e grid com composição 3D por scroll.
- `/projetos/:slug`: oito cases, capturas desktop/mobile, molduras ilustrativas, reprodução sob demanda, ficha e CTA contextual, próximo projeto.
- 404 visual, navegação e WhatsApp em todas as rotas.
- Header sticky, menu de três pontos, dialog lateral com bloqueio do fundo, Escape, confinamento e retorno de foco, progresso de scroll, footer com crédito obrigatório.
- Cada seção/efeito é um TSX próprio. Páginas compõem os componentes; dados e mensagens não ficam embutidos no layout geral.

## Mídia e fatos

Apesar do estado pendente nos documentos originais, o checkout recebido continha 16 WebPs e 16 MP4s nos oito diretórios. As oito capturas desktop foram inspecionadas; correspondem aos nomes dos projetos. Foram ativados caminhos explícitos em `src/data/projects.ts`. Não foram fabricadas mídias. Os vídeos ficam ausentes do DOM até solicitação de reprodução; somente o formato ativo pode carregar. O vídeo pausa fora da área visível ou quando a aba fica oculta, e é desmontado ao trocar formato/rota. Há tratamento de falha e fallback editorial para poster ausente ou inválido.

`src/data/projects.seed.json` é a fonte editorial única, tipada pelo adaptador `.seed.ts`. Oito destaques, ordem e categorias fornecidas foram mantidos. Segmentos descrevem apenas o conteúdo visível nas capturas. Não há métricas, depoimentos, promessas de entrega, alegações de resultados ou escopos não comprovados. Os botões de site ao vivo permanecem ocultos: `websiteVerified=false` não foi alterado por inferência.

Para trocar mídia, substitua os arquivos nos mesmos caminhos. Para remover/ativar outro arquivo, ajuste os campos de `media` no manifesto tipado; não é necessária mudança no modelo ou nos componentes. Os READMEs das pastas continuam preservados e nunca são importados como mídia.

## Motion e performance

GSAP/ScrollTrigger carregado separadamente, sem scroll-jacking. Pin somente no hero desktop com pointer fino. Espiral de entrada por posição, rotação e perspectiva; nenhuma deformação dos pixels das capturas. Manifesto lateral, benefícios com deslocamento e vidro com tilt, morph tipográfico no contato. Hero e cursor usam composição CSS em vez de WebGL: efeito óptico sem custo contínuo de contexto GPU/canvas. Hero pausa fora da tela e em aba oculta; cursor desativado para touch, reduced motion e hardware com até quatro núcleos. Media queries removem coreografias no mobile e com reduced motion. O conteúdo é visível sem inicialização de animação.

Manrope/Inter são servidas localmente por Fontsource, com fallback do sistema e suas licenças OFL nos pacotes. O logo usa o SVG original inline, para seu texto herdar Manrope; os arquivos em `public/brand` permanecem inalterados.

## SEO e hospedagem

Build gera sitemap com 10 rotas, robots, OG PNG da marca e 11 HTMLs completos: home, catálogo, oito cases e 404. Pré-render com React no build, sem servidor de aplicação em produção. Cada rota tem H1, title, descrição, canonical, OG e Twitter; cases usam suas capturas reais. JSON-LD é apenas Organization, sem endereço ou métricas inventados. Hidratação verifica a rota de origem do HTML para não tentar hidratar a Home em um endereço inválido recebido pelo fallback SPA.

`vercel.json`: build npm, diretório `dist`, rewrite SPA excluindo diretórios de assets, headers básicos. Arquivos físicos têm precedência, conforme a [documentação de configuração Vercel](https://vercel.com/docs/project-configuration/vercel-json). O deploy remoto e o preview Vercel ainda precisam de execução autorizada e validação na plataforma. Nenhuma publicação foi realizada.

## Pendências editoriais e operacionais

- Verificação das URLs ao vivo e da associação exata ao projeto antes de ativar cada botão externo.
- Confirmação das condições comerciais para anunciar R$297, hospedagem e 72h; confirmação da contagem para qualquer métrica.
- Redes sociais e revisão final pelo proprietário.
- Preview Vercel e validação de rewrites/headers na plataforma antes de substituir produção.
- Alertas npm restantes e limites de validação documentados em `validation-v1.md`.
