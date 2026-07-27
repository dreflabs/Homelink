# TEMPLATE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Template (Kelola Template Notifikasi)
**Module:** 14 NOTIFICATION CENTER
**Role:** Admin/Super Admin
**Purpose:** Mengelola isi pesan (subjek/body) untuk setiap jenis notifikasi yang dikirim sistem (OTP, konfirmasi booking, verifikasi properti) tanpa perlu deploy ulang kode saat copy perlu diubah.

## 2. Next.js Routing Path
```text
app/(dashboard)/admin/notifications/templates/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Table` — key template, kanal, terakhir diubah.
- `Textarea` — edit body template, mendukung placeholder variabel (mis. `{{buyerName}}`, `{{propertyTitle}}`).
- Preview — render template dengan data contoh sebelum disimpan.

## 4. Data & State Management
- Menggunakan `NotificationTemplate` yang diusulkan di `01_NOTIFICATION.md` §4 — tidak didefinisikan ulang. **Berbeda dari `Notification`** (log event yang diterima pengguna) — `NotificationTemplate` adalah pola konten yang dipakai berulang.
- **Aturan konten:** perubahan copy tetap wajib mengikuti `26_CONTENT_DESIGN_SPECIFICATION.md` (Bahasa Indonesia baku, tenang, jujur — tidak ada urgensi palsu), meski dieditkan lewat UI, bukan hardcode.

## 5. API Endpoints Referenced
- Diusulkan `/api/v1/admin/notification-templates`, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Mengedit template OTP tidak dapat menghapus placeholder wajib (mis. `{{otpCode}}`) — validasi Zod menolak penyimpanan jika placeholder wajib hilang.
- [ ] Preview dengan data contoh wajib ditampilkan sebelum simpan — mencegah typo placeholder terkirim ke pengguna nyata.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `FileEdit` | Header halaman | 20px |
| `Eye` | Aksi preview template | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.
