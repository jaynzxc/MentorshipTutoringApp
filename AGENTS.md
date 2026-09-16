# MentorLink — Mentorship & Tutoring Matching Application
# AI Agent Behavior Rules & Project Architecture Directives

## 1. Project Identity

**Application Title:** MentorLink — Mentorship & Tutoring Matching Mobile Application

MentorLink is a peer-to-peer mentorship and tutoring platform designed for high school and college students. The system allows students to find and book academic assistance from qualified peer tutors, schedule sessions, pay tutors directly, take post-session study notes, and enables peer mentors to earn income or accredit verifiable **University Community Service Hours**.

---

## 2. Technology Stack & Runtime Boundaries

* **Frontend:** React.js (functional components with Hooks) built via **Vite**.
* **Styling:** **Tailwind CSS** (mobile-first utilities, design system tokens).
* **Language:** Vanilla JavaScript (**ES6+ Modules**).
* **Mobile Runtime & Native Wrapper:** **Capacitor** (`@capacitor/core`, `@capacitor/android`) targeting **Android Studio**.
* **Backend & Database:** **Supabase** (PostgreSQL, Supabase Auth, Row Level Security, Realtime, Storage).
* **Distribution:** Standalone **Companion APK Download Landing Page** for direct mobile installation.
* **Prohibited Technologies:** Do NOT introduce PHP, MySQL, Laravel, Vue, Angular, jQuery, or complex state managers.

---

## 3. Core Principles & Scope Boundaries

1. **Pure Mobile Application Experience:**
   * The core application is engineered strictly for mobile screens ($360\text{px}$–$430\text{px}$) with native ergonomics (sticky bottom navigation, safe-area insets, $\ge 44\text{px}$ touch targets).
   * Packaged and compiled into a standalone Android APK via Capacitor and Android Studio.
2. **Simplified Economic Model (Direct Pay Only):**
   * Tutors set transparent hourly/session rates (or volunteer ₱0.00).
   * Students transfer payment directly (GCash, Maya, cash) and submit a reference number.
   * Tutors verify and confirm payment receipt.
   * **No Complex Token/Barter Systems:** Keep monetary tracking clear, transparent, and direct.
3. **Non-Monetary Incentive (Community Service Hours):**
   * Strictly focused on **University Community Service Hours Accreditation** for student mentors, generating verifiable service hour logs and printable summaries.
4. **No AI Wrappers or Premature Bloat:**
   * Keep matching and scheduling straightforward, intuitive, and human-centric.
5. **Security & RLS Defense-in-Depth:**
   * Enforce 100% Row Level Security (RLS) on all Supabase tables.
   * Never expose `service_role` keys in client code; use public `anonKey` only.

---

## 4. Mandatory Pre-Action Protocol

Before writing or modifying ANY code, you MUST:

### 4.1 Read Relevant Project Documentation
* Read [`docs/PRD.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/PRD.md) to understand WHAT the feature should do.
* Read [`docs/database_schema_design.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/database_schema_design.md) to understand the relational data model.
* Read [`docs/system_workflow.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/system_workflow.md) to trace cross-role data flows.
* Read [`docs/security.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/security.md) to understand mobile container and data protections.
* Read relevant skills in `.agent/skills/` to follow established design and backend contracts.

### 4.2 Inspect Existing Code
* Locate all files related to the target feature.
* Understand current implementation, component hierarchy, and callers.
* Note existing patterns (naming, folder layout, error handling).

### 4.3 Inspect Database & Schema
* Verify table structures match `database_schema_design.md`.
* Check existing indexes and foreign key constraints.
* If schema differs from documentation, **REPORT THE CONFLICT** rather than silently guessing.

### 4.4 Understand Dependencies
* Check `package.json` before proposing or importing new packages.
* Do not add new libraries without explicit technical justification and approval.

---

## 5. Planning & Change Size Principles

### 5.1 Universal Rule: ALWAYS Send an Implementation Plan Before Proceeding
* **NEVER jump straight into writing or modifying code without explicit alignment.**
* Before touching ANY source file, component, service, or schema, you MUST:
  1. Present a clear, structured **Implementation Plan**.
  2. Clearly list all affected files demarcated by `[NEW]`, `[MODIFY]`, or `[DELETE]`.
  3. Detail the exact component, data flow, and mobile viewport impacts.
  4. Explain how the changes will be tested and verified.
  5. **WAIT for explicit user approval before executing.**

### 5.2 Prefer Small, Surgical Changes
* **One feature or one bug fix per change set.**
* Modify only the files strictly necessary to implement the requested behavior.
* Never rewrite an entire working module for a localized change or bug fix.

### 5.3 Planning Protocol for Complex Changes
For any change involving:
* More than 2 files
* Database schema changes or migrations
* Authentication or role authorization logic
* New API service methods in `src/services/`
* Core business rule modifications (payments, booking transitions, service hour crediting)

Follow the phased roadmap protocol defined in `.agent/skills/planning/SKILL.md`.


---

## 6. Destructive Change Protocol

The following actions require **EXPLICIT user approval** before execution:
* Deleting data (users, sessions, reviews, logs).
* Dropping database tables or columns.
* Removing components, pages, or features.
* Modifying authentication logic or RLS policies.
* Modifying database constraints or triggers.

**When requesting approval, explain:**
1. What will be changed.
2. Why it is strictly necessary.
3. Impact on existing data and mobile app behavior.
4. Safe rollback plan.

---

## 7. Conflict Resolution Hierarchy

When code, documentation, or requirements appear to conflict, reconcile using this strict hierarchy:

1. **Actual Working Implementation** (PostgreSQL schema, working React components).
2. **Product Requirements Document** ([`docs/PRD.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/PRD.md)).
3. **Database Schema Design** ([`docs/database_schema_design.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/database_schema_design.md)).
4. **System Workflow** ([`docs/system_workflow.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/system_workflow.md)).
5. **Security Blueprint** ([`docs/security.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/security.md)).

**Never** silently pick whichever source was read last. Identify the discrepancy, explain the impact, and align with the user.

---

## 8. Coding Standards

### 8.1 React & JavaScript
* Use modern functional components with React Hooks.
* Use `const` and `let`; never `var`.
* Clean `async/await` handling with standardized `{ data, error }` returns.
* Separate UI rendering from Supabase data operations via the `src/services/` layer.
* Avoid prop drilling by utilizing React Context (`AuthContext`, `AppContext`).
* Never render unescaped user inputs with `dangerouslySetInnerHTML`; use standard safe JSX text rendering.

### 8.2 Tailwind CSS & Mobile UI
* Design mobile-first ($360\text{px}$–$430\text{px}$ viewport focus).
* Ensure interactive touch targets are $\ge 44 \times 44\text{px}$.
* Ensure all scrollable containers include bottom clearance padding (`pb-24`) so the fixed bottom navigation bar does not cover form buttons or list cards.
* Adhere to the color tokens and component anatomy defined in `.agent/skills/ui-ux_implementation/SKILL.md`.

### 8.3 Supabase & Database
* Use PostgreSQL through Supabase.
* Enforce 100% Row Level Security (RLS) on all tables.
* Never hardcode user IDs; rely on `auth.uid()` in RLS policies.
* Keep migration scripts idempotent (`CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`).
* Server-side triggers with `SECURITY DEFINER` for volunteer hours and rating recalculations.

### 8.4 Error Handling Standard
* All async service calls and Supabase queries MUST catch and handle errors cleanly:
  ```javascript
  try {
    const { data, error } = await supabase.from('...').select('...');
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('[Service Error]:', err.message);
    return { data: null, error: { message: err.message || 'An unexpected error occurred.' } };
  }
### 8.5 Human-Grade Engineering & Prevention of "AI Slop"
* **Write Human-Crafted, Deliberate Code:** Produce clean, readable, production-grade code that looks and functions like it was written by a senior human engineer. Avoid generic, repetitive, robotic "AI slop".
* **Zero Placeholders & Stubs:** NEVER leave lazy placeholders such as `// TODO: implement logic here`, `// add your code here`, `// ... rest of code`, or empty dummy functions. Every component, hook, and service method must be fully implemented, syntactically correct, and operational.
* **No Phantom or Hallucinated Dependencies:** Never import packages, icons, or modules that are not installed in `package.json`. Stick strictly to standard libraries and verified modules.
* **No Unnecessary Abstractions:** Keep logic lean and direct. Do not create convoluted factory patterns, unnecessary wrappers, or bloated helpers when a straightforward, clean React function suffices.
* **Semantic & Meaningful Naming:** Use clear, self-explanatory variable and function names that directly describe their purpose in the application.

---

## 9. Security, Secret Protection & Direct-Pay Integrity

* **Secret Protection:**
  * NEVER hardcode passwords, API keys, or private credentials.
  * NEVER package the Supabase `service_role` key in client code or inside the mobile APK.
  * Use public `anonKey` only.
* **Direct Payment State Machine:**
  * Students can only submit payment reference numbers (`payment_status = 'payment_submitted'`).
  * Students CANNOT confirm payments; only the assigned tutor (`auth.uid() = tutor_id`) can mark `payment_status = 'confirmed'`.
* **Community Service Hours Integrity:**
  * Volunteer hours cannot be directly inserted or modified by client apps.
  * Accreditations are committed strictly via server-side PostgreSQL triggers upon session completion (`status = 'completed'`).
* **Android Container Hardening:**
  * `android:usesCleartextTraffic="false"` in `AndroidManifest.xml` (TLS 1.3 / HTTPS only).
  * `android:debuggable="false"` in production APK release builds.

---

## 10. Verification, Testing & Build Validation

After implementing any feature or bug fix:
1. **Mobile Viewport Test:** Verify responsive behavior on standard mobile screen widths ($360\text{px}$–$430\text{px}$).
2. **Bottom Nav Spacing Check:** Confirm that no buttons or inputs are obscured by the bottom navigation bar.
3. **Cross-Role Check:** Verify that actions taken in Student mode correctly reflect in Tutor mode (and vice versa).
4. **Build Verification:** Run `npm run build` to verify clean compilation with zero lint or bundling errors so Capacitor can sync to Android Studio.

---

## 11. Git Commit Guidelines

When preparing code changes for version control:
* Use concise, structured commit messages in the format: `[Area] Brief description`
* Examples:
  * `[Auth] Add mobile login and session restoration`
  * `[Tutor] Add recurring availability slot picker`
  * `[Sessions] Implement direct payment reference submission`
  * `[ServiceHours] Add trigger for volunteer hours auto-credit`
  * `[Android] Configure Capacitor cleartext traffic rules`

---

## 12. Strict Prohibitions ("Never Do" List)

1. **NEVER generate "AI slop"** — no lazy placeholders (`// TODO`), incomplete stubs, dummy functions, or unrequested generic wrappers.
2. **NEVER write or modify code without presenting an implementation plan first** and waiting for explicit user approval.
3. **NEVER** add technologies, frameworks, or libraries "because they are popular" without explicit justification.
4. **NEVER** introduce PHP, MySQL, Docker, Kubernetes, Redis, or microservices into this React + Supabase stack.
5. **NEVER** bypass or weaken Row Level Security (RLS) policies for convenience.
6. **NEVER** expose the `service_role` key in frontend code, environment bundles, or git repositories.
7. **NEVER** assume database schema matches documentation — always verify with actual tables.
8. **NEVER** use `dangerouslySetInnerHTML` on user-submitted content.
9. **NEVER** leave temporary debug `console.log` clutter in production-bound files.
10. **NEVER** make destructive changes without explicit user approval.

---

## 13. Project Folder Structure Blueprint

```
MentorLink/
├── .agent/                             # AI Agent Skills & Workflow Directives
│   └── skills/                         # Domain skill cheat sheets (architecture, database, etc.)
├── android/                            # Capacitor Android Studio native project
│   ├── app/src/main/AndroidManifest.xml # Permissions, cleartextTraffic="false", orientation
│   └── app/src/main/assets/public/     # Synced compiled web assets from dist/
├── assets/                             # Global Static & Compiled Assets
│   ├── css/                            # Mobile stylesheets (input.css, output.css)
│   ├── images/                         # App graphics, avatars, illustrations
│   └── js/                             # Shared client scripts & runtime helpers
├── docs/                               # Project Architecture, Schemas & Documentation
│   ├── PRD.md                          # Product Requirements Document
│   ├── database_schema_design.md       # Relational database schema & data dictionary
│   ├── file_structure.md               # Definitive file placement plan
│   ├── security.md                     # Security architecture & mobile container hardening
│   ├── supabase_schema_setup.sql       # Executable idempotent PostgreSQL setup DDL
│   └── system_workflow.md              # End-to-end multi-role workflows & sequence diagrams
├── landing/                            # Companion APK Download Landing Page
│   ├── css/                            # Landing page styling
│   ├── images/                         # Showcase screenshots & app mockup graphics
│   └── index.html                      # Standalone APK showcase & direct download page
├── public/                             # Static Assets for Mobile Web App
│   ├── favicon.ico                     # Tab icon
│   ├── logo192.png                     # Standard app icon
│   ├── logo512.png                     # High-res app icon
│   └── splash.png                      # App launch screen graphic
├── src/                                # Core Application Source Code (React.js)
│   ├── assets/                         # Bundled assets (icons, illustrations, placeholders)
│   ├── components/                     # Reusable UI Components
│   │   ├── common/                     # Button, Input, Modal, Badge, Card, BottomSheet, Toast
│   │   ├── layout/                     # MobileContainer, BottomNav, TopHeader
│   │   └── tutor/                      # TutorCard, SlotPicker, SubjectBadgeList, ReviewCard
│   ├── context/                        # AuthContext, AppContext (dual-role switcher)
│   ├── pages/                          # Mobile Screen Views (Routed Pages)
│   │   ├── auth/                       # LoginScreen, RegisterScreen, ForgotPasswordScreen
│   │   ├── student/                    # HomeScreen, FindTutorScreen, TutorProfileScreen, BookSessionScreen
│   │   ├── tutor/                      # TutorDashboard, TutorSetupScreen, ManageScheduleScreen, ManageSubjectsScreen, ServiceHoursScreen, IncomingBookingsScreen
│   │   ├── sessions/                   # MySessionsScreen, SessionDetailsScreen, SessionNotesPad, RateSessionModal
│   │   └── profile/                    # ProfileScreen, EditProfileScreen
│   ├── services/                       # Supabase API Service Layer
│   │   ├── authService.js              # Auth & user profile helpers
│   │   ├── reportService.js            # Service hours summary generator & export
│   │   ├── reviewService.js            # Review submission & ratings queries
│   │   ├── sessionService.js           # Bookings, payments, session notes
│   │   ├── supabaseClient.js           # Supabase client initialization (anonKey)
│   │   └── tutorService.js             # Tutor directory, filters, availability slots
│   ├── utils/                          # Helper Functions (constants.js, dateUtils.js, formatters.js)
│   ├── App.jsx                         # Main Router, Route Guards & Shell Layout Wrapper
│   ├── index.css                       # Tailwind CSS directives & mobile tokens
│   └── main.jsx                        # React root entry point
├── capacitor.config.json               # Capacitor configuration (appId: com.mentorlink.app)
├── index.html                          # Root HTML container for Vite React mount
├── package.json                        # Project dependencies & build scripts
├── tailwind.config.js                  # Tailwind CSS configuration
└── vite.config.js                      # Vite build configuration (base: './')
```

