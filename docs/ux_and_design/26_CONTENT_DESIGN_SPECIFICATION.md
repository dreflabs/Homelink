# 26. CONTENT DESIGN SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Content Design & Voice Guidelines

## 2. Purpose
To standardize the tone of voice, terminology, and content structure across the platform. Good content design reduces ambiguity and builds trust.

## 3. Scope
Covers Microcopy (UI text), Error Messages, Property Descriptions, and Automated Notifications (Email/WhatsApp).

## 4. Audience
- **Copywriters:** For drafting marketing and UI copy.
- **Engineers:** For hardcoding fallback error messages and UI text.
- **Support Team:** For writing FAQ and Help Center articles.

## 5. Dependencies
- Strongly influenced by `01_VISION_AND_MISSION.md` (Trust & Professionalism).

## 6. Definitions
- **Microcopy:** The small bits of text on the UI (buttons, hints, error messages).
- **Tone of Voice:** How the brand's personality is expressed in writing.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Brand Voice & Tone
- **Profesional & Elegan:** Menggunakan bahasa Indonesia baku yang mengalir, bukan bahasa gaul.
- **Transparan & Jujur:** Tidak menggunakan teknik *dark pattern* (misal: "Hanya sisa 1! Beli sekarang!" jika tidak benar).
- **Menenangkan (Calming):** Transaksi properti membuat stres. Tulisan harus memberikan panduan dan kepastian.

### 8.2. Standardized Terminology Dictionary
| Istilah Lama (Dihindari) | Istilah Resmi HomeLink 2.0 | Alasan |
| :--- | :--- | :--- |
| Rumah Bagus / Terjamin | **Properti Terverifikasi** | Objektif dan mengacu pada standar audit resmi sistem. |
| Lihat Lokasi / Ketemuan | **Survei Lokasi** | Terdengar lebih profesional dan terstruktur. |
| Surat-surat Aman | **Sertifikat Legal Tervalidasi** | Spesifik dan memiliki dasar hukum. |
| Booking Fee / DP | **Titipan Tanda Jadi** | Lebih ramah untuk pasar Indonesia. |

### 8.3. Error Message Guidelines
Error message tidak boleh menyalahkan pengguna. Selalu jelaskan:
1. Apa yang terjadi.
2. Mengapa itu terjadi.
3. Bagaimana cara memperbaikinya.

*Contoh Kesalahan OTP:*
- **Buruk:** "Kode OTP salah!"
- **Baik:** "Kode verifikasi yang dimasukkan kurang tepat. Silakan periksa kembali SMS Anda atau minta kode baru."

### 8.4. Date & Currency Formatting
- **Mata Uang:** `Rp 2.500.000.000` atau disingkat `Rp 2,5 Miliar` pada UI sempit. (Gunakan titik untuk ribuan, koma untuk desimal).
- **Tanggal:** `24 Juli 2026`. (Format Indonesia).

## 9. Implementation
- Frontend engineers must utilize an Internationalization (i18n) routing structure or centralized constant files (`constants/copy.ts`) for microcopy to ensure easy updates without hunting for hardcoded strings.

## 10. Acceptance Criteria
- [x] Clear tone of voice rules are established.
- [x] A localized terminology dictionary is provided.

## 11. Future Improvements
- Bilingual support (English) documentation guidelines.

## 12. References
- *Mailchimp Content Style Guide (Reference)*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
