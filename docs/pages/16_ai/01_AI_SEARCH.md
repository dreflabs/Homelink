# AI SEARCH PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** AI Search (Konfigurasi & Uji Coba Pencarian Semantik)
**Module:** 16 AI
**Role:** Admin/Super Admin
**Purpose:** Panel konfigurasi dan pengujian mesin pencarian semantik AI — **berbeda dari `03_property_search/01_SEARCH_RESULT.md`** (yang merupakan UI pencarian publik untuk Buyer). Halaman ini untuk tim internal menguji kualitas hasil pencarian, meninjau tingkat fallback, dan (jika diperlukan) menyesuaikan bobot pencarian. Ini satu-satunya halaman di modul `16_ai` yang **aktif di Fase 1** — bukan ditunda seperti 4 halaman lain di modul ini — karena `PROPERTY.embeddingVector` (pgvector) sudah ada di `40_ERD.md` dan dipakai nyata oleh `03_property_search`.

## 2. Next.js Routing Path
```text
app/(dashboard)/admin/ai-search/page.tsx
```

## 3. Required UI Components (Shadcn/ui)
- `Input` — kotak uji query pencarian.
- `Table`/grid hasil — properti hasil pencarian beserta skor kemiripan (cosine similarity).
- `Metric Card` — tingkat fallback ke pencarian non-AI (`AI_SERVICE_DOWN`, per `54_ERROR_CODE_CATALOGUE.md`), volume pencarian harian.

## 4. Data & State Management
- **Fondasi teknis sudah ada:** `PROPERTY.embeddingVector "pgvector(1536)"` di `40_ERD.md`, HNSW index di `45_INDEX_STRATEGY.md` §8.2, pipeline embedding di `39_AI_ARCHITECTURE.md` (OpenAI/Gemini embedding API, dipicu pasca-persetujuan Admin).
- **Catatan penamaan yang perlu diperbaiki (ditemukan dalam audit dokumentasi):** `40_ERD.md` menamai kolom `embeddingVector`, sementara `42_TABLE_SPECIFICATION.md` §8.2 dan `45_INDEX_STRATEGY.md`'s SQL migrasi (`CREATE INDEX ... USING hnsw (embedding ...)`) memakai nama `embedding` — kontradiksi penamaan skema literal yang perlu diselaraskan sebelum implementasi, dicatat di sini sebagai referensi silang, bukan diperbaiki sepihak oleh dokumen ini (perbaikan ERD adalah Sprint F, di luar scope dokumentasi UX).
- **Gap observability:** tidak ada tabel log permintaan pencarian AI (`AiSearchLog`) di ERD — volume pencarian/tingkat fallback dihitung dari log aplikasi terstruktur (Winston/Pino, `75_LOGGING.md`), bukan tabel database, kecuali keputusan observability yang lebih dalam diambil kemudian.

## 5. API Endpoints Referenced
- Query uji coba memakai jalur yang sama dengan `GET /api/v1/properties` (parameter pencarian semantik) yang dipakai `03_property_search/01_SEARCH_RESULT.md` — tidak ada endpoint terpisah untuk "mode uji" agar hasil yang diuji identik dengan yang dilihat pengguna nyata.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman ini hanya untuk pengujian/observability — tidak menduplikasi UI pencarian publik.
- [ ] Fallback ke `AI_SERVICE_DOWN` (non-AI search) ditandai jelas saat terjadi selama pengujian, bukan disamarkan sebagai hasil AI normal.
- [ ] Skor kemiripan (cosine similarity) ditampilkan sebagai bantu-uji internal, tidak pernah diekspos ke UI publik Buyer.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Sparkles` | Header halaman | 20px |
| `Search` | Input uji query | 20px |
| `AlertTriangle` | Penanda fallback non-AI | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

Modul ini bukan salah satu dari 8 dashboard berbasis peran, sehingga tidak memiliki bagian khusus di `27_DASHBOARD_DESIGN_GUIDELINES.md` — mewarisi langsung arketipe Dashboard dari `21_WIREFRAME_SPECIFICATION.md` §8.4, token dari `15_DESIGN_SYSTEM.md`, dan komponen dari `17_COMPONENT_LIBRARY.md`. Konsisten dengan `12_super_admin/10_AI_MONITOR.md` yang memantau metrik serupa dari sudut pandang platform-wide.
