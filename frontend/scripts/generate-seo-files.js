/* Generates public/sitemap.xml and public/robots.txt from env vars at build time.
   Pulls live slugs from the API when reachable, otherwise uses the known slugs. */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const SITE = (process.env.REACT_APP_SITE_URL || "https://nomyratravels.com").replace(/\/$/, "");
const API = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");

const STATIC_ROUTES = [
  ["/", "1.0"],
  ["/packages", "0.9"],
  ["/meghalaya", "0.9"],
  ["/arunachal", "0.9"],
  ["/assam", "0.8"],
  ["/experiences", "0.8"],
  ["/blog", "0.8"],
  ["/contact", "0.7"],
  ["/gallery", "0.6"],
  ["/about", "0.6"],
];

const FALLBACK = {
  packages: ["meghalaya-assam", "assam-arunachal", "custom-northeast-india"],
  destinations: [
    "shillong-police-bazaar", "nongriat-double-decker-living-root-bridge", "mawsynram",
    "sohra-cherrapunji", "dawki-umngot-river", "jowai-krang-shuri", "tawang", "sela-pass",
    "dirang", "bomdila", "ziro", "kaziranga", "assam-tea-country",
  ],
  experiences: [
    "camping-shnongpdeng", "thlu-chjawpaw-falls-trek", "mawkyrwat-monoliths",
    "infinity-pool-nognah", "nongriat-root-bridge-trek", "kaziranga-safari",
  ],
  blog: [
    "best-places-to-visit-in-meghalaya", "meghalaya-hidden-gems", "best-time-to-visit-meghalaya",
    "meghalaya-camping-guide", "things-to-do-in-dawki", "double-decker-living-root-bridge-trek-guide",
    "meghalaya-road-trip-guide", "arunachal-pradesh-travel-guide", "assam-arunachal-road-trip",
    "northeast-india-travel-guide", "best-offbeat-places-in-meghalaya", "south-west-khasi-hills-travel-guide",
  ],
};

const getJson = (url) =>
  new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          resolve(null);
        }
      });
    });
    req.on("error", () => resolve(null));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(null);
    });
  });

async function slugsFor(collection) {
  if (!API) return FALLBACK[collection];
  const data = await getJson(`${API}/api/${collection}`);
  const live = Array.isArray(data) ? data.map((d) => d.slug).filter(Boolean) : [];
  return live.length ? live : FALLBACK[collection];
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [...STATIC_ROUTES];

  for (const [collection, prefix] of [
    ["packages", "/packages/"],
    ["destinations", "/destinations/"],
    ["experiences", "/experiences/"],
    ["blog", "/blog/"],
  ]) {
    for (const slug of await slugsFor(collection)) urls.push([`${prefix}${slug}`, "0.7"]);
  }

  const body = urls
    .map(
      ([loc, priority]) =>
        `  <url><loc>${SITE}${loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
    )
    .join("\n");

  const out = path.join(__dirname, "..", "public");
  fs.writeFileSync(
    path.join(out, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  );
  fs.writeFileSync(
    path.join(out, "robots.txt"),
    `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${SITE}/sitemap.xml\n`
  );
  console.log(`SEO files generated for ${SITE} (${urls.length} URLs)`);
}

main();
