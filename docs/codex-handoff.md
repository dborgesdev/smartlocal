# Codex — handoff Smart Local V1

**Ler antes de implementar:** `AGENTS.md`, `docs/project.md`, `docs/brand-guidelines.md`, `docs/media-guide.md`, `src/data/projects.seed.ts`.

## Missão

No repositório existente `dborgesdev/smartlocal`, sincronizar a `main` e trabalhar em única branch `feat/smartlocal-rebranding`. Reconstruir V1 completa responsiva e navegável do zero preservando base React/TS/Vite/Tailwind e deploy Vercel. Não implementar plano em fases artificiais. Não modificar `main`; sem commit/push/merge sem pedido posterior.

Criar Home, `/projetos`, `/projetos/:slug`, 404, header sticky, drawer 3-pontos, barra de scroll, hero fluido, portfólio espiral->grid, sobre, serviços, vidro 3D benefícios, contato WhatsApp, cursor smoke com fallback, footer obrigatório e WhatsApp flutuante. Construir narrativa de movimento com GSAP/ScrollTrigger e shaders/WebGL seletivos se a performance justificar. Organizar uma seção por TSX.

## Assets no pacote

Copiar `public/brand/*` e `public/portfolio/` para repo respeitando caminhos; adaptar `src/data/projects.seed.ts` a `src/data/projects.ts` ou importar seeds. **Oito destaques escolhidos são obrigatórios e nesta ordem**. Todas as pastas de case estão sem screenshots e vídeos por decisão do proprietário: usar composição editorial tipográfica premium e um mockup sem falso screenshot até que haja arquivos. Nenhuma aplicação deve quebrar nem gerar requests 404.

## Regras de publicação

Somente dados reais. Não mostrar '50+' nem oferecer '72h' sem validação de escopo; R$297 e hospedagem somente com ressalva editorial apropriada conforme `project.md`. Logo fornecido como SVG editável; fontes do wordmark não estão convertidas em paths. Sem imagens do moodboard como case. Verificar links antes de publicar.

## Aceite

Visual próprio, qualidade editorial, movimentos contínuos reais, responsividade 320/375/768/1024/1440, interação sem pointer, teclado, focus, aria, contrastes, motion-reduced, scroll não bloqueado, vídeos sob demanda, SEO rotas, canonical, OG, sitemap e fallback SPA para Vercel. Typecheck/lint/test/build reais. Preview da branch. Reportar pendências e validações, não afirmar deploy efetuado.
