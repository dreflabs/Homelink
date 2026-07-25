# 16. HOMELINK DESIGN LANGUAGE (HDL)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Feature Name:** HDL Component Rules
**Purpose:** Mengatur bagaimana komponen UI individual dikomposisikan bersama untuk membentuk antarmuka pengguna yang terpadu dan sesuai dengan estetika `Mockup.png`.

## 2. Core Directives

### 2.1. Iconography (Lucide React)
Semua ikon melambangkan fungsionalitas dan harus mematuhi aturan berikut:
- **Tipe Ikon:** Outline (Hanya garis tepi).
- **Stroke Width:** `1.5` (Tipis elegan ala Apple).
- **Library Tunggal:** Lucide React (Dilarang mencampur Heroicons/Material).

### 2.2. Imagery (Photography)
- **Hero Image & Properti:** Gambar besar harus mendapatkan pencahayaan yang **hangat (Warm Lighting)**, dan dipotong dengan sudut membulat raksasa (`rounded-3xl`).
- **Aspect Ratio:** Menjaga rasio 16:9 atau 4:3 yang proporsional. Gambar tidak boleh terlihat lonjong/gepeng (*object-cover* wajib digunakan).

### 2.3. Empty States & Loading
- **Skeleton Loader:** Menggunakan warna *Light Gray* dengan efek berdenyut (*pulse*) lembut. Ujung skeleton loader harus membulat selaras dengan *border radius* elemen yang dimuat (16px).
- **Empty States:** Halaman tanpa data (misal: "Belum ada wishlist") tidak boleh dibiarkan kosong. Wajib menyertakan ilustrasi sederhana atau Ikon Lucide React ukuran besar (`48px`) berwarna *Light Gray*, diikuti teks panduan *Cool Gray*, dan sebuah tombol aksi *Royal Blue*.

## 3. Z-Index & Layering
1. `z-50`: Modals, Dialogs, Toasts.
2. `z-40`: Sticky Navbars (Bilah Navigasi Atas).
3. `z-30`: Floating Action Buttons.
4. `z-0`: Konten Utama.

## 4. Acceptance Criteria
- [x] Antarmuka tidak terasa sesak (*cluttered*). Jarak (*Padding/Margin*) antar elemen harus ekstra lapang (Minimal `p-6` atau `p-8` pada Card utama).
