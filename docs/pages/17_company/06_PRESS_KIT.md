# PRESS KIT PAGE SPECIFICATION (REDIRECT)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Press Kit
**Module:** 17 COMPANY
**Purpose:** Redirect tipis (thin redirect) ke halaman kanonik "Press" di modul `01_public_website`. Ditemukan saat audit lanjutan (2026-07-24): halaman ini adalah duplikat topik dari `01_public_website/10_PRESS.md` (sama-sama membahas unduhan aset media/logo dan daftar siaran pers). Mengikuti keputusan de-duplikasi yang sama dengan About/Contact/Careers (`13_PRODUCT_ROADMAP.md` §8.3 v1.0.2): halaman pemasaran level-root tetap kanonik di `01_public_website` untuk keuntungan SEO path root.

## 2. Next.js Routing Path
```text
app/(17_company)/press-kit/page.tsx  → redirect('/press')
```

## 3. Implementation Note
Route ini TIDAK memiliki UI sendiri. Gunakan Next.js `redirect()` (permanent, HTTP 308) langsung ke `/press` (path kanonik di `01_public_website`).

## 4. Canonical Source
Lihat spesifikasi penuh di `docs/pages/01_public_website/10_PRESS.md`.
