# Guia de capturas e gravações — portfólio Smart Local

Os diretórios por projeto já estão em `public/portfolio/`. Adicione arquivos reais sem alterar os nomes das pastas.

## Convenção de nomes

`desktop.webp` (imagem horizontal 16:10, sugerido 1600 × 1000; screenshot real), `mobile.webp` (imagem vertical 9:19.5, sugerido 600 × 1300), `desktop.mp4` (captura funcional horizontal, H.264, muted, loop curto, `playsInline`), `mobile.mp4` (captura funcional vertical equivalente). Use AVIF se quiser, mas atualize manifesto. Evite fotografar telas: capturas nativas são mais nítidas. Não gravar browser chrome, dados pessoais, pop-ups ou sessões autenticadas.

## Política de ativação

Quando os arquivos estiverem prontos, atualizar os campos `media` dos projetos tipados para caminhos `/portfolio/<slug>/desktop.webp` etc. Nunca preencher caminho para arquivo inexistente. Código não deve carregar todos os vídeos na home: apenas thumbnails; vídeo só na página do case, na mídia ativa, sob demanda com pausa ao trocar aba/ao sair da tela. Use `poster`, `preload=none` e fallback estático.

Site ao vivo só se `websiteVerified=true` após confirmação manual; de outro modo esconder link. Resumo/setor/escopo apenas com fatos conferidos. Não criar vídeo simulado.

## Projetos
- `kasco-aeronautical` — Kasco Aeronautical
- `ricardo-peccher` — Ricardo Peccher
- `kompetens` — Kompetens
- `auto-executivo` — Auto Executivo
- `fabio-moura-corretor` — Fabio Moura Corretor
- `mary-fashion` — Mary Fashion
- `moan-place` — Moan Place
- `a7-jovem-guarda-fm` — A7 Jovem Guarda FM
