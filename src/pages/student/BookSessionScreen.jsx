import React, { useState } from 'react';

export default function BookSessionScreen({ mentor, onBack, onComplete, onProceedToReview }) {
  // Step state: 1 = Configure, 2 = Review, 3 = Confirmation Modal
  const [currentStep, setCurrentStep] = useState(1);

  // Selected Booking Configuration
  const [selectedDate, setSelectedDate] = useState('2026-09-25'); // Sept 25, 2026
  const [selectedTime, setSelectedTime] = useState('7:00 PM – 8:00 PM');
  const [selectedDuration, setSelectedDuration] = useState('60 min');
  const [selectedFormat, setSelectedFormat] = useState('Online');
  const [topic, setTopic] = useState('JavaScript Functions, parameters, and return values');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Default mentor fallback if opened directly
  const activeMentor = mentor || {
    id: 'mentor-1',
    name: 'Alex Santos',
    specialization: 'Web Development Mentor',
    rating: 4.9,
    sessionsCount: 24,
    rate: '₱0.00 / hr (Volunteer)',
    isVolunteer: true,
    avatarBg: 'bg-sky-600',
    initials: 'AS'
  };

  // Calendar dates for September 2026 (Mon 21 - Sun 27)
  const calendarDays = [
    { day: 'Mon', date: 21, iso: '2026-09-21', isAvailable: true },
    { day: 'Tue', date: 22, iso: '2026-09-22', isAvailable: true },
    { day: 'Wed', date: 23, iso: '2026-09-23', isAvailable: true },
    { day: 'Thu', date: 24, iso: '2026-09-24', isAvailable: true },
    { day: 'Fri', date: 25, iso: '2026-09-25', isAvailable: true },
    { day: 'Sat', date: 26, iso: '2026-09-26', isAvailable: false },
    { day: 'Sun', date: 27, iso: '2026-09-27', isAvailable: false }
  ];

  // Available Time Slots
  const timeSlots = [
    '6:00 PM – 7:00 PM',
    '7:00 PM – 8:00 PM',
    '8:00 PM – 9:00 PM'
  ];

  // Duration Options
  const durations = ['30 min', '45 min', '60 min'];

  // Format Options
  const formats = ['Online (In-App Classroom)', 'In-person'];

  // Topic quick suggestions
  const topicSuggestions = [
    'JavaScript Functions & Scope',
    'React Hooks & State',
    'HTML & Responsive CSS Grid',
    'Git & GitHub Pull Requests'
  ];

  // Handle proceed to Review
  const handleProceedToReview = (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setErrorMsg('Please describe what topic you would like help with.');
      return;
    }
    setErrorMsg('');
    if (onProceedToReview) {
      onProceedToReview({
        mentor: activeMentor,
        date: selectedDate,
        time: selectedTime,
        duration: selectedDuration,
        format: selectedFormat,
        topic: topic
      });
      return;
    }
    setCurrentStep(2);
  };

  // Handle final submission
  const handleConfirmBooking = () => {
    setIsSuccessModalOpen(true);
  };

  // Format readable date
  const getReadableDate = (iso) => {
    if (iso === '2026-09-25') return 'Friday, September 25, 2026';
    if (iso === '2026-09-21') return 'Monday, September 21, 2026';
    if (iso === '2026-09-22') return 'Tuesday, September 22, 2026';
    if (iso === '2026-09-23') return 'Wednesday, September 23, 2026';
    if (iso === '2026-09-24') return 'Thursday, September 24, 2026';
    return iso;
  };

  return (
    <div className="space-y-4 animate-fade-in pb-24">
      {/* 1. Header with Back Button and Step Indicator */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 pt-1">
        <button
          onClick={currentStep === 2 ? () => setCurrentStep(1) : onBack}
          className="touch-target inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 active:scale-95 transition-all"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <span>{currentStep === 2 ? 'Back to Config' : 'Back to Mentors'}</span>
        </button>

        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
            {currentStep === 1 ? 'Step 1 of 2' : 'Step 2 of 2'}
          </span>
        </div>
      </div>

      {/* Screen Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          {currentStep === 1 ? 'Book a Session' : 'Review Booking'}
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {currentStep === 1
            ? 'Select your preferred date, time slot, and learning topic.'
            : 'Confirm all session parameters before submitting your request.'}
        </p>
      </div>

      {/* Mentor Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full ${activeMentor.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
          >
            {activeMentor.initials}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              {activeMentor.name}
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              {activeMentor.specialization}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-semibold text-slate-700">
              <svg className="w-3.5 h-3.5 fill-sky-500 text-sky-500" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              <span>{activeMentor.rating.toFixed(1)}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{activeMentor.sessionsCount} Sessions</span>
            </div>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          {activeMentor.isVolunteer ? 'Volunteer (₱0)' : activeMentor.rate}
        </span>
      </div>

      {/* ================= STEP 1: CONFIGURE BOOKING ================= */}
      {currentStep === 1 && (
        <form onSubmit={handleProceedToReview} className="space-y-4">
          {/* 1. Date Picker */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Choose a Date
              </label>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <span className="text-sky-600 font-bold">September 2026</span>
              </div>
            </div>

            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {calendarDays.map((item) => {
                const isSelected = selectedDate === item.iso;
                return (
                  <button
                    key={item.iso}
                    type="button"
                    disabled={!item.isAvailable}
                    onClick={() => setSelectedDate(item.iso)}
                    className={`py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center ${
                      !item.isAvailable
                        ? 'opacity-30 cursor-not-allowed bg-slate-50 text-slate-400'
                        : isSelected
                        ? 'bg-sky-600 text-white font-bold shadow-xs scale-[1.02]'
                        : 'bg-slate-50 hover:bg-sky-50 text-slate-700 border border-slate-100'
                    }`}
                  >
                    <span className="text-[9px] font-semibold uppercase">{item.day}</span>
                    <span className="text-xs font-black mt-0.5">{item.date}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500 font-medium">
              Selected: <span className="font-semibold text-sky-700">{getReadableDate(selectedDate)}</span>
            </p>
          </div>

          {/* 2. Choose Time Slot */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Available Times
            </label>

            <div className="grid grid-cols-1 gap-2">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/80 text-sky-900 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span>{time}</span>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Session Duration & Format */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Choose Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {durations.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDuration(d)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                      selectedDuration === d
                        ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Session Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {formats.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedFormat(f.split(' ')[0])}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      selectedFormat === f.split(' ')[0]
                        ? 'bg-sky-50 border-sky-500 text-sky-700 font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Session Topic & Questions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2.5">
            <div className="space-y-0.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                What would you like to learn?
              </label>
              <p className="text-[11px] text-slate-400">
                Describe your topic or questions so your mentor can prepare effectively.
              </p>
            </div>

            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., I want help understanding JavaScript functions, parameters, and return values."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 transition-all"
            />

            {errorMsg && (
              <p className="text-[11px] text-red-600 font-medium">{errorMsg}</p>
            )}

            {/* Quick Topic Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold text-slate-400">Quick autofill:</span>
              <div className="flex flex-wrap gap-1.5">
                {topicSuggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setTopic(sug)}
                    className="text-[10px] px-2 py-1 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-600 transition-all font-medium"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 1 Primary CTA Button */}
          <button
            type="submit"
            className="touch-target w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3 rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-1.5"
          >
            <span>Continue to Review</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </form>
      )}

      {/* ================= STEP 2: REVIEW & CONFIRM ================= */}
      {currentStep === 2 && (
        <div className="space-y-4">
          {/* Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Session Summary
            </h3>

            <div className="space-y-3 text-xs divide-y divide-slate-100">
              {/* Mentor */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 font-medium">Mentor:</span>
                <span className="font-bold text-slate-900">{activeMentor.name}</span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between pt-3">
                <span className="text-slate-500 font-medium">Date:</span>
                <span className="font-semibold text-slate-800">{getReadableDate(selectedDate)}</span>
              </div>

              {/* Time */}
              <div className="flex items-center justify-between pt-3">
                <span className="text-slate-500 font-medium">Time:</span>
                <span className="font-semibold text-slate-800">{selectedTime}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between pt-3">
                <span className="text-slate-500 font-medium">Duration:</span>
                <span className="font-semibold text-slate-800">{selectedDuration}</span>
              </div>

              {/* Format */}
              <div className="flex items-center justify-between pt-3">
                <span className="text-slate-500 font-medium">Format:</span>
                <span className="font-semibold text-sky-600">{selectedFormat} (In-App Classroom)</span>
              </div>

              {/* Rate */}
              <div className="flex items-center justify-between pt-3">
                <span className="text-slate-500 font-medium">Mentoring Fee:</span>
                <span className="font-bold text-emerald-600">
                  {activeMentor.isVolunteer ? '₱0.00 (Volunteer Hours Accredited)' : activeMentor.rate}
                </span>
              </div>

              {/* Topic */}
              <div className="pt-3 space-y-1">
                <span className="text-slate-500 font-medium block">Learning Topic:</span>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-medium">
                  {topic}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Policy Notice */}
          <div className="bg-sky-50 rounded-2xl p-4 border border-sky-100 flex items-start gap-3">
            <svg className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <div className="space-y-1 text-xs text-sky-900 leading-relaxed">
              <p className="font-bold">Booking Request Notice</p>
              <p className="text-sky-800 font-normal">
                This will be sent as a session request to {activeMentor.name}. Your session will only be confirmed after the mentor accepts your request.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleConfirmBooking}
              className="touch-target w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3 rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
              <span>Confirm & Send Request</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="touch-target w-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold py-2.5 rounded-2xl transition-all active:scale-[0.99]"
            >
              Edit Booking Details
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: REQUEST SENT SUCCESS MODAL ================= */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100 text-center animate-scale-up">
            {/* Success Icon */}
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">Request Sent!</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Your session request has been sent to{' '}
                <span className="font-bold text-slate-800">{activeMentor.name}</span>. You'll be notified once the mentor responds.
              </p>
            </div>

            {/* Status Card */}
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/80 text-left text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-amber-900">
                <span>Session Status</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800">
                  PENDING
                </span>
              </div>
              <p className="text-[11px] text-amber-700">
                {getReadableDate(selectedDate)} · {selectedTime}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  if (onComplete) onComplete();
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
