import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import type { Project } from "@/types/project";
import ProjectDemo from "./ProjectDemo";
export default function ProjectViewer({ project }: { project: Project }) {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  return (
    <ProjectDemo
      key={`${project.slug}-${mode}`}
      mode={mode}
      title={project.title}
      poster={
        mode === "desktop"
          ? project.media.desktopPoster
          : project.media.mobilePoster
      }
      source={
        mode === "desktop"
          ? project.media.desktopVideo
          : project.media.mobileVideo
      }
      toolbar={
        <div role="group" aria-label="Formato da apresentação">
          <button
            aria-pressed={mode === "desktop"}
            onClick={() => setMode("desktop")}
          >
            <Monitor size={16} />
            Desktop
          </button>
          <button
            aria-pressed={mode === "mobile"}
            onClick={() => setMode("mobile")}
          >
            <Smartphone size={16} />
            Mobile
          </button>
        </div>
      }
    />
  );
}
