import seeds from "./projects.seed.json";
import type { Project } from "@/types/project";
/** Editorial source supplied by the owner; does not assert delivery or live URL verification. */
export type ProjectSeed = Omit<Project, "segment" | "color">;
export const projectSeeds: ProjectSeed[] = seeds;
