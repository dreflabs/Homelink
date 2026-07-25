# 89. CMS MANUAL
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Content Management Workflow (Blog & FAQ)

## 2. Purpose
Panduan bagi tim *Marketing* dan SEO untuk membuat, mengedit, dan menerbitkan artikel edukasi atau panduan aplikasi tanpa memerlukan bantuan *Developer*.

## 3. Scope
- Publikasi Artikel (Markdown/Rich Text).
- Aturan SEO & Slug.
- Pengelolaan FAQ.

## 4. Audience
- **Marketing Team, SEO Specialists**

## 5. Dependencies
- `docs/pages/13_cms/` — spesifikasi halaman modul CMS (Blog & FAQ) tempat alur kerja pada dokumen ini dijalankan.

## 6. Definitions
- **CMS:** Content Management System, sistem pengelolaan konten Blog & FAQ.
- **SEO:** Search Engine Optimization, praktik optimasi agar konten mudah ditemukan mesin pencari.
- **Slug:** Bagian URL yang merepresentasikan judul artikel.
- **OpenGraph:** Standar metadata untuk tampilan pratinjau tautan saat dibagikan di media sosial.

## 7. Architecture
N/A — dokumen ini merupakan panduan alur kerja konten, bukan spesifikasi arsitektur teknis.

## 8. Requirements

### 8.1. Pembuatan Artikel Baru
1. Masuk ke Dasbor Admin $\rightarrow$ Menu `CMS / Blog`.
2. Klik `Tambah Artikel`.
3. **Judul:** Gunakan kaidah H1 (Singkat, Mengandung Kata Kunci).
4. **Slug:** Terisi otomatis berdasarkan Judul. *JANGAN* diubah secara manual jika artikel sudah pernah di-publish (akan merusak *broken links* Google).
5. **Gambar Sampul (Thumbnail):** Resolusi wajib `1200 x 630px` (Standar OpenGraph untuk Share di WhatsApp/Twitter).
6. **Konten:** Gunakan *Editor Tiptap*. Biasakan menggunakan pemformatan H2 dan H3. Dilarang mengunggah gambar resolusi raksasa (lebih dari 1MB) di tengah artikel.

### 8.2. Aturan Revisi Artikel
- Jika sebuah panduan (FAQ) berubah karena ada fitur baru, *Marketer* cukup menekan edit. 
- *Backend Next.js* dikonfigurasi untuk menjalankan metode On-Demand Revalidation (via API khusus) saat *Marketer* menyimpan artikel. Ini akan memaksa *cache* statis di Cloudflare untuk terhapus (purge) dan memunculkan teks baru dalam hitungan detik.

## 9. Implementation
- *Engineer* harus menyembunyikan opsi "Kustomisasi HTML" murni dari *Marketer* demi mencegah rusaknya desain halaman akibat *tag* HTML yang belum ditutup (`</div>`).

## 10. Acceptance Criteria
- [x] Aturan resolusi gambar OpenGraph dipatuhi dengan ketat.
- [x] Aturan pelarangan ganti `slug` ditekankan untuk menjaga kesehatan SEO.

## 11. Future Improvements
- Menambahkan validasi otomatis pada editor CMS yang menolak unggahan gambar di atas 1MB atau di luar rasio OpenGraph, alih-alih mengandalkan disiplin manual Marketer.

## 12. References
- N/A

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |
