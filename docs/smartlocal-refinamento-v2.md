# Smart Local — Refinamento V2 (pós-preview)

## Contexto e instrução ao Codex

Repositório: `https://github.com/dborgesdev/smartlocal`
Branch existente: `feat/smartlocal-rebranding`.
Esta é uma **rodada de refinamento da V1 existente**, não um novo projeto. Trabalhar na mesma branch; não alterar `main`; não fazer commit, push, PR ou merge sem autorização. Ler `AGENTS.md`, `docs/project.md` e documentos existentes antes de editar. Preservar identidade, copy e seções aprovadas, salvo alterações explícitas abaixo. Implementar ajustes completamente (incluindo desktop/tablet/mobile, acesso por teclado, `prefers-reduced-motion` e performance) e validar, sem depender do histórico do chat.

## Constatações do código existente (verificar ao iniciar)

- `src/data/navigation.ts` aponta `Projetos` para `/#projetos`; trocar para `/projetos` em todos os menus, inclusive drawer.
- `src/components/sections/FeaturedProjects.tsx` contém CTA redundante `Ver todos os projetos` e reutiliza `PortfolioSpiral`.
- `src/components/effects/PortfolioSpiral.tsx` anima cada `.project-card` isoladamente com x/y/rotation; **não existe uma espiral contínua nem um pergaminho**. Separar os efeitos para Home e catálogo.
- `src/components/effects/HeroMotion.tsx` desloca `.hero-word` em poucos pixels e termina em `opacity: 0.08`; melhorar dispersão e zerar visibilidade no fim.
- `src/components/portfolio/ProjectViewer.tsx` reproduz vídeos via controles e autoplay. Substituir experiência principal por timeline de vídeo controlada pelo progresso de scroll.
- `src/components/sections/Services.tsx` rende `article` com seta decorativa, sem link por serviço. `src/data/services.ts` tem os nomes e descrições; usar mensagens de WhatsApp específicas, sem alterar a copy aprovada desnecessariamente.
- `.eyebrow` global tem `font-size: 10px` e diversas outras microfontes em `src/index.css`. Revisar legibilidade global de forma consistente.

## 1 — HEADER / Navegação

1. A opção `Projetos` no header e no menu lateral deve navegar para `/projetos`, nunca para a âncora na Home.
2. Como a navegação global já leva ao catálogo, **remover o botão `Ver todos os projetos` da seção destacada**, preservando um encerramento compositivo elegante (sem deixar vazio estranho).
3. O header continua sticky, com logo à esquerda, menu à direita e botão de três pontos, como aprovado.
4. Validar rota a partir de Home, `/projetos` e `/projetos/:slug`, inclusive menu lateral e botão Voltar do navegador.

## 2 — HOME: hero

O texto grande deve **dispersar-se progressivamente pelo espaço e desaparecer completamente** conforme o visitante rola, enquanto a seção clara ascende e toma a viewport. Hoje as palavras permanecem visíveis e sobrepostas. A animação deve ter progressão física evidente, por palavras ou fragmentos com direções variadas (x/y, rotação e leve escala), chegando a `opacity: 0` e/ou estado visual inteiramente fora de cena antes de a próxima seção estabilizar. Evitar ghost text e elementos residuais entre cenas. Sincronizar pin e transição para evitar saltos, clipping ou duplicação; funcionar em scroll reverso. Mobile/touch e reduced-motion devem manter leitura, narrativa e navegação sem pin excessivo.

## 3 — HOME: apresentação de projetos em espiral

**Reimplementar a sequência visual**, não apenas aumentar o deslocamento dos cards atuais.

1. Texto menor central de apresentação do portfólio; título monumental `DESIGN EM MOVIMENTO` entra pelas bordas laterais, em direção ao centro.
2. De baixo emerge **uma corrente única e contínua de miniaturas** dos projetos destacados, distribuída em trajetória curvada/espiral tridimensional. O movimento é vinculado à rolagem, alterando profundidade, rotação, escala e posição, com entrada e saída em fluxo contínuo. As miniaturas devem ser imagens reais dos projetos já presentes, não réplicas/colagens fictícias.
3. A corrente sobe e sai pela borda superior; **depois** miniaturas se transformam/transicionam de forma inteligível para o grid final de cards com projetos clicáveis. O título monumental sai pelas laterais e a copy intermediária desaparece gradualmente.
4. Ao terminar, restam cards nítidos, acessíveis, organizados em grid e com todos os links válidos. Evitar imagens distorcidas durante o estado final. O efeito deve comunicar continuidade, não aparecer como cards independentes que entram com fade.
5. Usar timeline dedicada (ex.: `FeaturedPortfolioMotion`), separada do catálogo. Não prender o usuário em scroll artificial, limitar cálculos e preservar fluidez/reduced-motion.

## 4 — HOME: microcopy/eyebrows

Remover numerações como `01 /`, `02 /`, `03 /`, `04 /`, `05 /` dos **eyebrows de seções**. Manter somente o nome editorial (`SELEÇÃO DE PROJETOS`, `MAIS QUE APARÊNCIA`, etc.). Não remover numerações úteis de projetos/catálogo e não modificar o título das seções.

## 5 — HOME: serviços com link direto para WhatsApp

Cada uma das quatro linhas — `Sites institucionais`, `Landing pages`, `Lojas virtuais`, `Projetos personalizados` — deve ser inteiramente clicável ou conter link/CTA claramente distinguível, com hover, foco visível, interação por teclado e toque. Destino: `https://wa.me/5543991364545?text=...`, usando `encodeURIComponent` no utilitário existente. Mensagens distintas, por exemplo:

- Sites institucionais: `Olá! Gostaria de solicitar um orçamento de site institucional com a Smart Local.`
- Landing pages: `Olá! Gostaria de solicitar um orçamento de landing page com a Smart Local.`
- Lojas virtuais: `Olá! Gostaria de solicitar um orçamento de loja virtual com a Smart Local.`
- Projetos personalizados: `Olá! Gostaria de conversar sobre um projeto web personalizado com a Smart Local.`

Validar as quatro URLs e manter o CTA geral existente se fizer sentido para conversão, sem redundância visual excessiva.

## 6 — HOME: contato

Preservar headline e texto aprovados, mas **destacar o formulário como elemento principal de conversão**. Ele deve ter contêiner perceptível (painel com contraste de superfície, borda/sombra sutil, raio consistente, campos amplos, estados hover/foco, labels claras, respiro entre campos e CTA de alto contraste). Em desktop: composição editorial entre texto introdutório e formulário destacado à direita; em mobile: formulário legível e destacado, sem ficar escondido depois de espaço vazio. Entrada com motion próprio, sem atrasar acesso ao formulário; validar teclado e mensagens de erro. Manter envio por WhatsApp e declaração fiel sobre não armazenar dados.

## 7 — HOME: cards de benefícios

Os quatro cards (Identidade de verdade, Em qualquer tela, Clareza para avançar, Espaço para crescer) precisam de elementos **visualmente distintos e semanticamente conectados ao conteúdo**, preservando sua aparência de vidro óptico/3D e travessia da direita para a esquerda. Preferir pequenos objetos gráficos/ilustrações customizadas por card, mantendo coerência visual; SVGs ou CSS 3D são aceitáveis. Não usar o mesmo objeto/ícone repetido com pequenas mudanças de inclinação. Se forem geradas imagens, cada arquivo deve ser individual e otimizado, sem imagens fictícias de projetos/clientes. Melhorar legibilidade das descrições e evitar glows que prejudiquem contraste.

## 8 — CATÁLOGO /projetos: pergaminho

O catálogo NÃO deve reutilizar a animação de espiral da Home. Criar efeito próprio de **folha/papiro flexível em movimento**: ao scroll, as linhas de projetos sobem/descem com curvatura de percurso e leve variação de perspectiva das superfícies/containers, como um pergaminho que se desenrola pela viewport. **Proibido deformar a imagem** dos screenshots (sem `skew`, `scaleY` desigual, warp de textura ou border-radius agressivo no conteúdo). Garantir legibilidade, clicabilidade, filtro funcional, scroll reverso, perfis mobile e reduced-motion; o grid deve estabilizar com cards sem deformações. A implementação pode usar wrapping/perspective com transformações de posição e rotação 3D não destrutivas ou máscaras/clip nos contêineres, desde que as thumbs permaneçam proporcionais.

## 9 — PROJETO INDIVIDUAL: demonstração guiada por scroll

1. O mockup selecionado (MacBook/desktop ou iPhone/mobile) deve caber inteiramente na área visual livre: altura máxima próxima de `100dvh - altura do header - toolbar - margens seguras`, preservando proporção. Nenhum dispositivo deve ultrapassar o viewport e exigir scroll interno apenas para enxergar suas bordas.
2. Criar uma **etapa sticky/pinned de demonstração**: durante um segmento definido de rolagem, o mockup fica visualmente parado enquanto o vídeo correspondente é percorrido de acordo com o progresso do scroll. Mapear progressivamente `ScrollTrigger.progress` (ou equivalente) para `video.currentTime = progress * duration`, com cuidados de `loadedmetadata`, seek, buffering, Safari/iOS e atualização em scroll reverso. Vídeo deve estar pausado durante scrubbing, sem controls/autoplay/loop concorrentes. Evitar manipular `currentTime` a cada frame sem necessidade; usar smoothing/throttle/raf quando justificar.
3. Se o vídeo estiver ausente ou indisponível, exibir o screenshot estático com layout íntegro e **não ativar pin longo vazio**. Se a mídia ainda não tiver carregado, manter poster e uma indicação discreta; não prometer interação que não funciona.
4. A troca Desktop/Mobile muda mockup, fonte de mídia e recalcula dimensões e timeline sem conflitos ou listeners órfãos. Mobile deve ser utilizável por gesto de scroll nativo. `prefers-reduced-motion`: modo alternativo sem pin e vídeo com controles acessíveis ou poster.
5. Inserir **link permanente `Ver todos os projetos` imediatamente abaixo do conjunto de mockup**, dentro da região visível junto à demonstração, disponível sem precisar atravessar o case inteiro. Preserve também breadcrumb/voltar se fizer sentido, sem links duplicados conflitantes.
6. Manter CTAs existentes: `Quero um projeto assim` e `Ver site ao vivo` (somente para URL verificada).
7. No link/cartão `PRÓXIMO PROJETO`, adicionar a miniatura real `desktopPoster` do próximo projeto ao lado do título; fallback editorial coerente quando indisponível. Thumbnail proporcional, com alt adequado se informativa, responsiva e sem distorção.

## 10 — Revisão global de tipografia

A interface está usando textos de 9, 10 e 11px em múltiplos lugares (e.g. `.eyebrow`, `.header-caption`, `.project-caption span`), pequenos demais para leitura confortável. Revisar tamanho/line-height/hierarquia de: eyebrows, labels de cards, categorias, descrições dos benefícios, CTA secundário, formulário, footer, metadados de projeto, filtros e navegação. Referência de implementação: texto de corpo frequentemente 15–17px no desktop, microcopy/eyebrows preferencialmente >=12px em condições usuais e controles confortáveis para toque; não aumentar indiscriminadamente títulos já grandes. Preservar estética editorial com espaçamento, peso e contraste adequados. Validar larguras 320, 375, 768, 1024, 1440px, sem overflow.

## QA e critérios de aceite

- Animações revistas **visualmente** em scroll para frente e para trás: hero desaparece totalmente, corrente 3D da Home é uma verdadeira trajetória contínua e catálogo parece pergaminho sem distorcer thumbnails.
- Projeto individual: mockup inteiro dentro do espaço útil e sincronização verificável do vídeo com scroll (incluindo reverso); fallback estático funciona; voltar para projetos acessível junto ao dispositivo.
- Serviços enviam quatro mensagens diferentes ao WhatsApp confirmado (43 99136-4545).
- Header aponta `/projetos`; CTA redundante removido; eyebrow sem prefixos numéricos.
- Formulário visualmente destacado e válido; cards de benefícios distintivos; próximo projeto com miniatura.
- Revisar teclado, contraste, foco, leitor de tela, `prefers-reduced-motion`, touch, recursos e consumo de memória; evitar `ScrollTrigger` duplicado, memory leaks, scroll jank e scroll-lock acidental.
- Executar testes disponíveis, typecheck, lint, build e testar rotas/links. Documentar o que foi efetivamente testado, o que permaneceu pendente e uma síntese do resultado visual. Não inventar validações.
- Não alterar imagens, identidade ou textos aprovados que não sejam parte da mudança solicitada. Não commitar/push/merge sem permissão.
