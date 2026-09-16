# MentorLink — Complete System Key Features & UI Design Specification

**Application Title:** MentorLink — Mentorship & Tutoring Matching Mobile Application  
**Document Purpose:** Comprehensive feature map, user journey specification, and screen-by-screen UI design blueprint for UI/UX designers creating Figma wireframes, mockups, and mobile prototypes.  
**Target Viewport:** $360\text{px}$–$430\text{px}$ (Mobile-First Android APK)  
**Target Location:** `docs/key_features.md`  
**Version:** 1.0  

---

## 1. System Overview & UI Design Foundations

MentorLink is a mobile-first peer tutoring platform connecting high school and college students for academic assistance. The system operates on a **Dual-Role Model**: every authenticated user is a base **Learner (Student)** who can also activate **Mentor (Peer Tutor)** capabilities and switch contexts in real time via a top header toggle.

### 1.1 Global UI Tokens & Layout Rules
* **Mobile Frame:** Strict `max-w-md mx-auto min-h-screen bg-slate-50 relative flex flex-col`.
* **Touch Target Standard:** Minimum interactive dimension $\ge 44 \times 44\text{px}$ (`.touch-target`).
* **Bottom Navigation Clearance:** All scrollable views enforce `pb-24` (or `.bottom-nav-clearance`) so fixed bottom navigation does not cover buttons or form fields.
* **Safe-Area Insets:** Dynamic padding for notched displays (`.pt-safe`, `.pb-safe`).
* **Color Palette Tokens:**
  * **Primary Brand:** `bg-indigo-600`, `text-indigo-600`, `hover:bg-indigo-700` (`#4f46e5`)
  * **Soft Tint:** `bg-indigo-50`, `text-indigo-700` (`#eef2ff`)
  * **Canvas:** `bg-slate-50` (`#f8fafc`)
  * **Card Surface:** `bg-white`, `border-slate-200` (`#ffffff`, `#e2e8f0`)
  * **Success / Volunteer:** `bg-emerald-50`, `text-emerald-700`, `border-emerald-200` (`#059669`)
  * **Warning / Pending:** `bg-amber-50`, `text-amber-700`, `border-amber-200` (`#d97706`)
  * **Danger / Cancelled:** `bg-rose-50`, `text-rose-700`, `border-rose-200` (`#e11d48`)
  * **Service Hours:** `bg-purple-50`, `text-purple-700`, `border-purple-200` (`#7c3aed`)

---

## 2. Mobile App Shell & Navigation Architecture

### 2.1 Sticky Top Header (`TopHeader.jsx`)
Present on all primary screens, adapting dynamically to the active role:
* **Brand Logo & Name:** 32px indigo rounded-xl icon with white "ML" typography + "MentorLink" heading with subtitle ("Peer Tutoring & Mentorship").
* **Dual-Role Switcher Pill:** Interactive button in top-right corner:
  * In Student View: Displays `🎓 Learner` (clicking switches to Mentor Dashboard).
  * In Tutor View: Displays `💼 Mentor` (clicking switches to Student Home).
* **Back Button Variant:** For sub-screens (e.g. `BookSessionScreen`), replaces the brand logo with a clean chevron back button (`←`) and centered screen title.

### 2.2 Persistent Bottom Navigation Bar (`BottomNav.jsx`)
Fixed at the bottom of the screen (`fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40`):
* **Tab 1: Home** (Active: `🏠 text-indigo-600 font-bold`, Inactive: `text-slate-400`).
* **Tab 2: Find Tutors** (Search magnifying glass icon).
* **Tab 3: My Sessions** (Calendar/clock icon with pending badge counter).
* **Tab 4: Profile** (User avatar or person icon).

### 2.3 Global Toast Notification Anchor (`Toast.jsx`)
* **Position:** Fixed floating pill `bottom-20 left-4 right-4 max-w-md mx-auto z-50`.
* **Variants:** Success (Emerald), Error (Rose), Warning (Amber), Info (Indigo).
* **Auto-Dismiss:** 3.5 seconds with swipe/tap to dismiss.

---

## 3. Module 1: Authentication & User Profile Management

### 3.1 Login Screen (`src/pages/auth/LoginScreen.jsx`)
* **Visual Elements:**
  * Clean hero illustration / brand badge.
  * Welcome heading: *"Welcome back, Scholar"* with subtitle *"Sign in to continue your mentorship journey"*.
  * Email input with envelope icon and inline validation.
  * Password input with eye toggle to show/hide characters.
  * *"Forgot Password?"* text button.
  * Primary Action Button: *"Sign In"* (`w-full bg-indigo-600 text-white rounded-xl py-3 font-bold`).
  * Secondary Action: *"Don't have an account? Sign Up"*.
* **Validation States:**
  * Real-time red input borders and error captions for bad formats.
  * Submit button loading spinner while authenticating.

### 3.2 Registration Screen (`src/pages/auth/RegisterScreen.jsx`)
* **Visual Elements:**
  * Screen title: *"Create Account"* with subtitle *"Join as a student learner"*.
  * Full Name input.
  * Email input (school or personal email).
  * Password input ($\ge 8$ characters) with strength indicator bar.
  * Education Level Selector: Segmented pill selector (**High School** vs **College**).
  * School Name text input with auto-suggestions or clean placeholder.
  * Primary Action Button: *"Create Student Account"*.
  * Legal note: Terms of Service & Privacy Policy checkbox.

### 3.3 Forgot Password Screen (`src/pages/auth/ForgotPasswordScreen.jsx`)
* **Visual Elements:**
  * Back navigation button.
  * Key illustration / icon.
  * Explanation text: *"Enter your email address to receive a secure password reset link."*
  * Email input.
  * Action Button: *"Send Reset Link"*.
  * Success Confirmation Banner when link is dispatched.

### 3.4 Profile Screen (`src/pages/profile/ProfileScreen.jsx`)
* **Visual Elements:**
  * User Hero Card: Avatar image (or initials fallback), Full Name, School Name, Education Level badge (`High School` or `College`).
  * Active Role Status Banner: Shows whether Tutor mode is active or locked.
  * *"Become a Peer Mentor"* CTA button (if `is_tutor === false`).
  * Account Settings Menu list:
    * ✏️ Edit Profile (Bio, School, Avatar)
    * 💼 Mentor Mode Settings (Rate, Payment Details — if Tutor)
    * 📜 Accredited Community Service Hours (if Tutor)
    * 🔒 Change Password & Security
    * 🚪 Sign Out (Rose accent)

### 3.5 Edit Profile Screen (`src/pages/profile/EditProfileScreen.jsx`)
* **Visual Elements:**
  * Avatar photo uploader with camera badge button.
  * Full Name, School Name, and Bio textarea (max 250 characters with remaining count).
  * Save Changes floating sticky button.

---

## 4. Module 2: Student (Learner) Key Features

### 4.1 Student Home Dashboard (`src/pages/student/HomeScreen.jsx`)
* **Visual Elements:**
  * Welcome Banner: *"Hello, [First Name] 👋 What do you want to learn today?"*
  * **Upcoming Session Countdown Card:**
    * Highlights next scheduled session: Tutor Avatar, Subject, Date/Time, and Countdown badge (*"Starts in 2 hours"*).
    * Action Buttons: *"View Details"* & *"Meeting Link"*.
  * **Quick Subject Filters:** Horizontal scrolling chip row (*"Math"*, *"Physics"*, *"Chemistry"*, *"Programming"*, *"English"*).
  * **Featured / Top-Rated Mentors Feed:** Carousel or 2-column card feed of available tutors.
  * **Community Service Highlight:** Small informational callout card: *"Did you know? Booking a volunteer tutor supports their university service hours accreditation."*

### 4.2 Find Tutors Screen (`src/pages/student/FindTutorScreen.jsx`)
* **Visual Elements:**
  * Search Bar: Live search with clear (`✕`) button and filter icon.
  * Filter Modal / Bottom Sheet Trigger:
    * Subject Category dropdown.
    * Grade Level filter (*High School*, *College*, *Both*).
    * Hourly Rate Slider: Filter from ₱0 (Volunteer only) up to ₱500/hr.
    * Day of Week availability checkboxes.
  * **Tutor Results Feed (`TutorCard.jsx`):**
    * Avatar + Full Name + Education/School year.
    * Star Rating badge (`★ 4.9 (24 sessions)` in amber).
    * Rate Tag: `Volunteer (₱0)` (emerald badge) or `₱250/hr` (slate badge).
    * Subject Chips: Horizontal wrap tags for qualified subjects.
    * Accredited Service Hours callout pill (purple badge).
    * Primary Tap Action: Direct navigation to `TutorProfileScreen`.
  * Empty State: Illustrated book graphic with *"No tutors found matching your filters. Try clearing some filters."*

### 4.3 Tutor Profile Screen (`src/pages/student/TutorProfileScreen.jsx`)
* **Visual Elements:**
  * Hero Profile Header: Large avatar, mentor name, headline (*"Calculus & Physics Specialist"*), verified student badge.
  * Hourly Rate Callout Card: Highlights ₱Rate or Volunteer accreditation note.
  * Statistics Row: 3 metrics in rounded cards (⭐ Average Rating, 📚 Total Sessions Completed, ⏱️ Total Hours Tutored).
  * Mentor Bio & Teaching Experience section.
  * **Qualified Subjects List:** Grid of subjects with grade level tags (*High School*, *College*).
  * **Weekly Availability Preview:** Read-only preview of tutor's active time slots.
  * **Student Reviews & Ratings Section:**
    * Overall rating breakdown bar (5-star, 4-star, etc.).
    * Individual `ReviewCard.jsx` items: Student initial avatar, rating stars, formatted relative date (*"2 days ago"*), written feedback.
  * **Sticky Bottom Booking Action Bar:**
    * Displays hourly rate on left.
    * Primary Button: *"Book a Session"* (`bg-indigo-600 text-white font-bold`).

### 4.4 Book Session Screen (`src/pages/student/BookSessionScreen.jsx`)
* **Visual Elements:**
  * Tutor Summary Header: Compact tutor name, avatar, and subject.
  * **Interactive Day Selector (`SlotPicker.jsx`):**
    * Horizontal scrolling day selector cards (*Mon Sep 22*, *Tue Sep 23*, etc.).
    * Selected day highlighted in solid indigo.
  * **Time Slot Selection Grid:**
    * 2-column or 3-column chip grid of available 1-hour slots (*3:00 PM – 4:00 PM*, *4:00 PM – 5:00 PM*).
    * States: Available (white with border), Selected (indigo fill), Unavailable/Booked (muted gray, disabled).
  * **Meeting Type Selector:**
    * Segmented radio pills: 💻 **Online Meeting** (Zoom / Google Meet) vs 📍 **In-Person** (Campus Library / Study Hall).
    * Meeting location or link input.
  * **Topic & Assignment Description:**
    * Textarea: *"What specific topics or problems do you need help with?"* (e.g. *"Derivatives and chain rule assignment"*).
  * **Payment Breakdown Card:**
    * Rate calculation (e.g. 1 hour $\times$ ₱250 = ₱250, or Volunteer = ₱0.00).
  * **Submit Button:** *"Confirm Booking Request"*.

---

## 5. Module 3: Direct Payment Verification Flow

### 5.1 Student Direct Payment Submission
* **Trigger:** Appears when a paid booking is accepted (`status = 'pending'`, `payment_status = 'unpaid'`).
* **Visual Elements:**
  * Payment Instructions Card:
    * Tutor's preferred payment channel (GCash / Maya / Bank Transfer / Cash).
    * Tutor's recipient account name and mobile number with a **"Copy Number"** button.
  * **Reference Number Input Form:**
    * Payment Method Selector (GCash, Maya, Cash).
    * Reference Number Input Field: Text input with placeholder *"e.g., GCash Ref: 1002 9384 1029"*.
    * Notice text: *"Please double-check your reference number. The tutor will verify this against their payment app."*
  * **Submit Reference Button:** *"Submit Payment Reference"*.
* **Confirmation State:**
  * Status updates immediately to `payment_submitted` (Amber badge: *"Payment Verification Pending"*).

### 5.2 Tutor Payment Verification & Confirmation
* **Trigger:** Tutor opens an incoming booking with `payment_status = 'payment_submitted'`.
* **Visual Elements:**
  * Verification Card:
    * Highlighted Reference Number in bold monospace font with **"Copy"** button.
    * Submission timestamp and student's payment method.
    * Guidance alert: *"Check your GCash / Maya transaction history for this reference number before confirming."*
  * **Action Buttons:**
    * Primary Button: *"✓ Confirm Payment Receipt"* (`bg-emerald-600 text-white font-bold`).
    * Secondary Button: *"Report Issue / Incorrect Ref"* (`text-rose-600`).
* **Confirmed State:**
  * Session status automatically transitions to `confirmed` (Emerald badge: *"Payment Confirmed"*).

---

## 6. Module 4: Peer Tutor (Mentor) Key Features

### 6.1 Mentor Onboarding Wizard (`src/pages/tutor/TutorSetupScreen.jsx`)
* **Trigger:** Student taps *"Become a Peer Mentor"* on Profile Screen.
* **Visual Elements:**
  * Step 1: **Mentor Bio & Headline:** Catchy professional headline (*"3rd Year CS Student & Math Enthusiast"*) + teaching style description.
  * Step 2: **Hourly Rate & Volunteer Toggle:**
    * Toggle switch: *"Volunteer Tutor (₱0 / Free)"*.
    * If volunteer: Callout badge explaining *"You will earn accredited University Community Service Hours instead of monetary income."*
    * If paid: Number input to set hourly rate in Philippine Pesos (₱).
  * Step 3: **Payment Instructions (if paid):**
    * Textarea for GCash/Maya mobile number and account name.
  * Step 4: **Initial Subject Selection:**
    * Checkbox list of common academic subjects with grade level selection (*High School*, *College*).
  * Step 5: **Finish Button:** *"Activate Mentor Mode"*.

### 6.2 Tutor Dashboard (`src/pages/tutor/TutorDashboard.jsx`)
* **Visual Elements:**
  * Top Metric Cards (3-column grid):
    * ⏱️ **Total Service Hours** (Accredited hours with purple badge).
    * 💰 **Total Earnings** (₱ formatted earnings if paid).
    * 🎓 **Active Students** (Total distinct students mentored).
  * **Availability Quick Toggle:** Switch to temporarily pause accepting new students (*"Accepting New Students: ON/OFF"*).
  * **Pending Booking Requests Card:** Action-required banner showing count of bookings awaiting acceptance or payment confirmation.
  * **Quick Navigation Menu:**
    * 📅 Manage Weekly Schedule
    * 📚 Manage Subjects & Rates
    * 📜 View & Export Service Hours Certificate
    * 📥 Incoming Bookings

### 6.3 Manage Weekly Schedule (`src/pages/tutor/ManageScheduleScreen.jsx`)
* **Visual Elements:**
  * Day Tabs: Monday through Sunday selector chips.
  * Active Slots List for selected day:
    * Time range pill: *"3:00 PM – 4:30 PM"* with delete trash icon.
  * **"Add New Time Slot" Drawer / Form:**
    * Day of week selector.
    * Start Time Picker dropdown (e.g. *02:00 PM*).
    * End Time Picker dropdown (e.g. *04:00 PM*).
    * Add Slot Button.
  * Empty State: *"No availability slots configured for [Day]. Tap below to add your free hours."*

### 6.4 Manage Subjects (`src/pages/tutor/ManageSubjectsScreen.jsx`)
* **Visual Elements:**
  * Active Subjects List:
    * Subject card with category badge (*Mathematics*, *Sciences*, *Engineering*, *Languages*).
    * Grade Level tag (*High School*, *College*, *Both*).
    * Delete / remove button.
  * **"Add Subject" Bottom Sheet:**
    * Searchable subject catalog or custom subject name input.
    * Category selector.
    * Grade level target radio buttons.
    * Add Subject Button.

### 6.5 Incoming Bookings Screen (`src/pages/tutor/IncomingBookingsScreen.jsx`)
* **Visual Elements:**
  * Segmented tabs: `Requests (Pending)` vs `Confirmed Sessions`.
  * **Booking Request Card:**
    * Student Avatar, Name, School/Grade.
    * Requested Subject, Date, and Time Window.
    * Topic Description submitted by student.
    * Meeting preference (Online vs In-Person).
    * Rate indicator (₱Rate or Volunteer).
    * Payment status pill (`unpaid` / `payment_submitted`).
    * **Action Buttons:**
      * Green Button: *"Accept Booking"* (or *"Confirm Payment"* if ref submitted).
      * Red / Outline Button: *"Decline Booking"* with decline reason modal.

### 6.6 Post-Session Notes Pad (`src/pages/sessions/SessionNotesPad.jsx`)
* **Trigger:** Available to tutor once a session is confirmed or completed.
* **Visual Elements:**
  * Session Context Header: Student name, subject, and session date.
  * Notes Textarea with clean placeholder:
    * *"Write key takeaways, homework assignments, problem sets covered, or recommendations for the student..."*
  * Save / Update Notes Button (`bg-indigo-600 text-white`).
  * Auto-save status indicator (*"Saved at 4:15 PM"*).

### 6.7 University Community Service Hours Screen (`src/pages/tutor/ServiceHoursScreen.jsx`)
* **Visual Elements:**
  * **Hero Hours Badge:** Large circular or card counter displaying **Total Accredited Hours** (e.g. *"48.50 Hours"*).
  * Institutional sign-off guidance text: *"Accredited strictly via completed volunteer sessions (₱0/hr). Approved for University Community Extension submission."*
  * **Itemized Service Hours Log Table:**
    * Date, Student Name, Subject, Duration (*"1.50 hrs"*), and Server-Committed Timestamp.
  * **Export & Print Certificate CTA:**
    * Button: *"🖨️ View & Print Official Service Hours Certificate"*.
    * Opens print-optimized Certificate Screen ([`docs/service_hours_certificate_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/service_hours_certificate_spec.md)) with official letterhead, tutor credentials, accredited hours summary, anti-counterfeit hash, and dual signature lines.

---

## 7. Module 5: Session Management & Reviews

### 7.1 Tabbed Sessions Screen (`src/pages/sessions/MySessionsScreen.jsx`)
* **Visual Elements:**
  * Segmented Filter Tabs:
    1. `Upcoming` (Confirmed sessions ready to take place).
    2. `Pending` (Requests awaiting tutor acceptance or payment verification).
    3. `Completed` (Finished sessions ready for notes or reviews).
    4. `Cancelled` (Declined or cancelled bookings).
  * **Session Card (`SessionCard.jsx`):**
    * Role-Aware Partner: Displays Tutor info (for student) or Student info (for tutor).
    * Subject & Topic heading.
    * Date, Time, and Location / Meeting Link.
    * Status Badge (`Confirmed`, `Pending Verification`, `Completed`, `Cancelled`).
    * Direct Action Buttons depending on state:
      * Upcoming: *"Join Meeting"* / *"View Location"*.
      * Completed: *"View Study Notes"* & *"Leave Review"*.

### 7.2 Session Details Screen (`src/pages/sessions/SessionDetailsScreen.jsx`)
* **Visual Elements:**
  * Full session summary card.
  * Meeting details card (Platform, Link, or Physical Room).
  * Direct payment receipt details (Method, Ref #, Confirmation timestamp).
  * Study Notes Card: Full text notes logged by tutor.
  * Rating & Review section: Displays submitted review or *"Rate Session"* button.

### 7.3 Rate Session Modal (`src/pages/sessions/RateSessionModal.jsx`)
* **Trigger:** Student taps *"Leave Review"* on a completed session.
* **Visual Elements:**
  * Tutor Avatar & Name.
  * Heading: *"How was your tutoring session?"*
  * **Interactive 5-Star Rating Picker:**
    * 5 large clickable star icons (1 to 5).
    * Rating description caption (*"Poor"*, *"Fair"*, *"Good"*, *"Very Good"*, *"Excellent!"*).
  * **Written Review Textarea:**
    * Placeholder: *"Share what helped you most or how your tutor explained the topics..."*
    * Character counter (max 500 characters).
  * Primary Button: *"Submit Review"*.
  * Note: Unique constraint enforcement prevents submitting more than one review per session.

---

## 8. Module 6: Companion APK Download Landing Page

### 8.1 Standalone APK Showcase Page (`landing/index.html`)
Designed for direct mobile browser access by students scanning a QR code or visiting the download link:
* **Hero Section:**
  * App Logo & Tagline: *"MentorLink — Peer Tutoring & Mentorship for Students"*.
  * Mobile Mockup Graphic: Illustrated smartphone frame showing the Home screen.
  * **Primary CTA:** Large *"⬇️ Download Android APK (v1.0.0)"* button with direct APK file download link.
  * APK Metadata: Size (~15MB), Android 7.0+ compatible, Version 1.0.0.
* **Key Features Showcase (3 Cards):**
  * 🎯 **Direct Peer Matching:** Find qualified high school and college tutors instantly.
  * 💸 **Direct Transparent Pay:** Pay tutors directly via GCash, Maya, or cash.
  * 📜 **University Service Hours:** Peer mentors earn accredited community service hours.
* **Installation Guide (Accordion / 3 Steps):**
  1. Download the `.apk` file.
  2. Tap the file in your downloads and allow *"Install from unknown sources"*.
  3. Open MentorLink and log in!
* **Footer:** Academic project disclaimer, version tag, and university branding.

---

## 9. Comprehensive Screen & Route Mapping

| Screen / View Name | Mobile Route Path | Target Role | Primary Purpose / Feature |
| :--- | :--- | :--- | :--- |
| **Login Screen** | `/login` | Public | User authentication via email & password. |
| **Register Screen** | `/register` | Public | Account creation (High School vs College student). |
| **Forgot Password** | `/forgot-password` | Public | Password recovery link dispatch. |
| **Student Home** | `/home` | Student | Upcoming session countdown, quick filters, tutor feed. |
| **Find Tutors** | `/tutors` | Student | Search, subject filters, price slider, tutor directory. |
| **Tutor Profile** | `/tutors/:id` | Student | Bio, credentials, reviews, availability preview, booking. |
| **Book Session** | `/book/:tutorId` | Student | SlotPicker, topic input, meeting type, booking request. |
| **My Sessions** | `/sessions` | Both | Tabbed list (Upcoming, Pending, Completed, Cancelled). |
| **Session Details** | `/sessions/:id` | Both | Meeting location/link, payment status, study notes. |
| **Rate Session** | Modal on `/sessions/:id`| Student | 1–5 star rating and written review submission. |
| **Tutor Setup** | `/tutor/setup` | Student $\rightarrow$ Tutor| Onboarding wizard to activate Peer Mentor mode. |
| **Tutor Dashboard** | `/tutor/dashboard` | Tutor | Overview metrics (Hours, earnings, active students). |
| **Manage Schedule** | `/tutor/schedule` | Tutor | Weekly recurring availability time slot manager. |
| **Manage Subjects** | `/tutor/subjects` | Tutor | Add/edit qualified academic subjects and grade levels. |
| **Incoming Bookings** | `/tutor/bookings` | Tutor | Review requests, verify GCash/Maya ref #, confirm. |
| **Service Hours** | `/tutor/hours` | Tutor | Accredited hours ledger & printable certificate. |
| **Session Notes Pad** | `/sessions/:id/notes`| Tutor | Post-session study pointer editor. |
| **User Profile** | `/profile` | Both | Account details, mode switcher, app settings, logout. |
| **Edit Profile** | `/profile/edit` | Both | Edit avatar, full name, school, and bio. |
| **APK Landing Page** | `/landing/index.html`| Public | Showcase screenshots, direct Android APK download. |

---

## 10. UI Designer Checklist for Wireframing & Figma

When creating wireframes, mockups, or component libraries, ensure you include:

- [ ] **Dual-Role Header:** Both the `🎓 Learner` and `💼 Mentor` states of the top header.
- [ ] **Persistent Bottom Nav:** Fixed 4-tab bottom navigation with active vs inactive icon styling.
- [ ] **TutorCard Variants:** Volunteer (₱0) badge with purple service hours vs Paid (₱Rate/hr) tag.
- [ ] **SlotPicker States:** Day selection chips (selected vs default) and time slot grid (available, selected, booked).
- [ ] **Direct Payment Flow:** Reference number input card and tutor verification action banner.
- [ ] **Service Hours Certificate:** Official print layout matching [`docs/service_hours_certificate_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/service_hours_certificate_spec.md).
- [ ] **Empty States:** Friendly illustrated placeholders for empty search results, empty bookings, and empty schedule slots.
- [ ] **Loading Skeletons:** Animated pulse placeholder cards for tutor cards and session lists.
- [ ] **Bottom Spacing Clearance:** Guarantee every screen has visible whitespace (`pb-24`) above the bottom nav bar.
