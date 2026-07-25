# 57. WEBHOOK SPECIFICATION
**HomeLink 2.0 Enterprise Documentation**

## 1. Title
HomeLink 2.0 External Webhook Interoperability Specs

## 2. Purpose
To define how HomeLink 2.0 interacts securely with third-party systems that push data to our servers asynchronously.

## 3. Scope
Covers incoming Webhooks (e.g., from Payment Gateways in Phase 4 or WhatsApp APIs).

## 4. Audience
- **Backend Engineers:** To build secure endpoints for third parties.

## 5. Dependencies
- Extends the Event-Driven concepts in `38_EVENT_DRIVEN_ARCHITECTURE.md`.

## 6. Definitions
- **Webhook:** A method of augmenting or altering the behavior of a web page or web app with custom callbacks.

## 7. Architecture
N/A

## 8. Requirements

### 8.1. Webhook Security (Mandatory)
Endpoint webhook HomeLink (misal: `POST /api/webhooks/whatsapp-reply`) terbuka ke internet publik dan berpotensi diserang (DDoS/Spoofing).
1. **Signature Verification:** Setiap penyedia webhook pihak ketiga (Stripe, Twilio, Meta) mengirimkan *header* tanda tangan kriptografis (HMAC). *Backend* **HARUS** memverifikasi HMAC ini menggunakan Secret Key internal. Jika gagal, balas dengan HTTP 401 dan abaikan payload.
2. **Replay Protection:** Simpan ID unik (Idempotency Key) dari webhook ke database untuk mencegah pemrosesan ganda jika penyedia mengirimkan webhook yang sama dua kali secara tidak sengaja.

### 8.2. Fast Acknowledgment
Sistem pihak ketiga biasanya menerapkan *timeout* singkat (3-5 detik) pada webhook.
- *Route Handler* HomeLink harus segera merespons `200 OK` setelah memverifikasi *Signature* dan menyimpan payload mentah ke antrean (atau *Outbox* log), SEBELUM melakukan pemrosesan bisnis yang lambat.

## 9. Implementation
- Never write business logic directly inside the webhook controller. Delegate it to an asynchronous event handler.

## 10. Acceptance Criteria
- [x] Specifies cryptographic signature verification.
- [x] Specifies immediate HTTP acknowledgment.

## 11. Future Improvements
- Building an *Outgoing Webhook* system to push HomeLink events to CRM tools used by Agents (Phase 4).

## 12. References
- *Stripe Webhook Best Practices (Reference standard)*

## 13. Version History
| Version | Date       | Author               | Status   | Notes                 |
| :---    | :---       | :---                 | :---     | :---                  |
| 1.0.0   | 2026-07-24 | Documentation Arch AI| APPROVED | Initial SSOT creation |
