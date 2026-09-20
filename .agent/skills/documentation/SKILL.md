---
name: documentation
description: Write academic technical documentation for MentorLinks (Mentorship & Tutoring Matching Application) including module descriptions, workflows, mobile system architecture, methodology, and implementation documentation. Use for capstone documentation and technical writing.
---

# Documentation Skill (MentorLinks)

## Goal

Produce rigorous, standardized, and professional academic technical documentation for **MentorLinks — Mentorship & Tutoring Matching Application** (*"Connect. Learn. Grow."*) suitable for capstone project manuscripts, defense presentations, architecture briefs, and developer manuals.

---

## 1. Documentation Principles & Standards

1. **Academic Tone & Objectivity:** Use formal academic English. Maintain an objective, third-person perspective (e.g., *"The application enables students to..."* rather than *"I built..."* or *"We developed..."*).
2. **Authority & Scope Consistency:** All technical descriptions must strictly adhere to the confirmed project specifications:
   * **Application Title:** MentorLinks — Mentorship & Tutoring Matching Mobile Application (*"Connect. Learn. Grow."*).
   * **Target Audience:** High school and college students.
   * **Form Factor:** Pure mobile application (packaged as an Android APK via Capacitor & Android Studio) paired with a companion APK download website.
   * **Styling System:** Tailwind CSS v4 using the **Ocean Breeze** design tokens (`#0284c7`, `#0ea5e9`, `#06b6d4`, `#0f172a`, `#f8fafc`).
   * **Navigation:** Dual 5-Tab Navigation Architecture:
     - Student: `Home`, `Explore`, `Messages`, `Sessions`, `Profile`.
     - Mentor: `Home`, `Students`, `Messages`, `Sessions`, `Profile`.
   * **Divided Flow Specifications:** Reference [`docs/student_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/student_flow_spec.md) and [`docs/mentor_flow_spec.md`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/docs/mentor_flow_spec.md) for role-specific flows.
   * **Core Interactive Features:** In-App Real-time Messaging and In-App Virtual Classroom (video, audio, screen share, meeting notes).
   * **Economics & Incentives:** Direct-pay session fee model (or ₱0.00 for volunteer) with transparent status tracking and University Community Service Hours Accreditation.
3. **Zero Hallucination / No Phantom Features:** Document only implemented or confirmed features. Never invent database tables, external payment gateways, or APIs that do not exist.
4. **Strict Demarcation of Assumptions:** Any external operational assumptions (e.g., Android OS version requirements, network connectivity, campus WiFi) must be explicitly isolated under an **"Assumptions & Limitations"** heading.

---

## 2. Standard Capstone Documentation Structures

### Structure A: Module Technical Specification
Use this structure when documenting an individual system module (e.g., Explore & Matching, Direct-Pay Booking, Virtual Classroom, In-App Messaging, Community Service Hours Accreditation):

1. **Module Title & Overview:** High-level description, educational significance, and problem addressed.
2. **Objectives:** Specific measurable outcomes of the module for students and peer mentors.
3. **Actor Roles & Permissions:** Clear matrix of capabilities for Student vs. Mentor roles.
4. **Functional Workflow & Process:** Step-by-step lifecycle from initial interaction to completion.
5. **System Architecture & Data Flow:** Mermaid flowchart or sequence diagram depicting mobile UI to Supabase database interactions.
6. **Database Schema & RLS Policies:** Tables accessed, foreign keys, queries executed, and row-level security constraints.
7. **Security, Validation & Integrity:** Input validation, role authorization guards, payment status integrity, and anti-tamper measures.
8. **Limitations & Future Work:** Acknowledged operational constraints and proposed future expansions.

### Structure B: System Architecture & Methodology Chapter
Use this structure when writing or revising major manuscript chapters (e.g., Chapter 3 Methodology / System Architecture):

1. **System Overview:** Architectural summary (React.js, Tailwind CSS v4 Ocean Breeze, Capacitor Android native wrapper, Supabase PostgreSQL).
2. **Mobile App Design & Ergonomics:** Mobile viewport guidelines ($360\text{px}$–$430\text{px}$), 5-tab navigation patterns, touch targets ($\ge 44\text{px}$), and safe-area insets.
3. **Mobile Compilation & Distribution Workflow:** Vite build pipeline $\rightarrow$ Capacitor Android sync $\rightarrow$ Android Studio APK generation $\rightarrow$ Companion Download Landing Page.
4. **Database & Security Architecture:** Entity-relationship diagrams (11 tables), Row Level Security (RLS), and single-session authorization.
5. **End-to-End Sequence Diagrams:** Inter-role synchronization flows (e.g., Booking request $\rightarrow$ Mentor notification $\rightarrow$ Payment confirmation / Decline with reason $\rightarrow$ Virtual Classroom $\rightarrow$ Session completion $\rightarrow$ Service hour accreditation).
6. **Data Dictionary:** Formal schema tables, column types, keys, and constraint definitions.

---

## 3. Required Output Checklist

When generating documentation:
- [ ] Confirmed project title: **MentorLinks — Mentorship & Tutoring Matching Application** (*"Connect. Learn. Grow."*).
- [ ] Technology stack accurately represented: React.js, Tailwind CSS v4 (Ocean Breeze), JavaScript (ES6+), Capacitor, Android Studio, Supabase.
- [ ] Dual 5-tab navigation and divided role specifications referenced.
- [ ] Direct pay, In-App Messaging, Virtual Classroom, and University Community Service Hours accreditation properly detailed.
- [ ] Pure mobile application format maintained (no web browser fallback for the core app).
- [ ] Database tables match confirmed 11-table schema (`profiles`, `tutor_profiles`, `tutor_subjects`, `tutor_availability`, `sessions`, `service_hour_logs`, `reviews`, `conversations`, `messages`, `support_tickets`, `notification_preferences`).
