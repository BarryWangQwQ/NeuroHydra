import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CanYourDataSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      sentence: 'Can your data use NeuroHydra?'
    },
    en: {
      sentence: 'Can your data use NeuroHydra?'
    }
  };

  const t = content[language];

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-20 py-20 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes breathe-text {
          0%, 100% { 
            transform: scale(1);
          }
          50% { 
            transform: scale(1.08);
          }
        }

        .breathing-text {
          animation: breathe-text 3s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      {/* Background gradients matching UseCaseSlide */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-[640px] h-[640px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center">
        <h1 className="text-[72px] font-black tracking-[-0.01em] text-center">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent breathing-text">
            {t.sentence}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default CanYourDataSlide;
