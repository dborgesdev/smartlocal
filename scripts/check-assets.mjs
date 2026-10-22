import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import sharp from "sharp";
const seeds = JSON.parse(await readFile("src/data/projects.seed.json", "utf8"));
let count = 0;
for (const project of seeds) {
  for (const mode of ["desktop", "mobile"]) {
    const image = `public/portfolio/${project.slug}/${mode}.webp`;
    const metadata = await sharp(image).metadata();
    if (!metadata.width || !metadata.height)
      throw new Error(`Invalid image: ${image}`);
    const video = `public/portfolio/${project.slug}/${mode}.mp4`;
    const bytes = await readFile(video);
    if (
      bytes.toString("ascii", 4, 8) !== "ftyp" ||
      !bytes.includes(Buffer.from("moov"))
    )
      throw new Error(`Invalid MP4 container: ${video}`);
    if ((await stat(video)).size < 1000)
      throw new Error(`Empty video: ${video}`);
    count += 2;
  }
}
for (const path of [
  "dist/index.html",
  "dist/projetos/index.html",
  ...seeds.map((project) => `dist/projetos/${project.slug}/index.html`),
]) {
  const html = await readFile(path, "utf8");
  if ((html.match(/<h1[ >]/g) || []).length !== 1)
    throw new Error(`Expected one H1: ${path}`);
  if (
    !html.includes('rel="canonical"') ||
    !html.includes("og:image") ||
    !html.includes("data-route=")
  )
    throw new Error(`Missing SEO / hydration marker: ${path}`);
  if (!html.includes("Desenvolvido por Douglas Borges - Smart Local"))
    throw new Error(`Missing footer: ${path}`);
  for (const match of html.matchAll(
    /(?:src|href)="(\/(?:assets|brand|portfolio|og)\/[^"?#]+)"/g,
  )) {
    if (!existsSync(`dist${match[1]}`))
      throw new Error(`Broken asset ${match[1]} in ${path}`);
  }
}
console.log(
  `${count} arquivos de mídia válidos; 10 rotas com HTML, H1 único, metadados, hidratação, crédito e assets conferidos.`,
);
