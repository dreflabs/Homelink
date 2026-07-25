# 27. SYSTEM ARCHITECTURE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Master System Architecture

## 2. Purpose
To define the complete end-to-end technical infrastructure of the HomeLink 2.0 platform. This document serves as the top-level bird's-eye view of how all systems interact.

## 3. Scope
Covers Client Tier, Application Tier (Next.js), Database Tier (PostgreSQL), and Cloud Services (VPS, Cloudflare).

## 4. Audience
- **CTO & Technical Architects:** For system design and scaling decisions.
- **DevOps Engineers:** For provisioning infrastructure.

## 5. Dependencies
- Directly supports the performance requirements defined in `05_NON_FUNCTIONAL_REQUIREMENT_SPECIFICATION_NFRS.md`.

## 6. Definitions
- **SSR / SSG:** Server-Side Rendering / Static Site Generation.
- **Reverse Proxy:** A server that sits in front of web servers and forwards client requests (e.g., Nginx).

## 7. Architecture

### 7.1. C4 Model (Level 1: System Context)

```mermaid
graph TD
    %% Define Styles
    style Client fill:#0F172A,stroke:#F8FAFC,stroke-width:2px,color:#fff
    style App fill:#10B981,stroke:#F8FAFC,stroke-width:2px,color:#fff
    style DB fill:#F59E0B,stroke:#F8FAFC,stroke-width:2px,color:#000

    Client(Web Browser / Mobile)
    
    subgraph Cloudflare Edge
        CDN[Cloudflare CDN & WAF]
        R2[Cloudflare R2 Object Storage]
    end

    subgraph Hostinger VPS (Ubuntu)
        Nginx[Nginx Reverse Proxy]
        App[Next.js 16 Node Server - PM2]
        DB[(PostgreSQL 16)]
    end
    
    Client -->|HTTPS / WSS| CDN
    CDN -->|Cache Hit| Client
    CDN -->|Cache Miss / Dynamic| Nginx
    
    Nginx -->|Port 3000| App
    
    App -->|Prisma ORM| DB
    App -.->|Presigned URLs| R2
    Client -.->|Direct Upload via URL| R2
```

## 8. Requirements

### 8.1. Client Tier
- Dibangun dengan **React 19** menggunakan pola Next.js App Router.
- Fokus eksekusi ada pada Server Components (RSC) untuk mengurangi ukuran *bundle* JavaScript di *client-side*.

### 8.2. Application Tier (Hostinger VPS)
- **Runtime:** Node.js v20 LTS.
- **Process Manager:** PM2 dikonfigurasi dalam mode *Cluster* (menjalankan *instance* sesuai jumlah core CPU).
- **Web Server:** Nginx bertindak sebagai *reverse proxy*, penanganan SSL/TLS (Let's Encrypt), dan *rate limiter*.

### 8.3. Data & Storage Tier
- **Database Utama:** PostgreSQL 16 yang berjalan secara lokal di VPS (di-deploy via Docker/native) untuk meminimalkan latensi jaringan antara App dan DB.
- **Object Storage:** Cloudflare R2 (S3-compatible) digunakan secara eksklusif untuk menyimpan aset berat (Foto Resolusi Tinggi, Dokumen PDF) dengan *egress fee* $0.

## 9. Implementation
- The deployment script must ensure Nginx strictly forwards traffic on port 80/443 to the internal PM2 port (default 3000) using `proxy_pass`.

## 10. Acceptance Criteria
- [x] Clear mapping of request flow from Client to Database.
- [x] Explicit definition of boundaries between the VPS and external cloud services (Cloudflare).

## 11. Future Improvements
- Migration of the PostgreSQL database from a single VPS node to a Managed Database cluster in Phase 3 for High Availability.

## 12. References
- *Next.js Deployment Architecture Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
