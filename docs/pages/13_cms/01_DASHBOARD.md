# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Dashboard (Ringkasan)
**Module:** 13 CMS
**Role:** CMS Editor (`03_PRODUCT_REQUIREMENT_DOCUMENT_PRD.md` v1.0.1 §Fase 2+ — role terdaftar tapi belum di `USER.role` enum, sama status dengan Partner Agent/Internal Agent/Photographer)
**Purpose:** Landing page modul CMS — ringkasan konten (artikel, banner, testimoni) yang aktif/menunggu publikasi. **Modul ini adalah "phantom module" terbesar yang ditemukan dalam audit dokumentasi** — `89_CMS_MANUAL.md` sudah berisi manual operasional CMS lengkap (editor Tiptap, aturan slug/SEO, spesifikasi thumbnail OpenGraph) padahal belum ada satu pun entity CMS di `40_ERD.md`. Dokumen ini menutup gap tersebut dengan proposal skema konkret, bukan menghapus manualnya.

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/page.tsx
```
Sidebar label: "Ringkasan".

## 3. Required UI Components (Shadcn/ui)
- `Metric Card` (`17_COMPONENT_LIBRARY.md` §8.3/§8.4) — jumlah artikel published/draft, banner aktif.
- `Table` — 5 artikel terbaru dengan status.
- `EmptyState` — jika belum ada konten sama sekali.

## 4. Data & State Management
- **Gap skema fondasional untuk seluruh modul (diusulkan sekali di sini, dirujuk oleh 12 halaman lain di modul ini — tidak diduplikasi):**
  ```
  Article {
    id            String   @id @default(uuid())
    title         String
    slug          String   @unique // immutable setelah publish, per 89_CMS_MANUAL.md
    body          String   @db.Text
    categoryId    String?  // FK -> Category
    status        ArticleStatus // DRAFT | PUBLISHED
    coverImageUrl String?
    seoTitle      String?
    seoDescription String?
    publishedAt   DateTime?
    authorId      String   // FK -> USER (role CMS_EDITOR, menunggu enum)
    createdAt     DateTime @default(now())
    updatedAt     DateTime @updatedAt
  }
  Category { id String @id @default(uuid()), name String, slug String @unique }
  Tag      { id String @id @default(uuid()), name String, slug String @unique }
  ArticleTag { articleId String, tagId String } // join table many-to-many
  Banner   { id String @id, title String, imageUrl String, linkUrl String?, placement String, isActive Boolean, startsAt DateTime?, endsAt DateTime? }
  Testimonial { id String @id, authorName String, authorRole String?, content String, avatarUrl String?, isFeatured Boolean }
  FaqItem  { id String @id, question String, answer String, category String?, order Int }
  NavigationItem { id String @id, label String, url String, placement String /* HEADER|FOOTER */, order Int, parentId String? }
  ```
  Catatan penting yang sudah ditemukan tersirat: `43_RELATIONSHIP_SPECIFICATION.md` **sudah punya baris aturan cascade** `Category → Article : SET NULL` meski kedua tabel belum ada — proposal skema ini mengonfirmasi/mengisi apa yang relationship spec sudah antisipasi, bukan bertentangan dengannya.
- Sampai skema di atas dimigrasikan, seluruh halaman modul ini merender `EmptyState` yang menyatakan "Modul CMS dijadwalkan Fase 2 (`13_PRODUCT_ROADMAP.md` §8.3)" — bukan data dummy.

## 5. API Endpoints Referenced
- Tidak ada di `52_ENDPOINT_CATALOGUE.md` — diusulkan namespace `/api/v1/cms/*` (sudah disinggung sebagai default-deny placeholder di `56_AUTHORIZATION_MATRIX.md` untuk role Fase 2+), menunggu skema di atas.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman menyatakan status Fase 2 secara eksplisit, konsisten dengan pola `06_owner_dashboard/10_BILLING.md`.
- [ ] Begitu skema tersedia, `slug` pada `Article`/`Category`/`Tag` immutable setelah publish (SEO), sesuai `89_CMS_MANUAL.md`.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `LayoutDashboard` | Header halaman | 20px |
| `FileText` | Metric Card artikel | 20px |
| `Image` | Metric Card banner | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — modul ini mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4 (shell sidebar/header/grid yang sama) beserta token dari `15_DESIGN_SYSTEM.md` dan komponen dari `17_COMPONENT_LIBRARY.md`, tanpa aturan tambahan khusus modul.
