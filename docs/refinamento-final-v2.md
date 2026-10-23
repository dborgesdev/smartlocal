# Smart Local — acabamento final V2

Branch: `feat/smartlocal-rebranding`. Sem commit, push, PR ou merge nesta rodada.

## Implementação

- `BrandLogo.tsx`: símbolo WebP fornecido, proporção quadrada preservada, sem filtros ou SVG antigo como fallback. Nome em texto Manrope ao lado, mantendo a leitura e o alinhamento. Favicon e logo do JSON-LD usam o mesmo símbolo fornecido. PNG, ICO e vetores originais preservados sem edição.
- `BrandIntro.tsx` e `Hero.tsx`: abertura de aproximadamente dois segundos, palavra monumental e revelação coordenada. Wrappers próprios isolam opacidade/transform da dispersão por scroll. Uma execução por carregamento do módulo; navegação SPA não repete. Scroll/toque/foco interrompem a abertura; redução de movimento e entrada por âncora exibem o estado final. Falha do import revela o conteúdo. Sem dependência do carregamento das mídias.
- `FluidHero.tsx`: shader WebGL próprio sem dependências, domínio deformado por ondas e perturbação localizada com velocidade/direção suavizadas. Movimento ambiente, limite DPR 1,5 e aproximadamente 30fps; pausa fora da viewport/aba oculta, ResizeObserver, descarte de buffer/programa/shaders/contexto. Gradientes estáticos permanecem como fallback sem WebGL/com movimento reduzido.
- `SmokeCursor.tsx`: canvas com até 72 partículas alongadas, cores coral/cobalto, intensidade por velocidade, inércia e dissipação. RAF termina quando não há partículas. Desativado para touch/reduced motion; sem captura de eventos, cursor nativo preservado; não emite partículas dentro do Hero.
- `BenefitsMotion.tsx` e `Benefits.tsx`: wrappers individuais com entrada da direita, atraso sequencial, profundidade e rotação moderadas. Percurso menor em telas compactas; materialidade e tilt internos preservados. Sem fade como substituição da trajetória; reduced motion mantém a posição final.
- CSS específico em `styles/refinements-v2.css`; nenhuma dependência adicionada e nenhuma mudança no conteúdo/portfólio/integrações.

## Validação

Typecheck e lint aprovados. Os 14 testes existentes passaram. Build cliente e pré-render de 11 HTMLs aprovados; check de assets confirmou 32 mídias e dez rotas. Pré-render usa effect compatível com servidor para a abertura.

Chromium: Hero final e cards conferidos visualmente em desktop/tablet; larguras 320, 375 e 768 sem overflow, símbolo 36×36 intacto, quatro wrappers presentes. Console sem erros/avisos na primeira passagem desktop. Header, conteúdo semântico e navegação existentes preservados.

Limites: não houve teste físico touch, Safari/iOS ou leitor de tela. Não foi medido FPS/GPU/heap nem realizada auditoria WCAG completa. O fallback/reduced motion foi conferido no código e na arquitetura, sem mudar a preferência do sistema do proprietário. Rewrites/headers remotos da Vercel não foram exercitados; build/deploy estático atual preservado. Não há pendência de fornecimento do símbolo: `public/brand/smartlocal-logo.webp` estava disponível. Não foi fornecido wordmark raster separado.

Preview: http://127.0.0.1:4173/ enquanto o servidor local estiver ativo.
