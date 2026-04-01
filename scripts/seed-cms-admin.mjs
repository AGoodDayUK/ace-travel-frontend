/**
 * Creates the initial CMS admin user.
 * Run with: node scripts/seed-cms-admin.mjs
 * 
 * Requires DATABASE_URL to be set in environment.
 */
import { createConnection } from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set");
  process.exit(1);
}

const USERNAME = process.argv[2] ?? "admin";
const PASSWORD = process.argv[3] ?? "acetravel2025!";
const NAME = process.argv[4] ?? "ACE Admin";

async function main() {
  const conn = await createConnection(DATABASE_URL);
  
  // Check if user already exists
  const [rows] = await conn.execute("SELECT id FROM cms_users WHERE username = ?", [USERNAME]);
  if (rows.length > 0) {
    console.log(`⚠️  CMS user '${USERNAME}' already exists. Use the CMS Users panel to reset the password.`);
    await conn.end();
    return;
  }

  const passwordHash = await bcrypt.hash(PASSWORD, 12);
  await conn.execute(
    "INSERT INTO cms_users (username, passwordHash, name, role, active) VALUES (?, ?, ?, 'admin', 1)",
    [USERNAME, passwordHash, NAME]
  );

  console.log(`✅ CMS admin user created:`);
  console.log(`   Username: ${USERNAME}`);
  console.log(`   Password: ${PASSWORD}`);
  console.log(`   Login at: /admin/login`);
  console.log(`\n⚠️  Please change the password after first login via the CMS Users panel.`);

  await conn.end();
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
