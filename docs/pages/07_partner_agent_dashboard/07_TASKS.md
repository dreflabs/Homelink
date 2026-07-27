# TASKS PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Tasks (Tugas Pribadi)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Daftar tugas/checklist pribadi agent (mis. "Follow-up klien A besok", "Siapkan dokumen penawaran properti B") — pengingat kerja harian, terpisah dari pipeline Leads yang lebih formal.

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/tasks/page.tsx
```
Sidebar label: "Tugas".

## 3. Required UI Components (Shadcn/ui)
- `Checkbox` (`17_COMPONENT_LIBRARY.md` §8.1) — tandai tugas selesai.
- `Input`/`Textarea` — tambah tugas baru cepat.
- `DatePicker` — tenggat opsional per tugas.
- `EmptyState` — tidak ada tugas aktif ("Semua tugas selesai — kerja bagus.", nada positif per `27` §8.5 pola Internal Agent).

## 4. Data & State Management
- **Gap skema:** Tidak ada entity `Task` di `40_ERD.md` sama sekali — ini murni alat bantu pribadi agent, belum tercakup skema apa pun. Diusulkan skema sederhana:
  ```
  Task {
    id          String   @id @default(uuid())
    ownerId     String   // FK -> USER, siapa pun pemilik tugas (Agent/Internal Agent/dsb.)
    title       String
    dueDate     DateTime?
    isCompleted Boolean  @default(false)
    createdAt   DateTime @default(now())
  }
  ```
  Skema generik ini juga relevan untuk `08_internal_homelink_agent/10_TASKS.md` — sebaiknya satu entity `Task` dipakai lintas peran, bukan diduplikasi per modul.
- Sampai tersedia, halaman merender `EmptyState` dengan pesan jelas, tidak menyimpan tugas hanya di `localStorage` (agar konsisten lintas perangkat begitu backend siap).

## 5. API Endpoints Referenced
- Belum ada — diusulkan `GET/POST/PATCH /api/v1/tasks` (scoped `ownerId = session.userId`), menunggu skema §4.

## 6. Acceptance Criteria (DoD)
- [ ] Menandai tugas selesai memakai animasi checkmark cepat (Fast tier, `23_MOTION_SPECIFICATION.md` §8.1), bukan Bouncy Spring (tugas harian bukan momen sukses besar, per `27` §8.4 disiplin motion).
- [ ] Tidak menyimpan data tugas secara permanen di client-side storage — hanya UI optimistik menunggu backend.
- [ ] Empty state bernada positif, bukan netral datar, saat semua tugas selesai.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `CheckSquare` | Header halaman/tugas selesai | 20px |
| `Circle` | Tugas belum selesai | 16px |
| `Plus` | Tombol tambah tugas | 20px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.
