---
name: rbac
description: Plan and review role-based access control for Student and Peer Mentor users using frontend screen guards and Supabase Row Level Security for MentorLinks. Use when implementing permissions, protected views, or authorization.
---

# Role-Based Access Control (RBAC) Skill (MentorLinks)

## Goal

Plan, enforce, and audit Role-Based Access Control and authorization boundaries across the Mobile UI (React), Client State, and Supabase PostgreSQL Database tiers for **MentorLinks — Mentorship & Tutoring Matching Application** (*"Connect. Learn. Grow."*).

---

## 1. System Roles & Authority Boundaries

MentorLinks supports two primary account types (`profiles.account_type`): **Student** and **Mentor**, with full dual-role flexibility (a user can learn as a student or provide peer mentorship):

```
                        ┌────────────────────────────────┐
                        │      AUTHENTICATED USER        │
                        │       (profiles table)         │
                        └───────────────┬────────────────┘
                                        │
                ┌───────────────────────┴───────────────────────┐
                ▼                                               ▼
┌────────────────────────────────┐             ┌────────────────────────────────┐
│            STUDENT             │             │             MENTOR             │
│ - 5 Tabs: Home, Explore,       │             │ - 5 Tabs: Home, Students,      │
│   Messages, Sessions, Profile  │             │   Messages, Sessions, Profile  │
│ - Browse & search mentors      │             │ - Manage mentor profile & bio  │
│ - Book session & select slots  │             │ - Set rates & weekly slots     │
│ - Submit direct payment ref    │             │ - Accept/decline bookings      │
│ - 1-on-1 messaging with mentor │             │ - Confirm payment receipt      │
│ - Join virtual classroom       │             │ - 1-on-1 messaging with student│
│ - Rate & review peer mentor    │             │ - Host virtual classroom       │
│ - CANNOT confirm payment       │             │ - Record post-session notes    │
│ - CANNOT edit mentor profiles  │             │ - Export service hour log      │
│ - CANNOT review own profile    │             │ - CANNOT review own profile    │
└────────────────────────────────┘             └────────────────────────────────┘
```

### 1. Student Capabilities & Restrictions
* **Capabilities:**
  * Search and filter qualified mentors by subject, category, rate, and availability in `Explore`.
  * Book session slots, enter assignment questions or study topics, and submit direct payment references.
  * Send/receive in-app messages with mentors.
  * Join in-app Virtual Classroom 10 minutes prior to scheduled session start.
  * View post-session notes left by mentors.
  * Submit a 1–5 star rating and written review for completed sessions.
* **Explicit Restrictions:**
  * Cannot confirm payments or change session payment status to `confirmed`.
  * Cannot modify mentor availability schedules or rates.
  * Cannot access or edit another student's booking records.
  * Cannot manually create or credit community service hour logs.

### 2. Mentor Capabilities & Restrictions
* **Capabilities:**
  * Configure mentor profile: headline, subjects qualified to teach, hourly rate (or ₱0 volunteer), mentoring style, and payment instructions.
  * Define weekly availability time windows (days of the week, start/end times).
  * Review incoming booking requests and accept or decline them (with a decline reason).
  * Verify and confirm direct payment references received from students.
  * Host Virtual Classroom meetings with video, audio, screen share, and meeting chat.
  * Record session notes and study takeaways in `SessionNotesPad`.
  * Mark sessions as `completed`.
  * View total accredited volunteer hours and export verifiable **University Community Service Hours Summaries**.
* **Explicit Restrictions:**
  * Cannot submit reviews or star ratings for themselves.
  * Cannot modify or view unrelated mentors' private session notes or earnings.
  * Cannot credit service hours without an actual completed volunteer session.

---

## 2. Three-Tier Defense-in-Depth Enforcement

```
  TIER 1: MOBILE APP ROUTING & SCREEN GUARDS (React Router)
  - ProtectedRoute: Checks valid Supabase session; redirects unauthenticated users to /login.
  - RoleGuard: Renders Student 5-Tab shell vs Mentor 5-Tab shell based on active AppContext role.
  - ClassroomGuard: Only allows participants of confirmed sessions into VirtualClassroomScreen.
                          │
                          ▼
  TIER 2: CLIENT APPLICATION & STATE (AuthContext & AppContext)
  - Supabase JWT token managed securely via Supabase JS SDK.
  - Local state reflects authenticated user ID and account type.
  - Action buttons conditionally rendered (e.g. Confirm Payment shown only to assigned mentor).
                          │
                          ▼
  TIER 3: DATABASE & SUPABASE RLS (Ultimate Source of Truth)
  - 100% of all 11 tables have Row Level Security enabled.
  - Database queries validated by auth.uid() and role conditions.
  - Direct API tampering cannot bypass PostgreSQL RLS policies.
```

---

## 3. RBAC Permissions Matrix

| Table / Action | Student | Mentor | Unauthenticated |
| :--- | :--- | :--- | :--- |
| **`profiles` (Read)** | `SELECT` public profile data | `SELECT` public profile data | Read-only |
| **`profiles` (Update)** | `UPDATE` own profile (`auth.uid() = id`)| `UPDATE` own profile (`auth.uid() = id`)| Disallowed |
| **`tutor_profiles`** | Read-only (if visible) | `INSERT`, `UPDATE` own (`tutor_id = auth.uid()`)| Read-only |
| **`tutor_subjects`** | Read-only | `INSERT`, `UPDATE`, `DELETE` own | Read-only |
| **`tutor_availability`** | Read-only | `INSERT`, `UPDATE`, `DELETE` own | Read-only |
| **`sessions` (Book)** | `INSERT` (`student_id = auth.uid()`) | Disallowed (must book as student) | Disallowed |
| **`sessions` (View)** | `SELECT` where `student_id = auth.uid()` | `SELECT` where `tutor_id = auth.uid()` | Disallowed |
| **`sessions` (Accept/Decline)** | Disallowed | `UPDATE status = 'confirmed'` / `'declined'` | Disallowed |
| **`sessions` (Confirm Payment)**| Disallowed | `UPDATE payment_status = 'confirmed'` | Disallowed |
| **`sessions` (Mark Completed)**| Disallowed | `UPDATE status = 'completed'` | Disallowed |
| **`conversations` & `messages`**| `SELECT`, `INSERT` (if participant) | `SELECT`, `INSERT` (if participant) | Disallowed |
| **`service_hour_logs`** | Read-only (if participant) | `SELECT` own accredited hours | Disallowed |
| **`reviews`** | `INSERT` for completed session attended | Read-only (cannot review self) | `SELECT` public reviews |
| **`support_tickets`** | `SELECT`, `INSERT` own tickets | `SELECT`, `INSERT` own tickets | Disallowed |
| **`notification_preferences`** | `SELECT`, `UPDATE` own preferences | `SELECT`, `UPDATE` own preferences | Disallowed |

---

## 4. Required RBAC Audit Checklist

When implementing or modifying any feature:
- [ ] Role checks enforced both in React screen guards and at the Supabase RLS level.
- [ ] Students cannot approve their own bookings or mark payments as confirmed.
- [ ] Mentors cannot post reviews on their own profiles.
- [ ] Service hours credit cannot be manually altered or forged by clients (guaranteed via DB trigger).
- [ ] Conversation and message access restricted strictly to the two active participants.
- [ ] Multi-tenant isolation verified: User A cannot read User B's private sessions or tickets.
