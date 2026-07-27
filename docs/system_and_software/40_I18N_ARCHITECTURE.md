# 40. I18N Architecture (Bilingual Support)

## 1. Pendahuluan
Dokumen ini berfungsi sebagai **Single Source of Truth** untuk implementasi *Internationalization* (i18n) di dalam HomeLink 2.0. Sistem dirancang untuk mendukung ekosistem dwibahasa secara natif menggunakan *App Router* dan *React Server Components* guna menjaga performa SEO dan waktu muat *(load time)*.

## 2. Pilihan Teknologi
Platform ini secara eksklusif menggunakan **`next-intl`** untuk merender dan mendistribusikan kamus bahasa.
- **Routing:** Rute dinamis berbasis *locale prefix* (`/[locale]/...`).
- **Middleware:** Menggunakan *Composite Middleware* (gabungan `next-intl/middleware` dan `NextAuth`) untuk meneruskan permintaan dari domain akar (`/`) ke bahasa bawaan dan melindungi halaman ber-restriksi.

## 3. Strategi Bahasa (Locale Strategy)
- **Supported Locales:** `id` (Bahasa Indonesia) dan `en` (Bahasa Inggris).
- **Default Locale:** `id` (Setiap kunjungan ke `https://homelink.id/` tanpa awalan bahasa akan dialihkan secara otomatis ke `https://homelink.id/id/`).

## 4. Struktur Kamus Terjemahan (Dictionary)
Kamus terjemahan disimpan dalam format JSON murni di *root* proyek.
- `/messages/id.json`
- `/messages/en.json`

Setiap berkas wajib memiliki kunci *(keys)* yang sepenuhnya identik. Jika `id.json` memiliki kunci yang tidak ada di `en.json`, aplikasi berpotensi memunculkan kesalahan rujukan pada waktu kompilasi (*build-time error*) atau sekadar meloloskan *key* sebagai teks mentah.

## 5. Konvensi Penamaan (Key Naming Convention)
Seluruh kunci terjemahan di dalam berkas JSON wajib dikelompokkan secara berlapis berdasarkan domain, halaman/komponen, dan elemen.

**Format Standar:**
`[Kategori/Domain Utama].[Halaman/Komponen].[Elemen/Aksi]`

**Contoh yang Benar:**
```json
{
  "Auth": {
    "login": {
      "title": "Selamat Datang Kembali",
      "emailLabel": "Alamat Email",
      "submitButton": "Masuk ke Akun"
    }
  },
  "PropertySearch": {
    "filters": {
      "priceRange": "Rentang Harga",
      "applyBtn": "Terapkan Filter"
    }
  }
}
```

## 6. Panduan Implementasi (Implementation Guidelines)
### A. Server Components
Pada *Server Components*, gunakan fungsi `getTranslations()` dari `next-intl/server`. Hal ini sangat direkomendasikan karena terjemahan langsung disuntikkan ke HTML dari server tanpa beban *(bundle)* tambahan di sisi klien.

```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('Auth.login');
  return <h1>{t('title')}</h1>;
}
```

### B. Client Components
Pada *Client Components* (ditandai dengan `"use client"`), gunakan *hooks* `useTranslations()` dari `next-intl`.

```tsx
"use client";
import { useTranslations } from 'next-intl';

export default function LoginForm() {
  const t = useTranslations('Auth.login');
  return <button>{t('submitButton')}</button>;
}
```

### C. Komponen Navigasi (Navigation)
Dilarang keras menggunakan `<Link>` bawaan dari `next/link` maupun `useRouter` dari `next/navigation`. Gunakan varian yang telah dibungkus oleh `next-intl` agar URL otomatis mendapat awalan *locale* (misal: otomatis menjadi `/id/dashboard` bukan `/dashboard`).

```tsx
import { Link, useRouter } from '@/i18n/routing';
```

## 7. Metrik Kualitas (Acceptance Criteria)
- Tidak ada seuntai *string* bahasa mentah (*hardcoded*) di dalam komponen antarmuka pengguna (`src/app/`, `src/components/`). Semua harus melalui `t('...')`.
- *Dropdown Language Switcher* di Navbar harus dapat mengganti URL *path* secara instan tanpa mengganggu atau menghapus *query parameters* (seperti filter pencarian).
