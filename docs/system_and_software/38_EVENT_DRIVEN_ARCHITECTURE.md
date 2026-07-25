# 38. EVENT DRIVEN ARCHITECTURE
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 Event-Driven Design Specification

## 2. Purpose
To handle asynchronous background processes and inter-system communications gracefully, ensuring the main HTTP request thread is not blocked by heavy or slow tasks (like sending emails or AI processing).

## 3. Scope
Covers Background Jobs, Webhooks, and Event Emitters.

## 4. Audience
- **Backend Engineers:** For implementing job queues and webhook listeners.

## 5. Dependencies
- Connects the modules defined in `31_MODULE_BREAKDOWN.md`.

## 6. Definitions
- **Event:** A significant change in state (e.g., `PROPERTY_VERIFIED`, `BOOKING_CREATED`).
- **Fire-and-Forget:** A pattern where an event is triggered, and the main thread immediately continues without waiting for the outcome.

## 7. Architecture
Lightweight in-memory Node.js Event Emitters (Phase 1) scaling to Redis-based Queues (Phase 3).

## 8. Requirements

### 8.1. Use Cases for Event-Driven Design
Dalam arsitektur monolitik Next.js, banyak operasi yang memakan waktu (I/O lambat). Operasi berikut TIDAK BOLEH memblokir *HTTP Response*:
1. **Notifikasi:** Mengirim WhatsApp (via API eksternal) dan Email (Resend) setelah `Booking` berhasil dibuat.
2. **AI Indexing:** Memicu pemrosesan teks menjadi Vektor (*Vector Embedding*) setelah `Property` baru divalidasi oleh Admin.
3. **Audit Logging:** Menyimpan catatan log keamanan setiap kali *Owner* mengubah harga propertinya.

### 8.2. Phase 1 Implementation (Native EventEmitter)
Karena fase awal bertujuan meminimalisir infrastruktur (Opex), penggunaan antrean terpisah seperti RabbitMQ atau Kafka dihindari.
- Gunakan modul bawaan Node.js `events` (`EventEmitter`) di dalam instance server PM2.
- **Pola:** 
  1. *Controller* menyimpan transaksi ke DB.
  2. *Controller* memanggil `eventBus.emit('BOOKING_CREATED', data)`.
  3. *Controller* merespons `200 OK` ke klien secara instan.
  4. *Listener* secara asinkron menembak API WhatsApp.

### 8.3. Fallback & Retry Mechanism
- Karena EventEmitter lokal tidak memiliki persistensi jika server *crash*, setiap *event* kritis (seperti pembuatan transaksi finansial nanti) harus dicatat sementara ke tabel `OutboxLog` di PostgreSQL dengan status `PENDING`. 
- Sebuah *CRON job* akan berjalan setiap 5 menit untuk menyapu dan memproses ulang status `PENDING` yang gagal terkirim.

## 9. Implementation
- Create a centralized `lib/eventBus.ts` to register all system-wide listeners during application boot.

## 10. Acceptance Criteria
- [x] Clear definition of which processes must run asynchronously.
- [x] Phase 1 architecture avoids over-engineering (no heavy message brokers yet).

## 11. Future Improvements
- Migrate to a robust Redis + BullMQ architecture for persistent background jobs in Phase 3.

## 12. References
- *Node.js EventEmitter Documentation*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
