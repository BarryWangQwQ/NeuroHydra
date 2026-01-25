import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SignificanceSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: 'Significance',
      items: [
        {
          title: 'Bridges 2D and 3D domains',
          description: 'Learns volumetric context from slice-level data without full 3D supervision.'
        },
        {
          title: 'Achieves computational efficiency',
          description: 'Avoids exponential 3D attention cost while preserving spatial coherence.'
        },
        {
          title: 'Enables interpretable fusion',
          description: 'Visualizes which slices and clinical factors drive predictions.'
        }
      ]
    },
    en: {
      title: 'Significance',
      items: [
        {
          title: 'Bridges 2D and 3D domains',
          description: 'Learns volumetric context from slice-level data without full 3D supervision.'
        },
        {
          title: 'Achieves computational efficiency',
          description: 'Avoids exponential 3D attention cost while preserving spatial coherence.'
        },
        {
          title: 'Enables interpretable fusion',
          description: 'Visualizes which slices and clinical factors drive predictions.'
        }
      ]
    }
  };

  const t = content[language];
  const baseDelay = 0.2;
  const stepDelay = 0.3;

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-20 py-20 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes aurora-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .reveal-line {
          opacity: 0;
          animation: fade-up 0.8s ease forwards;
        }

        .aurora-text {
          background: linear-gradient(90deg, #2563eb, #9333ea, #ec4899, #2563eb);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: aurora-shift 3s ease infinite;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

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

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-14">
        <h1
          className="text-[64px] font-black tracking-[-0.01em] text-slate-900"
          style={{ animationDelay: `${baseDelay}s` }}
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent reveal-line inline-block">
            {t.title}
          </span>
        </h1>

        <div className="flex flex-col gap-8">
          {t.items.map((item, index) => {
            const itemDelay = baseDelay + (index + 1) * stepDelay;

            return (
              <div key={index} className="flex items-start gap-6">
                <div 
                  className="flex-shrink-0 w-3 h-3 rounded-full mt-3 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 reveal-line"
                  style={{ animationDelay: `${itemDelay}s` }}
                />
                <div className="flex-1 reveal-line" style={{ animationDelay: `${itemDelay}s` }}>
                  <p className="text-[20px] font-semibold text-slate-700 leading-relaxed">
                    <strong>{item.title}</strong>
                  </p>
                  <p className="text-[20px] font-normal text-slate-500 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SignificanceSlide;
