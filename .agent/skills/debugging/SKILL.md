---
name: debugging
description: Diagnose React.js, Tailwind CSS, Capacitor Android native wrapper, and Supabase integration issues systematically without rewriting unrelated modules for MentorLink. Use when fixing bugs or analyzing errors.
---

# Debugging Skill (MentorLink)

## Goal

Systematically diagnose, isolate, and resolve issues across **React.js**, **Tailwind CSS**, **Capacitor Android Container**, and **Supabase PostgreSQL & Auth** without rewriting working modules, introducing breaking changes, or violating mobile-first standards in **MentorLink**.

---

## 1. Core Debugging Principles

1. **Root Cause Before Code:** Never apply a fix without first identifying the exact point of failure through logs, network requests, or React component inspection.
2. **Minimal Surgical Modifications:** Modify only the code necessary to solve the defect. Never rewrite an entire component, hook, or service for a localized bug.
3. **Security & RLS Integrity:** Never bypass security checks (e.g., weakening Supabase Row Level Security, exposing `service_role` keys, or skipping auth token checks) as a "quick fix".
4. **Mobile & Cross-Role Awareness:** 
   * Always verify that a fix respects mobile constraints (viewport 360px–430px, Android safe-area insets, virtual keyboard behavior).
   * Verify whether a change impacts the dual perspectives (Student booking view vs. Tutor schedule/earnings dashboard).
5. **Aesthetic & Design Preservation:** Preserve the established Tailwind utility system, mobile bottom navigation ergonomics, and touch targets ($\ge 44\text{px}$).

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
* Identify the exact mobile screen route (`/search`, `/booking`, `/sessions`, `/tutor/dashboard`, etc.).
* Identify whether the bug occurs under the **Student** view, **Tutor** view, or during auth.
* Inspect browser DevTools or Android Studio Logcat for uncaught exceptions, React warnings, or syntax errors.
* Inspect network requests for Supabase errors (`400`, `401`, `403`, `404`, `409`).

### Step 2 — Isolate the Architectural Tier

| Tier | Common Symptoms | Diagnostic Technique |
| :--- | :--- | :--- |
| **Presentation (Tailwind / Mobile Layout)** | Horizontal scroll, bottom nav overlapping content, keyboard pushing layout out of viewport, cut-off cards. | Inspect mobile viewport (`390x844`), check `pb-20` on scroll containers for bottom nav clearance, verify Tailwind responsive classes. |
| **React State & Lifecycle** | Infinite re-renders, stale closures in `useEffect`, state desynchronization between student and tutor toggles. | Inspect React DevTools / component state; verify dependency arrays in `useEffect`; ensure state updates use functional callbacks where appropriate. |
| **Supabase Auth & Session** | Unexpected logout, missing user token, failed session restoration on mobile app resume. | Check Supabase auth state with `supabase.auth.getSession()`; ensure `onAuthStateChange` listener is registered once in root `AuthContext`. |
| **Database & RLS Policies** | Query returns empty array `[]` despite data existing; `403 Forbidden` on booking insertion or status update. | Verify user's active `auth.uid()`; cross-check the query against RLS conditions in `.agent/skills/database/SKILL.md`; ensure required foreign keys exist. |
| **Capacitor & Android Native** | White screen on app launch in Android Studio, hardware back button exits instead of going back, asset paths 404. | Check `vite.config.js` `base` path (must be relative `./` or properly configured for Capacitor); check Logcat in Android Studio; verify `CapacitorApp.addListener('backButton')`. |

### Step 3 — Root Cause Analysis & Safety Check
* **Check Service Role Key Leaks:** Ensure `service_role` is never imported into client React code.
* **Check RLS Bypass Attempts:** If a query fails, resolve the RLS policy or query filter—do not disable RLS on the table.
* **Check Direct Pay Flow Integrity:** Ensure students cannot mark sessions as `confirmed` (only tutors can confirm payment receipt).

### Step 4 — Implement Surgical Fix
* Make precise edits targeting only the faulty logic or component.
* Keep state logic in reusable hooks or services under `src/services/`.

### Step 5 — Regression & Build Verification
* Test the flow on a mobile screen preview (360px–430px).
* Verify that `npm run build` succeeds without lint or bundling errors.
* Run `npx cap sync` to confirm Android assets synchronize cleanly.

---

## 3. Common Error Signatures & Solutions

### 1. Supabase Query Returns Empty `[]` (HTTP 200) for Sessions or Tutors
* **Cause:** Row Level Security (RLS) is filtering out records because the user's `auth.uid()` does not match `student_id` or `tutor_id`, or `is_accepting_students` filter is mismatched.
* **Resolution:** Inspect the exact query in `src/services/sessionService.js` and verify against table RLS rules. Check if `supabase.auth.getUser()` matches the record owner.

### 2. White Screen on Android APK Launch (Capacitor)
* **Cause:** Vite default configuration builds asset paths with absolute root `/assets/...`, which fails inside Android's local `capacitor://localhost/` WebView file structure.
* **Resolution:** Ensure `vite.config.js` specifies `base: './'` so all compiled script and stylesheet paths are resolved relative to the web root.

### 3. Bottom Navigation Bar Hides Lower Form Fields or Buttons
* **Cause:** The mobile layout container does not have bottom padding to offset the fixed bottom navigation bar (`h-16`).
* **Resolution:** Add a bottom padding utility (e.g., `pb-24`) to the main scrollable container so content scrolls cleanly above the navigation bar.

### 4. Community Service Hours Not Incrementing on Completed Session
* **Cause:** The session was updated to `completed`, but either the session's `counts_toward_service_hours` was `false` or the database trigger failed due to permissions.
* **Resolution:** Verify that the session has `counts_toward_service_hours = true` and that the PostgreSQL trigger function has `SECURITY DEFINER` privileges to insert into `service_hour_logs` and update `tutor_profiles`.

---

## 4. Required Output Format

When presenting debugging solutions:

1. **Defect Summary:** Clear description of the observed vs. expected behavior.
2. **Root Cause Analysis:** Specific technical diagnosis referencing the exact file, component, or query line.
3. **Surgical Fix:** Precise code diff showing additions and removals.
4. **Files Modified:** Clickable links to all modified files (`file:///...`).
5. **Mobile Verification Steps:** How to test the fix across both Student and Tutor perspectives on a mobile viewport.
