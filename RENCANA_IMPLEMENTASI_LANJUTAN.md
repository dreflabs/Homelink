# HOMELINK 2.0 — Rencana Implementasi Lanjutan

> Dokumen ini adalah **acuan kerja untuk agent coding** (mis. agent di Antigravity) yang melanjutkan implementasi HOMELINK 2.0 dari kondisi saat ini sampai selesai. Setiap MVP berisi tugas konkret dengan path file, target selesai (Definition of Done), dan dependensi. Kerjakan MVP secara berurutan — jangan lompat ke MVP berikutnya sebelum Definition of Done MVP sebelumnya terpenuhi, kecuali disebutkan bisa paralel.
>
> Dokumen sumber kebenaran (SSoT) tetap berada di `docs/` — terutama `docs/pages/**` (spesifikasi per halaman), `docs/database_architecture/42_TABLE_SPECIFICATION.md`, `docs/api_architecture/**`, `docs/business_and_product/13_PRODUCT_ROADMAP.md`, dan `docs/business_and_product/14_MASTER_IMPLEMENTATION_PLAN.md`. Dokumen ini **tidak menggantikan** docs tersebut — dokumen ini mengoperasionalkan gap yang ditemukan menjadi checklist eksekusi.
>
> Root `implementation_plan.md` yang lama adalah catatan kerja untuk satu server action (`createProperty`) — bukan rencana proyek. Boleh dihapus/diarsipkan setelah dokumen ini dipakai.

---

## 0. Status Saat Ini (per audit 2026-07-25)

- 161 spesifikasi halaman di `docs/pages/**`, tapi hanya **42 `page.tsx`** yang ada di `src/app/`, dan dari situ hanya **6 halaman** yang benar-benar mengambil data dari database (pakai Prisma). Sisanya UI statis/skeleton.
- Prisma schema (`prisma/schema.prisma`) baru punya **12 model**, jalan di atas **SQLite** (bukan PostgreSQL+pgvector seperti yang didesain di dokumen arsitektur).
- Autentikasi (Auth.js v5 + Credentials + argon2) **berfungsi**, tapi **RBAC/otorisasi berbasis role tidak ada** — siapa pun yang login bisa lolos guard `/admin`, `/super-admin`, dll. Ini gap keamanan paling kritis.
- Ada **inkonsistensi struktur folder**:
  - Tidak ada route group `(06_owner_dashboard)` — halaman owner nyasar di `src/app/(05_buyer_dashboard)/owner/**`.
  - Ada route group liar `(dashboard)` berisi 2 halaman orphan/duplikat (`11_admin/verify`, `surveyor/tasks/[propertyId]/form`) yang tumpang tindih dengan `(11_admin)` dan `(09_surveyor)`.
- Backend: `src/actions/` baru 2 file (`admin.ts`, `property.ts`); `src/app/api/v1/` baru ~15 route (property, booking, favorite, CMS artikel dasar, media presigned-url, audit-log). Belum ada endpoint billing, notifikasi, super-admin, AI, messaging.
- Dependency yang **belum terpasang** meski dibutuhkan dokumen: tidak ada Stripe/payment SDK, tidak ada S3/R2 SDK, tidak ada email/SMS provider SDK, tidak ada vector DB/LLM SDK, tidak ada React Query/tRPC.
- Testing: 20 file e2e Playwright tapi total hanya ~487 baris (smoke test dangkal), dan cuma 1 file unit test (Vitest).
- Roadmap resmi (`13_PRODUCT_ROADMAP.md`) menugaskan Phase 1 (M1) selesai Jul–Sep 2026 — **tanggal ini sudah lewat/sedang berjalan** relatif terhadap tanggal hari ini (2026-07-25), sementara Phase 1 masih jauh dari selesai. Rencana ini mengasumsikan realita tersebut dan menyusun ulang urutan kerja berbasis dependency teknis, bukan tanggal kalender.

---

## MVP 0 — Perbaikan Struktural & Fondasi Teknis (Blocker, kerjakan lebih dulu)

Tidak menambah fitur baru. Tujuannya: membersihkan fondasi supaya MVP 1+ tidak dibangun di atas struktur yang salah.

### Tugas
1. **Migrasi database SQLite → PostgreSQL + pgvector**
   - Update `prisma/schema.prisma`: ganti `datasource db { provider = "sqlite" }` → `provider = "postgresql"`, aktifkan kembali kolom `embedding Unsupported("vector(1536)")` yang saat ini di-comment.
   - Siapkan `docker-compose.yml` (sudah ada di root, cek isinya) agar menyediakan service Postgres dengan ekstensi `pgvector`.
   - Jalankan migrasi ulang (`prisma migrate dev`), pastikan `prisma/seed.ts` masih jalan di Postgres.
   - **DoD**: `npx prisma migrate dev` sukses di Postgres lokal (via docker-compose), seed data masuk, tidak ada referensi SQLite tersisa di config/env.

2. **Perbaiki struktur route group**
   - Buat `src/app/(06_owner_dashboard)/` dan pindahkan seluruh halaman dari `src/app/(05_buyer_dashboard)/owner/**` ke sana (pertahankan sub-path: `properties`, `properties/new`, `properties/[propertyId]/analytics`, `properties/[propertyId]/leads`).
   - Hapus route group `(dashboard)` yang orphan setelah memverifikasi isinya benar-benar duplikat dari `(11_admin)/verify` dan `(09_surveyor)/assignments/.../form` — merge fitur yang belum ada ke lokasi yang benar sebelum menghapus.
   - **DoD**: `find src/app -maxdepth 1 -type d` menunjukkan 1 route group per modul dokumen (tidak ada folder `(dashboard)` generik lagi), build (`next build`) tidak error routing.

3. **Implementasi RBAC nyata**
   - Tambahkan enum `Role` di Prisma (`BUYER, OWNER, PARTNER_AGENT, INTERNAL_AGENT, SURVEYOR, PHOTOGRAPHER, ADMIN, SUPER_ADMIN`), migrasikan field `role` di model `User` dari `String` ke enum ini.
   - Satukan logic otorisasi: `middleware.ts` harus memakai `authConfig.callbacks.authorized` (bukan callback inline terpisah), dan callback tersebut harus mengecek `session.user.role` sesuai prefix path (`/admin` → ADMIN, `/super-admin` → SUPER_ADMIN, `/internal` → INTERNAL_AGENT, `/surveyor` → SURVEYOR, `/cms` → ADMIN atau role CMS khusus, dst).
   - Perluas matcher middleware agar mencakup **semua** route group berproteksi yang saat ini terlewat: `/dashboard` (buyer), `/owner`, `/billing`, `/notifications`, `/ai`.
   - **DoD**: test manual/otomatis membuktikan user dengan role BUYER mendapat 403/redirect saat mengakses `/admin/*`, dan sebaliknya.

4. **Setup dependency yang belum ada tapi akan dibutuhkan MVP berikutnya**
   - Tambahkan SDK sesuai kebutuhan riil (bukan semua sekaligus) — lihat masing-masing MVP di bawah untuk kapan masing-masing dibutuhkan. Cukup catat di sini sebagai keputusan: pilih Stripe untuk billing, pilih S3-compatible SDK (`@aws-sdk/client-s3`) untuk Cloudflare R2 (kompatibel S3 API), pilih provider email (mis. Resend) dan SMS (mis. Twilio) sesuai yang disebut di `docs/api_architecture` dan `docs/system_and_software/39_AI_ARCHITECTURE.md`.
   - **DoD**: keputusan vendor per kapabilitas tercatat (boleh sebagai komentar/README singkat), tidak mengunci ke banyak SDK yang tidak dipakai.

---

## MVP 1 — Marketplace Inti (selaras Phase 1 roadmap, minus billing)

Modul cakupan: `01_public_website`, `02_authentication`, `03_property_search`, `04_property_detail`, `05_buyer_dashboard`, `06_owner_dashboard`, `09_surveyor`, `11_admin` (minus payment/subscription), `17_company` (redirect tipis), `18_legal`.

Tujuan: pengguna bisa daftar/login, browsing & cari properti, lihat detail lengkap, booking viewing, owner bisa submit properti, surveyor bisa verifikasi lapangan, admin bisa approve — end-to-end **tanpa uang berpindah tangan**.

### 1.1 Authentication (`02_authentication`) — lengkapi 4 halaman yang belum ada
- `forgot-password`, `reset-password`, `verify-email` (atau `verify-otp`, cek dokumen `05_VERIFY_EMAIL.md` vs `06_VERIFY_OTP.md` mana yang dipakai), `account-suspended`, `account-verification-pending`.
- Implementasi backend: token reset password (expiring token di DB), kirim email verifikasi via provider yang dipilih di MVP 0.
- **DoD**: alur lupa password end-to-end berfungsi (kirim email → klik link → reset → login).

### 1.2 Property Search (`03_property_search`) — lengkapi 3 halaman
- `advanced-search`, `nearby-search` (butuh geolocation/lat-long query di Prisma/Postgres), `saved-search` (butuh model `SavedSearch` baru di schema + notifikasi saat ada listing baru cocok — notifikasi bisa placeholder di MVP ini, real-time di MVP 3).
- Ubah `search-result` dan `map-search` yang saat ini statis agar fetch dari Prisma dengan filter nyata (harga, lokasi, tipe properti, kamar).
- **DoD**: pencarian dengan filter mengembalikan hasil dari DB, bukan array hardcoded.

### 1.3 Property Detail (`04_property_detail`) — pecah dari halaman gabungan jadi modul lengkap
- Saat ini semua fitur (gallery, floor plan, virtual tour, comparison, schedule-viewing, contact-agent) digabung ke satu halaman `p/[slug]`. Sesuai dokumen, pastikan tiap sub-fitur punya komponen dedicated dan bisa diakses (gallery lightbox, floor plan viewer, comparison antar 2-3 properti disimpan di state/URL, contact-agent form yang benar-benar mengirim `Lead` ke DB).
- Model `Lead` sudah ada di schema — pastikan form contact-agent dan schedule-viewing menulis ke situ, bukan cuma UI.
- **DoD**: submit "Contact Agent" dan "Schedule Viewing" masing-masing membuat row baru di tabel `Lead`/`Booking`.

### 1.4 Buyer Dashboard (`05_buyer_dashboard`) — perbaiki stub, lengkapi 7 halaman
- Halaman `dashboard` saat ini adalah **skeleton loading hardcoded** ("Profil Saya" dengan `animate-pulse` permanen) — ganti dengan data asli (nama user, ringkasan booking, saved properties, lead terakhir).
- Tambahkan: `my-profile` (edit profil nyata), `saved-search`, `schedule` (jika beda dari bookings), `offers`, `documents`, `messages`, `notification`, `settings`.
- **DoD**: buyer login → dashboard menampilkan data akun sendiri (bukan skeleton permanen), semua sub-halaman dapat diakses dan menampilkan data nyata (boleh empty-state jika belum ada data, tapi query harus nyata).

### 1.5 Owner Dashboard (`06_owner_dashboard`) — setelah dipindah di MVP 0, lengkapi sisanya
- Sudah ada (di lokasi baru): properties list, new property form, analytics per-property, leads per-property — ini bagian paling matang, pertahankan.
- Tambahkan: `dashboard` home (ringkasan semua properti + status verifikasi), `property-status` (tracking status verifikasi surveyor/admin), `schedule`, `documents`, `settings`. (`billing` sengaja ditunda ke MVP 3.)
- **DoD**: owner bisa submit properti baru → melihat status "pending verification" → lihat hasil setelah surveyor & admin approve (integrasi dengan 1.6 dan 1.7 di bawah).

### 1.6 Surveyor (`09_surveyor`) — lengkapi 6 halaman dari 8
- Sudah ada: dashboard, assignments list. API `v1/survey/[id]/report` sudah ada.
- Tambahkan: `survey-form` (form input temuan lapangan tersambung ke API report), `upload-photo`, `upload-video` (butuh integrasi S3/R2 dari MVP 0), `verification` (submit hasil verifikasi ke admin), `reports`, `schedule`.
- **DoD**: surveyor menerima assignment → isi form survey → upload foto/video ke storage nyata → submit verifikasi → status properti berubah dan admin melihatnya di antrian.

### 1.7 Admin (`11_admin`) — lengkapi 5 dari 11 (minus payment/subscription/CMS-link, ditunda)
- Sudah ada: dashboard, properties, users, verification.
- Tambahkan: `verification-queue` (kalau beda dari `verification` yang sudah ada — cek dokumen `05_VERIFICATION_QUEUE.md`), `reports`, `analytics`, `settings`. `agent-management` bisa ditunda ke MVP 2 (terkait `07_partner_agent_dashboard`).
- Hapus halaman orphan `(dashboard)/11_admin/verify` setelah dipastikan fungsinya sama dengan `(11_admin)/verification` (bagian dari MVP 0.2).
- **DoD**: admin bisa approve/reject properti dari verification queue dan perubahan status ter-reflect ke owner dashboard (1.5) secara real (query DB yang sama).

### 1.8 Company & Legal (`17_company`, `18_legal`)
- Sesuai keputusan de-duplikasi di `13_PRODUCT_ROADMAP.md` §8.3: buat halaman `17_company` yang tumpang tindih dengan `01_public_website` sebagai `redirect()` tipis ke halaman kanonik, jangan duplikasi konten.
- Lengkapi 4 halaman legal yang belum ada: `cookie-policy`, `refund-policy`, `disclaimer`, `licensing` (konten statis, prioritas rendah tapi cepat dikerjakan).
- **DoD**: tidak ada dua halaman berbeda dengan isi identik; semua link footer legal valid (tidak 404).

### 1.9 Public Website (`01_public_website`) — lengkapi 15 dari 18 halaman
- Sudah ada: home, property detail slug, mortgage calculator modal.
- Tambahkan sesuai prioritas: `about`, `contact`, `pricing`, `faq`, `help-center`, kemudian `blog`, `news`, `press`, `careers`, `investor`, `partners`, `sitemap`, custom `404`/`500`. Yang menjadi kanonik untuk `terms/privacy/cookie` tetap di `18_legal` (di sini cukup link).
- **DoD**: navigasi utama situs publik tidak ada link mati.

### Definition of Done — MVP 1 (keseluruhan)
Alur end-to-end tanpa uang: **Buyer daftar → cari properti → lihat detail → hubungi agent/booking viewing → Owner submit properti baru → Surveyor verifikasi lapangan → Admin approve → properti muncul live di search** — semuanya lewat data asli di Postgres, dengan RBAC aktif, dan tanpa halaman skeleton permanen di jalur ini.

---

## MVP 2 — Verification & Operations Engine (selaras Phase 2 roadmap)

Modul cakupan: `07_partner_agent_dashboard`, `08_internal_homelink_agent`, `10_photographer`, `13_cms`, `14_notification_center`, plus billing manual sederhana.

### 2.1 Partner Agent Dashboard (`07_partner_agent_dashboard`) — 9 dari 11 halaman
- Sudah ada: dashboard (`agent`), clients.
- Tambahkan: leads, commission (butuh model `Commission` baru di schema), calendar, tasks, documents, reports, profile, settings.
- **DoD**: partner agent bisa lihat lead yang di-assign, update status, dan melihat estimasi komisi terhitung dari data booking/transaksi.

### 2.2 Internal HomeLink Agent (`08_internal_homelink_agent`) — 8 dari 10 halaman
- Sudah ada: dashboard (`internal`), properties.
- Tambahkan: lead-management, property-verification, owner-verification, customer-support, commission, analytics, calendar, reports, tasks.
- **DoD**: internal agent adalah operator utama yang menjembatani owner/surveyor/admin — pastikan queue verifikasi owner (bukan cuma properti) berfungsi.

### 2.3 Photographer (`10_photographer`) — 4 dari 6 halaman
- Sudah ada: dashboard, assignments.
- Tambahkan: upload-media (S3/R2), gallery, delivery (notifikasi ke owner saat media siap), schedule.
- **DoD**: foto/video yang diupload photographer muncul di `PropertyMedia` dan tampil di listing publik.

### 2.4 CMS (`13_cms`) — 12 dari 13 halaman
- Sudah ada: articles (dengan Prisma).
- Tambahkan model schema: `Media`, `Banner`, `Testimonial`, `FAQ`, `StaticPage`, `Navigation`, `Footer`, `SEO` metadata per halaman.
- Tambahkan halaman: dashboard, categories, tags, media library, homepage builder, banner, testimonials, FAQ management, static pages, navigation, footer, SEO settings.
- **DoD**: konten yang diedit di CMS (mis. FAQ, testimonial) langsung tampil di `01_public_website`.

### 2.5 Notification Center (`14_notification_center`) — 4 dari 5 halaman
- Sudah ada: notifications (in-app list, tapi bukan data-driven — perbaiki jadi nyata).
- Tambahkan model `Notification`, `NotificationTemplate`. Integrasikan provider email/SMS dari keputusan MVP 0.4.
- Tambahkan halaman: email-history, sms-history, push-notification, template management.
- **DoD**: event penting (booking dikonfirmasi, verifikasi selesai, properti approved) memicu notifikasi in-app + email nyata, tercatat di history.

### 2.6 Billing Manual Sederhana (subset `15_billing`)
- Cukup: `subscription` (pilih paket, dicatat manual, belum ada payment gateway) dan `invoice` (generate PDF/record, pembayaran dikonfirmasi manual oleh admin).
- Model: `Subscription`, `Invoice` (status: pending/paid/cancelled, tanpa integrasi Stripe dulu).
- **DoD**: admin bisa menandai invoice "paid" secara manual dan status subscription owner ter-update.

### Definition of Done — MVP 2
Ekosistem operasional penuh: partner agent & internal agent mengelola lead dan komisi, photographer melengkapi media listing, CMS mengontrol konten publik, notifikasi nyata terkirim, dan ada mekanisme billing manual (belum otomatis).

---

## MVP 3 — Monetisasi Penuh & Super Admin (selaras Phase 3 roadmap)

Modul cakupan: `12_super_admin`, penyelesaian penuh `15_billing` dengan payment gateway otomatis.

### 3.1 Payment Gateway Otomatis
- Integrasikan Stripe (atau payment gateway lokal jika target pasar Indonesia — cek `docs/business_and_product` untuk target market; jika Indonesia pertimbangkan Midtrans/Xendit sebagai pengganti Stripe).
- Lengkapi `payment-history`, `upgrade` (self-service upgrade paket), `coupons`.
- Webhook handler untuk update status invoice otomatis.
- **DoD**: subscription upgrade dan pembayaran terjadi tanpa intervensi manual admin.

### 3.2 Super Admin (`12_super_admin`) — 13 dari 14 halaman
- Sudah ada: dashboard, audit-logs.
- Tambahkan: tenant-management (jika multi-tenant benar dipakai — cek `docs/system_and_software/27_SYSTEM_ARCHITECTURE.md` untuk konfirmasi model multi-tenancy), roles & permissions (backing RBAC dari MVP 0.3 agar bisa dikonfigurasi dari UI, bukan hardcoded enum saja), feature-flags, system-health, queue monitor, database-monitor, AI-monitor, security dashboard, backup management, environment config, integrations.
- **DoD**: super admin bisa mengelola role/permission dari UI (bukan ubah kode), dan melihat kesehatan sistem real-time.

---

## MVP 4 — AI & Otomasi Lanjutan (selaras Phase 4 roadmap)

Modul cakupan: `16_ai` penuh (AI Search sudah boleh dimulai lebih awal jika infra pgvector dari MVP 0 sudah siap).

### 4.1 AI Search (bisa dimulai paralel dengan MVP 1 jika kapasitas tim ada)
- Manfaatkan kolom `embedding` pgvector yang sudah diaktifkan di MVP 0.
- Pipeline: generate embedding saat properti dibuat/diupdate (pakai LLM/embedding API pilihan), simpan ke kolom vector, query similarity search untuk pencarian natural language.
- **DoD**: user bisa mencari dengan kalimat bebas ("rumah 3 kamar dekat sekolah budget 2M") dan mendapat hasil relevan berbasis similarity, bukan keyword matching biasa.

### 4.2 AI Recommendation, AI Valuation, AI Assistant, AI Analytics
- `ai-recommendation`: rekomendasi properti personal berbasis histori buyer.
- `ai-valuation`: estimasi harga otomatis berbasis data properti sekitar.
- `ai-assistant`: ganti UI mock ("AI Typing Indicator Placeholder") yang ada sekarang dengan integrasi LLM nyata (streaming response).
- `ai-analytics`: dashboard insight AI untuk admin/super-admin.
- **DoD**: keempat fitur berfungsi dengan LLM/embedding API nyata, tidak ada lagi komentar placeholder di kode.

---

## Lintas-MVP: Testing & Kualitas (kerjakan berbarengan dengan tiap MVP, bukan di akhir)

- Setiap halaman/fitur baru **wajib** menambah minimal 1 e2e test Playwright yang menguji alur nyata (bukan smoke test superfisial seperti banyak spec saat ini yang rata-rata cuma ~24 baris).
- Tambahkan unit test Vitest untuk setiap server action baru di `src/actions/` dan setiap API route baru — saat ini baru ada 1 file unit test di seluruh repo (`src/lib/utils.test.ts`), ini harus tumbuh seiring `src/actions/` bertambah.
- Setelah MVP 0 selesai (RBAC aktif), tambahkan test khusus otorisasi: setiap role harus dites tidak bisa mengakses route milik role lain.
- Jalankan `npm run test` dan `npm run test:e2e` sebagai gate sebelum menandai satu MVP "selesai".

## Cara Agent Memakai Dokumen Ini
1. Baca bagian MVP yang sedang dikerjakan, dan buka dokumen spesifikasi halaman terkait di `docs/pages/<modul>/<NN_HALAMAN>.md` untuk detail UI/copy/field sebelum coding.
2. Untuk setiap tugas, cek dulu apakah halaman/route/model sudah ada (jangan asumsikan kosong — banyak yang sudah parsial, lihat tabel di bagian 0).
3. Tandai checklist tugas selesai hanya jika Definition of Done di level tugas *dan* level MVP terpenuhi.
4. Jangan mulai MVP N+1 sebelum Definition of Done MVP N tercapai, kecuali tugas eksplisit ditandai "bisa paralel" (lihat 4.1).
5. Jika menemukan spesifikasi di `docs/pages/**` yang bertentangan dengan kondisi kode saat ini, prioritaskan dokumen (SSoT) dan catat penyesuaian yang dilakukan.
