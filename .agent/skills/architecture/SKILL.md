---
name: architecture
description: Design system architecture, module relationships, mobile app workflows, folder structure, and data flow for MentorLinks (Mentorship & Tutoring Matching Application). Use when planning or analyzing architecture before implementation or documentation.
---

# Architecture Skill (MentorLinks)

## Goal

Design and maintain a clean, resilient, and scalable mobile architecture for **MentorLinks** — a peer mentorship and tutoring matching mobile application (*"Connect. Learn. Grow."*) tailored for high school and college students. Built with **React.js (Vite)**, **Tailwind CSS v4**, **Vanilla JavaScript (ES6+)**, **Supabase (PostgreSQL, Auth, Realtime, Storage)**, and packaged as an installable **Android Application (APK)** using **Capacitor** and **Android Studio**, alongside a dedicated **APK Download Website**.

---

## 1. Architectural Principles & Constraints

1. **Pure Mobile Application Experience:**
   * Engineered strictly as a mobile app (Android APK) optimized for $360\text{px}$–$430\text{px}$ viewports.
   * Persistent 5-tab bottom navigation bar, safe-area insets, back-button handling, and minimum $44\text{px}$ touch targets.
2. **Standardized Technology Stack:**
   * **Frontend:** React.js (Vite) with ES6+ modules.
   * **Styling:** Tailwind CSS v4 with Ocean Breeze design tokens (`#0284c7`, `#0ea5e9`, `#06b6d4`, `#0f172a`, `#f8fafc`).
   * **Mobile Runtime:** Capacitor (`@capacitor/core`, `@capacitor/android`) synced with Android Studio.
   * **Backend:** Supabase (PostgreSQL, Supabase Auth, Row Level Security, Realtime channels).
   * **Distribution:** Companion APK Download Landing Page hosting the release `.apk`.
3. **Core Functional Pillars:**
   * **Dual 5-Tab Shell:** Dedicated screens for Student and Mentor roles.
   * **Direct Payment Integrity:** Student submits reference number; mentor verifies and confirms (or volunteer ₱0.00).
   * **In-App Messaging:** Real-time 1-on-1 chat threads with session shortcut cards.
   * **Virtual Classroom:** Dedicated in-app meeting environment (video streams, audio toggles, screen share, meeting notes).
   * **University Community Service Hours:** Automated server-side accreditation ledger with printable summaries.
4. **Defense-in-Depth & Data Integrity:**
   * 100% authorization via PostgreSQL Row Level Security (RLS) policies.
   * Public `anonKey` only; zero `service_role` exposure.

---

## 2. System Architecture Layers

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                   TIER 1: PRESENTATION & MOBILE SHELL                  │
  │  - React.js Mobile UI Views + Tailwind CSS v4 (Ocean Breeze Theme)     │
  │  - Dual 5-Tab Navigation (Student & Mentor Shells)                     │
  │  - Virtual Classroom Shell + In-App Messaging Interface                │
  │  - Companion APK Download Landing Page                                 │
  └──────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │                 TIER 2: CLIENT APPLICATION & STATE                     │
  │  - React Context (AuthContext, AppContext)                             │
  │  - Modular Service Layer (auth, session, tutor, message, report)       │
  │  - Supabase JS Client (JWT handling, real-time message subscriptions)  │
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
  │  - Supabase Auth (Email/Password, JWT Session Verification)            │
  │  - PostgreSQL with 100% Row Level Security (RLS)                       │
  │  - 11 Tables: profiles, tutor_profiles, tutor_subjects,                │
  │    tutor_availability, sessions, reviews, service_hour_logs,           │
  │    conversations, messages, support_tickets, notification_preferences  │
  │  - Automated DB Triggers (service hours, rating recalculation, chat)   │
  └────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Standard Directory Structure Blueprint

```
MentorLinks/
├── android/                    # Capacitor Android Studio native project
├── public/                     # Static assets, app icons, splash screens
├── src/
│   ├── assets/                 # Brand logos, illustrations, badge icons
│   ├── components/             # Reusable UI components
│   │   ├── chat/               # ChatThread, MessageBubble, ChatInputBar
│   │   ├── common/             # Button, Input, Modal, Badge, Toast, Card
│   │   ├── layout/             # MobileContainer, BottomNav, TopHeader
│   │   ├── meeting/            # VideoFeed, MeetingControls, MeetingChat, SessionNotesPad
│   │   └── tutor/              # TutorCard, SlotPicker, SubjectBadgeList, ReviewCard
│   ├── context/                # AuthContext, AppContext (dual-role switcher)
│   ├── pages/                  # Mobile screen views
│   │   ├── auth/               # LoginScreen, RegisterScreen, ForgotPasswordScreen
│   │   ├── student/            # StudentHomeScreen, ExploreScreen, TutorProfileScreen, BookSessionScreen
│   │   ├── mentor/             # MentorHomeScreen, StudentsRosterScreen, ManageScheduleScreen, ManageSubjectsScreen
│   │   ├── messages/           # MessagesScreen, ChatDetailScreen
│   │   ├── sessions/           # StudentSessionsScreen, MentorSessionsScreen, SessionDetailsScreen, VirtualClassroomScreen
│   │   └── profile/            # StudentProfileScreen, MentorProfileScreen, EditProfileScreen, HelpCenterScreen
│   ├── services/               # Supabase API services
│   │   ├── authService.js      # User credentials, profile & notification settings
│   │   ├── messageService.js   # Chat threads & real-time messaging
│   │   ├── reportService.js    # University service hours accreditation export
│   │   ├── reviewService.js    # Ratings & written peer reviews
│   │   ├── sessionService.js   # Bookings, payments, status transitions
│   │   ├── supabaseClient.js   # Public anonKey Supabase client
│   │   └── tutorService.js     # Mentor directory search, filters & availability
│   ├── utils/                  # Constants, date helpers, error formatters
│   ├── App.jsx                 # Route guards & 5-tab shell layout wrapper
│   ├── index.css               # Tailwind CSS directives & mobile tokens
│   └── main.jsx                # React root entry point
├── landing/                    # Companion APK Download Landing Page
│   └── index.html              # Showcase & APK direct download page
├── capacitor.config.json       # Capacitor configuration (appId: com.mentorlinks.app)
├── tailwind.config.js          # Tailwind CSS styling configuration
├── vite.config.js              # Vite build configuration (base: './')
└── package.json                # Project dependencies & scripts
```

---

## 4. Architectural Review & Implementation Workflow

Before proposing or executing code changes:

1. **Verify Mobile Ergonomics:** Ensure layouts fit mobile viewports ($360\text{px}$–$430\text{px}$), include `pb-24` clearance for the 5-tab bottom bar, and maintain $\ge 44\text{px}$ touch targets.
2. **Trace State & Data Flow:** Map student actions to mentor views and database mutations with proper RLS constraints.
3. **Maintain Modularity:** Keep Supabase queries isolated in the `src/services/` layer, separating business logic from UI components.
4. **Ensure Build & Packaging Integrity:** Any frontend changes must cleanly build via `npm run build` so Capacitor can sync to Android Studio with zero errors.
5. **Protect Community Hours Integrity:** Ensure service hour logs can only be credited when a session is explicitly marked as `completed` via database trigger.
