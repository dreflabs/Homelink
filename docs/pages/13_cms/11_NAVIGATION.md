# NAVIGATION PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Navigation (Kelola Menu Navigasi)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Mengelola item menu navigasi global (header) secara dinamis — melengkapi `20_NAVIGATION_MAP.md` yang saat ini mendeskripsikan struktur nav sebagai diagram statis, bukan data yang bisa diubah tanpa deploy.

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/navigation/page.tsx
```
Sidebar label: "Navigasi".

## 3. Required UI Components (Shadcn/ui)
- `Table`/tree view — label, URL, urutan, item induk (untuk submenu).
- Drag handle — atur urutan.

## 4. Data & State Management
- Menggunakan `NavigationItem` yang diusulkan di `01_DASHBOARD.md` §4 (`placement: HEADER|FOOTER`, `parentId` untuk submenu) — entity yang sama dipakai untuk `12_FOOTER.md`, tidak diduplikasi.
- **Batasan penting:** item navigasi inti yang menopang alur utama (mis. link ke Search, link Auth) sebaiknya tetap hardcoded di `32_FOLDER_STRUCTURE_SPECIFICATION.md`'s komponen shell, bukan sepenuhnya dinamis — hanya item sekunder/marketing yang layak dikelola CMS Editor, mencegah CMS Editor tanpa sengaja merusak alur navigasi inti produk.

## 5. API Endpoints Referenced
- Diusulkan `/api/v1/cms/navigation`, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Item navigasi inti (Search, Auth) tidak dapat dihapus dari UI CMS — hanya item marketing sekunder yang bisa diedit/dihapus.
- [ ] Perubahan urutan tersimpan dan langsung tercermin di `20_NAVIGATION_MAP.md`'s struktur tanpa redeploy.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Menu` | Header halaman | 20px |
| `GripVertical` | Drag handle urutan | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.
