# 71. DEPLOYMENT GUIDE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Hostinger VPS Deployment Runbook

## 2. Purpose
Panduan *step-by-step* untuk mengatur *server* kosong dari nol hingga menjadi *environment production* yang siap menjalankan HomeLink 2.0 (Ubuntu + Nginx + PM2 + SSL).

## 3. Scope
- Server Provisioning.
- Reverse Proxy Configuration.
- SSL Certificate generation.

## 4. Audience
- **DevOps Engineers**

## 5. Dependencies
- `72_INFRASTRUCTURE_ARCHITECTURE.md` — topologi *traffic flow* (Cloudflare, Nginx, PM2, PostgreSQL) yang diimplementasikan oleh runbook ini.
- `70_CI_CD_SPECIFICATION.md` — pipeline CI/CD mengasumsikan server hasil provisioning dokumen ini sudah siap menerima deployment.

## 6. Definitions
- **VPS:** Virtual Private Server, komputasi virtual milik Hostinger tempat aplikasi berjalan.
- **LTS:** Long-Term Support, versi rilis software yang didukung dalam jangka panjang.
- **PM2:** Process manager Node.js untuk menjaga aplikasi tetap berjalan.
- **Reverse Proxy:** Nginx yang meneruskan *traffic* publik (port 80/443) ke aplikasi Node.js (port 3000).
- **Full (Strict) Mode:** Mode enkripsi Cloudflare yang mewajibkan sertifikat SSL valid terpasang di server asal.

## 7. Architecture
Ubuntu 22.04 VPS menjalankan aplikasi Next.js via PM2 di port 3000, difronting oleh Nginx sebagai reverse proxy pada port 80/443, dengan lapisan enkripsi Cloudflare Origin Certificate menghubungkan Cloudflare Edge ke VPS.

## 8. Requirements

### 8.1. Prasyarat Server (VPS Hostinger)
- **OS:** Ubuntu 22.04 LTS.
- **Node.js:** Versi 20.x (LTS).
- **Database:** PostgreSQL 16 terinstal (*Native* atau Dockerized).
- **Process Manager:** PM2.

### 8.2. Nginx Reverse Proxy Setup
Mengingat Next.js berjalan di port 3000, Nginx diperlukan untuk meneruskan *traffic* dari port 80/443.
```nginx
server {
    server_name homelink.co.id www.homelink.co.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # IP Forwarding untuk Rate Limit & Audit Logging
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
    }
}
```

### 8.3. SSL & Cloudflare Integration
- Jangan menginstal *Let's Encrypt* Cerbot jika sudah menggunakan proksi Cloudflare `Full (Strict)` mode. 
- Hasilkan "Origin Certificate" dari dasbor Cloudflare (masa berlaku 15 tahun), unduh, dan pasang secara manual di `/etc/ssl/certs/` pada VPS untuk memastikan koneksi antara Cloudflare Edge dan Hostinger VPS dienkripsi sempurna.

## 9. Implementation
- (Skrip provisioning Ansible dapat ditulis di fase 3 jika *server* berjumlah lebih dari satu).

## 10. Acceptance Criteria
- [x] URL `homelink.co.id` merespons dengan koneksi aman (Gembok hijau).
- [x] IP asli pengguna berhasil diteruskan ke Node.js, bukan IP dari *reverse proxy*.

## 11. Future Improvements
- Fase 3: Menulis skrip provisioning Ansible/Terraform agar penambahan server baru tidak lagi dilakukan manual.

## 12. References
- Nginx Reverse Proxy Documentation.
- Cloudflare Origin CA Documentation.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |
