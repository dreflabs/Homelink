# CLIENT PAGE SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title & Purpose
**Page Name:** Client (Klien Aktif)
**Module:** 07 PARTNER AGENT DASHBOARD
**Role:** Partner Agent
**Purpose:** Daftar klien (lead yang sudah dikonfirmasi sebagai relasi aktif — bukan sekadar prospek) beserta riwayat interaksi, agar agent dapat memberikan layanan personal dan tidak kehilangan konteks percakapan lintas waktu.

## 2. Next.js Routing Path
```text
app/(dashboard)/partner-agent/clients/page.tsx
```
Sidebar label: "Klien".

## 3. Required UI Components (Shadcn/ui)
- `Table` (`17_COMPONENT_LIBRARY.md` §8.3) — daftar klien: `Avatar`, nama, properti terkait, tanggal kontak terakhir.
- `Timeline Card` (`17` §8.4) — riwayat interaksi per klien (dibuka dari baris tabel), menampilkan urutan kronologis kontak.
- `EmptyState` — jika belum ada klien terkonfirmasi.

## 4. Data & State Management
- **Bergantung pada gap `Lead` di `03_LEADS.md`** — "Klien" secara konsep adalah `Lead` dengan `stage = CLOSED_WON` atau status relasi aktif berkelanjutan; tidak memerlukan entity terpisah, hanya query dengan filter berbeda atas `Lead` yang sama.
- **Gap tambahan:** riwayat interaksi (Timeline) memerlukan entity terpisah, mis. `LeadActivity { id, leadId, note, contactedAt, channel }` — belum ada di ERD, diusulkan sebagai perluasan dari skema `Lead` di `03_LEADS.md`, bukan tabel independen.
- Sampai kedua skema di atas tersedia, halaman merender `EmptyState` dengan pesan yang sama seperti `03_LEADS.md`.

## 5. API Endpoints Referenced
- Belum ada — bergantung penuh pada `GET /api/v1/agents/me/leads?stage=CLOSED_WON` dan proposal `GET /api/v1/agents/me/leads/:id/activities`, keduanya menunggu skema di `03_LEADS.md`.

## 6. Acceptance Criteria (DoD)
- [ ] Halaman tidak mengimplementasikan logika/skema terpisah dari `Lead` — murni filter berbeda, mencegah duplikasi konsep "Lead" dan "Client" sebagai dua entity berbeda.
- [ ] Timeline riwayat interaksi terurut kronologis, terbaru di atas.
- [ ] Merender `EmptyState`, bukan error, selama backend belum tersedia.

## 7. Iconography Specification
**Library:** Lucide React, `strokeWidth={1.5}`.

| Icon | Penggunaan | Size |
| :--- | :--- | :--- |
| `Users` | Header halaman/daftar klien | 20px |
| `MessageSquare` | Item Timeline — interaksi via chat/WA | 16px |
| `Phone` | Item Timeline — interaksi via telepon | 16px |

## 8. UI/UX Aesthetic Rules (Mockup Reference)

See `27_DASHBOARD_DESIGN_GUIDELINES.md` § 8.4 Partner Agent Dashboard for full workspace design rules (tokens, layout blueprint, card hierarchy, motion, and Do/Don't) — this page inherits that specification in full; no page-specific deltas beyond it are required.
