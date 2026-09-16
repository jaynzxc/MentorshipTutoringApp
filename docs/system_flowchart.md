# MentorLink — System Flowcharts & Lifecycle State Diagrams

**Project Title:** MentorLink — Mentorship & Tutoring Matching Mobile Application  
**Document Purpose:** Comprehensive visual flowcharts, decision trees, and state machine diagrams mapping 100% of the end-to-end multi-role workflows across Students, Peer Tutors, Direct Payments, Database Triggers, and University Service Hours Accreditation.  
**Target Location:** `docs/system_flowchart.md`  
**Version:** 1.0  

---

## 1. Master End-to-End System Flowchart

This master diagram illustrates the complete bird's-eye lifecycle from user account creation to session completion, study notes, review submission, and university service hours crediting:

```mermaid
flowchart TD
    Start(["User Launches MentorLink"]) --> Auth{"Authenticated?"}
    Auth -- "No" --> Register["Sign Up / Login (High School or College)"]
    Auth -- "Yes" --> CheckRole{"Active Role Mode"}
    Register --> CheckRole

    %% Dual Role Routing
    CheckRole -- "Learner Mode" --> StudentDashboard["Student Home Dashboard"]
    CheckRole -- "Mentor Mode" --> TutorCheck{"is_tutor == true?"}

    TutorCheck -- "No" --> TutorOnboard["Tutor Setup Wizard (Set Bio, Rates, Subjects)"]
    TutorOnboard --> TutorDashboard["Tutor Dashboard"]
    TutorCheck -- "Yes" --> TutorDashboard

    %% Student Discovery & Booking Flow
    StudentDashboard --> Search["Find Tutors (Search & Filter by Subject, Rate, Day)"]
    Search --> ViewProfile["View Mentor Profile & Reviews"]
    ViewProfile --> SelectSlot["Select Weekly Slot (SlotPicker) & Enter Topic"]
    SelectSlot --> SubmitBooking["Submit Booking Request (status: 'pending')"]

    %% Tutor Response & Payment Branching
    SubmitBooking --> TutorNotification["Tutor Receives Booking Notification"]
    TutorDashboard --> ReviewBooking["Review Incoming Bookings"]
    TutorNotification --> ReviewBooking

    ReviewBooking --> TutorDecision{"Accept Booking?"}
    TutorDecision -- "Decline" --> BookingCancelled["Booking Cancelled (status: 'cancelled')"]
    TutorDecision -- "Accept" --> RateCheck{"Hourly Rate?"}

    %% Payment Lifecycle
    RateCheck -- "Paid (₱Rate/hr)" --> UnpaidState["status: 'pending', payment_status: 'unpaid'"]
    UnpaidState --> StudentTransfer["Student Transfers via GCash/Maya & Submits Ref #"]
    StudentTransfer --> RefSubmitted["payment_status: 'payment_submitted'"]
    RefSubmitted --> TutorVerify{"Tutor Verifies Ref in Payment App"}
    TutorVerify -- "Incorrect / Unpaid" --> UnpaidState
    TutorVerify -- "Payment Verified" --> ConfirmPaid["payment_status: 'confirmed', status: 'confirmed'"]

    RateCheck -- "Volunteer (₱0.00)" --> ConfirmVolunteer["status: 'confirmed' (Volunteer Service)"]

    %% Session Execution & Completion
    ConfirmPaid --> AttendSession["Attend 1-on-1 Tutoring Session (Online / In-Person)"]
    ConfirmVolunteer --> AttendSession

    AttendSession --> CompleteSession["Mark Session Completed (status: 'completed')"]

    %% Post-Session Outcomes (Parallel Triggers & Actions)
    CompleteSession --> PostNotes["Tutor Writes Post-Session Study Notes"]
    CompleteSession --> StudentReview["Student Submits 1-5 Star Rating & Review"]
    StudentReview --> TriggerRatings["Server Trigger: Recalculate Tutor Average Rating"]

    CompleteSession --> ServiceHoursCheck{"Was Session Volunteer (₱0)?"}
    ServiceHoursCheck -- "Yes" --> TriggerHours["Server Trigger: Commit to service_hour_logs & Increment Total Hours"]
    TriggerHours --> ExportCert["Tutor Exports / Prints Official Service Hours Certificate"]
    ServiceHoursCheck -- "No" --> EndState(["Session Finalized"])
    ExportCert --> EndState
```

---

## 2. Student (Learner) User Journey Flowchart

Detailed step-by-step decision flow for students seeking academic help:

```mermaid
flowchart TD
    S1(["Student Opens App"]) --> S2["View Home Dashboard (Upcoming Countdown Card)"]
    S2 --> S3["Tap 'Find Tutors' Tab"]
    S3 --> S4["Enter Search Keywords or Tap Subject Chips"]
    S4 --> S5{"Apply Filters?"}
    S5 -- "Yes" --> S6["Filter by Category, Rate Slider (₱0-₱500), or Grade Level"]
    S5 -- "No" --> S7["Browse Tutor Feed (TutorCard items)"]
    S6 --> S7

    S7 --> S8["Tap Tutor Card to Open Full Profile"]
    S8 --> S9["Inspect Bio, Credentials, Rating Breakdown & Student Reviews"]
    S9 --> S10{"Proceed to Book?"}
    S10 -- "No" --> S7
    S10 -- "Yes" --> S11["Tap 'Book Mentorship Session'"]

    S11 --> S12["Select Available Day Chip (SlotPicker)"]
    S12 --> S13["Select 1-Hour Time Window"]
    S13 --> S14["Choose Meeting Type: Online vs In-Person"]
    S14 --> S15["Enter Specific Homework Topic / Questions"]
    S15 --> S16["Review Summary & Submit Request"]

    S16 --> S17["View Request in 'My Sessions' (Pending Tab)"]
    S17 --> S18{"Tutor Accepts?"}
    S18 -- "Declined" --> S19["Booking Cancelled Notification"]
    S18 -- "Accepted" --> S20{"Is Session Paid or Volunteer?"}

    S20 -- "Paid Session" --> S21["View Tutor's GCash/Maya Account Details"]
    S21 --> S22["Transfer Funds via GCash/Maya App"]
    S22 --> S23["Paste Reference Number in MentorLink Form"]
    S23 --> S24["Wait for Tutor Confirmation (payment_submitted)"]
    S24 --> S25["Payment Confirmed Badge (status: 'confirmed')"]

    S20 -- "Volunteer" --> S25

    S25 --> S26["Attend Scheduled Tutoring Session"]
    S26 --> S27["Session Marked Completed"]
    S27 --> S28["Read Tutor's Post-Session Study Notes"]
    S27 --> S29["Rate Session: Select 1-5 Stars & Submit Written Review"]
    S29 --> S30(["Journey Complete"])
```

---

## 3. Peer Tutor (Mentor) User Journey Flowchart

Detailed workflow for student tutors providing mentorship and earning accredited service hours:

```mermaid
flowchart TD
    T1(["Student Taps 'Become a Peer Mentor' / Dual-Role Switcher"]) --> T2{"Already a Tutor?"}
    T2 -- "No" --> T3["Tutor Setup Wizard (Headline, Bio, Teaching Experience)"]
    T3 --> T4["Select Hourly Rate: Volunteer (₱0.00) or Paid (₱Rate/hr)"]
    T4 --> T5["Configure Payment Instructions (if paid)"]
    T5 --> T6["Select Initial Academic Subjects & Grade Levels"]
    T6 --> T7["Activate Mentor Profile (is_tutor: true)"]
    T2 -- "Yes" --> T8["Tutor Dashboard"]
    T7 --> T8

    %% Management Functions
    T8 --> T9{"Select Management Action"}
    T9 -- "Schedule" --> T10["Manage Weekly Schedule (Add/Delete Recurring Time Slots)"]
    T9 -- "Subjects" --> T11["Manage Subjects (Add/Remove Subjects & Grade Levels)"]
    T9 -- "Bookings" --> T12["Incoming Bookings List"]
    T9 -- "Service Hours" --> T13["Service Hours Ledger"]

    %% Booking Processing
    T12 --> T14["Inspect Booking Details (Student, Topic, Meeting Type, Slot)"]
    T14 --> T15{"Accept Booking Request?"}
    T15 -- "Decline" --> T16["Enter Optional Reason & Decline (status: 'cancelled')"]
    T15 -- "Accept" --> T17{"Session Type"}

    T17 -- "Paid" --> T18["Wait for Student Reference Number (payment_status: 'payment_submitted')"]
    T18 --> T19["Check GCash/Maya App for Matching Reference Number"]
    T19 --> T20{"Reference Valid?"}
    T20 -- "No / Unreceived" --> T21["Flag Issue to Student"]
    T20 -- "Yes / Verified" --> T22["Tap '✓ Confirm Payment' (status: 'confirmed')"]

    T17 -- "Volunteer" --> T22

    %% Session Conduct
    T22 --> T23["Conduct Mentorship Session with Student"]
    T23 --> T24["Mark Session as Completed (status: 'completed')"]
    T24 --> T25["Open Session Notes Pad & Save Study Recommendations"]

    %% Automatic Server Crediting
    T24 --> T26{"Was Session Rate ₱0.00?"}
    T26 -- "Yes" --> T27["Database Trigger Commits Hours to service_hour_logs"]
    T27 --> T28["Total Service Hours Automatically Increments on Dashboard"]
    T28 --> T29["Export & Print Official University Service Hours Certificate"]
    T26 -- "No" --> T30["Earnings Added to Tutor Metrics"]

    T29 --> T31(["Tutor Lifecycle Complete"])
    T30 --> T31
```

---

## 4. Direct Payment Verification State Machine

State transitions for the simplified, direct peer-to-peer payment model:

```mermaid
stateDiagram-v2
    [*] --> unpaid : Paid Booking Accepted by Tutor

    unpaid --> payment_submitted : Student transfers via GCash/Maya & enters Ref #
    note right of unpaid : Student cannot edit payment_status directly

    payment_submitted --> payment_submitted : Student updates / corrects reference number
    payment_submitted --> unpaid : Tutor reports invalid reference or non-receipt

    payment_submitted --> confirmed : Assigned Tutor verifies funds & confirms receipt
    note right of confirmed : Only assigned tutor (auth.uid() = tutor_id) can confirm

    confirmed --> [*] : Session proceeds to scheduled time

    %% Volunteer bypass
    [*] --> volunteer_exempt : Session rate is ₱0.00 (Free Volunteer)
    volunteer_exempt --> confirmed : Auto-confirmed (No payment required)
```

---

## 5. Session Lifecycle State Machine

Complete transition rules for tutoring sessions in the `sessions` table:

```mermaid
stateDiagram-v2
    [*] --> pending : Student submits booking request (Slot reserved)

    pending --> confirmed : Tutor accepts booking (and confirms payment if paid)
    pending --> cancelled : Tutor declines request OR Student cancels before acceptance

    confirmed --> in_progress : Scheduled start time reached
    confirmed --> cancelled : Either party cancels prior to start (with notice)

    in_progress --> completed : Session finished (Tutor or Student marks complete)
    in_progress --> cancelled : Session aborted due to no-show / technical failure

    completed --> [*] : Triggers: Service Hours Log + Rating Recalculation + Study Notes
    cancelled --> [*] : Slot released back to tutor schedule
```

---

## 6. University Community Service Hours Accreditation Flow

Shows the tamper-proof server-side database trigger commit for accredited volunteer hours:

```mermaid
sequenceDiagram
    autonumber
    actor Tutor as Peer Mentor (Tutor)
    participant Client as MentorLink Mobile App
    participant DB as Supabase PostgreSQL
    participant Trigger as Trigger: handle_session_completion
    participant Cert as Certificate Generator

    Tutor->>Client: Tap "Mark Session Completed"
    Client->>DB: UPDATE sessions SET status = 'completed' WHERE id = sessionId
    
    rect rgb(240, 243, 255)
        note over DB,Trigger: Server-Side Integrity Check (SECURITY DEFINER)
        DB->>Trigger: Execute handle_session_completion_service_hours()
        Trigger->>DB: Check if hourly_rate == 0.00 AND status == 'completed'
        alt Is Paid Session (hourly_rate > 0)
            Trigger-->>DB: Skip service hours credit
        else Is Volunteer Session (hourly_rate == 0)
            Trigger->>Trigger: Calculate Duration = (end_time - start_time) in hours
            Trigger->>DB: INSERT INTO service_hour_logs (tutor_id, session_id, hours_credited)
            Trigger->>DB: UPDATE tutor_profiles SET total_service_hours = total_service_hours + Duration
        end
    end

    DB-->>Client: Return updated session record & new total_service_hours
    Client-->>Tutor: Display "Session Completed & Hours Accredited!"

    opt Tutor Exports Document
        Tutor->>Client: Tap "View & Print Service Hours Certificate"
        Client->>Cert: Fetch certified records from service_hour_logs
        Cert->>Cert: Generate anti-counterfeit hash (ML-SRV-YYYY-ID-HOURS)
        Cert-->>Tutor: Display official printable A4 certificate with signature lines
    end
```

---

## 7. Flowchart State & Role Consistency Matrix

| Flowchart | Initiating Role | Authorizing Role | Database Table Updated | Security Constraint Enforced |
| :--- | :--- | :--- | :--- | :--- |
| **Tutor Discovery** | Student | Public / Anyone | `tutor_profiles`, `tutor_subjects` | Active tutors only (`is_accepting_students = true`). |
| **Booking Submission** | Student | Student (`auth.uid()`) | `sessions` (`status = 'pending'`) | Anti-self-booking check (`student_id != tutor_id`). |
| **Payment Submission**| Student | Student (`auth.uid()`) | `sessions` (`payment_status = 'payment_submitted'`) | Can only update own session reference number. |
| **Payment Confirmation**| Tutor | Tutor (`auth.uid()`) | `sessions` (`payment_status = 'confirmed'`) | Student **cannot** confirm; only assigned tutor. |
| **Session Completion** | Tutor / Student | Both (`auth.uid()`) | `sessions` (`status = 'completed'`) | State transition requires existing `confirmed` status. |
| **Service Hours Credit**| Automated Trigger | Server (`SECURITY DEFINER`)| `service_hour_logs`, `tutor_profiles` | Zero client inserts permitted; committed strictly via trigger. |
| **Review Submission** | Student | Student (`auth.uid()`) | `reviews` | Unique constraint (`session_id`); completed sessions only. |
| **Rating Recalculation**| Automated Trigger | Server (`SECURITY DEFINER`)| `tutor_profiles.average_rating` | Automated arithmetic average over all reviews. |
