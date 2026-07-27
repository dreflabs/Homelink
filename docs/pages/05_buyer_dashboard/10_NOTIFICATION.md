# NOTIFICATION PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Notification (Notifikasi)
**Module:** 05 BUYER DASHBOARD
**Purpose:** Pusat notifikasi in-app bagi Buyer — pembaruan status booking (mis. survei dikonfirmasi Owner), hasil verifikasi legalitas properti yang diminati, dan (jika diimplementasikan) balasan pesan baru. Berbeda dari `11_SETTINGS.md` yang mengatur preferensi notifikasi; halaman ini menampilkan daftar notifikasi itu sendiri.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/notifications/page.tsx
```
Rute publik: `/dashboard/notifications`. Tidak ada Screen ID di `18_SCREEN_INVENTORY.md` §8.2 saat ini — direkomendasikan ditambahkan sebagai SCR-110 setelah entitas pendukung dimodelkan (lihat §4).

## 3. Required UI Components (Shadcn/ui)
- `List` — item notifikasi: ikon per-tipe, judul singkat, deskripsi, timestamp relatif, indikator belum-dibaca (dot Royal Blue).
- `Button` (`variant="ghost"`) — "Tandai Semua Dibaca" (global, di header daftar).
- `Tabs` (opsional) — filter tipe: "Semua", "Booking", "Verifikasi", "Pesan".
- `Skeleton` — loading state daftar.
- `EmptyState` — ikon besar 48px + teks "Tidak ada notifikasi" + CTA "Kembali ke Dashboard".
- Item notifikasi harus dapat diklik untuk mengarah ke halaman terkait (mis. notifikasi booking → `/dashboard/bookings`).

## 4. Data & State Management
- **GAP SKEMA:** Fitur ini memerlukan entitas database baru (`Notification`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Tidak ada tabel notifikasi di skema Fase 1 saat ini. Perlu dicatat: `AUDIT_LOG` yang sudah ada di ERD (`action`, `entityId`, append-only) TIDAK cocok dipakai sebagai sumber notifikasi Buyer — `AUDIT_LOG` adalah log audit sistem lintas-role untuk kepatuhan/keamanan (`67_AUDIT_LOGGING.md`), bukan feed notifikasi per-user yang perlu status "dibaca/belum".
- **Proposed Entity Shape:**
  ```
  Notification {
    id          uuid PK
    userId      uuid FK -> USER.id
    type        enum "BOOKING_UPDATE, VERIFICATION_UPDATE, NEW_MESSAGE, SYSTEM"
    title       string
    body        string
    entityId    uuid?      // mis. BOOKING.id atau PROPERTY.id terkait, untuk deep-link
    readAt      datetime?
    createdAt   datetime
  }
  ```
- **Ketergantungan Silang:** Notifikasi tipe `NEW_MESSAGE` bergantung pada entitas `Message` yang juga belum ada (lihat gap di `09_MESSAGES.md`); notifikasi tipe `VERIFICATION_UPDATE` dapat memanfaatkan `VERIFICATION_AUDIT` yang SUDAH ada di ERD sebagai trigger sumber data, meski tabel `Notification` itu sendiri tetap perlu dibuat sebagai lapisan penyimpanan per-user.
- **Real-time & Aksesibilitas:** Jika daftar diperbarui live, container harus berupa ARIA live-region (`aria-live="polite"`, `role="status"`) agar notifikasi baru diumumkan oleh pembaca layar tanpa memindahkan fokus.
- **Local State:** Status "dibaca" per-item diperbarui optimis di UI saat item diklik/dibuka, sebelum konfirmasi server.

## 5. API Endpoints Referenced
- Memerlukan entitas database baru (`Notification`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Endpoint yang diusulkan: `GET /api/v1/notifications` (list, cursor pagination, filter `unread=true`), `PATCH /api/v1/notifications/:id/read` (tandai satu dibaca), `PATCH /api/v1/notifications/read-all` (tandai semua dibaca) mengikuti konvensi REST yang sudah ada.
- Referensi silang: preferensi ON/OFF per-tipe notifikasi diatur di `11_SETTINGS.md`, yang juga bergantung pada tabel `Notification`/kolom preferensi yang belum ada.

## 6. Acceptance Criteria (DoD)
- [ ] Daftar kosong menampilkan `EmptyState` dengan ikon 48px Light Gray, teks Cool Gray, tombol CTA Royal Blue.
- [ ] Notifikasi belum dibaca ditandai visual jelas (dot Royal Blue) dan menghilang otomatis begitu item dibuka/diklik.
- [ ] "Tandai Semua Dibaca" memberi feedback optimis instan pada seluruh daftar sebelum konfirmasi server.
- [ ] Mengklik item notifikasi mengarahkan ke halaman/entitas terkait (deep-link via `entityId`) sesuai tipe notifikasi.
- [ ] Jika ditampilkan real-time, container notifikasi menggunakan `aria-live="polite"` — notifikasi baru tidak boleh memindahkan fokus keyboard pengguna secara paksa.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Bell` | Header halaman "Notifikasi" & ikon lonceng navbar (dengan badge count) | 20px |
| `CalendarCheck2` | Notifikasi tipe Booking Update | 18px |
| `ShieldCheck` | Notifikasi tipe Verification Update | 18px |
| `BellOff` | Empty state ilustratif (48px, Light Gray) — "Tidak ada notifikasi" | 48px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.2 Buyer Dashboard for the full workspace design system. Page-specific deltas below:

Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White`, item belum dibaca dengan latar `blue-50` sangat lembut untuk membedakan dari item sudah dibaca (`White` polos).
- **Empty State (wajib untuk halaman berbasis daftar ini):** Ikon Lucide besar `48px` Light Gray, teks panduan Cool Gray, tombol aksi Royal Blue ("Kembali ke Dashboard") — sesuai `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §2.3.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk dot indikator belum-dibaca dan tautan "Tandai Semua Dibaca".
- **Tipografi:** Judul notifikasi `Dark Navy` (`slate-900`) medium-weight, deskripsi & timestamp `Cool Gray` (`slate-500`).
