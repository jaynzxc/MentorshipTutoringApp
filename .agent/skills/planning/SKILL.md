---
name: planning
description: Create structured implementation plans, module workflows, feature breakdowns, and development roadmaps for MentorLinks (Mentorship & Tutoring Matching Application). Use when planning a new module, page, feature, or enhancement before coding.
---

# Planning Skill (MentorLinks)

## Goal

Produce thorough, highly structured, and production-ready implementation plans before writing any code or modifying database schemas for **MentorLinks — Mentorship & Tutoring Matching Application** (*"Connect. Learn. Grow."*).

---

## 1. Core Planning Principles

1. **Universal Mandate — Always Send an Implementation Plan:** Never write or modify source code without first submitting a clear, structured implementation plan and receiving explicit user approval.
2. **Zero AI Slop & Human-Grade Craftsmanship:**
   * Reject generic boilerplate, incomplete stubs, and lazy placeholder comments (`// TODO: add code here`).
   * Every planned component, hook, and database interaction must be fully specified, functional, and complete.
3. **Mobile-First App Constraints:**
   * Every screen must be designed for a mobile viewport ($360\text{px}$–$430\text{px}$) with touch-friendly targets ($\ge 44\text{px}$).
   * Mobile ergonomics: Persistent 5-tab bottom navigation (`pb-24` clearance), mobile headers, back buttons, and safe-area insets (`pt-safe`, `pb-safe`).
   * Native container compatibility: Code must cleanly bundle via `npm run build` and sync with Capacitor for Android Studio compilation.
4. **Strict Technology Stack Adherence:** Plan strictly within:
   * React.js (Vite)
   * Tailwind CSS v4 using **Ocean Breeze** design tokens (`#0284c7`, `#0ea5e9`, `#06b6d4`, `#0f172a`, `#f8fafc`)
   * Vanilla JavaScript (ES6+ modules)
   * Capacitor Android Container (`@capacitor/android`)
   * Supabase PostgreSQL with 100% Row Level Security (RLS) across 11 normalized tables
   * Companion APK download website (standalone single-page showcase)
   * Vector Iconography: Scalable inline SVGs or Font Awesome icons (strictly NO raw Unicode emojis in UI component implementation)
5. **Scope Integrity & Divided Role Directives:**
   * Validate Student flows against [`docs/student_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/student_flow_spec.md).
   * Validate Mentor flows against [`docs/mentor_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/mentor_flow_spec.md).
   * Direct-pay session fee tracking only (or volunteer ₱0.00).
   * In-App Messaging and Virtual Classroom meeting environments.
   * University Community Service Hours accreditation for mentors.
6. **Cross-Role Lifecycle Analysis:** Every plan must evaluate effects across both **Student** and **Mentor** perspectives (e.g., student booking creation $\rightarrow$ mentor notification $\rightarrow$ accept or decline with reason $\rightarrow$ payment confirmation $\rightarrow$ virtual classroom $\rightarrow$ service hours credit).

---

## 2. Six-Step Planning Workflow

```
   ┌───────────────────────┐
   │ 1. SCOPE & ACTORS     │ ── Cross-reference student_flow_spec.md & mentor_flow_spec.md
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 2. MOBILE FLOW & NAV  │ ── Map dual 5-tab screens, modals, & touch actions
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 3. UI/UX BENCHMARK    │ ── Match Ocean Breeze design tokens & pb-24 clearance
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 4. DATABASE & RLS     │ ── Map 11 tables, columns, indexes, & non-destructive DDL
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 5. SECURITY & ACCESS  │ ── Plan RLS rules, role checks, and meeting auth guards
   └──────────┬────────────┘
              ▼
   ┌───────────────────────┐
   │ 6. PHASED ROADMAP     │ ── Phased implementation breakdown, testing, Capacitor sync
   └───────────────────────┘
```

### Step 1 — Scope & Actor Identification
* Identify user stories for Student (finding help, scheduling, paying, real-time chat, joining classroom, reviewing) and Mentor (availability, accepting/declining requests, confirming payment, hosting classroom, notes, service hours).
* Verify boundaries: Ensure students cannot approve their own sessions or credit their own service hours.

### Step 2 — Mobile Flow & Navigation Mapping
* Map screen routing across the dual 5-tab architecture:
  - Student: `Home`, `Explore`, `Messages`, `Sessions`, `Profile`.
  - Mentor: `Home`, `Students`, `Messages`, `Sessions`, `Profile`.
* Define interaction states: Loading skeletons, empty states, error toasts, and bottom sheet dialogs.

### Step 3 — UI/UX Design System Mapping
* Use Ocean Breeze design tokens: Primary Sky (`#0284c7`), Accent Sky (`#0ea5e9`), Cyan (`#06b6d4`), Deep Navy (`#0f172a`), Surface White (`#ffffff`), Canvas (`#f8fafc`).
* **Vector Iconography:** Specify vector SVGs or Font Awesome icons for all buttons, navigation tabs, header actions, and status badges. Strictly prohibit raw Unicode emojis in UI component implementation.
* Ensure bottom navigation spacing (`pb-24` or `.bottom-nav-clearance` to prevent content overlap).
* Ensure touch targets $\ge 44 \times 44\text{px}$.

### Step 4 — Database & RLS Impact Analysis
* Confirm affected tables out of the 11 normalized tables (`profiles`, `tutor_profiles`, `tutor_subjects`, `tutor_availability`, `sessions`, `service_hour_logs`, `reviews`, `conversations`, `messages`, `support_tickets`, `notification_preferences`).
* Formulate exact PostgreSQL RLS policies ensuring secure multi-tenant access.
* Specify non-destructive DDL (`ADD COLUMN IF NOT EXISTS`, `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`).

### Step 5 — Security & Data Integrity Audit Plan
* Plan client input validation (sanitizing text fields, dates, rates).
* Enforce payment flow safety: Only mentors can mark `payment_status = confirmed`.
* Enforce decline reason requirement when mentor rejects a request.
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
2. **Actors & Permissions Matrix:** Capabilities of Student vs. Mentor for this feature.
3. **User Flow & Sequence Diagram:** Mermaid sequence diagram illustrating the mobile interaction flow.
4. **Mobile UI & Screen Mapping:** List of screens, route paths, and component layout structure.
5. **File Modification Plan:** Categorized as `[NEW]`, `[MODIFY]`, or `[DELETE]` with clickable links (`file:///...`).
6. **Database & Schema Plan:** Target tables, required indexes, and non-destructive SQL / RLS policies.
7. **Security & Integrity Plan:** RLS policy details, role boundaries, and input validation.
8. **Phased Development Tasks:** Step-by-step development checklist.
9. **Verification & Build Checklist:** Test scenarios on mobile viewport and `npm run build` verification for Capacitor sync.
10. **Assumptions & Open Questions:** Explicitly noted items requiring user confirmation.
