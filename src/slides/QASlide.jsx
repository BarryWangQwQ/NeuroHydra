import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const QASlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: 'Q&A',
      narration: '感谢大家！欢迎提问。'
    },
    en: {
      title: 'Q&A',
      narration: 'Thank you all! Questions are welcome.'
    }
  };

  const t = content[language] ?? content.en;

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-20 py-20 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
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

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

      {/* Background gradients (match existing slides) */}
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

      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center">
        <h1 className="text-[132px] font-black leading-[0.95] tracking-[-0.02em] text-center">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
            {t.title}
          </span>
        </h1>
      </div>

      {/* Bottom Description Bar - 悬浮旁白区域 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-6xl">
        <div className="relative px-12 py-4 rounded-xl bg-slate-800/90 backdrop-blur-xl shadow-xl shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
          <p className="text-xl leading-snug text-white font-medium text-center tracking-wide animate-fade-in">
            {t.narration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QASlide;

