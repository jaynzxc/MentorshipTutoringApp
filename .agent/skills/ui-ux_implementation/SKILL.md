---
name: ui-ux
description: UI/UX design standards, mobile-first component anatomy, Tailwind CSS styling tokens, and design system guidelines for MentorLinks (Mentorship & Tutoring Matching Application). Use when designing, creating, or refining mobile views, layouts, cards, bottom sheets, or navigation.
---

# UI/UX Design System Skill (MentorLinks)

## Goal

Provide a modern, flexible, and robust **mobile-first design system** using **Tailwind CSS** and the **Ocean Breeze** theme for **MentorLinks — Mentorship & Tutoring Matching Application** (*"Connect. Learn. Grow."*).

---

## 1. Mobile-First Ergonomics & Constraints

Because MentorLinks is packaged as a standalone **Android Mobile Application (APK)**, all screens must adhere to native mobile ergonomics:

```
  ┌────────────────────────────────────────────────────────┐
  │                 TOP APP BAR (Sticky)                   │
  │  - Screen Title / Logo ("MentorLinks")                 │
  │  - Mode Switcher (Student ↔ Mentor toggle)            │
  │  - Notifications (Bell) / Profile Avatar               │
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
  │  Student: [Home] [Explore]  [Messages] [Sessions] [Profile]
  │  Mentor:  [Home] [Students] [Messages] [Sessions] [Profile]
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

## 2. Ocean Breeze Color Palette & Design Tokens

A fresh, modern academic palette designed for focus, clarity, and visual delight:

| Token / Category | Tailwind Classes | Hex Value | Application / Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Sky** | `bg-sky-600`, `text-sky-600` | `#0284c7` | Primary action buttons, active tab indicators, brand highlights. |
| **Accent Sky / Cyan** | `bg-sky-500`, `text-sky-500`, `bg-cyan-500` | `#0ea5e9`, `#06b6d4` | Secondary accents, hero banner gradients, progress bars. |
| **Primary Hover / Active**| `hover:bg-sky-700`, `active:bg-sky-800` | `#0369a1` | Button tap and interactive pressed states. |
| **Primary Soft Tint** | `bg-sky-50`, `text-sky-700`, `border-sky-100` | `#f0f9ff` | Active filter pills, selected time slots, badge backgrounds. |
| **Canvas Background** | `bg-slate-50` | `#f8fafc` | Mobile screen canvas background. |
| **Card Surface** | `bg-white` | `#ffffff` | Content cards, bottom sheets, modals, bottom navigation bar. |
| **Borders & Dividers** | `border-slate-200`, `divide-slate-100` | `#e2e8f0` | Card borders, list dividers, input outlines. |
| **Deep Navy Heading** | `text-slate-900` | `#0f172a` | Screen titles, mentor names, metric values, strong labels. |
| **Body Text** | `text-slate-600` | `#475569` | Descriptions, topics, session notes, input text. |
| **Muted / Subtext** | `text-slate-400` | `#94a3b8` | Timestamps, placeholders, inactive navigation icons. |
| **Success / Verified (Green)**| `bg-emerald-50`, `text-emerald-700`, `border-emerald-200` | `#10b981` | `confirmed`, `completed`, free/volunteer badge, payment verified. |
| **Warning / Pending (Amber)**| `bg-amber-50`, `text-amber-700`, `border-amber-200` | `#f59e0b` | `pending` booking request, payment under verification. |
| **Danger / Declined (Rose)**| `bg-rose-50`, `text-rose-700`, `border-rose-200` | `#ef4444` | `declined`, `cancelled` session, delete actions, validation errors. |
| **Service Hours (Purple)** | `bg-purple-50`, `text-purple-700`, `border-purple-200` | `#8b5cf6` | Community Service Hours accreditation badges & summaries. |

---

## 3. Iconography Standards: Vector SVGs & Font Awesome (Strictly NO Emojis in UI Code)

> [!IMPORTANT]
> **Strict Mandate:** In all React component implementations, NEVER render raw Unicode emojis (`🏠`, `🔍`, `💬`, `📅`, `👤`, `⭐`, `🔔`, `✏️`, `🎉`, etc.) as user interface icons, buttons, navigation items, or status badges.
>
> Emojis in markdown documentation, flow specifications, or comments are textual annotations only. During code implementation, they must ALWAYS be translated into clean, scalable **vector SVGs** or **Font Awesome** icons.

### A. Approved Iconography Options
1. **Inline Vector SVGs (Recommended for zero bundle overhead):**
   * Use clean, semantic `<svg>` elements with Tailwind classes.
   * Standard icon size: `w-5 h-5` (navigation, headers), `w-4 h-4` (chips, inline text), `w-6 h-6` (prominent actions).
   * Color binding: Use `currentColor` for `stroke` or `fill` so the icon automatically inherits parent text colors (`text-sky-600`, `text-slate-400`, `text-white`).
   * Accessibility: Include `aria-hidden="true"` on decorative icons and provide accessible screen-reader labels on icon-only buttons (`aria-label="Search"`).
2. **Font Awesome Vector Icons:**
   * Standardized icon library components (e.g. `@fortawesome/react-fontawesome` with `@fortawesome/free-solid-svg-icons`).
   * Consistent sizing classes (`text-lg`, `text-base`, `text-sm`).

### B. Standard Icon Mappings for MentorLinks
| UI Concept | Prohibited Emoji | Required Vector SVG / Font Awesome Icon | Tailwind Classes |
| :--- | :--- | :--- | :--- |
| **Home Tab** | 🏠 | Home / Dashboard icon | `w-5 h-5 stroke-[1.75]` |
| **Explore Tab** | 🔍 | Search / Compass / Magnifying glass icon | `w-5 h-5 stroke-[1.75]` |
| **Messages Tab** | 💬 | Chat bubble / Conversation icon | `w-5 h-5 stroke-[1.75]` |
| **Sessions Tab** | 📅 | Calendar / Schedule icon | `w-5 h-5 stroke-[1.75]` |
| **Profile Tab** | 👤 | User / Profile avatar icon | `w-5 h-5 stroke-[1.75]` |
| **Students Tab** | 👥 | Users / Group roster icon | `w-5 h-5 stroke-[1.75]` |
| **Notifications** | 🔔 | Bell icon | `w-5 h-5 stroke-[1.75]` |
| **Rating / Reviews** | ⭐ | Star icon (solid for filled, stroke for empty) | `w-4 h-4 text-amber-500 fill-amber-500` |
| **Classroom Camera** | 🎥 / 📷 | Video camera icon | `w-5 h-5 text-white` |
| **Microphone** | 🎤 | Mic / Mic-off icon | `w-5 h-5 text-white` |
| **End Session** | 🔴 / 📞 | Phone-hangup / Close icon | `w-5 h-5 text-white` |
| **Status Verified** | ✅ / 🟢 | Check-circle / Shield-check icon | `w-4 h-4 text-emerald-600` |
| **Status Pending** | ⏳ / 🟠 | Clock / Hourglass icon | `w-4 h-4 text-amber-600` |
| **Status Declined** | ❌ / 🔴 | X-circle / Alert-circle icon | `w-4 h-4 text-rose-600` |
| **Service Hours** | 📜 / 🎓 | Award / Certificate / Ribbon icon | `w-4 h-4 text-purple-600` |

---

## 4. Dual 5-Tab Navigation Architecture

### A. Student Navigation (`role = 'student'`)
1. **Home:** Hero banner, quick stats, active bookings, top recommended mentors, subject chips (Home SVG).
2. **Explore:** Mentor directory, search input, category chips, hourly rate filters, sort order (Search SVG).
3. **Messages:** Direct chat threads, unread badge counter, search conversations (Chat Bubble SVG).
4. **Sessions:** Filter tabs (`Upcoming`, `Completed`, `Cancelled`), payment reference submission, classroom link (Calendar SVG).
5. **Profile:** Student bio, university details, learning progress, saved mentors, help center, settings (User SVG).

### B. Mentor Navigation (`role = 'mentor'`)
1. **Home:** Greeting, 2x2 metric cards (Earnings, Total Hours, Rating, Pending Requests), incoming booking requests, scheduled sessions (Home SVG).
2. **Students:** Roster of active and past mentees, search/filter, quick chat trigger (Users SVG).
3. **Messages:** Direct chat with students, embedded session reminder banners (Chat Bubble SVG).
4. **Sessions:** Filter tabs (`Upcoming`, `Requests`, `Completed`), accept/decline actions with decline reason modal (Calendar SVG).
5. **Profile:** Mentor credentials, subject offerings, availability settings, university service hours summary, settings (User SVG).

---

## 5. Component Anatomy & Patterns

### A. Bottom Navigation Bar
* **Container:** Fixed bottom navigation (`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 h-16 z-40 px-2 flex items-center justify-around`).
* **Tab Item:**
  * Inactive: `flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 gap-0.5 text-[10px]` with vector SVG (`w-5 h-5 stroke-[1.75]`)
  * Active: `flex flex-col items-center justify-center text-sky-600 font-semibold gap-0.5 text-[10px]` with vector SVG (`w-5 h-5 stroke-[2]`)
  * Strictly NO raw Unicode emojis as tab icons.

### B. Mentor Card (`Explore` / `Home`)
* **Container:** `bg-white rounded-2xl border border-slate-200 p-4 shadow-sm active:scale-[0.99] transition-all space-y-3`
* **Header:**
  * Avatar (`w-12 h-12 rounded-full bg-slate-100 object-cover`)
  * Name & Education level (`text-sm font-bold text-slate-900`, subtitle `text-xs text-slate-500`)
  * Rate Tag: `text-xs font-bold px-2 py-0.5 rounded-full` (`bg-emerald-50 text-emerald-700` for Volunteer / ₱0, or `bg-slate-100 text-slate-800` for ₱Rate/hr)
* **Rating & Experience:** `inline-flex items-center gap-1 text-xs text-amber-600 font-bold` (Vector Star SVG + `4.9 (18 sessions)`)
* **Subject Tags:** Horizontal scrolling or flex-wrap chips (`inline-block bg-sky-50 text-sky-700 text-[11px] px-2 py-0.5 rounded-md font-medium`)

### C. Booking & Schedule Slot Picker
* **Day Selector:** Horizontal scrollable day chips (`flex gap-2 overflow-x-auto py-1`).
  * Selected day: `bg-sky-600 text-white font-bold rounded-xl px-3 py-2 text-xs shrink-0 shadow-sm`
  * Inactive day: `bg-white border border-slate-200 text-slate-700 rounded-xl px-3 py-2 text-xs shrink-0`
* **Time Slot Pills:** Grid of selectable slots (`grid grid-cols-2 gap-2`).
  * Selectable: `border border-slate-200 rounded-lg p-2.5 text-center text-xs font-medium hover:border-sky-500`
  * Selected: `border-2 border-sky-600 bg-sky-50 text-sky-700 font-bold rounded-lg p-2.5 text-center text-xs`

### D. In-App Messaging Thread & Bubbles
* **Thread Container:** `flex-1 overflow-y-auto p-4 space-y-3`
* **Sender Bubble (Current User):** `ml-auto max-w-[78%] bg-sky-600 text-white rounded-2xl rounded-br-xs px-4 py-2.5 text-sm shadow-xs`
* **Receiver Bubble (Peer):** `mr-auto max-w-[78%] bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-bl-xs px-4 py-2.5 text-sm shadow-xs`
* **Timestamp & Read Status:** `text-[10px] text-right mt-1 opacity-70 flex items-center justify-end gap-1` (Checkmarks as vector SVG)

### E. Virtual Classroom View
* **Container:** Full-screen mobile container (`bg-slate-950 text-white fixed inset-0 z-50 flex flex-col justify-between p-4`)
* **Main Feed:** Dominant remote participant video or presentation stream (`w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center relative`)
* **Floating Thumbnail (Self):** `absolute top-4 right-4 w-28 h-40 bg-slate-800 rounded-xl border-2 border-white/20 shadow-lg overflow-hidden`
* **Toolbar Pill:** `bg-slate-900/90 backdrop-blur-md rounded-full px-4 py-3 flex items-center justify-center gap-4 mx-auto border border-white/10`
  * Mic / Cam: `w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center` with vector SVG icons
  * End Call: `w-11 h-11 rounded-full bg-rose-600 text-white flex items-center justify-center` with vector SVG phone/close icon

---

## 6. UI/UX Implementation Checklist

- [ ] Tested on standard mobile screen widths ($360\text{px}$–$430\text{px}$).
- [ ] No horizontal screen jitter or overflow (`overflow-x-hidden`).
- [ ] Bottom navigation bar clearance (`pb-24`) included on all scrollable views.
- [ ] Touch targets $\ge 44\text{px}$ on buttons and interactive chips.
- [ ] Color tokens strictly adhere to **Ocean Breeze** (Sky 600, Sky 500, Slate 900, Slate 50).
- [ ] **Vector Iconography:** Clean vector SVGs or Font Awesome used for all navigation tabs, header actions, buttons, and status indicators (strictly NO raw Unicode emojis in UI code).
- [ ] Status pills match state machine (`pending`, `confirmed`, `declined`, `completed`, `cancelled`) with vector status icons.
- [ ] Feedback indicators (loading spinners, disabled button states) prevent duplicate actions.
