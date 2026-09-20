# MentorLinks — Project File Structure Plan

**Project Title:** MentorLinks — Mentorship & Tutoring Matching Mobile Application  
**Tagline:** *"Connect. Learn. Grow."*  
**Document Purpose:** Definitive directory and file organization blueprint for the entire codebase.  
**Tech Stack:** React.js (Vite), Tailwind CSS v4 (Ocean Breeze Theme), Vanilla JavaScript (ES6+), Capacitor (`@capacitor/android`), Supabase PostgreSQL, Android Studio  
**Target Location:** `docs/file_structure.md`  

---

## 1. Master Directory Tree

```
MentorLinks/
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
│   │   ├── input.css                   # Tailwind CSS v4 input directives & Ocean Breeze tokens
│   │   └── output.css                  # Compiled minified Tailwind CSS output
│   ├── images/                         # App screenshots, logos, avatars, illustrations
│   └── js/                             # Shared client scripts, runtime helpers & modules
│
├── docs/                               # Project Architecture, Schemas & Documentation (17 Files)
│   ├── PRD.md                          # Product Requirements Document (MentorLinks)
│   ├── android_build_guide.md          # Capacitor sync & Android Studio APK compilation guide
│   ├── browser_mobile_preview_guide.md # Mobile viewport testing & browser emulation instructions
│   ├── database_schema_design.md       # Relational schema, data dictionary, foreign keys & triggers
│   ├── env.example                     # Environment variable template for Supabase credentials
│   ├── error_handling_and_toasts.md    # Standardized try/catch patterns & mobile toast notifications
│   ├── file_structure.md               # This definitive directory and file placement specification
│   ├── key_features.md                 # Complete screen-by-screen feature blueprint & capabilities
│   ├── mentor_flow_spec.md             # Dedicated Mentor role 5-tab modular flow specification
│   ├── mobile_contents_guide.md        # Master UI content preview, wireframe copy & screen flow guide
│   ├── security.md                     # Mobile security architecture, TLS 1.3 & RLS defense ledger
│   ├── service_hours_certificate_spec.md # University Community Service Hours accreditation spec
│   ├── Skills.md                       # Comprehensive guide to project AI skills & commands
│   ├── student_flow_spec.md            # Dedicated Student role 5-tab modular flow specification
│   ├── supabase_schema_setup.sql       # Executable idempotent PostgreSQL setup DDL (11 tables)
│   ├── system_flowchart.md             # Visual Mermaid sequence diagrams & state flowcharts
│   └── system_workflow.md              # End-to-end multi-role workflows & business rule sequences
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
│   ├── assets/                         # Bundled assets (imported inside React components)
│   │   ├── icons/                      # Clean vector SVGs (strictly NO raw emojis in UI code)
│   │   └── images/                     # Illustrated empty states, banners & placeholder avatars
│   │
│   ├── components/                     # Modular Reusable React UI Components
│   │   ├── common/                     # Generic design system components
│   │   │   ├── Badge.jsx               # Status pills (Pending, Confirmed, Completed, etc.)
│   │   │   ├── BottomSheet.jsx         # Mobile slide-up drawer for modals & options
│   │   │   ├── Button.jsx              # Mobile touch-friendly button (>=44px, loading spinner)
│   │   │   ├── Card.jsx                # Standard rounded-2xl content card container
│   │   │   ├── EmptyState.jsx          # Illustrated placeholder when data is empty
│   │   │   ├── Input.jsx               # Validated mobile text input with clear actions
│   │   │   ├── LoadingSkeleton.jsx     # Animated pulse placeholder cards for loading states
│   │   │   ├── Modal.jsx               # Centered popup dialog with backdrop blur
│   │   │   ├── ProtectedRoute.jsx      # Screen guard checking active Supabase session
│   │   │   └── Toast.jsx               # Auto-dismissing mobile notification toast
│   │   │
│   │   ├── layout/                     # Application Shell & Structural Wrappers
│   │   │   ├── StudentBottomNav.jsx    # Student 5-tab bar (Home, Explore, Messages, Sessions, Profile)
│   │   │   ├── MentorBottomNav.jsx     # Mentor 5-tab bar (Home, Students, Messages, Sessions, Profile)
│   │   │   ├── MobileContainer.jsx     # Viewport wrapper enforcing max-w-md, overflow & pb-24
│   │   │   └── TopHeader.jsx           # Mobile top bar with screen title, back button & notifications
│   │   │
│   │   ├── messaging/                  # Real-Time Chat Components
│   │   │   ├── ChatBubble.jsx          # Sent / Received message bubble
│   │   │   ├── ConversationItem.jsx    # Chat list card with unread indicator
│   │   │   ├── ChatInputBar.jsx        # Mobile text input with attachment & send buttons
│   │   │   └── SessionShortcutCard.jsx # Embedded upcoming session card inside chat
│   │   │
│   │   ├── meeting/                    # Virtual Classroom Components
│   │   │   ├── MeetingControls.jsx     # Mic, Camera, Chat, Screen share, Leave controls bar (SVG)
│   │   │   ├── VideoFeed.jsx           # Main video and picture-in-picture self video feed
│   │   │   ├── SessionChatPanel.jsx    # Slide-up live session chat drawer
│   │   │   └── SessionNotesPad.jsx     # Shared collaborative session notes drawer
│   │   │
│   │   └── tutor/                      # Tutor & Mentor Specific Components
│   │       ├── ReviewCard.jsx          # 1-5 star review display card with timestamp (SVG stars)
│   │       ├── SlotPicker.jsx          # Day selector chips & time slot selection grid
│   │       ├── SubjectBadgeList.jsx    # Horizontal scrolling subject chips
│   │       └── TutorCard.jsx           # Directory card (Avatar, name, rating, subjects, rate tag)
│   │
│   ├── context/                        # React Global Context Providers
│   │   ├── AppContext.jsx              # Active filters, navigation state & UI toasts
│   │   └── AuthContext.jsx             # Supabase user session, active profile & dual-role switcher
│   │
│   ├── pages/                          # Mobile Screen Views (Routed Pages)
│   │   ├── auth/                       # Authentication Views
│   │   │   ├── ForgotPasswordScreen.jsx# Password recovery screen
│   │   │   ├── LoginScreen.jsx         # Email & password login screen
│   │   │   └── RegisterScreen.jsx      # User signup & role selection (Student vs Mentor)
│   │   │
│   │   ├── student/                    # Student (Learner) Views (5-Tab & Sub-flows)
│   │   │   ├── HomeScreen.jsx          # Tab 1: Dashboard with countdown & quick actions
│   │   │   ├── ExploreScreen.jsx       # Tab 2: Mentor search, category chips & filters
│   │   │   ├── MessagesScreen.jsx      # Tab 3: Conversation list & search
│   │   │   ├── SessionsScreen.jsx      # Tab 4: Tabbed sessions (Upcoming | Completed)
│   │   │   ├── ProfileScreen.jsx       # Tab 5: Account overview & navigation menu
│   │   │   ├── StudentProfileSetup.jsx # Onboarding profile setup & learning interests
│   │   │   ├── MentorProfileScreen.jsx # Full mentor profile, reviews & booking action
│   │   │   ├── BookSessionScreen.jsx   # Booking Screen 1: Select date, time slot, duration, topic
│   │   │   ├── ReviewBookingScreen.jsx # Booking Screen 2: Review & confirm booking request
│   │   │   ├── PendingSessionScreen.jsx# Pending request status card & next steps
│   │   │   ├── ConfirmedSessionScreen.jsx # Confirmed session & meeting preparation
│   │   │   ├── VirtualClassroomScreen.jsx # In-app live meeting room with video & notes
│   │   │   ├── SessionCompletedScreen.jsx # Post-session summary & rating modal trigger
│   │   │   ├── LearningProgressScreen.jsx # Progress overview, hours & skill progress bars
│   │   │   ├── PersonalInfoScreen.jsx  # Student personal & academic profile details
│   │   │   ├── NotificationSettingsScreen.jsx # Push & email notification toggles
│   │   │   ├── PrivacySecurityScreen.jsx # Password, 2FA, login activity & delete account
│   │   │   └── ChatConversationScreen.jsx # Direct 1-on-1 chat thread with mentor
│   │   │
│   │   ├── mentor/                     # Mentor Views (5-Tab & Sub-flows)
│   │   │   ├── MentorDashboard.jsx     # Tab 1: Overview metrics, requests & quick actions
│   │   │   ├── MyStudentsScreen.jsx    # Tab 2: Students directory & mentoring history
│   │   │   ├── MentorMessagesScreen.jsx# Tab 3: Student conversation list
│   │   │   ├── MentorSessionsScreen.jsx# Tab 4: Tabbed sessions (Requests | Upcoming | Completed)
│   │   │   ├── MentorProfileScreen.jsx # Tab 5: Mentor profile & settings menu
│   │   │   ├── MentorSetupScreen.jsx   # Mentor onboarding wizard & credentials setup
│   │   │   ├── StudentProfilePreview.jsx # Detailed student learning profile view
│   │   │   ├── MentorChatScreen.jsx    # Direct 1-on-1 chat with student
│   │   │   ├── AvailabilityScreen.jsx  # Recurring weekly schedule, timeslots & booking toggle
│   │   │   ├── MentorNotificationsScreen.jsx # Notification preferences toggles
│   │   │   └── MentorSecurityScreen.jsx# Password, 2FA, profile privacy & delete account
│   │   │
│   │   ├── sessions/                   # Dedicated Session Management & Meeting Views
│   │   │   ├── SessionDetailsScreen.jsx# Session details & cancellation/acceptance
│   │   │   ├── VirtualClassroomScreen.jsx # Live video room with controls & session chat
│   │   │   ├── SessionCompletedScreen.jsx # Post-session summary & study notes review
│   │   │   └── RateSessionModal.jsx    # 5-star rating & review submission dialog
│   │   │
│   │   └── common/                     # Shared Institutional Views
│   │       ├── FAQsScreen.jsx          # Categorized frequently asked questions
│   │       ├── HelpSupportScreen.jsx   # Help center & support ticket contact form
│   │       ├── TermsScreen.jsx         # Terms & Conditions view
│   │       ├── PrivacyScreen.jsx       # Privacy Policy view
│   │       └── AboutScreen.jsx         # About MentorLinks view (Version 1.0.0)
│   │
│   ├── services/                       # Supabase API & Backend Service Layer
│   │   ├── authService.js              # Signup, login, logout, profile queries
│   │   ├── messageService.js           # Real-time conversations & message threads
│   │   ├── reportService.js            # Service hours summary generator & certificate
│   │   ├── reviewService.js            # Submit review, fetch mentor ratings
│   │   ├── sessionService.js           # Bookings CRUD, accept/decline, notes
│   │   ├── supabaseClient.js           # Supabase JS client initialized with anonKey
│   │   └── tutorService.js             # Mentor directory queries, search filters, availability
│   │
│   ├── utils/                          # Helper Functions & Formatters
│   │   ├── constants.js                # Categories, skills, status enums
│   │   ├── dateUtils.js                # Date/time formatters, slot helpers
│   │   └── formatters.js               # Philippine Peso (₱) formatter, name formatters
│   │
│   ├── App.jsx                         # Main Router, Role Shell Switcher & Layout Wrapper
│   ├── index.css                       # Tailwind CSS directives, safe-area utilities & Ocean Breeze tokens
│   └── main.jsx                        # React root mount point (DOM render)
│
├── .gitignore                          # Git exclusions (node_modules, .env, dist, android/app/build)
├── AGENTS.md                           # Master AI behavior rules, architecture & coding standards
├── capacitor.config.json               # Capacitor configuration (appId: com.mentorlinks.app)
├── index.html                          # Root HTML container for Vite React mount
├── package.json                        # NPM project dependencies, scripts & metadata
├── tailwind.config.js                  # Tailwind CSS theme, colors, animations & content paths
└── vite.config.js                      # Vite build configuration (base: './' for Capacitor)
```

---

## 2. Directory Responsibility & Ownership Matrix

| Directory Path | Architectural Layer | Primary Responsibility | Allowed Technologies / Files |
| :--- | :--- | :--- | :--- |
| `src/assets/icons/` | Presentation (Assets) | Vector SVG icon components (strictly NO raw emojis in code). | React (`.jsx`), SVG |
| `src/components/common/` | Presentation (UI) | Generic, reusable UI atoms (buttons, badges, inputs, skeletons). | React (`.jsx`), Tailwind CSS |
| `src/components/layout/` | Shell (Ergonomics) | Viewport container, sticky top bar, persistent 5-tab bottom nav. | React (`.jsx`), Tailwind CSS |
| `src/components/messaging/` | Presentation (Domain) | Real-time chat bubbles, conversation items, session shortcuts. | React (`.jsx`), Tailwind CSS |
| `src/components/meeting/` | Presentation (Domain) | Virtual classroom feeds, video PiP, meeting toolbar, notes pad. | React (`.jsx`), Tailwind CSS |
| `src/components/tutor/` | Presentation (Domain) | Tutor cards, slot pickers, subject chips, review cards. | React (`.jsx`), Tailwind CSS |
| `src/context/` | State Management | Global authentication state, profile caching, dual-role switcher. | React Context, Hooks |
| `src/pages/auth/` | Views (Routing) | User sign in, registration, and password recovery screens. | React (`.jsx`), Auth Context |
| `src/pages/student/` | Views (Routing) | Student home, discovery, booking flow, chat, and settings. | React (`.jsx`), Student Services |
| `src/pages/mentor/` | Views (Routing) | Mentor home, student roster, schedule availability, and settings. | React (`.jsx`), Tutor Services |
| `src/pages/sessions/` | Views (Routing) | Session details, virtual classroom, and post-session review. | React (`.jsx`), Session Services |
| `src/pages/common/` | Views (Routing) | Institutional screens (FAQs, Help, Terms, Privacy, About). | React (`.jsx`), Static copy |
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
     * Student browsing / booking / learning $\rightarrow$ `src/pages/student/` (refer to [`docs/student_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/student_flow_spec.md))
     * Mentor management / schedule / roster $\rightarrow$ `src/pages/mentor/` (refer to [`docs/mentor_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/mentor_flow_spec.md))
     * Meeting & Classroom room $\rightarrow$ `src/pages/sessions/`
     * Shared institutional views (FAQs, About, Terms) $\rightarrow$ `src/pages/common/`
     * Authentication $\rightarrow$ `src/pages/auth/`
3. **Where do I put icons for buttons, headers, or status badges?**
   * Put clean, scalable vector SVGs in `src/assets/icons/` or use Font Awesome components.
   * **Rule:** NEVER render raw Unicode emojis (`🏠`, `🔍`, `💬`, `📅`, `👤`, `⭐`) as UI icons in React component implementation.
4. **Where do I write Supabase database queries or mutations?**
   * Put it in `src/services/` (e.g., `tutorService.js`, `sessionService.js`).
   * **Rule:** Never call `supabase.from(...)` directly inside a React component.
5. **Where do I put date, time, or currency formatting functions?**
   * Put it in `src/utils/dateUtils.js` or `src/utils/formatters.js`.
6. **Where do I put global state (like active user or student/mentor mode)?**
   * Put it in `src/context/AuthContext.jsx` or `src/context/AppContext.jsx`.
7. **Where do I put static assets (app logo, splash screens, empty state vectors)?**
   * Reusable UI icons/illustrations $\rightarrow$ `src/assets/`
   * Native app icons & splash images $\rightarrow$ `public/` and `android/app/src/main/res/`
8. **Where do I configure Android permissions or cleartext traffic?**
   * `android/app/src/main/AndroidManifest.xml` (Ensure `android:usesCleartextTraffic="false"`).

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
[Standalone MentorLinks.apk Generated]
         │
         ▼ Host on Landing Page
[Users tap "Download APK" on landing/index.html]
```
