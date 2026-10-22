import { projectSeeds } from "./projects.seed";
import type { Project } from "@/types/project";
// Captures supplied with the package and visually inspected. Live URLs require separate verification.
const details = [
  ["Tecnologia aeronáutica", "#243949"],
  ["Engenharia e incorporação", "#353128"],
  ["Desenvolvimento empresarial", "#234334"],
  ["Transporte executivo", "#3c3328"],
  ["Mercado imobiliário", "#373426"],
  ["Moda feminina", "#563d59"],
  ["Beleza e perfumaria", "#8b765a"],
  ["Rádio e entretenimento", "#a42c26"],
];
export const projects: Project[] = projectSeeds
  .map((seed, index) => ({
    ...seed,
    segment: details[index][0],
    color: details[index][1],
    media: {
      desktopPoster: `/portfolio/${seed.slug}/desktop.webp`,
      mobilePoster: `/portfolio/${seed.slug}/mobile.webp`,
      desktopVideo: `/portfolio/${seed.slug}/desktop.mp4`,
      mobileVideo: `/portfolio/${seed.slug}/mobile.mp4`,
    },
    status: "media-supplied",
  }))
  .sort((a, b) => a.order - b.order);
