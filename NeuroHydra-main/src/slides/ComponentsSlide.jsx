import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ComponentsSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      items: [
        {
          title: 'DINOv3',
          description: '2D Medical Image Foundation Backbone'
        },
        {
          title: 'AS-VSF',
          description: 'Fusing Dense and Sparse Information'
        },
        {
          title: 'MAMBA',
          description: 'Sequential Modeling, learnable memory'
        }
      ]
    },
    en: {
      items: [
        {
          title: 'DINOv3',
          description: '2D Medical Image Foundation Backbone'
        },
        {
          title: 'AS-VSF',
          description: 'Fusing Dense and Sparse Information'
        },
        {
          title: 'MAMBA',
          description: 'Sequential Modeling, learnable memory'
        }
      ]
    }
  };

  const t = content[language];
  const baseDelay = 0.2;
  const stepDelay = 0.4;

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

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .reveal-line {
          opacity: 0;
          animation: fade-up 0.8s ease forwards;
        }

        .gradient-text {
          background: linear-gradient(90deg, #2563eb, #9333ea, #ec4899, #14b8a6, #06b6d4);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>

      {/* Background gradients matching other slides */}
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

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-16 items-center">
        {t.items.map((item, index) => {
          const itemDelay = baseDelay + index * stepDelay;

          return (
            <div key={item.title} className="flex flex-col gap-3 items-center text-center">
              <h1
                className="text-[80px] font-black leading-none tracking-[-0.01em] reveal-line"
                style={{ animationDelay: `${itemDelay}s` }}
              >
                <span className="gradient-text">
                  {item.title}
                </span>
              </h1>
              <p
                className="text-[20px] font-normal text-slate-500 leading-relaxed reveal-line"
                style={{ animationDelay: `${itemDelay + stepDelay * 0.3}s` }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComponentsSlide;
