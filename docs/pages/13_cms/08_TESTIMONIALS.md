# TESTIMONIALS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Testimonials (Kelola Testimoni)
**Module:** 13 CMS
**Role:** CMS Editor
**Purpose:** Mengelola testimoni pelanggan yang tampil di homepage/halaman publik — fitur yang eksplisit diminta di proposal fitur homepage sebelumnya ("Customer Testimonials").

## 2. Next.js Routing Path
```text
app/(dashboard)/cms/testimonials/page.tsx
```
Sidebar label: "Testimoni".

## 3. Required UI Components (Shadcn/ui)
- `Table` — nama, peran/konteks, status unggulan.
- `Textarea` — isi testimoni.
- `Switch` — `isFeatured` (tampil di homepage vs hanya tersimpan).

## 4. Data & State Management
- Menggunakan `Testimonial` yang diusulkan di `01_DASHBOARD.md` §4 — tidak didefinisikan ulang.
- **Catatan integritas konten:** testimoni yang ditampilkan harus benar-benar berasal dari pengguna nyata (mengacu pada prinsip "Kejujuran Mutlak" di `11_VALUE_PROPOSITION.md`) — CMS Editor input di sini adalah representasi testimoni yang sudah diverifikasi/diberi izin, bukan konten yang dikarang.

## 5. API Endpoints Referenced
- Diusulkan `/api/v1/cms/testimonials`, menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Maksimal testimoni `isFeatured=true` dibatasi (mis. 3-6) agar homepage tidak penuh sesak — konsisten dengan prinsip whitespace `16_HOMELINK_DESIGN_LANGUAGE_HDL.md` §8.3.
- [ ] Field `authorName` wajib diisi, tidak ada testimoni anonim tanpa atribusi (menjaga kredibilitas).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `MessageSquareQuote` | Header halaman | 20px |
| `Star` | Penanda testimoni unggulan | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`.
