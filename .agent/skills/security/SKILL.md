---
name: security
description: Comprehensive security standards, mobile application protection, authentication, session lifecycle, anti-XSS, input validation, rate limiting, direct payment integrity, and Row Level Security for MentorLinks. Use whenever implementing auth, APIs, session guards, forms, or database queries.
---

# Security, API & Data Protection Skill (MentorLinks)

## Goal

Ensure **MentorLinks — Mentorship & Tutoring Matching Application** (*"Connect. Learn. Grow."*) implements defense-in-depth against unauthorized access, payment tampering, credential leaks, data exploitation, and mobile container vulnerabilities across all tiers: **Mobile UI (React)**, **Native Android Wrapper (Capacitor)**, **Client APIs**, and **Supabase PostgreSQL Database**.

---

## 1. Threat Model & Required Security Controls

| Security Control | Implementation Mechanism in MentorLinks Stack | Threat Mitigated |
| :--- | :--- | :--- |
| **Role-Based Access Control (RBAC)** | Dual 5-tab boundaries for **Student** and **Mentor**. React route guards protect mobile views, while Supabase Row Level Security (RLS) strictly enforces data boundaries via `auth.uid()`. | Unauthorized screen access, privilege escalation, cross-account tampering. |
| **Password Hashing** | Bcrypt with unique salt (handled natively by Supabase Auth). Plain-text passwords never touch or exist in the database. | Credential dumping, rainbow table attacks. |
| **Authentication & Session Tokens** | JWT access tokens with automatic refresh handling. Missing or expired session $\rightarrow$ immediate redirection to `/login`. | Bypassing client views, stale session hijacking. |
| **Direct Payment State Machine Integrity** | Strict database-enforced transitions: Only the mentor can advance a session from `payment_submitted` to `confirmed`. Students cannot set `confirmed` or alter the agreed `payment_amount`. | Payment bypass fraud, fake confirmation claims. |
| **Booking Decline Integrity** | Mentors cannot decline without providing a non-empty `decline_reason` stored in `sessions.decline_reason`. | Arbitrary cancellation disputes, lack of student feedback. |
| **In-App Messaging Thread Privacy** | Row Level Security ensures users can only read and send messages in conversations where they are `participant_one_id` or `participant_two_id`. | Eavesdropping, message spoofing, cross-chat leakage. |
| **Virtual Classroom Access Guard** | Meeting access restricted strictly to confirmed session participants within the active window (from $10\text{ minutes}$ prior to scheduled start through session end). | Unauthorized meeting intrusion, meeting link sniffing. |
| **Community Service Hours Anti-Tamper** | Service hours are credited strictly via a server-side PostgreSQL trigger upon verified session completion (`status = 'completed'`). Direct client writes to `service_hour_logs` or `total_service_hours` are blocked. | Falsified volunteer hour claims, certificate fraud. |
| **Single Review Per Session** | Enforced via database constraint `UNIQUE(session_id)`. Only the student who attended the completed session can submit a rating (1–5) and review. Mentors are blocked from reviewing themselves. | Review stuffing, fake ratings, reputation inflation. |
| **Support Ticket Privacy** | Tickets in `support_tickets` can only be viewed and created by the ticket author (`auth.uid() = user_id`). | Privacy leaks of student/mentor support inquiries. |
| **XSS Prevention (Cross-Site Scripting)** | React JSX escapes text by default. Strict ban on `dangerouslySetInnerHTML`. User-entered topics, mentor bios, notes, and reviews are rendered safely as text. | Malicious script execution in peer devices. |
| **Input Validation & Sanitization** | Multi-tier validation: Mobile form validation + JavaScript format sanitizers + PostgreSQL `CHECK` constraints (hourly rate $\ge 0$, ratings between 1 and 5, valid enum statuses). | Malformed payloads, dirty data, SQL injection. |

---

## 2. Mobile Application Native Security Standards

Because MentorLinks is compiled and distributed as a native **Android Application (APK)** via Capacitor:

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                 MOBILE NATIVE CONTAINER SECURITY (ANDROID)             │
  │  - android:usesCleartextTraffic="false" (Enforce strict HTTPS/TLS)     │
  │  - android:debuggable="false" in release APK builds                    │
  │  - Sandboxed App Storage for JWT & User Preferences                    │
  │  - Hardware Camera & Audio Permissions scoped strictly for Classroom   │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │                  WEBVIEW & CLIENT APPLICATION SECURITY                 │
  │  - Public anonKey ONLY; zero service_role key exposure                 │
  │  - Relative asset resolution (base: './') to avoid external injection  │
  │  - Input sanitization & safe React DOM rendering                       │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │                   SUPABASE BACKEND & DATABASE DEFENSE                  │
  │  - 100% Row Level Security (RLS) on all 11 PostgreSQL tables           │
  │  - Server-side state triggers for payments & community service hours   │
  └────────────────────────────────────────────────────────────────────────┘
```

### A. Android Native Container Hardening
1. **Disable Cleartext HTTP Traffic:**
   * In `android/app/src/main/AndroidManifest.xml`, enforce:
     ```xml
     <application
         android:usesCleartextTraffic="false"
         ... >
     ```
   * All network traffic to Supabase APIs, Realtime WebSockets, and Storage must be transmitted over encrypted **HTTPS/TLS 1.3**.
2. **Disable Debug Mode in Production:**
   * Ensure `android:debuggable="false"` in the release configuration to prevent runtime memory inspection or unauthorized debugging tools from attaching to the APK.
3. **Hardware Permissions Scoping:**
   * Camera (`CAMERA`) and microphone (`RECORD_AUDIO`) permissions are requested strictly at runtime when joining the Virtual Classroom, with clear permission rationale dialogs.
4. **Isolated Service-Role Keys:**
   * The Supabase `service_role` key must **NEVER** be packaged inside the mobile APK or referenced in frontend JavaScript. Only the public `anonKey` is permitted.

---

## 3. Direct Payment & Service Hours Verification Rules

### A. Direct Payment Integrity Flow
```
  [Student Books Session]
            │
            ▼
  [Session Created: status='pending', payment_status='unpaid']
            │
            ▼ Student transfers payment (GCash/Maya/Cash) & submits Ref #
  [Session Updated: payment_status='payment_submitted', payment_reference='...']
            │
            ▼ Mentor verifies receipt in their own payment account
  [Mentor Clicks "Confirm Payment & Accept"]
            │
            ▼ (Enforced by RLS: auth.uid() MUST match tutor_id)
  [Session Updated: status='confirmed', payment_status='confirmed']
```
* **Security Rule:** A student can **NEVER** set `payment_status = 'confirmed'`. Only the assigned mentor (`auth.uid() = tutor_id`) has the database privilege to confirm payment receipt.

### B. Community Service Hours Credit Integrity
* Service hours cannot be manually inserted or incremented by user clients.
* When a mentor marks a volunteer session (`counts_toward_service_hours = true`) as `status = 'completed'`:
  * A PostgreSQL trigger with `SECURITY DEFINER` computes the accredited hours from `duration_hours`.
  * The trigger atomically inserts the audit record into `service_hour_logs` and increments `total_service_hours` in `tutor_profiles`.

---

## 4. Developer Pre-Flight Security Checklist

Before approving any mobile screen, component, or database query:

- [ ] **Mobile Cleartext Check:** `usesCleartextTraffic="false"` verified in Android manifest.
- [ ] **Service-Role Key Check:** Zero instances of `service_role` in client files; only `anonKey` used.
- [ ] **RLS Enforcement:** 100% of all 11 tables accessed have active RLS policies preventing unauthorized access.
- [ ] **Payment State Safety:** Students cannot confirm their own payments or alter agreed rates.
- [ ] **Decline Flow Safety:** Mentors must provide a non-empty `decline_reason` when declining.
- [ ] **Chat Privacy:** Messages and conversations only visible to the 2 participant UIDs.
- [ ] **Classroom Authorization:** Virtual Classroom access locked until 10 minutes prior to scheduled start.
- [ ] **Service Hours Protection:** Service hours credit handled solely through database triggers upon session completion.
- [ ] **Review Integrity:** Reviews restricted to completed sessions; mentors cannot review themselves; `UNIQUE(session_id)` enforced.
- [ ] **Anti-XSS:** All dynamic content rendered through standard React JSX; no `dangerouslySetInnerHTML`.
- [ ] **Submit State UX:** Buttons show loading indicators and disable immediately upon tap to prevent double-post actions.
