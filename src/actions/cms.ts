"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// ─── Role Guard ───────────────────────────────────────────────────────────────

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"] as const;

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const role = (session.user as any).role as string;
  if (!(ADMIN_ROLES as readonly string[]).includes(role)) {
    throw new Error("Forbidden: Admin access required");
  }
  return session.user as { id: string; role: string };
}

// ─── Testimonial Schemas ──────────────────────────────────────────────────────

const TestimonialCreateSchema = z.object({
  authorName: z.string().min(1, "Author name required").max(100),
  authorRole: z.string().min(1, "Author role required").max(100),
  content: z.string().min(1, "Content required").max(2000),
  rating: z.number().int().min(1).max(5),
  isPublished: z.boolean().default(false),
});

const TestimonialUpdateSchema = TestimonialCreateSchema.partial().extend({
  id: z.string().uuid(),
});

// ─── Banner Schemas ───────────────────────────────────────────────────────────

const BannerCreateSchema = z.object({
  title: z.string().min(1, "Title required").max(200),
  imageUrl: z.string().url("Must be a valid URL"),
  linkUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isActive: z.boolean().default(true),
  position: z.string().min(1, "Position required"),
});

const BannerUpdateSchema = BannerCreateSchema.partial().extend({
  id: z.string().uuid(),
});

// ─── StaticPage Schemas ───────────────────────────────────────────────────────

const StaticPageCreateSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug required")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, or hyphens"),
  title: z.string().min(1, "Title required").max(200),
  contentHtml: z.string().min(1, "Content required"),
  metaDescription: z.string().max(300).optional(),
});

const StaticPageUpdateSchema = StaticPageCreateSchema.partial().extend({
  id: z.string().uuid(),
});

// ─── Testimonial Actions ──────────────────────────────────────────────────────

export async function getTestimonials() {
  await requireAdmin();
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createTestimonial(data: z.infer<typeof TestimonialCreateSchema>) {
  await requireAdmin();
  const parsed = TestimonialCreateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  return prisma.testimonial.create({ data: parsed.data });
}

export async function updateTestimonial(data: z.infer<typeof TestimonialUpdateSchema>) {
  await requireAdmin();
  const parsed = TestimonialUpdateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const { id, ...rest } = parsed.data;
  return prisma.testimonial.update({ where: { id }, data: rest });
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  if (!id) throw new Error("ID required");
  return prisma.testimonial.delete({ where: { id } });
}

export async function publishTestimonial(id: string) {
  await requireAdmin();
  if (!id) throw new Error("ID required");
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) throw new Error("Testimonial not found");
  return prisma.testimonial.update({ where: { id }, data: { isPublished: !existing.isPublished } });
}

// ─── Banner Actions ───────────────────────────────────────────────────────────

export async function getBanners() {
  await requireAdmin();
  return prisma.banner.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createBanner(data: z.infer<typeof BannerCreateSchema>) {
  await requireAdmin();
  const parsed = BannerCreateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  return prisma.banner.create({ data: { ...parsed.data, linkUrl: parsed.data.linkUrl || null } });
}

export async function updateBanner(data: z.infer<typeof BannerUpdateSchema>) {
  await requireAdmin();
  const parsed = BannerUpdateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const { id, ...rest } = parsed.data;
  return prisma.banner.update({ where: { id }, data: { ...rest, linkUrl: rest.linkUrl || null } });
}

export async function deleteBanner(id: string) {
  await requireAdmin();
  if (!id) throw new Error("ID required");
  return prisma.banner.delete({ where: { id } });
}

export async function toggleBanner(id: string) {
  await requireAdmin();
  if (!id) throw new Error("ID required");
  const existing = await prisma.banner.findUnique({ where: { id } });
  if (!existing) throw new Error("Banner not found");
  return prisma.banner.update({ where: { id }, data: { isActive: !existing.isActive } });
}

// ─── StaticPage Actions ───────────────────────────────────────────────────────

export async function getStaticPages() {
  await requireAdmin();
  return prisma.staticPage.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getStaticPageBySlug(slug: string) {
  return prisma.staticPage.findUnique({ where: { slug } });
}

export async function createStaticPage(data: z.infer<typeof StaticPageCreateSchema>) {
  await requireAdmin();
  const parsed = StaticPageCreateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  return prisma.staticPage.create({ data: parsed.data });
}

export async function updateStaticPage(data: z.infer<typeof StaticPageUpdateSchema>) {
  await requireAdmin();
  const parsed = StaticPageUpdateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const { id, ...rest } = parsed.data;
  return prisma.staticPage.update({ where: { id }, data: rest });
}

export async function deleteStaticPage(id: string) {
  await requireAdmin();
  if (!id) throw new Error("ID required");
  return prisma.staticPage.delete({ where: { id } });
}

// ─── Media Library Actions ────────────────────────────────────────────────────

export async function getMediaLibrary() {
  await requireAdmin();
  return prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    include: { uploadedBy: { select: { name: true, email: true } } },
  });
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  if (!id) throw new Error("ID required");
  return prisma.media.delete({ where: { id } });
}

// ─── CMS Dashboard Stats ──────────────────────────────────────────────────────

export async function getCmsDashboardStats() {
  await requireAdmin();
  const [
    totalArticles,
    publishedArticles,
    totalBanners,
    activeBanners,
    totalTestimonials,
    publishedTestimonials,
    totalStaticPages,
    totalMedia,
    totalCategories,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.banner.count(),
    prisma.banner.count({ where: { isActive: true } }),
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { isPublished: true } }),
    prisma.staticPage.count(),
    prisma.media.count(),
    prisma.category.count(),
  ]);
  return { totalArticles, publishedArticles, totalBanners, activeBanners, totalTestimonials, publishedTestimonials, totalStaticPages, totalMedia, totalCategories };
}

// ─── Category Actions ─────────────────────────────────────────────────────────

const CategoryCreateSchema = z.object({
  name: z.string().min(1, "Name required").max(100),
  slug: z.string().min(1, "Slug required").max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, or hyphens"),
});

const CategoryUpdateSchema = CategoryCreateSchema.partial().extend({ id: z.string().uuid() });

export async function getCategories() {
  await requireAdmin();
  return prisma.category.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { articles: true } } } });
}

export async function createCategory(data: z.infer<typeof CategoryCreateSchema>) {
  await requireAdmin();
  const parsed = CategoryCreateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  return prisma.category.create({ data: parsed.data });
}

export async function updateCategory(data: z.infer<typeof CategoryUpdateSchema>) {
  await requireAdmin();
  const parsed = CategoryUpdateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const { id, ...rest } = parsed.data;
  return prisma.category.update({ where: { id }, data: rest });
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  if (!id) throw new Error("ID required");
  return prisma.category.delete({ where: { id } });
}

// ─── Public Fetch (no auth required) ─────────────────────────────────────────

export async function getPublishedTestimonials() {
  return prisma.testimonial.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" } });
}

export async function getActiveBanners(position?: string) {
  return prisma.banner.findMany({
    where: { isActive: true, ...(position ? { position } : {}) },
    orderBy: { createdAt: "desc" },
  });
}

export async function getFaqStaticPages() {
  return prisma.staticPage.findMany({
    where: { slug: { startsWith: "faq-" } },
    orderBy: { createdAt: "asc" },
  });
}

// ─── FAQ Actions ──────────────────────────────────────────────────────────────

const FAQCreateSchema = z.object({
  question: z.string().min(1, "Question required"),
  answer: z.string().min(1, "Answer required"),
  isActive: z.boolean().default(true),
  order: z.number().int().default(0),
});

const FAQUpdateSchema = FAQCreateSchema.partial().extend({
  id: z.string().uuid(),
});

export async function getFAQs() {
  await requireAdmin();
  return prisma.fAQ.findMany({ orderBy: { order: "asc" } });
}

export async function createFAQ(data: z.infer<typeof FAQCreateSchema>) {
  await requireAdmin();
  const parsed = FAQCreateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  return prisma.fAQ.create({ data: parsed.data });
}

export async function updateFAQ(data: z.infer<typeof FAQUpdateSchema>) {
  await requireAdmin();
  const parsed = FAQUpdateSchema.safeParse(data);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const { id, ...rest } = parsed.data;
  return prisma.fAQ.update({ where: { id }, data: rest });
}

export async function deleteFAQ(id: string) {
  await requireAdmin();
  if (!id) throw new Error("ID required");
  return prisma.fAQ.delete({ where: { id } });
}

export async function toggleFAQ(id: string) {
  await requireAdmin();
  if (!id) throw new Error("ID required");
  const existing = await prisma.fAQ.findUnique({ where: { id } });
  if (!existing) throw new Error("FAQ not found");
  return prisma.fAQ.update({ where: { id }, data: { isActive: !existing.isActive } });
}

export async function getActiveFAQs() {
  return prisma.fAQ.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
}
