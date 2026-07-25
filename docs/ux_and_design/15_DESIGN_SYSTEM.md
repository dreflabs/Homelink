# 15. DESIGN SYSTEM (MOCKUP ALIGNED)
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Feature Name:** Design System (Token Specifications)
**Purpose:** Panduan absolut bagi *Frontend Engineers* untuk mendefinisikan Token Tailwind CSS di `tailwind.config.ts`, memastikan seluruh antarmuka 100% identik dengan referensi `Mockup.png`.

## 2. Core Aesthetic Philosophy
Gaya visual HomeLink 2.0 merupakan perpaduan antara **Apple × Airbnb × Stripe × Zillow**. Ciri khas utamanya adalah: Bersih, Mewah, dan Hangat.

## 3. Color Palette Tokens

### 3.1. Backgrounds & Surfaces
- **Global Background:** Dominan **White** (`#FFFFFF`). Memberikan kesan lega dan minimalis murni.
- **Surface / Secondary Background:** **Light Gray** (`#F7F9FC`). Digunakan untuk memisahkan bagian halaman (*section divider*) tanpa menggunakan garis tegas, atau sebagai *background* tombol sekunder.

### 3.2. Brand & Action Colors
- **Primary Color:** **Royal Blue** (`#1D4ED8` atau ekivalen Tailwind `blue-700`). Warna ini mewakili kepercayaan dan profesionalitas tingkat tinggi. Digunakan eksklusif untuk tombol aksi utama (*Call to Action*), *Active States*, dan *Link*.

### 3.3. Typography Colors
- **Heading & Primary Text:** **Dark Navy** (`#0F172A` atau `slate-900`). **DILARANG** menggunakan Hitam Pekat (`#000000`). *Dark Navy* jauh lebih elegan di mata dan mencerminkan kemewahan.
- **Muted Text (Subtitle/Placeholder):** *Cool Gray* (`#64748B` atau `slate-500`).

## 4. Typography System
- **Font Family:** `Inter` (Sans-serif) dipadukan dengan `SF Pro Display` (jika diakses dari Apple Devices).
- **Weight:** Mengandalkan *Semibold* (600) untuk *Heading* dan *Medium* (500) untuk Label/Tombol.

## 5. Shape & Elevation (Cards)
- **Border Radius:** Sangat Membulat (*Highly Rounded*). Semua elemen besar (Card, Modal, Hero Image) wajib menggunakan radius **16px hingga 24px**.
  - *Tailwind Equivalent:* `rounded-2xl` (16px) hingga `rounded-3xl` (24px).
- **Shadows:** *Card* warna putih harus diangkat dari *background* menggunakan bayangan yang sangat lembut dan luas (*Diffused Soft Shadow*).
  - *Tailwind Equivalent:* `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`. Dilarang menggunakan bayangan bawaan yang kasar (seperti `shadow-md`).

## 6. Implementation (Tailwind CSS)
Token ini **wajib** didefinisikan di `tailwind.config.ts` pada tahap awal inisiasi proyek (Fase Engineering).
