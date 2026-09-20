# MentorLinks — Complete System Key Features & UI Design Specification

**Application Title:** MentorLinks — Peer Mentorship & Tutoring Mobile Application  
**Tagline:** Connect. Learn. Grow.  
**Document Purpose:** Comprehensive feature map, user journey specification, and screen-by-screen UI design blueprint aligned with [`docs/mobile_contents_guide.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/mobile_contents_guide.md).  
**Target Viewport:** $360\text{px}$–$430\text{px}$ (Mobile-First Android APK)  
**Target Location:** `docs/key_features.md`  
**Version:** 2.0  
**Design Theme:** Ocean Breeze (`#0284c7`, `#0ea5e9`, `#06b6d4`, `#0f172a`, `#ffffff`, `#f0f9ff`)  

---

## 1. System Overview & UI Design Foundations

MentorLinks is a mobile-first peer mentorship and tutoring platform connecting high school and college students. Users choose their account role upon registration (`○ Student` or `○ Mentor`).

### 1.1 Global UI Tokens & Layout Rules
* **Mobile Frame:** Strict `max-w-md mx-auto min-h-screen bg-slate-50 relative flex flex-col`.
* **Touch Target Standard:** Minimum interactive dimension $\ge 44 \times 44\text{px}$ (`.touch-target`).
* **Bottom Navigation Clearance:** All scrollable views enforce `pb-24` (`.bottom-nav-clearance`) so fixed bottom navigation does not cover buttons or form fields.
* **Safe-Area Insets:** Dynamic padding for notched displays (`.pt-safe`, `.pb-safe`).
* **Color Palette Tokens (Ocean Breeze):**
  * **Primary Brand:** `bg-sky-600`, `text-sky-600`, `hover:bg-sky-700` (`#0284c7`, `#0ea5e9`)
  * **Accent / Gradient:** `bg-cyan-500`, `text-cyan-600` (`#06b6d4`)
  * **Soft Tint:** `bg-sky-50`, `text-sky-700` (`#f0f9ff`)
  * **Canvas:** `bg-slate-50` (`#f8fafc`)
  * **Card Surface:** `bg-white`, `border-slate-200` (`#ffffff`, `#e2e8f0`)
  * **Primary Text:** `text-slate-900` (Dark navy `#0f172a`)
  * **Muted Text:** `text-slate-500` / `text-slate-400`
  * **Success / Confirmed:** `bg-emerald-50`, `text-emerald-700`, `border-emerald-200` (`#059669`)
  * **Warning / Pending:** `bg-amber-50`, `text-amber-700`, `border-amber-200` (`#d97706`)
  * **Danger / Cancelled:** `bg-rose-50`, `text-rose-700`, `border-rose-200` (`#e11d48`)

---

## 2. Onboarding & Authentication Module

### 2.1 Sign In Screen (`src/pages/auth/LoginScreen.jsx`)
* **Header / Logo:** MentorLinks icon + *"Connect. Learn. Grow."*
* **Welcome Text:** *"Welcome Back! 👋 Sign in to continue your mentoring journey."*
* **Form:** Email address input, Password input with eye toggle (`👁️`), *"Forgot Password?"* link.
* **Main CTA:** `[ Sign In ]` (Ocean Breeze sky blue).
* **Divider:** `──────── OR ────────` + `[ Continue with Google ]`.
* **Bottom:** *"Don't have an account? Sign Up"*.

### 2.2 Sign Up Screen (`src/pages/auth/RegisterScreen.jsx`)
* **Welcome Text:** *"Create Your Account — Join MentorLinks and start connecting with mentors."*
* **Form:** Full Name, Email Address, Password, Confirm Password.
* **Account Type (Segmented Picker):**
  * `○ Student` (Routes to Student Profile Setup)
  * `○ Mentor` (Routes to Mentor Profile Setup)
* **Terms:** `☐ I agree to the Terms & Conditions and Privacy Policy.`
* **CTA Button:** `[ Create Account ]`.

### 2.3 Student Profile Setup (`src/pages/student/StudentProfileSetup.jsx`)
* **Header:** *"Complete Your Profile"*
* **1. Profile Photo:** Avatar placeholder + `[ + Add Photo ]` (optional).
* **2. Personal Information:** Full Name, School / University, Course / Program, Year Level dropdown (`1st Year` – `4th Year`, `Graduate`).
* **3. Short Bio:** Max 150 characters.
* **4. Learning Interests:** Multi-select chips (`Programming`, `Web Development`, `UI/UX Design`, `Cybersecurity`, `Database`, `Mobile Development`, `Data Analytics`, `Networking`).
* **5. CTA:** `[ Complete Profile ]` (or *"Skip for now"*).

---

## 3. Student Experience (5-Tab Architecture)

Detailed specification: [`docs/student_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/student_flow_spec.md)

### 3.1 Tab 1: 🏠 Student Home Dashboard (`src/pages/student/HomeScreen.jsx`)
* **Greeting:** *"Good morning, [Name]! 👋 Ready to learn something new today?"* + `🔔` notification bell.
* **Search Bar:** `🔍 Search mentors or skills...` -> opens Explore tab.
* **Quick Actions:**
  * 🔍 *Find a Mentor* (Find mentors based on interests)
  * 📅 *My Sessions* (View upcoming and completed sessions)
  * 💬 *Messages* (Chat with your mentors)
* **Recommended Mentors:** Cards displaying avatar, mentor name, specialization, rating & session count, and `[ View Profile ]`.
* **Upcoming Session Card:** Live countdown or placeholder (`You don't have any upcoming sessions. [ Find a Mentor ]`). When approaching/live: `[ Join Session ]` CTA.

### 3.2 Tab 2: 🔍 Explore / Find Mentors (`src/pages/student/ExploreScreen.jsx`)
* **Search & Filter:** Search bar + `⚙️ Filter` button.
* **Categories:** Horizontal scrollable chips (`All`, `Programming`, `Web Development`, `UI/UX`, `Cybersecurity`, `Database`, `Mobile Development`, `Data Analytics`).
* **Recommended for You:** Mentor recommendations matched to student's learning interests.
* **All Mentors Directory:** Cards with photo, specialization, rating, sessions, expertise tags, and profile button.
* **Filter Bottom Sheet (`FilterMentorsModal.jsx`):** Expertise checkboxes, Session Type (Online/In-person/Both), Availability, and Rating filter (4.0+, 4.5+, 4.8+).

### 3.3 Mentor Profile & Booking Sub-Flow
* **Mentor Profile (`src/pages/student/MentorProfileScreen.jsx`):**
  * Avatar, headline, rating, verified badge, bio, expertise chips, mentoring style, availability preview, session duration (30–60 min), student reviews.
  * Fixed Bottom Bar: `[ 💬 Message ]` and `[ 📅 Book a Session ]`.
* **Book a Session — Screen 1 (`BookSessionScreen.jsx`):**
  * Date Picker: Interactive calendar with available days highlighted in Ocean Breeze.
  * Time Picker: Available slots (e.g. 6:00 PM, 7:00 PM, 8:00 PM).
  * Duration Selector: 30 min | 45 min | 60 min.
  * Topic Input: *"What would you like to learn?"*
  * CTA: `[ Continue ]`.
* **Review & Confirm Booking — Screen 2 (`ReviewBookingScreen.jsx`):**
  * Details summary (Mentor, Date, Time, Duration, Format, Topic).
  * Booking note explaining mentor response requirement.
  * CTA: `[ Confirm & Send Request ]` -> shows `✅ Request Sent!` modal -> sets status to `⏳ Pending`.
* **Pending Session Request (`SessionDetailsScreen.jsx`):**
  * Status card: `⏳ Pending Request` + `[ Cancel Request ]` with confirmation dialog.

### 3.4 Active Sessions & Virtual Classroom
* **Confirmed Session Screen:** Status `✅ Session Confirmed`, countdown, connection tips, and `[ 🎥 Join Session ]` button.
* **Virtual Classroom (`src/pages/sessions/VirtualClassroomScreen.jsx`):**
  * Header with live badge (`🟢 Live`) and topic.
  * Large Mentor video feed + PiP student video (fallback `📷 Camera Off`).
  * Meeting Controls: Mic mute/unmute, Camera on/off, Meeting chat toggle, Screen share, Leave session.
  * In-Meeting Chat Panel: Instant text chat and code links.
  * Live Session Notes Pad: Study pointers recorded during meeting.
* **Session Completed Screen (`SessionCompletedScreen.jsx`):**
  * Summary card, mentor study notes review, and `[ 📅 View Session History ]` / `[ 💬 Message Mentor ]`.

### 3.5 Tab 3: 💬 Student Messages (`src/pages/student/MessagesScreen.jsx`)
* **Conversation List:** Search bar, conversations with avatar, name, last snippet, timestamp, and unread `●` indicator.
* **Chat Screen (`ChatConversationScreen.jsx`):**
  * Message bubbles, attachment `📎`, send `➤`.
  * **Embedded Session Shortcut Card:** Direct upcoming session card inside chat (`Sept. 25 · 7:00 PM [ View Session ]`).

### 3.6 Tab 4: 📅 Student Sessions (`src/pages/student/SessionsScreen.jsx`)
* **Tabs:** `🟢 Upcoming` | `⚪ Completed`.
* **Cards:** Status pills (`🟢 CONFIRMED`, `⏳ PENDING`, `✅ COMPLETED`), meeting details, and contextual action buttons (`View Details`, `Join Session`, `View Session / Notes`).

### 3.7 Tab 5: 👤 Student Profile & Settings (`src/pages/student/ProfileScreen.jsx`)
* **Profile Header:** Avatar, Name, Program (*BS Information Technology · 3rd Year*), `[ Edit Profile ]`.
* **My Learning:** `📈 Learning Progress` (progress bar, 12 sessions, 14.5 hrs, skill breakdown: Web Dev 80%, JS 65%, UI/UX 55%, Database 40%), `📅 Session History`.
* **Account:** `👤 Personal Information`, `🔔 Notification Settings`, `🔒 Privacy & Security`.
* **Support:** `❓ FAQs`, `💬 Help & Support`, `📄 Terms & Conditions`, `🛡️ Privacy Policy`, `ℹ️ About MentorLinks`.
* **Logout:** `🔴 Log Out` modal.

---

## 4. Mentor Experience (5-Tab Architecture)

Detailed specification: [`docs/mentor_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/mentor_flow_spec.md)

### 4.1 Tab 1: 🏠 Mentor Home Dashboard (`src/pages/mentor/MentorDashboard.jsx`)
* **Greeting:** *"Good morning, [Name]! 👋 Ready to help your students grow today?"* + `🔔` notification bell.
* **Today's Overview (2x2 Grid):**
  * 📅 *Today's Sessions* (e.g. `2 Sessions today`)
  * 👥 *My Students* (e.g. `12 Active students`)
  * ⏳ *Pending Requests* (e.g. `3 Need your response`)
  * ⭐ *My Rating* (e.g. `4.9 · 24 sessions`)
* **Session Requests Card:** Student info, topic, date/time, and action buttons:
  * `[ Accept ]` -> confirmation modal -> marks confirmed, notifies student.
  * `[ Decline ]` -> decline reason modal (schedule conflict, time unavailable, etc.) -> notifies student.
* **Upcoming Sessions:** Cards with live countdown and conditional `[ 🎥 Join Session ]`.
* **My Students Preview:** Active student cards + `[ View Profile ]`.
* **Quick Action:** `💬 Stay Connected` + `[ View Messages ]`.

### 4.2 Tab 2: 👥 My Students (`src/pages/mentor/MyStudentsScreen.jsx`)
* **Search:** `🔍 Search students...`
* **Filter Tabs:** `All` | `Active` | `Upcoming` | `Completed`.
* **Student Cards:** Profile photo, name, course/year, session count, last session date, `🟢 Active` pill, and `[ View Profile ]` / `[ Message ]`.
* **Student Profile Preview (`StudentProfilePreview.jsx`):** Personal learning bio, learning interest chips, mentoring history, upcoming session, and `[ 💬 Message Student ]`.

### 4.3 Tab 3: 💬 Mentor Messages (`src/pages/mentor/MentorMessagesScreen.jsx`)
* **Conversations:** Search, unread counter badges, conversation thread with student.
* **Embedded Session Shortcut Card:** In-chat shortcut card to active bookings.

### 4.4 Tab 4: 📅 Mentor Sessions (`src/pages/mentor/MentorSessionsScreen.jsx`)
* **Tabs:** `⏳ Requests` | `📅 Upcoming` | `✅ Completed`.
* **Requests:** Detailed pending requests with student note and Accept/Decline actions.
* **Upcoming:** Confirmed sessions with `[ View Session ]` and `[ 🎥 Join Session ]`.
* **Completed:** Completed session records with `[ View Session ]` linking to **Session Summary & Notes Pad** editor.

### 4.5 Tab 5: 👤 Mentor Profile & Settings (`src/pages/mentor/MentorProfileScreen.jsx`)
* **Profile Header:** Photo, Name, Specialization (*Web Development Mentor*), Rating & Sessions (`⭐ 4.9 · 24 Sessions`), `[ Edit Profile ]`.
* **My Expertise:** Skill chips + `[ Edit Expertise ]`.
* **My Activity:** `👥 My Students`, `📅 Session History`, `⭐ Reviews & Feedback`.
* **Dedicated Settings Pages:**
  * **🕐 Availability (`AvailabilityScreen.jsx`):** Accept session requests toggle (`ON/OFF`), weekly schedule (Mon–Sun available/unavailable with times), day selector chips, time picker, session duration selector (30/45/60 min), and Save button.
  * **🔔 Notification Settings (`MentorNotificationsScreen.jsx`):** Session requests, reminders, updates, messages, student updates, announcements, push/email toggles, mute all.
  * **🔒 Privacy & Security (`MentorSecurityScreen.jsx`):** Password updates, 2FA toggle, login activity, profile visibility (Students & MentorLinks Users / Students Only / Private), show email toggle, delete account modal.
  * **💬 Help & Support (`HelpSupportScreen.jsx`):** Contact support ticket form with category dropdown, subject, message, attachments.
  * **Legal & Information:** FAQs, Terms & Conditions (10 sections), Privacy Policy, About MentorLinks.

---

## 5. UI Designer Checklist for Wireframing & Figma

When creating wireframes, mockups, or component libraries:
- [ ] **Role-Specific Bottom Navigation:**
  - Student: `🏠 Home`, `🔍 Explore`, `💬 Messages`, `📅 Sessions`, `👤 Profile`.
  - Mentor: `🏠 Home`, `👥 Students`, `💬 Messages`, `📅 Sessions`, `👤 Profile`.
- [ ] **Ocean Breeze Theme Tokens:** Primary buttons and active states use sky/cyan blue (`#0284c7`, `#0ea5e9`), canvas `#f8fafc`, text `#0f172a`.
- [ ] **Virtual Classroom Viewport:** Video feed layout (large mentor + PiP student), bottom meeting controls bar (mic, camera, chat, share, leave), and slide-up session chat.
- [ ] **In-App Chat Elements:** Conversation list with unread blue dots, chat thread bubbles, and embedded session shortcut card.
- [ ] **Booking Calendar & Slots:** Month header, available day highlights, time pills, duration pills.
- [ ] **Student Progress Bar:** Circular/linear progress indicators with skill percentage breakdown.
- [ ] **Bottom Spacing Clearance:** Guarantee every screen enforces `pb-24` above the bottom nav bar.

