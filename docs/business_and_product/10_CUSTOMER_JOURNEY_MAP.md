# 10. CUSTOMER JOURNEY MAP (CJM)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Comprehensive Customer Journey Map

## 2. Purpose
To map the holistic experience of a customer interacting with the HomeLink brand across all touchpoints (online and offline), identifying emotional states and opportunities for service enhancement.

## 3. Scope
Covers the end-to-end buyer lifecycle: Awareness $\rightarrow$ Consideration $\rightarrow$ Decision $\rightarrow$ Post-Survey Experience.

## 4. Audience
- **Marketing & CX Teams:** To optimize offline touchpoints and brand messaging.
- **Product Managers:** To identify new feature opportunities based on customer emotions.

## 5. Dependencies
- Extends the digital boundaries defined in `09_USER_JOURNEY.md`.

## 6. Definitions
- **Touchpoint:** Any point of interaction between the customer and the brand.
- **Friction:** Anything that slows down or prevents a customer from achieving their goal.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. The Journey Matrix

| Tahapan (Phase) | 1. Awareness (Kesadaran) | 2. Consideration (Pertimbangan) | 3. Decision (Keputusan) | 4. Post-Survey (Pasca-Kunjungan) |
| :--- | :--- | :--- | :--- | :--- |
| **Tujuan Pengguna** | Menyadari keberadaan platform properti baru yang "berbeda". | Mencari dan menyaring rumah yang spesifik sesuai budget. | Memastikan keaslian legalitas sebelum membuang waktu untuk survei. | Memastikan transaksi aman dan pengajuan KPR lancar. |
| **Tindakan (Actions)** | Melihat iklan Instagram/TikTok HomeLink. Mengunjungi website. | Mengetik kueri di AI Search. Membuka 3-5 listing properti. | Mengklik dokumen audit legal. Memilih slot waktu di kalender interaktif. | Bertemu agen/surveyor di lokasi fisik properti. |
| **Touchpoints** | Iklan Medsos, SEO Google, Homepage Above-the-fold. | Search Input, Filter Chips, Property Cards, Map View. | Detail Page, Legal Badge Modal, Login/OTP, Booking Form. | WhatsApp Notification, Offline Meeting, Dashboard Status. |
| **Emosi (Emotions)** | 😲 Penasaran, Terkesan dengan desain UI yang sangat bersih (Apple-like). | 😌 Tenang, Nyaman (tidak terganggu pop-up iklan). Percaya (Trust). | 🤩 Sangat Yakin. Merasa terlindungi oleh jaminan verifikasi 100%. | 🥰 Puas. Diperlakukan secara profesional dan premium. |
| **Pain Points (Risiko)** | Waktu muat awal lambat dapat membatalkan kunjungan. | Kueri kompleks gagal memberikan hasil yang relevan. | Enggan login jika proses OTP terlalu lama. | Agen di lapangan terlambat atau tidak ramah. |
| **Peluang (Opportunities)** | Komunikasikan *Value Prop* "Zero Ghost Listing" dalam $<3$ detik. | Gunakan animasi *micro-interaction* saat filter diterapkan. | *Auto-fill* data profil setelah OTP selesai. | Kirimkan ringkasan PDF via WA pasca-survei. |

## 9. Implementation
- Engineering must ensure LCP (Largest Contentful Paint) is $<1.2s$ to prevent drop-offs in the Awareness phase.
- Third-party OTP providers must have a delivery SLA of $<5s$ to prevent friction in the Decision phase.

## 10. Acceptance Criteria
- [x] CJM covers both digital and physical (offline) touchpoints.
- [x] Emotional states are mapped to specific platform interactions.

## 11. Future Improvements
- Integration of a Post-Transaction (Phase 5) mapping once the internal escrow or payment gateway features are built.

## 12. References
- `09_USER_JOURNEY.md`

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
