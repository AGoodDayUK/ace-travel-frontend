import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

const OUTPUT_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve("transfer/ace-travel-database.sql");

// Account-specific OAuth users and active CMS sessions are deliberately excluded.
// The CMS user is retained so the imported admin panel remains accessible.
const TABLES = [
  "cms_users",
  "tours",
  "deals",
  "reviews",
  "blogs_vlogs",
  "faqs",
  "site_settings",
  "media",
  "pages",
  "page_blocks",
];

function quoteIdentifier(identifier) {
  return `\`${identifier.replaceAll("`", "``")}\``;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not available in the environment.");
  }

  const databaseUrl = new URL(process.env.DATABASE_URL);
  const connection = await mysql.createConnection({
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port || 3306),
    user: decodeURIComponent(databaseUrl.username),
    password: decodeURIComponent(databaseUrl.password),
    database: databaseUrl.pathname.replace(/^\//, ""),
    ssl: databaseUrl.searchParams.get("ssl") === "false" ? undefined : {},
    connectTimeout: 15_000,
  });
  const sections = [
    "-- ACE Travel Experiences database transfer export",
    `-- Generated: ${new Date().toISOString()}`,
    "-- Import only after the target project has run: pnpm db:push",
    "-- Excludes account-specific OAuth users and active CMS sessions.",
    "SET NAMES utf8mb4;",
    "SET FOREIGN_KEY_CHECKS = 0;",
    "",
  ];

  const summary = [];

  try {
    for (const table of TABLES) {
      const [exists] = await connection.query("SHOW TABLES LIKE ?", [table]);
      if (exists.length === 0) {
        sections.push(`-- Table ${table} is not present in the source database.`, "");
        summary.push({ table, rows: 0, status: "missing" });
        continue;
      }

      const [rows] = await connection.query(
        `SELECT * FROM ${quoteIdentifier(table)} ORDER BY 1`,
      );

      summary.push({ table, rows: rows.length, status: "exported" });
      sections.push(`-- ${table}: ${rows.length} row(s)`);

      if (rows.length === 0) {
        sections.push("");
        continue;
      }

      const columns = Object.keys(rows[0]);
      const columnList = columns.map(quoteIdentifier).join(", ");

      for (const row of rows) {
        const values = columns
          .map((column) => connection.escape(row[column]))
          .join(", ");
        sections.push(
          `INSERT IGNORE INTO ${quoteIdentifier(table)} (${columnList}) VALUES (${values});`,
        );
      }

      sections.push("");
    }
  } finally {
    await connection.end();
  }

  sections.push("SET FOREIGN_KEY_CHECKS = 1;", "");
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, sections.join("\n"), "utf8");

  console.log(JSON.stringify({ output: OUTPUT_PATH, summary }, null, 2));
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
