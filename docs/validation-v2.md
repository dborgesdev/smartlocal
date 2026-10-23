# Smart Local — validação V2

23/10/2026. Branch `feat/smartlocal-rebranding`, HEAD mantido em `33dbc43`. Main mantida em `1614b0c`. Mudanças da V2 somente na árvore de trabalho; nenhum commit, push, PR, merge ou deploy remoto nesta rodada.

## Checks técnicos

- **Typecheck:** passou, com TypeScript estrito.
- **Lint:** passou. A pasta de build temporária `.prerender` foi adicionada ao ignore do ESLint para não haver corrida com seu descarte no fim do build.
- **Testes:** 14 passaram em dois arquivos. Incluem continuidade/defasagem da hélice, pose final exata, reversibilidade matemática, pergaminho plano no centro, clamp do tempo de vídeo, agrupamento de RAF, espera de seek e reverso, limpeza do controlador, watchdog de seek travado, troca de fonte sem autoplay/loop, fallback por erro/sem mídia, filtro acessível, mensagens específicas por serviço, formulário/foco em erro e preferência de redução de movimento.
- **Build:** cliente e pré-render passaram. Onze documentos HTML completos, sitemap com dez rotas e OG gerado. A arquitetura continua estática/SPA, sem runtime backend.
- **Assets:** 32 mídias conferidas pelo script existente, dez rotas com HTML, H1 único, metadados, marcador de hidratação, crédito do footer e arquivos locais referenciados presentes. O verificador confere contêineres MP4, não declara reprodução completa de todas as gravações.
- **Git:** `git diff --check` sem erros; nenhuma alteração em `public/brand`, `public/portfolio` ou na seleção/ordem editorial dos projetos. O arquivo de identidade e a especificação V2 recebidos permaneceram preservados.

## Revisão em Chromium

- Hero, corrente em hélice, grid final e percurso do catálogo revisados visualmente. Todas as palavras do hero chegaram a opacidade `0`. Os cards foram observados em profundidades/rotações diferentes na mesma corrente; ao usar o atalho de teclado, a pose final do primeiro card ficou em `translate3d(0px, 0px, 0px)`, com foco em seu link. Movimento reverso e reposicionamento por mudança de viewport conferidos; os testes puros verificam que a mesma fase resolve a mesma pose.
- Menu global de Projetos em `/projetos`, sem CTA redundante na Home. No catálogo, filtro E-commerce mostrou apenas Mary Fashion, com linha da folha recriada e sem pin residual de Home/case.
- Vídeo desktop real de Kasco com scroll: duração 29,1s, pausado e sem controles concorrentes; avanço até aproximadamente 14,247s e reversão até 8,435s. Troca para mobile manteve apenas uma fonte ativa. O mockup inteiro ficou entre toolbar e ações, dentro da área útil da viewport, com o link para todos os projetos visível.
- Home em 320, 375, 768, 1024 e 1440px sem overflow horizontal. Em 320/375/768px, sem pins de hero/portfólio; no desktop, dois pins esperados e nenhum de vídeo após sair do case. A amostra de textos de apoio inspecionada em 320px não tinha fontes abaixo de 12px.
- Dispositivo e painel de demonstração inspecionados em perfis compactos e desktop; a 375×812, painel de 722px e dispositivo de aproximadamente 459px de altura, inteiramente dentro da área útil. O vídeo ficou único após alternar formatos e a largura do documento permaneceu igual à viewport.
- Na passagem final pelo build de produção, o case desktop foi recarregado em 320, 375, 768, 1024 e 1440×850px: documento sem overflow, um vídeo pausado e dispositivo inteiro dentro do painel em todas as larguras. Em 320×850px, o formato mobile ficou entre aproximadamente 165 e 602px, com ações legíveis abaixo e vídeo pausado em 7,437s após rolagem. Catálogo → filtro E-commerce → Mary Fashion → Projetos → voltar no navegador manteve a rota correta, sem erros no console.
- Formulário inspecionado visualmente em 375px: painel, labels, campos e CTA legíveis, foco visível e sem espaço vazio excessivo. Falhas de validação e foco foram exercitados nos testes sem enviar mensagens reais.
- Quatro objetos dos benefícios conferidos como ilustrações distintas, preservando a linguagem óptica. As miniaturas do próximo projeto e a navegação permanecem nos cases.
- Console do build de produção sem erros/avisos nos percursos conferidos. Alterações de layout comunicam os pins ao alinhamento de hashes; interação do usuário interrompe essa sincronização.

## Contraste representativo

Ratios calculados por luminância relativa, sem opacidade intermediária: cobalto `#465BEE` sobre Porcelain **4,62:1**; texto `#5A5D65` sobre Porcelain **5,78:1**; descrição de vidro `#D1D5E1` sobre `#1C1F25` **11,25:1**; coral sobre Obsidian **6,04:1**; placeholder `#656871` sobre branco **5,57:1**. Isso confere pares representativos e não equivale a uma auditoria WCAG completa de todos os estados/superfícies.

## Limites reais

- Não houve teste em aparelho físico, Safari/iOS, Firefox ou leitor de tela real. Foram conferidos DOM/árvore de acessibilidade, semântica, labels, foco e teclado no Chromium e nos testes. Não se declara certificação WCAG.
- Reduced motion foi verificado no hook e nas condições CSS/GSAP; a preferência do sistema do proprietário não foi alterada. Viewports compactas foram simuladas no navegador; isso não equivale a testar gestos/hardware touch reais.
- Não foram medidos FPS, uso GPU ou heap em profiler. A implementação limita atualização a scroll/RAF solicitado, mantém um vídeo ativo e limpa recursos, mas não se declara ausência de leaks por medição de memória.
- O vídeo depende da rede/decodificação. Há poster e watchdogs para indisponibilidade, inclusive sem pin vazio; o comportamento particular de seeking em Safari/iOS ainda requer verificação física.
- URLs públicas, condições comerciais, auditoria de dependências e preview/deploy Vercel continuam com as pendências editoriais/operacionais já documentadas na V1. Nenhuma dependência foi adicionada/atualizada nesta rodada e não foi executada nova auditoria npm. O servidor local não valida rewrites/headers da hospedagem remota.

## Preview

`http://127.0.0.1:4173/` — build de produção local, enquanto o processo estiver ativo. Para reiniciar: `npm run build` e `npm run preview`. A implementação está descrita em `implementation-v2.md`.
