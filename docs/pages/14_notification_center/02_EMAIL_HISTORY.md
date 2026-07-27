# EMAIL HISTORY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Email History (Riwayat Email Terkirim)
**Module:** 14 NOTIFICATION CENTER
**Role:** Admin/Super Admin
**Purpose:** Meninjau riwayat email transaksional yang dikirim platform (verifikasi email, konfirmasi booking) untuk keperluan dukungan pelanggan ("email saya tidak sampai") dan audit pengiriman.

## 2. Next.js Routing Path
```text
app/(dashboard)/admin/notifications/email-history/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Table` — penerima, subjek, status (terkirim/gagal), waktu kirim.
- `Select` — filter status/rentang tanggal.

## 4. Data & State Management
- **Data sesungguhnya hidup di penyedia email (SendGrid/AWS SES/setara)**, bukan di database HomeLink — sama prinsipnya dengan pola Customer Support di `08_internal_homelink_agent/05_CUSTOMER_SUPPORT.md` (tidak menduplikasi data pihak ketiga ke tabel sendiri). Halaman ini mengagregasi via API penyedia email atau menampilkan tautan ke dashboard penyedia.
- Jika observability granular per-event diperlukan di HomeLink sendiri (bukan hanya di provider), gunakan `Notification` dengan `type` yang menunjukkan kanal email — tidak perlu tabel `EmailLog` terpisah.

## 5. API Endpoints Referenced
- Tidak ada endpoint HomeLink native — integrasi API penyedia email (di luar `52_ENDPOINT_CATALOGUE.md`), penyedia belum ditentukan secara eksplisit di `73_ENVIRONMENT_STRATEGY.md`.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman tidak mendulikasi seluruh isi email ke database HomeLink — cukup metadata (penerima, subjek, status).
- [ ] Status "gagal terkirim" ditandai Danger dan dapat difilter terpisah untuk investigasi cepat oleh tim support.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Mail` | Header halaman | 20px |
| `MailWarning` | Status gagal terkirim | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.
