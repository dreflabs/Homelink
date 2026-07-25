# 58. RATE LIMIT SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 API Rate Limiting & Throttling Strategy

## 2. Purpose
To protect the application and database from brute-force attacks, scraping bots, and DDoS (Distributed Denial of Service) by strictly capping the number of requests a single entity can make.

## 3. Scope
Covers Reverse Proxy (Nginx) and Application Level limits.

## 4. Audience
- **DevOps Engineers:** For configuring Nginx `limit_req`.
- **Backend Engineers:** For Edge-level logic.

## 5. Dependencies
- Supports the performance SLAs in `05_NON_FUNCTIONAL_REQUIREMENT_SPECIFICATION_NFRS.md`.

## 6. Definitions
- **Rate Limit:** Controlling the rate of traffic sent or received by a network interface.
- **Throttling:** Slowing down the response intentionally when limits are approached.

## 7. Architecture
Layer 1: Cloudflare WAF. Layer 2: Nginx VPS.

## 8. Requirements

### 8.1. Global Protection (Nginx Layer)
Semua *traffic* ke server dibatasi di level Nginx untuk mencegah *Node.js event loop exhaustion*.
- **Standard API Capping:** Maksimal `100 requests / IP / minute`. 
- **Burst Allowance:** `burst=20 nodelay`.
- Respons jika batas terlampaui: `HTTP 429 Too Many Requests`.

### 8.2. Critical Endpoint Protection (Application Layer)
Endpoint krusial yang berhubungan dengan keamanan atau biaya layanan eksternal harus dilindungi lebih ketat:
- **`POST /api/auth/login` (Mencegah Brute Force):** Maksimal 5 percobaan gagal per IP dalam 15 menit.
- **`POST /api/auth/otp` (Mencegah pengurasan pulsa SMS/WA):** Maksimal 3 permintaan per nomor telepon dalam 1 jam.

## 9. Implementation
- DevOps must implement `limit_req_zone` targeting `$binary_remote_addr` in the Nginx `nginx.conf`.
- Because the server sits behind Cloudflare, Nginx MUST extract the real client IP from the `CF-Connecting-IP` header, NOT the direct remote address (which would just be Cloudflare's IP, inadvertently blocking everyone).

## 10. Acceptance Criteria
- [x] Clear thresholds provided for both standard traffic and critical bottlenecks.
- [x] Solution accounts for Reverse Proxy IP masking (Cloudflare integration).

## 11. Future Improvements
- N/A

## 12. References
- *Nginx Rate Limiting Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
