# Laporan Audit Deployment & PM2 (VPS Hostinger)

Berikut adalah laporan detail dari hasil peninjauan (*audit*) lingkungan *server* VPS (IP: 72.61.208.178) setelah proses pengiriman (*deployment*) otomatis **HomeLink 2.0** berhasil dijalankan:

## 1. Status PM2 (Process Manager)
Sistem PM2 di peladen Anda kini menangani 6 aplikasi yang berjalan secara paralel dan berdampingan tanpa saling menabrak:

| ID | Nama Aplikasi | Status | Versi | Port | Pengamatan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **7** | **homelink** | 🟢 **Online** | N/A | **3002** | *Baru diluncurkan via GitHub Actions (sukses)* |
| 5 | menuflow-customer-web | 🟢 Online | 14.2.35 | (Bawaan) | *Tidak tersentuh, berjalan stabil selama 8 hari* |
| 4 | menuflow-dashboard | 🟢 Online | 14.2.3 | (Bawaan) | *Tidak tersentuh, berjalan stabil selama 8 hari* |
| 0 | solasido | 🟢 Online | N/A | (Bawaan) | *Tidak tersentuh, berjalan stabil selama 11 hari* |
| 6 | thisissukabumi | 🟢 Online | N/A | (Bawaan) | *Tidak tersentuh, berjalan stabil selama 6 hari* |
| 2 | tjslp-web | 🟢 Online | N/A | (Bawaan) | *Tidak tersentuh, berjalan stabil selama 11 hari* |

> [!TIP]
> **Mengapa Ini Aman?** 
> Saya mengatur spesifikasi `--name homelink` dalam skrip `deploy.yml`. PM2 akan menjalankan proses Node.js HomeLink secara terisolasi (PID: `321761`), dan tidak akan pernah menghentikan (kill) ID proses lainnya.

## 2. Alokasi Port Lingkungan (Network Ports)
Berdasarkan hasil `netstat`, ada sangat banyak aplikasi Next.js/Node yang sebelumnya memonopoli port `3000` dan `3001` (ditempati kemungkinan oleh *menuflow* atau *thisissukabumi*). 

HomeLink secara cerdas saya arahkan untuk mendengarkan port yang sama sekali belum digunakan, yaitu **Port 3002**. 

- `tcp6 0 0 :::3002 :::* LISTEN 321773/next-server`

## 3. Konfigurasi CI/CD Cerdas
Ke depannya, jika Anda mengubah kode dan melakukan pembaruan di GitHub, GitHub Actions TIDAK akan mendaftarkan aplikasi baru di PM2, melainkan menggunakan perintah *Restart*:
`pm2 describe homelink > /dev/null && pm2 restart homelink`

Ini akan memberikan *zero-downtime* reload pada aplikasi Anda tanpa menghabiskan lebih banyak RAM.

## 4. Rekomendasi Lanjutan (Reverse Proxy)
Saat ini HomeLink 2.0 menyala di porta 3002 internal VPS Anda. Langkah Anda selanjutnya adalah mengatur **Nginx Reverse Proxy** untuk meneruskan lalu lintas domain utama Anda (misalnya `homelink.id`) agar mengarah langsung ke `http://localhost:3002`.

Apakah Anda ingin saya membantu mengecek atau membuatkan berkas konfigurasi Nginx-nya, atau Anda akan mengaturnya sendiri melalui panel manajemen peladen Anda?
