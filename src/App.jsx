import React, { useState } from 'react';
import HomeScreen from './pages/student/HomeScreen.jsx';
import ExploreScreen from './pages/student/ExploreScreen.jsx';
import BookSessionScreen from './pages/student/BookSessionScreen.jsx';
import ReviewBookingScreen from './pages/student/ReviewBookingScreen.jsx';
import MentorProfileScreen from './pages/student/MentorProfileScreen.jsx';
import SessionsScreen from './pages/student/SessionsScreen.jsx';
import SessionDetailsScreen from './pages/sessions/SessionDetailsScreen.jsx';
import ConfirmedSessionScreen from './pages/student/ConfirmedSessionScreen.jsx';
import VirtualClassroomScreen from './pages/sessions/VirtualClassroomScreen.jsx';
import SessionCompletedScreen from './pages/sessions/SessionCompletedScreen.jsx';
import MessagesScreen from './pages/student/MessagesScreen.jsx';
import ChatConversationScreen from './pages/student/ChatConversationScreen.jsx';
import ProfileScreen from './pages/student/ProfileScreen.jsx';
import LearningProgressScreen from './pages/student/LearningProgressScreen.jsx';
import MentorDashboard from './pages/mentor/MentorDashboard.jsx';
import StudentsRosterScreen from './pages/mentor/StudentsRosterScreen.jsx';
import StudentProfilePreview from './pages/mentor/StudentProfilePreview.jsx';
import MentorMessagesScreen from './pages/mentor/MentorMessagesScreen.jsx';
import MentorChatScreen from './pages/mentor/MentorChatScreen.jsx';
import MentorSessionsScreen from './pages/mentor/MentorSessionsScreen.jsx';
import MentorSessionDetailsScreen from './pages/mentor/MentorSessionDetailsScreen.jsx';
import MentorSessionCompletedScreen from './pages/mentor/MentorSessionCompletedScreen.jsx';
import MentorNotificationsScreen from './pages/mentor/MentorNotificationsScreen.jsx';
import MentorNotificationSettingsScreen from './pages/mentor/MentorNotificationSettingsScreen.jsx';
import MentorProfileSettingsScreen from './pages/mentor/MentorProfileScreen.jsx';
import AvailabilityScreen from './pages/mentor/AvailabilityScreen.jsx';
import LoginScreen from './pages/auth/LoginScreen.jsx';
import SignUpScreen from './pages/auth/SignUpScreen.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('student'); // 'student' | 'mentor'
  const [activeBookingMentor, setActiveBookingMentor] = useState(null);
  const [viewingMentorProfile, setViewingMentorProfile] = useState(null);
  const [pendingReviewBooking, setPendingReviewBooking] = useState(null);
  const [viewingSessionDetails, setViewingSessionDetails] = useState(null);
  const [viewingConfirmedSession, setViewingConfirmedSession] = useState(null);
  const [activeClassroomSession, setActiveClassroomSession] = useState(null);
  const [viewingCompletedSession, setViewingCompletedSession] = useState(null);
  const [activeChatMentor, setActiveChatMentor] = useState(null);
  const [viewingLearningProgress, setViewingLearningProgress] = useState(false);
  const [viewingStudentProfile, setViewingStudentProfile] = useState(null);
  const [activeMentorChatStudent, setActiveMentorChatStudent] = useState(null);
  const [viewingMentorSessionDetails, setViewingMentorSessionDetails] = useState(null);
  const [viewingMentorCompletedSession, setViewingMentorCompletedSession] = useState(null);
  const [viewingMentorNotifications, setViewingMentorNotifications] = useState(false);
  const [viewingMentorNotificationSettings, setViewingMentorNotificationSettings] = useState(false);
  const [viewingMentorAvailability, setViewingMentorAvailability] = useState(false);
  const [authView, setAuthView] = useState(null); // 'login' | 'signup' | null

  // Student sessions state (Pending, Confirmed, Completed)
  const [studentSessions, setStudentSessions] = useState([
    {
      id: 'session-req-101',
      status: 'pending',
      mentor: {
        id: 'mentor-1',
        name: 'Alex Santos',
        specialization: 'Web Development Mentor',
        rating: 4.9,
        sessionsCount: 24,
        isVerified: true,
        rate: '₱0.00 / hr (Volunteer)',
        isVolunteer: true,
        avatarBg: 'bg-sky-600',
        initials: 'AS'
      },
      date: '2026-09-25',
      time: '7:00 PM – 8:00 PM',
      duration: '60 min',
      format: 'Online',
      topic: 'JavaScript Functions, parameters, and return values',
      submittedAt: 'Today at 7:30 PM'
    },
    {
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
        isVolunteer: false,
        avatarBg: 'bg-emerald-600',
        initials: 'MC'
      },
      date: '2026-09-22',
      time: '6:00 PM – 7:00 PM',
      duration: '60 min',
      format: 'Online',
      topic: 'Binary Search Trees and Traversals',
      submittedAt: 'Sept 19 at 4:15 PM'
    },
    {
      id: 'session-comp-103',
      status: 'completed',
      mentor: {
        id: 'mentor-3',
        name: 'Carlos Reyes',
        specialization: 'UI/UX Design & Figma Systems',
        rating: 5.0,
        sessionsCount: 45,
        isVerified: true,
        rate: '₱0.00 / hr (Volunteer)',
        isVolunteer: true,
        avatarBg: 'bg-purple-600',
        initials: 'CR'
      },
      date: '2026-09-18',
      time: '5:00 PM – 6:00 PM',
      duration: '60 min',
      format: 'Online',
      topic: 'Mobile-first Wireframing and Auto Layout in Figma',
      ratingGiven: 5,
      studyNotes: 'Focus on 8pt grid systems, touch targets >= 44px, and atomic component structure.'
    }
  ]);

  const handleCancelSessionRequest = (sessionId) => {
    setStudentSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: 'cancelled' } : s))
    );
  };

  const toggleRole = () => {
    setUserRole((prev) => (prev === 'student' ? 'mentor' : 'student'));
    setActiveTab('home');
    setActiveBookingMentor(null);
    setViewingMentorProfile(null);
    setPendingReviewBooking(null);
    setViewingSessionDetails(null);
    setViewingConfirmedSession(null);
    setActiveClassroomSession(null);
    setViewingCompletedSession(null);
    setActiveChatMentor(null);
    setViewingLearningProgress(false);
    setViewingStudentProfile(null);
    setActiveMentorChatStudent(null);
    setViewingMentorSessionDetails(null);
    setViewingMentorCompletedSession(null);
    setViewingMentorNotifications(false);
    setViewingMentorNotificationSettings(false);
    setViewingMentorAvailability(false);
  };

  // Dual 5-tab configuration with clean vector SVGs (Strictly NO raw emojis in UI)
  const studentTabs = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      )
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.943l.878-2.635C4.249 15.918 3 14.07 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      )
    },
    {
      id: 'sessions',
      label: 'Sessions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    }
  ];

  const mentorTabs = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      id: 'students',
      label: 'Students',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      )
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.943l.878-2.635C4.249 15.918 3 14.07 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      )
    },
    {
      id: 'sessions',
      label: 'Sessions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    }
  ];

  const currentTabs = userRole === 'student' ? studentTabs : mentorTabs;

  if (authView === 'login') {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-slate-900 shadow-2xl relative">
        <LoginScreen
          onLogin={(creds) => {
            if (creds?.role) setUserRole(creds.role);
            setAuthView(null);
          }}
          onNavigateToSignUp={() => setAuthView('signup')}
          onForgotPassword={() => alert('Password reset instructions sent to your email.')}
        />
      </div>
    );
  }

  if (authView === 'signup') {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-slate-900 shadow-2xl relative">
        <SignUpScreen
          onSignUp={(userData) => {
            if (userData?.role) setUserRole(userData.role);
            setAuthView(null);
          }}
          onNavigateToLogin={() => setAuthView('login')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative flex flex-col selection:bg-sky-500 selection:text-white">
      {/* 1. Mobile Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between pt-safe">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            ML
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">MentorLinks</h1>
            <p className="text-[11px] font-medium text-slate-500">Connect. Learn. Grow.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Dual-Role Switcher Pill */}
          <button
            onClick={toggleRole}
            className="touch-target px-3 py-1 text-xs font-semibold rounded-full border transition-all active:scale-[0.98] border-sky-200 bg-sky-50 text-sky-700 flex items-center gap-1.5"
            title="Toggle Role View"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
            <span>{userRole === 'student' ? 'Student Mode' : 'Mentor Mode'}</span>
          </button>

          {/* Quick Auth Screen Button */}
          <button
            onClick={() => setAuthView('login')}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            title="View Sign In Screen"
            aria-label="Account Login"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
      </header>

      {/* 2. Scrollable Mobile Content Canvas */}
      <main className="flex-1 px-4 py-5 space-y-4 pb-24 overflow-y-auto">
        {activeClassroomSession ? (
          <VirtualClassroomScreen
            session={activeClassroomSession}
            userRole={userRole}
            onLeave={() => setActiveClassroomSession(null)}
            onCompleteSession={(completed) => {
              setActiveClassroomSession(null);
              if (userRole === 'mentor') {
                setViewingMentorCompletedSession(completed);
              } else {
                setViewingCompletedSession(completed);
              }
            }}
          />
        ) : userRole === 'student' && viewingCompletedSession ? (
          <SessionCompletedScreen
            session={viewingCompletedSession}
            onBack={() => setViewingCompletedSession(null)}
            onMessageMentor={() => {
              const m = viewingCompletedSession?.mentor;
              setViewingCompletedSession(null);
              setActiveChatMentor(m);
              setActiveTab('messages');
            }}
            onViewSessionsHistory={() => {
              setViewingCompletedSession(null);
              setActiveTab('sessions');
            }}
            onReturnHome={() => {
              setViewingCompletedSession(null);
              setActiveTab('home');
            }}
          />
        ) : userRole === 'student' && viewingConfirmedSession ? (
          <ConfirmedSessionScreen
            session={viewingConfirmedSession}
            onBack={() => setViewingConfirmedSession(null)}
            onMessageMentor={() => {
              const m = viewingConfirmedSession?.mentor;
              setViewingConfirmedSession(null);
              setActiveChatMentor(m);
              setActiveTab('messages');
            }}
            onJoinClassroom={() => {
              setActiveClassroomSession(viewingConfirmedSession);
            }}
          />
        ) : userRole === 'student' && viewingSessionDetails ? (
          <SessionDetailsScreen
            session={viewingSessionDetails}
            onBack={() => setViewingSessionDetails(null)}
            onCancelRequest={(sessionId) => handleCancelSessionRequest(sessionId)}
            onMessageMentor={() => {
              const m = viewingSessionDetails?.mentor;
              setViewingSessionDetails(null);
              setActiveChatMentor(m);
              setActiveTab('messages');
            }}
            onJoinClassroom={() => {
              setActiveClassroomSession(viewingSessionDetails);
            }}
          />
        ) : userRole === 'student' && pendingReviewBooking ? (
          <ReviewBookingScreen
            bookingData={pendingReviewBooking}
            onBack={() => setPendingReviewBooking(null)}
            onComplete={(newBooking) => {
              if (newBooking) {
                const createdSession = {
                  id: `session-req-${Date.now().toString().slice(-4)}`,
                  status: 'pending',
                  mentor: newBooking.mentor,
                  date: newBooking.date,
                  time: newBooking.time,
                  duration: newBooking.duration,
                  format: newBooking.format,
                  topic: newBooking.topic,
                  submittedAt: 'Just now'
                };
                setStudentSessions((prev) => [createdSession, ...prev]);
                setViewingSessionDetails(createdSession);
              }
              setPendingReviewBooking(null);
              setActiveBookingMentor(null);
              setViewingMentorProfile(null);
              setActiveTab('sessions');
            }}
          />
        ) : userRole === 'student' && viewingMentorProfile ? (
          <MentorProfileScreen
            mentor={viewingMentorProfile}
            onBack={() => setViewingMentorProfile(null)}
            onBookSession={(selectedMentor) => {
              setViewingMentorProfile(null);
              setActiveBookingMentor(selectedMentor);
            }}
            onMessageMentor={() => {
              const m = viewingMentorProfile;
              setViewingMentorProfile(null);
              setActiveChatMentor(m);
              setActiveTab('messages');
            }}
          />
        ) : userRole === 'student' && activeBookingMentor ? (
          <BookSessionScreen
            mentor={activeBookingMentor}
            onBack={() => setActiveBookingMentor(null)}
            onProceedToReview={(bookingPayload) => setPendingReviewBooking(bookingPayload)}
            onComplete={() => {
              setActiveBookingMentor(null);
              setActiveTab('sessions');
            }}
          />
        ) : userRole === 'student' && activeTab === 'home' ? (
          <HomeScreen
            onNavigateTab={(tabId) => {
              setActiveBookingMentor(null);
              setViewingMentorProfile(null);
              setPendingReviewBooking(null);
              setViewingSessionDetails(null);
              setViewingConfirmedSession(null);
              setActiveClassroomSession(null);
              setViewingCompletedSession(null);
              setActiveChatMentor(null);
              setViewingLearningProgress(false);
              setActiveTab(tabId);
            }}
            onViewMentorProfile={(selectedMentor) => setViewingMentorProfile(selectedMentor)}
            onViewConfirmedSession={() => {
              const confirmed = studentSessions.find((s) => s.status === 'confirmed') || studentSessions[1];
              setViewingConfirmedSession(confirmed);
            }}
            onJoinClassroom={() => {
              const confirmed = studentSessions.find((s) => s.status === 'confirmed') || studentSessions[1];
              setActiveClassroomSession(confirmed);
            }}
          />
        ) : userRole === 'student' && activeTab === 'explore' ? (
          <ExploreScreen
            onNavigateTab={(tabId) => {
              setActiveBookingMentor(null);
              setViewingMentorProfile(null);
              setPendingReviewBooking(null);
              setViewingSessionDetails(null);
              setViewingConfirmedSession(null);
              setActiveClassroomSession(null);
              setViewingCompletedSession(null);
              setActiveChatMentor(null);
              setViewingLearningProgress(false);
              setActiveTab(tabId);
            }}
            onBookSession={(selectedMentor) => setActiveBookingMentor(selectedMentor)}
            onViewMentorProfile={(selectedMentor) => setViewingMentorProfile(selectedMentor)}
          />
        ) : userRole === 'student' && activeTab === 'sessions' ? (
          <SessionsScreen
            sessions={studentSessions}
            onViewSessionDetails={(selectedSession) => setViewingSessionDetails(selectedSession)}
            onViewConfirmedSession={(selectedSession) => setViewingConfirmedSession(selectedSession)}
            onViewCompletedSession={(selectedSession) => setViewingCompletedSession(selectedSession)}
            onJoinSession={(selectedSession) => {
              setActiveClassroomSession(selectedSession);
            }}
            onExploreMentors={() => {
              setActiveTab('explore');
            }}
            onBookAgain={(mentor) => {
              setActiveBookingMentor(mentor);
            }}
            onMessageMentor={(mentor) => {
              setActiveTab('messages');
            }}
          />
        ) : userRole === 'student' && activeTab === 'messages' && activeChatMentor ? (
          <ChatConversationScreen
            mentor={activeChatMentor}
            session={
              studentSessions.find(
                (s) =>
                  s.mentor?.id === activeChatMentor?.id ||
                  s.mentor?.name === activeChatMentor?.name
              ) || studentSessions[0]
            }
            onBack={() => setActiveChatMentor(null)}
            onViewSession={(targetSession) => {
              if (targetSession?.status === 'confirmed') {
                setViewingConfirmedSession(targetSession);
              } else if (targetSession?.status === 'completed') {
                setViewingCompletedSession(targetSession);
              } else {
                setViewingSessionDetails(targetSession);
              }
            }}
            onViewMentorProfile={(mentor) => {
              setViewingMentorProfile(mentor);
            }}
          />
        ) : userRole === 'student' && activeTab === 'messages' ? (
          <MessagesScreen
            onSelectConversation={(thread) => {
              setActiveChatMentor(thread.mentor);
            }}
            onFindMentor={() => {
              setActiveTab('explore');
            }}
          />
        ) : userRole === 'student' && activeTab === 'profile' && viewingLearningProgress ? (
          <LearningProgressScreen
            onBack={() => setViewingLearningProgress(false)}
            onViewSessionHistory={() => {
              setViewingLearningProgress(false);
              setActiveTab('sessions');
            }}
          />
        ) : userRole === 'student' && activeTab === 'profile' ? (
          <ProfileScreen
            onOpenLearningProgress={() => setViewingLearningProgress(true)}
            onViewSessionHistory={() => setActiveTab('sessions')}
            onLogout={() => {
              setAuthView('login');
            }}
          />
        ) : userRole === 'mentor' && viewingMentorNotificationSettings ? (
          <MentorNotificationSettingsScreen
            onBack={() => setViewingMentorNotificationSettings(false)}
          />
        ) : userRole === 'mentor' && viewingMentorNotifications ? (
          <MentorNotificationsScreen
            onBack={() => setViewingMentorNotifications(false)}
            onOpenSettings={() => setViewingMentorNotificationSettings(true)}
            onViewRequests={() => {
              setViewingMentorNotifications(false);
              setActiveTab('sessions');
            }}
            onViewUpcomingSession={(sessionData) => {
              setViewingMentorNotifications(false);
              setViewingMentorSessionDetails(sessionData);
            }}
            onViewCompletedSession={(sessionData) => {
              setViewingMentorNotifications(false);
              setViewingMentorCompletedSession(sessionData);
            }}
            onMessageStudent={(student) => {
              setViewingMentorNotifications(false);
              setActiveMentorChatStudent(student);
              setActiveTab('messages');
            }}
          />
        ) : userRole === 'mentor' && viewingStudentProfile ? (
          <StudentProfilePreview
            student={viewingStudentProfile}
            onBack={() => setViewingStudentProfile(null)}
            onMessageStudent={(student) => {
              setViewingStudentProfile(null);
              setActiveMentorChatStudent(student);
              setActiveTab('messages');
            }}
            onViewSession={(session) => {
              setViewingStudentProfile(null);
              setActiveTab('sessions');
            }}
          />
        ) : userRole === 'mentor' && activeTab === 'home' ? (
          <MentorDashboard
            onNavigateTab={(tabId) => {
              setViewingStudentProfile(null);
              setActiveMentorChatStudent(null);
              setViewingMentorNotifications(false);
              setViewingMentorNotificationSettings(false);
              setActiveTab(tabId);
            }}
            onViewStudentProfile={(student) => setViewingStudentProfile(student)}
            onOpenNotifications={() => setViewingMentorNotifications(true)}
          />
        ) : userRole === 'mentor' && activeTab === 'students' ? (
          <StudentsRosterScreen
            onMessageStudent={(student) => {
              setActiveMentorChatStudent(student);
              setActiveTab('messages');
            }}
            onViewSession={(session) => {
              setActiveTab('sessions');
            }}
            onViewRequests={() => {
              setActiveTab('sessions');
            }}
            onViewStudentProfile={(student) => setViewingStudentProfile(student)}
          />
        ) : userRole === 'mentor' && activeTab === 'messages' && activeMentorChatStudent ? (
          <MentorChatScreen
            student={activeMentorChatStudent}
            session={{
              id: 'sess-101',
              topic: 'JavaScript Functions, parameters, and return values',
              date: 'Sept 25, 2026',
              time: '7:00 PM – 8:00 PM',
              format: 'Online Room',
              status: 'confirmed'
            }}
            onBack={() => setActiveMentorChatStudent(null)}
            onViewStudentProfile={(student) => {
              setViewingStudentProfile(student);
            }}
            onViewSession={(session) => {
              setActiveMentorChatStudent(null);
              setActiveTab('sessions');
            }}
          />
        ) : userRole === 'mentor' && activeTab === 'messages' ? (
          <MentorMessagesScreen
            onSelectConversation={(thread) => {
              setActiveMentorChatStudent(thread.student);
            }}
            onViewStudents={() => {
              setActiveTab('students');
            }}
          />
        ) : userRole === 'mentor' && viewingMentorSessionDetails ? (
          <MentorSessionDetailsScreen
            session={viewingMentorSessionDetails}
            onBack={() => setViewingMentorSessionDetails(null)}
            onJoinSession={(session) => {
              setViewingMentorSessionDetails(null);
              setActiveClassroomSession(session);
            }}
            onMessageStudent={(student) => {
              setViewingMentorSessionDetails(null);
              setActiveMentorChatStudent(student);
              setActiveTab('messages');
            }}
            onViewStudentProfile={(student) => {
              setViewingMentorSessionDetails(null);
              setViewingStudentProfile(student);
            }}
          />
        ) : userRole === 'mentor' && viewingMentorCompletedSession ? (
          <MentorSessionCompletedScreen
            session={viewingMentorCompletedSession}
            onBack={() => setViewingMentorCompletedSession(null)}
            onViewStudentProfile={(student) => {
              setViewingMentorCompletedSession(null);
              setViewingStudentProfile(student);
            }}
            onMessageStudent={(student) => {
              setViewingMentorCompletedSession(null);
              setActiveMentorChatStudent(student);
              setActiveTab('messages');
            }}
          />
        ) : userRole === 'mentor' && activeTab === 'sessions' ? (
          <MentorSessionsScreen
            onViewSessionDetails={(session) => setViewingMentorSessionDetails(session)}
            onViewCompletedSession={(session) => setViewingMentorCompletedSession(session)}
            onJoinSession={(session) => {
              setActiveClassroomSession(session);
            }}
            onViewStudents={() => setActiveTab('students')}
            onMessageStudent={(student) => {
              setActiveMentorChatStudent(student);
              setActiveTab('messages');
            }}
          />
        ) : userRole === 'mentor' && viewingMentorAvailability ? (
          <AvailabilityScreen
            onBack={() => setViewingMentorAvailability(false)}
          />
        ) : userRole === 'mentor' && activeTab === 'profile' ? (
          <MentorProfileSettingsScreen
            onOpenAvailability={() => setViewingMentorAvailability(true)}
            onOpenNotifications={() => setViewingMentorNotificationSettings(true)}
            onViewStudents={() => {
              setViewingMentorAvailability(false);
              setActiveTab('students');
            }}
            onViewSessions={() => {
              setViewingMentorAvailability(false);
              setActiveTab('sessions');
            }}
            onLogout={() => setAuthView('login')}
          />
        ) : (
          <>
            {/* Active View Header */}
            <div className="flex items-center justify-between px-0.5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 capitalize">
                  {activeTab === 'home' && 'Mentor Dashboard'}
                  {activeTab === 'explore' && 'Explore Mentors'}
                  {activeTab === 'students' && 'My Students'}
                  {activeTab === 'messages' && 'Messages'}
                  {activeTab === 'sessions' && 'My Sessions'}
                  {activeTab === 'profile' && 'Profile & Settings'}
                </h2>
                <p className="text-xs text-slate-500">
                  {userRole === 'student'
                    ? 'Peer Tutoring & Academic Mentorship'
                    : 'Manage Mentees & Service Hours'}
                </p>
              </div>

              {/* Top Action / Notification */}
              <button
                onClick={() => {
                  if (userRole === 'mentor') {
                    setViewingMentorNotifications(true);
                  }
                }}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-600 shadow-xs active:scale-95 transition-all"
                aria-label="Notifications"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>
            </div>

            {/* View Content Placeholder Container */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 mx-auto flex items-center justify-center border border-sky-100">
                {currentTabs.find((t) => t.id === activeTab)?.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 capitalize">
                  {currentTabs.find((t) => t.id === activeTab)?.label} View
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  {userRole === 'student'
                    ? `Student ${activeTab} screen container ready for feature component integration.`
                    : `Mentor ${activeTab} screen container ready for feature component integration.`}
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* 3. Persistent Mobile Bottom Navigation Bar (5-Tab Dual Architecture) */}
      {!viewingMentorProfile && !activeBookingMentor && !pendingReviewBooking && !viewingSessionDetails && !viewingConfirmedSession && !activeClassroomSession && !viewingCompletedSession && !activeChatMentor && !viewingLearningProgress && !viewingStudentProfile && !activeMentorChatStudent && !viewingMentorSessionDetails && !viewingMentorCompletedSession && !viewingMentorNotifications && !viewingMentorNotificationSettings && !viewingMentorAvailability && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 bottom-nav-bar z-40 px-2 flex items-center justify-around shadow-xs">
          {currentTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveBookingMentor(null);
                  setViewingMentorProfile(null);
                  setPendingReviewBooking(null);
                  setViewingSessionDetails(null);
                  setViewingConfirmedSession(null);
                  setActiveClassroomSession(null);
                  setViewingCompletedSession(null);
                  setActiveChatMentor(null);
                  setViewingLearningProgress(false);
                  setViewingStudentProfile(null);
                  setActiveMentorChatStudent(null);
                  setViewingMentorSessionDetails(null);
                  setViewingMentorCompletedSession(null);
                  setViewingMentorNotifications(false);
                  setViewingMentorNotificationSettings(false);
                  setViewingMentorAvailability(false);
                }}
                className={`touch-target flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  isActive ? 'text-sky-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className="mb-0.5">{tab.icon}</div>
                <span className="text-[10px] tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
