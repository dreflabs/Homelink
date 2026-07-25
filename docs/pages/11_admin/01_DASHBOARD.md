# DASHBOARD PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Admin Dashboard
**Module:** 11 ADMIN
**Purpose:** Landing page bagi role `ADMIN` setelah login — memberi ringkasan operasional harian dalam sekali pandang sehingga Admin dapat memprioritaskan pekerjaan moderasi (verifikasi properti yang mendekati tenggat SLA 24 jam, laporan pengguna, aktivitas platform terbaru) tanpa harus membuka setiap sub-halaman satu per satu. Berfungsi sebagai command center, bukan halaman kerja detail — setiap kartu ringkasan menaut ke halaman kerja terkait (`05_VERIFICATION_QUEUE`, `02_USER_MANAGEMENT`, `04_PROPERTY_MANAGEMENT`).

## 2. Next.js Routing Path
```text
app/(dashboard)/11_admin/dashboard/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Card` — 4 kartu KPI ringkasan: "Antrean Verifikasi" (count PROPERTY berstatus PENDING/PHYSICAL_VERIFIED/LEGAL_VERIFIED menunggu aksi), "Total Pengguna Aktif", "Total Properti Live" (FULLY_VERIFIED), "Properti Ditolak (7 hari terakhir)".
- `Badge` — indikator SLA-risk (mis. properti sudah > 20 jam di antrean, warna amber/merah) pada kartu Antrean Verifikasi.
- `Table` (ringkas, 5 baris) — daftar aktivitas terbaru dari `AUDIT_LOG` yang di-*trigger* oleh Admin (approve/reject/suspend terakhir).
- `Skeleton` — loading state untuk setiap kartu KPI saat data belum tiba dari RSC fetch.
- `Button` (variant link/ghost) — "Lihat Semua" pada tiap kartu, menaut ke halaman kerja terkait.

## 4. Data & State Management
- **Server State:** RSC melakukan agregasi paralel: hitung `PROPERTY` per status, hitung `USER` per role, dan ambil 5 entri terbaru dari `AUDIT_LOG` yang `actorId` = Admin manapun. Tidak ada entitas dashboard/summary tersendiri — semua angka dihitung on-the-fly dari entitas ERD yang ada (`PROPERTY`, `USER`, `AUDIT_LOG`).
- **Local State:** Tidak ada form; hanya state UI ringan untuk expand/collapse kartu aktivitas terbaru (client component kecil di atas RSC).
- **Revalidation:** Data KPI di-*revalidate* tiap kali Admin melakukan aksi approve/reject/suspend dari halaman lain (`revalidatePath('/admin/dashboard')`), karena tidak ada nilai real-time streaming di Fase 1.

## 5. API Endpoints Referenced
- `GET /api/v1/properties?status=PENDING` (dan varian status lain) — untuk hitung antrean.
- `GET /api/v1/admin/users` — **GAP: endpoint ini belum terdaftar** di `52_ENDPOINT_CATALOGUE.md`; diusulkan untuk agregasi jumlah user per role.
- **GAP:** Tidak ada endpoint agregasi tunggal (mis. `GET /api/v1/admin/dashboard/summary`) — saat ini dashboard harus memanggil beberapa endpoint list lalu menghitung count di server component, yang tidak efisien untuk skala besar. Direkomendasikan menambah endpoint agregasi khusus di Fase 2.

## 6. Acceptance Criteria (DoD)
- [ ] Kartu "Antrean Verifikasi" menampilkan badge merah jika ada properti yang sudah menunggu > 20 jam (mendekati SLA 24 jam per `88_ADMIN_MANUAL.md`).
- [ ] Semua angka KPI dihitung dari data live (bukan hardcoded/mock) saat integrasi backend tersedia.
- [ ] Setiap kartu KPI dapat diklik/navigasi via keyboard (Tab + Enter) menuju halaman kerja terkait.
- [ ] Halaman dirender tanpa *hydration error*; skeleton tampil maksimal 1 halaman-load sebelum data live muncul.
- [ ] Lolos audit Lighthouse Aksesibilitas > 90.

## 7. Iconography Specification
**Library:** Lucide React ONLY, `strokeWidth={1.5}`.

#### Icon: `ClipboardCheck`
- **Purpose:** Merepresentasikan kartu KPI "Antrean Verifikasi".
- **Size:** 20px (Desktop), 24px (Mobile). **Color:** `text-blue-700` di header kartu.

#### Icon: `Users`
- **Purpose:** Kartu KPI "Total Pengguna Aktif".
- **Size:** 20px. **Color:** `text-slate-500` default, `text-blue-700` saat hover kartu.

#### Icon: `Home`
- **Purpose:** Kartu KPI "Total Properti Live".
- **Size:** 20px. **Color:** `text-slate-500`.

#### Icon: `History`
- **Purpose:** Header seksi "Aktivitas Terbaru" (feed dari `AUDIT_LOG`).
- **Size:** 18px. **Color:** `text-slate-500`. **Accessibility:** `aria-hidden="true"` (selalu didampingi label teks "Aktivitas Terbaru").

## 8. UI/UX Aesthetic Rules
Mengikuti Design System global HomeLink 2.0 ("Apple × Airbnb × Stripe × Zillow"): background `White`, aksi utama `Royal Blue` (`blue-700`), teks `slate-900`, surface sekunder `slate-50`, shadow ultra-lembut, radius `rounded-2xl`/`rounded-3xl`.

**Catatan kepadatan khusus Admin:** Dashboard ini adalah entry point data-dense — grid 4 kolom kartu KPI pada desktop (2 kolom pada tablet, stack pada mobile), tanpa hero image/fotografi marketing. Badge status memakai kode warna konsisten dengan seluruh modul Admin: hijau = aman/terverifikasi, amber = mendekati SLA/perlu perhatian, merah = melewati SLA/ditolak.
