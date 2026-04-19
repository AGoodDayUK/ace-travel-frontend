import { describe, it, expect } from "vitest";
import express from "express";
import request from "supertest";
import { sitemapRouter } from "./sitemap";

describe("sitemap endpoints", () => {
  const app = express();
  app.use(sitemapRouter);

  it("GET /sitemap.xml returns valid XML with urlset", async () => {
    const res = await request(app).get("/sitemap.xml");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/xml/);
    expect(res.text).toContain('<?xml version="1.0"');
    expect(res.text).toContain("<urlset");
    expect(res.text).toContain("</urlset>");
    expect(res.text).toContain("<loc>");
  });

  it("GET /sitemap.xml includes static pages", async () => {
    const res = await request(app).get("/sitemap.xml");
    expect(res.text).toContain("/tours");
    expect(res.text).toContain("/destinations");
    expect(res.text).toContain("/about");
    expect(res.text).toContain("/faq");
    expect(res.text).toContain("/contact");
  });

  it("GET /robots.txt returns correct content", async () => {
    const res = await request(app).get("/robots.txt");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/plain/);
    expect(res.text).toContain("User-agent: *");
    expect(res.text).toContain("Allow: /");
    expect(res.text).toContain("Disallow: /admin/");
    expect(res.text).toContain("Sitemap:");
    expect(res.text).toContain("/sitemap.xml");
  });
});
