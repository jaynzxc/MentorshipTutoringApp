---
name: ui-ux_backend_spec
description: Backend specifications, API query shapes, payload contracts, loading/empty states, and Supabase real-time bindings powering MentorLinks UI/UX components. Use when connecting frontend views to Supabase services.
---

# UI/UX Backend Specification Skill (MentorLinks)

## Goal

Provide a standardized contract between the **React Mobile UI Components** (5-tab dual architecture, Ocean Breeze theme) and the **Supabase Backend Services** for **MentorLinks — Mentorship & Tutoring Matching Application** (*"Connect. Learn. Grow."*).

---

## 1. Architectural Service Pattern

All UI components interact with Supabase through a centralized service layer located in `src/services/`. Direct database calls inside React UI components are prohibited.

```
┌────────────────────────────────┐
│     React Mobile UI Screen     │
│  - Ocean Breeze design tokens  │
│  - Loading Skeleton / State    │
│  - Form inputs & Touch events  │
└───────────────┬────────────────┘
                │ Calls service function
                ▼
┌────────────────────────────────┐
│      src/services/*.js         │  <-- Standardized contract { data, error }
│  - Query building & filtering  │
│  - Payload sanitization        │
└───────────────┬────────────────┘
                │ Supabase JS SDK (HTTPS / WSS Realtime)
                ▼
┌────────────────────────────────┐
│   Supabase PostgreSQL & RLS    │
└────────────────────────────────┘
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

## 2. Screen-by-Screen Query Shapes & Contracts

### Student Tab 1: Home Overview (`StudentHomeScreen.jsx`)
* **Service Method:** `sessionService.getStudentHomeOverview(studentId)`
* **Data Contract:**
  ```json
  {
    "stats": { "total_sessions": 8, "active_mentors": 3, "hours_learned": 12.0 },
    "next_session": {
      "id": "session-uuid",
      "mentor_name": "Maria Santos",
      "mentor_avatar": "...",
      "subject": "Calculus 1",
      "scheduled_start": "2026-09-20T14:00:00+08:00",
      "status": "confirmed",
      "can_join": true
    },
    "recommended_mentors": [
      {
        "tutor_id": "mentor-uuid",
        "name": "David Reyes",
        "headline": "BS CS Senior | Python & DSA Mentor",
        "rate": 0.00,
        "is_volunteer": true,
        "rating": 4.95,
        "sessions_count": 28
      }
    ]
  }
  ```

### Student Tab 2: Explore Mentors (`ExploreScreen.jsx`)
* **Service Method:** `tutorService.searchMentors(filters, page = 1, pageSize = 10)`
* **Filters Payload:**
  ```json
  {
    "query": "algebra",
    "category": "Math",
    "maxRate": 200,
    "isVolunteerOnly": false,
    "gradeLevel": "college",
    "sortBy": "rating_desc"
  }
  ```

### Dual Tab 3: Messages & Conversations (`MessagesScreen.jsx`, `ChatDetailScreen.jsx`)
* **Service Methods:**
  * `messageService.getConversations(userId)`
  * `messageService.getMessages(conversationId)`
  * `messageService.sendMessage({ conversationId, senderId, text, sessionId })`
* **Message Object Contract:**
  ```json
  {
    "id": "msg-uuid",
    "conversation_id": "conv-uuid",
    "sender_id": "user-uuid",
    "message_text": "Looking forward to our session at 2 PM!",
    "session_id": "session-uuid-optional",
    "is_read": true,
    "created_at": "2026-09-20T11:45:00+08:00"
  }
  ```

### Dual Tab 4: Sessions Management
* **Student Sessions:** `sessionService.getStudentSessions(studentId, filter)`
  * Filter: `'upcoming' | 'completed' | 'cancelled'`
* **Mentor Sessions:** `sessionService.getMentorSessions(mentorId, filter)`
  * Filter: `'upcoming' | 'requests' | 'completed'`
* **Action Handlers:**
  * `sessionService.submitPaymentReference(sessionId, referenceNumber)`
  * `sessionService.acceptBooking(sessionId)` $\rightarrow$ updates `status = 'confirmed'`, `payment_status = 'confirmed'`
  * `sessionService.declineBooking(sessionId, declineReason)` $\rightarrow$ updates `status = 'declined'`, `decline_reason = declineReason`
  * `sessionService.markSessionCompleted(sessionId, sessionNotes)` $\rightarrow$ triggers server-side community service hours auto-credit.

### Dual Tab 5: Profile & Settings
* **Student Profile:** `authService.getStudentProfile(studentId)`
  * Includes `learning_interests`, `learning_progress` metrics, and `notification_preferences`.
* **Mentor Profile:** `tutorService.getMentorProfile(mentorId)`
  * Includes `total_service_hours`, `hourly_rate`, `availability_slots`, `service_hour_logs`.
* **Export Accreditation:** `reportService.generateServiceHoursSummary(mentorId)`
  * Returns formatted data structure for print/PDF export for University Community Engagement Offices.

---

## 3. In-App Virtual Classroom Specifications (`VirtualClassroomScreen.jsx`)

* **Access Guard:** Can only be joined when `status = 'confirmed'` AND current time is within **10 minutes** before `scheduled_start` through `scheduled_end + 30 minutes`.
* **Meeting Payload:**
  ```json
  {
    "sessionId": "session-uuid",
    "currentUserRole": "student",
    "meetingState": {
      "micMuted": false,
      "cameraOn": true,
      "screenSharing": false
    }
  }
  ```
* **Notes Drawer:** Tutors can draft real-time study pointers that commit directly to `sessions.session_notes` upon call termination.

---

## 4. Real-Time Supabase Bindings

1. **Messages Channel:**
   ```javascript
   supabase
     .channel(`conversation-${conversationId}`)
     .on('postgres_changes', {
       event: 'INSERT',
       schema: 'public',
       table: 'messages',
       filter: `conversation_id=eq.${conversationId}`
     }, (payload) => {
       appendNewMessage(payload.new);
     })
     .subscribe();
   ```
2. **Session Status Channel:**
   * Automatically reflects when a mentor confirms, declines, or completes a booking.
