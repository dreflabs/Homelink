# MESSAGES PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Messages (Pesan)
**Module:** 05 BUYER DASHBOARD
**Purpose:** Menyediakan kanal komunikasi langsung antara Buyer dan Owner/Surveyor terkait properti yang sedang dipertimbangkan atau dijadwalkan survei — mis. konfirmasi detail jadwal, pertanyaan seputar legalitas.

## 2. Next.js Routing Path
```text
app/(dashboard)/dashboard/messages/page.tsx
```
Rute publik: `/dashboard/messages`. Tidak ada Screen ID di `18_SCREEN_INVENTORY.md` §8.2 saat ini — direkomendasikan ditambahkan sebagai SCR-109 setelah entitas pendukung dimodelkan (lihat §4).

## 3. Required UI Components (Shadcn/ui)
- `Split View` (dua panel): panel kiri `List` daftar percakapan (Avatar lawan bicara, preview pesan terakhir, timestamp, unread dot), panel kanan `Thread` tampilan bubble chat.
- `ScrollArea` — area scroll thread pesan dengan auto-scroll ke pesan terbaru.
- `Textarea` + `Button` (Royal Blue, `Send`) — komposer pesan baru di bagian bawah thread.
- `Badge` (dot merah kecil) — indikator jumlah pesan belum dibaca per percakapan di panel kiri.
- `Skeleton` — loading state panel kiri (daftar) dan panel kanan (thread).
- `EmptyState` — panel kanan saat belum ada percakapan dipilih: ikon besar 48px + "Pilih percakapan untuk memulai" atau (jika 0 percakapan sama sekali) "Belum ada pesan" + CTA "Cari Properti".

## 4. Data & State Management
- **GAP SKEMA:** Fitur ini memerlukan entitas database baru (`Message`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Tidak ada tabel percakapan/pesan di skema Fase 1 saat ini; `40_ERD.md` hanya memodelkan `USER`, `PROPERTY`, `PROPERTY_MEDIA`, `BOOKING`, `VERIFICATION_AUDIT`, `ACCOUNT`, `AUDIT_LOG`.
- **Proposed Entity Shape:**
  ```
  Conversation {
    id           uuid PK
    buyerId      uuid FK -> USER.id
    ownerId      uuid FK -> USER.id
    propertyId   uuid? FK -> PROPERTY.id   // konteks properti terkait, opsional
    createdAt    datetime
    @@unique([buyerId, ownerId, propertyId])
  }
  Message {
    id             uuid PK
    conversationId uuid FK -> Conversation.id
    senderId       uuid FK -> USER.id
    body           string
    readAt         datetime?
    createdAt      datetime
  }
  ```
- **Otorisasi:** Buyer hanya boleh melihat/mengirim pesan pada `Conversation` di mana `buyerId` cocok dengan sesi mereka — pola RLS ini harus direplikasi eksplisit seperti aturan `Buyer` pada `BOOKING` di `49_RLS_DOCUMENTATION.md` saat entitas ini dimodelkan.
- **Real-time:** Jika thread menampilkan pesan masuk secara live (WebSocket/polling), area pesan harus berupa ARIA live-region (`aria-live="polite"`) agar pesan baru diumumkan ke pembaca layar tanpa memindahkan fokus paksa.

## 5. API Endpoints Referenced
- Memerlukan entitas database baru (`Message`) yang belum ada di `40_ERD.md`/`42_TABLE_SPECIFICATION.md` — lihat rekomendasi audit Tahap 3. Endpoint yang diusulkan: `GET /api/v1/messages/conversations` (list percakapan Buyer, cursor pagination), `GET /api/v1/messages/conversations/:id` (riwayat pesan dalam satu thread), `POST /api/v1/messages/conversations/:id` (`{ body }`, kirim pesan baru) mengikuti konvensi REST yang sudah ada.
- `GET /api/v1/properties/:id` — sudah ada, dipakai untuk menampilkan konteks properti pada header thread (jika percakapan terkait properti tertentu).

## 6. Acceptance Criteria (DoD)
- [ ] Panel kiri kosong (0 percakapan) menampilkan `EmptyState` dengan ikon 48px Light Gray, teks Cool Gray, tombol CTA Royal Blue.
- [ ] Pesan belum dibaca ditandai dot/badge jelas dan hilang otomatis begitu thread dibuka (menandai `readAt`).
- [ ] Komposer pesan menonaktifkan tombol kirim saat input kosong; mendukung kirim via `Enter` (tanpa Shift) dan baris baru via `Shift+Enter`.
- [ ] Thread pesan real-time menggunakan `aria-live="polite"` pada container pesan baru, sesuai kebutuhan aksesibilitas notifikasi live-region.
- [ ] Navigasi antar percakapan (panel kiri) dan pengiriman pesan (panel kanan) sepenuhnya dapat dilakukan via keyboard.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `MessageSquare` | Header halaman "Pesan" & empty state (48px) | 20px / 48px |
| `Send` | Tombol kirim pesan pada komposer | 18px |
| `CheckCheck` | Indikator pesan telah dibaca lawan bicara | 14px |
| `Paperclip` | (Opsional) lampiran dokumen dalam pesan | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)
Halaman ini **DIWAJIBKAN** mematuhi pedoman visual `Mockup.png` — standar "Apple × Airbnb × Stripe × Zillow":

- **Background Utama:** `White` pada panel kiri, `slate-50` sangat lembut pada area bubble chat lawan bicara untuk membedakan dari bubble Buyer sendiri (Royal Blue solid dengan teks putih).
- **Empty State (wajib untuk halaman berbasis daftar/percakapan ini):** Ikon Lucide besar `48px` Light Gray, teks panduan Cool Gray, tombol aksi Royal Blue — sesuai `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §2.3.
- **Bubble Chat:** Sudut `rounded-2xl` asimetris (sudut dekat pengirim lebih kecil), shadow ultra-lembut hanya pada bubble Buyer.
- **Warna Aksi Utama:** `Royal Blue` (`blue-700`) untuk bubble pesan terkirim dan tombol kirim.
