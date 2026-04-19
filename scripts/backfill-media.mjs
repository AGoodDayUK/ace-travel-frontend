/**
 * Backfills all existing image URLs from tours, deals, reviews, blogs, and
 * site settings into the media table so they appear in the CMS Media Library.
 *
 * Safe to run multiple times — skips URLs that are already in the media table.
 */

import { createConnection } from "mysql2/promise";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

// ── Connect ──────────────────────────────────────────────────────────────────
const connection = await createConnection(process.env.DATABASE_URL);

async function query(sql, params = []) {
  const [rows] = await connection.execute(sql, params);
  return rows;
}

// ── Collect all image URLs ────────────────────────────────────────────────────
const imageUrls = new Map(); // url -> { originalName, altText }

function addUrl(url, name, alt) {
  if (!url || typeof url !== "string") return;
  url = url.trim();
  if (!url.startsWith("http")) return;
  if (!imageUrls.has(url)) {
    imageUrls.set(url, { originalName: name || "image", altText: alt || name || "image" });
  }
}

// Tours
const allTours = await query("SELECT name, heroImage, gallery FROM tours");
for (const t of allTours) {
  if (t.heroImage) addUrl(t.heroImage, `${t.name} - Hero`, `${t.name} hero image`);
  let gallery = [];
  try { gallery = JSON.parse(t.gallery || "[]"); } catch {}
  for (let i = 0; i < gallery.length; i++) {
    const g = gallery[i];
    const imgUrl = typeof g === "string" ? g : (g?.url || g?.src);
    if (imgUrl) addUrl(imgUrl, `${t.name} - Gallery ${i + 1}`, `${t.name} gallery image ${i + 1}`);
  }
}

// Deals
const allDeals = await query("SELECT title, image FROM deals");
for (const d of allDeals) {
  if (d.image) addUrl(d.image, `${d.title} - Deal Image`, `${d.title} deal image`);
}

// Reviews
const allReviews = await query("SELECT authorName, authorPhoto FROM reviews");
for (const r of allReviews) {
  if (r.authorPhoto) addUrl(r.authorPhoto, `${r.authorName} - Avatar`, `${r.authorName} reviewer photo`);
}

// Blogs/Vlogs
const allBlogs = await query("SELECT title, coverImage FROM blogs_vlogs");
for (const b of allBlogs) {
  if (b.coverImage) addUrl(b.coverImage, `${b.title} - Cover`, `${b.title} cover image`);
}

// Site settings (any value that looks like an image URL)
const allSettings = await query("SELECT `key`, value FROM site_settings");
for (const s of allSettings) {
  if (s.value && s.value.startsWith("http") && /\.(jpg|jpeg|png|webp|gif|svg|avif)/i.test(s.value)) {
    addUrl(s.value, `Settings: ${s.key}`, `Site setting image: ${s.key}`);
  }
}

console.log(`Found ${imageUrls.size} unique image URLs across all tables`);

// ── Get existing media URLs to avoid duplicates ───────────────────────────────
const existingMedia = await query("SELECT url FROM media");
const existingUrls = new Set(existingMedia.map(m => m.url));
console.log(`Media table already has ${existingUrls.size} entries`);

// ── Insert missing images ─────────────────────────────────────────────────────
let inserted = 0;
let skipped = 0;

for (const [url, meta] of imageUrls) {
  if (existingUrls.has(url)) {
    skipped++;
    continue;
  }

  // Guess mime type from extension
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase() || "jpg";
  const mimeMap = {
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
    webp: "image/webp", gif: "image/gif", svg: "image/svg+xml", avif: "image/avif",
  };
  const mimeType = mimeMap[ext] || "image/jpeg";

  // Extract a clean filename from the URL
  let filename = "image";
  try {
    const urlPath = new URL(url).pathname;
    filename = urlPath.split("/").pop() || "image";
  } catch {}

  await query(
    `INSERT INTO media (filename, originalName, url, s3Key, mimeType, size, altText, createdAt)
     VALUES (?, ?, ?, ?, ?, 0, ?, NOW())`,
    [filename, meta.originalName, url, filename, mimeType, meta.altText]
  );

  inserted++;
}

console.log(`✅ Inserted ${inserted} new images, skipped ${skipped} already present`);
await connection.end();
