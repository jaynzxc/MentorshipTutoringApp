import React from 'react';

/**
 * Learning Progress Screen
 * Follows Section 8.1 of docs/student_flow_spec.md & docs/mobile_contents_guide.md.
 * Displays student learning metrics, progress milestone bar, skill percentages, and recent activities.
 * Strictly uses vector SVGs — zero raw emojis in UI.
 */
export default function LearningProgressScreen({
  onBack,
  onViewSessionHistory
}) {
  const stats = [
    {
      id: 'stat-1',
      label: 'Sessions Completed',
      value: '12',
      unit: 'Sessions',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-700',
      borderColor: 'border-sky-100',
      icon: (
        <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    },
    {
      id: 'stat-2',
      label: 'Hours Mentored',
      value: '14.5',
      unit: 'Hours',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-100',
      icon: (
        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    },
    {
      id: 'stat-3',
      label: 'Skills Explored',
      value: '5',
      unit: 'Domains',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-100',
      icon: (
        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
        </svg>
      )
    },
    {
      id: 'stat-4',
      label: 'Curriculum Progress',
      value: '72%',
      unit: 'Overall',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-100',
      icon: (
        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      )
    }
  ];

  const skills = [
    { name: 'Web Development', percent: 80, barBg: 'bg-sky-600' },
    { name: 'JavaScript & React', percent: 65, barBg: 'bg-cyan-500' },
    { name: 'UI/UX Design Systems', percent: 55, barBg: 'bg-purple-600' },
    { name: 'Database & SQL Architecture', percent: 40, barBg: 'bg-emerald-600' }
  ];

  const recentActivities = [
    {
      id: 'act-1',
      topic: 'JavaScript Functions, Parameters & Closures',
      mentor: 'Alex Santos',
      date: 'Sept 25, 2026',
      duration: '60 min',
      rating: 5.0
    },
    {
      id: 'act-2',
      topic: 'Binary Search Trees & Traversal Algorithms',
      mentor: 'Maria Clara',
      date: 'Sept 22, 2026',
      duration: '60 min',
      rating: 4.8
    },
    {
      id: 'act-3',
      topic: 'Mobile-first Wireframing in Figma',
      mentor: 'Carlos Reyes',
      date: 'Sept 18, 2026',
      duration: '60 min',
      rating: 5.0
    }
  ];

  return (
    <div className="space-y-4 animate-fade-in pb-24">
      {/* 1. Header Toolbar */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="touch-target -ml-1 p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Back to Profile"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Learning Progress
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Your academic mentorship and skill milestones
            </p>
          </div>
        </div>
      </div>

      {/* 2. Overview 4-Stat Metric Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border ${item.borderColor} p-3.5 shadow-2xs space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">{item.label}</span>
              <div className={`w-7 h-7 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                {item.icon}
              </div>
            </div>
            <div>
              <span className={`text-2xl font-extrabold ${item.textColor} tracking-tight`}>
                {item.value}
              </span>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.unit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Encouragement Milestone Card */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-600 rounded-2xl p-4 text-white shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold tracking-tight">Keep Growing, Daniela!</h3>
            <p className="text-xs text-sky-100 leading-relaxed font-normal">
              You have completed 12 mentoring sessions. Keep learning and practicing to reach your semester learning goals.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-bold text-sky-100">
            <span>Overall Curriculum Milestone</span>
            <span className="text-white font-extrabold">72% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-sky-950/30 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div
              className="h-full bg-white rounded-full transition-all duration-700 ease-out shadow-xs"
              style={{ width: '72%' }}
            />
          </div>
        </div>
      </div>

      {/* 4. Skills Breakdown Progress Bars */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Skills Proficiency
          </h3>
          <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
            4 Domains
          </span>
        </div>

        <div className="space-y-3">
          {skills.map((skill, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{skill.name}</span>
                <span className="font-extrabold text-slate-600">{skill.percent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${skill.barBg} rounded-full transition-all duration-500`}
                  style={{ width: `${skill.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recent Learning Activity */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recent Learning Sessions
          </h3>
          <button
            type="button"
            onClick={onViewSessionHistory}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
          >
            <span>See All</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentActivities.map((act) => (
            <div key={act.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{act.topic}</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Mentor: <span className="text-sky-700 font-semibold">{act.mentor}</span> · {act.date}
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 shrink-0">
                <svg className="w-3 h-3 fill-amber-400 text-amber-400" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <span>{act.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Primary Action CTA */}
      <button
        type="button"
        onClick={onViewSessionHistory}
        className="touch-target w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3 rounded-xl shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-1.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        <span>View Full Session History</span>
      </button>
    </div>
  );
}
