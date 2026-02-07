import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

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
  published: boolean("published").default(true).notNull(),
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
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  discount: varchar("discount", { length: 100 }).notNull(),
  validUntil: varchar("validUntil", { length: 100 }).notNull(),
  image: text("image").notNull(),
  tourId: int("tourId"), // Optional link to specific tour
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Deal = typeof deals.$inferSelect;
export type InsertDeal = typeof deals.$inferInsert;
