# ACE Travel Experiences — Manus Account Transfer

This package contains the **latest project source**, a **fresh database data export**, the **welcome-pack PDFs**, and the original **Open Graph image assets**. It deliberately excludes secrets, dependency folders, build output, logs, active CMS sessions, and account-specific OAuth users.

## Package contents

| Path | Purpose |
|---|---|
| `source/` | Complete React, Express, tRPC, Drizzle, and CMS source code |
| `database/ace-travel-database.sql` | Content data and the CMS administrator record |
| `database/database-export-summary.json` | Exported row counts by table |
| `documents/welcome-packs/` | Five tour welcome packs plus the scuba-diving information PDF |
| `assets/open-graph/` | Original branded social-sharing images |
| `CHECKSUMS.sha256` | File-integrity checksums for the package |

The SQL export contains **226 records** across the CMS user, tours, deals, reviews, blogs/vlogs, FAQs, site settings, and media tables. The empty custom-pages tables are represented in the export comments. Active CMS sessions and Manus OAuth users are not transferred because they are tied to the original account.

## Fastest import method on the new Manus account

Create a **new full-stack web project with database and user support**, attach this ZIP, and paste the prompt below as the first message. Do not attach the SQL separately because it is already inside the ZIP.

```text
I am transferring the complete ACE Travel Experiences project from another Manus account. The attached ZIP contains the finished source code and database export. Do not rebuild or redesign anything.

Please complete only these steps:
1. Extract the attached ZIP.
2. Replace the new project's template files with everything inside the ZIP's source/ directory. Preserve the target project's platform-managed environment and database connection.
3. Install dependencies with pnpm install.
4. Run pnpm db:push to create the database schema.
5. Import database/ace-travel-database.sql into the target project's database exactly once.
6. Set VITE_APP_TITLE to ACE Travel Experiences using the project's secrets/settings mechanism.
7. Restart the development server.
8. Confirm that the homepage, one tour page, /admin, and /sitemap.xml load. Do not modify content or styling.
9. Save a checkpoint and stop.

Important: the complete public site and CMS already exist in source/. Do not generate pages, components, routes, sample content, reviews, or a replacement admin panel.
```

## Important restoration notes

The receiving project must use its own platform-managed secrets. Do **not** copy `DATABASE_URL`, `JWT_SECRET`, OAuth values, API keys, `.env` files, or other secrets from the old account. Manus should inject new account-specific values automatically.

The SQL export uses `INSERT IGNORE`, so accidental repeated imports should not duplicate rows with existing primary or unique keys. It includes the existing CMS administrator's password hash but does not contain a plaintext password. After confirming access to `/admin`, change the CMS password from the admin interface.

Image and PDF URLs already stored in the database point to public CDN files and should continue to work. The original welcome-pack PDFs and Open Graph images are included so they can be re-uploaded under the new account if desired.

## Verification checklist

| Check | Expected result |
|---|---|
| Homepage | Branded ACE Travel homepage, not the template “Example Page” |
| Tours | Four tour records display from the database |
| CMS | `/admin` shows the ACE Travel CMS login |
| Media Library | 140 media records are listed |
| Sitemap | `/sitemap.xml` returns XML rather than the app shell |
| Tests | `pnpm test` completes successfully |

Do not publish until these checks pass and a checkpoint has been saved.
