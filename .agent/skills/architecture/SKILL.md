---
name: architecture
description: Design system architecture, module relationships, mobile app workflows, folder structure, and data flow for MentorLink (Mentorship & Tutoring Matching Application). Use when planning or analyzing architecture before implementation or documentation.
---

# Architecture Skill (MentorLink)

## Goal

Design and maintain a clean, resilient, and scalable architecture for **MentorLink** — a peer mentorship and tutoring matching mobile application tailored for high school and college students. Built with **React.js**, **Tailwind CSS**, **JavaScript (ES6+)**, **Supabase (PostgreSQL & Auth)**, and packaged as an installable **Android Application (APK)** using **Capacitor** and **Android Studio**, alongside a dedicated **APK Download Website**.

---

## 1. Architectural Principles & Constraints

1. **Pure Mobile Application Experience:**
   * The core application is designed and optimized strictly as an installable mobile app (Android APK).
   * Mobile-first viewport standards (360px–430px focus, responsive flex/grid layouts).
   * Native mobile UI ergonomics: persistent bottom navigation bar (`Home`, `Search`, `Sessions`, `Profile`), mobile top app-bar, back button handling, safe-area padding, and minimum 44px touch targets.
2. **Standardized Technology Stack:**
   * **Frontend:** React.js (Vite build tool) with Vanilla JavaScript (ES6+ modules).
   * **Styling:** Tailwind CSS utility classes with consistent mobile-first tokens.
   * **Mobile Packaging:** Capacitor (`@capacitor/core`, `@capacitor/android`) integrated with Android Studio to generate standalone `.apk` files.
   * **Backend & Database:** Supabase (PostgreSQL, Supabase Auth, Row Level Security, Storage).
   * **Distribution:** A lightweight companion download landing page hosting the `.apk` file and installation instructions.
3. **Streamlined Functional Scope (No Feature Creep):**
   * Direct-pay session fee model only (transparent fee set by tutor, direct payment reference and status tracking: Unpaid $\rightarrow$ Payment Sent $\rightarrow$ Confirmed).
   * Non-monetary incentive strictly focused on **University Community Service Hours Accreditation** (automated hours log and printable summary for academic credit).
   * No complex barter/token exchange systems and no unnecessary AI wrappers.
4. **Defense-in-Depth & Data Integrity:**
   * Client-side route guards + Supabase JWT session verification.
   * 100% authorization enforced via PostgreSQL Row Level Security (RLS) policies.
   * Public `anonKey` only in client configs; zero `service_role` exposure.

---

## 2. System Architecture Layers

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                   TIER 1: PRESENTATION & MOBILE SHELL                  │
  │  - React.js Mobile UI Views + Tailwind CSS                             │
  │  - Native Mobile Patterns (Bottom Nav, Bottom Sheets, Top Header)      │
  │  - Companion APK Download Landing Page (Web Showcase & Direct DL)       │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │                 TIER 2: CLIENT APPLICATION & STATE                     │
  │  - React State & Context (AuthContext, SessionContext)                 │
  │  - Modular Service Layer (api/tutors.js, api/sessions.js, etc.)        │
  │  - Supabase JS Client (JWT handling, real-time status updates)         │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │                 TIER 3: NATIVE CONTAINER (CAPACITOR)                   │
  │  - Capacitor Android Runtime (@capacitor/android)                      │
  │  - Hardware back-button listener, deep linking & app state             │
  │  - Compiled via Android Studio into installable APK                    │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │                 TIER 4: BACKEND & DATABASE (SUPABASE)                  │
  │  - Supabase Auth (Email/Password, Session Tokens)                      │
  │  - PostgreSQL with Row Level Security (RLS)                            │
  │  - Tables: profiles, tutor_profiles, tutor_subjects,                   │
  │    tutor_availability, sessions, reviews, service_hour_logs            │
  │  - Supabase Storage (Profile pictures, payment slips, verification)    │
  └────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Core Modules & Responsibilities

### A. Authentication & User Profile Module
* **Unified Account with Dual Role Capability:** A user can act as a **Student** seeking help or register as a **Peer Tutor**.
* **Student Profile:** Academic level (High School / College), school/institution name, subjects of interest.
* **Tutor Profile:** Bio, academic credentials, hourly/session rate (or volunteer ₱0), active accepting status, subjects offered, and weekly availability slots.

### B. Tutor Discovery & Filtering Module
* Subject and topic search (e.g., *Pre-Calculus, General Chemistry, Python Programming*).
* Filter by:
  * Academic Level (High School / College).
  * Price / Rate (Free/Volunteer vs. Paid).
  * Day of week and available time windows.
  * Tutor rating (1 to 5 stars).

### C. Booking & Direct Pay Flow Module
* **Schedule Selection:** Student picks an open slot from the tutor's availability.
* **Session Details:** Student inputs specific topic, assignment description, or questions.
* **Direct Payment Lifecycle:**
  * Tutor sets rate (or volunteer ₱0).
  * Payment method: Direct payment (GCash, Maya, Bank Transfer, or In-Person Cash).
  * Status progression: `pending` $\rightarrow$ `payment_submitted` $\rightarrow$ `confirmed` $\rightarrow$ `completed` / `cancelled`.

### D. Session Management & Notes Module
* Active and upcoming session cards with countdown, meeting link (Google Meet / Zoom), or campus room location.
* Post-session **Notes Pad**: Tutor logs key topics covered and pointers for future study.

### E. Community Service Hours Accreditation Module
* Automatically tallies completed volunteer tutoring sessions.
* Generates verifiable **Service Hours Log / Summary** (Date, Student, Subject, Total Hours, Status) ready for submission to school/university community engagement offices.

### F. Rating & Review Module
* Post-session star rating (1–5) and student review.
* Calculates public average rating and completed session counters for tutors.

### G. Companion APK Download Landing Page
* Responsive single-page web showcase:
  * Hero section with app screenshots and feature highlights.
  * Direct "Download APK" button hosting the latest Android package.
  * Clear 3-step installation guide (Download $\rightarrow$ Allow Unknown Sources $\rightarrow$ Install & Launch).

---

## 4. Standard Directory Structure Blueprint

```
MentorLink/
├── android/                    # Capacitor Android Studio native project
├── public/                     # Static assets, app icons, splash screens
├── src/
│   ├── assets/                 # Images, icons, branding
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Button, Input, Modal, Badge, Card
│   │   ├── layout/             # MobileContainer, BottomNav, TopHeader
│   │   └── tutor/              # TutorCard, AvailabilityPicker, ReviewList
│   ├── context/                # AuthContext, AppContext
│   ├── pages/                  # Mobile screen views
│   │   ├── auth/               # Login, Register, ForgotPassword
│   │   ├── student/            # FindTutor, BookSession, MyBookings
│   │   ├── tutor/              # TutorDashboard, ManageSchedule, ServiceHours
│   │   ├── sessions/           # SessionDetails, SessionNotes
│   │   └── profile/            # UserProfile, EditProfile
│   ├── services/               # Supabase API services
│   │   ├── supabaseClient.js   # Supabase client initialization
│   │   ├── authService.js      # Auth helpers
│   │   ├── tutorService.js     # Tutor search & profile queries
│   │   ├── sessionService.js   # Booking & status mutations
│   │   └── reportService.js    # Service hours generator
│   ├── App.jsx                 # Screen router & mobile layout wrapper
│   ├── index.css               # Tailwind CSS directives & mobile utilities
│   └── main.jsx                # App entry point
├── landing/                    # Companion APK Download Landing Page
│   └── index.html              # Showcase & APK direct download page
├── capacitor.config.json       # Capacitor configuration
├── tailwind.config.js          # Tailwind styling configuration
├── vite.config.js              # Vite build configuration
└── package.json                # Project dependencies
```

---

## 5. Architectural Review & Implementation Workflow

Before proposing or executing code changes:

1. **Verify Mobile Ergonomics:** Ensure layouts fit mobile viewports, respect keyboard appearance, and do not introduce desktop-only UI assumptions.
2. **Trace State & Data Flow:** Map student actions to tutor views and database mutations with proper RLS constraints.
3. **Maintain Modularity:** Keep Supabase queries isolated in the `src/services/` layer, separating business logic from UI components.
4. **Ensure Build & Packaging Integrity:** Any frontend changes must cleanly build via `npm run build` so Capacitor can sync to Android Studio with zero errors.
5. **Protect Community Hours Integrity:** Ensure service hour logs can only be credited when a session is explicitly marked as `completed`.
