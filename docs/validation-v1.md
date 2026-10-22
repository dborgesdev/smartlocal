# Validação Smart Local V1

22/10/2026 — branch `feat/smartlocal-rebranding`. Este relatório distingue checks locais de validações ainda não executadas na hospedagem ou em hardware real.

## Executado

- `npm run typecheck`: TypeScript estrito, sem erros, incluindo aplicação e configuração Vite.
- `npm run lint`: passou, sem erros ou avisos.
- `npm test`: testes de ordem dos oito destaques, URLs não verificadas, codificação de mensagens, estado acessível dos filtros, fallback sem mídia, erro de poster, reprodução sob demanda/troca de formato, formulário e preferência de redução de movimento.
- `npm run build`: passou. Build cliente e pré-render SSR de 11 documentos. Sitemap com 10 rotas públicas. Geração de OG PNG. Sem servidor SSR em produção.
- `npm run check:assets`: 32 arquivos conferidos (16 WebP com dimensões válidas e 16 MP4 com contêiner/moov válido); HTML das dez rotas públicas, H1 único, metadados, marcador de hidratação, crédito obrigatório e referências locais existentes.
- `git diff --check`: sem erros de whitespace. Main e origin/main preservadas no SHA `3aa0d61afa3b03e4f9dd05ff6df033cd32c390d5`; nenhum commit, push ou merge.

## Navegador Chromium do aplicativo

- Home e catálogo, navegação e deep links dos oito cases no build de produção local.
- Title/canonical por case, um H1 por rota, poster sem falha, vídeos ausentes antes de reprodução e mensagem WhatsApp correspondente ao nome do case.
- Endereço inválido de case: 404 coerente, um main/H1, robots `noindex, follow`, sem erro de hidratação do HTML recebido pelo fallback.
- Console de produção sem erros ou avisos nos percursos testados. Durante a instalação/auditoria com HMR ativo, uma aba de desenvolvimento registrou módulos React antigos em cache; recarregamento integral resolveu. Esses logs históricos não pertencem à prévia final de produção.
- Drawer: abertura, Escape, retorno de foco, Shift+Tab do primeiro controle para o último, Tab do último para o primeiro, links e fechamento após navegação.
- Home em 320, 375, 768, 1024 e 1440px: um H1, sem overflow horizontal. Layouts mobile/desktop conferidos visualmente. Case e vídeo mobile também conferidos a 320px, sem overflow.
- Filtro E-commerce retorna apenas Mary Fashion; seleção e contagem atualizadas.
- Reprodução de gravações reais desktop/mobile de Mary Fashion e mobile de Kasco, alternância desmontando a mídia anterior. Todos os demais contêineres de vídeo foram conferidos pelo check de assets, sem alegar reprodução integral de cada gravação.
- Navegação case → home/#contato conferida com pin desktop ativo: título de contato visível e âncora alinhada após a atualização do ScrollTrigger. A sincronização deixa de atuar assim que há interação de wheel/touch/teclado.
- Campos com labels, limites e validação nativa; validação de espaços e mensagem gerada testadas automatizadamente com abertura de janela interceptada. Nenhuma mensagem foi enviada a terceiros.

## Segurança de dependências

`npm audit fix` aplicou as correções compatíveis e reduziu o relatório de 35 para 12 alertas: 5 moderados, 5 altos e 2 críticos. Restam dependências de Tailwind 3 (braces/micromatch/chokidar e PostCSS), Vitest 3 (mocker/tinypool) e React Router 6. O relatório npm exige atualizações principais para resolver integralmente esses grupos; não foi usado `--force`.

Os dois críticos reportados estão no tinypool, ferramenta de testes, não distribuída no bundle estático. Os avisos de React Router incluem redirecionamento e hidratação de dados; esta aplicação usa caminhos internos constantes, StaticRouter no build e não usa a API de deserialização de loader/actions. Isso limita exposição, sem equivaler a corrigir os pacotes. Revisão de versões principais permanece pendente antes de publicação. Os comandos de desenvolvimento/preview ficam vinculados somente a loopback.

## Limites e pendências reais

- Deploy/preview Vercel não executado: nenhum push, credencial de deploy, DNS ou site público foi alterado. `vercel.json` foi conferido como configuração; rewrites, headers e resposta de deep links ainda precisam ser validados em um preview remoto autorizado.
- A prévia Vite local é SPA: endereços desconhecidos podem responder HTTP 200 e exibir 404 pelo cliente; isso não demonstra status HTTP 404 da hospedagem.
- Reduced motion foi conferido no hook e nas regras CSS/GSAP; não houve alteração da preferência do sistema do proprietário. Touch/hardware modesto têm fallbacks implementados, mas não foi feito teste em aparelho físico, Safari/iOS, Firefox ou leitor de tela.
- Não foram executados Lighthouse, axe completo ou medição de FPS/GPU. Foram conferidos semântica, teclado, contrastes por tokens e layouts; não se declara certificação WCAG.
- Links ao vivo continuam ocultos enquanto `websiteVerified=false`; condições de ofertas, métricas e redes sociais continuam pendentes conforme a especificação.

## Visualização

Build de produção disponível em `http://127.0.0.1:4173/` enquanto o processo de preview estiver ativo. Para reiniciar: `npm run preview` após `npm run build`.
