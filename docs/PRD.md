# MentorLinks — Product Requirements Document (PRD)

**Project Title:** MentorLinks — Peer Mentorship & Tutoring Mobile Application  
**Tagline:** Connect. Learn. Grow.  
**Target Audience:** High School and College Students  
**Document Version:** 2.0 (Aligned with `docs/mobile_contents_guide.md`)  
**Status:** Approved for Implementation  
**Tech Stack:** React.js (Vite), Tailwind CSS v4, Capacitor (`@capacitor/android`), Supabase (PostgreSQL, Auth, Realtime, Storage), Android Studio  
**Design Theme:** Ocean Breeze (`#0284c7`, `#0ea5e9`, `#06b6d4`, `#0f172a`, `#ffffff`, `#f0f9ff`)  

---

## 1. Executive Summary & Product Vision

### 1.1 Product Vision
**MentorLinks** is a mobile-first peer mentorship and tutoring matching application designed specifically for high school and college students. The platform bridges the gap between students needing academic guidance and qualified peer mentors who want to share knowledge, earn income, or accredit verifiable **University Community Service Hours**.

### 1.2 Core Philosophy
1. **Pure Mobile Application:** Engineered specifically for mobile screens ($360\text{px}$–$430\text{px}$) and packaged as an installable **Android APK** via Capacitor and Android Studio.
2. **Role-Specific 5-Tab Architecture:** Clean, specialized navigation tailored to the user's registered role:
   - **Student Navigation:** `🏠 Home` | `🔍 Explore` | `💬 Messages` | `📅 Sessions` | `👤 Profile`
   - **Mentor Navigation:** `🏠 Home` | `👥 Students` | `💬 Messages` | `📅 Sessions` | `👤 Profile`
3. **Interactive Virtual Classroom:** In-app meeting room with live video/camera toggle, microphone controls, screen sharing, real-time meeting chat, and live session study notes.
4. **Direct In-App Messaging:** Persistent chat system with conversation search, unread badges, and an embedded *Session Shortcut Card* connecting chat threads directly to active bookings.
5. **Simplified Economic & Community Service Model:** Direct peer pay (GCash/Maya/Cash) or ₱0 Volunteer tutoring that automatically accrues accredited University Community Service Hours.
6. **Detailed Flow References:**
   - Detailed Student Specification: [`docs/student_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/student_flow_spec.md)
   - Detailed Mentor Specification: [`docs/mentor_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/mentor_flow_spec.md)

---

## 2. Problem Statement & Opportunities

### 2.1 The Problems
* **High Cost of Professional Tutoring:** Commercial tutoring centers charge rates that are unaffordable for high school and college students.
* **Relatability Gap:** Professional instructors often teach with rigid syllabi, whereas near-peer mentors understand exact course nuances and student stumbling blocks.
* **Tutor Availability Friction:** Student mentors have fluctuating schedules; without centralized slot management and calendar booking, scheduling across social apps is chaotic.
* **Disjointed Learning Tools:** Students juggle multiple external apps for scheduling, meeting links, video calls, study notes, and messaging.
* **Lack of Formal Volunteer Recognition:** Many college students tutor peers but lack official, verifiable records for departmental community service credit.

### 2.2 The Solution
MentorLinks solves these issues by providing a unified mobile ecosystem:
* Students search peer mentors by subject, skill, availability, and rating.
* Mentors define exact recurring weekly availability windows.
* Direct in-app messaging keeps student-mentor discussions organized with embedded session shortcuts.
* Built-in Virtual Classroom enables direct online mentoring sessions with notes.
* Volunteer sessions automatically accumulate accredited Community Service Hours with exportable verification.

---

## 3. User Roles & Navigation Shell

Users explicitly select their account role upon registration (`I am a: ○ Student | ○ Mentor`):

```
                                  [REGISTRATION]
                         Account Type: Student vs Mentor
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
       ┌─────────────────────────┐             ┌─────────────────────────┐
       │     STUDENT (LEARNER)   │             │   PEER TUTOR (MENTOR)   │
       │  5-Tab Navigation:      │             │  5-Tab Navigation:      │
       │  1. 🏠 Home             │             │  1. 🏠 Home             │
       │  2. 🔍 Explore          │             │  2. 👥 Students         │
       │  3. 💬 Messages         │             │  3. 💬 Messages         │
       │  4. 📅 Sessions         │             │  4. 📅 Sessions         │
       │  5. 👤 Profile          │             │  5. 👤 Profile          │
       └─────────────────────────┘             └─────────────────────────┘
```

---

## 4. Functional Requirements (FR)

### FR-1: Authentication & Onboarding
* **FR-1.1 Email & Password Auth:** Secure signup and login powered by Supabase Auth with salted Bcrypt password hashing.
* **FR-1.2 Role Selection:** Segmented selector during signup (`○ Student` vs `○ Mentor`).
* **FR-1.3 Student Profile Setup:** Profile photo, school/university, course/program, year level (1st–4th Year, Graduate), short bio, and learning interests chips (Programming, Web Dev, UI/UX, Cybersecurity, Database, Mobile Dev, etc.).
* **FR-1.4 Mentor Profile Setup:** Specialization tagline, expertise chips, years of experience, mentoring style, availability, and optional hourly rate.

### FR-2: Discovery, Explore & Mentor Profiles
* **FR-2.1 Keyword & Category Search:** Search by mentor name, skill, expertise, or topic.
* **FR-2.2 Multi-Criteria Filtering:** Filter modal with expertise checkboxes, session type (Online, In-Person, Both), availability (Today, This Week), and minimum rating (4.0+, 4.5+, 4.8+).
* **FR-2.3 Mentor Profile View:** Bio, expertise tags, experience, mentoring style, availability preview, session duration, reviews, and action buttons (`[ 💬 Message ]` and `[ 📅 Book a Session ]`).

### FR-3: Booking Sub-flow & Session Requests
* **FR-3.1 Date & Time Selection:** Interactive calendar highlighting available mentor days; slot selector (e.g. 6:00 PM, 7:00 PM) and duration pills (30, 45, 60 min).
* **FR-3.2 Topic Input:** Student details specific learning questions or homework goals.
* **FR-3.3 Review & Confirm:** Review booking details before dispatching request.
* **FR-3.4 Request Processing (Mentor):** Mentor receives booking request with options to `[ Accept ]` (moves to Confirmed) or `[ Decline ]` (with reason selection: schedule conflict, time unavailable, etc.).

### FR-4: Active Sessions & Virtual Classroom
* **FR-4.1 Confirmed Session Screen:** Shows session details, preparation checklist, and countdown (*"Session starts in X days"*).
* **FR-4.2 Join Session Activation:** `[ 🎥 Join Session ]` CTA activates when the session is approaching or live.
* **FR-4.3 Virtual Classroom Environment:**
  * Video feeds: Large mentor video with picture-in-picture student video.
  * Meeting controls: Mic mute/unmute, Camera on/off, Screen share toggle, Leave session.
  * In-Meeting Chat: Slide-up panel for instant messaging and sharing code links.
  * Session Notes: Live study takeaways recorded during session.
* **FR-4.4 Session Completion:** Post-meeting summary card with mentor study notes, view session history, and message mentor buttons.

### FR-5: In-App Messaging System
* **FR-5.1 Conversation Threads:** 1-on-1 direct messaging between students and mentors.
* **FR-5.2 Conversation Search & Unread Indicators:** Real-time search and unread badges.
* **FR-5.3 Embedded Session Shortcut Card:** Direct interactive card inside chat linking to confirmed upcoming sessions.

### FR-6: Learning Progress & University Service Hours
* **FR-6.1 Student Learning Progress:** Overall completion metrics (sessions, hours mentored, skills explored, % progress bar) and individual skill progress bars.
* **FR-6.2 Volunteer Service Hours Auto-Credit:** Automatic PostgreSQL trigger increments mentor `total_service_hours` and logs verifiable record in `service_hour_logs` upon completion of eligible volunteer sessions.
* **FR-6.3 Verification Certificate Export:** Printable and PDF-ready summary sheet for departmental approval.

### FR-7: Account, Privacy & Support
* **FR-7.1 Availability Schedule Manager:** Weekly recurring schedule slots (Mon–Sun) with ON/OFF availability toggle and duration selector.
* **FR-7.2 Notification Preferences:** Granular push/email toggles for requests, reminders, updates, and messages.
* **FR-7.3 Privacy & Security:** Password changes, 2FA toggle, login activity, profile visibility options, and account deletion.
* **FR-7.4 Support & Help Center:** Categorized FAQs, Help Center, and Support Ticket contact form.

---

## 5. Non-Functional Requirements (NFR)

* **Mobile Ergonomics:** $360\text{px}$–$430\text{px}$ viewport focus with $\ge 44 \times 44\text{px}$ touch targets and `pb-24` bottom nav clearance.
* **Design Standards:** Conforms to the **Ocean Breeze** design tokens (`sky-500` / `#0ea5e9` to `cyan-500` / `#06b6d4`, dark navy `#0f172a`, canvas `#f8fafc`).
* **Security & RLS:** 100% Row Level Security on Supabase PostgreSQL tables; zero exposure of `service_role` keys.
* **Native Hardening:** TLS 1.3 only (`android:usesCleartextTraffic="false"`).

