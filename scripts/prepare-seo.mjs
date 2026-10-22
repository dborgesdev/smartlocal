import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";
const seeds = JSON.parse(await readFile("src/data/projects.seed.json", "utf8"));
const routes = [
  "/",
  "/projetos",
  ...seeds.map((project) => `/projetos/${project.slug}`),
];
await writeFile(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((path) => `<url><loc>https://smartlocal.com.br${path}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  "public/robots.txt",
  "User-agent: *\nAllow: /\nSitemap: https://smartlocal.com.br/sitemap.xml\n",
);
await mkdir("public/og", { recursive: true });
const symbol = (
  await readFile("public/brand/symbol-color.svg", "utf8")
).replace("<svg ", '<svg x="70" y="55" width="80" height="80" ');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#14161B"/><circle cx="1080" cy="580" r="340" fill="#465BEE" opacity=".15"/>${symbol}<text x="160" y="110" font-family="Arial,sans-serif" font-size="45" font-weight="bold" letter-spacing="-2" fill="#F2F0EB">smartlocal</text><text x="80" y="270" font-family="Arial,sans-serif" font-size="70" fill="#F2F0EB" letter-spacing="-3">Sua marca merece</text><text x="80" y="355" font-family="Arial,sans-serif" font-size="70" fill="#F2F0EB" letter-spacing="-3">mais que um site.</text><text x="80" y="440" font-family="Arial,sans-serif" font-size="70" fill="#FF6046" letter-spacing="-3">Merece impressionar.</text><text x="80" y="555" font-family="Arial,sans-serif" font-size="18" fill="#BFC5D0" letter-spacing="3">CREATIVE WEB DEVELOPMENT / BEYOND THE ORDINARY</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/og/smartlocal.png");
console.log(`SEO: ${routes.length} rotas no sitemap e imagem OG gerada.`);
