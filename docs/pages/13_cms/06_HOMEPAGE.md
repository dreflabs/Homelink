# HOMEPAGE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Homepage (Kelola Konten Beranda)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Mengelola teks/konten yang dapat diubah pada `01_public_website/01_HOME.md` tanpa deploy ulang — judul hero, subjudul, dan pemilihan properti mana yang tampil sebagai "unggulan" secara manual (di luar algoritma `isFeatured` otomatis).

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/homepage/page.tsx
```
Sidebar label: "Homepage".

## 3. Required UI Components (Shadcn/ui)
- `Input`/`Textarea` — teks hero (judul, subjudul).
- `Select` (multi) — properti pilihan manual untuk slot unggulan.

## 4. Data & State Management
- **Gap skema kecil:** Tidak perlu tabel kompleks — cukup satu baris konfigurasi `HomepageConfig { id, heroTitle, heroSubtitle, manualFeaturedPropertyIds String[] }`, bukan sistem "content block" generik yang berlebihan untuk kebutuhan saat ini (prinsip: jangan over-engineer untuk satu halaman).
- Properti unggulan tetap mengutamakan `PROPERTY.status = FULLY_VERIFIED`/`isFeatured` (logika yang sudah ada di `01_public_website/01_HOME.md`) — `manualFeaturedPropertyIds` hanya override opsional, bukan mekanisme utama.

## 5. API Endpoints Referenced
- Diusulkan `/api/v1/cms/homepage-config` (single-row read/update), skema minimal di atas.

## 6. Acceptance Criteria (DoD)
- [ ] Perubahan teks hero memicu revalidation cache homepage (`89_CMS_MANUAL.md` on-demand revalidation), bukan menunggu build ulang.
- [ ] Properti yang dipilih manual tetap harus berstatus `FULLY_VERIFIED` — CMS Editor tidak bisa menampilkan properti belum terverifikasi di homepage.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Home` | Header halaman | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.
