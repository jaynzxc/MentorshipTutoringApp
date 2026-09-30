import React from 'react';

/**
 * Mentor Session Details Screen (Mentor View for Confirmed Upcoming Sessions)
 * Conforms to Section 6 of docs/mentor_flow_spec.md & Part 3 of docs/mobile_contents_guide.md.
 * Features:
 * - Confirmed status banner and student overview card.
 * - Full session details (topic, date, time, format, duration, student's note).
 * - Pre-session preparation notice.
 * - Direct CTAs: Join Session (Virtual Classroom) & Message Student.
 * - Strictly uses vector SVGs — zero raw emojis in UI.
 */
export default function MentorSessionDetailsScreen({
  session,
  onBack,
  onJoinSession,
  onMessageStudent,
  onViewStudentProfile
}) {
  const activeSession = session || {
    id: 'sess-conf-201',
    status: 'confirmed',
    student: {
      id: 'std-1',
      name: 'Daniela Gonzales',
      course: 'BS Information Technology',
      yearLevel: '3rd Year Student',
      school: 'Bestlink College of the Philippines',
      initials: 'DG',
      avatarBg: 'bg-sky-600'
    },
    topic: 'JavaScript Functions, parameters, and return values',
    date: 'Friday, September 25, 2026',
    time: '7:00 PM – 8:00 PM',
    duration: '60 minutes',
    format: 'Online Room',
    totalFee: 250,
    downPayment: 125,
    remainingBalance: 125,
    paymentMethod: 'GCash',
    referenceNumber: 'MP-8921-7734',
    paymentStatus: 'downpayment_verified',
    studentNote: "I'd like to understand JavaScript functions, especially parameters and return values.",
    countdown: 'Starts in 2 days'
  };

  const student = activeSession.student || {
    name: 'Daniela Gonzales',
    course: 'BS Information Technology',
    yearLevel: '3rd Year Student',
    school: 'Bestlink College of the Philippines',
    initials: 'DG',
    avatarBg: 'bg-sky-600'
  };

  return (
    <div className="space-y-4 animate-fade-in pb-24 max-w-md mx-auto">
      {/* 1. Top Header */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="touch-target -ml-1 p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Back to sessions"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Session Details
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Confirmed upcoming mentoring session
            </p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
          CONFIRMED
        </span>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-3.5 flex items-start gap-3 shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 className="text-xs font-bold text-emerald-950">Session Confirmed & Down Payment Verified</h3>
          <p className="text-xs text-emerald-800 font-medium mt-0.5 leading-relaxed">
            This mentoring session has been confirmed and the 50% down payment (₱{(activeSession.downPayment || 125).toFixed(2)}) verified. Both you and {student.name} can access the virtual classroom 10 minutes prior to scheduled start.
          </p>
        </div>
      </div>

      {/* 3. Student Information Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Student Information
          </span>
          <button
            type="button"
            onClick={() => onViewStudentProfile && onViewStudentProfile(student)}
            className="touch-target text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1"
          >
            <span>View Student Profile</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3.5 pt-0.5">
          <div className={`w-12 h-12 rounded-2xl ${student.avatarBg || 'bg-sky-600'} text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0`}>
            {student.initials || 'ST'}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{student.name}</h3>
            <p className="text-xs font-semibold text-sky-700">{student.course}</p>
            <p className="text-[11px] text-slate-500 font-medium">{student.yearLevel} · {student.school}</p>
          </div>
        </div>
      </div>

      {/* 4. Session Schedule & Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Session Information
        </span>

        <div className="space-y-3 divide-y divide-slate-100 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 font-medium block">Topic & Learning Focus</span>
            <p className="text-slate-900 font-bold leading-relaxed">{activeSession.topic}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="space-y-1">
              <span className="text-slate-500 font-medium block">Date</span>
              <p className="text-slate-900 font-bold">{activeSession.date}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 font-medium block">Time & Duration</span>
              <p className="text-slate-900 font-bold">{activeSession.time} ({activeSession.duration})</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="space-y-1">
              <span className="text-slate-500 font-medium block">Meeting Format</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg">
                <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <span>{activeSession.format}</span>
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 font-medium block">Total Session Fee</span>
              <p className="text-slate-900 font-bold">₱{(activeSession.totalFee || 250).toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="space-y-1">
              <span className="text-slate-500 font-medium block">50% Down Payment</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span>₱{(activeSession.downPayment || 125).toFixed(2)} Verified</span>
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 font-medium block">Remaining Due</span>
              <p className="text-amber-800 font-bold">₱{(activeSession.remainingBalance || 125).toFixed(2)} (Upon completion)</p>
            </div>
          </div>

          {activeSession.studentNote && (
            <div className="space-y-1 pt-3">
              <span className="text-slate-500 font-medium block">Student's Note / Request</span>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-slate-700 italic leading-relaxed">
                “{activeSession.studentNote}”
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Before Session Preparation Reminder */}
      <div className="bg-gradient-to-r from-sky-50 via-slate-50 to-cyan-50 border border-sky-200/90 rounded-2xl p-4 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Before the Session</h4>
            <span className="text-[11px] font-semibold text-sky-700">
              {activeSession.countdown || 'Session starts soon'}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Prepare your demonstration code, examples, or slides in advance. Ensure you have a quiet environment and a stable internet connection before launching the virtual room.
        </p>
      </div>

      {/* 6. Sticky Bottom Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={() => onJoinSession && onJoinSession(activeSession)}
          className="touch-target w-full bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white text-xs font-bold py-3.5 rounded-2xl shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <span>Join Virtual Classroom</span>
        </button>

        <button
          type="button"
          onClick={() => onMessageStudent && onMessageStudent(student)}
          className="touch-target w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-3 rounded-2xl shadow-2xs transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.75-.75c0-.66.195-1.294.553-1.838C3.805 16.89 3 14.567 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span>Message Student</span>
        </button>
      </div>
    </div>
  );
}
