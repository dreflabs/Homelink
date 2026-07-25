# 68. INCIDENT RESPONSE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Security Incident Response Plan (IRP)

## 2. Purpose
Panduan krisis yang menetapkan langkah-langkah eksak yang harus diambil oleh tim ketika platform mengalami serangan siber, kebocoran data, atau kerusakan infrastruktur massal.

## 3. Scope
- Kriteria Insiden Kritis.
- Alur Komando & Komunikasi.
- Langkah Isolasi.

## 4. Audience
- **CTO, Security Engineers, DevOps**

## 5. Dependencies
- `67_AUDIT_LOGGING.md` — tabel `AuditLog` menjadi sumber data forensik utama pada tahap Post-Mortem.
- `69_VULNERABILITY_MANAGEMENT.md` — tahap Eradikasi (menambal celah yang dieksploitasi) berkaitan langsung dengan siklus penambalan kerentanan di dokumen tersebut.

## 6. Definitions
- **SEV-1/2/3 (Severity Level):** Tingkat keparahan insiden, dari kritis (SEV-1) hingga sedang (SEV-3).
- **Containment (Isolasi):** Tahap memutus akses/koneksi untuk mencegah kerusakan meluas.
- **RTO (Recovery Time Objective):** Target waktu maksimal pemulihan layanan setelah insiden.
- **Panic Button:** Mekanisme otomatis (GitHub Actions) untuk merotasi kredensial dan memutus koneksi secara instan.

## 7. Architecture
Alur insiden SEV-1 mengikuti tahapan: Identifikasi & Deklarasi (via kanal `#war-room`) → Containment (matikan container, rotasi kredensial via Cloudflare DNS/GitHub Actions) → Eradikasi → Recovery (dari backup, RTO < 4 jam) → Post-Mortem.

## 8. Requirements

### 8.1. Tingkat Insiden (Severity Levels)
- **SEV-1 (Kritis):** Kebocoran database, *Ransomware*, akses Admin diretas.
- **SEV-2 (Tinggi):** Fitur utama mati (*Booking* gagal total, Web Down).
- **SEV-3 (Sedang):** *Bug* parsial, *delay* email, masalah UI.

### 8.2. SEV-1 Playbook (Langkah Isolasi Kritis)
Jika terjadi insiden SEV-1 (misal: Seseorang meretas kredensial Cloudflare R2 dan menghapus KTP pengguna):
1. **Identifikasi & Deklarasi:** *Engineer* yang menemukan melapor ke CTO (menggunakan saluran Slack/WA khusus `#war-room`).
2. **Containment (Isolasi):**
   - PUTUSKAN KONEKSI. Matikan *container* Node.js dari internet, ubah DNS Cloudflare untuk mengarahkan rute ke "Halaman Maintenance".
   - Putar (Rotasi) SEMUA *password* database dan API Keys eksternal seketika itu juga.
3. **Eradikasi:** Tambal celah yang dieksploitasi (Perbaiki bug Auth).
4. **Recovery:** Pulihkan data KTP dari *Backup* semalam (RTO < 4 Jam).
5. **Post-Mortem:** Buat laporan transparansi penyebab insiden.

## 9. Implementation
- Skrip tombol panik (*Panic Button*) harus dibuat oleh DevOps (berupa GitHub Actions) yang dengan sekali klik merotasi kredensial dan memutuskan koneksi internet ke DB.

## 10. Acceptance Criteria
- [x] Ada definisi yang jelas tentang siapa (*PIC*) yang berwenang menekan "Tombol Panik".

## 11. Future Improvements
- Fase 3: Menjalankan simulasi *tabletop exercise* insiden SEV-1 secara berkala (setiap kuartal) untuk menguji kesiapan tim tanpa insiden nyata.

## 12. References
- NIST Incident Response Framework

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |
