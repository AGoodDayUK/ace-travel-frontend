import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const NEW_PASSWORD = "acetravel2025!";
const USERNAME = "admin";

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Check if admin exists
const [rows] = await conn.execute("SELECT id, username FROM cms_users WHERE username = ?", [USERNAME]);

if (rows.length === 0) {
  console.log(`❌ No user found with username '${USERNAME}'.`);
  console.log("Creating admin user...");
  const passwordHash = await bcrypt.hash(NEW_PASSWORD, 12);
  await conn.execute(
    "INSERT INTO cms_users (username, passwordHash, name, role, active) VALUES (?, ?, 'ACE Admin', 'admin', 1)",
    [USERNAME, passwordHash]
  );
  console.log(`✅ Admin user created.`);
} else {
  const passwordHash = await bcrypt.hash(NEW_PASSWORD, 12);
  await conn.execute("UPDATE cms_users SET passwordHash = ? WHERE username = ?", [passwordHash, USERNAME]);
  console.log(`✅ Password reset for user '${USERNAME}'.`);
}

console.log(`   Username: ${USERNAME}`);
console.log(`   Password: ${NEW_PASSWORD}`);

await conn.end();
