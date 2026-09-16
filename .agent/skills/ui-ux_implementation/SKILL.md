---
name: ui-ux
description: UI/UX design standards, mobile-first component anatomy, Tailwind CSS styling tokens, and design system guidelines for MentorLink (Mentorship & Tutoring Matching Application). Use when designing, creating, or refining mobile views, layouts, cards, bottom sheets, or navigation.
---

# UI/UX Design System Skill (MentorLink)

## Goal

Provide a modern, flexible, and robust **mobile-first design system** using **Tailwind CSS** for **MentorLink — Mentorship & Tutoring Matching Application**. 

> [!NOTE]
> **Design Status: Ongoing / Planning Phase**  
> The project UI/UX design is currently being finalized by the team. This skill defines the fundamental mobile ergonomics, design tokens, component anatomy, and responsive constraints so that ongoing visual designs can be cleanly integrated into the React codebase without structural rework.

---

## 1. Mobile-First Ergonomics & Constraints

Because MentorLink is packaged as a standalone **Android Mobile Application (APK)**, all screens must adhere to native mobile standards:

```
  ┌────────────────────────────────────────────────────────┐
  │                 TOP APP BAR (Sticky)                   │
  │  - Screen Title / Logo                                 │
  │  - Mode Switcher (Learner ↔ Mentor toggle)            │
  │  - Notifications / Profile Avatar                      │
  ├────────────────────────────────────────────────────────┤
  │                                                        │
  │                 SCROLLABLE CONTENT AREA                │
  │  - Mobile Viewport (360px – 430px optimal width)       │
  │  - Responsive vertical padding (p-4 space-y-4)         │
  │  - Bottom clearance utility (pb-24) to avoid           │
  │    content hidden behind Bottom Navigation             │
  │                                                        │
  ├────────────────────────────────────────────────────────┤
  │              BOTTOM NAVIGATION BAR (Fixed)             │
  │  [Home]      [Find Tutor]      [My Sessions] [Profile] │
  └────────────────────────────────────────────────────────┘
```

1. **Touch Target Size:** Interactive elements (buttons, filter chips, navigation items, inputs) must maintain a minimum touch target of **$44 \times 44\text{px}$** with generous touch padding.
2. **Mobile Viewport Optimization:**
   * Layouts assume standard mobile screens ($360\text{px}$–$430\text{px}$).
   * Avoid horizontal overflow (`overflow-x-hidden` on app containers).
   * Safe-area padding support for Android system status bars and navigation bars (`pt-safe`, `pb-safe`).
3. **Fixed Bottom Navigation Clearance:** The main scrollable container must always include `pb-24` so the fixed bottom navigation bar does not cover form buttons or list cards.
4. **Touch Micro-Interactions:** Subtle tap feedback using Tailwind's active state (`active:scale-[0.98] transition-transform duration-150`).

---

## 2. Core Color Palette & Design Tokens

A clean, modern academic color palette optimized for high contrast, readability, and student focus:

| Token / Category | Tailwind Classes | Hex Value | Application / Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Brand (Indigo)** | `bg-indigo-600`, `text-indigo-600` | `#4f46e5` | Primary action buttons, active tab indicators, brand highlights. |
| **Primary Hover / Active**| `hover:bg-indigo-700`, `active:bg-indigo-800` | `#4338ca` | Button tap / hover states. |
| **Primary Soft Tint** | `bg-indigo-50`, `text-indigo-700` | `#eef2ff` | Active filter pills, selected time slots, icon badge backgrounds. |
| **Canvas Background** | `bg-slate-50` | `#f8fafc` | Mobile screen background. |
| **Card Surface** | `bg-white` | `#ffffff` | Content cards, bottom sheets, modals, bottom navigation bar. |
| **Borders & Dividers** | `border-slate-200`, `divide-slate-100` | `#e2e8f0` | Card borders, list dividers, input outlines. |
| **Primary Heading** | `text-slate-900` | `#0f172a` | Screen titles, tutor names, strong labels. |
| **Body Text** | `text-slate-600` | `#475569` | Descriptions, topics, session notes, input text. |
| **Muted / Subtext** | `text-slate-400` | `#94a3b8` | Timestamps, placeholders, inactive navigation icons. |
| **Success / Verified (Green)**| `bg-emerald-50`, `text-emerald-700`, `border-emerald-200` | `#059669` | `confirmed`, `completed`, free/volunteer badge, payment confirmed. |
| **Warning / Pending (Amber)**| `bg-amber-50`, `text-amber-700`, `border-amber-200` | `#d97706` | `pending` booking, `payment_submitted` (awaiting tutor verification). |
| **Danger / Cancelled (Rose)**| `bg-rose-50`, `text-rose-700`, `border-rose-200` | `#e11d48` | `cancelled` session, delete actions, validation errors. |
| **Service Hours (Purple)** | `bg-purple-50`, `text-purple-700`, `border-purple-200` | `#7c3aed` | Community Service Hours accreditation badges & summaries. |

---

## 3. Component Anatomy & Patterns

### A. Mobile App Shell & Bottom Navigation
* **Container:** Fixed bottom navigation (`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 h-16 z-40 px-4 flex items-center justify-around`).
* **Navigation Item:**
  * Inactive: `flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 gap-1`
  * Active: `flex flex-col items-center justify-center text-indigo-600 font-semibold gap-1`
* **Tabs:**
  1. `Home` (Dashboard, upcoming session countdown, quick links)
  2. `Find Tutors` (Search bar, subject filters, tutor directory)
  3. `My Sessions` (Pending, upcoming, and past tutoring sessions)
  4. `Profile` (User settings, mode switcher, tutor tools/hours)

### B. Tutor Card
* **Container:** `bg-white rounded-2xl border border-slate-200 p-4 shadow-sm active:scale-[0.99] transition-all space-y-3`
* **Header:**
  * Avatar (`w-12 h-12 rounded-full bg-slate-100 object-cover`)
  * Name & Education level (`text-sm font-bold text-slate-900`, subtitle `text-xs text-slate-500`)
  * Rate Tag: `text-xs font-bold px-2 py-0.5 rounded-full` (`bg-emerald-50 text-emerald-700` for Volunteer / ₱0, or `bg-slate-100 text-slate-800` for ₱Rate/hr)
* **Rating & Experience:** `inline-flex items-center gap-1 text-xs text-amber-600 font-bold` (Star icon + `4.9 (18 sessions)`)
* **Subject Tags:** Horizontal scrolling or flex-wrap chips (`inline-block bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-md`)
* **Action:** Direct tap navigates to `TutorProfileScreen` / `BookSessionScreen`.

### C. Booking & Schedule Slot Picker
* **Day Selector:** Horizontal scrollable day chips (`flex gap-2 overflow-x-auto py-1`).
  * Selected day: `bg-indigo-600 text-white font-bold rounded-xl px-3 py-2 text-xs shrink-0 shadow-sm`
  * Inactive day: `bg-white border border-slate-200 text-slate-700 rounded-xl px-3 py-2 text-xs shrink-0`
* **Time Slot Pills:** Grid of selectable slots (`grid grid-cols-2 gap-2`).
  * Selectable: `border border-slate-200 rounded-lg p-2.5 text-center text-xs font-medium hover:border-indigo-500`
  * Selected: `border-2 border-indigo-600 bg-indigo-50 text-indigo-700 font-bold rounded-lg p-2.5 text-center text-xs`

### D. Session Card
* **Container:** `bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3`
* **Status Badges:** Unified pill badges:
  * `Pending`: `bg-amber-50 text-amber-700 border border-amber-200`
  * `Confirmed`: `bg-emerald-50 text-emerald-700 border border-emerald-200`
  * `Completed`: `bg-slate-100 text-slate-700 border border-slate-200`
* **Content:** Date/Time, Subject title, Meeting Link / Location, and payment status pill.
* **Tutor/Student Action:**
  * For Student: "Submit Payment Ref" (if unpaid) or "Rate Tutor" (if completed).
  * For Tutor: "Confirm Payment", "Add Notes", or "Mark Completed".

### E. Slide-Up Bottom Sheet (Mobile Dialogs)
* **Backdrop:** `fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center`
* **Sheet Container:** `bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 shadow-2xl border-t sm:border border-slate-200 animate-slide-up space-y-4 max-h-[85vh] overflow-y-auto`
* **Handle:** Center drag bar `w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-2`
* **Dismiss:** Close button, backdrop tap, and hardware back button.

---

### F. Community Service Hours Summary (Tutor Export)
* Clean, document-style card suitable for on-screen review and PDF/print export:
  * Official Header: University / School Community Engagement Header.
  * Tutor info: Full Name, Student ID / Year Level, Total Hours Completed.
  * Verifiable Log Table: Date, Student Name, Subject, Duration (Hours).
  * Certification disclaimer & signature line placeholder for academic advisor verification.

---

## 4. UI/UX Planning & Implementation Checklist

When implementing new components as the team finalizes designs:

- [ ] Tested on a standard mobile width ($360\text{px}$–$430\text{px}$).
- [ ] No horizontal screen jitter or overflow.
- [ ] Bottom navigation bar clearance (`pb-24`) included on scrollable views.
- [ ] Touch targets $\ge 44\text{px}$ on buttons and interactive chips.
- [ ] Color tokens conform to the Indigo/Slate/Emerald/Amber palette.
- [ ] Status pills match the state machine (`pending`, `confirmed`, `completed`).
- [ ] Feedback indicators (loading spinners, disabled button states) prevent double-taps.
- [ ] Layout easily adapts as the team supplies updated Figma or visual design assets.
