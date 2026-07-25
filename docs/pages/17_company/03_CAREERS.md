# CAREERS PAGE SPECIFICATION (REDIRECT)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Careers
**Module:** 17 COMPANY
**Purpose:** Redirect tipis (thin redirect) ke halaman kanonik di modul `01_public_website`. Keputusan de-duplikasi (lihat `docs/business_and_product/13_PRODUCT_ROADMAP.md` §8.3 v1.0.2): halaman pemasaran level-root (About/Contact/Careers) tetap kanonik di `01_public_website` untuk keuntungan SEO path root.

## 2. Next.js Routing Path
```text
app/(17_company)/careers/page.tsx  → redirect('/careers')
```

## 3. Implementation Note
Route ini TIDAK memiliki UI sendiri. Gunakan Next.js `redirect()` (permanent, HTTP 308) langsung ke path kanonik di `01_public_website`.

## 4. Canonical Source
Lihat spesifikasi penuh di `docs/pages/01_public_website/04_CAREERS.md` (sudah terisi penuh — Read file tersebut untuk memastikan slug redirect benar, misalnya `careers`).
