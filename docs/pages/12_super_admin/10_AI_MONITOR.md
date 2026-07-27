# AI MONITOR PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** AI Monitor
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Memantau penggunaan fitur AI Search (volume permintaan, biaya API embedding, tingkat kegagalan) — satu-satunya fitur AI yang aktif di Fase 1 (fitur AI lain — Recommendation/Valuation/Assistant/Analytics — ditunda ke Fase 4 per `13_PRODUCT_ROADMAP.md` §8.3).

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/ai-monitor/page.tsx
```
Sidebar label: "AI Monitor", di bawah grup nav "Operations".

## 3. Required UI Components (Shadcn/ui)
- `Analytics Card` (`17_COMPONENT_LIBRARY.md` §8.4) — tren volume pencarian AI per hari.
- `Metric Card` — tingkat fallback ke pencarian non-AI (`AI_SERVICE_DOWN`, per `54_ERROR_CODE_CATALOGUE.md`).

## 4. Data & State Management
- **Gap skema:** Tidak ada tabel log penggunaan AI di `40_ERD.md` — `PROPERTY.embeddingVector` (pgvector) hanya menyimpan hasil embedding, bukan mencatat setiap permintaan pencarian. Diusulkan skema ringan `AiSearchLog { id, query, resultCount, fallbackTriggered, createdAt }` jika observability tingkat permintaan diperlukan, atau cukup mengandalkan log aplikasi (Winston/Pino per `75_LOGGING.md`) tanpa tabel khusus — keputusan ini sebaiknya dibuat bersama tim AI Engineering, bukan diasumsikan di sini.
- Tingkat fallback ke non-AI dapat dihitung dari log error `AI_SERVICE_DOWN` jika tersimpan terstruktur (`75_LOGGING.md`), tidak memerlukan tabel baru.

## 5. API Endpoints Referenced
- Tidak ada — bergantung pada keputusan observability di atas.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman tidak berasumsi ada tabel `AiSearchLog` yang sudah dimodel — status "menunggu keputusan observability" dinyatakan jelas.
- [ ] Jika hanya mengandalkan log aplikasi (bukan tabel), UI menyatakan sumber datanya (mis. "Data dari Winston structured logs, agregasi harian"), bukan menyembunyikan sumbernya.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Sparkles` | Header halaman | 20px |
| `TrendingUp` | Analytics Card tren volume | 20px |
| `AlertTriangle` | Metric Card tingkat fallback | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.
