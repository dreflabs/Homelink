# 72. INFRASTRUCTURE ARCHITECTURE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
**Feature Name:** Cloud & System Infrastructure Blueprint

## 2. Purpose
Menggambarkan topologi infrastruktur fisik dan virtual yang mendukung berjalannya platform, menunjukkan bagaimana *traffic* mengalir dari pengguna ke *database*.

## 3. Scope
- DNS & CDN (Cloudflare).
- Compute (Hostinger VPS).
- Storage (R2).

## 4. Audience
- **DevOps, CTO, dan Backend Engineers**

## 5. Dependencies
- `71_DEPLOYMENT_GUIDE.md` — langkah konkret provisioning komponen (Nginx, PM2, SSL) yang digambarkan pada topologi dokumen ini.
- `74_MONITORING.md` — pemantauan kesehatan tiap simpul (Nginx, PM2, PostgreSQL) yang ada pada arsitektur ini.

## 6. Definitions
- **DNS:** Domain Name System, layanan yang menerjemahkan nama domain ke alamat IP.
- **CDN:** Content Delivery Network, jaringan yang men-*cache* aset statis dekat dengan pengguna.
- **WAF:** Web Application Firewall, lapisan penyaring *traffic* berbahaya di depan aplikasi.
- **R2:** Layanan *object storage* Cloudflare, alternatif S3 tanpa biaya *egress*.
- **Opex:** Operational Expenditure, biaya operasional berkelanjutan infrastruktur.

## 7. Architecture
Traffic pengguna melewati Cloudflare DNS, WAF, dan CDN sebelum mencapai Nginx Reverse Proxy di Hostinger VPS, yang meneruskan ke PM2 Cluster Node.js dan PostgreSQL; unggah/unduh berkas besar dilakukan langsung ke Cloudflare R2 tanpa melewati VPS.

## 8. Requirements

### 8.1. Topologi (Traffic Flow)
```mermaid
graph TD
    User([User / Browser])
    
    subgraph Cloudflare Global Network
        DNS[Cloudflare DNS]
        CDN[Cloudflare CDN Cache]
        WAF[Web Application Firewall]
    end
    
    subgraph Hostinger VPS (Indonesia)
        NGINX[Nginx Reverse Proxy]
        PM2[PM2 Cluster Node.js]
        PG[(PostgreSQL Database)]
    end
    
    subgraph Cloudflare Storage
        R2[(R2 Bucket Object Storage)]
    end

    User --> DNS
    DNS --> WAF
    WAF --> CDN
    CDN -- Cache Miss --> NGINX
    NGINX --> PM2
    PM2 <--> PG
    User -.->|Direct Upload/Download| R2
```

### 8.2. Efisiensi Infrastruktur (Biaya vs Performa)
Arsitektur di atas dirancang untuk meredam beban VPS (menjaga biaya Opex Hostinger tetap rendah).
- **CDN Cloudflare:** Akan menyerap $80\%$ *request* gambar dan aset statis HTML sebelum mencapai VPS.
- **R2 Storage:** Menghindari penyimpanan gambar di *disk* VPS. Membebaskan I/O VPS sehingga 100% fokus untuk mengeksekusi logika Next.js dan *query* Prisma.

## 9. Implementation
- Pengaturan domain wajib melalui *Nameservers* milik Cloudflare, bukan registrar domain biasa.

## 10. Acceptance Criteria
- [x] *Traffic* aset statis (`/_next/static/*`) memunculkan *header* `cf-cache-status: HIT`.

## 11. Future Improvements
- Fase 3/4: Mengevaluasi multi-region VPS atau load balancer jika traffic melebihi kapasitas satu simpul Hostinger.

## 12. References
- Cloudflare CDN & WAF Documentation.
- Cloudflare R2 Object Storage Documentation.

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
| 1.0.1   | 2026-07-24 | Documentation Audit  | APPROVED | Distandarisasi ke template 13-bagian (Dependencies, Definitions, Architecture, Future Improvements, References, Version History ditambahkan) untuk konsistensi dengan kategori dokumen lain di corpus. |
