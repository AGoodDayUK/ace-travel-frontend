import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean, bigint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * CMS admin users — standalone username/password auth, no Manus OAuth dependency.
 * Designed to work on any hosting platform (20i, etc.)
 */
export const cmsUsers = mysqlTable("cms_users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  role: mysqlEnum("role", ["admin", "editor"]).default("editor").notNull(),
  active: boolean("active").default(true).notNull(),
  lastLoginAt: timestamp("lastLoginAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CmsUser = typeof cmsUsers.$inferSelect;
export type InsertCmsUser = typeof cmsUsers.$inferInsert;

/**
 * CMS sessions — JWT-less session tokens for CMS admin logins
 */
export const cmsSessions = mysqlTable("cms_sessions", {
  id: int("id").autoincrement().primaryKey(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  cmsUserId: int("cmsUserId").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CmsSession = typeof cmsSessions.$inferSelect;

/**
 * Tours table for managing tour packages
 */
export const tours = mysqlTable("tours", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  destination: varchar("destination", { length: 100 }).notNull(),
  duration: varchar("duration", { length: 50 }).notNull(),
  price: varchar("price", { length: 50 }).notNull(),
  deposit: varchar("deposit", { length: 50 }).notNull(),
  groupSize: varchar("groupSize", { length: 50 }).notNull(),
  ageRange: varchar("ageRange", { length: 50 }).notNull(),
  rating: varchar("rating", { length: 10 }).notNull(),
  reviews: int("reviews").notNull(),
  nextDeparture: varchar("nextDeparture", { length: 100 }).notNull(),
  heroImage: text("heroImage").notNull(),
  gallery: json("gallery").notNull(), // Array of image URLs
  description: text("description").notNull(),
  highlights: json("highlights").notNull(), // Array of strings
  itinerary: json("itinerary").notNull(), // Array of {day, title, description}
  included: json("included").notNull(), // Array of strings
  notIncluded: json("notIncluded").notNull(), // Array of strings
  departureDates: json("departureDates"), // Array of {date, price, duration, badge?}
  flightInfo: json("flightInfo"), // {flyIn, flyOut, notes}
  seoTitle: varchar("seoTitle", { length: 255 }),
  seoDescription: text("seoDescription"),
  published: boolean("published").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Tour = typeof tours.$inferSelect;
export type InsertTour = typeof tours.$inferInsert;

/**
 * Deals table for managing special offers
 */
export const deals = mysqlTable("deals", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100 }),
  title: varchar("title", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 255 }),
  description: text("description").notNull(),
  discount: varchar("discount", { length: 100 }).notNull(),
  validUntil: varchar("validUntil", { length: 100 }).notNull(),
  image: text("image").notNull(),
  tourId: int("tourId"),
  active: boolean("active").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Deal = typeof deals.$inferSelect;
export type InsertDeal = typeof deals.$inferInsert;

/**
 * FAQs table
 */
export const faqs = mysqlTable("faqs", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }).default("general").notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Faq = typeof faqs.$inferSelect;
export type InsertFaq = typeof faqs.$inferInsert;

/**
 * Reviews / testimonials
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  authorName: varchar("authorName", { length: 255 }).notNull(),
  authorAge: int("authorAge"),
  authorLocation: varchar("authorLocation", { length: 255 }),
  authorPhoto: text("authorPhoto"),
  rating: int("rating").default(5).notNull(), // 1-5
  reviewText: text("reviewText").notNull(),
  tourSlug: varchar("tourSlug", { length: 255 }),
  tourName: varchar("tourName", { length: 255 }),
  reviewDate: varchar("reviewDate", { length: 50 }),
  published: boolean("published").default(true).notNull(),
  featured: boolean("featured").default(false).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Site settings — key/value store for global site content
 * Keys: hero_title, hero_subtitle, hero_cta_text, hero_image,
 *       stats_travellers, stats_destinations, stats_rating, stats_reviews,
 *       footer_tagline, contact_email, contact_phone, contact_instagram,
 *       contact_tiktok, contact_facebook, seo_title, seo_description
 */
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value"),
  label: varchar("label", { length: 255 }),
  type: mysqlEnum("type", ["text", "textarea", "image", "number", "boolean", "color"]).default("text").notNull(),
  group: varchar("group", { length: 100 }).default("general").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;

/**
 * Media library — uploaded images and files
 */
export const media = mysqlTable("media", {
  id: int("id").autoincrement().primaryKey(),
  filename: varchar("filename", { length: 500 }).notNull(),
  originalName: varchar("originalName", { length: 500 }).notNull(),
  url: text("url").notNull(),
  s3Key: text("s3Key"),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  size: bigint("size", { mode: "number" }).notNull(),
  width: int("width"),
  height: int("height"),
  altText: text("altText"),
  uploadedBy: int("uploadedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Media = typeof media.$inferSelect;
export type InsertMedia = typeof media.$inferInsert;

/**
 * Custom pages — client-created pages with SEO fields
 */
export const pages = mysqlTable("pages", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  metaTitle: varchar("metaTitle", { length: 500 }),
  metaDescription: text("metaDescription"),
  published: boolean("published").default(false).notNull(),
  showInNav: boolean("showInNav").default(false).notNull(),
  navLabel: varchar("navLabel", { length: 255 }),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdBy: int("createdBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Page = typeof pages.$inferSelect;
export type InsertPage = typeof pages.$inferInsert;

/**
 * Page blocks — ordered content blocks for the page builder
 * Block types: hero, rich_text, image_text, gallery, pricing, cta, faq, reviews, tour_cards, video
 */
export const pageBlocks = mysqlTable("page_blocks", {
  id: int("id").autoincrement().primaryKey(),
  pageId: int("pageId").notNull(),
  type: mysqlEnum("type", [
    "hero",
    "rich_text",
    "image_text",
    "gallery",
    "pricing",
    "cta",
    "faq",
    "reviews",
    "tour_cards",
    "video",
  ]).notNull(),
  content: json("content").notNull(), // Block-specific JSON payload
  sortOrder: int("sortOrder").default(0).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PageBlock = typeof pageBlocks.$inferSelect;
export type InsertPageBlock = typeof pageBlocks.$inferInsert;

/**
 * Blogs and Vlogs — articles and video content
 * type: 'blog' | 'vlog'
 */
export const blogsVlogs = mysqlTable("blogs_vlogs", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["blog", "vlog"]).default("blog").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"), // Full blog body (markdown or HTML)
  coverImage: text("coverImage"), // Hero/thumbnail image URL
  youtubeUrl: text("youtubeUrl"), // For vlogs — YouTube embed URL
  author: varchar("author", { length: 255 }),
  tourSlug: varchar("tourSlug", { length: 255 }), // Optional linked tour
  tourName: varchar("tourName", { length: 255 }),
  destination: varchar("destination", { length: 100 }),
  tags: json("tags"), // Array of tag strings
  published: boolean("published").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  sortOrder: int("sortOrder").default(0).notNull(),
  metaTitle: varchar("metaTitle", { length: 500 }),
  metaDescription: text("metaDescription"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogVlog = typeof blogsVlogs.$inferSelect;
export type InsertBlogVlog = typeof blogsVlogs.$inferInsert;
