---
name: ui-ux_backend_spec
description: Backend specifications, API query shapes, payload contracts, loading/empty states, and Supabase real-time bindings powering MentorLink UI/UX components. Use when connecting frontend views to Supabase services.
---

# UI/UX Backend Specification Skill (MentorLink)

## Goal

Provide a concrete, standardized contract between the **React Mobile UI Components** and the **Supabase Backend Services** for **MentorLink**. This ensures frontend developers and AI agents know the exact data shapes, queries, mutations, loading states, and error handling required for every screen.

> [!NOTE]
> **Status: Aligned with Ongoing Planning Phase**  
> This specification matches our current architecture, schema, and brainstorming foundations. As your team finalizes specific Figma layouts, visual fields, and wireframes, this specification will be revised to reflect the final UI inputs and outputs.

---

## 1. Architectural Service Pattern

All UI components interact with Supabase through a centralized, modular service layer located in `src/services/`. Direct database calls inside React UI components are prohibited.

```
┌───────────────────────────────┐
│     React Mobile UI Screen    │
│  - Loading Skeleton / State   │
│  - Form inputs & Touch events │
└──────────────┬────────────────┘
               │ Calls service function
               ▼
┌───────────────────────────────┐
│     src/services/*.js         │  <-- Standardized contract { data, error }
│  - Query building & filtering │
│  - Payload sanitization       │
└──────────────┬────────────────┘
               │ Supabase JS SDK (HTTPS / WSS)
               ▼
┌───────────────────────────────┐
│   Supabase PostgreSQL & RLS   │
└───────────────────────────────┘
```

### Standard Service Response Convention
Every service function returns a standardized promise resolving to:
```javascript
{
  data: any | null,
  error: { message: string, code?: string } | null
}
```

---

## 2. Screen-by-Screen Backend Specifications

### Screen 1: Tutor Discovery & Search (`FindTutorScreen.jsx`)

* **UI Purpose:** Search bar, subject category chips, grade level selector, rate filters, and infinite-scrolling tutor cards.
* **Backend Function:** `tutorService.searchTutors(filters, page = 1, pageSize = 10)`
* **Supabase Query:**
  ```javascript
  let query = supabase
    .from('tutor_profiles')
    .select(`
      tutor_id,
      hourly_rate,
      headline,
      average_rating,
      completed_sessions_count,
      is_accepting_students,
      profiles:tutor_id (
        full_name,
        avatar_url,
        school_name,
        education_level
      ),
      tutor_subjects!inner (
        id,
        subject_name,
        category,
        grade_level
      )
    `)
    .eq('is_accepting_students', true);
  ```
* **Payload / Filters from UI:**
  ```json
  {
    "searchQuery": "calculus",
    "gradeLevel": "college",
    "isVolunteerOnly": false,
    "maxRate": 250.00
  }
  ```
* **UI State Requirements:**
  * `isLoading`: Render 3 animated mobile skeleton cards (`animate-pulse`).
  * `isEmpty`: Display illustration + *"No tutors found for 'Calculus'. Try clearing your filters."*
  * `isError`: Show error banner with a *"Tap to retry"* button.

---

### Screen 2: Tutor Profile & Slot Picker (`TutorProfileScreen.jsx`, `SlotPickerModal.jsx`)

* **UI Purpose:** Tutor bio, credentials, list of subjects taught, student reviews, and weekly calendar slot picker.
* **Backend Functions:**
  * `tutorService.getTutorDetails(tutorId)`
  * `tutorService.getTutorAvailability(tutorId, selectedDate)`
* **Output Data Contract to UI:**
  ```json
  {
    "tutor_id": "uuid",
    "full_name": "Maria Santos",
    "school_name": "College of Engineering",
    "education_level": "college",
    "headline": "Junior BS Math | Calculus & Physics Tutor",
    "hourly_rate": 150.00,
    "total_service_hours": 14.5,
    "average_rating": 4.9,
    "completed_sessions_count": 18,
    "subjects": [
      { "id": "uuid-1", "subject_name": "Calculus 1", "category": "Math" },
      { "id": "uuid-2", "subject_name": "General Physics", "category": "Science" }
    ],
    "availableSlots": [
      { "time": "09:00", "end_time": "10:00", "isBooked": false },
      { "time": "10:00", "end_time": "11:00", "isBooked": true }
    ],
    "recentReviews": [
      { "student_name": "John D.", "rating": 5, "comment": "Explains derivatives very clearly!" }
    ]
  }
  ```
* **UI State Requirements:**
  * Booked slots rendered disabled (`opacity-40 cursor-not-allowed`).
  * Selected slot highlighted in active brand color (`bg-indigo-600 text-white`).

---

### Screen 3: Booking Initiation & Direct Payment (`BookSessionScreen.jsx`)

* **UI Purpose:** Student selects topic/homework prompt, picks online meeting or campus room, reviews payment total, and enters direct payment reference.
* **Backend Functions:**
  1. `sessionService.createBooking(bookingPayload)`
  2. `sessionService.submitPaymentReference(sessionId, referenceNumber)`
* **Step 1 — Create Booking Payload (from UI):**
  ```json
  {
    "tutor_id": "uuid",
    "subject_id": "uuid",
    "scheduled_start": "2026-09-20T10:00:00+08:00",
    "scheduled_end": "2026-09-20T11:00:00+08:00",
    "duration_hours": 1.0,
    "meeting_type": "online",
    "meeting_link_or_location": "Google Meet",
    "session_topic": "Chain Rule & Implicit Differentiation HW",
    "payment_type": "direct_pay",
    "payment_amount": 150.00,
    "counts_toward_service_hours": false
  }
  ```
* **Step 2 — Submit Payment Reference Payload (from UI):**
  ```json
  {
    "sessionId": "uuid",
    "payment_reference": "GCASH-98410284"
  }
  ```
* **Backend Transition:** Updates `payment_status` from `unpaid` to `payment_submitted`.
* **UI Feedback:** Modal confirms submission: *"Payment reference submitted. Tutor will verify and confirm your session!"*

---

### Screen 4: My Sessions Dashboard (`MySessionsScreen.jsx`, `SessionCard.jsx`)

* **UI Purpose:** Tabs for `Upcoming`, `Pending`, and `Completed` sessions for both Student and Tutor.
* **Backend Function:** `sessionService.getUserSessions(role = 'student', statusFilter = 'upcoming')`
* **Data Contract to UI:**
  ```json
  [
    {
      "id": "session-uuid",
      "subject_name": "Calculus 1",
      "scheduled_start": "2026-09-20T10:00:00+08:00",
      "scheduled_end": "2026-09-20T11:00:00+08:00",
      "status": "confirmed",
      "payment_status": "confirmed",
      "payment_amount": 150.00,
      "meeting_type": "online",
      "meeting_link_or_location": "https://meet.google.com/abc-defg-hij",
      "session_topic": "Chain Rule Review",
      "other_party": {
        "id": "uuid",
        "full_name": "Maria Santos",
        "avatar_url": "...",
        "school_name": "Engineering Dept"
      },
      "session_notes": "Reviewed implicit differentiation. Next: Related Rates."
    }
  ]
  ```
* **Tutor Action Handlers:**
  * `sessionService.confirmPaymentAndAccept(sessionId)` $\rightarrow$ `status = 'confirmed'`, `payment_status = 'confirmed'`.
  * `sessionService.markSessionCompleted(sessionId)` $\rightarrow$ `status = 'completed'`.

---

### Screen 5: Post-Session Notes Pad (`SessionNotesPad.jsx`)

* **UI Purpose:** Slide-up drawer or full-screen editor where tutor records key study takeaways and homework review for the student.
* **Backend Function:** `sessionService.updateSessionNotes(sessionId, notesText)`
* **Payload:** `{ "sessionId": "uuid", "session_notes": "Covered 5 derivative exercises..." }`
* **UI Feedback:** Toast alert: *"Session notes saved successfully."* Student can view read-only in their session history.

---

### Screen 6: University Community Service Hours (`ServiceHoursScreen.jsx`)

* **UI Purpose:** Tutor dashboard view displaying accredited volunteer hours, verified log entries, and an export button for school accreditation.
* **Backend Function:** `serviceHourService.getTutorServiceHours(tutorId)`
* **Data Contract to UI:**
  ```json
  {
    "total_accredited_hours": 24.0,
    "logs": [
      {
        "id": "log-uuid",
        "session_id": "session-uuid",
        "subject_name": "Basic Programming",
        "hours_credited": 2.0,
        "verified_at": "2026-09-18T14:30:00+08:00",
        "student_name": "Carlos Gomez",
        "school_name": "High School Dept"
      }
    ]
  }
  ```
* **Export Payload:** Generates a clean, print-friendly browser document containing student name, academic terms, dates, subject, hours, and signature line for the University Community Engagement Office.

---

### Screen 7: Peer Review & Rating Modal (`RateSessionModal.jsx`)

* **UI Purpose:** 5-star interactive rating picker + optional feedback text field shown after session completion.
* **Backend Function:** `reviewService.submitReview(reviewPayload)`
* **Payload:**
  ```json
  {
    "session_id": "uuid",
    "tutor_id": "uuid",
    "rating": 5,
    "comment": "Very helpful and on time!"
  }
  ```
* **Backend Trigger:** Automatically updates `average_rating` and increments `completed_sessions_count` in `tutor_profiles`.
* **UI Feedback:** Close modal $\rightarrow$ session card reflects "Reviewed ⭐ 5/5".

---

### Screen 8: Dual-Role Mode Switcher & Profile (`ProfileScreen.jsx`)

* **UI Purpose:** Switch between **Learner Mode** and **Mentor Dashboard**, manage profile info, or register as a peer tutor.
* **Backend Functions:**
  * `authService.getCurrentUserProfile()`
  * `tutorService.registerAsTutor(tutorSetupPayload)`
* **State Contract:**
  ```json
  {
    "id": "user-uuid",
    "full_name": "Alex Cruz",
    "is_tutor": true,
    "active_mode": "student" // or "tutor" (stored in React AppContext)
  }
  ```

---

## 3. Real-Time Synchronization Specs

To provide a native, responsive mobile experience without manual pull-to-refresh:

1. **Session Status Channel:**
   * Subscribe to changes on `sessions` filtered by user:
     ```javascript
     supabase
       .channel(`user-sessions-${userId}`)
       .on('postgres_changes', {
         event: 'UPDATE',
         schema: 'public',
         table: 'sessions',
         filter: `student_id=eq.${userId}`
       }, (payload) => {
         // Auto-update UI when tutor confirms booking or payment
         updateSessionState(payload.new);
       })
       .subscribe();
     ```
2. **Tutor Incoming Requests Channel:**
   * Tutors listen to new incoming booking requests (`event: 'INSERT'`).

---

## 4. Developer & Agent Implementation Rules

1. **Keep UI Decoupled:** Components only read props/hooks and emit events. All Supabase calls live inside `src/services/`.
2. **Handle All 3 Core States:** Every query-dependent screen must explicitly implement **Loading**, **Empty**, and **Error** states.
3. **Optimistic Updates Where Appropriate:** For session notes and rating submissions, update the local React state immediately for instant feedback, reverting if the API returns an error.
4. **Coordinate with UI/UX Design Iterations:** When the design team introduces new wireframes or fields, update this document and the corresponding `src/services/` contracts first before writing UI code.
