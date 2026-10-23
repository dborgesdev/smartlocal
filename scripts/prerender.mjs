import { spawnSync } from "node:child_process";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
const root = process.cwd();
const temporary = resolve(root, ".prerender");
const build = spawnSync(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    "build",
    "--ssr",
    "src/entry-server.tsx",
    "--outDir",
    temporary,
  ],
  { stdio: "inherit" },
);
if (build.status !== 0) process.exit(build.status || 1);
const { render } = await import(
  pathToFileURL(join(temporary, "entry-server.js")).href
);
const template = await readFile("dist/index.html", "utf8");
const seeds = JSON.parse(await readFile("src/data/projects.seed.json", "utf8"));
const description =
  "Sites institucionais, landing pages e lojas virtuais com design, desempenho e experiência sob medida. Conheça os projetos da Smart Local e solicite um orçamento.";
const routes = [
  {
    path: "/",
    title: "Smart Local | Criação de Sites Profissionais e Lojas Virtuais",
    description,
  },
  {
    path: "/projetos",
    title: "Projetos e Portfólio | Smart Local",
    description:
      "Explore experiências digitais desenvolvidas para diferentes marcas, negócios e objetivos.",
  },
  ...seeds.map((project) => ({
    path: `/projetos/${project.slug}`,
    title: `${project.title} | Portfólio Smart Local`,
    description: `Conheça a apresentação do projeto ${project.title} no portfólio da Smart Local. Design e desenvolvimento web.`,
    image: `/portfolio/${project.slug}/desktop.webp`,
  })),
  {
    path: "/404",
    title: "Página não encontrada | Smart Local",
    description:
      "Esta página não foi encontrada. Conheça os projetos da Smart Local.",
    notFound: true,
  },
];
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
for (const route of routes) {
  let html = template
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-route="${route.path}">${await render(route.path)}</div>`,
    )
    .replace(/<title>.*?<\/title>/, `<title>${escape(route.title)}</title>`);
  const values = {
    description: route.description,
    "og:title": route.title,
    "og:description": route.description,
    "og:url": `https://smartlocal.com.br${route.path}`,
    "og:image": `https://smartlocal.com.br${route.image || "/og/smartlocal.webp"}`,
    "twitter:title": route.title,
    "twitter:description": route.description,
    "twitter:image": `https://smartlocal.com.br${route.image || "/og/smartlocal.webp"}`,
    robots: route.notFound ? "noindex, follow" : "index, follow",
  };
  for (const [name, content] of Object.entries(values)) {
    const attribute = name.startsWith("og:") ? "property" : "name";
    html = html.replace(
      new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*/?>`),
      `<meta ${attribute}="${name}" content="${escape(content)}" />`,
    );
  }
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="https://smartlocal.com.br${route.path}" />`,
  );
  const output =
    route.path === "/" ? "dist" : join("dist", route.path.slice(1));
  await mkdir(output, { recursive: true });
  await writeFile(join(output, "index.html"), html);
}
// This directory is a build-only folder at a verified path inside the repository.
if (temporary !== join(root, ".prerender"))
  throw new Error("Unexpected temporary path");
await rm(temporary, { recursive: true, force: true });
console.log(`Pré-render: ${routes.length} páginas HTML completas.`);
