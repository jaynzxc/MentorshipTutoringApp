import React, { useState } from 'react';

export default function HomeScreen({ onNavigateTab, onViewMentorProfile, onViewConfirmedSession, onJoinClassroom }) {
  // State to simulate upcoming session preview toggle (Empty vs Confirmed)
  const [hasConfirmedSession, setHasConfirmedSession] = useState(true);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 1. Greeting & Hero Banner */}
      <div className="bg-gradient-to-br from-sky-600 via-sky-500 to-cyan-500 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-12 -top-6 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white/95">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 animate-pulse" />
            Active Academic Term 2026
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Good morning, Daniela!
            </h1>
            <p className="text-xs text-sky-100 font-medium mt-0.5">
              Ready to learn something new today?
            </p>npm
          </div>

          {/* Search Bar Input Trigger */}
          <button
            onClick={() => onNavigateTab && onNavigateTab('explore')}
            className="touch-target w-full bg-white/95 hover:bg-white text-slate-700 rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-sm transition-all active:scale-[0.99] text-left"
            aria-label="Search mentors or skills"
          >
            <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span className="text-xs text-slate-400 font-normal">
              Search mentors or skills (Calculus, Web Dev, UI/UX)...
            </span>
          </button>
        </div>
      </div>

      {/* 2. Quick Actions Grid */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          What are you looking for?
        </h2>
        <div className="grid grid-cols-3 gap-2.5">
          {/* Action 1: Find a Mentor */}
          <button
            onClick={() => onNavigateTab && onNavigateTab('explore')}
            className="touch-target bg-white rounded-2xl border border-slate-200/80 p-3 text-center space-y-2 hover:border-sky-300 hover:shadow-sm active:scale-[0.98] transition-all flex flex-col items-center justify-center min-h-[96px]"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Find Mentor</p>
              <p className="text-[10px] text-slate-400 font-medium">Explore peer tutors</p>
            </div>
          </button>

          {/* Action 2: My Sessions */}
          <button
            onClick={() => onNavigateTab && onNavigateTab('sessions')}
            className="touch-target bg-white rounded-2xl border border-slate-200/80 p-3 text-center space-y-2 hover:border-sky-300 hover:shadow-sm active:scale-[0.98] transition-all flex flex-col items-center justify-center min-h-[96px]"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">My Sessions</p>
              <p className="text-[10px] text-slate-400 font-medium">View bookings</p>
            </div>
          </button>

          {/* Action 3: Messages */}
          <button
            onClick={() => onNavigateTab && onNavigateTab('messages')}
            className="touch-target bg-white rounded-2xl border border-slate-200/80 p-3 text-center space-y-2 hover:border-sky-300 hover:shadow-sm active:scale-[0.98] transition-all flex flex-col items-center justify-center min-h-[96px]"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.943l.878-2.635C4.249 15.918 3 14.07 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Messages</p>
              <p className="text-[10px] text-slate-400 font-medium">Chat with tutors</p>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Upcoming Session Section (Dynamic State) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Upcoming Session
            </h2>
            {/* Interactive State Toggle Pill for previewing both states */}
            <button
              onClick={() => setHasConfirmedSession(!hasConfirmedSession)}
              className="text-[10px] font-semibold text-sky-600 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200 transition-colors"
              title="Click to toggle between Confirmed and Empty State previews"
            >
              {hasConfirmedSession ? 'Preview Empty' : 'Preview Active'}
            </button>
          </div>
          {hasConfirmedSession && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Confirmed
            </span>
          )}
        </div>

        {hasConfirmedSession ? (
          /* Active Upcoming Session Card */
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center font-bold text-sky-700 text-sm shrink-0">
                  AS
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">Alex Santos</h3>
                  <p className="text-xs text-sky-600 font-semibold">Web Development Mentoring</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
                Online Room
              </span>
            </div>

            {/* Schedule Info Box */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <span className="font-semibold">Sept 25, 2026</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>7:00 PM – 8:00 PM</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onViewConfirmedSession ? onViewConfirmedSession() : (onNavigateTab && onNavigateTab('sessions'))}
                className="touch-target flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 active:scale-[0.99] font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <span>Session Details</span>
              </button>

              <button
                type="button"
                onClick={() => onJoinClassroom ? onJoinClassroom() : (onNavigateTab && onNavigateTab('sessions'))}
                className="touch-target flex-1 bg-sky-600 hover:bg-sky-700 active:scale-[0.99] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <span>Join Classroom</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty Upcoming Session Card */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 mx-auto flex items-center justify-center border border-sky-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">No Upcoming Sessions</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                You don't have any scheduled sessions yet. Discover qualified peer mentors to get started.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab && onNavigateTab('explore')}
              className="touch-target inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
            >
              <span>Find a Mentor</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 4. Recommended Mentors Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recommended Mentors
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Matched with your learning goals
            </p>
          </div>
          <button
            onClick={() => onNavigateTab && onNavigateTab('explore')}
            className="touch-target text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>See All</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Mentor Cards List */}
        <div className="space-y-3">
          {/* Mentor Card 1: Alex Santos */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 hover:border-sky-200 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center font-bold text-sky-700 text-sm shrink-0">
                  AS
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900">Alex Santos</h3>
                    {/* Verified Mentor Vector Badge */}
                    <span className="text-sky-600" title="Verified Peer Mentor">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Web Development Mentor</p>
                </div>
              </div>

              {/* Rate Tag: Hourly Fee */}
              <span className="inline-block bg-sky-50 text-sky-700 border border-sky-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                ₱250/hr
              </span>
            </div>

            {/* Subject Chips */}
            <div className="flex flex-wrap gap-1.5">
              {['Web Development', 'React', 'JavaScript', 'HTML & CSS'].map((skill) => (
                <span
                  key={skill}
                  className="bg-sky-50 text-sky-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-sky-100"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Rating & Action Footer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                {/* Star Vector SVG */}
                <svg className="w-3.5 h-3.5 fill-amber-500 text-amber-500" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9</span>
                <span className="text-slate-400 font-normal">(24 sessions)</span>
              </div>

              <button
                onClick={() => {
                  if (onViewMentorProfile) {
                    onViewMentorProfile({
                      id: 'mentor-1',
                      name: 'Alex Santos',
                      specialization: 'Web Development Mentor',
                      category: 'Web Development',
                      rating: 4.9,
                      sessionsCount: 24,
                      isVerified: true,
                      rate: '₱250.00 / hr',
                      hourlyRate: 250,
                      paymentMethods: ['GCash', 'BDO Unibank'],
                      gcashNumber: '0917-555-0192',
                      gcashName: 'Alex Santos',
                      bankName: 'BDO Unibank',
                      bankAccount: '1092-8834-5512',
                      bankHolder: 'Alex Santos',
                      avatarBg: 'bg-sky-600',
                      initials: 'AS',
                      bio: "I'm a web development mentor who helps students build their programming skills through practical projects and guided learning.",
                      expertise: ['Web Development', 'JavaScript', 'HTML & CSS', 'React', 'Git & GitHub'],
                      experience: '3+ Years Web Development & Mentoring',
                      mentoringStyle: [
                        { title: 'Project-Based Learning', desc: 'Build practical applications to solidify theoretical concepts' },
                        { title: 'Hands-on Guidance', desc: 'Direct code reviews and interactive pair debugging' },
                        { title: 'One-on-One Sessions', desc: 'Focused discussions tailored to your personal learning pace' }
                      ],
                      availability: 'Monday – Friday, 6:00 PM – 9:00 PM'
                    });
                  } else if (onNavigateTab) {
                    onNavigateTab('explore');
                  }
                }}
                className="touch-target px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold rounded-xl border border-sky-200 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Mentor Card 2: Maria Cruz */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 hover:border-sky-200 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center font-bold text-cyan-700 text-sm shrink-0">
                  MC
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900">Maria Cruz</h3>
                    <span className="text-sky-600" title="Verified Peer Mentor">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">UI/UX Design Mentor</p>
                </div>
              </div>

              {/* Rate Tag: Hourly Fee */}
              <span className="inline-block bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                ₱250/hr
              </span>
            </div>

            {/* Subject Chips */}
            <div className="flex flex-wrap gap-1.5">
              {['UI/UX Design', 'Figma', 'Mobile Prototyping', 'Design Systems'].map((skill) => (
                <span
                  key={skill}
                  className="bg-sky-50 text-sky-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-sky-100"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Rating & Action Footer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                <svg className="w-3.5 h-3.5 fill-amber-500 text-amber-500" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.8</span>
                <span className="text-slate-400 font-normal">(18 sessions)</span>
              </div>

              <button
                onClick={() => {
                  if (onViewMentorProfile) {
                    onViewMentorProfile({
                      id: 'mentor-2',
                      name: 'Maria Cruz',
                      specialization: 'UI/UX Design Mentor',
                      category: 'UI/UX',
                      rating: 4.8,
                      sessionsCount: 18,
                      isVerified: true,
                      rate: '₱200 / session',
                      avatarBg: 'bg-indigo-600',
                      initials: 'MC',
                      bio: 'BS Computer Science student focused on human-computer interaction, Figma design systems, wireframing, and interactive design prototyping.',
                      expertise: ['UI/UX Design', 'Figma', 'Mobile Prototyping', 'Design Systems'],
                      experience: '2+ Years UI/UX Design & Prototyping',
                      mentoringStyle: [
                        { title: 'Design Critiques', desc: 'Detailed actionable feedback on UI layouts and typography' },
                        { title: 'Figma Best Practices', desc: 'Component auto-layouts, tokens, and prototyping tips' },
                        { title: 'Portfolio & Case Studies', desc: 'Crafting compelling design portfolio presentations' }
                      ],
                      availability: 'Tue, Thu, Sat · 4:00 PM – 7:00 PM'
                    });
                  } else if (onNavigateTab) {
                    onNavigateTab('explore');
                  }
                }}
                className="touch-target px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold rounded-xl border border-sky-200 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
