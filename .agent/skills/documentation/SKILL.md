---
name: documentation
description: Write academic technical documentation for MentorLink (Mentorship & Tutoring Matching Application) including module descriptions, workflows, mobile system architecture, methodology, and implementation documentation. Use for capstone documentation and technical writing.
---

# Documentation Skill (MentorLink)

## Goal

Produce rigorous, standardized, and professional academic technical documentation for **MentorLink — Mentorship & Tutoring Matching Application** suitable for capstone project manuscripts, defense presentations, architecture briefs, and developer manuals.

---

## 1. Documentation Principles & Standards

1. **Academic Tone & Objectivity:** Use formal academic English. Maintain an objective, third-person perspective (e.g., *"The application enables students to..."* rather than *"I built..."* or *"We developed..."*).
2. **Authority & Scope Consistency:** All technical descriptions must strictly adhere to the confirmed project specifications:
   * **Target Audience:** High school and college students.
   * **Form Factor:** Pure mobile application (packaged as an Android APK via Capacitor & Android Studio) paired with a companion APK download website.
   * **Technology Stack:** React.js (Vite), Tailwind CSS, JavaScript (ES6+), Supabase (PostgreSQL & Auth).
   * **Monetization & Economics:** Direct-pay session fee model only (or ₱0 for volunteer) with transparent status tracking.
   * **Non-Monetary Incentive:** University Community Service Hours Accreditation (verifiable logging and printable summary for academic service credit).
   * **Explicit Exclusions:** No AI wrappers, no browser-only fallback for the app, no complex barter/tokens.
3. **Zero Hallucination / No Phantom Features:** Document only implemented or confirmed features. Never invent database tables, third-party payment gateways, or APIs that do not exist.
4. **Strict Demarcation of Assumptions:** Any external operational assumptions (e.g., Android OS version requirements, network connectivity, campus WiFi) must be explicitly isolated under an **"Assumptions & Limitations"** heading.
5. **Clear Actor Definitions:**
   * **Student (Learner):** Discovers peer tutors, schedules sessions, provides direct payment reference, attends sessions, and leaves ratings/reviews.
   * **Peer Tutor (Mentor):** Lists qualified subjects, defines weekly availability and hourly rates, confirms bookings/payments, records session notes, and exports accredited community service hours.

---

## 2. Standard Capstone Documentation Structures

### Structure A: Module Technical Specification
Use this structure when documenting an individual system module (e.g., Tutor Discovery & Matching, Direct-Pay Booking, Session Notes, Community Service Hours Accreditation):

1. **Module Title & Overview:** High-level description, educational significance, and problem addressed.
2. **Objectives:** Specific measurable outcomes of the module for students and peer mentors.
3. **Actor Roles & Permissions:** Clear matrix of capabilities for Student vs. Tutor roles.
4. **Functional Workflow & Process:** Step-by-step lifecycle from initial interaction to completion.
5. **System Architecture & Data Flow:** Mermaid flowchart or sequence diagram depicting mobile UI to Supabase database interactions.
6. **Database Schema & RLS Policies:** Tables accessed, foreign keys, queries executed, and row-level security constraints.
7. **Security, Validation & Integrity:** Input validation, role authorization guards, payment status integrity, and anti-tamper measures.
8. **Limitations & Future Work:** Acknowledged operational constraints and proposed future expansions.

### Structure B: System Architecture & Methodology Chapter
Use this structure when writing or revising major manuscript chapters (e.g., Chapter 3 Methodology / System Architecture):

1. **System Overview:** Architectural summary (React.js, Tailwind CSS, Capacitor Android native wrapper, Supabase PostgreSQL).
2. **Mobile App Design & Ergonomics:** Mobile viewport guidelines (360px–430px), bottom navigation patterns, touch targets ($\ge 44\text{px}$), and safe-area insets.
3. **Mobile Compilation & Distribution Workflow:** Vite build pipeline $\rightarrow$ Capacitor Android sync $\rightarrow$ Android Studio APK generation $\rightarrow$ Companion Download Landing Page.
4. **Database & Security Architecture:** Entity-relationship diagrams, Row Level Security (RLS), and single-session authorization.
5. **End-to-End Sequence Diagrams:** Inter-role synchronization flows (e.g., Booking request $\rightarrow$ Tutor notification $\rightarrow$ Payment confirmation $\rightarrow$ Session completion $\rightarrow$ Service hour accreditation).
6. **Data Dictionary:** Formal schema tables, column types, keys, and constraint definitions.

---

## 3. Formatting & Diagram Guidelines

* **Mermaid Visualizations:** Always use valid Mermaid syntax for sequence diagrams and flowcharts:
  ```mermaid
  sequenceDiagram
      actor Student
      participant App as "MentorLink Mobile App"
      participant DB as "Supabase PostgreSQL"
      actor Tutor

      Student->>App: Book Session (Select Slot & Topic)
      App->>DB: INSERT into sessions (status: pending)
      DB-->>Tutor: Booking Notification
      Student->>App: Submit Direct Payment Reference
      App->>DB: UPDATE payment_status = payment_submitted
      Tutor->>App: Confirm Payment & Accept Booking
      App->>DB: UPDATE status = confirmed, payment_status = confirmed
  ```
* **Data Precision:** Use markdown tables for data dictionaries, RLS permissions, and feature comparisons.
* **File References:** Use clickable markdown links formatted as `[filename](file:///path/to/file)` when referencing project files.

---

## 4. Required Output Checklist

When generating documentation:
- [ ] Confirmed project title: **MentorLink — Mentorship & Tutoring Matching Application**.
- [ ] Technology stack accurately represented: React.js, Tailwind CSS, JavaScript (ES6+), Capacitor, Android Studio, Supabase.
- [ ] Direct pay and University Community Service Hours accreditation properly detailed.
- [ ] Pure mobile application format maintained (no web browser fallback for the core app).
- [ ] Database tables match confirmed schema (`profiles`, `tutor_profiles`, `tutor_subjects`, `tutor_availability`, `sessions`, `service_hour_logs`, `reviews`).
