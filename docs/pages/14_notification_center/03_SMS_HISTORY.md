# SMS HISTORY PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** SMS History (Riwayat SMS/WhatsApp Terkirim)
**Module:** 14 NOTIFICATION CENTER
**Role:** Admin/Super Admin
**Purpose:** Meninjau riwayat OTP dan notifikasi WhatsApp/SMS (konfirmasi booking, per `FR-AUTH-002`/business process doc) untuk keperluan dukungan dan audit — pola dan gap yang sama dengan `02_EMAIL_HISTORY.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/admin/notifications/sms-history/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Table` — nomor tujuan (masking sebagian per `65_DATA_PROTECTION.md`), jenis pesan (OTP/Konfirmasi), status, waktu kirim.

## 4. Data & State Management
- **Sama prinsipnya dengan `02_EMAIL_HISTORY.md`:** data sesungguhnya hidup di gateway WhatsApp Business API/SMS (pihak ketiga), bukan tabel HomeLink. Halaman ini menampilkan metadata pengiriman, bukan isi pesan lengkap.
- **Wajib masking nomor telepon** — hanya beberapa digit terakhir yang tampil (`65_DATA_PROTECTION.md`), bahkan untuk Admin/Super Admin.

## 5. API Endpoints Referenced
- Tidak ada endpoint HomeLink native — integrasi API gateway WhatsApp/SMS.

## 6. Acceptance Criteria (DoD)
- [ ] Nomor telepon selalu ditampilkan bermasking (mis. `+62 812-xxxx-5678`), tidak pernah nomor penuh, sesuai `65_DATA_PROTECTION.md`.
- [ ] Isi pesan OTP tidak pernah ditampilkan ulang di halaman ini setelah terkirim (OTP adalah data sensitif sekali pakai).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `MessageSquare` | Header halaman | 20px |
| `ShieldAlert` | Penanda status gagal terkirim | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.
