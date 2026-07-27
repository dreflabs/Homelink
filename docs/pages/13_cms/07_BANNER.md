# BANNER PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Banner (Kelola Banner Promosi)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Mengelola banner promosi yang tampil di lokasi tertentu (mis. atas halaman Search Result) — **wajib tunduk pada `14_UX_BLUEPRINT.md`'s "Zero Distraction" dan `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §8.7's larangan dark-pattern**: banner promosi tidak boleh berupa pop-up mengganggu atau klaim urgensi palsu.

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/banners/page.tsx
```
Sidebar label: "Banner".

## 3. Required UI Components (Shadcn/ui)
- `Table` — judul, penempatan, status aktif, periode tayang.
- `DatePicker` — `startsAt`/`endsAt`.
- `Switch` — `isActive`.

## 4. Data & State Management
- Menggunakan `Banner` yang diusulkan di `01_DASHBOARD.md` §4 — tidak didefinisikan ulang.
- Banner yang `endsAt`-nya lewat otomatis tidak tampil di publik (dihitung server-side saat fetch, bukan cron terpisah).

## 5. API Endpoints Referenced
- Diusulkan `/api/v1/cms/banners`, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Tidak ada opsi copy/desain yang memicu urgensi palsu (mis. countdown timer) — sesuai batasan produk di `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §8.7.
- [ ] Banner nonaktif (`isActive=false` atau lewat `endsAt`) tidak tampil di publik meski masih ada di database.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Megaphone` | Header halaman | 20px |
| `CalendarClock` | Periode tayang | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.
