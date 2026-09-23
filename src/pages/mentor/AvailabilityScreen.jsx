import React, { useState } from 'react';

/**
 * Mentor Availability & Weekly Schedule Screen
 * Conforms to Section 8.1 of docs/mentor_flow_spec.md & lines 2743–2840 of docs/mobile_contents_guide.md.
 * Features:
 * - Available for Bookings toggle switch.
 * - Day-by-day weekly schedule rows (Mon–Sun) with status pills and time ranges.
 * - Default session duration picker (30m, 45m, 60m).
 * - Interactive + Add Time Slot modal with day selection and time inputs.
 * - Save Availability CTA with instant feedback toast.
 * - Strictly uses vector SVGs — zero raw emojis in UI.
 */
export default function AvailabilityScreen({ onBack }) {
  const [isAcceptingRequests, setIsAcceptingRequests] = useState(true);
  const [defaultDuration, setDefaultDuration] = useState('60 minutes');

  const [weeklySchedule, setWeeklySchedule] = useState([
    { id: 'mon', day: 'Monday', isAvailable: true, timeRange: '6:00 PM — 9:00 PM' },
    { id: 'tue', day: 'Tuesday', isAvailable: true, timeRange: '6:00 PM — 9:00 PM' },
    { id: 'wed', day: 'Wednesday', isAvailable: true, timeRange: '6:00 PM — 9:00 PM' },
    { id: 'thu', day: 'Thursday', isAvailable: false, timeRange: 'Unavailable' },
    { id: 'fri', day: 'Friday', isAvailable: true, timeRange: '6:00 PM — 9:00 PM' },
    { id: 'sat', day: 'Saturday', isAvailable: false, timeRange: 'Unavailable' },
    { id: 'sun', day: 'Sunday', isAvailable: false, timeRange: 'Unavailable' }
  ]);

  // Modal State for Adding/Editing Slot
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [editingDayId, setEditingDayId] = useState(null);
  const [selectedDay, setSelectedDay] = useState('sat');
  const [startTime, setStartTime] = useState('02:00 PM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleDayStatus = (id) => {
    setWeeklySchedule((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isAvailable: !item.isAvailable,
              timeRange: !item.isAvailable ? '6:00 PM — 9:00 PM' : 'Unavailable'
            }
          : item
      )
    );
  };

  const handleOpenEdit = (dayItem) => {
    setEditingDayId(dayItem.id);
    setSelectedDay(dayItem.id);
    if (dayItem.isAvailable && dayItem.timeRange !== 'Unavailable') {
      const parts = dayItem.timeRange.split(' — ');
      if (parts.length === 2) {
        setStartTime(parts[0]);
        setEndTime(parts[1]);
      }
    } else {
      setStartTime('06:00 PM');
      setEndTime('09:00 PM');
    }
    setShowSlotModal(true);
  };

  const handleSaveSlot = () => {
    const formattedRange = `${startTime} — ${endTime}`;
    setWeeklySchedule((prev) =>
      prev.map((item) =>
        item.id === selectedDay
          ? { ...item, isAvailable: true, timeRange: formattedRange }
          : item
      )
    );
    setShowSlotModal(false);
    setEditingDayId(null);
    showToast(`Time slot saved for ${weeklySchedule.find((d) => d.id === selectedDay)?.day || 'Day'}.`);
  };

  const handleSaveAll = () => {
    showToast('Availability Updated — Your schedule has been successfully updated.');
    setTimeout(() => {
      if (onBack) onBack();
    }, 1200);
  };

  return (
    <div className="space-y-4 animate-fade-in pb-24 max-w-md mx-auto relative select-none">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="touch-target -ml-1 p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label="Back to profile"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Availability
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Set your available days and time for mentoring sessions.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Available for Bookings Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 pr-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-slate-900">Available for Bookings</h2>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.2 rounded-full ${
                  isAcceptingRequests
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {isAcceptingRequests ? 'Accepting Students' : 'Not Accepting'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Turn this off when you are temporarily unable to accept new session requests.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsAcceptingRequests(!isAcceptingRequests);
              showToast(!isAcceptingRequests ? 'Now accepting student requests.' : 'Temporarily paused requests.');
            }}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 focus:outline-none shrink-0 ${
              isAcceptingRequests ? 'bg-sky-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white shadow-sm block transition-transform ${
                isAcceptingRequests ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3. Weekly Schedule Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Weekly Schedule
            </h2>
          </div>

          <span className="text-[11px] text-slate-400 font-medium">
            Mon – Sun
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {weeklySchedule.map((item) => (
            <div
              key={item.id}
              className="py-3 flex items-center justify-between gap-2"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{item.day}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                      item.isAvailable
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {item.timeRange}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleDayStatus(item.id)}
                  className={`touch-target text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition-all ${
                    item.isAvailable
                      ? 'text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100'
                      : 'text-sky-700 bg-sky-50 border-sky-200 hover:bg-sky-100'
                  }`}
                >
                  {item.isAvailable ? 'Disable' : 'Enable'}
                </button>

                {item.isAvailable && (
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="touch-target p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
                    title={`Edit ${item.day} hours`}
                    aria-label={`Edit ${item.day} hours`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dashed Add Time Slot Button */}
        <button
          type="button"
          onClick={() => {
            setEditingDayId(null);
            setShowSlotModal(true);
          }}
          className="touch-target w-full py-2.5 rounded-xl border border-dashed border-sky-300 hover:border-sky-500 bg-sky-50/50 hover:bg-sky-50 text-sky-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Custom Time Slot</span>
        </button>
      </div>

      {/* 4. Session Duration Selector */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div>
          <h2 className="text-xs font-bold text-slate-900">Default Session Duration</h2>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            Standard time length allocated per mentoring session booking.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {['30 minutes', '45 minutes', '60 minutes'].map((dur) => (
            <button
              key={dur}
              type="button"
              onClick={() => setDefaultDuration(dur)}
              className={`touch-target py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                defaultDuration === dur
                  ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {dur}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Save Availability Primary Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSaveAll}
          className="touch-target w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-3.5 rounded-2xl shadow-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          <span>Save Availability</span>
        </button>
      </div>

      {/* 6. Add/Edit Time Slot Modal */}
      {showSlotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl space-y-4 animate-scale-up border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {editingDayId ? 'Edit Available Slot' : 'Add Time Slot'}
              </h3>
              <button
                type="button"
                onClick={() => setShowSlotModal(false)}
                className="touch-target p-1 text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Select Day */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Select Day</label>
              <div className="flex flex-wrap gap-1.5">
                {weeklySchedule.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDay(d.id)}
                    className={`touch-target px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                      selectedDay === d.id
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d.day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Start & End Times */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">Start Time</label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="06:00 PM"
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600">End Time</label>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="09:00 PM"
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSlotModal(false)}
                className="touch-target flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSlot}
                className="touch-target flex-1 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 shadow-2xs"
              >
                Save Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg animate-fade-in flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
