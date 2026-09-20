# MentorLinks — System Flowcharts & Lifecycle State Diagrams

**Project Title:** MentorLinks — Mentorship & Tutoring Matching Mobile Application  
**Tagline:** *"Connect. Learn. Grow."*  
**Document Purpose:** Comprehensive visual flowcharts, decision trees, and state machine diagrams mapping 100% of the end-to-end multi-role workflows across Students, Peer Mentors, Direct Payments, In-App Messaging, Virtual Classroom, Database Triggers, and University Service Hours Accreditation.  
**Target Location:** `docs/system_flowchart.md`  
**Version:** 2.0  

---

## 1. Master End-to-End System Flowchart

```mermaid
flowchart TD
    Start(["User Launches MentorLinks"]) --> Auth{"Authenticated?"}
    Auth -- "No" --> Register["Sign Up / Login (Student vs Mentor Account)"]
    Auth -- "Yes" --> CheckRole{"Active Role in AppContext"}
    Register --> CheckRole

    %% Dual 5-Tab Shell Routing
    CheckRole -- "Student Mode" --> S_Tabs["Student 5 Tabs: Home | Explore | Messages | Sessions | Profile"]
    CheckRole -- "Mentor Mode" --> M_Tabs["Mentor 5 Tabs: Home | Students | Messages | Sessions | Profile"]

    %% Student Discovery & Booking Flow
    S_Tabs --> S_Explore["Explore Tab: Search & Filter Mentors"]
    S_Explore --> S_Profile["View Mentor Profile & Subjects"]
    S_Profile --> S_Book["Book Session: Select Slot & Topic"]
    S_Book --> S_Submit["Submit Request (status: 'pending')"]

    %% Mentor Processing
    S_Submit --> M_Notify["Mentor Receives Request in Home & Sessions Tabs"]
    M_Tabs --> M_Sessions["Sessions Tab: Review Incoming Requests"]
    M_Notify --> M_Sessions

    M_Sessions --> M_Decision{"Mentor Decision"}
    M_Decision -- "Decline" --> M_DeclineReason["Select Reason (Schedule Conflict, etc.)"]
    M_DeclineReason --> S_Declined["status: 'declined', decline_reason set"]

    M_Decision -- "Accept" --> RateCheck{"Session Rate?"}
    RateCheck -- "Paid (₱Rate/hr)" --> S_Pay["Student Transfers via GCash/Maya & Submits Ref #"]
    S_Pay --> M_VerifyPay{"Mentor Verifies Ref # in Payment App"}
    M_VerifyPay -- "Verified" --> ConfirmedSession["status: 'confirmed', payment_status: 'confirmed'"]

    RateCheck -- "Volunteer (₱0.00)" --> ConfirmedSession

    %% Real-time Chat & Virtual Classroom
    ConfirmedSession --> ChatThread["In-App Messaging with Session Shortcut Card"]
    ConfirmedSession --> TimeGate{"10 Mins Before Start?"}
    TimeGate -- "Yes" --> Classroom["Unlock 'Join Session' -> In-App Virtual Classroom"]

    %% Meeting & Completion
    Classroom --> ConductSession["Conduct Call (Video, Audio, Screen Share)"]
    ConductSession --> SaveNotes["Mentor Drafts Notes in SessionNotesPad"]
    SaveNotes --> CompleteSession["Mentor Taps 'End & Complete' (status: 'completed')"]

    %% Post-Session Outcomes
    CompleteSession --> StudentRate["Student Submits 1-5 Star Review -> Recalculates Rating"]
    CompleteSession --> ServiceCheck{"Volunteer Session?"}
    ServiceCheck -- "Yes" --> AutoCredit["DB Trigger: Commit to service_hour_logs & Add Hours"]
    AutoCredit --> ExportCert["Mentor Exports Service Hours Certificate"]
    ServiceCheck -- "No" --> Finalize(["Session Finalized"])
    ExportCert --> Finalize
    StudentRate --> Finalize
```

---

## 2. Student 5-Tab User Journey Flowchart

```mermaid
flowchart TD
    S0(["Student Opens MentorLinks"]) --> S1["Tab 1: Home (Quick Metrics, Next Session, Top Mentors)"]
    S0 --> S2["Tab 2: Explore (Search, Filters by Category/Rate/Level)"]
    S0 --> S3["Tab 3: Messages (1-on-1 Chat with Mentors)"]
    S0 --> S4["Tab 4: Sessions (Upcoming, Completed, Cancelled)"]
    S0 --> S5["Tab 5: Profile (Bio, Learning Progress, Support Tickets)"]

    %% Explore to Booking
    S2 --> S_Select["Select Mentor Card -> Inspect Profile & Reviews"]
    S_Select --> S_PickSlot["Select Available Day & Time Slot"]
    S_PickSlot --> S_Topic["Enter Topic, Homework Prompts & Questions"]
    S_Topic --> S_CreateBooking["Create Booking (status: 'pending')"]

    %% Payment Reference
    S_CreateBooking --> S_PayStep{"Is Paid Session?"}
    S_PayStep -- "Yes" --> S_Transfer["Transfer via GCash/Maya & Enter Ref #"]
    S_Transfer --> S_Submitted["payment_status: 'payment_submitted'"]
    S_PayStep -- "No (Volunteer)" --> S_WaitMentor["Wait for Mentor Confirmation"]
    S_Submitted --> S_WaitMentor

    %% Session Execution
    S_WaitMentor --> S_Confirmed{"Mentor Response"}
    S_Confirmed -- "Accepted" --> S_Ready["Status: Confirmed (Moves to Upcoming)"]
    S_Confirmed -- "Declined" --> S_SeeReason["Status: Declined (Inspect Reason)"]

    S_Ready --> S_JoinClassroom["10 Min Warning -> Tap 'Join Session' -> Classroom"]
    S_JoinClassroom --> S_Attend["Attend Video Session & Takeaways"]
    S_Attend --> S_LeaveReview["Session Completed -> Rate 1-5 Stars & Feedback"]
```

---

## 3. Mentor 5-Tab User Journey Flowchart

```mermaid
flowchart TD
    M0(["Mentor Opens MentorLinks"]) --> M1["Tab 1: Home (2x2 Stats: Earnings, Hours, Rating, Requests)"]
    M0 --> M2["Tab 2: Students (Mentees Roster, Search & Quick Chat)"]
    M0 --> M3["Tab 3: Messages (Direct Chat with Students)"]
    M0 --> M4["Tab 4: Sessions (Upcoming, Requests, Completed)"]
    M0 --> M5["Tab 5: Profile (Schedule Settings, Subjects, Service Hours Summary)"]

    %% Handling Incoming Requests
    M1 --> M_ReqAlert["Tap Pending Request Card"]
    M4 --> M_ReqTab["Select 'Requests' Tab"]
    M_ReqAlert --> M_Inspect["Inspect Topic, Slot, Student Program"]
    M_ReqTab --> M_Inspect

    M_Inspect --> M_Action{"Accept or Decline?"}
    M_Action -- "Decline" --> M_ChooseReason["Select Decline Reason Modal -> Confirm Decline"]
    M_ChooseReason --> M_DeclinedState["status: 'declined', decline_reason committed"]

    M_Action -- "Accept" --> M_CheckPay{"Is Paid Session?"}
    M_CheckPay -- "Paid" --> M_WaitRef["Student Submits GCash/Maya Ref #"]
    M_WaitRef --> M_ConfirmFunds["Verify Funds in Mobile Payment App -> Tap 'Confirm Payment'"]
    M_CheckPay -- "Volunteer (₱0)" --> M_InstantConfirm["Tap 'Accept Booking'"]
    M_ConfirmFunds --> M_SessionConfirmed["status: 'confirmed'"]
    M_InstantConfirm --> M_SessionConfirmed

    %% Virtual Classroom
    M_SessionConfirmed --> M_Classroom["10 Min Countdown -> Launch Virtual Classroom"]
    M_Classroom --> M_Controls["Host Session (Mute, Camera, Screen Share, Meeting Chat)"]
    M_Controls --> M_Notes["Draft Takeaways in SessionNotesPad"]
    M_Notes --> M_Complete["End & Mark Completed (status: 'completed')"]

    %% Automatic Accreditation
    M_Complete --> M_AutoTrigger{"Volunteer Session?"}
    M_AutoTrigger -- "Yes" --> M_Credited["Trigger commits to service_hour_logs & increments total_service_hours"]
    M_Credited --> M_Print["Tab 5: Export Service Hours Certificate (PDF/Print)"]
```

---

## 4. State Machines

### 4.1 Direct Payment Verification State Machine
```mermaid
stateDiagram-v2
    [*] --> unpaid : Paid Booking Created
    unpaid --> payment_submitted : Student transfers funds & enters Ref #
    note right of unpaid : Student cannot confirm payment
    payment_submitted --> payment_submitted : Student updates reference number
    payment_submitted --> confirmed : Mentor verifies funds & taps 'Confirm Payment'
    note right of confirmed : auth.uid() must match tutor_id
    confirmed --> [*]

    [*] --> volunteer_exempt : Session rate is ₱0.00
    volunteer_exempt --> confirmed : Mentor accepts (No payment required)
```

### 4.2 Session Lifecycle State Machine
```mermaid
stateDiagram-v2
    [*] --> pending : Student submits booking
    pending --> confirmed : Mentor accepts (& payment confirmed)
    pending --> declined : Mentor declines (with decline_reason)
    pending --> cancelled : Student cancels pending booking
    confirmed --> in_classroom : 10 mins prior to scheduled start
    in_classroom --> completed : Mentor marks session completed
    in_classroom --> cancelled : Aborted due to technical failure
    completed --> [*] : Triggers: Service Hours Credit + Rating Recalculation
    declined --> [*]
    cancelled --> [*]
```
