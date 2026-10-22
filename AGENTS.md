# Smart Local — Regras para o Codex

1. Leia integralmente `docs/project.md` antes de alterar o site. É a especificação de referência; não dependa do histórico do chat.
2. Inspecione repositório, mantenha a main protegida e use a branch `feat/smartlocal-rebranding` para V1 e refinamentos. Não faça commit/push/merge sem solicitação.
3. Preserve React + TypeScript + Vite + Tailwind e o gerenciador de pacotes atual salvo decisão documentada. Limpe dependências Lovable sem uso.
4. Cada seção principal e cada efeito independente devem ter componente `.tsx` próprio. Pages/App apenas compõem. Separe dados, integrações, lógica de motion e apresentação.
5. Implemente V1 completa com motion, interação, portfólio, cases, SEO, responsividade, acessibilidade e deploy. Evite placeholders de cliente e alegações não confirmadas.
6. Cuide de performance WebGL e motion: prefers-reduced-motion, mobile/touch e fallback sem JS de animação; sem scroll-jacking.
7. Não publique cases como entregues sem URL/capturas verificadas. Não simule gravações reais de websites. Documente pendências.
8. WhatsApp confirmado `5543991364545`; montar mensagens com `encodeURIComponent`. Footer deve incluir exatamente `Desenvolvido por Douglas Borges - Smart Local` com link externo `https://smartlocal.com.br`, `_blank`, `rel="noopener noreferrer"`.
9. Teste lint/typecheck/build, rotas, assets, browser console, desktop/mobile, teclado, SEO, deep links e deploy Vercel SPA. Relate checks executados e os bloqueios reais.


## Especificações complementares
- Ler `docs/media-guide.md`, `docs/brand-guidelines.md`, `docs/codex-handoff.md` e `src/data/projects.seed.ts` antes de editar.
- Os oito projetos `featured` foram selecionados pelo usuário; não substitua por sugestões antigas.
- Preservar os vetores originais em `public/brand`. Não reconstruir o logo a partir de uma imagem raster.
- Aceitar adição posterior de screenshots e vídeos em `public/portfolio/<slug>/` sem alterar o modelo de conteúdo.
- Sem mídia real: estado editorial premium (texto e cores da marca), nunca screenshot ou vídeo fictício.
