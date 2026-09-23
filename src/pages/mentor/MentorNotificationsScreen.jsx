import React, { useState } from 'react';

/**
 * Mentor Notifications Feed Screen
 * Conforms to Section 3 of docs/mentor_flow_spec.md & Part 3 of docs/mobile_contents_guide.md.
 * Features:
 * - Real-time alerts feed for session requests, reminders, messages, and university service accreditations.
 * - Dynamic segment filter chips (All, Requests, Sessions, Messages, System).
 * - Mark all as read functionality.
 * - Deep-link navigation buttons directly into Requests, Sessions, Chat, and Summary.
 * - Quick shortcut to Notification Settings.
 * - Strictly uses vector SVGs — zero raw emojis in UI.
 */
export default function MentorNotificationsScreen({
  onBack,
  onOpenSettings,
  onViewRequests,
  onViewUpcomingSession,
  onViewCompletedSession,
  onMessageStudent
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'requests' | 'sessions' | 'messages' | 'system'

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      category: 'requests',
      type: 'request',
      title: 'New Session Request',
      student: {
        id: 'std-1',
        name: 'Daniela Gonzales',
        course: 'BS Information Technology',
        initials: 'DG',
        avatarBg: 'bg-sky-600'
      },
      message: 'Daniela Gonzales requested a mentoring session on "JavaScript Functions, parameters, and return values" for Sept 25, 7:00 PM.',
      timestamp: '2 hours ago',
      read: false,
      sessionData: {
        id: 'sess-req-101',
        topic: 'JavaScript Functions, parameters, and return values',
        date: 'Sept 25, 2026',
        time: '7:00 PM – 8:00 PM'
      }
    },
    {
      id: 'notif-2',
      category: 'sessions',
      type: 'reminder',
      title: 'Upcoming Session in 2 Days',
      student: {
        id: 'std-2',
        name: 'Mark Reyes',
        course: 'BS Computer Science',
        initials: 'MR',
        avatarBg: 'bg-teal-600'
      },
      message: 'Your mentoring session with Mark Reyes on "React Components & State Management" is scheduled for Sept 27 at 6:00 PM.',
      timestamp: '5 hours ago',
      read: false,
      sessionData: {
        id: 'sess-conf-201',
        topic: 'React Components, Props, and State Management',
        date: 'Sept 27, 2026',
        time: '6:00 PM – 7:00 PM',
        format: 'Online'
      }
    },
    {
      id: 'notif-3',
      category: 'messages',
      type: 'message',
      title: 'New Message from Daniela Gonzales',
      student: {
        id: 'std-1',
        name: 'Daniela Gonzales',
        course: 'BS Information Technology',
        initials: 'DG',
        avatarBg: 'bg-sky-600'
      },
      message: '“Thank you so much, Alex! That sounds super helpful. See you on Friday at 7:00 PM!”',
      timestamp: '6:43 PM',
      read: true
    },
    {
      id: 'notif-4',
      category: 'system',
      type: 'accreditation',
      title: '1.0 Service Hour Accredited',
      student: {
        id: 'std-3',
        name: 'Sofia Garcia',
        course: 'BS Information Technology',
        initials: 'SG',
        avatarBg: 'bg-purple-600'
      },
      message: 'Your completed mentoring session with Sofia Garcia has been verified. 1.0 Community Service Hour has been accredited to your university profile.',
      timestamp: 'Yesterday',
      read: true,
      sessionData: {
        id: 'sess-comp-301',
        topic: 'Mobile-First Wireframing and Auto Layout in Figma',
        date: 'Sept 18, 2026',
        duration: '60 min',
        serviceHoursCredited: '1.0 hr'
      }
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markSingleAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  return (
    <div className="space-y-4 animate-fade-in pb-24 max-w-md mx-auto relative select-none">
      {/* 1. Top Header */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="touch-target -ml-1 p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                  {unreadCount} New
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Real-time alerts, requests, and updates
            </p>
          </div>
        </div>

        {/* Shortcut to Settings */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="touch-target p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-slate-100 active:scale-95 transition-all"
          title="Notification Settings"
          aria-label="Notification Settings"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.6 6.6 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.241.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
      </div>

      {/* 2. Quick Filter Segment Chips & Mark All Read */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All' },
            { id: 'requests', label: 'Requests' },
            { id: 'sessions', label: 'Sessions' },
            { id: 'messages', label: 'Messages' },
            { id: 'system', label: 'Service' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`touch-target px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="touch-target text-[11px] font-bold text-sky-600 hover:text-sky-700 whitespace-nowrap px-1 py-1"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* 3. Notifications List Feed */}
      <div className="space-y-2.5">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 mx-auto flex items-center justify-center border border-sky-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">No Notifications</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                You're all caught up! New session requests, student messages, and schedule updates will appear here.
              </p>
            </div>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markSingleAsRead(notif.id)}
              className={`bg-white rounded-2xl border p-4 shadow-xs space-y-3 transition-all ${
                !notif.read
                  ? 'border-sky-300 bg-sky-50/15 hover:border-sky-400'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {/* Card Top: Icon, Category & Timestamp */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {/* Category-specific Icon Badge */}
                  {notif.type === 'request' && (
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                  )}
                  {notif.type === 'reminder' && (
                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                    </div>
                  )}
                  {notif.type === 'message' && (
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.75-.75c0-.66.195-1.294.553-1.838C3.805 16.89 3 14.567 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                      </svg>
                    </div>
                  )}
                  {notif.type === 'accreditation' && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {notif.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {notif.timestamp}
                    </p>
                  </div>
                </div>

                {!notif.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0 mt-1 shadow-xs" />
                )}
              </div>

              {/* Body Text */}
              <p className="text-xs text-slate-700 leading-relaxed font-normal pl-0.5">
                {notif.message}
              </p>

              {/* Action Buttons for each notification type */}
              <div className="pt-0.5 flex items-center gap-2">
                {notif.type === 'request' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markSingleAsRead(notif.id);
                      onViewRequests && onViewRequests();
                    }}
                    className="touch-target text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1"
                  >
                    <span>View Request in Sessions</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                )}

                {notif.type === 'reminder' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markSingleAsRead(notif.id);
                      onViewUpcomingSession && onViewUpcomingSession(notif.sessionData);
                    }}
                    className="touch-target text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1"
                  >
                    <span>View Upcoming Session</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                )}

                {notif.type === 'message' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markSingleAsRead(notif.id);
                      onMessageStudent && onMessageStudent(notif.student);
                    }}
                    className="touch-target text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1"
                  >
                    <span>Reply in Chat</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                )}

                {notif.type === 'accreditation' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markSingleAsRead(notif.id);
                      onViewCompletedSession && onViewCompletedSession(notif.sessionData);
                    }}
                    className="touch-target text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1"
                  >
                    <span>View Completed Summary</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
