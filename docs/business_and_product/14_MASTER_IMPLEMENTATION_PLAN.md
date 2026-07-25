# 14. MASTER IMPLEMENTATION PLAN (EXECUTION PLAYBOOK)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Master Execution Playbook (Multi-Agent Sprint Plan)

## 2. Purpose
Menerjemahkan Visi Bisnis (13_PRODUCT_ROADMAP) dan 270 Dokumen Spesifikasi ke dalam urutan langkah koding absolut (Sprints). Dokumen ini adalah panduan tunggal (*Single Source of Truth*) bagi **Project Manager (PM) AI** untuk memanggil agen-agen eksekutor (Frontend, Backend, DevOps, dll) secara paralel tanpa bentrok.

## 3. Scope
Meliputi Fase 0 (Inisialisasi) hingga Fase Go-Live (Peluncuran).

## 4. Aturan Orkestrasi Paralel
- **Dilarang Tumpang Tindih:** Frontend AI tidak boleh mengerjakan integrasi API sebelum Backend AI selesai membuat *Endpoint*.
- **Quality Gate:** Setiap akhir Sprint, kode WAJIB melewati audit `UI/UX Reviewer AI`, `QA AI`, dan `Security AI` sebelum dianggap selesai.
- **Single Orchestrator:** Hanya PM AI yang berhak membaca dokumen ini dan memberikan perintah kepada agen spesialis lainnya.

---

## 5. TAHAPAN EKSEKUSI (THE SPRINT PLAN)

### 5.1. Sprint 0: Inisialisasi Infrastruktur Dasar
*(Prasyarat mutlak sebelum koding aplikasi dimulai)*

| Target Eksekusi | Agen Penanggung Jawab | Referensi Dokumen SSoT |
| :--- | :--- | :--- |
| **Setup Framework** | `DevOps AI`, `CTO AI` | `docs/system_and_software/34_FRONTEND_ARCHITECTURE.md`<br>`docs/devops/` |
| **Tugas Detail** | - Menjalankan `npx create-next-app@latest`<br>- Konfigurasi Tailwind CSS v4 & Shadcn/ui<br>- Koneksi VPS Hostinger (`72.61.208.178`) & GitHub repo<br>- Konfigurasi CI/CD Actions dasar |

### 5.2. Sprint 1: Database & Autentikasi Inti
*(Membangun gerbang masuk aplikasi dan fondasi data)*

| Target Eksekusi | Agen Penanggung Jawab | Referensi Dokumen SSoT |
| :--- | :--- | :--- |
| **Prisma Schema** | `Data AI` | `docs/database_architecture/40_ERD.md`<br>`41_DATA_DICTIONARY.md` |
| **API Auth.js** | `Backend AI`, `Security AI` | `docs/api_architecture/52_ENDPOINT_CATALOGUE.md` (Bagian Auth) |
| **UI Login & Register** | `Frontend AI`, `UI/UX Reviewer` | `docs/pages/02_authentication/` (Semua File) |
| **Tugas Detail** | - Generate `schema.prisma` dan migrasi awal ke PostgreSQL.<br>- Setup Auth.js v5 Stateless JWT + Bcrypt.<br>- Koding UI form otentikasi (wajib *Royal Blue*, *Rounded-2xl*, *Lucide React*). |

### 5.3. Sprint 2: Wajah Publik & Buyer Area
*(Membangun halaman pemasaran dan area klien pembeli)*

| Target Eksekusi | Agen Penanggung Jawab | Referensi Dokumen SSoT |
| :--- | :--- | :--- |
| **Public Website** | `Frontend AI` | `docs/pages/01_public_website/` (Semua Halaman) |
| **Buyer Dashboard** | `Frontend AI`, `Backend AI` | `docs/pages/05_buyer_dashboard/` |
| **Tugas Detail** | - Koding Homepage, About, Contact (Redirects).<br>- Koding Dashboard Pembeli (Wishlist, Profil, Histori Carian).<br>- Backend AI menyiapkan API `GET /users/me`, `GET /wishlist`. |

### 5.4. Sprint 3: Properti, Pemilik, & Pencarian
*(Core bisnis HomeLink: Transaksi & Listing Properti)*

| Target Eksekusi | Agen Penanggung Jawab | Referensi Dokumen SSoT |
| :--- | :--- | :--- |
| **Property CRUD API** | `Backend AI`, `Data AI` | `docs/api_architecture/52_ENDPOINT_CATALOGUE.md` (Bagian Property) |
| **Owner Dashboard** | `Frontend AI` | `docs/pages/06_owner_dashboard/` |
| **Property Pages** | `Frontend AI` | `docs/pages/03_property_search/`, `04_property_detail/` |
| **Tugas Detail** | - Koding form *Upload* Listing Properti (termasuk validasi Cloudflare R2 untuk aset gambar).<br>- Koding halaman Katalog Pencarian Properti Dasar.<br>- Koding halaman Detail Properti dengan Galeri. |

### 5.5. Sprint 4: Back-Office & Moderasi
*(Portal operasi dan kendali kualitas listing)*

| Target Eksekusi | Agen Penanggung Jawab | Referensi Dokumen SSoT |
| :--- | :--- | :--- |
| **Admin Portal** | `Frontend AI`, `Backend AI` | `docs/pages/11_admin/` |
| **Surveyor Portal** | `Frontend AI` | `docs/pages/09_surveyor/` |
| **Tugas Detail** | - Koding halaman *Approval/Reject* properti untuk Admin Moderasi.<br>- Koding portal Surveyor (Upload laporan lapangan, validasi geolokasi statis). |

### 5.6. Sprint 5: Integrasi AI & Keamanan (Fase Puncak)
*(Mengaktifkan fitur pembeda utama dan audit keamanan ketat)*

| Target Eksekusi | Agen Penanggung Jawab | Referensi Dokumen SSoT |
| :--- | :--- | :--- |
| **AI Semantic Search** | `AI Engineer AI`, `Backend AI` | `docs/system_and_software/39_AI_ARCHITECTURE.md`<br>`docs/pages/16_ai/01_AI_SEARCH.md` |
| **Security Audit** | `Security AI` | `docs/security/` (OWASP Checklist) |
| **QA End-to-End** | `QA AI` | `docs/qa_and_testing/83_END_TO_END_TESTING.md` |
| **Tugas Detail** | - Implementasi Vector Database (Supabase pgvector / Pinecone) & LLM RAG (Gemini).<br>- Pengetesan keamanan CSRF, XSS, Rate Limiting.<br>- Pengetesan skenario E2E (Playwright) dari Register -> Input Properti -> Verifikasi Admin -> Tampil di Pencarian. |

---

## 6. Acceptance Criteria
- [ ] Sprint tidak boleh berpindah sebelum `UI/UX Reviewer AI` dan `QA AI` menyatakan fitur sebelumnya 100% *Bug-Free* dan *Pixel-Perfect*.
- [ ] Semua rute Next.js harus menggunakan format `app/[route]/page.tsx` (App Router).

## 7. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
