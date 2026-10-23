import { useState, type ReactNode } from "react";
export default function DevicePreview({
  mode,
  poster,
  title,
  children,
  responsivePoster,
}: {
  mode: "desktop" | "mobile";
  poster: string | null;
  title: string;
  children?: ReactNode;
  responsivePoster?: string | null;
}) {
  const [failedPoster, setFailedPoster] = useState<string | null>(null);
  return (
    <div className={`viewer-stage ${mode}`}>
      <div className="device-frame">
        <div className="device-top" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="device-screen">
          {poster && poster !== failedPoster ? (
            <picture>
            {responsivePoster && <source media="(max-width: 767px), (max-width: 1023px) and (pointer: coarse) and (orientation: portrait)" srcSet={responsivePoster} />}
            <img
              src={poster}
              alt={`Captura ${mode} do projeto ${title}`}
              width={mode === "desktop" ? 1280 : 600}
              height={mode === "desktop" ? 800 : 1300}
              onError={() => setFailedPoster(poster)}
            /></picture>
          ) : (
            <div className="editorial-cover">
              <span className="eyebrow">
                SMART LOCAL / {mode.toUpperCase()}
              </span>
              <strong>{title}</strong>
              <span>Apresentação visual em preparação.</span>
            </div>
          )}
          {children}
        </div>
      </div>
      {mode === "desktop" && <div className="device-base" aria-hidden="true" />}
    </div>
  );
}
