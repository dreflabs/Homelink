# FOOTER PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Footer (Kelola Konten Footer)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Mengelola tautan dan konten footer situs publik — memakai entity yang sama dengan `11_NAVIGATION.md`, hanya beda `placement`.

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/footer/page.tsx
```
Sidebar label: "Footer".

## 3. Required UI Components (Shadcn/ui)
- `Table` — label, URL, kolom footer (grup).

## 4. Data & State Management
- **Tidak ada entity baru** — menggunakan `NavigationItem` dengan `placement = FOOTER` yang sudah diusulkan di `01_DASHBOARD.md` §4, bukan `FooterConfig` terpisah.
- Tautan legal (Privacy/Terms/Cookie) di footer tetap mengarah ke `18_legal` sebagai sumber kebenaran — CMS Editor hanya mengatur label/urutan tautan, bukan kontennya.

## 5. API Endpoints Referenced
- Sama dengan `11_NAVIGATION.md`, difilter `placement = FOOTER`.

## 6. Acceptance Criteria (DoD)
- [ ] Tidak membuat entity `FooterConfig` kedua yang terpisah dari `NavigationItem` — satu skema, satu filter berbeda.
- [ ] Tautan ke halaman legal tidak dapat diubah URL-nya secara sembarangan oleh CMS Editor (harus tetap mengarah ke rute `18_legal` yang benar).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `PanelBottom` | Header halaman | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.
