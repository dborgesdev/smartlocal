import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import VideoScrollMotion from "@/components/effects/VideoScrollMotion";
import DevicePreview from "./DevicePreview";

export default function ProjectDemo({
  mode,
  poster,
  source,
  title,
  toolbar,
  initializing = false,
  mobilePoster,
  website,
}: {
  mode: "desktop" | "mobile";
  poster: string | null;
  source: string | null;
  title: string;
  toolbar: ReactNode;
  initializing?: boolean;
  mobilePoster?: string | null;
  website?: string | null;
}) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const progress = useRef<HTMLProgressElement>(null);
  const percentage = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [requested, setRequested] = useState(false);
  const [media, setMedia] = useState({ source, ready: false, failed: false, duration: 0 });
  const ready = media.source === source && media.ready;
  const failed = media.source === source && media.failed;
  const duration = media.source === source ? media.duration : 0;
  const [hasPlayable, setHasPlayable] = useState(false);
  const [manual, setManual] = useState(false);
  const controls = reduced || manual;
  const unavailable = useCallback(() => {
    setMedia({ source, ready: false, failed: true, duration: 0 });
  }, [source]);
  useEffect(() => { if (ready) setHasPlayable(true); }, [ready]);
  useEffect(() => {
    if (!source || !root.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRequested(true);
      },
      { rootMargin: "250px" },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [source]);
  useEffect(() => {
    if (!source || !requested || ready || failed) return;
    const timeout = window.setTimeout(unavailable, 20000);
    return () => clearTimeout(timeout);
  }, [requested, ready, failed, source, unavailable]);
  useEffect(() => {
    const element = video.current;
    const pause = () => {
      if (document.hidden) element?.pause();
    };
    document.addEventListener("visibilitychange", pause);
    return () => {
      element?.pause();
      document.removeEventListener("visibilitychange", pause);
    };
  }, [requested, failed, source]);
  return (
    <div className="project-viewer" data-initializing={initializing || undefined} ref={root}>
      <div className="viewer-sticky" ref={panel}>
        <div className="viewer-toolbar">
          {toolbar}
          <span className="eyebrow">UM OLHAR MAIS DE PERTO</span>
        </div>
        <DevicePreview mode={mode} poster={poster} title={title} responsivePoster={initializing ? mobilePoster : undefined}>
          {source && requested && !failed && (
            <video
              ref={video}
              key={source}
              className={ready ? "demo-video is-ready" : "demo-video"}
              src={source}
              poster={poster || undefined}
              muted
              playsInline
              controls={controls}
              preload="auto"
              onLoadedMetadata={(event) => {
                const length = event.currentTarget.duration;
                if (Number.isFinite(length) && length > 0) setMedia((current) => ({ source, ready: current.source === source && current.ready, failed: false, duration: length }));
                else unavailable();
              }}
              onLoadedData={() => setMedia((current) => ({ ...current, source, ready: true }))}
              onError={unavailable}
              aria-label={`Gravação ${mode} de ${title}`}
            />
          )}
        </DevicePreview>
        <div className="viewer-foot">
          <div className="demo-status">
            <p id="demo-instructions" role="status">
              {!source
                ? "Captura estática do projeto."
                : failed
                  ? "A gravação está indisponível. Explore a captura estática."
                  : !requested || !ready
                    ? "Preparando demonstração. A captura estática já está disponível."
                    : controls
                      ? "Use os controles para assistir à gravação."
                      : "Role para explorar o projeto. Volte para rever."}
            </p>
            {hasPlayable && !controls && !failed && (
              <div className="demo-progress">
                <progress
                  ref={progress}
                  max={1}
                  value={0}
                  aria-label="Progresso da demonstração"
                />
                <span ref={percentage} aria-hidden="true">
                  0%
                </span>
              </div>
            )}
          </div>
          <div className="demo-actions">
            {website && <a className="button button-coral demo-live" href={website} target="_blank" rel="noopener noreferrer">Ver site ao vivo ↗</a>}
            <Link className="text-link" to="/projetos">
              <ArrowLeft size={16} />
              Ver todos os projetos
            </Link>
            <div className="demo-secondary">
              {source && !failed && (
                <button
                  type="button"
                  onClick={() => setManual((value) => !value)}
                  disabled={reduced}
                  aria-pressed={controls}
                >
                  {controls ? "Vídeo com controles" : "Assistir com controles"}
                </button>
              )}
              <a href="#detalhes-do-projeto">Ir para detalhes ↓</a>
            </div>
          </div>
        </div>
      </div>
      <VideoScrollMotion
        target={root}
        panel={panel}
        video={video}
        progress={progress}
        percentage={percentage}
        source={source}
        ready={ready}
        duration={duration}
        enabled={hasPlayable && Boolean(source) && !failed && !controls}
        onUnavailable={unavailable}
      />
    </div>
  );
}
