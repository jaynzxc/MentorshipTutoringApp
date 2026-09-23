import React, { useState } from 'react';

export default function ReviewBookingScreen({ bookingData, onBack, onComplete }) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Fallback defaults if opened directly
  const data = bookingData || {
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
    topic: 'I want help understanding JavaScript functions, parameters, and return values.'
  };

  const mentor = data.mentor;

  // Format readable date
  const getReadableDate = (iso) => {
    if (!iso) return 'Friday, September 25, 2026';
    if (iso === '2026-09-25') return 'Friday, September 25, 2026';
    if (iso === '2026-09-21') return 'Monday, September 21, 2026';
    if (iso === '2026-09-22') return 'Tuesday, September 22, 2026';
    if (iso === '2026-09-23') return 'Wednesday, September 23, 2026';
    if (iso === '2026-09-24') return 'Thursday, September 24, 2026';
    return iso;
  };

  const readableDate = getReadableDate(data.date);

  const handleConfirmAndSend = () => {
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="space-y-4 animate-fade-in pb-24">
      {/* 1. Top Header with Back Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 pt-1">
        <button
          onClick={onBack}
          className="touch-target inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 active:scale-95 transition-all"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <span>Back to Configuration</span>
        </button>

        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
          Step 2 of 2: Review
        </span>
      </div>

      {/* Screen Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Review Booking
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Please confirm all session parameters before sending your request to the mentor.
        </p>
      </div>

      {/* 2. Mentor Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full ${mentor.avatarBg || 'bg-sky-600'} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
          >
            {mentor.initials || 'AS'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                {mentor.name}
              </h2>
              {mentor.isVerified && (
                <svg className="w-3.5 h-3.5 text-sky-600 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified Mentor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">{mentor.specialization}</p>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-semibold text-slate-700">
              <svg className="w-3.5 h-3.5 fill-sky-500 text-sky-500" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <span>{mentor.rating ? mentor.rating.toFixed(1) : '4.9'}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{mentor.sessionsCount || 24} Sessions</span>
            </div>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          {mentor.isVolunteer ? 'Volunteer (₱0)' : mentor.rate}
        </span>
      </div>

      {/* 3. Session Details Comprehensive Summary */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Session Details
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
            <span className="font-bold text-slate-800">{readableDate}</span>
          </div>

          {/* Time */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Time</span>
            </div>
            <span className="font-bold text-slate-800">{data.time}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Duration</span>
            </div>
            <span className="font-bold text-slate-800">{data.duration}</span>
          </div>

          {/* Format */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <svg className="w-4 h-4 text-sky-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span>Format</span>
            </div>
            <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
              {data.format === 'Online' ? 'Online (Virtual Classroom)' : data.format}
            </span>
          </div>

          {/* Mentoring Fee */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span>Mentoring Fee</span>
            </div>
            <span className="font-black text-emerald-600">
              {mentor.isVolunteer ? '₱0.00 · Volunteer (Service Hours)' : mentor.rate}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Session Topic Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            What you'd like to learn
          </h3>
          <span className="text-[10px] font-semibold text-sky-600">Learning Goal</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed font-medium">
          {data.topic}
        </div>
      </div>

      {/* 5. Booking Request Note Banner */}
      <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 flex items-start gap-3">
        <svg className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        <div className="space-y-1 text-xs text-sky-900 leading-relaxed">
          <p className="font-bold">Booking Request Notice</p>
          <p className="text-sky-800 font-normal">
            This will be sent as a session request to {mentor.name}. Your session will only be confirmed after the mentor accepts your request.
          </p>
        </div>
      </div>

      {/* 6. Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleConfirmAndSend}
          className="touch-target w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3.5 px-4 rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span>Confirm & Send Request</span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="touch-target w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold py-2.5 rounded-2xl transition-all active:scale-[0.99]"
        >
          Edit Booking Details
        </button>
      </div>

      {/* 7. Request Sent Success Confirmation Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100 text-center animate-scale-up">
            {/* Success Check Icon */}
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>

            {/* Modal Heading & Text */}
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">Request Sent!</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Your session request has been sent to{' '}
                <span className="font-bold text-slate-800">{mentor.name}</span>. You'll be notified once the mentor responds.
              </p>
            </div>

            {/* Status Summary Pill Box */}
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/80 text-left text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-amber-900">
                <span>Session Status</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold border border-amber-300">
                  PENDING
                </span>
              </div>
              <p className="text-[11px] text-amber-800 font-medium">
                {readableDate} · {data.time}
              </p>
            </div>

            {/* View My Sessions Action */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  if (onComplete) onComplete(data);
                }}
                className="touch-target w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3 rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-1.5"
              >
                <span>View My Sessions</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
