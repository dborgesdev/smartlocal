import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import WhatsAppFloat from "./WhatsAppFloat";
import Seo from "./Seo";
export default function Page({
  children,
  title,
  description,
  image,
  notFound = false,
}: {
  children: ReactNode;
  title: string;
  description: string;
  image?: string;
  notFound?: boolean;
}) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    let active = true;
    const alignHash = () => {
      if (active && hash)
        document.getElementById(hash.slice(1))?.scrollIntoView();
    };
    // Pin spacing and local fonts may finish after the route commits. Resync only
    // until the user starts navigating; never counteract wheel/touch/keyboard input.
    const release = () => {
      active = false;
    };
    if (hash) {
      window.addEventListener("smartlocal:layout-ready", alignHash);
      window.addEventListener("wheel", release, { passive: true, once: true });
      window.addEventListener("touchstart", release, {
        passive: true,
        once: true,
      });
      window.addEventListener("keydown", release, { once: true });
      document.fonts.ready.then(alignHash);
    }
    const frame = requestAnimationFrame(() => {
      if (hash) alignHash();
      else {
        window.scrollTo({ top: 0, behavior: "instant" });
        document.getElementById("conteudo")?.focus({ preventScroll: true });
      }
    });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("smartlocal:layout-ready", alignHash);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
  }, [pathname, hash]);
  return (
    <>
      <Seo
        title={title}
        description={description}
        image={image}
        notFound={notFound}
      />
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <WhatsAppFloat />
    </>
  );
}
