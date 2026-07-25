# ACCOUNT SUSPENDED PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Account Suspended
**Module:** 02 AUTHENTICATION
**Purpose:** Memberi tahu pengguna bahwa akunnya telah ditangguhkan oleh Admin (mis. pelanggaran kebijakan, laporan penyalahgunaan), memblokir akses lebih lanjut ke seluruh fitur aplikasi, dan mengarahkan pengguna ke saluran dukungan resmi untuk mengajukan banding — bukan halaman error teknis, melainkan halaman keputusan moderasi (`FORBIDDEN_ACTION`, 403).

## 2. Next.js Routing Path
```text
app/(02_authentication)/account-suspended/page.tsx
```
Halaman ini dirender sebagai halaman penuh (bukan modal) dan menjadi **satu-satunya rute yang dapat diakses** oleh pengguna dengan akun berstatus suspended — middleware/route guard harus memaksa redirect ke sini pada setiap percobaan navigasi ke rute lain (kecuali logout), sesuai penanganan error `FORBIDDEN_ACTION` (403) di `54_*` error code catalogue.

## 3. Required UI Components
- **Tidak ada form input sama sekali** — ini murni halaman informational/alert, bukan formulir data.
- `Alert`/Banner besar (bukan merah menyala penuh — profesional, bukan punitif) menjelaskan status akun ditangguhkan.
- Teks penjelasan singkat (jika tersedia dari Admin: alasan penangguhan) — jika alasan tidak diekspos ke pengguna, tampilkan pesan umum yang tetap actionable.
- `Button` (variant `default`) — "Hubungi Dukungan" (CTA utama, menuju form/kontak support, email, atau live chat).
- Link — "Keluar" (logout), satu-satunya navigasi lain yang diizinkan dari halaman ini.
- Tidak ada `Skeleton` loading state kompleks — status ini sudah diketahui dari sesi pengguna saat halaman dimuat.

## 4. Data & State Management
- **Local State:** minimal — hanya state UI CTA (mis. loading saat klik "Hubungi Dukungan" jika membuka form kontak inline).
- **Server State:** status suspended diverifikasi di server (Server Component/middleware) berdasarkan data `USER` sebelum halaman dirender — TIDAK boleh hanya dicek di client, karena ini adalah kontrol akses keamanan, bukan sekadar tampilan.
- Tidak ada Zod schema — tidak ada form submit di halaman ini.
- Tidak ada pengambilan data tambahan selain status akun dan (jika ada) alasan penangguhan serta kontak dukungan yang relevan (mis. nomor tiket, ID kasus jika ada).

## 5. API Endpoints Referenced
- Tidak ada endpoint POST/PUT terkait di halaman ini. Status akun `suspended` diasumsikan sebagai bagian dari data `USER` yang diperiksa saat autentikasi/otorisasi setiap request (dicek di middleware, bukan endpoint khusus).
- **Catatan:** field/flag "suspended" dan alur moderasi (siapa yang bisa suspend, apakah ada tabel audit) tidak eksplisit disebut di ERD (`USER` table) pada SSOT yang tersedia — perlu dikonfirmasi apakah ini kolom tambahan (mis. `USER.status` enum) atau tabel terpisah, dan dicatat sebagai gap untuk diklarifikasi dengan tim data model, bukan diasumsikan.
- CTA "Hubungi Dukungan" mengarah ke saluran kontak (email/live chat) yang belum tercantum di `52_ENDPOINT_CATALOGUE.md` sebagai endpoint terintegrasi — kemungkinan besar ini adalah link eksternal/mailto, bukan endpoint API `/api/v1`.
- `POST /api/v1/auth/logout` — satu-satunya endpoint Auth yang relevan langsung di halaman ini (untuk CTA "Keluar").

## 6. Acceptance Criteria (DoD)
- [ ] Pengguna dengan akun suspended TIDAK DAPAT mengakses navigasi aplikasi lain — setiap percobaan (langsung via URL, back button, dsb.) diarahkan kembali ke halaman ini oleh middleware/route guard sisi server.
- [ ] Halaman tidak menampilkan sidebar, navbar, atau elemen navigasi global aplikasi — hanya logo, pesan status, CTA dukungan, dan logout.
- [ ] Tombol Browser Back tidak dapat digunakan untuk "melarikan diri" dari status suspended ke halaman yang membutuhkan otorisasi (dicegah di level middleware/server, bukan hanya UI).
- [ ] Nada pesan profesional dan netral, TIDAK menghakimi atau menuduh ("Akun Anda telah ditangguhkan sementara. Hubungi tim dukungan kami untuk informasi lebih lanjut dan proses banding.") — bukan bahasa punitif seperti "Anda telah melanggar aturan!".
- [ ] CTA "Hubungi Dukungan" berfungsi dan mudah ditemukan tanpa perlu scroll di viewport standar (desktop & mobile).
- [ ] Halaman tetap dapat diakses dan dibaca dengan screen reader; fokus keyboard otomatis ke elemen pesan utama saat halaman dimuat (tidak ke elemen dekoratif).

## 7. Iconography Specification
- `ShieldAlert` — ikon utama status, tegas namun tidak mengancam (dipilih dibanding `Ban` yang terasa lebih punitif/melarang mutlak, sesuai catatan brand tone di bawah — `Ban` dapat digunakan sebagai alternatif jika tim desain memutuskan nada lebih formal/hukum).
- `LifeBuoy` — pada CTA "Hubungi Dukungan", memperkuat kesan bantuan bukan hukuman.
- `LogOut` — pada link keluar/logout.

## 8. UI/UX Aesthetic Rules
Konsisten dengan Design System: Background White, Dark Navy untuk teks, radius rounded-2xl/3xl, bayangan lembut.
- **Wajib menghindari styling merah-dominan/alarming** sesuai brand tone HomeLink — halaman ini harus terasa profesional dan solutif, bukan punitif; gunakan Dark Navy dan Muted Cool Gray sebagai warna utama, dengan aksen Royal Blue pada CTA "Hubungi Dukungan" (bukan merah), agar selaras dengan prinsip bahwa bahkan status negatif tetap disampaikan dengan tenang dan hormat kepada pengguna.
- Layout sangat minimal dan terpusat — tidak ada elemen dekoratif seperti hero image/warm lighting yang dipakai di halaman lain, karena konteks halaman ini menuntut kejelasan dan keseriusan yang proporsional, bukan promosi visual.
