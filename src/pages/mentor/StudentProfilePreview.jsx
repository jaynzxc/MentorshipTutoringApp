import React, { useState } from 'react';

/**
 * Student Profile — Mentor View (`StudentProfilePreview.jsx`)
 * Designed to mirror the exact aesthetic, hero architecture, centered avatar,
 * metric pill strips, and card layout of MentorProfileScreen.jsx.
 * Strictly uses vector SVGs — zero raw emojis in UI.
 */
export default function StudentProfilePreview({
  student,
  onBack,
  onMessageStudent,
  onViewSession,
}) {
  // Fallback defaults if minimal student object passed
  const s = {
    id: student?.id || 'std-1',
    name: student?.name || 'Daniela Gonzales',
    course: student?.course || 'BS Information Technology',
    yearLevel: student?.yearLevel || '3rd Year Student',
    school: student?.school || 'Bestlink College of the Philippines',
    initials: student?.initials || 'DG',
    avatarBg: student?.avatarBg || 'bg-sky-600',
    bio:
      student?.bio ||
      'BSIT student passionate about modern web development, frontend frameworks, UI design, and problem solving. Currently preparing for midterm coding assessments.',
    interests: student?.interests || [
      'Web Development',
      'JavaScript & React',
      'UI/UX Design',
      'Database & SQL',
    ],
    sessionsCount: student?.sessionsCount || 3,
    totalHours: student?.totalHours || '4.5 hrs',
    lastSession: student?.lastSession || 'Sept 18, 2026',
    hasUpcoming: student?.hasUpcoming ?? true,
    upcomingSession: student?.upcomingSession || {
      id: 'sess-101',
      topic: 'JavaScript Functions, parameters, and return values',
      date: 'Sept 25, 2026',
      time: '7:00 PM – 8:00 PM',
      format: 'Online Room',
    },
  };

  // Past Sessions History Log with this mentor
  const pastSessions = [
    {
      id: 'past-1',
      date: 'Sept 18, 2026',
      topic: 'Mobile-first Wireframing and Auto Layout in Figma',
      duration: '60 min',
      format: 'Online',
      rating: 5.0,
    },
    {
      id: 'past-2',
      date: 'Sept 10, 2026',
      topic: 'JavaScript Array Methods & DOM Manipulation',
      duration: '60 min',
      format: 'Online',
      rating: 5.0,
    },
    {
      id: 'past-3',
      date: 'Sept 03, 2026',
      topic: 'Introduction to Modern Web Development & HTML/CSS Standards',
      duration: '90 min',
      format: 'Online',
      rating: 5.0,
    },
  ];

  // Mentor Private Notes Pad State
  const [mentorNotes, setMentorNotes] = useState(
    'Daniela grasps concepts quickly, especially in component structuring and JS syntax. Recommend continuing practice with async JavaScript and balancing algorithms before midterms.'
  );
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    showToast('Observation notes updated successfully.');
  };

  return (
    <div className="space-y-4 animate-fade-in relative pb-28">
      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 max-w-md mx-auto z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center justify-between animate-slide-down">
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <p className="text-xs font-medium leading-tight">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* 1. Header with Back Button and Status Badge */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 pt-1">
        <button
          onClick={onBack}
          className="touch-target inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 active:scale-95 transition-all"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <span>Back</span>
        </button>

        <h1 className="text-sm font-bold text-slate-900 tracking-tight">Student Profile</h1>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Mentee</span>
        </span>
      </div>

      {/* 2. Hero Profile Section (Matching MentorProfileScreen layout) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs text-center space-y-3 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-sky-500/10 pointer-events-none" />

        {/* Large Avatar */}
        <div className="relative pt-2">
          <div
            className={`w-20 h-20 rounded-full ${s.avatarBg} text-white font-bold text-2xl mx-auto flex items-center justify-center shadow-md ring-4 ring-white shrink-0`}
          >
            {s.initials}
          </div>
        </div>

        {/* Name & Headline */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {s.name}
            </h2>
            <svg className="w-4 h-4 text-sky-600 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified Student">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-slate-600">
            {s.course} · {s.yearLevel}
          </p>
          <p className="text-[11px] text-slate-400 font-medium">
            {s.school}
          </p>
        </div>

        {/* Rating & Sessions Metric Strip */}
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            <span>5.0 Mentee Rating</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1 text-slate-600">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <span>{s.sessionsCount} Sessions</span>
          </div>
          <span className="text-slate-300">·</span>
          <span className="text-sky-700 font-bold">
            {s.totalHours}
          </span>
        </div>

        {/* Verified Badge pill */}
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-bold border border-sky-200">
            <svg className="w-3.5 h-3.5 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Verified Student Mentee
          </span>
        </div>

        {/* PROMINENT HERO ACTION BUTTONS (Matching MentorProfileScreen) */}
        <div className="pt-2 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onMessageStudent && onMessageStudent(s)}
            className="touch-target flex-1 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3 px-4 rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.943l.878-2.635C4.249 15.918 3 14.07 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <span>Message</span>
          </button>

          {s.hasUpcoming && s.upcomingSession ? (
            <button
              type="button"
              onClick={() => onViewSession && onViewSession(s.upcomingSession)}
              className="touch-target flex-1 bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold py-3 px-3 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 border border-slate-200 shadow-xs"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span>View Session</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="touch-target px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all active:scale-95 border border-slate-200 shadow-xs"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* 3. About Mentee Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About Mentee</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-normal">{s.bio}</p>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Degree Program</span>
            <span className="font-semibold text-slate-800 mt-0.5 block truncate">{s.course}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Year Level</span>
            <span className="font-semibold text-slate-800 mt-0.5 block truncate">{s.yearLevel}</span>
          </div>
        </div>
      </div>

      {/* 4. Learning Interests & Goals Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Learning Interests & Goals</h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {s.interests.map((interest, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200/80 px-3 py-1.5 rounded-xl shadow-2xs"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Scheduled Upcoming Session Card (Matching MentorSessionCard) */}
      {s.hasUpcoming && s.upcomingSession && (
        <div className="bg-gradient-to-br from-sky-50 via-white to-cyan-50 border border-sky-200 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span>Scheduled Upcoming Session</span>
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              CONFIRMED
            </span>
          </div>

          <div className="space-y-0.5 bg-white/80 rounded-2xl p-3.5 border border-sky-100">
            <p className="text-xs font-bold text-slate-900">{s.upcomingSession.topic}</p>
            <p className="text-[11px] text-slate-600 font-medium">
              {s.upcomingSession.date} · {s.upcomingSession.time} ({s.upcomingSession.format})
            </p>
          </div>

          <button
            type="button"
            onClick={() => onViewSession && onViewSession(s.upcomingSession)}
            className="touch-target w-full bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold py-2.5 rounded-2xl transition-all shadow-2xs flex items-center justify-center gap-1"
          >
            <span>View Session Details</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}

      {/* 6. Mentoring History with You Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Mentoring History with You</h3>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-500 font-semibold block">Completed</span>
            <span className="text-base font-extrabold text-slate-900 mt-0.5 block">{s.sessionsCount}</span>
            <span className="text-[10px] text-slate-400">Sessions</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-500 font-semibold block">Duration</span>
            <span className="text-base font-extrabold text-slate-900 mt-0.5 block">{s.totalHours}</span>
            <span className="text-[10px] text-slate-400">Mentored</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-500 font-semibold block">Last Call</span>
            <span className="text-[11px] font-bold text-slate-900 mt-1 block truncate">{s.lastSession}</span>
            <span className="text-[10px] text-slate-400">Recorded</span>
          </div>
        </div>

        {/* Past Sessions Topic Log */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-700">Past Mentored Topics</span>
          <div className="space-y-1.5">
            {pastSessions.map((past) => (
              <div
                key={past.id}
                className="bg-slate-50/70 rounded-2xl p-3 border border-slate-100 text-xs flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 truncate">{past.topic}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {past.date} · {past.duration} ({past.format})
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-white px-2.5 py-1 rounded-lg border border-amber-100 shrink-0 shadow-2xs">
                  <svg className="w-3 h-3 fill-amber-400 text-amber-400" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                  <span>{past.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Private Mentor Observation Notes Pad */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Mentor Observation Notes</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100">Private to Mentor</span>
        </div>

        {isEditingNotes ? (
          <div className="space-y-2.5">
            <textarea
              rows="3"
              value={mentorNotes}
              onChange={(e) => setMentorNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 leading-relaxed"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingNotes(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3.5 py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsEditingNotes(true)}
            className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 text-xs text-slate-700 cursor-pointer hover:border-sky-300 transition-colors group"
          >
            <p className="leading-relaxed">{mentorNotes}</p>
            <p className="text-[10px] text-sky-600 font-semibold mt-2 opacity-80 group-hover:opacity-100 flex items-center gap-1">
              <span>Click to edit private observations</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </p>
          </div>
        )}
      </div>

      {/* 8. Sticky Bottom Action Controls */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 z-40 flex items-center gap-2.5 shadow-lg">
        <button
          type="button"
          onClick={() => onMessageStudent && onMessageStudent(s)}
          className="touch-target flex-1 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3 rounded-2xl shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.75-.75c0-.66.195-1.294.553-1.838C3.805 16.89 3 14.567 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span>Message Student</span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="touch-target px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all active:scale-95"
        >
          Done
        </button>
      </div>
    </div>
  );
}
