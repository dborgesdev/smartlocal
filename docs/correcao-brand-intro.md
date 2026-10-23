# Home — carregamento e abertura por sessão

Branch `feat/smartlocal-rebranding`. Alterações locais; sem commit/push/PR/merge.

## Causas e correção

A Home era um módulo lazy dentro do Suspense de rotas e exibia “Preparando a experiência…” antes do Hero. A abertura dependia de outro import dinâmico, tinha uma pausa inicial e sobrepunha temporalmente marca/H1. O controle anterior limitava-se à montagem do componente. Na correção anterior também foram identificados o ref pai ainda não anexado durante o layout effect do filho e o flag global incompatível com o replay de StrictMode.

- `src/Site.tsx`: Home importada diretamente. Rotas secundárias e cursor continuam lazy.
- `index.html`: decisão síncrona curta antes da pintura do HTML pré-renderizado. Registra `smartlocal:session-started` independentemente da rota. Só autoriza a primeira Home no topo, sem hash e sem reduced motion. Armazenamento bloqueado mantém o Hero final. Um erro de script/recurso libera a sinalização visual inicial.
- `BrandIntro.tsx`: GSAP core importado diretamente, sem importar ScrollTrigger para a abertura. Uma timeline contínua: 0,85s de saída da marca (escala 1→1,06), seguidos de 0,7s de revelação com pequeno stagger. O H1 permanece oculto até a marca zerar. Sem timeout nem espera artificial; layout não muda. StrictMode reutiliza a autorização no ref da montagem descartada, sem reler/consumir a sessão. Cleanup reverte contexto/listeners; interrupção por scroll, wheel, toque, foco ou mudança de preferência revela imediatamente.
- `src/index.css`: estado inicial também vale antes da hidratação, mediante autorização do documento. As regras da abertura ficam centralizadas aqui.
- `FluidHero.tsx` e `styles/refinements-v2.css`: gradientes CSS existem antes de WebGL e o canvas permanece transparente até seu primeiro desenho. Corrige o frame preto encontrado na primeira revisão mobile; não condiciona o Hero à GPU.
- Testes: `brand-intro.test.tsx` e `intro-session.test.ts`.

Hero, textos, navegação, portfólio e integrações preservados. `HeroMotion.tsx` não foi alterado. Abertura continua usando elementos distintos daqueles transformados pelo scroll.

## Caminho crítico

A Home e o GSAP core agora integram o grafo inicial. Isso aumenta o JavaScript inicial em troca de eliminar as duas etapas assíncronas de abertura. O plugin ScrollTrigger permanece em chunk próprio. No build, o chunk index ficou em cerca de 112kB (43kB gzip), React separado em 161kB (53kB gzip), e motion/ScrollTrigger separado em 44kB (18kB gzip). Não foram adicionadas dependências, preloader, carregamento artificial ou espera por fontes, vídeos e GPU. Fontes locais e suas políticas de carregamento foram preservadas; não se declara ausência de layout shifts por medição de profiler.

## Evidências e limites

Checks finais e revisão de navegador registrados após a execução. A preferência do sistema do proprietário não é alterada. SessionStorage segue a sessão por aba/origem do navegador; uma aba duplicada pode herdar o estado conforme o comportamento do navegador. Em armazenamento bloqueado, a apresentação é omitida para manter o conteúdo disponível.

## Validação desta versão

- Typecheck, lint, 23 testes (quatro arquivos), build cliente/pré-render e check de assets passaram. 11 HTMLs completos, dez rotas e 32 mídias conferidas. `git diff --check` sem erros de whitespace.
- Chromium: primeiro acesso em desenvolvimento sem mensagem de espera; atualização na mesma sessão com Hero final. Produção revisada em origem nova (porta 4174) com `Cache-Control: no-store, max-age=0` em HTML e assets, para exercitar carregamento sem cache HTTP. A ferramenta não oferece toggle DevTools “Disable cache” nem captura de vídeo; foram observados estados e screenshots, sem declarar gravação ou teste do atalho Ctrl+Shift+R.
- Marca em fade com opacidade aproximadamente 0,54 e H1 ainda em 0; no término, Hero em 1 e intro display none. Reload no-store e Home → Projetos → Início não repetiram. Entrada inicial pelo catálogo e por um case seguida de clique em Início/logotipo também não apresentou a marca.
- Mobile 375×812: marca central com fundo coral/cobalto presente desde o primeiro frame conferido após o ajuste do canvas. Documento sem overflow (375px); rolagem liberou a abertura com conteúdo em opacidade 1. Viewport foi restaurada ao terminar.
- Preview final 4173: dispersão das nove palavras chegou a opacidade 0 em scroll 1008px. Reload manteve conteúdo em 1, sem apresentação repetida, e console sem erros/avisos.
- Durante QA, o servidor temporário no-store foi reiniciado após o build substituir dist; isso gerou falha de conexão em uma aba temporária. A validação final foi feita após o build terminar. Esse servidor auxiliar não integra o deploy.
- Não houve teste físico touch/Safari/iOS, alteração da preferência de movimento do sistema, throttle de rede, Lighthouse, profiler de FPS/CLS ou vídeo da sequência. Reduced motion, storage indisponível e StrictMode têm tratamento no código; StrictMode e storage indisponível foram exercitados pelos testes.
- Captura da apresentação: `artifacts/abertura-sessao.png` (artefato local, ignorado pelo Git). Preview de produção em http://127.0.0.1:4173/.
