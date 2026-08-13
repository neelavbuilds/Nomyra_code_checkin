import { useEffect } from "react";
import { SITE } from "@/lib/site";

const upsert = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attrs.tag || "meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (k !== "tag" && v != null) el.setAttribute(k, v);
  });
  return el;
};

/** Sets title, meta description, canonical, Open Graph tags and JSON-LD schema. */
export default function Seo({ title, description, image, path = "", schema, noindex = false }) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const url = `${window.location.origin}${path}`;
  const desc = description || SITE.statement;
  const img = image || "";

  useEffect(() => {
    document.title = fullTitle;
    upsert('meta[name="description"]', { tag: "meta", name: "description", content: desc });
    upsert('meta[name="robots"]', { tag: "meta", name: "robots", content: noindex ? "noindex,nofollow" : "index,follow" });
    upsert('link[rel="canonical"]', { tag: "link", rel: "canonical", href: url });
    upsert('meta[property="og:title"]', { tag: "meta", property: "og:title", content: fullTitle });
    upsert('meta[property="og:description"]', { tag: "meta", property: "og:description", content: desc });
    upsert('meta[property="og:type"]', { tag: "meta", property: "og:type", content: "website" });
    upsert('meta[property="og:site_name"]', { tag: "meta", property: "og:site_name", content: SITE.name });
    upsert('meta[property="og:url"]', { tag: "meta", property: "og:url", content: url });
    if (img) upsert('meta[property="og:image"]', { tag: "meta", property: "og:image", content: img });
    upsert('meta[name="twitter:card"]', { tag: "meta", name: "twitter:card", content: "summary_large_image" });
    upsert('meta[name="twitter:title"]', { tag: "meta", name: "twitter:title", content: fullTitle });
    upsert('meta[name="twitter:description"]', { tag: "meta", name: "twitter:description", content: desc });
    if (img) upsert('meta[name="twitter:image"]', { tag: "meta", name: "twitter:image", content: img });

    const id = "nomyra-page-schema";
    document.getElementById(id)?.remove();
    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [fullTitle, desc, url, img, schema, noindex]);

  return null;
}
