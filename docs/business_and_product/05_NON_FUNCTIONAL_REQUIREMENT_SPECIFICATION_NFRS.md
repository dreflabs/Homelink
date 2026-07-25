# 05. NON-FUNCTIONAL REQUIREMENT SPECIFICATION (NFRS)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Non-Functional Requirement Specification (NFRS)

## 2. Purpose
To define the system's operational capabilities, focusing on performance, security, availability, and scalability. This ensures the platform is robust, secure, and provides an Apple-level premium experience.

## 3. Scope
Covers Performance metrics, Security standards, System Availability (SLA), and Scalability targets.

## 4. Audience
- **DevOps Engineers:** For configuring CI/CD, Nginx, and cloud infrastructure.
- **Security Engineers:** For auditing system defenses.
- **Frontend Engineers:** For optimizing Core Web Vitals.

## 5. Dependencies
- Compliments `04_FUNCTIONAL_REQUIREMENT_SPECIFICATION_FRS.md`.

## 6. Definitions
- **SLA:** Service Level Agreement.
- **LCP:** Largest Contentful Paint (Core Web Vitals metric).
- **OWASP:** Open Web Application Security Project.

## 7. Architecture
Deployed on Hostinger VPS using PM2/Docker, Nginx Reverse Proxy, and Cloudflare CDN for edge caching and DDoS protection.

## 8. Requirements

### 8.1. Performance (NFR-PERF)
- **NFR-PERF-001 (Time to Interactive):** Halaman utama (Homepage) HARUS interaktif dalam waktu $\le 1.2$ detik pada koneksi jaringan 4G.
- **NFR-PERF-002 (Lighthouse Score):** Skor Google Lighthouse HARUS mencapai minimum 95 untuk *Performance*, *Accessibility*, *Best Practices*, dan *SEO*.
- **NFR-PERF-003 (API Latency):** Waktu respon rata-rata untuk API Pencarian (`GET /api/properties`) HARUS $\le 250$ms pada beban normal (P95).

### 8.2. Security & Privacy (NFR-SEC)
- **NFR-SEC-001 (Encryption in Transit):** Seluruh komunikasi jaringan HARUS dienkripsi menggunakan HTTPS dengan protokol minimum TLS 1.3.
- **NFR-SEC-002 (Encryption at Rest):** File dokumen hukum (KTP, Sertifikat) yang tersimpan di Cloudflare R2 HARUS menggunakan enkripsi AES-256 tingkat *bucket*.
- **NFR-SEC-003 (Vulnerability Protection):** Aplikasi HARUS lolos uji keamanan OWASP Top 10 (mencegah SQL Injection via Prisma, perlindungan CSRF/XSS bawaan Next.js).
- **NFR-SEC-004 (Rate Limiting):** Nginx HARUS membatasi maksimum 100 *requests per minute* (RPM) dari IP yang sama untuk mencegah serangan *brute-force* pada endpoint login.

### 8.3. Availability & Reliability (NFR-AVAIL)
- **NFR-AVAIL-001 (Uptime):** Sistem HARUS memiliki Service Level Agreement (SLA) ketersediaan (uptime) sebesar 99.95% setiap bulannya.
- **NFR-AVAIL-002 (Zero Downtime Deployment):** Proses *deployment* ke *production* HARUS menggunakan metode *zero-downtime reload* (menggunakan fitur `pm2 reload`).

### 8.4. Scalability (NFR-SCAL)
- **NFR-SCAL-001 (Concurrent Users):** Arsitektur database PostgreSQL dan kluster Node.js HARUS mampu menangani 5.000 pengguna aktif bersamaan (*concurrent users*) tanpa degradasi performa melebihi batas latensi (NFR-PERF-003).

## 9. Implementation
- DevOps team must configure Datadog or Prometheus/Grafana to monitor these metrics in real-time.
- Next.js Image Optimization must be strictly utilized for all property images.

## 10. Acceptance Criteria
- [x] Specific, measurable thresholds (e.g., $1.2s$, $99.95\%$) are defined for every NFR.
- [x] Security requirements align with modern enterprise standards.

## 11. Future Improvements
- Transisi ke arsitektur *multi-region database replication* jika basis pengguna di luar pulau Jawa meningkat drastis.

## 12. References
- *OWASP Top 10 Guidelines 2026*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
