# MentorLink — Product Requirements Document (PRD)

**Project Title:** MentorLink — Mentorship & Tutoring Matching Mobile Application  
**Target Audience:** High School and College Students  
**Document Version:** 1.0  
**Status:** Approved for Implementation  
**Tech Stack:** React.js (Vite), Tailwind CSS, Capacitor (`@capacitor/android`), Supabase (PostgreSQL & Auth), Android Studio  

---

## 1. Executive Summary & Product Vision

### 1.1 Product Vision
**MentorLink** is a mobile-first peer mentorship and tutoring matching application designed specifically for high school and college students. The platform bridges the gap between students needing academic assistance and qualified peer students who want to share knowledge, earn direct income, or accredit verifiable **University Community Service Hours**.

### 1.2 Core Philosophy
1. **Pure Mobile Application:** Engineered specifically for mobile screens ($360\text{px}$–$430\text{px}$) and packaged as an installable **Android APK** via Capacitor and Android Studio.
2. **Simplified Economic Model:** Direct pay only. Tutors set their rates (or volunteer ₱0.00), and students transfer payments directly (e.g., GCash, Maya, cash) and submit transaction references.
3. **Non-Monetary Incentive:** Built-in tracking and export of **University Community Service Hours** for academic volunteer credit.
4. **Human-Centric & No Bloat:** Focused strictly on matching, scheduling, payment tracking, study notes, and accreditation—omitting premature AI wrappers or barter token systems.
5. **Distribution:** Distributed via a companion single-page **APK Download Website**.

---

## 2. Problem Statement & Opportunities

### 2.1 The Problems
* **High Cost of Professional Tutoring:** Traditional commercial tutoring centers and private services charge rates that are unaffordable for average high school and college students.
* **Relatability Gap:** Professional instructors often teach with rigid syllabi, whereas near-peer mentors understand exact course nuances, teachers' testing styles, and typical student stumbling blocks.
* **Tutor Availability Friction:** Student tutors have fluctuating schedules; without a centralized slot management and direct booking system, scheduling across messaging apps is chaotic.
* **Lack of Formal Volunteer Recognition:** Many college students willingly tutor younger peers but lack official, verifiable records to submit for departmental community service requirements.

### 2.2 The Solution
MentorLink solves these issues by providing a structured mobile app where:
* Students search peer tutors by course code/subject, grade level, and rate.
* Tutors define exact weekly recurring availability.
* Direct payments are transparently recorded and verified by tutors.
* Completed volunteer sessions automatically tally toward accredited Community Service Hours with exportable proof.

---

## 3. User Personas & Roles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             USER ROLE TAXONOMY                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                     ┌────────────────┴────────────────┐
                     ▼                                 ▼
      ┌─────────────────────────────┐   ┌─────────────────────────────┐
      │      STUDENT (LEARNER)      │   │     PEER TUTOR (MENTOR)     │
      │ - High school / College     │   │ - Qualified upperclassman   │
      │ - Needs subject help        │   │ - Sets rate / ₱0 volunteer  │
      │ - Books slots & pays direct │   │ - Accepts bookings & notes  │
      │ - Rates peer tutor          │   │ - Accredits service hours   │
      └─────────────────────────────┘   └─────────────────────────────┘
                     ▲                                 ▲
                     └──────── Dual-Role Profile ──────┘
                        (Single account can toggle)
```

### 3.1 Persona A: The Learner (Student)
* **Demographics:** High school or college student needing academic unblocking in subjects like Calculus, Physics, Chemistry, or Programming.
* **Key Goals:** Quickly find an affordable, relatable peer tutor available at specific times, book a session, attend, and review study notes.

### 3.2 Persona B: The Mentor (Peer Tutor)
* **Demographics:** Excelling high school senior or college student looking to earn pocket money or complete university-mandated community service hours.
* **Key Goals:** List qualified subjects, establish open availability, receive structured bookings, confirm direct payments, and export certified service hour logs.

### 3.3 Dual-Role Switcher (`is_tutor`)
* A student can apply as a tutor using their existing account.
* Once approved, the app header displays a mode toggle: **Learner Mode** $\longleftrightarrow$ **Mentor Dashboard**.

---

## 4. Functional Requirements (FR)

### FR-1: Authentication & Onboarding
* **FR-1.1 Email & Password Auth:** Secure signup and login powered by Supabase Auth with salted Bcrypt password hashing.
* **FR-1.2 User Profile Setup:** Captures full name, school/institution, academic level (`high_school` or `college`), and bio.
* **FR-1.3 Tutor Activation:** A user can tap "Become a Tutor" to fill in tutor-specific details: headline, hourly rate (or ₱0 volunteer), payment instructions (e.g., GCash number), and qualified subjects.

### FR-2: Tutor Discovery & Filtering
* **FR-2.1 Subject & Keyword Search:** Search by exact subject or topic name (e.g., *Pre-Calculus, General Chemistry, Python*).
* **FR-2.2 Multi-Criteria Filtering:**
  * Academic Level: High School, College, or Both.
  * Price: All, Volunteer Only (₱0), or Max Hourly Rate slider.
  * Day of the Week: Filter tutors available on specific days.
* **FR-2.3 Public Tutor Card:** Displays avatar, name, school name, rating (1–5 stars with session count), subjects taught, and rate/hour or "Volunteer" badge.
* **FR-2.4 Tutor Detail Profile:** Detailed view showing full bio, academic experience, complete subject list, recurring availability grid, and past student reviews.

### FR-3: Availability & Slot Booking
* **FR-3.1 Recurring Availability Management:** Tutors define their weekly recurring availability windows (e.g., Mondays 15:00–18:00, Saturdays 09:00–12:00).
* **FR-3.2 Slot Selection:** Students select a date and pick from available, unreserved 1-hour time blocks.
* **FR-3.3 Booking Form:** Student specifies:
  * Specific topic or homework question.
  * Meeting preference: Online (with Google Meet / Zoom link) or In-Person (designated campus location).
  * Agreed session rate (auto-calculated from duration $\times$ tutor rate).
* **FR-3.4 Conflict Prevention:** Overlapping bookings for the same tutor slot are rejected at the database level.

### FR-4: Direct Payment Flow & Tracking
* **FR-4.1 Simplified Direct Pay Model:** The platform does not hold escrow or charge processing fees.
* **FR-4.2 Payment Submission:**
  * For paid sessions, student transfers funds directly to the tutor (GCash, Maya, Bank, or Cash).
  * Student enters the transaction Reference Number into the session view.
  * Session status transitions to `payment_submitted`.
* **FR-4.3 Tutor Verification:**
  * Tutor receives the booking with the submitted Reference Number.
  * After verifying funds in their personal wallet, the tutor taps **"Confirm Payment & Accept"**.
  * Session status transitions to `confirmed`.
* **FR-4.4 Volunteer Bypass:** If the tutor rate is ₱0.00, payment steps are bypassed and the booking confirms directly upon tutor acceptance.

### FR-5: Session Execution & Study Notes
* **FR-5.1 Upcoming Session Card:** Displays countdown timer, scheduled date/time, subject, and direct button to launch meeting link or view meeting location.
* **FR-5.2 Post-Session Notes Pad:**
  * Tutor inputs key concepts covered, problem solutions, and study pointers.
  * Saved notes become permanently accessible to the student in their session history for exam preparation.
* **FR-5.3 Mark Completed:** Tutor marks the session as finished, triggering the review flow and community service hour accreditation.

### FR-6: University Community Service Hours Accreditation
* **FR-6.1 Automated Credit Trigger:** When a volunteer session (`counts_toward_service_hours = true`) is marked `completed`, a database trigger automatically:
  * Inserts an immutable verification record into `service_hour_logs`.
  * Increments `total_service_hours` in `tutor_profiles`.
* **FR-6.2 Service Hours Ledger:** Tutor dashboard displays total accredited hours and an itemized breakdown of completed mentoring sessions.
* **FR-6.3 Verification Summary Export:** Generates an official printable/PDF-ready summary sheet with student names, dates, subjects, accredited hours, and signature line for university departmental approval.

### FR-7: Peer Reviews & Ratings
* **FR-7.1 1–5 Star Rating:** Students rate completed sessions (1 to 5 stars) and optionally write feedback.
* **FR-7.2 Single Review Per Session:** Enforced by database constraint `UNIQUE(session_id)`.
* **FR-7.3 Auto-Recalculation:** Tutor’s average rating and total session counters update automatically upon review submission.
* **FR-7.4 Anti-Self-Review:** Tutors cannot review their own profiles.

### FR-8: Companion APK Download Landing Page
* **FR-8.1 Showcase Section:** Hero banner, value propositions, key features, and mobile app screenshots.
* **FR-8.2 Direct APK Download Button:** Hosts the compiled `MentorLink.apk` file for direct one-tap mobile download.
* **FR-8.3 Installation Guide:** 3-step instructions on enabling unknown sources and installing the APK on Android devices.

---

## 5. Non-Functional Requirements (NFR)

### 5.1 Mobile Ergonomics & Performance
* **Target Resolution:** Optimized for viewports between $360\text{px}$ and $430\text{px}$ (common Android screen sizes).
* **Touch Targets:** All clickable chips, buttons, and inputs must be $\ge 44 \times 44\text{px}$.
* **Bottom Nav Clearance:** Fixed bottom navigation bar must never obscure content (`pb-24` standard).
* **Load Times:** Screen transition times $< 300\text{ms}$; initial bundle size $< 2\text{ MB}$.

### 5.2 Security & Data Integrity
* **100% Row Level Security (RLS):** Enabled across all tables in Supabase PostgreSQL.
* **Zero Service-Role Key Leaks:** Only public `anonKey` permitted in client code; `service_role` is strictly prohibited.
* **Android Native Hardening:**
  * `android:usesCleartextTraffic="false"` in `AndroidManifest.xml` (TLS 1.3 / HTTPS only).
  * `android:debuggable="false"` in release builds.
* **Payment State Integrity:** Students cannot mark sessions as `confirmed`; only tutors can confirm payments.
* **Hours Anti-Tamper:** Service hours can only be credited via server-side PostgreSQL triggers upon session completion.

---

## 6. System Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MENTORLINK SYSTEM TOPOLOGY                          │
└─────────────────────────────────────────────────────────────────────────────┘

  [COMPANION WEB PAGE]                  [MOBILE CLIENT APP]
  HTML5 + Tailwind CSS                  React.js (Vite) + Tailwind CSS
  Hosted on Vercel / Netlify            Capacitor Native Android Container
  "Download APK" Button                 Compiled via Android Studio into .apk
           │                                      │
           │                                      ▼
           │                             [CLIENT SERVICE LAYER]
           │                             src/services/*.js
           │                                      │
           └───────────────────┬──────────────────┘
                               │ HTTPS / WSS
                               ▼
                   [SUPABASE BACKEND CLOUD]
                   ├─ Supabase Auth (JWT, Bcrypt)
                   ├─ PostgreSQL with 100% RLS
                   ├─ Realtime Channels (Push alerts)
                   └─ Storage (Avatars, Receipt proofs)
```

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Mobile Frontend** | React.js (Vite) | Fast component architecture, modular state, instant hot-reload. |
| **Styling** | Tailwind CSS | Utility-first, mobile ergonomics, responsive tokens, zero runtime CSS overhead. |
| **Mobile Container** | Capacitor (`@capacitor/android`) | Modern industry standard to wrap web code into Android Studio with zero native boilerplate. |
| **Native IDE & Build**| Android Studio | Official Android build system for generating debug and signed APKs. |
| **Backend & DB** | Supabase (PostgreSQL) | Managed auth, relational schema, robust RLS policies, real-time listeners. |
| **Distribution** | Standalone Landing Page | Direct APK distribution for school/campus deployment without Play Store barriers. |

---

## 7. Database Entity Blueprint

The database consists of **7 normalized tables** in PostgreSQL:

1. **`profiles`:** User ID (auth.uid), full name, email, education level, school name, bio, `is_tutor`.
2. **`tutor_profiles`:** Hourly rate, headline, bio experience, total service hours, average rating, payment instructions.
3. **`tutor_subjects`:** Subjects taught, category, grade level targeting.
4. **`tutor_availability`:** Day of week (0–6), start time, end time, active flag.
5. **`sessions`:** Scheduled start/end, duration, meeting type, link/location, topic, status, payment status, payment reference, notes, service hours flag.
6. **`service_hour_logs`:** Accredited hours, session ID, tutor ID, student ID, verification timestamp.
7. **`reviews`:** Session ID, student ID, tutor ID, rating (1–5), review comment.

---

## 8. Implementation Roadmap

### Phase 1: Core Foundation & UI Framework
* Initialize Vite + React.js + Tailwind CSS project with mobile container layout.
* Set up bottom navigation bar (`Home`, `Find Tutors`, `My Sessions`, `Profile`).
* Initialize Supabase client and AuthContext (`login`, `register`, `session`).

### Phase 2: Discovery, Scheduling & Direct Pay
* Implement `FindTutorScreen` with subject and price filters.
* Build `TutorProfileScreen` and `SlotPickerModal`.
* Implement `BookSessionScreen` and direct payment reference submission.
* Build Tutor Incoming Requests view with **Confirm Payment** actions.

### Phase 3: Sessions, Notes & Community Hours
* Implement `MySessionsScreen` with active tabs (`Upcoming`, `Pending`, `Completed`).
* Build `SessionNotesPad` for tutor post-session summaries.
* Implement PostgreSQL trigger for auto-crediting community service hours.
* Build `ServiceHoursScreen` with accreditation summary export.
* Implement `RateSessionModal` and tutor rating auto-update trigger.

### Phase 4: Native Android Packaging & Companion Page
* Add Capacitor (`@capacitor/core`, `@capacitor/android`).
* Generate Android Studio project with `npx cap add android`.
* Configure `AndroidManifest.xml` (disable cleartext, set orientation).
* Compile standalone `.apk` in Android Studio.
* Build single-page APK download landing page (`landing/index.html`).

---

## 9. Success Metrics & Key Performance Indicators (KPIs)

1. **Matching Velocity:** Average time from tutor search to confirmed booking $< 2\text{ hours}$.
2. **Payment Confirmation Rate:** Over $95\%$ of submitted direct payments verified and confirmed without dispute.
3. **Volunteer Hour Accreditation:** Accurate, verifiable tally of service hours generated without manual administrative interventions.
4. **Mobile Stability:** Zero crashes on Android 9.0+ devices with seamless offline-to-online recovery.
