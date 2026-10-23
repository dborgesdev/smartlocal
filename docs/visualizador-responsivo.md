# Visualizador responsivo — refinamento

Branch `feat/smartlocal-rebranding`. Escopo limitado ao visualizador, dados de URLs e testes. Sem commit, push, PR ou merge.

## Mudanças

- `useViewerMode.ts`: smartphones (<768px) começam em Mobile; tablets compactos com ponteiro coarse e orientação retrato também. Viewports amplas/fine pointer começam em Desktop. A seleção é inicial, sem user-agent nem listener que sobrescreva a escolha manual no resize.
- `ProjectViewer.tsx`/`DevicePreview.tsx`: estado neutro compartilhado entre SSR e hidratação, com picture/media e moldura CSS responsivos antes da primeira seleção em layout effect. Não há dois vídeos nem troca tardia de aba depois da pintura. Falha de poster é específica à fonte, permitindo alternar para uma captura válida.
- `ProjectDemo.tsx`: painel estável ao alternar formatos; estado de decoder é associado à fonte. CTA “Ver site ao vivo ↗” junto aos controles, seguro em nova aba. Links/controles têm hierarquia e alvos de pelo menos 44px; informação e progresso compartilham uma linha de composição no smartphone para liberar altura ao dispositivo. Capturas e vídeos continuam proporcionais com object-fit contain.
- `VideoScrollMotion.tsx`: pin tem ciclo independente do decoder. Ao trocar formato, pausa/desmonta a fonte anterior, mantém espaço de scroll e progresso e liga o novo decoder ao mesmo ponto normalizado. ResizeObserver e visualViewport resize recalculam o pin por RAF e são removidos no cleanup. Sem fonte, erro ou controles manuais/reduced motion, preserva fallback sem pin vazio.
- `refinements-v2.css`: altura por dvh desconta header, margens e safe area; toolbar e controles ocupam linhas intrínsecas, e o dispositivo usa a área restante via container queries. Removido o teto de 265px da moldura mobile. Preview Desktop no telefone ocupa a largura disponível.
- `projects.seed.json`: URLs fornecidas pelo proprietário associadas aos mesmos oito projetos, com confirmação de destino. Ordem, seleção e mídias preservadas.

## URLs conferidas

As oito URLs abaixo responderam HTTP 200 e títulos compatíveis na verificação por fetch, sem submissão de formulários. Isso confirma disponibilidade naquele momento, sem alegar auditoria completa dos sites externos.

| Projeto | URL fornecida |
| --- | --- |
| Kasco | https://kasco.com.br/ |
| Ricardo Peccher | https://ricardopeccher.com.br/ |
| Kompetens | https://kompetens.com.br/ |
| Auto Executivo | https://autoexecutivo.vercel.app/ |
| Fábio Moura | https://demo-fabiomouracorretor.smartlocal.workers.dev/ |
| Mary Fashion | https://www.maryfashion.com.br/ |
| Moan Place | https://demo-moanplace.smartlocal.workers.dev/ |
| A7 Jovem Guarda FM | https://www.a7jovemguardafm.com/ |

## Revisão Chromium

- Perfis 360×800, 375×812, 390×844 e 430×932 iniciaram Mobile. Documento sem overflow e seletor, dispositivo e ações dentro da viewport durante o pin. Tablet 768×1024 (ponteiro fine emulado) e desktop 1440×900 iniciaram Desktop.
- Em 375×812, dispositivo com aproximadamente 513px de altura, contra cerca de 459px registrados na revisão anterior, incluindo agora o CTA ao vivo.
- Troca Mobile → Desktop no pin preservou scrollY=487 e um único pin/vídeo. Vídeos ficaram pausados no mesmo progresso normalizado. Scrubbing mobile observado avançando de 3,215s para 7,609s e revertendo para 4,979s.
- Escolha manual Desktop permaneceu após resize para 390px e alturas de 700/900px; painel terminou respectivamente próximo de 688/888px, com controles em 679/879px após refresh.
- Console de desenvolvimento sem erros/avisos no percurso conferido. Links externos têm href fornecido, target blank e rel noopener noreferrer; esse comportamento também é testado sem abrir destinos externos automaticamente.

## Limites

Viewports e variações de altura simulados no Chromium. Não houve teste físico touch, Safari/iOS, barras reais de navegador móvel, leitor de tela ou medição FPS/GPU/heap. CSS dvh/safe-area e visualViewport cobrem esses casos na implementação, sem declarar validação física. Política de tablet coarse/portrait testada no código; a sessão do navegador usada tem ponteiro fine. Vercel mantém o mesmo build e pré-render estático; não foi realizado deploy remoto.

Checks finais: typecheck, lint, 27 testes, build e pré-render de 11 HTMLs aprovados; check de assets confirmou 32 mídias e dez rotas. Preview de produção em 375×812 confirmou Mobile automático, moldura de 513px, CTA https://kasco.com.br/ em nova aba com rel seguro e console sem erros/avisos. Em 1280×720, Desktop automático, um vídeo, painel até aproximadamente 708px e controles até 697px. Viewport restaurada e servidor de produção disponível em http://127.0.0.1:4173/projetos/kasco-aeronautical. Captura mobile local em artifacts/visualizador-mobile.png (ignorada pelo Git).
