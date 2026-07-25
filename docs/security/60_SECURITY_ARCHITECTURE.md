# 60. SECURITY ARCHITECTURE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
Security Architecture Blueprint

## 2. Purpose
Menetapkan fondasi arsitektur keamanan tingkat tinggi untuk platform HomeLink 2.0, memastikan perlindungan data pengguna, ketersediaan layanan, dan integritas sistem dari serangan siber.

## 3. Scope
- Arsitektur Jaringan (WAF, Firewall)
- Enkripsi (At Rest & In Transit)
- Manajemen Rahasia (Secrets Management)

## 4. Audience
- **Security Engineers & DevOps:** Sebagai acuan pengerasan infrastruktur.

## 5. Dependencies
- `05_NON_FUNCTIONAL_REQUIREMENT_SPECIFICATION_NFRS.md` — dokumen ini mengimplementasikan persyaratan NFR-SEC (keamanan non-fungsional) tingkat platform.
- Dokumen `61_THREAT_MODEL.md` hingga `69_VULNERABILITY_MANAGEMENT.md` memperluas (extend) fondasi arsitektur yang ditetapkan di sini dengan detail domain masing-masing.

## 6. Definitions
- **WAF (Web Application Firewall):** Lapisan proteksi jaringan (Cloudflare) yang menyaring *traffic* berbahaya sebelum mencapai server aplikasi.
- **UFW (Uncomplicated Firewall):** Alat manajemen firewall pada VPS berbasis Linux.
- **TLS (Transport Layer Security):** Protokol enkripsi komunikasi data dalam perjalanan (*in transit*).
- **HSTS (HTTP Strict Transport Security):** *Header* keamanan yang memaksa browser hanya berkomunikasi via HTTPS.
- **Argon2id:** Algoritma *hashing* password modern yang tahan terhadap serangan GPU/ASIC.

## 7. Architecture
Seluruh *traffic* publik masuk melalui proksi Cloudflare (WAF + TLS 1.3) sebelum diteruskan ke VPS Hostinger yang hanya mengekspos port 80/443 melalui UFW. Data sensitif dienkripsi saat disimpan (Cloudflare R2 Server-Side Encryption) dan kredensial rahasia disuntikkan secara dinamis via GitHub Actions Secrets, bukan di-hardcode dalam kode sumber.

## 8. Requirements

### 8.1. Network Security (Layer 4 & Layer 7)
- **Cloudflare WAF:** Seluruh *traffic* masuk harus melewati proksi Cloudflare. Aturan WAF dikonfigurasi untuk memblokir *traffic* dari IP anonim (Tor), negara dengan risiko tinggi (opsional), dan anomali pola *request* (SQLi, XSS).
- **VPS Firewall (UFW):** Hanya dua *port* yang boleh diekspos ke publik dari VPS Hostinger: `80` (HTTP - diteruskan ke HTTPS) dan `443` (HTTPS). Port SSH (`22`) harus dilindungi oleh aturan *Fail2Ban* atau hanya merespons IP statis kantor/VPN internal. Port Database (`5432`) ditutup dari publik.

### 8.2. Encryption Standards
- **In Transit:** TLS 1.3 wajib diaktifkan (via Cloudflare Strict Mode). Tidak ada komunikasi HTTP mentah.
- **At Rest:** Data PII (KTP, Sertifikat) yang disimpan di Cloudflare R2 harus dienkripsi menggunakan fitur *Server-Side Encryption* bawaan. *Password* di-hash menggunakan Argon2id (bukan MD5/SHA256).

### 8.3. Secrets Management
- Kredensial rahasia (`DATABASE_URL`, `OPENAI_API_KEY`, `RESEND_API_KEY`) **DILARANG KERAS** ditulis dalam *source code* (hardcoded).
- Menggunakan skema substitusi file `.env` yang disuntikkan secara dinamis saat tahap *build* melalui GitHub Actions Secrets.

## 9. Implementation
- Konfigurasi `next.config.js` harus memaksakan *header* keamanan seperti `Strict-Transport-Security` (HSTS).

## 10. Acceptance Criteria
- [x] Pindai SSL Labs menghasilkan skor A+.
- [x] *Port scanner* eksternal (Nmap) mengonfirmasi hanya port 80/443 yang merespons.

## 11. Future Improvements
- Fase 3: Evaluasi migrasi ke arsitektur Zero Trust Network Access (ZTNA) untuk akses internal engineer, menggantikan model VPN/IP-whitelist statis.

## 12. References
- OWASP Top 10
- Cloudflare WAF Documentation

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |
