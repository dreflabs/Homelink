# 90. CUSTOMER SUPPORT SOP
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Customer Service Standard Operating Procedure

## 2. Purpose
Mengatur bagaimana tim dukungan (CS) menangani keluhan pelanggan (Pembeli atau Pemilik), menjaga retensi pengguna dengan kecepatan dan kualitas tanggapan.

## 3. Scope
- SLA (Service Level Agreement) Respon.
- Penanganan Eskalasi Keluhan (Tier 1 vs Tier 2).
- Nada Komunikasi (Tone of Voice).

## 4. Audience
- **Customer Support Staff**

## 5. Dependencies
- `91_INCIDENT_SOP.md` — jalur eskalasi Tier 2 untuk keluhan yang berasal dari *bug* aplikasi teknis diteruskan mengikuti SOP Insiden.
- `88_ADMIN_MANUAL.md` — eskalasi klaim sengketa properti diteruskan ke Admin/Legal sesuai SOP verifikasi dan penangguhan akun.

## 6. Definitions
- **CS:** Customer Support, tim layanan pelanggan.
- **SLA:** Service Level Agreement, target waktu respons/resolusi (misal 15 menit untuk Tier 1).
- **Tier 1 / Tier 2:** Tingkat eskalasi keluhan, dari keluhan umum (Tier 1) hingga keluhan kritis (Tier 2).
- **KPI:** Key Performance Indicator, indikator kinerja utama yang diukur (misal SLA respons).

## 7. Architecture
N/A — dokumen ini bersifat prosedural (SOP layanan pelanggan), bukan spesifikasi arsitektur teknis.

## 8. Requirements

### 8.1. Respon & Eskalasi
Semua keluhan masuk via Kanal Bantuan (In-App Chat / Email/ WA Bisnis).
- **Tier 1 (Keluhan Umum):** Gagal login, lupa cara jadwalkan survei, menanyakan arti verifikasi. 
  - *SLA Resolusi:* 15 Menit. 
  - *Tindakan:* CS menjawab menggunakan pedoman FAQ.
- **Tier 2 (Keluhan Kritis):** Penipuan uang tanda jadi, *Bug* aplikasi yang membuat *crash*, klaim sengketa rumah.
  - *SLA Eskalasi:* Segera diteruskan ke CTO (untuk Bug) atau Legal/Admin Khusus (untuk Penipuan).

### 8.2. Nada Komunikasi (Tone of Voice)
- Karena HomeLink memiliki pilar **Premium Experience**, penggunaan bahasa singkatan atau "alay" sangat dilarang.
- Nada harus **Empatik, Profesional, dan Singkat**. 
- *Contoh Benar:* "Mohon maaf atas ketidaknyamanan Anda. Kami sedang menyelidiki kendala jadwal ini dengan pihak pemilik. Mohon tunggu 5 menit."
- *Contoh Salah:* "Maaf kak, sistemnya lg error nih dari sananya, ditunggu ya."

## 9. Implementation
- Gunakan alat *helpdesk* (seperti Zendesk atau Crisp) untuk melacak rata-rata kecepatan merespons pelanggan.

## 10. Acceptance Criteria
- [x] SLA untuk Tier 1 (15 menit) ditetapkan sebagai target KPI (Key Performance Indicator) bagi staf layanan pelanggan.

## 11. Future Improvements
- Mengintegrasikan chatbot AI untuk menjawab otomatis keluhan Tier 1 sederhana (misal lupa cara jadwalkan survei), membebaskan staf CS untuk fokus pada eskalasi Tier 2.

## 12. References
- N/A

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |
