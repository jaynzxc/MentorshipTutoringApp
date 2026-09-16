---
name: rbac
description: Plan and review role-based access control for Student and Peer Tutor users using frontend screen guards and Supabase Row Level Security for MentorLink. Use when implementing permissions, protected views, or authorization.
---

# Role-Based Access Control (RBAC) Skill (MentorLink)

## Goal

Plan, enforce, and audit Role-Based Access Control and authorization boundaries across the Mobile UI (React), Client State, and Supabase PostgreSQL Database tiers for **MentorLink — Mentorship & Tutoring Matching Application**.

---

## 1. System Roles & Authority Boundaries

MentorLink supports two primary operational roles, with support for **Dual-Role User Profiles** (a single user account can learn as a student or provide peer tutoring):

```
                        ┌────────────────────────────────┐
                        │      AUTHENTICATED USER        │
                        │       (profiles table)         │
                        └───────────────┬────────────────┘
                                        │
                ┌───────────────────────┴───────────────────────┐
                ▼                                               ▼
┌────────────────────────────────┐             ┌────────────────────────────────┐
│       STUDENT (LEARNER)        │             │      PEER TUTOR (MENTOR)       │
│ - Browse & search tutors       │             │ - Manage tutor profile & bio   │
│ - Book session & select slots  │             │ - Set rates & weekly slots     │
│ - Submit direct payment ref    │             │ - Accept/decline bookings      │
│ - Attend sessions & view notes │             │ - Confirm payment receipt      │
│ - Rate & review peer tutors    │             │ - Record post-session notes    │
│ - CANNOT confirm payment       │             │ - Log community service hours  │
│ - CANNOT edit tutor profiles   │             │ - CANNOT review own profile    │
└────────────────────────────────┘             └────────────────────────────────┘
```

### 1. Student (Learner)
* **Scope:** Seeking academic help in high school or college subjects.
* **Capabilities:**
  * Search and filter qualified peer tutors by subject, grade level, rate, and availability.
  * Book session slots, enter assignment questions or study topics.
  * Submit direct payment references (e.g., GCash reference number, bank transfer, or in-person agreement).
  * View upcoming, ongoing, and completed sessions.
  * Access session notes logged by tutors.
  * Submit a 1–5 star rating and written review for completed sessions.
* **Explicit Restrictions:**
  * Cannot confirm payments or change session payment status to `confirmed`.
  * Cannot modify tutor availability schedules or hourly rates.
  * Cannot access or edit another student’s booking records.
  * Cannot manually create or credit community service hour logs.

### 2. Peer Tutor (Mentor)
* **Scope:** Providing academic mentorship and tutoring to peers.
* **Capabilities:**
  * Configure tutor profile: headline, subjects qualified to teach, hourly rate (or ₱0 volunteer), and payment instructions.
  * Define weekly availability time windows (days of the week, start/end times).
  * Review incoming booking requests and accept or decline them.
  * Verify and confirm direct payment references received from students.
  * Record session notes and study pointers after conducting a session.
  * Mark sessions as `completed`.
  * View total accredited volunteer hours and export verifiable **University Community Service Hours Summaries**.
* **Explicit Restrictions:**
  * Cannot submit reviews or star ratings for themselves.
  * Cannot modify or view unrelated tutors' private session notes or earnings.
  * Cannot credit service hours without an actual completed session.

### 3. Dual-Role Switcher (`is_tutor`)
* Every user has a base `profiles` record.
* If a student applies and registers as a tutor, `profiles.is_tutor` is set to `true` and a `tutor_profiles` record is created.
* In the mobile app, users with `is_tutor = true` can toggle between **Student Mode** (finding tutors) and **Tutor Dashboard** (managing bookings and schedule) with a single tap in the Profile view.

---

## 2. Three-Tier Defense-in-Depth Enforcement

```
  TIER 1: MOBILE APP ROUTING & SCREEN GUARDS (React Router)
  - ProtectedRoute: Checks valid Supabase session; redirects unauthenticated users to /login.
  - TutorRoute: Checks profile.is_tutor === true; blocks non-tutors from tutor dashboard.
  - Context switch: Clear UI separation between Learner and Mentor modes.
                          │
                          ▼
  TIER 2: CLIENT APPLICATION & STATE (AuthContext)
  - Supabase JWT token managed securely via Supabase JS SDK.
  - Local state reflects authenticated user ID and tutor status.
  - Actions disable unauthorized triggers (e.g. Confirm Payment button disabled for students).
                          │
                          ▼
  TIER 3: DATABASE & SUPABASE RLS (Ultimate Source of Truth)
  - 100% of tables have Row Level Security enabled.
  - Database queries validated by auth.uid() and role conditions.
  - Direct API tampering cannot bypass PostgreSQL RLS policies.
```

---

## 3. RBAC Permissions Matrix

| Entity / Action | Student (Learner) | Peer Tutor (Mentor) | Unauthenticated |
| :--- | :--- | :--- | :--- |
| **`profiles` (Browse Tutors)** | `SELECT` public profile data | `SELECT` public profile data | `SELECT` (Directory view) |
| **`profiles` (Edit Own)** | `UPDATE` own profile (`auth.uid() = id`) | `UPDATE` own profile (`auth.uid() = id`) | Disallowed |
| **`tutor_profiles` (Manage)** | Read-only | `INSERT`, `UPDATE` own (`tutor_id = auth.uid()`) | Read-only |
| **`tutor_subjects`** | Read-only | `INSERT`, `UPDATE`, `DELETE` own | Read-only |
| **`tutor_availability`** | Read-only | `INSERT`, `UPDATE`, `DELETE` own | Read-only |
| **`sessions` (Create Booking)**| `INSERT` with `student_id = auth.uid()` | Disallowed (must book as student) | Disallowed |
| **`sessions` (View)** | `SELECT` where `student_id = auth.uid()` | `SELECT` where `tutor_id = auth.uid()` | Disallowed |
| **`sessions` (Confirm Payment)**| Disallowed | `UPDATE payment_status = confirmed` | Disallowed |
| **`sessions` (Mark Completed)**| Disallowed | `UPDATE status = completed` | Disallowed |
| **`service_hour_logs`** | Read-only (if participated) | `SELECT` own accredited hours | Disallowed |
| **`reviews`** | `INSERT` for completed session attended | Read-only (Cannot review self) | `SELECT` public reviews |

---

## 4. Frontend Route Guard Pattern (React)

```jsx
// src/components/common/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ requireTutor = false }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireTutor && !profile?.is_tutor) {
    return <Navigate to="/tutor/register" replace />;
  }

  return <Outlet />;
}
```

---

## 5. Required RBAC Audit Checklist

When implementing or modifying any feature:
- [ ] Role checks enforced both in React screen guards and at the Supabase RLS level.
- [ ] Students cannot approve their own bookings or mark payments as confirmed.
- [ ] Tutors cannot post reviews on their own profiles.
- [ ] Service hours credit cannot be manually altered or forged by clients.
- [ ] Multi-tenant isolation verified: User A cannot read User B's private sessions.
