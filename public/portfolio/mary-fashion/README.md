# Mary Fashion

Coloque neste diretório os arquivos reais do site, preferencialmente:

- `desktop.webp` — screenshot/capa horizontal 16:10 ou 16:9
- `mobile.webp` — screenshot/capa vertical 9:19.5
- `desktop.mp4` — captura real do uso desktop, H.264, sem áudio, otimizada
- `mobile.mp4` — captura real do uso mobile, H.264, sem áudio, otimizada

O Codex deve detectar presença dos arquivos via manifesto explícito e não assumir que existem: ajuste `src/data/projects.ts` quando adicionados. `README.md` não é asset visual.
