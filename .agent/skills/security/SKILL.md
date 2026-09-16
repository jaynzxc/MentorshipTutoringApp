---
name: security
description: Comprehensive security standards, mobile application protection, authentication, session lifecycle, anti-XSS, input validation, rate limiting, direct payment integrity, and Row Level Security for MentorLink. Use whenever implementing auth, APIs, session guards, forms, or database queries.
---

# Security, API & Data Protection Skill (MentorLink)

## Goal

Ensure **MentorLink — Mentorship & Tutoring Matching Application** implements defense-in-depth against unauthorized access, payment tampering, credential leaks, data exploitation, and mobile container vulnerabilities across all tiers: **Mobile UI (React)**, **Native Android Wrapper (Capacitor)**, **Client APIs**, and **Supabase PostgreSQL Database**.

---

## 1. Threat Model & Required Security Controls

| Security Control | Implementation Mechanism in MentorLink Stack | Threat Mitigated |
| :--- | :--- | :--- |
| **Role-Based Access Control (RBAC)** | Clear boundaries for **Student (Learner)** and **Peer Tutor (Mentor)**. React route guards protect mobile views, while Supabase Row Level Security (RLS) strictly enforces data boundaries via `auth.uid()`. | Unauthorized screen access, privilege escalation, cross-account tampering. |
| **Password Hashing** | Bcrypt with unique salt (handled natively by Supabase Auth). Plain-text passwords never touch or exist in the database. | Credential dumping, rainbow table attacks. |
| **Authentication & Session Tokens** | JWT access tokens with automatic refresh handling. Missing or expired session $\rightarrow$ immediate redirection to `/login`. | Bypassing client views, stale session hijacking. |
| **Direct Payment State Machine Integrity** | Strict database-enforced transitions: Only the tutor can advance a session from `payment_submitted` to `confirmed`. Students cannot set `confirmed` or alter the agreed `payment_amount`. | Payment bypass fraud, fake confirmation claims. |
| **Community Service Hours Anti-Tamper** | Service hours are credited strictly via a server-side PostgreSQL trigger upon verified session completion (`status = 'completed'`). Direct client writes to `service_hour_logs` or `total_service_hours` are blocked. | Falsified volunteer hour claims, certificate fraud. |
| **Single Review Per Session** | Enforced via database constraint `UNIQUE(session_id)`. Only the student who attended the completed session can submit a rating (1–5) and review. Tutors are blocked from reviewing themselves. | Review stuffing, fake ratings, reputation inflation. |
| **Rate Limiting & Abuse Prevention** | Login and password reset attempts rate-limited (max 5 attempts per 15 minutes). Booking request throttling to prevent spamming tutors. | Brute-force attacks, spam bookings. |
| **XSS Prevention (Cross-Site Scripting)** | React JSX escapes text by default. Strict ban on `dangerouslySetInnerHTML`. User-entered topics, tutor bios, notes, and reviews are rendered safely as text. | Malicious script execution in peer devices. |
| **Input Validation & Sanitization** | Multi-tier validation: Mobile form validation + JavaScript format sanitizers + PostgreSQL `CHECK` constraints (hourly rate $\ge 0$, ratings between 1 and 5, valid enum statuses). | Malformed payloads, dirty data, SQL injection. |
| **Audit & Transaction Logging** | Sensitive actions (`BOOKING_CREATED`, `PAYMENT_SUBMITTED`, `PAYMENT_CONFIRMED`, `SESSION_COMPLETED`, `SERVICE_HOURS_CREDITED`) logged with actor ID, timestamp, and details. | Repudiation, dispute over session status or payments. |
| **UX Security Standards** | Submit buttons show loading spinners and are immediately disabled upon click to prevent double-submits and duplicate booking creation. | Race conditions, duplicate payments/bookings. |

---

## 2. Mobile Application vs. Web Security Standards

Because MentorLink is compiled and distributed as a native **Android Application (APK)** via Capacitor rather than a conventional browser website, the following mobile-specific security controls are strictly enforced:

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                 MOBILE NATIVE CONTAINER SECURITY (ANDROID)             │
  │  - android:usesCleartextTraffic="false" (Enforce strict HTTPS/TLS)     │
  │  - android:debuggable="false" in release APK builds                    │
  │  - Sandboxed App Storage for JWT & User Preferences                    │
  │  - Deep Link Validation (Prevent intent hijacking)                     │
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
  │  - 100% Row Level Security (RLS) on all PostgreSQL tables              │
  │  - Server-side state triggers for payments & community service hours   │
  └────────────────────────────────────────────────────────────────────────┘
```

### A. Android Native Container Hardening
1. **Disable Cleartext HTTP Traffic:**
   * In `android/app/src/main/AndroidManifest.xml`, ensure:
     ```xml
     <application
         android:usesCleartextTraffic="false"
         ... >
     ```
   * All network traffic to Supabase APIs and Storage must be transmitted over encrypted **HTTPS/TLS 1.3**.
2. **Disable Debug Mode in Production:**
   * Ensure `android:debuggable="false"` in the release configuration to prevent runtime memory inspection or unauthorized debugging tools from attaching to the APK.
3. **Secure Mobile Credential Storage:**
   * Store session tokens and user preferences inside Capacitor's sandboxed mobile storage (`@capacitor/preferences`), protected by the Android OS application sandbox.
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
            ▼ Tutor verifies receipt in their own payment account
  [Tutor Clicks "Confirm Payment"]
            │
            ▼ (Enforced by RLS: auth.uid() MUST match tutor_id)
  [Session Updated: status='confirmed', payment_status='confirmed']
```
* **Security Rule:** A student can **NEVER** set `payment_status = 'confirmed'`. Only the tutor (`auth.uid() = tutor_id`) has the database privilege to confirm payment receipt.

### B. Community Service Hours Credit Integrity
* Service hours cannot be manually inserted or incremented by user clients.
* When a tutor marks a volunteer session (`counts_toward_service_hours = true`) as `status = 'completed'`:
  * A PostgreSQL trigger with `SECURITY DEFINER` computes the accredited hours from `duration_hours`.
  * The trigger atomically inserts the audit record into `service_hour_logs` and increments `total_service_hours` in `tutor_profiles`.

---

## 4. Input Validation & Attachment Security

### A. Input Sanitization
* All user-generated text (tutor headlines, bio, session topics, notes, review comments) must be validated for length and sanitized:
  * Session Topic: String between 5 and 500 characters.
  * Review Comment: Maximum 500 characters.
  * Tutor Hourly Rate: Numeric value $\ge 0.00$.

### B. Payment Receipt Attachment Security (If screenshots uploaded)
* **Allowed MIME types:** Strictly `['image/jpeg', 'image/png']`.
* **Disallowed:** Executable, script, or HTML formats (`.exe`, `.apk`, `.html`, `.svg`, `.pdf`).
* **Maximum File Size:** $\le 5\text{ MB}$.
* **Storage Location:** Restricted Supabase Storage bucket accessible only to the student who uploaded it and the assigned tutor.

---

## 5. Developer Pre-Flight Security Checklist

Before approving any mobile screen, component, or database query:

- [ ] **Mobile Cleartext Check:** `usesCleartextTraffic="false"` verified in Android manifest.
- [ ] **Service-Role Key Check:** Zero instances of `service_role` in client files; only `anonKey` used.
- [ ] **RLS Enforcement:** 100% of tables accessed have active RLS policies preventing unauthorized access.
- [ ] **Payment State Safety:** Students cannot confirm their own payments or alter agreed rates.
- [ ] **Service Hours Protection:** Service hours credit handled solely through database triggers upon session completion.
- [ ] **Review Integrity:** Reviews restricted to completed sessions; tutors cannot review themselves; `UNIQUE(session_id)` enforced.
- [ ] **Anti-XSS:** All dynamic content rendered through standard React JSX; no `dangerouslySetInnerHTML`.
- [ ] **Submit State UX:** Buttons show loading indicators and disable immediately upon tap to prevent double-post actions.
