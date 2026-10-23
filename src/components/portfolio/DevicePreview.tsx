import { useState, type ReactNode } from "react";
export default function DevicePreview({
  mode,
  poster,
  title,
  children,
}: {
  mode: "desktop" | "mobile";
  poster: string | null;
  title: string;
  children?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`viewer-stage ${mode}`}>
      <div className="device-frame">
        <div className="device-top" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="device-screen">
          {poster && !failed ? (
            <img
              src={poster}
              alt={`Captura ${mode} do projeto ${title}`}
              width={mode === "desktop" ? 1280 : 600}
              height={mode === "desktop" ? 800 : 1300}
              onError={() => setFailed(true)}
            />
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
