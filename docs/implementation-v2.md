# Smart Local — implementação V2

23/10/2026. Refinamento da V1 conforme `smartlocal-refinamento-v2.md`, na branch existente `feat/smartlocal-rebranding`. Sem commit, push, PR, merge, deploy remoto ou alteração da main nesta rodada. Vetores, capturas, vídeos, seleção/ordem dos oito destaques e copy aprovada preservados.

## Coreografias

### Hero

Dispersão por palavra com direções, distância proporcional à viewport, rotação e escala variadas. Todas as palavras chegam a opacidade zero antes do fim da cena; textos de apoio e CTA desaparecem junto. Timeline reversível, pin limitado a 0,85 viewport no desktop. Mobile/touch e reduced motion mantêm leitura e navegação sem esse pin.

### Home: corrente contínua e grid

`FeaturedPortfolioMotion.tsx` substitui o antigo `PortfolioSpiral`. Os mesmos oito cards reais e seus links percorrem uma única hélice com defasagem temporal por índice; não há imagens inventadas, clones de sites ou oito fades de entrada. Posição, profundidade, rotação e escala vêm de `featuredPose` em `lib/portfolio-motion.ts`. Slots do grid são medidos apenas ao inicializar/recalcular layout.

Nos primeiros 68% da timeline, a corrente entra por baixo e sai por cima. Nos 32% finais, os cards convergem aos seus slots reais; a pose final é explicitamente normalizada para posição, rotação e profundidade zero e escala uniforme 1. O título entra e sai lateralmente; copy e legendas têm sua própria progressão. O pin acrescenta 2,15 viewports de rolagem nativa, sem interceptar wheel/touch. O grid mantém sua altura e ordem no DOM. Há atalho para os projetos e tratamento de foco que permite navegar pelos links sem atravessar toda a animação. Sem motion, o layout original em grid fica visível.

### Catálogo: pergaminho

`CatalogParchmentMotion.tsx` é independente da Home. As linhas seguem um percurso comum: perspectiva, deslocamento em arco e rotação X de -22° a +22°, passando por uma posição plana no centro. No perfil compacto, o arco é limitado a 6°. O movimento acompanha scroll para frente e para trás; não aplica fade, skew, scaleY desigual ou warp aos screenshots. Os wrappers das linhas recebem a transformação, e o estado com foco de teclado fica plano. Filtros recriam a cena com limpeza da anterior.

### Case: vídeo por scroll

`ProjectViewer` compõe `ProjectDemo`, `DevicePreview` e `VideoScrollMotion`. Apenas a fonte selecionada é montada e carregada quando a demonstração se aproxima da viewport. Poster permanece disponível durante carregamento. O pin só existe após um frame utilizável e duração finita: vídeo sem arquivo, erro ou duração inválida não gera um trecho vazio.

O painel tem altura baseada na área livre abaixo do header. Toolbar, dispositivo proporcional e link permanente para o catálogo ficam na mesma área visível. Container queries limitam as dimensões do dispositivo pela área real disponível, inclusive em 320px. O avanço do scroll é mapeado para `currentTime`, com vídeo pausado, sem controls/autoplay/loop concorrentes. O controlador agrupa atualizações em RAF, espera o seek atual terminar e aplica o último destino, inclusive no reverso. Não há loop de renderização contínuo em repouso.

Carregamento inicial sem frame por 20s ou seek travado por 12s retorna ao poster e remove o pin. Troca de formato/rota/modo desmonta listeners, observer, timer, RAF e ScrollTrigger. Há modo manual com controles; reduced motion usa esse modo sem pin nem autoplay. Um link para detalhes permite sair da etapa de demonstração. O próximo projeto agora tem sua miniatura real, com fallback editorial.

## Composição, conteúdo e acessibilidade

- Projetos aponta para `/projetos` no header, drawer e footer. Removidos o CTA redundante da seleção e a entrada duplicada do drawer.
- Eyebrows de seção não têm mais prefixos numéricos; ordinais úteis de projetos/serviços foram preservados.
- Cada serviço é um link completo com mensagem própria codificada pelo utilitário WhatsApp, hover, foco e alvo confortável.
- Formulário com painel contrastante, borda, sombra discreta, raio consistente, campos amplos e CTA de alto contraste. Motion de entrada próprio sem opacity zero ou atraso de acesso. Erros marcam somente os campos inválidos e direcionam o foco ao primeiro deles.
- Benefícios mantêm vidro/tilt/travessia e têm quatro vetores decorativos distintos: identidade, dispositivos, checklist e crescimento. CSS do objeto repetido anterior foi removido.
- Microcopy usual >=12px; categorias 13px, controles/navegação 14–15px, corpo principal 15–16px, inputs 16px. Títulos monumentais foram preservados. Overrides específicos estão em `styles/refinements-v2.css`.
- Foco/teclado, labels, alt, filtros com estado anunciado, redução de movimento e fallback sem inicialização de animação preservados. Sincronização de hashes cessa quando o usuário começa a interagir; pin de vídeo também comunica alterações de layout.
- ESLint ignora a pasta temporária `.prerender`, evitando a corrida entre lint e build durante criação/remoção dessa pasta.

## Preview e validação

Comandos npm e pré-render continuam os mesmos. Resultados e limites dos checks desta rodada estão em `validation-v2.md`. Os relatórios V1 são registros históricos; não representam o comportamento novo dos vídeos ou das coreografias.
