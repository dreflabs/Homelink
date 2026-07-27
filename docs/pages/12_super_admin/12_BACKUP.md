# BACKUP PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Backup
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Memantau status backup database harian dan memungkinkan Super Admin memicu restore manual jika diperlukan, sesuai `47_BACKUP_AND_RESTORE.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/backup/page.tsx
```
Sidebar label: "Backup", di bawah grup nav "Security & Infra".

## 3. Required UI Components (Shadcn/ui)
- `Table` — riwayat backup (tanggal, ukuran, status sukses/gagal).
- `Button` (`destructive` variant) — trigger restore, dengan konfirmasi berlapis (aksi paling berbahaya di seluruh platform).

## 4. Data & State Management
- **Gap implementasi yang sudah diakui dokumennya sendiri:** `47_BACKUP_AND_RESTORE.md` menandai skrip `backup_db.sh` (cron `pg_dump -Fc` harian ke R2) sebagai **`[ ] PLANNED / Belum diimplementasikan`** di kriteria akseptansinya sendiri. Halaman ini tidak dapat menampilkan riwayat backup nyata sampai skrip tersebut berjalan di produksi.
- Sampai saat itu, halaman merender status "Backup otomatis belum aktif — lihat `47_BACKUP_AND_RESTORE.md`" secara eksplisit, bukan tabel riwayat kosong.

## 5. API Endpoints Referenced
- Tidak ada endpoint aplikasi — backup dijalankan via cron VPS langsung (`47_BACKUP_AND_RESTORE.md`), bukan dipicu dari HomeLink API. Halaman ini paling banyak bisa membaca file manifest backup dari R2 (jika ada), bukan mengontrol prosesnya dari UI.

## 6. Acceptance Criteria (DoD)
- [ ] Tombol restore memerlukan minimal dua langkah konfirmasi eksplisit dan idealnya autentikasi ulang (re-auth) mengingat tingkat risikonya — tidak pernah aksi satu klik.
- [ ] Halaman menyatakan status implementasi backup otomatis dengan jujur, bukan seolah-olah sudah berjalan.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `DatabaseBackup` | Header halaman | 20px |
| `AlertTriangle` | Peringatan sebelum restore | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.
