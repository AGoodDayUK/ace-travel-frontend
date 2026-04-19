/**
 * backfill-all-media.mjs
 *
 * Reads the missing-images list produced by extract-all-images.mjs and inserts
 * every entry into the media table, skipping any that already exist.
 *
 * Run:
 *   node scripts/extract-all-images.mjs 2>/dev/null | node scripts/backfill-all-media.mjs
 * Or pipe directly:
 *   node scripts/extract-all-images.mjs 2>/dev/null > /tmp/missing.json && node scripts/backfill-all-media.mjs /tmp/missing.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env"), quiet: true });

const inputFile = process.argv[2] || "/tmp/missing-images.json";
const raw = fs.readFileSync(inputFile, "utf8");
const urls = JSON.parse(raw);

const db = await mysql.createConnection(process.env.DATABASE_URL);

// Get existing URLs to avoid duplicates
const [existing] = await db.query("SELECT url FROM media");
const existingSet = new Set(existing.map(r => r.url));

let inserted = 0;
let skipped = 0;

for (const url of urls) {
  // Skip local path markers — these are served from /public, not CDN-uploaded
  if (url.startsWith("__LOCAL__")) {
    skipped++;
    continue;
  }

  if (existingSet.has(url)) {
    skipped++;
    continue;
  }

  // Derive a filename from the URL
  const urlPath = new URL(url).pathname;
  const filename = path.basename(urlPath) || "image";
  const ext = path.extname(filename).toLowerCase();

  // Determine MIME type from extension
  const mimeMap = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".avif": "image/avif",
  };
  const mimeType = mimeMap[ext] || "image/jpeg";

  // Derive a human-readable alt text from the filename
  const altText = filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .trim();

  try {
    await db.query(
      `INSERT INTO media (filename, originalName, url, s3Key, mimeType, size, altText, uploadedBy, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NOW())`,
      [filename, filename, url, url, mimeType, 0, altText]
    );
    existingSet.add(url);
    inserted++;
    if (inserted % 10 === 0) console.log(`Inserted ${inserted} so far...`);
  } catch (err) {
    console.error(`Failed to insert ${url}: ${err.message}`);
  }
}

await db.end();

console.log(`\nDone! Inserted: ${inserted}, Skipped: ${skipped}`);
console.log(`Total media entries now: ${existingSet.size}`);
