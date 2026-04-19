import { createConnection } from "mysql2/promise";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

const vlogs = [
  { youtube_id: "Z20HYbB5diQ", title: "Come With Me to Bali — First Glimpse + Meeting My Tour Group", destination: "Bali", author: "Libby" },
  { youtube_id: "Wv-ILYoCkJ8", title: "Pack With Me for Bali! Travel Tips, Essentials & How I Planned It With ACE", destination: "Bali", author: "Libby" },
  { youtube_id: "1EN-j0gGI00", title: "Bamboo River Rafting & Night Time Jungle Walk", destination: "Bali", author: "Libby" },
  { youtube_id: "YqCRJJhommw", title: "Morning Jungle Safari & Shopping!", destination: "Bali", author: "Libby" },
  { youtube_id: "wCHWVWygIiE", title: "Pig Island, Snorkelling & Partying", destination: "Bali", author: "Libby" },
  { youtube_id: "HOIdsTgG_tc", title: "Koh Samui Ziplining", destination: "Thailand", author: "Libby" },
  { youtube_id: "1kOWBIAfLhU", title: "Koh Phangan & Puk's Palace", destination: "Thailand", author: "Libby" },
  { youtube_id: "1TOb_0YkIzc", title: "Quad Biking & Full Moon Party", destination: "Thailand", author: "Libby" },
  { youtube_id: "DqqBtdb0V5M", title: "Snorkelling in Koh Tao", destination: "Thailand", author: "Libby" },
  { youtube_id: "_LZ7QDw7ibk", title: "Koh Tao. Getting Inked.", destination: "Thailand", author: "Libby" },
  { youtube_id: "Fp6Y3A3fV-s", title: "Freedom Beach in Phuket & a Very Special Moment!", destination: "Thailand", author: "Libby" },
  { youtube_id: "J3kCYte0bD8", title: "Final Day in Thailand With ACE Travel Experiences", destination: "Thailand", author: "Libby" },
];

async function main() {
  const conn = await createConnection(process.env.DATABASE_URL);
  console.log("Connected to database");

  // Check if vlogs already exist
  const [existing] = await conn.execute("SELECT COUNT(*) as count FROM blogs_vlogs WHERE type = 'vlog'");
  const count = existing[0].count;
  if (count > 0) {
    console.log(`Found ${count} existing vlogs — skipping seed to avoid duplicates.`);
    await conn.end();
    return;
  }

  for (let i = 0; i < vlogs.length; i++) {
    const v = vlogs[i];
    const slug = `libby-vlog-${v.youtube_id.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    const youtubeUrl = `https://www.youtube.com/watch?v=${v.youtube_id}`;
    const coverImage = `https://img.youtube.com/vi/${v.youtube_id}/hqdefault.jpg`;
    const excerpt = `Watch Libby's ACE Travel vlog from her ${v.destination} adventure.`;
    const tags = JSON.stringify(["vlog", v.destination.toLowerCase(), "ace travel", "group travel"]);
    const sortOrder = i + 1;

    await conn.execute(
      `INSERT INTO blogs_vlogs (type, title, slug, excerpt, content, coverImage, youtubeUrl, destination, author, tags, published, featured, sortOrder, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, NOW(), NOW())`,
      ["vlog", v.title, slug, excerpt, "", coverImage, youtubeUrl, v.destination, v.author, tags, i < 3 ? 1 : 0, sortOrder]
    );
    console.log(`Inserted: ${v.title}`);
  }

  console.log(`\nSeeded ${vlogs.length} vlogs successfully.`);
  await conn.end();
}

main().catch(err => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
