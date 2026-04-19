import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import {
  verifyCmsLogin, createCmsSession, getCmsSessionUser, deleteCmsSession,
  listCmsUsers, updateCmsUser, updateCmsUserPassword, createCmsUser,
  listTours, getTourById, getTourBySlug, upsertTour, deleteTour,
  listDeals, getDealById, upsertDeal, deleteDeal,
  listFaqs, getFaqById, upsertFaq, deleteFaq,
  listReviews, getReviewById, upsertReview, deleteReview,
  getAllSettings, bulkSetSettings,
  listMedia, insertMedia, updateMediaAlt, deleteMedia,
  listPages, getPageBySlug, getPageById, upsertPage, deletePage,
  getBlocksByPageId, upsertPageBlock, deletePageBlock, reorderPageBlocks,
} from "../cms-db";
import { storagePut } from "../storage";
import crypto from "crypto";
import { parse as parseCookieHeader } from "cookie";

// ─── CMS Auth middleware ──────────────────────────────────────────────────────

const CMS_COOKIE = "ace_cms_session";

function getCmsCookieToken(ctx: any): string | null {
  // Try req.cookies first (populated by cookie-parser middleware if present)
  if (ctx.req?.cookies?.[CMS_COOKIE]) return ctx.req.cookies[CMS_COOKIE];
  // Fall back to manual parsing of the raw cookie header (no cookie-parser needed)
  const raw = ctx.req?.headers?.cookie;
  if (!raw) return null;
  const parsed = parseCookieHeader(raw as string);
  return parsed[CMS_COOKIE] ?? null;
}

async function getCmsUserFromCtx(ctx: any) {
  const token = getCmsCookieToken(ctx);
  if (!token) return null;
  return getCmsSessionUser(token);
}

const cmsProtectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const cmsUser = await getCmsUserFromCtx(ctx);
  if (!cmsUser) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "CMS login required" });
  }
  return next({ ctx: { ...ctx, cmsUser } });
});

const cmsAdminProcedure = cmsProtectedProcedure.use(({ ctx, next }) => {
  if ((ctx as any).cmsUser?.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ─── Router ──────────────────────────────────────────────────────────────────

export const cmsRouter = router({

  // Auth
  auth: router({
    login: publicProcedure
      .input(z.object({ username: z.string(), password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const user = await verifyCmsLogin(input.username, input.password);
        if (!user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid username or password" });
        const token = await createCmsSession(user.id);
        // Use sameSite:none + secure:true for cross-origin proxied environments (Manus dev, 20i)
        const isSecure = ctx.req.protocol === "https" ||
          (ctx.req.headers["x-forwarded-proto"] as string)?.split(",")[0]?.trim() === "https";
        ctx.res.cookie(CMS_COOKIE, token, {
          httpOnly: true,
          secure: isSecure,
          sameSite: isSecure ? "none" : "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: "/",
        });
        return { id: user.id, username: user.username, name: user.name, role: user.role };
      }),

    logout: cmsProtectedProcedure.mutation(async ({ ctx }) => {
      const token = getCmsCookieToken(ctx);
      if (token) await deleteCmsSession(token);
      ctx.res.clearCookie(CMS_COOKIE, { path: "/" });
      return { success: true };
    }),

    me: publicProcedure.query(async ({ ctx }) => {
      const cmsUser = await getCmsUserFromCtx(ctx);
      if (!cmsUser) return null;
      return { id: cmsUser.id, username: cmsUser.username, name: cmsUser.name, role: cmsUser.role };
    }),
  }),

  // CMS Users (admin only)
  users: router({
    list: cmsAdminProcedure.query(() => listCmsUsers()),
    create: cmsAdminProcedure
      .input(z.object({
        username: z.string().min(3),
        password: z.string().min(8),
        name: z.string().optional(),
        email: z.string().email().optional(),
        role: z.enum(["admin", "editor"]).default("editor"),
      }))
      .mutation(({ input }) => createCmsUser(input)),
    update: cmsAdminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        role: z.enum(["admin", "editor"]).optional(),
        active: z.boolean().optional(),
      }))
      .mutation(({ input }) => updateCmsUser(input.id, input)),
    changePassword: cmsAdminProcedure
      .input(z.object({ id: z.number(), newPassword: z.string().min(8) }))
      .mutation(({ input }) => updateCmsUserPassword(input.id, input.newPassword)),
  }),

  // Tours
  tours: router({
    list: cmsProtectedProcedure.query(() => listTours()),
    getById: cmsProtectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getTourById(input.id)),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getTourBySlug(input.slug)),
    listPublic: publicProcedure.query(() => listTours()),
    upsert: cmsProtectedProcedure
      .input(z.object({
        id: z.number().optional(),
        slug: z.string(),
        name: z.string(),
        destination: z.string(),
        duration: z.string(),
        price: z.string(),
        deposit: z.string(),
        groupSize: z.string(),
        ageRange: z.string(),
        rating: z.string(),
        reviews: z.number(),
        nextDeparture: z.string(),
        heroImage: z.string(),
        gallery: z.array(z.string()),
        description: z.string(),
        highlights: z.array(z.string()),
        itinerary: z.array(z.object({ day: z.string(), title: z.string(), description: z.string() })),
        included: z.array(z.string()),
        notIncluded: z.array(z.string()),
        departureDates: z.array(z.object({
          date: z.string(),
          price: z.string(),
          duration: z.string(),
          badge: z.string().optional(),
        })).optional().nullable(),
        flightInfo: z.object({
          flyIn: z.string(),
          flyOut: z.string(),
          notes: z.string(),
        }).optional().nullable(),
        published: z.boolean().default(true),
        sortOrder: z.number().default(0),
      }))
      .mutation(({ input }) => upsertTour(input as any)),
    delete: cmsAdminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteTour(input.id)),
  }),

  // Deals
  deals: router({
    list: cmsProtectedProcedure.query(() => listDeals()),
    listPublic: publicProcedure.query(() => listDeals(true)),
    getById: cmsProtectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getDealById(input.id)),
    upsert: cmsProtectedProcedure
      .input(z.object({
        id: z.number().optional(),
        slug: z.string().optional().nullable(),
        title: z.string(),
        tagline: z.string().optional().nullable(),
        description: z.string(),
        discount: z.string(),
        validUntil: z.string(),
        image: z.string(),
        tourId: z.number().optional().nullable(),
        active: z.boolean().default(true),
        sortOrder: z.number().default(0),
      }))
      .mutation(({ input }) => upsertDeal(input as any)),
    delete: cmsAdminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteDeal(input.id)),
  }),

  // FAQs
  faqs: router({
    list: cmsProtectedProcedure.query(() => listFaqs()),
    listPublic: publicProcedure.query(() => listFaqs(true)),
    getById: cmsProtectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getFaqById(input.id)),
    upsert: cmsProtectedProcedure
      .input(z.object({
        id: z.number().optional(),
        question: z.string(),
        answer: z.string(),
        category: z.string().default("general"),
        sortOrder: z.number().default(0),
        published: z.boolean().default(true),
      }))
      .mutation(({ input }) => upsertFaq(input as any)),
    delete: cmsAdminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteFaq(input.id)),
  }),

  // Reviews
  reviews: router({
    list: cmsProtectedProcedure.query(() => listReviews()),
    listPublic: publicProcedure.query(() => listReviews(true)),
    getById: cmsProtectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getReviewById(input.id)),
    upsert: cmsProtectedProcedure
      .input(z.object({
        id: z.number().optional(),
        authorName: z.string(),
        authorAge: z.number().optional().nullable(),
        authorLocation: z.string().optional().nullable(),
        authorPhoto: z.string().optional().nullable(),
        rating: z.number().min(1).max(5).default(5),
        reviewText: z.string(),
        tourSlug: z.string().optional().nullable(),
        tourName: z.string().optional().nullable(),
        reviewDate: z.string().optional().nullable(),
        published: z.boolean().default(true),
        featured: z.boolean().default(false),
        sortOrder: z.number().default(0),
      }))
      .mutation(({ input }) => upsertReview(input as any)),
    delete: cmsAdminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteReview(input.id)),
  }),

  // Site Settings
  settings: router({
    getAll: cmsProtectedProcedure.query(() => getAllSettings()),
    getPublic: publicProcedure.query(() => getAllSettings()),
    bulkSave: cmsProtectedProcedure
      .input(z.array(z.object({ key: z.string(), value: z.string() })))
      .mutation(({ input }) => bulkSetSettings(input)),
  }),

  // Media Library
  media: router({
    list: cmsProtectedProcedure.query(() => listMedia()),
    updateAlt: cmsProtectedProcedure
      .input(z.object({ id: z.number(), altText: z.string() }))
      .mutation(({ input }) => updateMediaAlt(input.id, input.altText)),
    delete: cmsAdminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteMedia(input.id)),
    upload: cmsProtectedProcedure
      .input(z.object({
        filename: z.string(),
        mimeType: z.string(),
        size: z.number(),
        base64: z.string(), // base64-encoded file data
        altText: z.string().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64, "base64");
        const ext = input.filename.split(".").pop() ?? "bin";
        const key = `media/${crypto.randomBytes(16).toString("hex")}.${ext}`;
        const { url } = await storagePut(key, buffer, input.mimeType ?? "application/octet-stream");
        const id = await insertMedia({
          filename: key,
          originalName: input.filename,
          url,
          s3Key: key,
          mimeType: input.mimeType,
          size: input.size,
          width: input.width,
          height: input.height,
          altText: input.altText ?? input.filename,
        });
        return { id, url, key };
      }),
  }),

  // Pages
  pages: router({
    list: cmsProtectedProcedure.query(() => listPages()),
    listPublic: publicProcedure.query(() => listPages(true)),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => getPageBySlug(input.slug)),
    getById: cmsProtectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getPageById(input.id)),
    upsert: cmsProtectedProcedure
      .input(z.object({
        id: z.number().optional(),
        slug: z.string(),
        title: z.string(),
        metaTitle: z.string().optional().nullable(),
        metaDescription: z.string().optional().nullable(),
        published: z.boolean().default(false),
        showInNav: z.boolean().default(false),
        navLabel: z.string().optional().nullable(),
        sortOrder: z.number().default(0),
      }))
      .mutation(({ input, ctx }) => upsertPage({ ...input, createdBy: (ctx as any).cmsUser?.id ?? null } as any)),
    delete: cmsAdminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deletePage(input.id)),
  }),

  // Page Blocks
  blocks: router({
    getByPage: cmsProtectedProcedure
      .input(z.object({ pageId: z.number() }))
      .query(({ input }) => getBlocksByPageId(input.pageId)),
    getByPagePublic: publicProcedure
      .input(z.object({ pageId: z.number() }))
      .query(({ input }) => getBlocksByPageId(input.pageId)),
    upsert: cmsProtectedProcedure
      .input(z.object({
        id: z.number().optional(),
        pageId: z.number(),
        type: z.enum(["hero", "rich_text", "image_text", "gallery", "pricing", "cta", "faq", "reviews", "tour_cards", "video"]),
        content: z.record(z.string(), z.any()),
        sortOrder: z.number().default(0),
        published: z.boolean().default(true),
      }))
      .mutation(({ input }) => upsertPageBlock(input as any)),
    delete: cmsProtectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deletePageBlock(input.id)),
    reorder: cmsProtectedProcedure
      .input(z.array(z.object({ id: z.number(), sortOrder: z.number() })))
      .mutation(({ input }) => reorderPageBlocks(input)),
  }),
});
