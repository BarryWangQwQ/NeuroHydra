import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const QAOnlySlide = () => {
  const { language } = useLanguage();

  return (
    <div
      className="min-h-slide bg-white flex items-center justify-center px-slide-x py-slide-y relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", maxWidth: '100vw', overflowX: 'hidden' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient-shift {
          background-size: 200% auto;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[720px] h-[720px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(129, 140, 248, 0.16) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-28 -right-28 w-[820px] h-[820px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.13) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-slide flex flex-col items-center justify-center">
        <h1 className="text-[180px] font-black leading-[0.95] tracking-[-0.02em] text-center break-words" style={{ fontSize: 'clamp(80px, 18vw, 180px)' }}>
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
            Q&A
          </span>
        </h1>
      </div>
    </div>
  );
};

export default QAOnlySlide;
