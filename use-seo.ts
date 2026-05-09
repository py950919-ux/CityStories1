import { useEffect } from "react";

interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "place";
}

const SITE_NAME = "CityStories.in";
const SITE_TAGLINE = "Real stories from real people in every city.";
const DEFAULT_DESCRIPTION =
  "India's first local-knowledge travel guide. Real recommendations from locals for food, hidden temples, cafes and slow mornings in tier-2 and tier-3 cities.";
const DEFAULT_IMAGE = "https://citystories.in/og-cover.jpg";

function setMeta(attr: "name" | "property", key: string, value: string) {
  if (!value) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo(opts: SeoOptions) {
  useEffect(() => {
    const fullTitle = opts.title
      ? `${opts.title} · ${SITE_NAME}`
      : `${SITE_NAME} — ${SITE_TAGLINE}`;
    const description = opts.description || DEFAULT_DESCRIPTION;
    const image = opts.image || DEFAULT_IMAGE;
    const url =
      opts.url ||
      (typeof window !== "undefined" ? window.location.href : "https://citystories.in/");
    const type = opts.type || "website";

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
    setLink("canonical", url);
  }, [opts.title, opts.description, opts.image, opts.url, opts.type]);
}

export const SITE_META = { SITE_NAME, SITE_TAGLINE, DEFAULT_DESCRIPTION };
