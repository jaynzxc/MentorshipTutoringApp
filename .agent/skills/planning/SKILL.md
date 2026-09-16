---
name: planning
description: Create structured implementation plans, module workflows, feature breakdowns, and development roadmaps for MentorLink (Mentorship & Tutoring Matching Application). Use when planning a new module, page, feature, or enhancement before coding.
---

# Planning Skill (MentorLink)

## Goal

Produce thorough, highly structured, and production-ready implementation plans before writing any code or modifying database schemas for **MentorLink — Mentorship & Tutoring Matching Application**.

---

## 1. Core Planning Principles

1. **Universal Mandate — Always Send an Implementation Plan:** Never write or modify source code without first submitting a clear, structured implementation plan and receiving explicit user approval.
2. **Zero AI Slop & Human-Grade Craftsmanship:**
   * Reject generic, shallow boilerplate, incomplete stubs, and lazy placeholder comments (`// TODO: add code here`).
   * Every planned component, hook, and database interaction must be fully specified and complete.
3. **Mobile-First App Constraints:**
   * Every screen must be designed for a mobile viewport (360px–430px) with touch-friendly targets ($\ge 44\text{px}$).
   * Mobile ergonomics: Persistent bottom navigation (`Home`, `Search`, `Sessions`, `Profile`), mobile headers, back buttons, and safe-area insets.
   * Native container compatibility: Code must cleanly bundle via `npm run build` and sync with Capacitor for Android Studio compilation.
4. **Strict Technology Stack Adherence:** Plan strictly within:
   * React.js (Vite)
   * Tailwind CSS
   * Vanilla JavaScript (ES6+ modules)
   * Capacitor Android Container (`@capacitor/android`)
   * Supabase PostgreSQL with 100% Row Level Security (RLS)
   * Companion APK download website (standalone single-page showcase)
5. **Scope Integrity:**
   * Direct-pay session fee tracking only (or volunteer ₱0).
   * University Community Service Hours accreditation for tutors.
   * No AI wrappers, no complex token systems, no browser-only fallback for the app.
6. **Cross-Role Lifecycle Analysis:** Every plan must evaluate effects across both **Student** and **Tutor** perspectives (e.g., student booking creation $\rightarrow$ tutor calendar conflict check $\rightarrow$ payment confirmation $\rightarrow$ service hours credit).

---

## 2. Six-Step Planning Workflow

```
   ┌───────────────────────┐
   │ 1. SCOPE & ACTORS     │ ── Define user stories for Student vs. Tutor
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 2. MOBILE FLOW & NAV  │ ── Map screens, bottom nav, modals, & touch actions
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 3. UI/UX BENCHMARK    │ ── Match Tailwind mobile components & layout guidelines
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 4. DATABASE & RLS     │ ── Map tables, columns, indexes, & non-destructive DDL
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 5. SECURITY & ACCESS  │ ── Plan RLS rules, role checks, and payment verification
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 6. PHASED ROADMAP     │ ── Phased implementation breakdown, testing, Capacitor sync
   └───────────────────────┘
```

### Step 1 — Scope & Actor Identification
* Identify user stories for Student (finding help, scheduling, paying, reviewing) and Tutor (availability, accepting, confirming payment, notes, service hours).
* Verify boundaries: Ensure students cannot approve their own sessions or credit their own service hours.

### Step 2 — Mobile Flow & Navigation Mapping
* Map screen routing (`/search`, `/tutor/:id`, `/booking/:tutorId`, `/sessions`, `/tutor/schedule`, `/tutor/service-hours`).
* Define interaction states: Loading skeletons, empty states ("No upcoming sessions"), error toasts, and bottom sheet dialogs.

### Step 3 — UI/UX Design System Mapping
* Use mobile-tailored Tailwind utility classes.
* Ensure bottom navigation spacing (`pb-20` to prevent content overlap).
* Use the design system defined in `.agent/skills/ui-ux/SKILL.md`.

### Step 4 — Database & RLS Impact Analysis
* Confirm affected tables: `profiles`, `tutor_profiles`, `tutor_subjects`, `tutor_availability`, `sessions`, `service_hour_logs`, `reviews`.
* Formulate exact PostgreSQL RLS policies ensuring secure multi-tenant access.
* Specify non-destructive DDL (`ADD COLUMN IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`).

### Step 5 — Security & Data Integrity Audit Plan
* Plan client input validation (sanitizing text fields, dates, rates).
* Enforce payment flow safety: Only tutors can mark `payment_status = confirmed`.
* Enforce service hours integrity: Only sessions with `counts_toward_service_hours = true` reaching `status = completed` generate logs.

### Step 6 — Phased Implementation Roadmap
* Break tasks into clean sequential phases:
  * Phase 1: Mobile UI Screens & React Components
  * Phase 2: React State & Supabase Service Layer
  * Phase 3: Supabase Database Tables, Triggers & RLS
  * Phase 4: End-to-End Testing on Mobile Viewport & Capacitor Build Verification

---

## 3. Required Output Format

When generating an implementation plan:

1. **Feature Title & Objectives:** Clear statement of purpose and expected user benefits.
2. **Actors & Permissions Matrix:** Capabilities of Student vs. Tutor for this feature.
3. **User Flow & Sequence Diagram:** Mermaid sequence diagram illustrating the mobile interaction flow.
4. **Mobile UI & Screen Mapping:** List of screens, route paths, and component layout structure.
5. **File Modification Plan:** Categorized as `[NEW]`, `[MODIFY]`, or `[DELETE]` with clickable links (`file:///...`).
6. **Database & Schema Plan:** Target tables, required indexes, and non-destructive SQL / RLS policies.
7. **Security & Integrity Plan:** RLS policy details, role boundaries, and input validation.
8. **Phased Development Tasks:** Step-by-step development checklist.
9. **Verification & Build Checklist:** Test scenarios on mobile viewport and `npm run build` verification for Capacitor sync.
10. **Assumptions & Open Questions:** Explicitly noted items requiring user confirmation.
