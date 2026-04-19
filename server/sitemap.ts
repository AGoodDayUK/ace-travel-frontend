import { Router } from "express";
import { listTours, listBlogsVlogsPublic } from "./cms-db";

const router = Router();

// Static pages with their priorities and change frequencies
const STATIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/tours", priority: "0.9", changefreq: "weekly" },
  { path: "/destinations", priority: "0.9", changefreq: "weekly" },
  { path: "/deals", priority: "0.8", changefreq: "weekly" },
  { path: "/how-it-works", priority: "0.7", changefreq: "monthly" },
  { path: "/reviews", priority: "0.8", changefreq: "weekly" },
  { path: "/blogs-vlogs", priority: "0.7", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/faq", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/payments", priority: "0.6", changefreq: "monthly" },
  { path: "/scuba-diving", priority: "0.6", changefreq: "monthly" },
  { path: "/flight-support", priority: "0.6", changefreq: "monthly" },
  { path: "/terms", priority: "0.4", changefreq: "yearly" },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrl(baseUrl: string, path: string): string {
  // Ensure no double slashes
  const base = baseUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return escapeXml(`${base}${p}`);
}

router.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl =
      process.env.SITE_URL ||
      `${req.protocol}://${req.get("host")}`;

    // Fetch dynamic data
    const [tours, blogs] = await Promise.all([
      listTours(),
      listBlogsVlogsPublic(),
    ]);

    const today = new Date().toISOString().split("T")[0];

    const urlEntries: string[] = [];

    // Static pages
    for (const page of STATIC_PAGES) {
      urlEntries.push(`  <url>
    <loc>${buildUrl(baseUrl, page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
    }

    // Tour pages — only published tours
    for (const tour of tours) {
      if (tour.published && tour.slug) {
        urlEntries.push(`  <url>
    <loc>${buildUrl(baseUrl, `/tour/${tour.slug}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`);
      }
    }

    // Blog/Vlog pages — only published posts with a slug
    for (const post of blogs) {
      if (post.published && post.slug) {
        urlEntries.push(`  <url>
    <loc>${buildUrl(baseUrl, `/blog/${post.slug}`)}</loc>
    <lastmod>${
      post.publishedAt
        ? new Date(post.publishedAt).toISOString().split("T")[0]
        : today
    }</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries.join("\n")}
</urlset>`;

    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=3600"); // cache 1 hour
    res.send(xml);
  } catch (err) {
    console.error("[sitemap] error:", err);
    res.status(500).send("Failed to generate sitemap");
  }
});

// robots.txt — references the sitemap
router.get("/robots.txt", (req, res) => {
  const baseUrl =
    process.env.SITE_URL ||
    `${req.protocol}://${req.get("host")}`;

  const txt = `User-agent: *
Allow: /

# Disallow admin area
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml
`;

  res.set("Content-Type", "text/plain; charset=utf-8");
  res.set("Cache-Control", "public, max-age=86400"); // cache 24 hours
  res.send(txt);
});

export { router as sitemapRouter };
