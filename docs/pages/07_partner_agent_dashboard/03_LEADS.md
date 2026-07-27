# LEADS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Leads (Pipeline)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Mengelola alur calon pembeli/penyewa (leads) yang masuk ke Partner Agent, dikelompokkan per tahap (baru → dihubungi → negosiasi → closing), agar agent tahu persis lead mana yang butuh tindak lanjut. Ini adalah halaman inti workspace penjualan Partner Agent per `27_DASHBOARD_DESIGN_GUIDELINES.md` §8.4.

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/leads/page.tsx
```
Sidebar label: "Leads".

## 3. Required UI Components (Shadcn/ui)
- `Action Card` (`17_COMPONENT_LIBRARY.md` §8.4) — satu kartu per lead, dikelompokkan dalam 4 kolom tahap (Baru/Dihubungi/Negosiasi/Closing), bukan tabel — sesuai `27` §8.4 ("pipeline-as-cards, bukan spreadsheet-as-default").
- `Badge` — warna tahap (Info→Warning→Success, `27` §8.4 Color Application).
- `DropdownMenu` — aksi cepat per kartu (Tandai Dihubungi, Jadwalkan Follow-up, Tandai Closing).
- `EmptyState` — per kolom, jika tahap tersebut kosong.
- `Skeleton` — loading independen per kolom (`27` §8.4 Loading State).

## 4. Data & State Management
- **Gap skema (fondasional, memblokir seluruh halaman ini):** Tidak ada entity `Lead` di `40_ERD.md`/`42_TABLE_SPECIFICATION.md`. Diusulkan skema minimal:
  ```
  Lead {
    id            String   @id @default(uuid())
    agentId       String   // FK -> USER (role PARTNER_AGENT)
    propertyId    String?  // FK -> PROPERTY, opsional
    contactName   String
    contactPhone  String
    stage         LeadStage // NEW | CONTACTED | NEGOTIATING | CLOSED_WON | CLOSED_LOST
    lastContactedAt DateTime?
    createdAt     DateTime @default(now())
    updatedAt     DateTime @updatedAt
  }
  ```
- **Server State (setelah skema tersedia):** `GET /api/v1/agents/me/leads`, difilter server-side `agentId = session.userId` (pola BOLA sama seperti `06_owner_dashboard`).
- **Local State:** kolom aktif (mobile, tab per tahap) disimpan di URL search params.
- Sampai skema tersedia, halaman merender 4 kolom `EmptyState` dengan pesan "Fitur Leads akan aktif setelah backend Lead Management tersedia (Fase 2)" — bukan data dummy.

## 5. API Endpoints Referenced
- Belum ada di `52_ENDPOINT_CATALOGUE.md`. Diusulkan: `GET /api/v1/agents/me/leads`, `PATCH /api/v1/agents/me/leads/:id/stage` — menunggu skema §4, dicatat sebagai gap bukan diasumsikan tersedia.

## 6. Acceptance Criteria (DoD)
- [ ] Setiap kartu lead menampilkan tepat satu Badge tahap, tidak ada tahap ganda.
- [ ] Perpindahan kartu antar kolom (update `stage`) memakai Standard Spring, bukan Bouncy Spring — Bouncy Spring khusus transisi ke `CLOSED_WON` (`27` §8.4 Motion Behaviour).
- [ ] Selama backend belum ada, halaman tidak error 500 — merender `EmptyState` bertahap per kolom dengan pesan yang jelas.
- [ ] BOLA test wajib lolos begitu endpoint tersedia — agent hanya melihat leads miliknya sendiri.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `UserPlus` | Kolom "Baru" | 20px |
| `PhoneCall` | Kolom "Dihubungi" | 20px |
| `Handshake` | Kolom "Negosiasi" | 20px |
| `CheckCircle2` | Kolom "Closing" (menang) | 20px |
| `Clock` | Indikator lama menunggu tindak lanjut pada kartu | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.
