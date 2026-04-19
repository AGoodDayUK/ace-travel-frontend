import { createConnection } from "mysql2/promise";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

const seoData = [
  {
    slug: "thailand-island-hopper",
    seoTitle: "Thailand Island Hopper Tour | 21-Day Group Adventure | ACE Travel Experiences",
    seoDescription: "Explore Thailand's most iconic islands on our 21-day group tour for 18-35s. From Bangkok to Koh Samui, Koh Phangan & Koh Tao. Just £1,599 with a £60 deposit. Small groups, big memories.",
  },
  {
    slug: "bali-explorer",
    seoTitle: "Bali Explorer Tour | 14-Day Group Adventure | ACE Travel Experiences",
    seoDescription: "Discover the best of Bali on our 14-day group tour for 18-35s. Canggu, Ubud, Nusa Lembongan & Uluwatu. From £1,199 with a £60 deposit. Real experiences, lifelong friendships.",
  },
  {
    slug: "thailand-intro",
    seoTitle: "Thailand Intro Tour | 12-Day Group Adventure | ACE Travel Experiences",
    seoDescription: "Your perfect introduction to Thailand. 12 days through Bangkok, Chiang Mai & Pai with a small group of 18-35s. From £999 with a £60 deposit. Elephant sanctuaries, temples & more.",
  },
  {
    slug: "bali-island-hopper",
    seoTitle: "Bali Island Hopper Tour | 14-Day Group Adventure | ACE Travel Experiences",
    seoDescription: "Hop between Bali's best islands on our 14-day group tour for 18-35s. Snorkelling, jungle walks, beach parties & stunning sunsets. From £1,155 with a £60 deposit.",
  },
];

async function main() {
  const conn = await createConnection(process.env.DATABASE_URL);
  console.log("Connected to database");

  for (const tour of seoData) {
    const [result] = await conn.execute(
      "UPDATE tours SET seoTitle = ?, seoDescription = ? WHERE slug = ?",
      [tour.seoTitle, tour.seoDescription, tour.slug]
    );
    if (result.affectedRows > 0) {
      console.log(`Updated SEO for: ${tour.slug}`);
    } else {
      console.log(`Tour not found: ${tour.slug}`);
    }
  }

  console.log("\nSEO meta seeded successfully.");
  await conn.end();
}

main().catch(err => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
