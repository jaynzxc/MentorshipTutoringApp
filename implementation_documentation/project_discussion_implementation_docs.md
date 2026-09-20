# MentorLinks — Technical Implementation & Project Discussion Documentation

> [!NOTE]
> **Architecture Update Notice (September 20, 2026):**  
> This initial discussion documentation has been superseded by the complete, release-synchronized implementation document: [`system_changes_and_implementation_docs.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/implementation_documentation/system_changes_and_implementation_docs.md), which includes the divided role specifications (`student_flow_spec.md`, `mentor_flow_spec.md`), the 42-screen layout from `mobile_contents_guide.md`, in-app messaging, virtual classroom, and the vector iconography standards.

**Project Title:** MentorLinks — Mentorship & Tutoring Matching Mobile Application  
**Tagline:** *"Connect. Learn. Grow."*  
**Target Audience:** High School and College Students  
**Runtime Environment:** Standalone Android APK (via Capacitor & Android Studio) + Companion APK Download Website  
**Technology Stack:** React.js (Vite), Tailwind CSS v4, Vanilla JavaScript (ES6+), Capacitor (`@capacitor/android`), Supabase (PostgreSQL, Auth, RLS, Storage, Realtime)  
**Target Location:** `implementation_documentation/project_discussion_implementation_docs.md`  
**Version:** 1.0 (Historical Baseline)  
**Date:** September 17, 2026 (Updated September 20, 2026)  

---

## 1. Executive Summary & Project Identity

MentorLinks is a peer-to-peer (P2P) academic mentorship and tutoring mobile application tailored for high school and college students. The platform bridges the gap between students needing academic support and qualified student mentors who want to earn income or accredit verifiable **University Community Service Hours**.

### 1.1 Core Principles & Non-Negotiable Boundaries
1. **Pure Mobile Application Experience:**
   * Engineered strictly for mobile viewports ($360\text{px}$–$430\text{px}$) with native ergonomics: fixed bottom navigation bar, safe-area padding for notched screens, sticky top app bar, and minimum $44 \times 44\text{px}$ touch targets.
   * Compiles into a standalone Android APK via Capacitor and Android Studio.
2. **Simplified Economic Model (Direct Pay Only):**
   * Transparent direct payments via GCash, Maya, or cash.
   * Students submit payment reference numbers; tutors verify receipt in their mobile payment app and confirm.
   * **Zero Token / Barter Bloat:** Avoids unnecessary in-app wallets, points, or barter tokens.
3. **Non-Monetary Incentive (University Community Service Hours):**
   * Tutors volunteering at ₱0/hr earn accredited university service hours.
   * Official service hours summaries and printable certificates with anti-counterfeit verification codes can be submitted directly to school guidance or community extension offices.
4. **No AI Wrappers & Human-Grade Engineering:**
   * Direct, human-centric peer matching.
   * Zero lazy stubs, no `// TODO: implement later` placeholders, and strict pre-action implementation planning before touching code.

---

## 2. Master System Architecture & Directory Roles

During our technical discussions, the relationship between static files, active source code, and compiled release packages was established:

```
MentorLink/
├── assets/                     # 1. STATIC FILES (Images, CSS, Logos, Client Scripts)
│   ├── css/
│   │   ├── input.css           # Tailwind CSS v4 source directives & mobile design tokens
│   │   └── output.css          # Auto-generated minified Tailwind CSS output
│   ├── images/                 # Showcase screenshots, mockup frames, avatar placeholders
│   └── js/                     # Shared client scripts & runtime helpers
│
├── src/                        # 2. SOURCE CODE (Active React Development)
│   ├── components/             # Reusable UI atoms (common), layout shell, and tutor domain cards
│   ├── context/                # Global state (AuthContext, AppContext)
│   ├── pages/                  # Routed mobile screen views (auth, student, tutor, sessions, profile)
│   ├── services/               # Supabase API integration layer (auth, session, tutor, review, report)
│   ├── utils/                  # Date formatters, currency helpers, and error translators
│   ├── App.jsx                 # Main application root with dual-role switcher
│   └── main.jsx                # React 18+ DOM mount entry point
│
├── dist/                       # 3. COMPILED BUNDLE (What Capacitor packages into the APK)
│   ├── assets/                 # Minified JS and CSS chunks with relative paths (./)
│   └── index.html              # Processed root HTML container
│
├── docs/                       # 4. ARCHITECTURE & SPECIFICATIONS SUITE
├── android/                    # 5. NATIVE ANDROID STUDIO PROJECT (Capacitor Container)
└── landing/                    # 6. COMPANION APK DOWNLOAD LANDING PAGE
```

### 2.1 Role Distinction: `assets/` vs `src/` vs `dist/`
* **`assets/` (Static Resources):** Where raw styles (`input.css`), brand images, and unbundled static media reside.
* **`src/` (Source Code):** Where developers write React JSX components, pages, and Supabase service integrations. Web browsers and Android WebViews cannot directly interpret JSX.
* **`dist/` (Compiled Distribution):** Generated automatically when executing `npm run build`. Vite bundles and minifies `src/` and `assets/` into optimized production code. Capacitor copies `dist/` directly into Android Studio (`android/app/src/main/assets/public/`) to compile `MentorLink.apk`.

### 2.2 System Administration: Where is the Admin?
MentorLink is a direct Peer-to-Peer platform (Student $\leftrightarrow$ Tutor). Instead of building a bloated in-app admin screen:
* **The Supabase Web Dashboard (`app.supabase.com`) serves as the full-featured, secure Admin Console.**
* Developers and system administrators use Supabase to manage user accounts, inspect direct payment dispute references, monitor server-side database triggers, review community service hour logs, and moderate storage buckets.
* For academic thesis and capstone defenses, presenting the Supabase Dashboard alongside the mobile app demonstrates a live, enterprise-grade cloud architecture.

---

## 3. Database Architecture & Row Level Security (RLS)

MentorLink runs on **Supabase PostgreSQL** utilizing 7 normalized relational tables with 100% Row Level Security coverage.

### 3.1 7-Table Relational Schema
1. **`profiles`:** Base user credentials (ID, full name, email, avatar URL, school name, education level: high school vs college, `is_tutor` flag).
2. **`tutor_profiles`:** Mentor credentials, hourly rate (₱0 for volunteer), bio, education level, rating average, total accredited service hours, and payment instructions.
3. **`tutor_subjects`:** Academic subjects offered by mentors, categorized with target grade levels (*High School*, *College*, or *Both*).
4. **`tutor_availability`:** Recurring weekly schedule time slots (day of week 0–6, start time, end time).
5. **`sessions`:** Tutoring bookings, scheduled time window, topic description, meeting type (Online vs In-Person), direct payment status, reference number, and post-session study notes.
6. **`service_hour_logs`:** Verifiable community service hour logs committed strictly by server-side triggers for completed volunteer sessions.
7. **`reviews`:** 1–5 star ratings and written student reviews with a unique constraint preventing duplicate reviews for the same session.

### 3.2 Automated Server-Side Triggers (`SECURITY DEFINER`)
To eliminate fraud and maintain non-monetary academic integrity:
1. **Service Hours Auto-Accreditation Trigger (`handle_session_completion_service_hours`):**
   * Fires `AFTER UPDATE OF status ON sessions`.
   * When a volunteer session (`hourly_rate = 0.00`) is marked `status = 'completed'`, the server automatically calculates elapsed hours, inserts an immutable record into `service_hour_logs`, and increments `total_service_hours` in `tutor_profiles`.
   * **RLS Protection:** Direct client inserts into `service_hour_logs` are strictly blocked.
2. **Tutor Rating Recalculation Trigger (`update_tutor_rating_statistics`):**
   * Automatically recalculates `average_rating` and `completed_sessions_count` in `tutor_profiles` upon review submission.

---

## 4. Codebase Foundation & Build Verification

The core application foundation was configured, tested, and validated:

### 4.1 `package.json` Configuration
```json
{
  "name": "mentorlink",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --minify && vite build",
    "preview": "vite preview",
    "build:css": "tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --minify",
    "watch:css": "tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --watch"
  },
  "dependencies": {
    "@tailwindcss/cli": "^4.3.3",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.1.1",
    "vite": "^8.3.0"
  }
}
```

### 4.2 Tailwind CSS v4 Compilation
* **Input Stylesheet:** [`assets/css/input.css`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/assets/css/input.css) contains `@import "tailwindcss";`, mobile safe-area variables (`--sat`, `--sab`, `.pt-safe`, `.pb-safe`), minimum touch targets (`.touch-target` $\ge 44\text{px}$), bottom navigation clearance (`.bottom-nav-clearance`), and print styles (`@media print`).
* **Output Stylesheet:** [`assets/css/output.css`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/assets/css/output.css) compiles cleanly in ~1 second (19.8 KB minified).

### 4.3 Capacitor Android Compatibility (`vite.config.js`)
* Configured with **`base: './'`**.
* **Critical Rationale:** Guarantees that all asset URLs generated in `dist/index.html` resolve relatively (`./assets/...`). This completely prevents the blank white screen error common when deploying web apps into Capacitor Android WebViews (`file:///android_asset/`).

### 4.4 Build Verification Results
Executed `npm run build` with 100% success:
```bash
> mentorlink@1.0.0 build
> tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --minify && vite build

≈ tailwindcss v4.3.3
Done in 1s

vite v8.3.0 building client environment for production...
✓ 16 modules transformed.
dist/index.html                   0.85 kB │ gzip:  0.50 kB
dist/assets/index-Bc75Ji0C.css   23.38 kB │ gzip:  5.42 kB
dist/assets/index-Ce91bru1.js   226.51 kB │ gzip: 70.78 kB
✓ built in 1.40s
```

---

## 5. Master Documentation Suite Catalog (in `docs/`)

All architectural planning, database specifications, development manuals, and design blueprints are documented in the `docs/` folder:

| # | File Path | Document Name | Purpose & Contents |
| :-: | :--- | :--- | :--- |
| **1** | [`docs/PRD.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/PRD.md) | Product Requirements Document | Complete functional requirements, user personas, business rules, and acceptance criteria. |
| **2** | [`docs/database_schema_design.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/database_schema_design.md) | Database Schema Design | 7-table schema, Mermaid ERD, column data dictionary, indexes, and trigger logic. |
| **3** | [`docs/supabase_schema_setup.sql`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/supabase_schema_setup.sql) | Idempotent PostgreSQL DDL | Copy-pasteable SQL script for Supabase SQL Editor creating tables, triggers, and 100% RLS policies. |
| **4** | [`docs/file_structure.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/file_structure.md) | Project File Structure Plan | Master directory tree, folder ownership matrix, and developer placement rules ("Where does X belong?"). |
| **5** | [`docs/schema_keys.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/schema_keys.md) | Database Schema Keys Matrix | Complete Primary Key, Foreign Key, Unique Key, check constraints, and cascade delete map. |
| **6** | [`docs/security.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/security.md) | Security Architecture | Android container hardening, RLS defense ledger, secret protection, and input sanitization. |
| **7** | [`docs/android_build_guide.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/android_build_guide.md) | Android APK Build Guide | Capacitor configuration, cleartext traffic rules, keystore signing, and Android Studio compilation. |
| **8** | [`docs/service_hours_certificate_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/service_hours_certificate_spec.md) | Service Hours Certificate Spec | Layout, `@media print` CSS rules, anti-counterfeit verification hash, and React component code. |
| **9** | [`docs/error_handling_and_toasts.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/error_handling_and_toasts.md) | Error Handling & Toast Spec | 3-tier mobile error handling, Supabase/PG error translator, `useToast` hook, and offline detection. |
| **10**| [`docs/Skills.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/Skills.md) | Development Procedures Manual | Complete 10-section engineering handbook aligned to MentorLink (React, Tailwind, Supabase, Capacitor). |
| **11**| [`docs/browser_mobile_preview_guide.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/browser_mobile_preview_guide.md) | Browser Mobile Preview Guide | Guide for running `npm run dev` and testing with Chrome/Edge DevTools Device Mode (Inspect Tool). |
| **12**| [`docs/key_features.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/key_features.md) | Key Features & UI Design Spec | Screen-by-screen blueprint covering 100% of views and components for Figma wireframing. |
| **13**| [`docs/system_flowchart.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/system_flowchart.md) | System Flowcharts & Lifecycles | 6 visual Mermaid diagrams mapping user journeys, direct payment verification, and database triggers. |
| **14**| [`docs/env.example`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/env.example) | Environment Variables Template | Template for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. |
| **15**| [`docs/implementation_documentation.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/implementation_documentation.md) | This Document | Complete technical narrative and discussion record of the implementation. |

---

## 6. Development & Design Roadmap (Next Steps)

With the foundational architecture, database schema, build pipeline, and design specifications complete, the project is ready for UI design and feature construction:

1. **UI Design Phase (Figma / Wireframes):**
   * Use [`docs/key_features.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/key_features.md) and [`docs/system_flowchart.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/system_flowchart.md) as the source of truth for mockups.
   * Ensure designs adhere to $360\text{px}$–$430\text{px}$ mobile screen ergonomics and include `pb-24` bottom nav clearance.
2. **Supabase Cloud Setup:**
   * Create a Supabase project at `https://app.supabase.com`.
   * Run [`docs/supabase_schema_setup.sql`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/supabase_schema_setup.sql) in the Supabase SQL Editor.
   * Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`.
3. **Component & Screen Implementation:**
   * Build reusable UI atoms in `src/components/common/` (`Button`, `Input`, `Modal`, `Toast`, `Badge`).
   * Implement services in `src/services/` (`authService.js`, `sessionService.js`, `tutorService.js`).
   * Assemble mobile screen pages in `src/pages/`.
4. **Capacitor Android Packaging:**
   * Run `npm run build`.
   * Run `npx cap sync android` and compile release APK in Android Studio.
   * Place compiled APK in `landing/downloads/MentorLink.apk` for direct student download.
