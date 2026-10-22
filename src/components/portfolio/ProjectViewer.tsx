import { useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, Play } from "lucide-react";
import type { Project } from "@/types/project";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export default function ProjectViewer({ project }: { project: Project }) {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const poster =
    mode === "desktop"
      ? project.media.desktopPoster
      : project.media.mobilePoster;
  const video =
    mode === "desktop" ? project.media.desktopVideo : project.media.mobileVideo;
  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) videoRef.current?.pause();
    });
    observer.observe(element);
    const pause = () => {
      if (document.hidden) videoRef.current?.pause();
    };
    document.addEventListener("visibilitychange", pause);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pause);
    };
  }, []);
  const switchMode = (next: "desktop" | "mobile") => {
    videoRef.current?.pause();
    setMode(next);
    setPlaying(false);
    setFailed(false);
    setPosterFailed(false);
  };
  return (
    <div className="project-viewer">
      <div className="viewer-toolbar">
        <div role="group" aria-label="Formato da apresentação">
          <button
            aria-pressed={mode === "desktop"}
            onClick={() => switchMode("desktop")}
          >
            <Monitor size={16} />
            Desktop
          </button>
          <button
            aria-pressed={mode === "mobile"}
            onClick={() => switchMode("mobile")}
          >
            <Smartphone size={16} />
            Mobile
          </button>
        </div>
        <span className="eyebrow">
          {playing ? "CAPTURA DO PROJETO" : "UM OLHAR MAIS DE PERTO"}
        </span>
      </div>
      <div className={`viewer-stage ${mode}`} ref={stageRef}>
        <div className="device-frame">
          <div className="device-top" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="device-screen">
            {playing && video && !failed ? (
              <video
                key={`${project.slug}-${mode}`}
                ref={videoRef}
                src={video}
                poster={poster || undefined}
                controls
                autoPlay
                muted
                playsInline
                loop={!reduced}
                preload="none"
                onError={() => {
                  setFailed(true);
                  setPlaying(false);
                }}
                aria-label={`Gravação ${mode} de ${project.title}`}
              />
            ) : poster && !posterFailed ? (
              <img
                src={poster}
                alt={`Captura ${mode} do projeto ${project.title}`}
                width={mode === "desktop" ? 1280 : 600}
                height={mode === "desktop" ? 800 : 1300}
                onError={() => setPosterFailed(true)}
              />
            ) : (
              <div className="editorial-cover">
                <span className="eyebrow">
                  SMART LOCAL / {mode.toUpperCase()}
                </span>
                <strong>{project.title}</strong>
                <span>Apresentação visual em preparação.</span>
              </div>
            )}
          </div>
        </div>
        {mode === "desktop" && (
          <div className="device-base" aria-hidden="true" />
        )}
      </div>
      <div className="viewer-foot">
        <p>
          {failed
            ? "Não foi possível reproduzir esta gravação. A captura estática continua disponível."
            : "Capturas do projeto. O formato da apresentação pode ser alternado acima."}
        </p>
        {video && !failed && !playing && (
          <button className="text-link" onClick={() => setPlaying(true)}>
            <Play size={16} />
            Reproduzir gravação
          </button>
        )}
      </div>
    </div>
  );
}
