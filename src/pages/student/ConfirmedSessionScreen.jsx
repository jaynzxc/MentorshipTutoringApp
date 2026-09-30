import React, { useState, useEffect } from 'react';

export default function ConfirmedSessionScreen({
  session,
  onBack,
  onMessageMentor,
  onJoinClassroom
}) {
  // Toggle to simulate unlock condition for immediate testing & demonstration
  const [isClassroomUnlocked, setIsClassroomUnlocked] = useState(false);
  const [checklist, setChecklist] = useState({
    micCam: true,
    headphones: true,
    questions: true,
    connection: true
  });

  // Simulated live countdown state
  const [countdown, setCountdown] = useState({
    days: 1,
    hours: 17,
    minutes: 24,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fallback default session if opened standalone
  const activeSession = session || {
    id: 'session-conf-102',
    status: 'confirmed',
    mentor: {
      id: 'mentor-2',
      name: 'Maria Clara',
      specialization: 'Data Structures & Algorithms',
      rating: 4.8,
      sessionsCount: 38,
      isVerified: true,
      rate: '₱250.00 / hr',
      avatarBg: 'bg-emerald-600',
      initials: 'MC'
    },
    date: '2026-09-22',
    time: '6:00 PM – 7:00 PM',
    duration: '60 min',
    format: 'Online',
    topic: 'Binary Search Trees, Traversal Algorithms, and Balancing Pointers',
    submittedAt: 'Sept 19 at 4:15 PM'
  };

  const mentor = activeSession.mentor;

  const toggleChecklistItem = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Format readable date
  const getReadableDate = (iso) => {
    if (!iso) return 'Tuesday, September 22, 2026';
    if (iso === '2026-09-22') return 'Tuesday, September 22, 2026';
    if (iso === '2026-09-25') return 'Friday, September 25, 2026';
    if (iso === '2026-09-21') return 'Monday, September 21, 2026';
    return iso;
  };

  return (
    <div className="space-y-4 animate-fade-in pb-24">
      {/* 1. Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 pt-1">
        <button
          onClick={onBack}
          className="touch-target inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 active:scale-95 transition-all"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <span>Back to Sessions</span>
        </button>

        <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
          {activeSession.id ? `#${activeSession.id.slice(-6).toUpperCase()}` : '#CONF-102'}
        </span>
      </div>

      {/* Screen Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Confirmed Session
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Your mentor accepted this booking. Review your details and pre-meeting checklist.
        </p>
      </div>

      {/* 2. Status Banner */}
      <div className="bg-emerald-50/90 rounded-2xl p-4 border border-emerald-200/90 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
              Session Confirmed
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            Ready to Meet
          </span>
        </div>
        <p className="text-xs text-emerald-800 leading-relaxed font-medium">
          <span className="font-bold text-emerald-950">{mentor.name}</span> has confirmed your session. The in-app virtual classroom will unlock 10 minutes before the start time.
        </p>
      </div>

      {/* 3. Live Countdown Timer Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>Starts In</span>
          </div>

          {/* Quick Simulation Toggle */}
          <button
            type="button"
            onClick={() => setIsClassroomUnlocked(!isClassroomUnlocked)}
            className={`touch-target text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
              isClassroomUnlocked
                ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs'
                : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
            }`}
          >
            {isClassroomUnlocked ? 'Simulating Unlocked (< 10m)' : 'Simulate Unlock'}
          </button>
        </div>

        {/* Countdown Numbers Grid */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/10">
            <span className="block text-lg font-black text-sky-400 font-mono">
              {String(countdown.days).padStart(2, '0')}
            </span>
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Days</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/10">
            <span className="block text-lg font-black text-sky-400 font-mono">
              {String(countdown.hours).padStart(2, '0')}
            </span>
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Hours</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/10">
            <span className="block text-lg font-black text-sky-400 font-mono">
              {String(countdown.minutes).padStart(2, '0')}
            </span>
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Mins</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/10">
            <span className="block text-lg font-black text-emerald-400 font-mono">
              {String(countdown.seconds).padStart(2, '0')}
            </span>
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">Secs</span>
          </div>
        </div>
      </div>

      {/* 4. Assigned Mentor Card with Direct Message Action */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Assigned Mentor
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {mentor.rate || '₱250.00 / hr'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full ${mentor.avatarBg || 'bg-emerald-600'} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
          >
            {mentor.initials || 'MC'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-slate-900 truncate">
                {mentor.name}
              </h2>
              {mentor.isVerified && (
                <svg className="w-3.5 h-3.5 text-sky-600 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified Mentor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium truncate">{mentor.specialization}</p>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-semibold text-slate-700">
              <svg className="w-3.5 h-3.5 fill-sky-500 text-sky-500" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <span>{mentor.rating ? mentor.rating.toFixed(1) : '4.8'}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{mentor.sessionsCount || 38} Sessions</span>
            </div>
          </div>
        </div>

        {/* Message Mentor CTA */}
        <button
          type="button"
          onClick={onMessageMentor}
          className="touch-target w-full bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-semibold py-2.5 rounded-xl transition-all active:scale-[0.99] flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.943l.878-2.635C4.249 15.918 3 14.07 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span>Message {mentor.name.split(' ')[0]} (Pre-Session Chat)</span>
        </button>
      </div>

      {/* 5. Scheduled Session Parameters */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Meeting Parameters
        </h3>

        <div className="space-y-3 text-xs divide-y divide-slate-100">
          {/* Date */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span>Date</span>
            </div>
            <span className="font-bold text-slate-800">{getReadableDate(activeSession.date)}</span>
          </div>

          {/* Time */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Time Slot</span>
            </div>
            <span className="font-bold text-slate-800">{activeSession.time}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Duration</span>
            </div>
            <span className="font-bold text-slate-800">{activeSession.duration}</span>
          </div>

          {/* Format */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span>Meeting Format</span>
            </div>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              Online (In-App Virtual Classroom)
            </span>
          </div>

          {/* Rate */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Rate</span>
            </div>
            <span className="font-bold text-slate-800">{mentor.rate}</span>
          </div>
        </div>
      </div>

      {/* 6. Learning Goals & Topics */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Topics to Cover
          </h3>
          <span className="text-[10px] font-semibold text-emerald-600">Approved Goal</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed font-medium">
          {activeSession.topic}
        </div>
      </div>

      {/* 7. Preparation Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Preparation Checklist
          </h3>
          <span className="text-[10px] font-semibold text-slate-400">Tap to toggle</span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Item 1 */}
          <button
            type="button"
            onClick={() => toggleChecklistItem('micCam')}
            className={`touch-target w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
              checklist.micCam
                ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                checklist.micCam ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
              }`}
            >
              {checklist.micCam && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </div>
            <span className="font-medium text-xs">Working microphone & camera permissions</span>
          </button>

          {/* Item 2 */}
          <button
            type="button"
            onClick={() => toggleChecklistItem('headphones')}
            className={`touch-target w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
              checklist.headphones
                ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                checklist.headphones ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
              }`}
            >
              {checklist.headphones && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </div>
            <span className="font-medium text-xs">Headphones or quiet study space</span>
          </button>

          {/* Item 3 */}
          <button
            type="button"
            onClick={() => toggleChecklistItem('questions')}
            className={`touch-target w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
              checklist.questions
                ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                checklist.questions ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
              }`}
            >
              {checklist.questions && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </div>
            <span className="font-medium text-xs">Specific questions or code samples ready</span>
          </button>

          {/* Item 4 */}
          <button
            type="button"
            onClick={() => toggleChecklistItem('connection')}
            className={`touch-target w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
              checklist.connection
                ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                checklist.connection ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
              }`}
            >
              {checklist.connection && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </div>
            <span className="font-medium text-xs">Stable internet / Wi-Fi connection</span>
          </button>
        </div>
      </div>

      {/* 8. Virtual Classroom Action Banner & Button */}
      <div className="pt-2 space-y-2">
        {isClassroomUnlocked ? (
          <button
            type="button"
            onClick={onJoinClassroom}
            className="touch-target w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 animate-pulse"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span>Join Virtual Classroom (Live Now)</span>
          </button>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsClassroomUnlocked(true);
              }}
              className="touch-target w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold py-3.5 px-4 rounded-2xl shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span>Classroom Locked (Unlocks 10m Prior)</span>
            </button>
            <p className="text-[11px] text-center text-slate-400 font-medium">
              Tip: Tap above or the top right simulation badge to test classroom entry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
