# MentorLink — Project File Structure Plan

**Project Title:** MentorLink — Mentorship & Tutoring Matching Mobile Application  
**Document Purpose:** Definitive directory and file organization blueprint for the entire codebase.  
**Tech Stack:** React.js (Vite), Tailwind CSS, Capacitor (`@capacitor/android`), Supabase PostgreSQL, Android Studio  
**Target Location:** `docs/file_structure.md`  

---

## 1. Master Directory Tree

```
MentorLink/
├── .agent/                             # AI Agent Skills & Workflow Directives
│   └── skills/                         # Specialized domain skill cheat sheets
│       ├── architecture/               # System architecture & mobile layer guidelines
│       ├── database/                   # Supabase PostgreSQL schema, triggers & RLS rules
│       ├── debugging/                  # Diagnostic steps for React, Tailwind & Capacitor
│       ├── documentation/              # Capstone and academic technical writing standards
│       ├── planning/                   # 6-step planning workflow for features & fixes
│       ├── rbac/                       # Role-based access control & screen guard rules
│       ├── security/                   # Mobile container hardening & data protections
│       ├── system-flow/                # Cross-role flows & end-to-end lifecycles
│       ├── ui-ux_backend_spec/         # API contracts, payloads & UI states for screens
│       └── ui-ux_implementation/       # Mobile-first design system & design tokens
│
├── android/                            # Native Android Studio Project (Capacitor Bridge)
│   ├── app/
│   │   ├── build.gradle                # Android app build configuration & dependencies
│   │   └── src/
│   │       └── main/
│   │           ├── AndroidManifest.xml # Permissions, cleartextTraffic="false", orientation
│   │           ├── assets/public/      # Auto-synced compiled web assets from dist/
│   │           ├── java/               # Native MainActivity.java Capacitor entry point
│   │           └── res/                # Native app icons (mipmap), splash screens & XML values
│   ├── build.gradle                    # Project-level Gradle build configuration
│   └── capacitor.settings.gradle       # Capacitor auto-generated settings
│
├── assets/                             # Global Static & Compiled Assets
│   ├── css/                            # Mobile stylesheets
│   │   ├── input.css                   # Tailwind CSS v4 input directives & mobile design tokens
│   │   └── output.css                  # Compiled minified Tailwind CSS output
│   ├── images/                         # App screenshots, logos, avatars, illustrations
│   └── js/                             # Shared client scripts, runtime helpers & modules
│
├── docs/                               # Project Architecture, Schemas & Documentation
│   ├── Agent.md                        # Reference AI behavior rules
│   ├── PRD.md                          # Product Requirements Document
│   ├── database_schema_design.md       # 7-table schema, data dictionary & trigger definitions
│   ├── file_structure.md               # This directory and file placement specification
│   ├── security.md                     # Mobile security architecture & RLS defense ledger
│   ├── supabase_schema_setup.sql       # Executable idempotent PostgreSQL setup DDL
│   └── system_workflow.md              # End-to-end multi-role workflows & sequence diagrams
│
├── landing/                            # Companion APK Download Landing Page
│   ├── css/                            # Lightweight landing page styling (or Tailwind CDN)
│   ├── images/                         # Showcase screenshots, mockup frames & app logo
│   └── index.html                      # Standalone mobile showcase & direct APK download page
│
├── public/                             # Static Assets for Mobile Web App
│   ├── favicon.ico                     # Browser/tab icon
│   ├── logo192.png                     # Standard app icon
│   ├── logo512.png                     # High-res app icon
│   └── splash.png                      # App launch screen graphic
│
├── src/                                # Core Application Source Code (React.js)
│   ├── assets/                         # Bundled assets (imported inside React code)
│   │   ├── icons/                      # Custom SVGs & brand icons
│   │   └── images/                     # Illustrated empty states, banners & placeholder avatars
│   │
│   ├── components/                     # Modular Reusable React UI Components
│   │   ├── common/                     # Generic design system components
│   │   │   ├── Badge.jsx               # Status pills (Pending, Confirmed, Completed, etc.)
│   │   │   ├── BottomSheet.jsx         # Mobile slide-up drawer for modals & options
│   │   │   ├── Button.jsx              # Mobile touch-friendly button (>=44px, loading spinner)
│   │   │   ├── Card.jsx                # Standard rounded-2xl content card container
│   │   │   ├── EmptyState.jsx          # Illustrated placeholder when data is empty
│   │   │   ├── Input.jsx               # Floating label / validated mobile text input
│   │   │   ├── LoadingSkeleton.jsx     # Animated pulse placeholder cards for loading states
│   │   │   ├── Modal.jsx               # Centered popup dialog with backdrop blur
│   │   │   ├── ProtectedRoute.jsx      # Screen guard checking active Supabase session
│   │   │   └── Toast.jsx               # Auto-dismissing mobile notification toast
│   │   │
│   │   ├── layout/                     # Application Shell & Structural Wrappers
│   │   │   ├── BottomNav.jsx           # Fixed bottom navigation bar (Home, Search, Sessions, Profile)
│   │   │   ├── MobileContainer.jsx     # Viewport wrapper enforcing max-w-md, overflow & pb-24
│   │   │   └── TopHeader.jsx           # Mobile top bar with screen title, back button & mode switch
│   │   │
│   │   └── tutor/                      # Tutor-Specific Reusable Components
│   │       ├── ReviewCard.jsx          # 1-5 star review display card with timestamp
│   │       ├── SlotPicker.jsx          # Day selector chips & time slot selection grid
│   │       ├── SubjectBadgeList.jsx    # Horizontal scrolling subject chips
│   │       └── TutorCard.jsx           # Directory card (Avatar, name, rating, subjects, rate tag)
│   │
│   ├── context/                        # React Global Context Providers
│   │   ├── AppContext.jsx              # Mode switcher (Learner ↔ Mentor), active filters & UI toasts
│   │   └── AuthContext.jsx             # Supabase user session, active profile, login/logout methods
│   │
│   ├── pages/                          # Mobile Screen Views (Routed Pages)
│   │   ├── auth/                       # Authentication Views
│   │   │   ├── ForgotPasswordScreen.jsx # Password recovery screen
│   │   │   ├── LoginScreen.jsx         # Email & password login screen
│   │   │   └── RegisterScreen.jsx      # User signup & basic profile creation
│   │   │
│   │   ├── student/                    # Student (Learner) Views
│   │   │   ├── BookSessionScreen.jsx   # Select slot, enter topic, choose meeting type
│   │   │   ├── FindTutorScreen.jsx     # Search bar, subject filters, price slider & tutor feed
│   │   │   ├── HomeScreen.jsx          # Dashboard with upcoming session countdown & quick search
│   │   │   └── TutorProfileScreen.jsx  # Full mentor bio, credentials, reviews & booking action
│   │   │
│   │   ├── tutor/                      # Peer Tutor (Mentor) Views
│   │   │   ├── IncomingBookingsScreen.jsx # Review booking requests & verify payment reference #
│   │   │   ├── ManageScheduleScreen.jsx # Recurring weekly availability slot manager
│   │   │   ├── ManageSubjectsScreen.jsx # Add/edit qualified subjects & grade levels
│   │   │   ├── ServiceHoursScreen.jsx  # View total accredited hours & export summary document
│   │   │   ├── TutorDashboard.jsx      # Mentor overview (earnings, hours, active students)
│   │   │   └── TutorSetupScreen.jsx    # Onboarding form to activate Mentor Mode
│   │   │
│   │   ├── sessions/                   # Session Management & Interaction Views
│   │   │   ├── MySessionsScreen.jsx    # Tabbed list (Upcoming, Pending, Completed, Cancelled)
│   │   │   ├── RateSessionModal.jsx    # 5-star rating & feedback submission modal
│   │   │   ├── SessionDetailsScreen.jsx# Meeting link/location, payment status & study notes
│   │   │   └── SessionNotesPad.jsx     # Tutor post-session notes and study pointer editor
│   │   │
│   │   └── profile/                    # User Profile Views
│   │       ├── EditProfileScreen.jsx   # Edit bio, school name, avatar & grade level
│   │       └── ProfileScreen.jsx       # User overview, mode toggle, app settings & logout
│   │
│   ├── services/                       # Supabase API & Backend Service Layer
│   │   ├── authService.js              # Signup, login, logout, password reset, profile queries
│   │   ├── reportService.js            # Service hours summary generator & print-friendly export
│   │   ├── reviewService.js            # Submit review, fetch tutor reviews, average calculation
│   │   ├── sessionService.js           # Bookings CRUD, submit payment ref, confirm payment, notes
│   │   ├── supabaseClient.js           # Supabase JS client initialized with anonKey
│   │   └── tutorService.js             # Tutor directory queries, search filters, availability slots
│   │
│   ├── utils/                          # Helper Functions & Formatters
│   │   ├── constants.js                # Subject categories, grade levels, status enums
│   │   ├── dateUtils.js                # Date/time formatters, slot helpers, day name resolvers
│   │   └── formatters.js               # Philippine Peso (₱) formatter, name shorteners
│   │
│   ├── App.jsx                         # Main Router, Route Guards & Shell Layout Wrapper
│   ├── index.css                       # Tailwind CSS directives, safe-area utilities & font imports
│   └── main.jsx                        # React root mount point (DOM render)
│
├── .gitignore                          # Git exclusions (node_modules, .env, dist, android/app/build)
├── AGENTS.md                           # Master AI behavior rules, architecture & coding standards
├── capacitor.config.json               # Capacitor configuration (appId: com.mentorlink.app)
├── index.html                          # Root HTML container for Vite React mount
├── package.json                        # NPM project dependencies, scripts & metadata
├── tailwind.config.js                  # Tailwind CSS theme, colors, animations & content paths
└── vite.config.js                      # Vite build configuration (base: './' for Capacitor)
```

---

## 2. Directory Responsibility & Ownership Matrix

| Directory Path | Architectural Layer | Primary Responsibility | Allowed Technologies / Files |
| :--- | :--- | :--- | :--- |
| `src/components/common/` | Presentation (UI) | Generic, reusable UI atoms (buttons, badges, inputs, skeletons). | React (`.jsx`), Tailwind CSS |
| `src/components/layout/` | Shell (Ergonomics) | Viewport container, sticky top bar, persistent bottom nav. | React (`.jsx`), Tailwind CSS |
| `src/components/tutor/` | Presentation (Domain) | Tutor cards, slot pickers, subject chips, review cards. | React (`.jsx`), Tailwind CSS |
| `src/context/` | State Management | Global authentication state and dual-role mode switching. | React Context, Hooks |
| `src/pages/auth/` | Views (Routing) | User sign in, registration, and password recovery screens. | React (`.jsx`), Auth Context |
| `src/pages/student/` | Views (Routing) | Tutor search, discovery, mentor profile, and booking screens. | React (`.jsx`), Tutor Services |
| `src/pages/tutor/` | Views (Routing) | Mentor dashboard, schedule manager, and service hours ledger. | React (`.jsx`), Session Services |
| `src/pages/sessions/` | Views (Routing) | Tabbed session lists, meeting links, notes pad, and review dialogs. | React (`.jsx`), Session Services |
| `src/pages/profile/` | Views (Routing) | Profile view, profile editing, and mode switcher toggle. | React (`.jsx`), Auth Context |
| `src/services/` | Backend Integration | Supabase queries, mutations, real-time listeners, and auth calls. | JavaScript (`.js`), Supabase SDK |
| `src/utils/` | Shared Utilities | Currency formatting (`₱`), date/time parsers, and enum constants. | Vanilla JavaScript (`.js`) |
| `android/` | Native Mobile | Capacitor Android Studio project for compiling `.apk`. | Java, Gradle, XML |
| `assets/css/` | Presentation (Styles) | Tailwind CSS source input (`input.css`) & compiled output (`output.css`). | CSS (`.css`) |
| `assets/images/` | Static Assets | App showcase graphics, empty-state illustrations, avatars. | PNG, SVG, WebP, JPG |
| `assets/js/` | Runtime Scripts | Client-side standalone utilities & runtime scripts. | JavaScript (`.js`) |
| `landing/` | App Distribution | Standalone webpage showcasing features and hosting APK download. | HTML5, Tailwind, JS |
| `docs/` | System Documentation | PRD, schema specifications, workflows, security, and setup scripts. | Markdown (`.md`), SQL (`.sql`) |
| `.agent/skills/` | AI Guidance | Standardized workflows and domain directives for pair programming. | Markdown (`.md`) |

---

## 3. Strict Developer Placement Rules ("Where Does X Belong?")

To maintain architectural hygiene and prevent file clutter, follow these rules:

1. **Where do I put a new button, badge, or modal?**
   * Put it in `src/components/common/`. Never write ad-hoc modal code inline inside pages.
2. **Where do I add a new screen or route?**
   * Put it in the appropriate subfolder inside `src/pages/`:
     * Student browsing / booking $\rightarrow$ `src/pages/student/`
     * Tutor management / schedule $\rightarrow$ `src/pages/tutor/`
     * Session lifecycle & notes $\rightarrow$ `src/pages/sessions/`
     * Authentication $\rightarrow$ `src/pages/auth/`
3. **Where do I write Supabase database queries or mutations?**
   * Put it in `src/services/` (e.g., `tutorService.js`, `sessionService.js`).
   * **Rule:** Never call `supabase.from(...)` directly inside a React component.
4. **Where do I put date, time, or currency formatting functions?**
   * Put it in `src/utils/dateUtils.js` or `src/utils/formatters.js`.
5. **Where do I put global state (like active user or student/tutor mode)?**
   * Put it in `src/context/AuthContext.jsx` or `src/context/AppContext.jsx`.
6. **Where do I put static assets (app logo, splash screens, empty state vectors)?**
   * Reusable UI icons/illustrations $\rightarrow$ `src/assets/`
   * Native app icons & splash images $\rightarrow$ `public/` and `android/app/src/main/res/`
7. **Where do I configure Android permissions or cleartext traffic?**
   * `android/app/src/main/AndroidManifest.xml`

---

## 4. Build & Distribution Flow

```
[Development in src/]
         │
         ▼ npm run build
[Compiled Web Assets in dist/]
         │
         ▼ npx cap sync android
[Copied into android/app/src/main/assets/public/]
         │
         ▼ Build APK in Android Studio
[Standalone MentorLink.apk Generated]
         │
         ▼ Host on Landing Page
[Users tap "Download APK" on landing/index.html]
```
