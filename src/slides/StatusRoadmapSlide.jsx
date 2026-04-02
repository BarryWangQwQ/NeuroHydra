import React from 'react';
import { FileCheck, Cpu, Layers, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const StatusRoadmapSlide = ({ autoPlay, manualTick }) => {
  const { language } = useLanguage();
  const t = translations[language].statusRoadmapSlide;

  const baseDelay = 0.2;
  const stepDelay = 0.2;

  const sections = [
    { icon: FileCheck, title: t.q1Title, color: 'indigo', items: t.q1Items },
    { icon: Cpu, title: t.q2Title, color: 'purple', items: t.q2Items },
    { icon: Layers, title: t.q3Title, color: 'teal', items: t.q3Items },
    { icon: Users, title: t.q4Title, color: 'rose', items: t.q4Items },
  ];

  const colorMap = {
    indigo: {
      border: 'border-indigo-200',
      bg: 'from-indigo-50/60 to-white',
      iconBg: 'bg-indigo-100',
      iconText: 'text-indigo-600',
      label: 'text-indigo-600',
      dot: 'bg-indigo-400',
      topAccent: 'from-indigo-400 to-blue-400',
    },
    purple: {
      border: 'border-purple-200',
      bg: 'from-purple-50/60 to-white',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      label: 'text-purple-600',
      dot: 'bg-purple-400',
      topAccent: 'from-purple-400 to-violet-400',
    },
    teal: {
      border: 'border-teal-200',
      bg: 'from-teal-50/60 to-white',
      iconBg: 'bg-teal-100',
      iconText: 'text-teal-600',
      label: 'text-teal-600',
      dot: 'bg-teal-400',
      topAccent: 'from-teal-400 to-cyan-400',
    },
    rose: {
      border: 'border-rose-200',
      bg: 'from-rose-50/60 to-white',
      iconBg: 'bg-rose-100',
      iconText: 'text-rose-600',
      label: 'text-rose-600',
      dot: 'bg-rose-400',
      topAccent: 'from-rose-400 to-pink-400',
    },
  };

  return (
    <div
      className="min-h-slide bg-white flex items-center justify-center px-16 py-16 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .reveal-line {
          opacity: 0;
          animation: fade-up 0.8s ease forwards;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

      {/* Background gradient blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-10">
        {/* Title */}
        <div
          className="reveal-line"
          style={{ animationDelay: `${baseDelay}s` }}
        >
          <h1
            className="text-[42px] font-black tracking-tight leading-tight"
            style={{ fontSize: 'clamp(28px, 4.5vw, 42px)' }}
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-2 gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            const c = colorMap[section.color];
            const delay = baseDelay + (idx + 1) * stepDelay;

            return (
              <div
                key={idx}
                className={`reveal-line rounded-2xl border ${c.border} bg-gradient-to-br ${c.bg} p-8 flex flex-col gap-5 relative overflow-hidden shadow-sm`}
                style={{ animationDelay: `${delay}s` }}
              >
                <div className={`absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r ${c.topAccent}`} />

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} ${c.iconText} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-wider ${c.label}`}>
                    {section.title}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${c.dot} mt-[8px] flex-shrink-0`} />
                      <span className="text-[15px] font-medium text-slate-600 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom narration bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-5xl">
        <div className="relative px-8 py-3 rounded-xl bg-slate-800/75 backdrop-blur-2xl shadow-lg shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
          <p className="text-lg leading-snug text-white/95 font-medium text-center tracking-wide animate-fade-in">
            {t.narration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusRoadmapSlide;
