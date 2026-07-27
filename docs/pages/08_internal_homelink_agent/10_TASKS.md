# TASKS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Tasks (Tugas Pribadi)
**Module:** 08 INTERNAL HOMELINK AGENT
**Role:** Internal HomeLink Agent
**Purpose:** Daftar tugas/checklist pribadi Internal Agent (mis. "Tinjau ulang properti X setelah dokumen tambahan diunggah"). Sama pola dan skema dengan `07_partner_agent_dashboard/07_TASKS.md`.

## 2. Next.js Routing Path
```text
app/(dashboard)/internal-agent/tasks/page.tsx
```
Sidebar label: "Tugas".

## 3. Required UI Components (Shadcn/ui)
- `Checkbox` (`17_COMPONENT_LIBRARY.md` §8.1).
- `Input` — tambah tugas cepat.
- `DatePicker` — tenggat opsional.
- `EmptyState` — nada positif saat semua tugas selesai.

## 4. Data & State Management
- **Menggunakan entity `Task` yang sama** yang diusulkan di `07_partner_agent_dashboard/07_TASKS.md` (`ownerId, title, dueDate, isCompleted`) — generik lintas peran, bukan tabel terpisah per modul.
- Sampai tersedia, halaman merender `EmptyState`, tidak menyimpan tugas hanya di `localStorage`.

## 5. API Endpoints Referenced
- `GET/POST/PATCH /api/v1/tasks` — proposal yang sama dengan `07_partner_agent_dashboard/07_TASKS.md`, `ownerId = session.userId`.

## 6. Acceptance Criteria (DoD)
- [ ] Tidak mendefinisikan entity `Task` kedua yang terpisah dari proposal Partner Agent.
- [ ] Menandai tugas selesai memakai animasi Fast tier, bukan Bouncy Spring.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `CheckSquare` | Header halaman/tugas selesai | 20px |
| `Circle` | Tugas belum selesai | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.5 Internal Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.
