import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.png';

export default function SplashScreen({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start subtle fade-out transition after 1.8s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1800);

    // Complete splash screen and redirect to Login after 2.1s
    const redirectTimer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 2100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`w-full h-full bg-white flex flex-col items-center justify-center px-6 font-sans select-none relative overflow-hidden touch-none transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Center Branding Content - Exactly Centered in Viewport */}
      <div className="flex flex-col items-center text-center animate-fade-in relative z-10 -mt-4">
        
        {/* Responsive Large Logo Container */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-sky-50 rounded-full blur-2xl transition-all"></div>
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 max-w-[70vw] max-h-[70vw] flex items-center justify-center">
            <img
              src={logoImg}
              alt="MentorLink"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Tagline - Pulled Close Directly Beneath Logo */}
        <p className="text-xs sm:text-sm font-bold text-slate-500 tracking-[0.22em] uppercase -mt-3 sm:-mt-4 select-none">
          Connect • Learn • Grow
        </p>

      </div>

      {/* Bottom Loading Indicator & Version Information - Absolutely Positioned */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center space-y-2.5">
        {/* Minimalist Loading Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 rounded-full bg-sky-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>

        {/* Version Badge */}
        <div className="text-[11px] font-medium text-slate-400 tracking-wider">
          v1.0.0 • Peer Mentorship & Tutoring
        </div>
      </div>

    </div>
  );
}
