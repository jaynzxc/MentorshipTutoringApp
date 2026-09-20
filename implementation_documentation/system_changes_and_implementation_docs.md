# MentorLinks — System Architecture & Technical Implementation Documentation

**Application Title:** MentorLinks — Mentorship & Tutoring Matching Mobile Application  
**Tagline:** *"Connect. Learn. Grow."*  
**Target Audience:** High School and College Students (Peer-to-Peer)  
**Mobile Runtime:** Standalone Android APK (via Capacitor & Android Studio) + Companion APK Download Website  
**Technology Stack:** React.js (Vite), Tailwind CSS v4 (Ocean Breeze Theme), Vanilla JavaScript (ES6+), Capacitor (`@capacitor/android`), Supabase (PostgreSQL, Auth, RLS, Storage, Realtime)  
**Target Location:** `implementation_documentation/system_changes_and_implementation_docs.md`  
**Version:** 2.0 (Synchronized Architecture Release)  
**Date:** September 20, 2026  

---

## 📑 Table of Contents

1. [Executive Summary & Project Identity](#1-executive-summary--project-identity)
2. [Core Architectural Principles & Scope Boundaries](#2-core-architectural-principles--scope-boundaries)
3. [Divided Role Flow Architecture (Student vs. Mentor)](#3-divided-role-flow-architecture-student-vs-mentor)
4. [Master Mobile Screen Inventory & Content Structure](#4-master-mobile-screen-inventory--content-structure)
5. [In-App Messaging & Virtual Classroom Architecture](#5-in-app-messaging--virtual-classroom-architecture)
6. [Direct Payment State Machine & Integrity](#6-direct-payment-state-machine--integrity)
7. [University Community Service Hours Accreditation](#7-university-community-service-hours-accreditation)
8. [11-Table Database Schema & Row Level Security (RLS)](#8-11-table-database-schema--row-level-security-rls)
9. [Design System: Ocean Breeze Tokens & Vector Iconography](#9-design-system-ocean-breeze-tokens--vector-iconography)
10. [File Structure Blueprint & Documentation Suite](#10-file-structure-blueprint--documentation-suite)
11. [Android Native Container, Build Pipeline & APK Distribution](#11-android-native-container-build-pipeline--apk-distribution)

---

## 1. Executive Summary & Project Identity

**MentorLinks** is an academic peer-to-peer (P2P) mentorship and tutoring matching mobile platform designed for high school and college students. It connects learners needing academic assistance with qualified student peers who can provide 1-on-1 tutoring, guidance, and academic coaching.

### 1.1 The Dual Incentive Model
Student mentors are incentivized through two straightforward, transparent mechanisms:
1. **Direct Monetary Compensation:** Transparent hourly or session fees transferred directly via GCash, Maya, or cash with zero platform commission deductions.
2. **University Community Service Hours Accreditation:** Qualified student mentors who offer volunteer sessions (₱0.00 rate) earn officially accredited community service hours, backed by automated database triggers and verifiable summary certificates.

### 1.2 Purpose of This Document
This documentation captures the complete system architecture, business rules, UI content flows, and engineering specifications established across the project. It serves as the definitive reference for the development team, AI coding agents, and capstone/thesis evaluators.

---

## 2. Core Architectural Principles & Scope Boundaries

MentorLinks is built upon strict engineering boundaries to ensure maximum reliability, native mobile performance, and academic integrity:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   MENTORLINKS SYSTEM BOUNDARIES                        │
├────────────────────────┬───────────────────────┬───────────────────────┤
│    MOBILE EXPERIENCE   │    ECONOMIC MODEL     │   SERVICE ACCREDIT    │
│  - 360px–430px focus   │  - Direct Pay Only    │  - DB Trigger Commits │
│  - 5-tab persistent    │  - GCash, Maya, Cash  │  - Volunteer ₱0 only  │
│  - Safe-area insets    │  - No tokens/barter   │  - Anti-fraud hash    │
│  - >=44px touch targets│  - Zero platform fees │  - Formal certificate │
├────────────────────────┼───────────────────────┼───────────────────────┤
│    IN-APP MESSAGING    │   VIRTUAL CLASSROOM   │   DATA PROTECTION     │
│  - Real-time 1-on-1    │  - 10-min early unlock│  - 100% Supabase RLS  │
│  - Session cards       │  - Audio/Video/Share  │  - Public anonKey only│
│  - Unread indicators   │  - Shared notes pad   │  - TLS 1.3 encryption │
└────────────────────────┴───────────────────────┴───────────────────────┘
```

1. **Pure Mobile Application:** Optimized specifically for mobile ergonomics. The app is packaged via Capacitor and compiled into a standalone Android APK.
2. **No Complex Barter/Token System:** Eliminates artificial tokens, internal currencies, or escrow complexities. Payments are simple, direct, and verifiable.
3. **No Unrequested Technologies:** The technology stack strictly excludes PHP, MySQL, Laravel, Vue, Angular, jQuery, Docker, Kubernetes, or Redis.
4. **Human-Grade Craftsmanship:** Zero generic "AI slop", zero lazy stubs (`// TODO: add logic`), and zero dummy wrappers.

---

## 3. Divided Role Flow Architecture (Student vs. Mentor)

To minimize ambiguity and eliminate role-coupling confusion, the system separates screen specifications and workflows into two dedicated role documents:
- [`docs/student_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/student_flow_spec.md)
- [`docs/mentor_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/mentor_flow_spec.md)

### 3.1 Dual 5-Tab Navigation Layout
The navigation bar dynamically switches depending on the authenticated role:

| Tab Position | Student Shell (`role = 'student'`) | Mentor Shell (`role = 'mentor'`) |
| :---: | :--- | :--- |
| **Tab 1** | `🏠 Home` (Countdown, Quick Actions, Recommended Mentors) | `🏠 Home` (Today's Sessions, Quick Metrics, Recent Requests) |
| **Tab 2** | `🔍 Explore` (Search, Subject Chips, Mentor Directory) | `👥 Students` (Active Mentees, Roster, Session History) |
| **Tab 3** | `💬 Messages` (Chat Threads, Unread Badges) | `💬 Messages` (Mentee Conversations, Quick Booking Banner) |
| **Tab 4** | `📅 Sessions` (Upcoming, Completed, Virtual Classroom) | `📅 Sessions` (Requests, Upcoming, Completed, Notes Pad) |
| **Tab 5** | `👤 Profile` (Learning Progress, Settings, Help Center) | `👤 Profile` (Expertise, Availability, Service Hours, Settings) |

### 3.2 Role Switching Mechanism
Users can toggle modes via the `AppContext` role switcher if their account possesses dual privileges (`is_tutor = true`). Switching updates the persistent bottom navigation, top header actions, and routed views without requiring re-authentication.

---

## 4. Master Mobile Screen Inventory & Content Structure

[`docs/mobile_contents_guide.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/mobile_contents_guide.md) provides the complete screen-by-screen copy, wireframe cards, and layout hierarchy for **42 mobile screens**:

```
Part 1: Authentication & Onboarding (3 Screens)
├── 🔐 Sign In Screen (Email, Password, Google Auth, Forgot Password)
├── 📝 Sign Up Screen (Name, Email, Password, Student vs Mentor Role)
└── 👨‍🎓 Student Profile Setup (Education level, Interests, Bio, Avatar)

Part 2: Student Experience (21 Screens & Sub-screens)
├── 🏠 Student Home Dashboard (Hero countdown, Quick Actions, Recommended)
├── 🔍 Explore / Find Mentors (Category chips, Rate filters, Directory)
├── 👤 Mentor Profile — Student View (Bio, Subjects, Rate, Availability, Reviews)
├── 📅 Book a Session — Screen 1 (Date selector, Time slot grid, Format)
├── 📋 Review & Confirm Booking (Summary card, Direct-pay instructions, Notes)
├── ⏳ Pending Session Request (Status banner, Schedule card, Payment info)
├── 📅 Confirmed Session / Upcoming View (Classroom countdown, Join button)
├── 🎥 Virtual Classroom / Mentoring Session (Live feeds, Toolbar, Meeting notes)
├── ✅ Session Completed Screen (Session summary, Rating modal trigger)
├── 📅 Student Sessions Management (Tabbed: Upcoming | Completed)
├── 💬 Student Messages (Search, Conversation list, Unread counters)
│   └── 💬 Conversation Screen (1-on-1 thread, Session shortcut card, Input)
└── 👤 Student Profile & Settings
    ├── 📈 Learning Progress (Hours learned, Completed sessions, Subject levels)
    ├── 👤 Personal Information (Academic background, University details)
    ├── 🔔 Notification Settings (Push & Email toggles)
    ├── 🔒 Privacy & Security (Password, 2FA, Login activity, Delete account)
    ├── ❓ Student FAQs (Categorized search, Accordion answers)
    ├── 💬 Help & Support (Help center articles, Contact support ticket form)
    ├── 📄 Terms & Conditions (Platform rules, Cancellations, Disclaimers)
    ├── 🛡️ Privacy Policy (Data protection, Encryption, User rights)
    ├── ℹ️ About MentorLinks (Version 1.0.0, App purpose, Legal footer)
    └── 🚪 Log Out Confirmation Modal (Cancel vs Sign Out)

Part 3: Mentor Experience (18 Screens & Sub-screens)
├── 🧑‍🏫 Mentor Home Dashboard (Metrics: Hours, Rating, Requests; Upcoming cards)
├── 👥 Mentor — My Students (Mentee roster, Active sessions count, Search)
│   └── 👤 Student Profile Preview (Learning goals, Past sessions, Direct chat)
├── 💬 Mentor Messages (Conversation list, Unread dot indicator)
│   └── 💬 Mentor Conversation Screen (Direct chat thread, Upcoming banner)
├── 📅 Mentor — My Sessions
│   ├── 🟠 1. Pending Requests (Needs Action: Accept or Decline with Reason)
│   ├── 📅 3. Upcoming Sessions (Confirmed bookings, Join Classroom trigger)
│   ├── 📄 4. Session Details (Mentor view, Payment verification trigger)
│   ├── ✅ 5. Completed Sessions (Past history, Service hours accreditation tag)
│   └── 📋 6. Completed Session Details (Private study notes, Accreditation code)
└── 👤 Mentor Profile & Settings
    ├── 🕐 Mentor Availability Settings (Day buttons, Time slot ranges, Booking toggle)
    ├── 🔔 Mentor Notification Settings (Session alerts, Mentee chats, Marketing)
    ├── 🔒 Mentor Privacy & Security (Profile visibility, Security credentials)
    ├── ❓ Mentor FAQs (Mentor-specific policies, Direct payment questions)
    ├── 💬 Mentor Help & Support (Support tickets, Community guidelines)
    ├── 📄 Mentor Terms & Conditions (Mentor responsibilities, Cancellation policy)
    ├── 🛡️ Mentor Privacy Policy (Information security, Academic data handling)
    ├── ℹ️ About MentorLinks (Mission, Vision, University accreditation details)
    └── 🚪 Mentor Log Out Confirmation Modal
```

---

## 5. In-App Messaging & Virtual Classroom Architecture

### 5.1 Real-Time In-App Messaging
Messaging occurs inside direct 1-on-1 threads powered by Supabase Realtime WebSocket channels:
* **Session Shortcut Card:** Embedded at the top of active chat threads between student and mentor, displaying the next confirmed session date, time, and a direct `[ Join Classroom ]` button.
* **Typing Feedback & Unread Badges:** Instant unread counters on Tab 3 navigation icon.
* **Direct Attachment Support:** Optional document/image upload for study materials.

### 5.2 Built-In Virtual Classroom
MentorLinks includes an integrated, mobile-optimized meeting room designed for low-latency academic collaboration:
* **10-Minute Pre-Meeting Unlock:** The `[ Join Session ]` button activates exactly 10 minutes prior to `scheduled_start`. Prior to this window, a countdown badge is shown.
* **Component Architecture:**
  - `VideoFeed.jsx`: Dominant remote video/screen-share canvas with a floating self-view thumbnail.
  - `MeetingControls.jsx`: Floating bottom toolbar with vector SVG buttons:
    - Microphone toggle (`active` vs `muted`)
    - Camera toggle (`video on` vs `video off`)
    - Screen sharing toggle
    - Live session chat drawer trigger
    - End session button (`bg-rose-600`)
  - `SessionChatPanel.jsx`: Slide-up drawer allowing participants to send links, questions, or code snippets during the call.
  - `SessionNotesPad.jsx`: Collaborative note-taking drawer saved directly into the session's record upon meeting completion.
* **Post-Session Transition:** When the call concludes, students are routed to `SessionCompletedScreen.jsx` with a 1-5 star review prompt, while mentors are routed to session notes finalization.

---

## 6. Direct Payment State Machine & Integrity

MentorLinks utilizes a simplified **Direct-Pay Model** (GCash, Maya, or cash) with zero platform middleman fees:

```
[Student Books Session]
         │
         ▼
[Session Created: payment_status = 'unpaid', status = 'pending']
         │
         ▼ Student transfers fee via GCash/Maya & enters Ref #
[payment_status = 'payment_submitted', payment_reference = '100456789012']
         │
         ├──────────────────────────────────────────┐
         │ Mentor verifies in payment app           │ Mentor rejects
         ▼                                          ▼
[payment_status = 'confirmed']             [payment_status = 'declined']
[status = 'confirmed']                     [status = 'declined']
                                           [decline_reason = 'Invalid Ref #']
```

### 6.1 State Machine Rules
1. **Student Constraints:** Students can only set `payment_status = 'payment_submitted'` by supplying a reference number. Students **CANNOT** confirm payments.
2. **Mentor Authorization:** Only the assigned mentor (`auth.uid() = tutor_id`) can update `payment_status = 'confirmed'`.
3. **Mandatory Decline Reason:** Mentors declining a booking or payment must provide a structured reason (`schedule_conflict`, `invalid_payment`, `subject_mismatch`, or `other`).
4. **Volunteer Sessions (₱0.00):** If the mentor sets an hourly rate of ₱0.00, the payment state machine is bypassed; `payment_status` is automatically initialized to `'confirmed'` upon booking acceptance.

---

## 7. University Community Service Hours Accreditation

For student mentors volunteering at ₱0.00/hr, MentorLinks provides an automated, verifiable **University Community Service Hours Accreditation** mechanism:

```
[Session Completed: status = 'completed']
         │
         ▼ Trigger fires: counts_toward_service_hours = true AND hourly_rate = 0
[Calculates Elapsed Duration: EXTRACT(EPOCH FROM (end - start)) / 3600]
         │
         ▼ Server commits immutable record with SHA-256 Verification Hash
[INSERT INTO service_hour_logs]
         │
         ▼ Atomically increments tutor's total accredited hours
[UPDATE tutor_profiles: total_service_hours = total_service_hours + hours]
```

### 7.1 Non-Monetary Integrity Ledger
* **PostgreSQL Trigger Enforcement:** Client apps have 0% write permissions to `service_hour_logs`. All inserts are executed strictly by the server-side trigger `handle_session_completion_service_hours` using `SECURITY DEFINER`.
* **Anti-Counterfeit Hash:** Every log entry generates an immutable 8-character verification hash (`ML-XXXX-XXXX`) derived from `session_id`, `tutor_id`, `student_id`, and `created_at`.
* **Certificate Export:** Mentors can export a printable PDF/HTML Community Service Hours Certificate detailing total hours served, dates, mentees, and verification QR codes for university submission.

---

## 8. 11-Table Database Schema & Row Level Security (RLS)

MentorLinks runs on **Supabase PostgreSQL** across 11 normalized tables with 100% Row Level Security (RLS) enforcement:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SUPABASE RELATIONAL SCHEMA (11 TABLES)               │
├────────────────────────────────┬───────────────────────────────────────┤
│ TABLE NAME                     │ FUNCTION / RELATIONSHIPS              │
├────────────────────────────────┼───────────────────────────────────────┤
│ 1. profiles                    │ Base user data, school, education     │
│ 2. tutor_profiles              │ Mentor bio, rate, hours, rating       │
│ 3. tutor_subjects              │ Subjects offered & grade levels       │
│ 4. tutor_availability          │ Recurring weekly schedule slots       │
│ 5. sessions                    │ Bookings, payments, classroom data    │
│ 6. reviews                     │ 1-5 star ratings & student feedback   │
│ 7. service_hour_logs           │ Immutable accredited volunteer hours  │
│ 8. conversations               │ Chat thread metadata & participants   │
│ 9. messages                    │ Real-time chat messages & attachments │
│ 10. support_tickets            │ Help center inquiries & support       │
│ 11. notification_preferences   │ Push & email alert toggles            │
└────────────────────────────────┴───────────────────────────────────────┘
```

### 8.1 Row Level Security (RLS) Policies Matrix

| Table | SELECT Policy | INSERT Policy | UPDATE Policy | DELETE Policy |
| :--- | :--- | :--- | :--- | :--- |
| `profiles` | Public (Authenticated) | `auth.uid() = id` | `auth.uid() = id` | Prohibited |
| `tutor_profiles` | Public | `auth.uid() = user_id` | `auth.uid() = user_id` | Prohibited |
| `tutor_subjects` | Public | `auth.uid() = tutor_id` | `auth.uid() = tutor_id` | `auth.uid() = tutor_id` |
| `tutor_availability` | Public | `auth.uid() = tutor_id` | `auth.uid() = tutor_id` | `auth.uid() = tutor_id` |
| `sessions` | Student or Tutor involved | `auth.uid() = student_id` | Student or Tutor involved | Prohibited |
| `reviews` | Public | Student of completed session | Student author | Prohibited |
| `service_hour_logs` | Assigned Tutor | Server trigger only | Server trigger only | Prohibited |
| `conversations` | Thread participants | Participant | Participant | Prohibited |
| `messages` | Thread participants | Sender (`auth.uid() = sender_id`)| Prohibited | Prohibited |
| `support_tickets` | Ticket author | `auth.uid() = user_id` | Author | Prohibited |
| `notification_preferences`| `auth.uid() = user_id`| `auth.uid() = user_id` | `auth.uid() = user_id` | Prohibited |

---

## 9. Design System: Ocean Breeze Tokens & Vector Iconography

### 9.1 Ocean Breeze Palette
The design tokens provide a focused, distraction-free mobile learning environment:

| Design Token | Tailwind Class | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Sky** | `bg-sky-600`, `text-sky-600` | `#0284c7` | Brand actions, active bottom nav tabs, primary CTA buttons. |
| **Accent Sky** | `bg-sky-500`, `text-sky-500` | `#0ea5e9` | Gradients, progress meters, secondary highlights. |
| **Vibrant Cyan** | `bg-cyan-500`, `text-cyan-500`| `#06b6d4` | Live session indicators, countdown badges. |
| **Deep Navy Text** | `text-slate-900` | `#0f172a` | Headers, mentor names, session titles, dialog headings. |
| **Canvas Background** | `bg-slate-50` | `#f8fafc` | Mobile viewport background canvas. |
| **Card Surface** | `bg-white` | `#ffffff` | Elevated cards, bottom sheets, modals, bottom navigation bar. |
| **Dividers & Borders**| `border-slate-200` | `#e2e8f0` | Card borders, input field outlines, list dividers. |
| **Success Emerald** | `bg-emerald-50`, `text-emerald-700`| `#10b981` | Confirmed bookings, verified payments, volunteer tag. |
| **Warning Amber** | `bg-amber-50`, `text-amber-700` | `#f59e0b` | Pending session requests, verification in progress. |
| **Danger Rose** | `bg-rose-50`, `text-rose-700` | `#ef4444` | Declined sessions, cancellations, leave classroom button. |
| **Service Purple** | `bg-purple-50`, `text-purple-700`| `#8b5cf6` | Service hours badges, certificate export actions. |

### 9.2 Vector Iconography Standard (Strictly NO Raw Emojis in UI Code)
* **Architecture Directive:** In all React component implementations, developers and AI agents must NEVER render raw Unicode emojis (`🏠`, `🔍`, `💬`, `📅`, `👤`, `⭐`, `🔔`, `✏️`, `🎉`, etc.) as user interface icons.
* **Approved Solutions:** Clean, scalable inline **SVG vectors** or **Font Awesome** icon components.
* **Styling:** Standardized sizing (`w-5 h-5` for navigation/headers, `w-4 h-4` for chips/badges) using `currentColor` inheritance and `aria-hidden="true"` accessibility tags.

### 9.3 Mobile Viewport Ergonomics
* Target viewport: $360\text{px}$ to $430\text{px}$ width.
* Interactive touch targets: minimum $44 \times 44\text{px}$.
* Fixed navigation clearance: Mandatory `pb-24` padding on all scrollable views so buttons and cards are never hidden beneath the fixed bottom navigation bar.

---

## 10. File Structure Blueprint & Documentation Suite

MentorLinks maintains a strictly organized project file structure documented in [`docs/file_structure.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/file_structure.md):

```
MentorLinks/
├── .agent/skills/          # 10 Domain skills (architecture, ui-ux, database, planning, etc.)
├── android/                # Capacitor Android Studio native project
├── assets/                 # CSS (input.css, output.css), images, and JS scripts
├── docs/                   # Complete 17-file documentation suite
├── landing/                # Companion APK download landing page
├── public/                 # Favicon, web app manifests, splash graphics
└── src/                    # React application source code
    ├── assets/icons/       # Scalable vector SVGs (NO emojis in UI)
    ├── components/         # Reusable common, layout, messaging, meeting, and tutor UI
    ├── context/            # AuthContext & AppContext
    ├── pages/              # Routed views (auth, student, mentor, sessions, common)
    ├── services/           # Supabase API services (auth, message, session, tutor, review)
    ├── utils/              # DateUtils, formatters, constants
    ├── App.jsx             # Shell wrapper & route guards
    └── main.jsx            # React root mount
```

### 10.1 Complete 17-File Documentation Suite
1. `PRD.md` — Product Requirements Document
2. `student_flow_spec.md` — Dedicated Student 5-tab modular flow specification
3. `mentor_flow_spec.md` — Dedicated Mentor 5-tab modular flow specification
4. `mobile_contents_guide.md` — 42-screen master UI preview, copy & wireframe guide
5. `key_features.md` — Comprehensive screen-by-screen feature capabilities
6. `file_structure.md` — Definitive directory and placement blueprint
7. `database_schema_design.md` — Relational data model, data dictionary & trigger logic
8. `supabase_schema_setup.sql` — Executable idempotent SQL setup script (11 tables)
9. `system_workflow.md` — Cross-role lifecycles & business rule sequence flows
10. `system_flowchart.md` — Visual Mermaid diagrams & state flowcharts
11. `security.md` — Mobile container security, TLS 1.3 & RLS defense architecture
12. `service_hours_certificate_spec.md` — University Community Service Hours accreditation spec
13. `android_build_guide.md` — Capacitor sync & Android Studio APK compilation guide
14. `browser_mobile_preview_guide.md` — Browser responsive testing & mobile emulation
15. `error_handling_and_toasts.md` — Try/catch service patterns & mobile notification toasts
16. `Skills.md` — Directory guide for AI agent skills
17. `env.example` — Template for Supabase configuration variables

---

## 11. Android Native Container, Build Pipeline & APK Distribution

### 11.1 Build Pipeline
```
[React Code in src/ + input.css]
              │
              ▼ npm run build
[Compiled production bundle in dist/]
              │
              ▼ npx cap sync android
[Synced into android/app/src/main/assets/public/]
              │
              ▼ Build APK in Android Studio
[Standalone release APK: MentorLinks.apk]
              │
              ▼ Hosted on companion landing page
[Users download directly from landing/index.html]
```

### 11.2 Native Security Hardening
In `android/app/src/main/AndroidManifest.xml`:
* `android:usesCleartextTraffic="false"` (Enforces TLS 1.3 / HTTPS encryption for all network traffic).
* `android:screenOrientation="portrait"` (Locks mobile portrait view).
* Zero `service_role` key exposure: Client bundle packaged inside the APK contains only the public `anonKey`.

---

## 12. Verification & Summary Checklist

- [x] Dual 5-tab navigation strictly separated across Student and Mentor roles.
- [x] 42 mobile screens cataloged in `mobile_contents_guide.md` and mapped in `file_structure.md`.
- [x] Built-in virtual classroom unlocked 10 minutes prior to scheduled start.
- [x] Direct payment state machine with reference submission, mentor confirmation, and decline reasons.
- [x] University Community Service Hours auto-credited strictly via PostgreSQL triggers.
- [x] 11-table database schema secured with 100% Row Level Security (RLS).
- [x] Vector Iconography standard (SVGs / Font Awesome) enforced; raw emojis prohibited in UI code.
- [x] Ocean Breeze styling tokens and `pb-24` clearance implemented across design system.
- [x] All 17 documentation files synchronized and cross-referenced.
- [x] `npm run build` passes with 0 bundling or stylesheet errors.
