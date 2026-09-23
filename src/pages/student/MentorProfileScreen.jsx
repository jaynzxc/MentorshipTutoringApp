import React, { useState } from 'react';

export default function MentorProfileScreen({
  mentor,
  onBack,
  onBookSession,
  onMessageMentor
}) {
  // Options menu toggle (Share, Bookmark, Report)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  // Fallback default mentor if opened without selected context
  const defaultMentor = {
    id: 'mentor-1',
    name: 'Alex Santos',
    specialization: 'Web Development Mentor',
    rating: 4.9,
    sessionsCount: 24,
    isVerified: true,
    rate: '₱0.00 / hr (Volunteer)',
    isVolunteer: true,
    avatarBg: 'bg-sky-600',
    initials: 'AS',
    bio: "I'm a web development mentor who helps students build their programming skills through practical projects and guided learning. I specialize in modern JavaScript, React ecosystems, and frontend architecture.",
    expertise: ['Web Development', 'JavaScript', 'HTML & CSS', 'React', 'Git & GitHub'],
    experience: '3+ Years Web Development & Mentoring',
    mentoringStyle: [
      { title: 'Project-Based Learning', desc: 'Build practical applications to solidify theoretical concepts' },
      { title: 'Hands-on Guidance', desc: 'Direct code reviews and interactive pair debugging' },
      { title: 'One-on-One Sessions', desc: 'Focused discussions tailored to your personal learning pace' }
    ],
    availability: 'Monday – Friday, 6:00 PM – 9:00 PM',
    duration: '30–60 minutes',
    format: 'Online (In-App Virtual Classroom)',
    booking: 'By Request'
  };

  const activeMentor = {
    ...defaultMentor,
    ...(mentor || {}),
    name: mentor?.name || defaultMentor.name,
    specialization: mentor?.specialization || defaultMentor.specialization,
    bio: mentor?.bio || defaultMentor.bio,
    expertise: Array.isArray(mentor?.expertise) && mentor.expertise.length > 0 
      ? mentor.expertise 
      : defaultMentor.expertise,
    mentoringStyle: Array.isArray(mentor?.mentoringStyle) && mentor.mentoringStyle.length > 0 
      ? mentor.mentoringStyle 
      : defaultMentor.mentoringStyle,
    rating: typeof mentor?.rating === 'number' ? mentor.rating : defaultMentor.rating,
    sessionsCount: typeof mentor?.sessionsCount === 'number' ? mentor.sessionsCount : defaultMentor.sessionsCount,
    rate: mentor?.rate || defaultMentor.rate,
    isVolunteer: mentor?.isVolunteer ?? defaultMentor.isVolunteer,
    avatarBg: mentor?.avatarBg || defaultMentor.avatarBg,
    initials: mentor?.initials || (mentor?.name ? mentor.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase() : defaultMentor.initials)
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Student reviews sample data
  const studentReviews = [
    {
      id: 'rev-1',
      studentName: 'Daniela Gonzales',
      course: 'BS Information Technology',
      rating: 5,
      date: 'Sept 18, 2026',
      initials: 'DG',
      avatarBg: 'bg-sky-500',
      comment: 'Very helpful and easy to understand! Alex helped me debug my JavaScript asynchronous functions in under 30 minutes.'
    },
    {
      id: 'rev-2',
      studentName: 'Mark Reyes',
      course: 'BS Computer Science',
      rating: 5,
      date: 'Sept 12, 2026',
      initials: 'MR',
      avatarBg: 'bg-teal-500',
      comment: 'Super patient mentor. Explained React component lifecycles and state hooks with clear diagrams and real examples.'
    }
  ];

  return (
    <div className="space-y-4 animate-fade-in relative pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 max-w-md mx-auto z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center justify-between animate-slide-down">
          <p className="text-xs font-medium leading-tight">{toastMessage}</p>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* 1. Header with Back Button and More Options */}
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

        <h1 className="text-sm font-bold text-slate-900 tracking-tight">Mentor Profile</h1>

        {/* Options Menu Trigger */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all active:scale-95"
            aria-label="More options"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>

          {/* Options Dropdown */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 animate-scale-up">
              <button
                onClick={() => {
                  setIsBookmarked(!isBookmarked);
                  setIsMenuOpen(false);
                  showToast(isBookmarked ? 'Removed from saved mentors' : 'Mentor saved to bookmarks');
                }}
                className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                <span>{isBookmarked ? 'Remove Bookmark' : 'Save Mentor'}</span>
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  showToast('Mentor profile link copied to clipboard!');
                }}
                className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                <span>Share Profile</span>
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  showToast('Report submitted for administrative review.');
                }}
                className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
                <span>Report Mentor</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Hero Profile Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs text-center space-y-3 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-sky-500/10 pointer-events-none" />

        {/* Large Avatar */}
        <div className="relative pt-2">
          <div
            className={`w-20 h-20 rounded-full ${activeMentor.avatarBg} text-white font-bold text-2xl mx-auto flex items-center justify-center shadow-md ring-4 ring-white shrink-0`}
          >
            {activeMentor.initials}
          </div>
        </div>

        {/* Name & Headline */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {activeMentor.name}
            </h2>
            {activeMentor.isVerified && (
              <svg className="w-4 h-4 text-sky-600 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified Mentor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-xs font-semibold text-slate-500">
            {activeMentor.specialization}
          </p>
        </div>

        {/* Rating & Sessions Metric Strip */}
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 fill-sky-500 text-sky-500" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            <span>{(typeof activeMentor.rating === 'number' ? activeMentor.rating : 5.0).toFixed(1)}</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1 text-slate-600">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <span>{activeMentor.sessionsCount} Sessions</span>
          </div>
          <span className="text-slate-300">·</span>
          <span className="text-emerald-700 font-bold">
            {activeMentor.isVolunteer ? 'Volunteer' : (activeMentor.rate || '₱0.00').split(' ')[0]}
          </span>
        </div>

        {/* Small Verified Badge pill */}
        <div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-bold border border-sky-200">
            <svg className="w-3.5 h-3.5 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Verified Academic Mentor
          </span>
        </div>

        {/* PROMINENT HERO ACTION BUTTONS (Immediately visible to students) */}
        <div className="pt-2 flex items-center gap-2.5">
          <button
            onClick={onMessageMentor}
            className="touch-target flex-1 bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold py-3 px-3 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 border border-slate-200 shadow-xs"
          >
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.943l.878-2.635C4.249 15.918 3 14.07 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <span>Message</span>
          </button>

          <button
            onClick={() => onBookSession && onBookSession(activeMentor)}
            className="touch-target flex-[1.6] bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3 px-4 rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span>Book a Session</span>
          </button>
        </div>
      </div>

      {/* 3. About Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-1.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About</h3>
        <p className="text-xs text-slate-700 leading-relaxed font-normal">
          {activeMentor.bio}
        </p>
      </div>

      {/* 4. Areas of Expertise */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Areas of Expertise
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {(activeMentor.expertise || []).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-xl bg-sky-50 text-sky-800 text-xs font-semibold border border-sky-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Experience Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Experience</h3>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-200 shrink-0">
            <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-tight">3+ Years</p>
            <p className="text-[11px] text-slate-500 font-medium">
              Web Development & Peer Tutoring Mentoring
            </p>
          </div>
        </div>
      </div>

      {/* 6. Mentoring Style */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Mentoring Style
        </h3>
        <div className="space-y-2">
          {(activeMentor.mentoringStyle || []).map((style, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight">{style.title || style}</p>
                {style.desc && <p className="text-[11px] text-slate-500 font-normal mt-0.5">{style.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Availability Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Availability
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Available
          </span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-800">Monday – Friday</p>
            <p className="text-[11px] text-slate-500 font-medium">6:00 PM – 9:00 PM</p>
          </div>
          <button
            onClick={() => setIsAvailabilityModalOpen(true)}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 active:scale-95 transition-all flex items-center gap-0.5"
          >
            <span>Full Schedule</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* 8. Session Information */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Session Details
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Duration</span>
            <p className="font-bold text-slate-800">30–60 minutes</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Format</span>
            <p className="font-bold text-slate-800">Online Classroom</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Booking</span>
            <p className="font-bold text-slate-800">By Request</p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Mentoring Fee</span>
            <p className="font-bold text-emerald-600">
              {activeMentor.isVolunteer ? 'Volunteer (₱0)' : activeMentor.rate}
            </p>
          </div>
        </div>
      </div>

      {/* 9. Student Reviews Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Student Reviews
          </h3>
          <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
            <svg className="w-3.5 h-3.5 fill-sky-500 text-sky-500" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            <span>4.9 · 24 reviews</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {studentReviews.map((rev) => (
            <div key={rev.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full ${rev.avatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                    {rev.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{rev.studentName}</p>
                    <p className="text-[10px] text-slate-400">{rev.course}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 10. FIXED DUAL BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 z-50 shadow-2xl flex items-center gap-3">
        {/* Message Action */}
        <button
          onClick={onMessageMentor}
          className="touch-target flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold py-3 px-3 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-xs"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.943l.878-2.635C4.249 15.918 3 14.07 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span>Message</span>
        </button>

        {/* Book a Session Action (Primary CTA) */}
        <button
          onClick={() => onBookSession && onBookSession(activeMentor)}
          className="touch-target flex-[1.6] bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3 px-4 rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          <span>Book a Session</span>
        </button>
      </div>

      {/* 11. Full Availability Schedule Modal */}
      {isAvailabilityModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900">Weekly Availability</h3>
              <button
                onClick={() => setIsAvailabilityModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-100">
              {[
                { day: 'Monday', time: '6:00 PM – 9:00 PM', available: true },
                { day: 'Tuesday', time: '6:00 PM – 9:00 PM', available: true },
                { day: 'Wednesday', time: '6:00 PM – 9:00 PM', available: true },
                { day: 'Thursday', time: '6:00 PM – 9:00 PM', available: true },
                { day: 'Friday', time: '6:00 PM – 9:00 PM', available: true },
                { day: 'Saturday', time: 'Unavailable', available: false },
                { day: 'Sunday', time: 'Unavailable', available: false }
              ].map((slot) => (
                <div key={slot.day} className="flex items-center justify-between pt-2">
                  <span className="font-semibold text-slate-800">{slot.day}</span>
                  <span
                    className={
                      slot.available ? 'font-medium text-sky-700' : 'font-medium text-slate-400'
                    }
                  >
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsAvailabilityModalOpen(false);
                  if (onBookSession) onBookSession(activeMentor);
                }}
                className="touch-target w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
              >
                Book with {(activeMentor.name || 'Mentor').split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
