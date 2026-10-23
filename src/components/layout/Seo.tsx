import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function Seo({
  title,
  description,
  image = "/og/smartlocal.webp",
  notFound = false,
}: {
  title: string;
  description: string;
  image?: string;
  notFound?: boolean;
}) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    const url = `https://smartlocal.com.br${pathname === "/" ? "/" : pathname}`;
    const values = {
      description,
      "og:title": title,
      "og:description": description,
      "og:url": url,
      "og:image": `https://smartlocal.com.br${image}`,
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": `https://smartlocal.com.br${image}`,
      robots: notFound ? "noindex, follow" : "index, follow",
    };
    Object.entries(values).forEach(([key, content]) => {
      const attribute = key.startsWith("og:") ? "property" : "name";
      let meta = document.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, key);
        document.head.append(meta);
      }
      meta.content = content;
    });
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", url);
  }, [title, description, image, pathname, notFound]);
  return null;
}
