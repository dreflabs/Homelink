# Laporan Rekap Audit Dokumentasi HomeLink 2.0
**Tanggal:** 27 Juli 2026
**Disusun oleh:** Documentation Refactor & Audit Session (Chief Product Officer / Design Director / Documentation Architect / UX Architect / Enterprise Design System Architect AI)
**Cakupan:** Seluruh 258 file `.md` di `docs/` — 13 file `ux_and_design/`, 161 file `pages/`, 14 file `business_and_product/`, 13 file `system_and_software/`, 10 file `database_architecture/`, 9 file `api_architecture/`, 10 file `security/`, 9 file `devops/`, 8 file `qa_and_testing/`, 7 file `operations/`, dan 2 file top-level (`deployment_audit_25_july_2026.md`, `implementation_plan.md`).

---

## 1. Ringkasan Eksekutif

HomeLink 2.0 memiliki dokumentasi yang secara keseluruhan **jauh di atas rata-rata proyek sejenis** — konsisten, rajin mengaudit-diri (banyak revisi bertanda `v1.0.1` yang secara eksplisit memperbaiki kontradiksi yang ditemukan), dan disiplin soal scope per fase. Namun ada **ketimpangan nyata** antar-lapisan dokumentasi:

- **Lapisan yang sangat matang:** Design System, Component Library, Motion, Dashboard Guidelines (baru direfactor), Security, DevOps, API Architecture, QA Strategy.
- **Lapisan yang tertinggal:** ERD/model data (disebut berulang kali sebagai "artefak paling lambat" dibanding dokumen lain yang sudah menulis seakan skemanya lebih kaya), Screen Inventory (hanya cover 11 dari 161 halaman), dan 68 file spesifikasi halaman yang masih berupa template generik atau bahkan punya bug format mentah.
- **Temuan yang mengubah cara pandang:** proyek ini **bukan lagi murni tahap perencanaan** — sudah live-deploy di VPS Hostinger dan setidaknya satu dashboard (Admin) sudah dikoding nyata, dengan kemungkinan sudah tidak sinkron dengan hasil refactor desain terbaru.

---

## 2. Skor Eksekutif (dari sudut pandang CPO/Design Director/Frontend Architect — hasil kolaborasi sesi ini)

| Area | Status | Nilai | Prioritas |
| :--- | :--- | :--- | :--- |
| Design Language (`16`) | Sangat Baik | 9.5/10 | ✅ |
| Design System (`15`) | Sangat Baik | 9.5/10 | ✅ |
| Component Library (`17`) | Sangat Baik | 9/10 | ✅ |
| Motion System (`23`) | Sangat Baik | 9/10 | ✅ |
| UI Specification (`22`) | Sangat Baik | 9/10 | ✅ |
| Dashboard Design Guidelines (`27`) | Sangat Baik | 9.5/10 | ✅ |
| Frontend Architecture (`34`) | Baik | 8/10 | ⚠️ |
| Component Architecture (`33`) | Baik | 8/10 | ⚠️ |
| Folder Structure (`32`) | Baik | 8.5/10 | ⚠️ |
| Page Documentation (`docs/pages/`) | Cukup | 7.5/10 | ⚠️ |
| Screen Inventory (`18`) | Lemah | 5/10 | 🔴 |
| Navigation Map (`20`) | Lemah | 6/10 | 🔴 |
| Information Architecture (`19`) | Cukup | 7/10 | 🟡 |
| Responsive (`24`) | Cukup | 7/10 | 🟡 |
| Accessibility (`25`) | Cukup | 7.5/10 | 🟡 |
| Content Design (`26`) | Cukup | 7/10 | 🟡 |

---

## 3. Apa yang Sudah Direfactor Sesi Ini

Tujuh dokumen di `docs/ux_and_design/` ditulis ulang menjadi enterprise-grade SSOT:

- **`15_DESIGN_SYSTEM.md`** — token lengkap (warna, elevasi, radius, tipografi, ikon, grid, dark mode); **menyelesaikan kontradiksi Royal Blue vs Slate** sebagai warna primary.
- **`16_HOMELINK_DESIGN_LANGUAGE_HDL.md`** — direformasi jadi dokumen filosofi murni, memuat **20 Prinsip Desain Non-Negotiable** dari brief Anda, plus urutan prioritas saat prinsip saling bertabrakan.
- **`17_COMPONENT_LIBRARY.md`** — dari 5 jadi 26 komponen lengkap (Purpose/Variant/State/Animasi/A11y/Anti-pattern).
- **`21_WIREFRAME_SPECIFICATION.md`** — dari 2 halaman hardcoded jadi grammar layout universal (4 arketipe: Marketing/Detail/Dashboard/Form-Flow).
- **`22_UI_SPECIFICATION.md`** — sumber tunggal z-index & state Tailwind class per elemen.
- **`23_MOTION_SPECIFICATION.md`** — sistem motion lengkap semua trigger (hover/focus/press/drawer/dialog/toast/loading/skeleton).
- **`27_DASHBOARD_DESIGN_GUIDELINES.md`** (baru) — SSOT dashboard: Shared Shell + 8 bagian per-role, termasuk keputusan Sprint B untuk Buyer ("Property Discovery Workspace" dengan Hero dinamis "Langkah Berikutnya Anda").

82 file di `docs/pages/` (8 modul dashboard) direpoint agar merujuk `27` alih-alih menduplikasi aturan desain; 41 di antaranya sekaligus diperbaiki dari bug format mentah (`\n` literal, placeholder `(Example)`).

---

## 4. Model Bisnis & Roadmap (dari `business_and_product/`)

HomeLink adalah **"Verified Trust Platform"** untuk properti sekunder Jabodetabek, dengan 3 tier monetisasi: (1) Verification Service Fee ke Owner, (2) Premium Listing fee, (3) B2B SaaS untuk Partner Agent. Scope berhenti di **survey booking** — belum menangani closing transaksi/escrow sampai minimal Fase 3. Mortgage/KPR referral fee disebut berulang (5+ dokumen) sebagai fitur masa depan yang jelas diniatkan tapi konsisten ditunda.

**Pemetaan fase resmi** (`13_PRODUCT_ROADMAP.md` §8.3, revisi hingga v1.1.0):
- **Fase 1 (MVP):** Guest/Buyer/Owner/Surveyor/Admin — situs publik, auth, search, detail properti, dashboard Buyer/Owner (minus billing), Surveyor, Admin (minus payment/subscription), legal/company.
- **Fase 2 (~Sep–Okt 2026):** Partner Agent, Internal Agent, Photographer, CMS, notification center — terikat monetisasi Tier-3.
- **Fase 3 (Nov–Des 2026, Go-Live 1 Des):** AI Search live, Super Admin.
- **Fase 4+:** Payment gateway penuh, AI di luar Search.

Hanya 2 persona resmi (Arya = Buyer, Maya = Owner) — belum ada persona untuk Surveyor atau peran Fase 2+.

**Implikasi penting:** peran yang "hilang" dari ERD (Partner Agent, Internal Agent, Super Admin) **sudah diketahui dan sengaja ditunda** sesuai roadmap — bukan kesalahan baru.

---

## 5. Sembilan Inkonsistensi Nyata (Tidak Bisa Dijelaskan oleh "Sengaja Ditunda")

| # | Temuan | Tingkat |
| :-: | :--- | :-: |
| 1 | **Role Photographer** — endpoint & authorization matrix sudah aktif di Fase 1, tapi tidak ada di `USER.role` enum ERD. Beda dari Partner Agent/Super Admin, ini tidak punya alasan penundaan fase. | 🔴 |
| 2 | Penamaan kolom beda: ERD sebut `embeddingVector`, tapi Table Specification & Index Strategy pakai `embedding`. | 🔴 |
| 3 | `89_CMS_MANUAL.md` — manual operasional CMS lengkap untuk modul yang sengaja belum dimodel ("phantom module" terbesar). | 🟡 |
| 4 | `88_ADMIN_MANUAL.md` menyebut "Dasbor Partner" seolah sudah hidup, padahal Partner Agent baru Fase 2. | 🟡 |
| 5 | `74_MONITORING.md` sendiri mengaku Sentry/UptimeRobot masih `PLANNED`, tapi `87_OPERATIONS_MANUAL.md`/`91_INCIDENT_SOP.md` bergantung padanya seolah sudah jalan. | 🟡 |
| 6 | Bcrypt (Master Implementation Plan) vs Argon2id (FRS & security docs, yang benar) untuk hashing password. | 🟡 |
| 7 | Tabel hantu yang disebut tapi tak pernah dimodel: `OutboxLog`, `Facility`, `SurveyReport`, `Category`/`Article` (CMS). | 🟡 |
| 8 | Seed data tidak punya akun dummy untuk Surveyor/Photographer meski keduanya punya endpoint aktif. | 🟢 |
| 9 | Sebutan "Fase 5" sekali di Customer Journey Map, tak pernah diformalkan di Roadmap. | 🟢 |

---

## 6. Postur Kematangan per Lapisan Teknis

- **Paling matang & rajin audit-diri:** Security (`60-69`), DevOps (`70-78` kecuali monitoring), API Architecture (`51-59`), QA (`79-86` — `80_TEST_PLAN.md` secara benar mengecualikan Payment Gateway/native app dari Fase 1).
- **Paling lemah:** Operations (`87-93`) — di sinilah konsentrasi ketidaksesuaian Fase-1-vs-aspirasional (CMS Manual, referensi Dasbor Partner, rantai ketergantungan monitoring).
- **ERD adalah artefak paling tertinggal** — banyak dokumen turunan (API, events, seed data, relationship, module breakdown) ditulis seakan skemanya lebih kaya dari yang sebenarnya diratifikasi di ERD Fase 1.

---

## 7. Status Lengkap `docs/pages/` (161 file, sudah dibaca semua)

| Tingkat kualitas | Modul | Jumlah file |
| :--- | :--- | :-: |
| 🟢 Gold-standard — detail, akurat ke ERD, jujur menandai tiap gap | `01_public_website`, `02_authentication`, `03_property_search`, `04_property_detail`, `05_buyer_dashboard`, `06_owner_dashboard`, `09_surveyor`, `11_admin`, `17_company`, `18_legal` | 129 |
| 🟡 §8 sudah diperbaiki, tapi section 1-7 masih 100% generik (identik byte-per-byte lintas file) | `07_partner_agent_dashboard`, `08_internal_homelink_agent`, `10_photographer`, `12_super_admin` | 41 |
| 🔴 Masih ada bug mentah (`\n` literal + `(Example)`), belum pernah disentuh perbaikan | `13_cms`, `14_notification_center`, `15_billing`, `16_ai` | 27 |

Catatan tambahan:
- `04_property_detail` pakai konvensi routing `app/(main)/...`, berbeda dari modul lain yang pakai `(namamodul)` — inkonsistensi penamaan kecil.
- `01_AI_SEARCH.md` seharusnya TIDAK ditunda (kolom `embeddingVector` sudah ada di ERD), tapi tetap dapat boilerplate generik yang sama seperti 4 halaman AI lain yang memang sengaja Fase 4.
- Seluruh 129 file gold-standard **saling konsisten** — semua gap dirujuk silang dengan benar (mis. Map Search & Nearby Search sepakat soal endpoint geo yang sama-sama belum ada; Floor Plan & Virtual Tour sepakat soal enum `mediaType` yang sama-sama kurang).

---

## 8. Realitas Deployment & Kode (Temuan di Luar Dokumentasi Bernomor)

- **`deployment_audit_25_july_2026.md`** — HomeLink 2.0 **sudah live** di VPS Hostinger (`72.61.208.178`), berjalan via PM2 sebagai app `homelink` di port 3002, berdampingan dengan 5 aplikasi lain yang tidak terkait. Deployment via GitHub Actions sudah berhasil. **Pertanyaan yang belum terjawab di dokumen itu:** apakah perlu setup Nginx reverse proxy ke domain utama.
- **`implementation_plan.md`** — Kode untuk **Admin Dashboard sudah pernah ditulis** (`src/app/(11_admin)/admin/layout.tsx` & `page.tsx`), dengan StatTile dummy dan eksplisit memakai **Royal Blue (`blue-700`) sebagai warna aksi utama** — bertentangan langsung dengan resolusi terbaru di `15_DESIGN_SYSTEM.md` (Slate-900 = Action/Primary, Royal Blue = Brand/Info).

**Implikasi:** Ini bukan lagi sekadar proyek dokumentasi — ada kode nyata yang kemungkinan besar sudah tidak sinkron dengan hasil refactor desain sesi ini, dan perlu diverifikasi/direkonsiliasi.

---

## 9. Rekomendasi Tindak Lanjut (Berurutan)

1. **Perbaikan mekanis (risiko rendah, murni bug format):** Jalankan script perbaikan yang sama seperti untuk 07/08/10/12 pada 27 file di `13_cms/14_notification_center/15_billing/16_ai` — memperbaiki bug `\n`/`(Example)` dan me-repoint §8.
2. **Verifikasi kode vs dokumentasi:** Periksa apakah `src/app/(11_admin)/admin/*` (dan kode lain jika ada) sudah sinkron dengan token desain terbaru (`15_DESIGN_SYSTEM.md` v2.0.0).
3. **Perbaikan ERD kecil (Sprint F, belum sekarang sesuai aturan UX-dulu-backend):** tambah role `PHOTOGRAPHER` ke `USER.role` enum (satu-satunya gap peran yang tidak punya alasan penundaan fase), selaraskan penamaan `embedding`/`embeddingVector`.
4. **Konten mendalam (effort besar, belum dimulai):** 41+27 = 68 file di `07/08/10/12/13/14/15/16` butuh penulisan ulang konten fungsional nyata (bukan sekadar perbaikan bug), mengikuti standar `06_owner_dashboard`/`09_surveyor`/`11_admin`.
5. **Selesaikan Sprint B** (per roadmap 8-sprint Anda) untuk 7 dashboard lain sebelum lanjut ke Sprint C/D — Buyer sudah selesai (Hero "Langkah Berikutnya Anda" terkunci).

---

## 10. Referensi Memory Proyek

Temuan di laporan ini juga tersimpan sebagai memory lintas-sesi:
- `project-doc-quality-scorecard` — skor CPO per area
- `project-homelink-roadmap` — 8-sprint plan & status
- `feedback-ux-before-backend` — aturan kerja UX-dulu-backend-nanti
- `project-doc-audit-findings` — 9 inkonsistensi teknis
- `project-pages-full-audit` — status lengkap 161 file `docs/pages/`
- `project-deployment-and-code-status` — realitas deployment & kode
