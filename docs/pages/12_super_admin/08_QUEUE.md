# QUEUE PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Queue (Antrian Event)
**Module:** 12 SUPER ADMIN
**Role:** Super Admin
**Purpose:** Memantau antrian pemrosesan event asinkron (notifikasi booking, trigger embedding AI) — relevansinya bergantung langsung pada tahap arsitektur event-driven yang sedang aktif.

## 2. Next.js Routing Path
```text
app/(dashboard)/super-admin/queue/page.tsx
```
Sidebar label: "Queue", di bawah grup nav "Operations".

## 3. Required UI Components (Shadcn/ui)
- `Table` — nama event, status, waktu diproses.
- `EmptyState`.

## 4. Data & State Management
- **Gap arsitektur bertahap:** per `38_EVENT_DRIVEN_ARCHITECTURE.md`, Fase 1 memakai `EventEmitter` Node.js bawaan (in-memory, tanpa message broker) — **tidak ada antrian persisten yang bisa dipantau** pada tahap ini. Redis/BullMQ (yang baru benar-benar punya "antrian" untuk dipantau) dijadwalkan Fase 3. Halaman ini secara harfiah tidak punya subjek untuk dipantau sampai Fase 3 dimulai.
- Sampai saat itu, halaman merender pesan eksplisit "Antrian persisten (Redis/BullMQ) dijadwalkan Fase 3 — event Fase 1 diproses in-memory dan tidak memiliki riwayat yang dapat dipantau."

## 5. API Endpoints Referenced
- Tidak ada — tidak relevan sampai Fase 3.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman tidak berpura-pura memantau antrian yang tidak ada — pesan status dijelaskan dengan tepat, merujuk fase arsitektur yang benar.
- [ ] Begitu Fase 3 dimulai, halaman ini menjadi salah satu yang pertama diaktifkan penuh (BullMQ punya dashboard bawaan yang bisa diadaptasi, bukan dibangun dari nol).

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `ListOrdered` | Header halaman | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.9 Super Admin Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.
