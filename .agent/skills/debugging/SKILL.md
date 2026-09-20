---
name: debugging
description: Diagnose React.js, Tailwind CSS, Capacitor Android native wrapper, and Supabase integration issues systematically without rewriting unrelated modules for MentorLinks. Use when fixing bugs or analyzing errors.
---

# Debugging Skill (MentorLinks)

## Goal

Systematically diagnose, isolate, and resolve issues across **React.js**, **Tailwind CSS v4 (Ocean Breeze)**, **Capacitor Android Container**, and **Supabase PostgreSQL & Realtime** without rewriting working modules, introducing breaking changes, or violating mobile-first standards in **MentorLinks** (*"Connect. Learn. Grow."*).

---

## 1. Core Debugging Principles

1. **Root Cause Before Code:** Never apply a fix without first identifying the exact point of failure through logs, network requests, or React component inspection.
2. **Minimal Surgical Modifications:** Modify only the code necessary to solve the defect. Never rewrite an entire component, hook, or service for a localized bug.
3. **Security & RLS Integrity:** Never bypass security checks (e.g., weakening Supabase Row Level Security, exposing `service_role` keys, or skipping auth token checks) as a "quick fix".
4. **Mobile & Dual 5-Tab Awareness:** 
   * Always verify that a fix respects mobile constraints (viewport $360\text{px}$–$430\text{px}$, Android safe-area insets, virtual keyboard behavior).
   * Verify whether a change impacts the dual perspectives (Student 5-tab shell vs. Mentor 5-tab shell).
5. **Aesthetic & Design Preservation:** Preserve the established Ocean Breeze Tailwind utility system (`#0284c7`, `#0ea5e9`, `#06b6d4`, `#0f172a`), mobile bottom navigation ergonomics, and touch targets ($\ge 44\text{px}$).

---

## 2. Systematic Diagnostic Workflow

```
   ┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
   │ 1. REPRODUCE     │ ───► │ 2. ISOLATE TIER  │ ───► │ 3. TRACE DATA    │
   │ - Screen & Role  │      │ - UI / React     │      │ - Supabase / RLS │
   │ - Console / Logs │      │ - Native / DB    │      │ - Mobile Context │
   └──────────────────┘      └──────────────────┘      └────────┬─────────┘
                                                                │
   ┌──────────────────┐      ┌──────────────────┐               │
   │ 5. VERIFY & TEST │ ◄─── │ 4. SURGICAL FIX  │ ◄─────────────┘
   │ - Mobile Viewport│      │ - Minimal change │
   │ - Build & Sync   │      │ - Preserved UI   │
   └──────────────────┘      └──────────────────┘
```

### Step 1 — Reproduce & Capture
* Identify the exact mobile screen route (`/explore`, `/messages/:id`, `/sessions`, `/classroom/:id`, etc.).
* Identify whether the defect occurs under the **Student** 5-tab shell, **Mentor** 5-tab shell, or during auth onboarding.
* Inspect browser DevTools or Android Studio Logcat for uncaught exceptions, React warnings, or syntax errors.
* Inspect network requests for Supabase errors (`400`, `401`, `403`, `404`, `409`).

### Step 2 — Isolate the Architectural Tier

| Tier | Common Symptoms | Diagnostic Technique |
| :--- | :--- | :--- |
| **Presentation (Tailwind / Mobile Layout)** | Horizontal scroll, bottom nav overlapping content, keyboard pushing layout out of viewport, cut-off cards. | Inspect mobile viewport (`390x844`), check `pb-24` on scroll containers for bottom nav clearance, verify Ocean Breeze color tokens. |
| **React State & Dual Shell Lifecycle** | Infinite re-renders, stale closures in `useEffect`, mode desynchronization between Student and Mentor 5-tab navigation. | Inspect React DevTools / component state; verify active mode in `AppContext`; ensure tab active states accurately reflect route. |
| **Supabase Realtime (Chat & Sessions)** | Messages not appending in real time, unread badge desync, session status changes not reflected live. | Check WebSocket status in DevTools Network tab; verify Realtime channel subscription filters (`filter: conversation_id=eq...`); confirm channel clean-up on unmount. |
| **Virtual Classroom (Media Streams)** | Blank video feeds, microphone mute toggle unresponsive, camera permission rejected. | Verify Android permissions (`CAMERA`, `RECORD_AUDIO`) in `AndroidManifest.xml`; check browser media device permissions (`navigator.mediaDevices.getUserMedia`); test fallback placeholder avatars. |
| **Database & RLS Policies** | Query returns empty array `[]` despite data existing; `403 Forbidden` on booking insertion, decline, or message send. | Verify user's active `auth.uid()`; cross-check the query against table RLS policies in `docs/supabase_schema_setup.sql`; ensure foreign keys exist. |
| **Capacitor & Android Native** | White screen on app launch in Android Studio, hardware back button exits instead of going back, asset paths 404. | Check `vite.config.js` `base` path (must be relative `./`); check Logcat in Android Studio; verify `CapacitorApp.addListener('backButton')`. |

---

## 3. Common Error Signatures & Solutions

### 1. Supabase Query Returns Empty `[]` (HTTP 200) for Sessions or Mentors
* **Cause:** Row Level Security (RLS) is filtering out records because the user's `auth.uid()` does not match `student_id` or `tutor_id`, or `profile_visibility` filter is mismatched.
* **Resolution:** Inspect the exact query in `src/services/sessionService.js` and verify against table RLS rules. Check if `supabase.auth.getUser()` matches the record owner.

### 2. White Screen on Android APK Launch (Capacitor)
* **Cause:** Vite default configuration builds asset paths with absolute root `/assets/...`, which fails inside Android's local `capacitor://localhost/` WebView file structure.
* **Resolution:** Ensure `vite.config.js` specifies `base: './'` so all compiled script and stylesheet paths are resolved relative to the web root.

### 3. Bottom Navigation Bar Hides Lower Form Fields or Buttons
* **Cause:** The mobile layout container does not have bottom padding to offset the fixed 5-tab bottom navigation bar (`h-16`).
* **Resolution:** Add bottom padding utility `pb-24` or `.bottom-nav-clearance` to the main scrollable container.

### 4. Booking Decline Fails or Shows Error
* **Cause:** Mentor submitted decline without a required `decline_reason` or attempted to decline an already confirmed/completed session.
* **Resolution:** Ensure `declineBooking(sessionId, declineReason)` validates non-empty reason string and passes it into `sessions.decline_reason` while setting `status = 'declined'`.

### 5. Virtual Classroom Locked Before Session
* **Cause:** Attempting to join before the 10-minute pre-session window or when session is not `status = 'confirmed'`.
* **Resolution:** Check local system clock against `scheduled_start`. Validate `scheduled_start - 10 minutes <= now <= scheduled_end + 30 minutes`.

---

## 4. Required Output Format

When presenting debugging solutions:

1. **Defect Summary:** Clear description of observed vs. expected behavior.
2. **Root Cause Analysis:** Specific technical diagnosis referencing the exact file, component, or query line.
3. **Surgical Fix:** Precise code diff showing additions and removals.
4. **Files Modified:** Clickable links to all modified files (`file:///...`).
5. **Mobile Verification Steps:** How to test the fix across both Student and Mentor perspectives on a mobile viewport ($360\text{px}$–$430\text{px}$).
