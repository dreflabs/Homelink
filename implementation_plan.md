# Implementation Plan: Server Action `createProperty`

## Deskripsi Tugas
Membuat fungsi Server Action untuk menyimpan data properti baru ke database. Fungsi ini akan dipanggil dari sisi klien (form submission) dan hanya dapat diakses oleh pengguna dengan role Owner yang sudah terautentikasi.

## Langkah-langkah Implementasi

1. **Pembuatan File**: 
   Membuat file baru di `src/lib/actions/property.ts`.

2. **Direktif "use server"**:
   Mendeklarasikan `"use server";` di baris pertama file untuk menandai bahwa ini adalah Server Action di Next.js.

3. **Import Dependencies**:
   - `auth` dari `@/lib/auth` untuk mengambil sesi pengguna.
   - `PrismaClient` dari `@prisma/client` untuk inisialisasi koneksi database.
   - `revalidatePath` dari `next/cache` untuk merevalidasi halaman setelah properti berhasil dibuat.

4. **Pembuatan Fungsi `createProperty`**:
   - Mendeklarasikan `export async function createProperty(formData: FormData)`.
   - **Autentikasi**: Memanggil `auth()` untuk mendapatkan session pengguna. Jika tidak ada session, akan melempar error "Unauthorized".
   - **Ekstraksi Data**: Mengambil nilai-nilai berikut dari `formData`:
     - `title` (string)
     - `description` (string)
     - `price` (dikonversi ke angka/Decimal)
     - `type` (atau `propertyType` sesuai schema, string)
     - `address` (string)
     - `lat` (dikonversi ke Float)
     - `lng` (dikonversi ke Float)
   - **Type Casting & Validasi**:
     - Memastikan konversi tipe data yang diterima (string) menjadi tipe data yang sesuai di Prisma (`Decimal` untuk `price`, `Float` untuk `latitude` & `longitude`).
   - **Simpan ke Database**:
     - Memanggil `prisma.property.create`.
     - Mengisi kolom-kolom yang diperlukan, menyambungkan dengan `ownerId` dari `session.user.id`.
     - Set `status` ke `"PENDING"`.
   - **Revalidasi**: Memanggil `revalidatePath('/owner/properties')` agar tabel atau daftar properti milik owner langsung ter-update di antarmuka pengguna.

Mohon berikan persetujuan (*approval*) Anda agar saya dapat melanjutkan ke tahap penulisan kode ini.
