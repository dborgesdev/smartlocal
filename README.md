# Smart Local — V2

Rebranding do site em React + TypeScript + Vite + Tailwind. A especificação aprovada está em [docs/project.md](docs/project.md); leia também os documentos complementares e `AGENTS.md` antes de alterar o projeto.

Refinamentos atuais conforme [docs/smartlocal-refinamento-v2.md](docs/smartlocal-refinamento-v2.md): hélice contínua na Home, pergaminho independente no catálogo e demonstração de vídeo guiada por scroll nos cases.

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
- Se faltar mídia, o site apresenta composição editorial. Apenas o vídeo do formato ativo é carregado quando o mockup se aproxima da viewport. Com mídia pronta, o scroll percorre o vídeo pausado; há modo alternativo com controles e suporte a reduced motion.
- URL ao vivo só aparece com `websiteVerified=true` após conferência manual.
- O formulário prepara mensagem para WhatsApp; não há armazenamento nem backend de contato.

Implementação atual em [docs/implementation-v2.md](docs/implementation-v2.md) e checks/limites em [docs/validation-v2.md](docs/validation-v2.md). Os relatórios V1 permanecem como registros históricos.

V1 desenvolvida na branch `feat/smartlocal-rebranding`. Commit, push e integração à main autorizados pelo proprietário após a revisão local. Site anterior preservado no histórico Git.

V2 na mesma branch, sem commit, push ou merge nesta rodada. A autorização anterior da V1 não se aplica às alterações V2.
