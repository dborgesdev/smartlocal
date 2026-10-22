# Smart Local — Especificação de implementação V1

**Data:** 22/10/2026  
**Estado:** Identidade visual e seleção de oito destaques aprovadas; logo SVG inicial pronto para integração; imagens/gravações reais pendentes de adição pelo proprietário.  
**Repositório:** https://github.com/dborgesdev/smartlocal  
**Domínio:** https://smartlocal.com.br/

## 1. Verdade e escopo

### Confirmado pelo proprietário
- Nome público: **Smart Local**. Rebranding integral: preservar apenas o nome, não a identidade anterior.
- Foco comercial: criação de sites institucionais, landing pages, e-commerce e projetos web personalizados.
- Objetivo: portfólio demonstrativo de trabalhos entregues, qualidade técnica percebida, geração de pedidos via WhatsApp.
- WhatsApp comercial: **+55 43 99136-4545**, API wa.me com número `5543991364545`.
- Ofertas citadas pelo proprietário: **sites a partir de R$ 297**, hospedagem inclusa no primeiro ano e prazo de até 72 horas. **Não aplicar indiscriminadamente a todos os produtos**; condições e elegibilidade precisam de validação antes de anúncio amplo.
- Métrica '50+ projetos entregues' citada pelo proprietário: verificar a contagem de entregas, não inferir que repositórios = projetos entregues.
- Visuais, referências e coreografias descritas pelo proprietário nesta conversa definem a experiência da V1.
- A direção conceitual do branding apresentada em 22/10/2026 foi aprovada, inclusive wordmark minúsculo, símbolo S fluido, grafite, branco gelo, coral e cobalto.

### Recomendações técnicas / não confirmadas como fatos comerciais
- Posicionamento: estúdio de desenvolvimento web e experiências digitais, com alta execução visual.
- Identidade aprovada é **conceito ilustrado**, não logotipo vetorial final. A arte gerada contém aplicações demonstrativas, não deve ser usada como único asset final ou representar sites reais.
- Copy proposta abaixo é editorial nova para a V1, não substitui textos anteriormente aprovados (não há texto final da nova página aprovado separadamente).

### Pendente para publicação
- Confirmação das condições exatas da oferta R$297, 'até 72h' e hospedagem inclusa: tipos de projeto, prazo a contar de quê e exclusões.
- Confirmação de '50+ projetos entregues', caso exibida.
- Links de redes sociais, se existentes.
- Seleção/autorizações e vídeos desktop/mobile de cases publicados. Não gerar gravações falsas de websites operando.

## 2. Estratégia e público

Empresas e profissionais que precisam de um site comercial eficaz, com apresentação superior ao padrão do mercado e possibilidade de contratar projetos mais completos. Jornada: impacto visual → prova de competência → oferta compreensível → redução de objeções → WhatsApp.

A experiência premium não deve esconder preços de entrada e os tipos de serviço. Design ambicioso sem sacrificar clareza, legibilidade, velocidade, teclado ou dispositivos móveis.

## 3. Identidade — direção aprovada

Conceito: **Creative Web Development — Beyond the ordinary**. Ordem emocional: sofisticação → surpresa → clareza → confiança.

### Paleta de trabalho
- Obsidian `#14161B`: superfícies escuras, títulos em seção clara
- Porcelain `#F2F0EB`: fundo claro quente com textura grain sutil
- Signal `#FF6046`: coral, energia e foco
- Electric `#465BEE`: cobalto, profundidade e contraste
- Titanium `#929BAA`: elementos neutros
- Warm grey `#D8CFC7`: superfícies secundárias

Usar coral/cobalto para iluminação e acentos; evitar degradê permanente em todos os componentes. Contrastes WCAG para texto devem ser validados individualmente.

### Logo
Wordmark personalizado `smartlocal` em minúsculas, tipografia geométrica ajustada e símbolo abstrato derivado da continuidade da letra S (eventualmente integrando S/L). Favicon legível a 16-32 px e variáveis mono-claro/mono-escuro e colorida. **Fornecido:** arquivos SVG vetoriais originais em `public/brand/` (símbolo cromático e monocromático, lockups escuro/claro, favicon). São uma reconstrução vetorial inicial da direção aprovada e não uma vetorização literal do moodboard. Conferir visualmente na V1; não redesenhar a marca sem feedback.

Tipografia proposta: Manrope para display, Inter para interface (verificar licenças/fontes e pesos; fallback sistema). Motion é parte da identidade: deformação, atração e reorganização fluidas, sem sobrecarregar.

## 4. Sitemap e roteamento

- `/` — Home cinematográfica completa
- `/projetos` — Portfólio completo com filtros
- `/projetos/:slug` — Case dinâmico: desktop/mobile, preview, site ao vivo, CTA
- `*` — página 404 coerente com marca

Links de seção: `#projetos`, `#sobre`, `#servicos`, `#beneficios`, `#contato` se o scroll e acessibilidade permitirem; rolagem padrão para hash.

## 5. Estrutura e conteúdo editorial da Home

**Header sticky**: símbolo/wordmark alinhado à esquerda com margem lateral curta. À direita: Projetos, Serviços, Sobre, Contato (quando houver espaço); botão de menu **três pontos verticais**, visível em todos os breakpoints na borda direita. Ao acionar, abrir drawer à direita, foco confinado, escape fecha, overlay, foco devolvido ao gatilho. Abaixo do header, progress bar horizontal iluminada com avanço de scroll. Scrollbar vertical visualmente oculta sem desabilitar navegação nativa.

**Hero**: seção ancorada/pinned, gradiente orgânico azul/coral/escuro, grain refinado, formas que reagem ao pointer desktop. Slogan central H1: **Sua marca merece mais que um site. Merece impressionar.** Texto apoio: **Desenvolvimento web com design, estratégia e tecnologia para transformar ideias em experiências digitais.** CTA discreto `Conheça nossos projetos`. Ao scroll, composição de letras amplia/separa e próxima seção surge de baixo, originalmente menor/translúcida, ocupando tela com fundo Porcelain. Não obscurecer conteúdo se JS/WebGL falhar.

**Portfólio selecionado**: centro: `Projetos que traduzem ideias em experiências.` Título cinético lateral: **DESIGN EM MOVIMENTO** (dividido esquerda/direita). Cards iniciam como espiral/corrente tridimensional a partir da parte inferior ao scroll, com perspectiva; ao progredir, miniaturas sobem e se reorganizam em grid 2x3 com screenshots intactos e elementos de texto se dissipando/deslizando. Incluir CTA `Ver todos os projetos`. Caso faltem vídeos para um projeto, usar screenshot real sem simular vídeo.

**Sobre / manifesto**: alternância de claro/escuro, letterforms monumentais entrando por esquerda/direita, iluminação e linhas 3D discretas. Copy base: **Não criamos apenas páginas. Construímos experiências digitais.** Complemento: **Cada projeto combina identidade, navegação, tecnologia e atenção aos detalhes para apresentar sua empresa com qualidade e confiança.** Não alegar equipe, sede física ou metodologia proprietária não confirmadas.

**Serviços**: tipografia editorial e cards/propostas com oferta clara:
- **Sites institucionais** — presença profissional, serviços, diferenciais e contato em uma experiência adaptada a todos os dispositivos.
- **Landing pages** — páginas objetivas para apresentar ofertas e transformar interesse em conversas comerciais.
- **Lojas virtuais** — vitrines e jornadas de compra que organizam produtos e facilitam pedidos, com integrações conforme escopo.
- **Projetos personalizados** — soluções web construídas conforme necessidade, integrações e operação de cada negócio.
CTA `Vamos conversar sobre seu projeto`.

**Benefícios**: texto de impacto `Grandes ideias merecem uma execução à altura.` Cards de vidro ótico tridimensionais se movimentam naturalmente da direita para a esquerda, encerrando com transição para próxima seção. Conteúdos: `Projetos entregues` (número confirmado somente), `Sites a partir de R$297` (quando elegibilidade confirmada), `Hospedagem no primeiro ano` (quando condições confirmadas), `Entrega expressa` (prazo 72h condicionado à modalidade). **Se as condições não estiverem verificadas, exibir benefício qualitativo sem números/promessas**, nunca placeholders visíveis.

**Contato**: título enorme `Precisa de um site?` transformando-se em `Vamos tirar sua ideia do papel.` À esquerda: **Pronto para construir sua presença digital? Conte sobre sua empresa, seus objetivos e o projeto que você imagina. Vamos entender como ajudar.** À direita formulário mínimo com nome e descrição do projeto. Campos validados, foco e etiquetas reais. Envio abre WhatsApp no número confirmado com mensagem predefinida e dados digitados; não armazenar dados no frontend ou alegar submissão em backend. CTA `Solicitar meu projeto`.

**Footer**: logo e descrição curta `Desenvolvimento web e experiências digitais.` Navegação Projetos, Serviços, Sobre, Contato; redes somente confirmadas; copyright com ano atual; crédito exato **Desenvolvido por Douglas Borges - Smart Local** link `https://smartlocal.com.br` `_blank` `rel="noopener noreferrer"`. Isso aplica-se a todas as páginas.

**WhatsApp flutuante**: sempre visível em todas as rotas, canto inferior direito, ícone reconhecível, aria-label, alvo mínimo confortável, foco, safe-area, sem cobrir elementos essenciais. Número `5543991364545`. Mensagem genérica contextualizada: `Olá! Conheci a Smart Local e gostaria de conversar sobre a criação de um site para minha empresa.` Em case: `Olá! Vi o projeto {nome} no portfólio da Smart Local e gostaria de conversar sobre um site semelhante.` No formulário: `Olá! Gostaria de solicitar um projeto com a Smart Local. Meu nome é {nome}. Sobre o projeto: {descrição}.` `encodeURIComponent` obrigatoriamente. Nunca usar URL inválida.

## 6. Portfólio completo `/projetos`

- Título `Projetos criados para serem vistos. E lembrados.`
- Descrição `Explore experiências digitais desenvolvidas para diferentes marcas, negócios e objetivos.`
- Filtros: Todos, Institucionais, Landing Pages, E-commerce, Projetos Web e Rádio/Entretenimento apenas quando houver itens; filtros com botões e estado acessível.
- Grid de cards com screenshots autênticos, proporção coerente e perspectivas que acompanham scroll em transição tipo papiro **sem deformação do conteúdo**; nomes e categorias legíveis fora do efeito.
- Filtragem por tags definidas nos dados, não por heurísticas do nome do repositório.
- Cards clicáveis para detalhes; fallback visual com screenshot real ou logo confirmado. Não inventar imagens de projetos de clientes.

## 7. Case dinâmico `/projetos/:slug`

- Topo: nome do projeto, categoria, `← Voltar para projetos`.
- Alternância Desktop / Mobile via botões acessíveis. Desktop: MacBook ilustrativo com screenshot/loop de vídeo real do site na área de tela; Mobile: iPhone mockup com tela e gravação vertical real. Contêiner e máscara responsivos, sem distorcer vídeo. A opção não selecionada não deve reproduzir vídeo.
- Caso não exista gravação verificável, usar imagem estática do site e desabilitar playback, sem fabricar demonstração.
- Ficha simples: segmento, tipo de projeto e abordagem em texto verificado. Não inventar métricas nem depoimentos.
- CTA `Quero um projeto assim` abre WhatsApp contextual; `Ver site ao vivo` apenas se URL pública conferida. Link externo seguro com nova aba.
- Cases gerados de `src/data/projects.ts` ou `.json` tipado, sem CMS nesta V1. Slug estável, categoria, URL, imagens, poster, desktopVideo, mobileVideo, featured, status de publicação e descrição.

## 8. Portfólio — 8 destaques definidos pelo proprietário em 22/10/2026

**Seleção editorial confirmada (ordem inicial):** Kasco Aeronautical; Ricardo Peccher; Kompetens; Auto Executivo; Fabio Moura Corretor; Mary Fashion; Moan Place; A7 Jovem Guarda FM. **Não incluir EZW Soluções, OSV Tur nem JMB Capotas nos destaques.** Estes podem permanecer em catálogo futuro, desde que comprovados.

| Slug | Nome | Repositório | URL ao vivo | Categoria preliminar | Mídia |
|---|---|---|---|---|---|
| kasco-aeronautical | Kasco Aeronautical | `dborgesdev/kascoaeronautical` | `https://kasco.com.br/` (revalidar) | Institucional | aguardando usuário |
| ricardo-peccher | Ricardo Peccher | `dborgesdev/ricardopeccher` | não confirmada | Institucional (validar) | aguardando usuário |
| kompetens | Kompetens | `dborgesdev/kompetens` | não confirmada | Institucional (validar) | aguardando usuário |
| auto-executivo | Auto Executivo | `dborgesdev/autoexecutivo` | `https://autoexecutivo.com.br/` (revalidar) | Landing page | aguardando usuário |
| fabio-moura-corretor | Fabio Moura Corretor | `dborgesdev/fabiomouracorretor` | `https://fabiomouracorretor.vercel.app/` (homepage repo; revalidar) | Institucional | aguardando usuário |
| mary-fashion | Mary Fashion | `dborgesdev/maryfashion` | não confirmada | E-commerce | aguardando usuário |
| moan-place | Moan Place | `dborgesdev/moanplace` | não confirmada | Institucional (validar) | aguardando usuário |
| a7-jovem-guarda-fm | A7 Jovem Guarda FM | `dborgesdev/a7jovemguardafm` | `https://a7jovemguardafm.grupoj1.com.br/` (página pública encontrada; revalidar associação exata ao repo) | Rádio/Entretenimento | aguardando usuário |

**Política de V1:** o proprietário adicionará as capturas e gravações posteriormente. A estrutura deve estar pronta para recebê-las sem alterações arquiteturais. Nenhum vídeo ou screenshot deve ser fabricado. Enquanto não houver mídia real, usar card editorial premium tipográfico com nome e categoria, claramente sem simular tela do site; os cases e filtros continuam operacionais. Se um case ainda não tiver URL verificada, ocultar exclusivamente o botão "Ver site ao vivo". Nunca lançar vídeos vazios ou elementos quebrados. Preview poster real quando disponível.

Os arquivos e os nomes padronizados por slug estão definidos em `docs/media-guide.md` e em `public/portfolio/<slug>/README.md`. Arquivos `README.md` servem apenas de instrução e não devem ser importados pelo frontend.

## 9. Motion, interação e fallback

Referências aprovadas pelo proprietário:
- Hero https://monopo.london/
- Portfólio https://trionn.com/
- Sobre / Benefícios https://noomoagency.com/
- Contato https://antonandirene.com/ e https://cuberto.com/contacts/
- Header e catálogo https://unseen.co/projects/
- Case https://studiofreight.com/work/patrick-mahomes
- Adicionais: https://hellomonday.com/ https://bakkenbaeck.com/

Definir timeline com GSAP ScrollTrigger e pinning apenas nas cenas que precisam disso. Evitar `scroll-jacking`: a rolagem física permanece previsível, links âncora funcionam, teclado navega. Efeitos recorrentes usam transforms/opacity; WebGL/shaders somente quando efeito óptico justifica. Limitar DPR e tamanho de render, desmontar recursos ao sair, pause offscreen, detectar hardware modesto, `prefers-reduced-motion` e coarse pointer; navegação e SEO não podem depender de WebGL.

Cursor desktop: rastro esfumaçado com blur/distorção localizada sob o cursor, visualmente suave e com dissipação, sem capturar clicks/hover; desligar touch, reduced motion e baixa performance. Foco por teclado sempre nativo/visível.

Transição de grid: thumbnails sem warp do raster; somente composição, posição, rotação 3D moderada e transformação de agrupamentos.

## 10. Arquitetura técnica

**Preservar o repositório, reconstruindo a aplicação**. Stack já observada no GitHub: React 18, TypeScript, Vite 7, Tailwind 3, React Router e Framer Motion, com muitas dependências do boilerplate Lovable. Remover `lovable-tagger` e dependências não usadas depois da reconstrução; não reescrever tudo em outro framework sem justificativa. Manter gerenciador atual npm se necessário para evitar troca sem propósito; se houver migração deliberada para pnpm, eliminar lockfiles conflitantes em uma única alteração coordenada.

Proposta de estrutura:
```
src/
  components/
    layout/Header.tsx, Footer.tsx, MobileDrawer.tsx, ScrollProgress.tsx, WhatsAppFloat.tsx
    sections/Hero.tsx, FeaturedProjects.tsx, About.tsx, Services.tsx, Benefits.tsx, Contact.tsx
    portfolio/ProjectCard.tsx, ProjectViewer.tsx, ProjectFilters.tsx
    effects/FluidHero.tsx, SmokeCursor.tsx, PortfolioSpiral.tsx, OpticalGlassCard.tsx
  pages/Home.tsx, Projects.tsx, ProjectDetail.tsx, NotFound.tsx
  data/projects.ts, services.ts, navigation.ts
  hooks/useReducedMotion.ts
  lib/whatsapp.ts, motion.ts
  types/project.ts
  styles/ (somente efeitos complexos específicos quando preciso)
public/brand/, portfolio/, videos/, og/
docs/project.md
AGENTS.md
```
Cada seção principal tem próprio TSX. Pages compõem. Tokens no CSS global; Tailwind para layout. Dados factuais fora de apresentação. Carregamento lazy das cenas mais pesadas; Vite code splitting.

### Deploy
Vite SPA com build `npm run build` (ajustar se migrado), saída `dist/`; Vercel Static com fallback rewrite `/index.html` para rotas profundas, sem sobrescrever arquivos físicos. Sem runtime backend obrigatório. Domínio smartlocal.com.br mantido na versão pública atual até validação, preview por branch antes de merge. Não alterar DNS nesta fase.

## 11. SEO e acessibilidade

Home: `Smart Local | Criação de Sites Profissionais e Lojas Virtuais`; description sugerida: `Sites institucionais, landing pages e lojas virtuais com design, desempenho e experiência sob medida. Conheça os projetos da Smart Local e solicite um orçamento.`
Portfólio: `Projetos e Portfólio | Smart Local`; cases metadata por dados verificados, canonical, OG específicos, Twitter card, favicons, sitemap dinâmico/pré-build com rotas verificadas, robots. Apenas JSON-LD sustentado por dados reais; não usar `LocalBusiness` se endereço/componente local não confirmado. Atualizar metatags SPA por rota com ferramenta leve ou abordagem de pre-render se SEO de cases for requisito prioritário. Avaliar necessidade real de prerender estático para conteúdo dinâmico.

Semântica headings, one H1 por rota, skip link, aria label/pressed para filtros, tabs, foco do drawer, labels de formulário, contraste, teclado, reduced motion, imagens alt e conteúdo no DOM legível sem canvas.

## 12. Testes e critérios de aceite

- Home V1 com todos os momentos de motion e uma narrativa visual forte, não apenas seções empilhadas.
- Header, drawer lateral de três pontos, progress bar, cursor, scroll, links e WhatsApp funcionais.
- `/projetos` filtro real, grid legível e animação de entrada/rolagem sem deformação de thumbnails.
- `/projetos/:slug` alternância mockups desktop/mobile com vídeos reais quando disponíveis e fallback estático honesto.
- `prefers-reduced-motion` e dispositivos touch preservam conteúdo e CTAs.
- Desktop/tablet/mobile (320, 375, 768, 1024, 1440+), overflow, safe-area e desempenho de animações.
- Validar componentes separados e responsabilidades (não concentrar JSX em App.tsx).
- Testar typecheck, lint, build, rotas por deep link, assets, console, nav/CTAs, teclado, acessibilidade, metadata, OG, sitemap, deploy target, link de rodapé exato.
- Não inventar depoimentos, clientes, resultados, métricas ou condições comerciais.
- Nada na `main` antes da aprovação final. Branch sugerida `feat/smartlocal-rebranding`, uma rodada de implementação e refinamentos, depois PR/CI/merge.
