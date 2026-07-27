# GALLERY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Gallery (Galeri Kerja)
**Module:** 10 PHOTOGRAPHER
**Role:** Photographer
**Purpose:** Meninjau/menyortir (cull) media yang sudah diunggah untuk sebuah penugasan sebelum dikirim ke Owner/Agent — grid padat edge-to-edge, satu-satunya area konten utama di seluruh produk yang dikecualikan dari Card container standar, per `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.7.

## 2. Next.js Routing Path
```text
app/(dashboard)/photographer/assignments/[id]/gallery/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- Grid media edge-to-edge (bukan `PropertyCard`, bukan dibungkus `Card` — per `27` §8.7 Do: "jangan bungkus tiap thumbnail dengan Card tebal").
- `Checkbox` overlay per thumbnail — pilih untuk dihapus/ditandai final.
- `EmptyState` — belum ada media untuk penugasan ini (ikon `Camera` besar + CTA langsung ke Upload).

## 4. Data & State Management
- **Sudah bisa diimplementasikan untuk foto:** `GET /api/v1/media?propertyId=...&mediaType=IMAGE` menampilkan seluruh foto yang sudah diunggah untuk properti terkait — tidak ada gap skema untuk foto.
- Video/360 mewarisi gap yang sama dengan `03_UPLOAD_MEDIA.md` — thumbnail video tidak dapat ditampilkan sampai `mediaType` diperluas.

## 5. API Endpoints Referenced
- `GET /api/v1/media` — sudah ada.
- `DELETE /api/v1/media/:id` — perlu dikonfirmasi ada di `52_ENDPOINT_CATALOGUE.md`; jika belum, dicatat sebagai gap kecil (hapus foto yang buram/gagal sebelum pengiriman).

## 6. Acceptance Criteria (DoD)
- [ ] Grid galeri tidak memakai hover-lift Card seperti Listing Card — perlakuan visual berbeda dari kartu properti biasa (`27` §8.7 Motion Behaviour).
- [ ] Skeleton thumbnail cocok dengan rasio aspek grid final, tanpa lompatan layout.
- [ ] Empty state memakai ikon besar (48px) + CTA langsung, bukan teks generik.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Camera` | Empty state (besar) | 48px |
| `Trash2` | Hapus foto dari galeri | 16px |
| `CheckCircle2` | Penanda foto final/terpilih | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.7 Photographer Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.
