/**
 * extract-all-images.mjs
 *
 * Scans every .tsx / .ts / .js file in client/src/ for image URLs (http/https
 * pointing to image files, or local /public paths), then also queries the DB
 * for any image URLs stored in tours, deals, reviews, blogs_vlogs, and settings.
 *
 * Outputs a deduplicated JSON array to stdout.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env"), quiet: true });

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../client/src");
const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../client/public");

// ── 1. Extract from source files ─────────────────────────────────────────────

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|webp|png|gif|svg|avif)(\?[^"'`\s]*)?$/i;
const URL_PATTERN = /["'`](https?:\/\/[^"'`\s]+\.(jpg|jpeg|webp|png|gif|svg|avif)(\?[^"'`\s]*)?)/gi;
const LOCAL_PATH_PATTERN = /["'`](\/[a-zA-Z0-9_\-./]+\.(jpg|jpeg|webp|png|gif|svg|avif))/gi;

function walkDir(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(full));
    } else if (entry.isFile() && /\.(tsx?|jsx?|mjs)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const sourceUrls = new Set();

for (const file of walkDir(SRC_DIR)) {
  const content = fs.readFileSync(file, "utf8");

  // Remote image URLs
  for (const match of content.matchAll(URL_PATTERN)) {
    sourceUrls.add(match[1]);
  }

  // Local /public paths — convert to absolute CDN-style path
  for (const match of content.matchAll(LOCAL_PATH_PATTERN)) {
    const localPath = match[1];
    // Only include if the file actually exists in public/
    const absPath = path.join(PUBLIC_DIR, localPath);
    if (fs.existsSync(absPath)) {
      // Store as relative path — the backfill script will resolve the URL
      sourceUrls.add(`__LOCAL__${localPath}`);
    }
  }
}

console.error(`Found ${sourceUrls.size} unique image references in source files`);

// ── 2. Extract from database ──────────────────────────────────────────────────

const db = await mysql.createConnection(process.env.DATABASE_URL);

const dbUrls = new Set();

// Helper to extract all string values that look like image URLs from a JSON blob
function extractFromJson(jsonStr) {
  if (!jsonStr) return;
  try {
    const obj = typeof jsonStr === "string" ? JSON.parse(jsonStr) : jsonStr;
    const str = JSON.stringify(obj);
    for (const match of str.matchAll(/"(https?:\/\/[^"]+\.(jpg|jpeg|webp|png|gif|svg|avif)[^"]*)"/gi)) {
      dbUrls.add(match[1]);
    }
  } catch {
    // not JSON
    if (typeof jsonStr === "string" && IMAGE_EXTENSIONS.test(jsonStr)) {
      dbUrls.add(jsonStr);
    }
  }
}

// Tours
const [tours] = await db.query("SELECT heroImage, gallery, highlights, itinerary FROM tours");
for (const t of tours) {
  if (t.heroImage) dbUrls.add(t.heroImage);
  extractFromJson(t.gallery);
  extractFromJson(t.highlights);
  extractFromJson(t.itinerary);
}

// Deals
const [deals] = await db.query("SELECT image FROM deals");
for (const d of deals) {
  if (d.image) dbUrls.add(d.image);
}

// Reviews
const [reviews] = await db.query("SELECT authorPhoto FROM reviews");
for (const r of reviews) {
  if (r.authorPhoto) dbUrls.add(r.authorPhoto);
}

// Blogs / Vlogs
const [blogs] = await db.query("SELECT coverImage FROM blogs_vlogs");
for (const b of blogs) {
  if (b.coverImage) dbUrls.add(b.coverImage);
}

// Site settings (any value that looks like an image URL)
const [settings] = await db.query("SELECT `key`, value FROM site_settings");
for (const s of settings) {
  if (s.value && IMAGE_EXTENSIONS.test(s.value)) {
    dbUrls.add(s.value);
  }
}

// Existing media table (so we can deduplicate)
const [existing] = await db.query("SELECT url FROM media");
const existingUrls = new Set(existing.map(r => r.url));

await db.end();

console.error(`Found ${dbUrls.size} unique image references in database`);
console.error(`Existing media table has ${existingUrls.size} entries`);

// ── 3. Merge and output ───────────────────────────────────────────────────────

const all = new Set([...sourceUrls, ...dbUrls]);
const missing = [...all].filter(u => !existingUrls.has(u));

console.error(`Total unique images across site: ${all.size}`);
console.error(`Missing from media table: ${missing.length}`);

// Output as JSON for the backfill script
console.log(JSON.stringify(missing, null, 2));
