# Smart Local — V1

Rebranding do site em React + TypeScript + Vite + Tailwind. A especificação aprovada está em [docs/project.md](docs/project.md); leia também os documentos complementares e `AGENTS.md` antes de alterar o projeto.

## Executar localmente

```sh
npm install
npm run dev
```

O desenvolvimento usa `http://127.0.0.1:8080`. Para escolher outra porta no Windows: `node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 8081`.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run check:assets
npm run preview
```

O build gera `dist/`, HTML pré-renderizado para home, catálogo e oito cases, sitemap e imagem social. A prévia de produção usa `http://127.0.0.1:4173`. O aplicativo continua sendo uma SPA com navegação React Router. Vercel está preparada em `vercel.json`; publicação não foi efetuada.

## Conteúdo e mídia

- `src/data/projects.seed.json`: seleção editorial única dos oito projetos, ordem, categorias e verificação de URLs.
- `src/data/projects.ts`: manifesto tipado de mídia, segmentos e cores.
- `public/brand`: vetores originais preservados.
- `public/portfolio/<slug>`: capturas e vídeos recebidos com o checkout, além das instruções por projeto.
- Se faltar mídia, o site apresenta composição editorial. Vídeos só são carregados no case após solicitação de reprodução.
- URL ao vivo só aparece com `websiteVerified=true` após conferência manual.
- O formulário prepara mensagem para WhatsApp; não há armazenamento nem backend de contato.

Detalhes da reconstrução e pendências em [docs/implementation-v1.md](docs/implementation-v1.md). Validações em [docs/validation-v1.md](docs/validation-v1.md).

V1 desenvolvida na branch `feat/smartlocal-rebranding`. Commit, push e integração à main autorizados pelo proprietário após a revisão local. Site anterior preservado no histórico Git.
