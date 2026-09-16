import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('student'); // 'student' | 'tutor'

  const toggleRole = () => {
    setUserRole((prev) => (prev === 'student' ? 'tutor' : 'student'));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* 1. Mobile Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between pt-safe">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            ML
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">MentorLink</h1>
            <p className="text-[11px] font-medium text-slate-500">Peer Tutoring & Mentorship</p>
          </div>
        </div>

        {/* Dual-Role Switcher Pill */}
        <button
          onClick={toggleRole}
          className="touch-target px-3 py-1 text-xs font-semibold rounded-full border transition-all active:scale-[0.98] border-indigo-200 bg-indigo-50 text-indigo-700"
          title="Toggle Role View"
        >
          {userRole === 'student' ? '🎓 Learner' : '💼 Mentor'}
        </button>
      </header>

      {/* 2. Scrollable Mobile Content (pb-24 ensures clearance above bottom nav) */}
      <main className="flex-1 px-4 py-5 space-y-4 pb-24 overflow-y-auto">
        {/* Welcome Status Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Vite + React Active
              </span>
              <h2 className="text-base font-bold text-slate-900">
                {userRole === 'student' ? 'Find Your Peer Tutor' : 'Tutor Dashboard'}
              </h2>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
              APK Ready
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {userRole === 'student'
              ? 'Connect with qualified student mentors for 1-on-1 tutoring, direct payments via GCash/Maya, and verified notes.'
              : 'Manage incoming student bookings, confirm direct payments, and track accredited University Community Service Hours.'}
          </p>
        </div>

        {/* Quick Search / Filter Bar */}
        <div className="relative">
          <input
            type="text"
            readOnly
            placeholder="Search subjects (Calculus, Physics, Python)..."
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm cursor-pointer"
          />
        </div>

        {/* Subject Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {['All Subjects', 'Calculus I & II', 'College Physics', 'Data Structures', 'Organic Chemistry'].map(
            (subject, idx) => (
              <button
                key={subject}
                className={`touch-target text-xs px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                  idx === 0
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {subject}
              </button>
            )
          )}
        </div>

        {/* Featured Tutor Showcase Card */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Peer Mentor</h3>
            <span className="text-xs font-semibold text-indigo-600">See All</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-sm shrink-0">
                  MS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Maria Santos</h4>
                  <p className="text-xs text-slate-500">BS Computer Science • 3rd Year</p>
                </div>
              </div>

              {/* Rate Badge (Volunteer Service) */}
              <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                Volunteer (₱0)
              </span>
            </div>

            {/* Subject Chips */}
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md">
                Calculus I
              </span>
              <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md">
                Python Programming
              </span>
              <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md">
                Algorithms
              </span>
            </div>

            {/* Rating and Service Hours Footnote */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1 font-semibold text-amber-600">
                <span>★</span>
                <span>4.9</span>
                <span className="text-slate-400 font-normal">(24 sessions)</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                36 Accredited Hours
              </span>
            </div>

            {/* Action Button */}
            <button className="touch-target w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition-all">
              Book Mentorship Session
            </button>
          </div>
        </div>
      </main>

      {/* 3. Persistent Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 h-16 z-40 px-4 flex items-center justify-around pb-safe">
        {[
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'search', label: 'Find Tutors', icon: '🔍' },
          { id: 'sessions', label: 'My Sessions', icon: '📅' },
          { id: 'profile', label: 'Profile', icon: '👤' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`touch-target flex flex-col items-center justify-center flex-1 transition-colors ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="text-base leading-none mb-1">{tab.icon}</span>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
