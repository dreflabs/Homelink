# 12. SUCCESS METRICS & KPI
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Success Metrics and Key Performance Indicators (KPIs)

## 2. Purpose
To establish quantifiable, data-driven targets that measure the operational, financial, and technical success of the HomeLink 2.0 platform.

## 3. Scope
Covers User Acquisition, Engagement, Conversion, Technical Performance, and Operations/Verification metrics.

## 4. Audience
- **C-Level Executives & Investors:** For tracking ROI and market penetration.
- **Product Managers & Analysts:** For monitoring feature success.
- **Engineering Teams:** For monitoring system health.

## 5. Dependencies
- Dependent on the business goals set in `02_BUSINESS_REQUIREMENT_DOCUMENT_BRD.md`.

## 6. Definitions
- **MAU:** Monthly Active Users.
- **Conversion Rate (CR):** The percentage of users who take a desired action (e.g., booking a survey).
- **CAC:** Customer Acquisition Cost.

## 7. Architecture
Metrics tracking must be instrumented using PostHog, Mixpanel, or Google Analytics 4, integrated directly into the Next.js 16 frontend and API layer.

## 8. Requirements

### 8.1. Product & Engagement KPIs
1. **Search Engagement Rate:** Persentase pengunjung yang berinteraksi dengan AI Search Bar dalam 10 detik pertama.
   - *Target:* $\ge 65\%$
2. **Session Duration:** Rata-rata waktu yang dihabiskan pengguna pada halaman Detail Properti.
   - *Target:* $\ge 2.5$ menit.
3. **Ghost Listing Rate:** Persentase listing palsu atau data usang yang lolos ke platform.
   - *Target:* $0\%$ (Toleransi Nol).

### 8.2. Business & Conversion KPIs
1. **Booking Conversion Rate:** Persentase pencari properti yang berhasil menjadwalkan survei fisik setelah melihat *listing* terverifikasi.
   - *Target:* $\ge 4.5\%$
2. **Owner Acquisition Cost (CAC):** Rata-rata biaya pemasaran untuk mengakuisisi 1 Pemilik Properti yang mendaftarkan asetnya.
   - *Target:* $\le Rp 250.000$ per listing terverifikasi.
3. **Surveyor SLA Compliance:** Persentase jadwal inspeksi fisik yang diselesaikan oleh Surveyor dalam batas waktu SLA (maksimal 48 jam sejak properti didaftarkan).
   - *Target:* $\ge 95\%$

### 8.3. Technical Performance KPIs
1. **Largest Contentful Paint (LCP):** Metrik kecepatan muat halaman utama dan gambar resolusi tinggi.
   - *Target:* $\le 1.2$ detik (Mobile & Desktop).
2. **System Uptime (SLA):** Ketersediaan server dan database.
   - *Target:* $99.95\%$ per bulan.
3. **API Response Time (P95):** Latensi pencarian.
   - *Target:* $\le 250$ms.

## 9. Implementation
- Frontend engineers must implement non-blocking telemetry (e.g., PostHog client SDK) to capture user events without degrading LCP.
- DevOps must set up Grafana alerts if Uptime or API Response Time drops below the target threshold for more than 5 minutes.

## 10. Acceptance Criteria
- [x] KPIs are categorized by domain (Business, Product, Technical).
- [x] Every KPI has a quantifiable and realistic numerical target.

## 11. Future Improvements
- Integration of predictive analytics to forecast MAU and Revenue for Q3 and Q4.

## 12. References
- *Industry Standard PropTech Conversion Benchmarks 2025*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
