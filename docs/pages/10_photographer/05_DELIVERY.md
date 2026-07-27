# DELIVERY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Delivery (Pengiriman Galeri)
**Module:** 10 PHOTOGRAPHER
**Role:** Photographer
**Purpose:** Mengirimkan galeri final (foto terpilih) ke Owner/Agent terkait sebagai tanda penugasan selesai, dan melacak status pengiriman sebelumnya.

## 2. Next.js Routing Path
```text
app/(dashboard)/photographer/deliveries/page.tsx
```
Sidebar label: "Pengiriman".

## 3. Required UI Components (Shadcn/ui)
- `Timeline Card` (`17_COMPONENT_LIBRARY.md` §8.4) — riwayat pengiriman per penugasan.
- `Button` — "Kirim ke Klien" (Action Card, hanya aktif jika galeri punya ≥1 foto ditandai final di `04_GALLERY.md`).
- `Badge` — status pengiriman (Terkirim/Menunggu Konfirmasi).

## 4. Data & State Management
- **Endpoint sudah terdokumentasi:** `POST /api/v1/photography/:id/deliver` sudah ada di `52_ENDPOINT_CATALOGUE.md` §8.6 — ini salah satu bagian modul Photographer yang paling nyata secara API, meski tetap bergantung pada skema `PhotographerAssignment` yang menjadi gap di `02_ASSIGNMENT.md`.
- Riwayat pengiriman diambil dari `PhotographerAssignment.status = DELIVERED` (skema yang diusulkan), diurutkan `deliveredAt` terbaru dulu.

## 5. API Endpoints Referenced
- `POST /api/v1/photography/:id/deliver` — sudah terdokumentasi, menunggu skema `PhotographerAssignment` agar `:id` punya referensi nyata.

## 6. Acceptance Criteria (DoD)
- [ ] Tombol "Kirim ke Klien" dinonaktifkan jika belum ada foto ditandai final — mencegah pengiriman galeri kosong.
- [ ] Riwayat pengiriman terurut kronologis, terbaru di atas.
- [ ] Notifikasi ke Owner/Agent saat pengiriman terjadi mengikuti kanal yang sama dengan notifikasi booking lain (WhatsApp/Email, `55_AUTHENTICATION_FLOW.md`-adjacent, bukan kanal baru).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Send` | Tombol "Kirim ke Klien" | 20px |
| `CheckCircle2` | Badge status terkirim | 16px |
| `Clock` | Badge status menunggu konfirmasi | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.7 Photographer Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.
