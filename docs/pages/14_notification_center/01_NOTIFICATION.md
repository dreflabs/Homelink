# NOTIFICATION PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Notification (Pusat Notifikasi In-App)
**Module:** 14 NOTIFICATION CENTER
**Purpose:** Panel notifikasi dalam-aplikasi (ikon lonceng + dropdown) yang dipakai lintas peran — entity yang sama menjadi gap yang sudah dicatat di `05_buyer_dashboard/10_NOTIFICATION.md`. Halaman ini adalah spesifikasi entity/backend-nya secara terpusat, bukan duplikat per peran.

## 2. Next.js Routing Path
```text
app/(dashboard)/_shared/notifications/page.tsx
```
Komponen dropdown lonceng dipakai di header semua dashboard (`27_DASHBOARD_DESIGN_GUIDELINES.md` §8.1 Shared Dashboard Shell) — bukan halaman penuh terpisah per peran.

## 3. Required UI Components (Shadcn/ui)
- `DropdownMenu` (`17_COMPONENT_LIBRARY.md` §8.2) — daftar notifikasi terbaru, badge titik merah jika ada yang belum dibaca.
- `EmptyState` — tidak ada notifikasi.

## 4. Data & State Management
- **Gap skema fondasional (diusulkan sekali di sini, dirujuk oleh 4 halaman lain modul ini):**
  ```
  Notification {
    id          String   @id @default(uuid())
    userId      String   // FK -> USER, penerima
    type        String   // "BOOKING_CONFIRMED" | "PROPERTY_VERIFIED" | dst.
    title       String
    body        String
    isRead      Boolean  @default(false)
    relatedEntityId String? // mis. propertyId/bookingId
    createdAt   DateTime @default(now())
  }
  NotificationTemplate {
    id       String @id @default(uuid())
    key      String @unique // "BOOKING_CONFIRMATION_WA", "OTP_SMS", dst.
    channel  String // EMAIL | SMS | WHATSAPP | IN_APP
    subject  String?
    body     String
  }
  ```
  **Catatan penting:** `Notification` (event yang diterima pengguna, dicatat di sini) **berbeda konsep** dari `NotificationTemplate` (pola konten yang dipakai ulang, lihat `05_TEMPLATE.md`) — dua entity terpisah, jangan disatukan.
- Sampai skema tersedia, dropdown lonceng merender `EmptyState` di semua dashboard, bukan angka `0` palsu.

## 5. API Endpoints Referenced
- Diusulkan `GET /api/v1/notifications?userId=me`, `PATCH /api/v1/notifications/:id/read` — belum ada di `52_ENDPOINT_CATALOGUE.md`.

## 6. Acceptance Criteria (DoD)
- [ ] Satu entity `Notification` dipakai lintas seluruh 8 dashboard peran — tidak diduplikasi per modul (`05_buyer_dashboard/10_NOTIFICATION.md` mewarisi skema ini, tidak mendefinisikan ulang).
- [ ] Badge jumlah belum dibaca dihitung real-time (revalidasi saat dropdown dibuka), bukan di-cache berlebihan.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Bell` | Ikon lonceng header | 20px |
| `BellDot` | Ada notifikasi belum dibaca | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — komponennya dipakai lintas Shared Dashboard Shell (`27` §8.1), mewarisi token dari `15_DESIGN_SYSTEM.md` dan komponen dari `17_COMPONENT_LIBRARY.md`.
