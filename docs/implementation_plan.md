# Implementation Plan: Admin Dashboard & Layout

## Deskripsi
Membuat struktur layout (Sidebar) dan halaman Dashboard operasional untuk role Admin di module 11_admin, sesuai dengan dokumentasi `docs/pages/11_admin/01_DASHBOARD.md` dan permintaan User.

## Perubahan Kode
1. **Membuat File Layout Admin (`src/app/(11_admin)/admin/layout.tsx`)**:
   - Membuat sidebar statis (kiri) beraksen abu-abu formal (`bg-slate-50 border-slate-200`).
   - Menyertakan menu navigasi: **Dashboard** (`/admin`), **Users** (`/admin/users`), **Properties** (`/admin/properties`), dan **Reports** (`/admin/reports`).
   - Menggunakan ikon dari `lucide-react`.
   - Membuat area konten utama (kanan) yang responsif dan mengikuti estetika desain Apple x Stripe.

2. **Membuat File Page Admin Dashboard (`src/app/(11_admin)/admin/page.tsx`)**:
   - Merender _Stat Tiles_ berupa kartu KPI secara dummy sementara (Active Users, Pending Verifications, Total Agents).
   - Menggunakan komponen Shadcn UI standar (`Card`, `CardHeader`, `CardTitle`, `CardContent`).
   - Menggunakan styling estetika premium (background `White`, aksi utama `Royal Blue` / `blue-700`, teks `slate-900`, radius `rounded-2xl`).
   - Menambahkan section "Aktivitas Terbaru" berupa tabel/list dummy (sesuai spesifikasi).

## Batasan
Sesuai **Global Rules HomeLink 2.0**, meskipun instruksi eksplisit meminta pekerjaan dilakukan "secara otonom tanpa meminta persetujuan", kami **WAJIB** menyusun `implementation_plan.md` ini terlebih dahulu dan meminta *Approval* dari Anda selaku User sebelum mengubah kode apapun. 

Mohon berikan persetujuan Anda agar saya dapat mulai menulis kode.
