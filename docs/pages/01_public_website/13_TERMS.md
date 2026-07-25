# TERMS PAGE SPECIFICATION (REDIRECT)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Terms
**Module:** 01 PUBLIC WEBSITE
**Purpose:** Redirect tipis (thin redirect) ke halaman kanonik di modul `18_legal`. Keputusan de-duplikasi (lihat `docs/business_and_product/13_PRODUCT_ROADMAP.md` §8.3 v1.0.2): seluruh halaman legal/kepatuhan hukum dikonsolidasikan di modul `18_legal` untuk menghindari drift dua spesifikasi yang harus dijaga sinkron manual.

## 2. Next.js Routing Path
```text
app/(01_public_website)/terms/page.tsx  → redirect('/legal/terms-of-service')
```

## 3. Implementation Note
Route ini TIDAK memiliki UI sendiri. Gunakan Next.js `redirect()` (permanent, HTTP 308) langsung ke path kanonik di `18_legal`. Ini mempertahankan backward-compatible URL lama (jika sudah ter-indeks search engine) sambil menghindari dua sumber kebenaran konten legal.

## 4. Canonical Source
Lihat spesifikasi penuh di `docs/pages/18_legal/02_TERMS.md`.
