import { eq, desc, asc, and } from "drizzle-orm";
import { getDb } from "./db";
import {
  cmsUsers, cmsSessions, tours, deals, faqs, reviews,
  siteSettings, media, pages, pageBlocks, blogsVlogs,
  type InsertCmsUser, type InsertTour, type InsertDeal,
  type InsertFaq, type InsertReview, type InsertMedia,
  type InsertPage, type InsertPageBlock, type InsertBlogVlog,
} from "../drizzle/schema";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// ─── CMS Auth ────────────────────────────────────────────────────────────────

export async function createCmsUser(data: { username: string; password: string; name?: string; email?: string; role?: "admin" | "editor" }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const passwordHash = await bcrypt.hash(data.password, 12);
  await db.insert(cmsUsers).values({
    username: data.username,
    passwordHash,
    name: data.name,
    email: data.email,
    role: data.role ?? "editor",
  });
}

export async function verifyCmsLogin(username: string, password: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(cmsUsers).where(and(eq(cmsUsers.username, username), eq(cmsUsers.active, true))).limit(1);
  if (!rows.length) return null;
  const user = rows[0];
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;
  return user;
}

export async function createCmsSession(cmsUserId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await db.insert(cmsSessions).values({ token, cmsUserId, expiresAt });
  return token;
}

export async function getCmsSessionUser(token: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select({ session: cmsSessions, user: cmsUsers })
    .from(cmsSessions)
    .innerJoin(cmsUsers, eq(cmsSessions.cmsUserId, cmsUsers.id))
    .where(eq(cmsSessions.token, token))
    .limit(1);
  if (!rows.length) return null;
  const { session, user } = rows[0];
  if (session.expiresAt < new Date()) return null;
  return user;
}

export async function deleteCmsSession(token: string) {
  const db = await getDb();
  if (!db) return;
  await db.delete(cmsSessions).where(eq(cmsSessions.token, token));
}

export async function listCmsUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: cmsUsers.id, username: cmsUsers.username, name: cmsUsers.name,
    email: cmsUsers.email, role: cmsUsers.role, active: cmsUsers.active,
    lastLoginAt: cmsUsers.lastLoginAt, createdAt: cmsUsers.createdAt,
  }).from(cmsUsers).orderBy(asc(cmsUsers.username));
}

export async function updateCmsUserPassword(id: number, newPassword: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const passwordHash = await bcrypt.hash(newPassword, 12);
  await db.update(cmsUsers).set({ passwordHash }).where(eq(cmsUsers.id, id));
}

export async function updateCmsUser(id: number, data: { name?: string; email?: string; role?: "admin" | "editor"; active?: boolean }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(cmsUsers).set(data).where(eq(cmsUsers.id, id));
}

// ─── Tours ───────────────────────────────────────────────────────────────────

export async function listTours() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tours).orderBy(asc(tours.sortOrder), asc(tours.name));
}

export async function getTourBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(tours).where(eq(tours.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getTourById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(tours).where(eq(tours.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function upsertTour(data: InsertTour & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(tours).set(rest).where(eq(tours.id, id));
    return id;
  }
  const result = await db.insert(tours).values(data);
  return (result as any)[0]?.insertId ?? null;
}

export async function deleteTour(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(tours).where(eq(tours.id, id));
}

// ─── Deals ───────────────────────────────────────────────────────────────────

export async function listDeals(activeOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const q = db.select().from(deals).orderBy(asc(deals.sortOrder), desc(deals.createdAt));
  if (activeOnly) return db.select().from(deals).where(eq(deals.active, true)).orderBy(asc(deals.sortOrder));
  return q;
}

export async function getDealById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(deals).where(eq(deals.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function upsertDeal(data: InsertDeal & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(deals).set(rest).where(eq(deals.id, id));
    return id;
  }
  const result = await db.insert(deals).values(data);
  return (result as any)[0]?.insertId ?? null;
}

export async function deleteDeal(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(deals).where(eq(deals.id, id));
}

// ─── FAQs ────────────────────────────────────────────────────────────────────

export async function listFaqs(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  if (publishedOnly) {
    return db.select().from(faqs).where(eq(faqs.published, true)).orderBy(asc(faqs.category), asc(faqs.sortOrder));
  }
  return db.select().from(faqs).orderBy(asc(faqs.category), asc(faqs.sortOrder));
}

export async function getFaqById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(faqs).where(eq(faqs.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function upsertFaq(data: InsertFaq & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(faqs).set(rest).where(eq(faqs.id, id));
    return id;
  }
  const result = await db.insert(faqs).values(data);
  return (result as any)[0]?.insertId ?? null;
}

export async function deleteFaq(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(faqs).where(eq(faqs.id, id));
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function listReviews(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  if (publishedOnly) {
    return db.select().from(reviews).where(eq(reviews.published, true)).orderBy(asc(reviews.sortOrder), desc(reviews.createdAt));
  }
  return db.select().from(reviews).orderBy(asc(reviews.sortOrder), desc(reviews.createdAt));
}

export async function getReviewById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(reviews).where(eq(reviews.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function upsertReview(data: InsertReview & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(reviews).set(rest).where(eq(reviews.id, id));
    return id;
  }
  const result = await db.insert(reviews).values(data);
  return (result as any)[0]?.insertId ?? null;
}

export async function deleteReview(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(reviews).where(eq(reviews.id, id));
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export async function getAllSettings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteSettings).orderBy(asc(siteSettings.group), asc(siteSettings.key));
}

export async function getSettingsByGroup(group: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteSettings).where(eq(siteSettings.group, group)).orderBy(asc(siteSettings.key));
}

export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  return rows[0]?.value ?? null;
}

export async function setSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(siteSettings).values({ key, value }).onDuplicateKeyUpdate({ set: { value } });
}

export async function bulkSetSettings(settings: { key: string; value: string }[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const s of settings) {
    await db.insert(siteSettings).values({ key: s.key, value: s.value }).onDuplicateKeyUpdate({ set: { value: s.value } });
  }
}

// ─── Media Library ───────────────────────────────────────────────────────────

export async function listMedia() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(media).orderBy(desc(media.createdAt));
}

export async function getMediaById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(media).where(eq(media.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function insertMedia(data: InsertMedia) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(media).values(data);
  return (result as any)[0]?.insertId ?? null;
}

export async function updateMediaAlt(id: number, altText: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(media).set({ altText }).where(eq(media.id, id));
}

export async function deleteMedia(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(media).where(eq(media.id, id));
}

// ─── Pages ───────────────────────────────────────────────────────────────────

export async function listPages(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  if (publishedOnly) {
    return db.select().from(pages).where(eq(pages.published, true)).orderBy(asc(pages.sortOrder), asc(pages.title));
  }
  return db.select().from(pages).orderBy(asc(pages.sortOrder), asc(pages.title));
}

export async function getPageBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getPageById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(pages).where(eq(pages.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function upsertPage(data: InsertPage & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(pages).set(rest).where(eq(pages.id, id));
    return id;
  }
  const result = await db.insert(pages).values(data);
  return (result as any)[0]?.insertId ?? null;
}

export async function deletePage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(pages).where(eq(pages.id, id));
  await db.delete(pageBlocks).where(eq(pageBlocks.pageId, id));
}

// ─── Page Blocks ─────────────────────────────────────────────────────────────

export async function getBlocksByPageId(pageId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pageBlocks).where(eq(pageBlocks.pageId, pageId)).orderBy(asc(pageBlocks.sortOrder));
}

export async function upsertPageBlock(data: InsertPageBlock & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(pageBlocks).set(rest).where(eq(pageBlocks.id, id));
    return id;
  }
  const result = await db.insert(pageBlocks).values(data);
  return (result as any)[0]?.insertId ?? null;
}

export async function deletePageBlock(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(pageBlocks).where(eq(pageBlocks.id, id));
}

export async function reorderPageBlocks(blocks: { id: number; sortOrder: number }[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const b of blocks) {
    await db.update(pageBlocks).set({ sortOrder: b.sortOrder }).where(eq(pageBlocks.id, b.id));
  }
}

// ─── Blogs & Vlogs ────────────────────────────────────────────────────────────


export async function listBlogsVlogs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogsVlogs).orderBy(blogsVlogs.sortOrder, blogsVlogs.createdAt);
}

export async function listBlogsVlogsPublic() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogsVlogs)
    .where(eq(blogsVlogs.published, true))
    .orderBy(blogsVlogs.sortOrder, blogsVlogs.createdAt);
}

export async function getBlogVlogById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(blogsVlogs).where(eq(blogsVlogs.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function upsertBlogVlog(data: InsertBlogVlog & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const { id, ...rest } = data;
  if (id) {
    await db.update(blogsVlogs).set({ ...rest, updatedAt: new Date() }).where(eq(blogsVlogs.id, id));
    return id;
  }
  const result = await db.insert(blogsVlogs).values(rest);
  return (result as any)[0]?.insertId ?? null;
}

export async function deleteBlogVlog(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogsVlogs).where(eq(blogsVlogs.id, id));
}
