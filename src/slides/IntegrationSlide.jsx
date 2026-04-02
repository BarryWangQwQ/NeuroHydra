import React from 'react';
import { Brain, FileText, Dna, Cpu, Scan, Zap, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const IntegrationSlide = ({ autoPlay, manualTick }) => {
  const { language } = useLanguage();
  const t = translations[language].integrationSlide;

  const baseDelay = 0.2;
  const stepDelay = 0.3;

  const modalities = [
    { icon: Brain, label: t.brainMRI, status: t.brainMRIStatus, checked: true, theme: 'blue' },
    { icon: FileText, label: t.clinicalData, status: t.clinicalDataStatus, checked: true, theme: 'teal' },
    { icon: Dna, label: t.spatialTranscriptomics, status: t.spatialTranscriptomicsStatus, checked: false, theme: 'emerald' },
  ];

  const considerations = [
    { icon: Scan, title: t.preprocTitle, desc: t.preprocDesc },
    { icon: Zap, title: t.efficiencyTitle, desc: t.efficiencyDesc },
    { icon: Target, title: t.strategyTitle, desc: t.strategyDesc },
  ];

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-20 py-16 relative overflow-hidden"
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
          className="absolute top-1/4 left-1/4 w-[640px] h-[640px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(52, 211, 153, 0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-10 items-center">
        {/* Title */}
        <div className="reveal-line text-center" style={{ animationDelay: `${baseDelay}s` }}>
          <h1
            className="text-[42px] font-black tracking-tight leading-tight"
            style={{ fontSize: 'clamp(28px, 4.5vw, 42px)' }}
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
        </div>

        {/* Architecture diagram */}
        <div className="flex flex-col items-center gap-0">
          {/* Three modality cards */}
          <div
            className="flex items-stretch gap-6 reveal-line"
            style={{ animationDelay: `${baseDelay + stepDelay}s` }}
          >
            {modalities.map((mod, i) => {
              const Icon = mod.icon;
              const isPlanned = !mod.checked;
              const themeColors = {
                blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', status: 'text-blue-500' },
                teal: { bg: 'bg-teal-50', border: 'border-teal-200', icon: 'bg-teal-100 text-teal-600', status: 'text-teal-500' },
                emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-100 text-emerald-600', status: 'text-emerald-500' },
              };
              const c = themeColors[mod.theme];
              return (
                <div
                  key={i}
                  className={`w-48 p-5 rounded-2xl flex flex-col items-center gap-3 text-center transition-all ${
                    isPlanned
                      ? 'bg-white border-2 border-dashed border-slate-300'
                      : `${c.bg} border ${c.border}`
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.icon}`}>
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700">{mod.label}</div>
                    <div className={`text-xs font-bold mt-1 uppercase tracking-wider ${isPlanned ? 'text-slate-400' : c.status}`}>
                      {mod.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Convergence lines SVG */}
          <div
            className="reveal-line"
            style={{ animationDelay: `${baseDelay + stepDelay * 2}s` }}
          >
            <svg width="500" height="60" viewBox="0 0 500 60" className="overflow-visible">
              <line x1="100" y1="5" x2="250" y2="50" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="250" y1="5" x2="250" y2="50" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="400" y1="5" x2="250" y2="50" stroke="#E2E8F0" strokeWidth="2" />
              <polygon points="245,50 250,60 255,50" fill="#CBD5E1" />
            </svg>
          </div>

          {/* NeuroHydra central block */}
          <div
            className="reveal-line w-72 p-5 rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-black text-white shadow-xl border border-slate-600 flex items-center gap-4"
            style={{ animationDelay: `${baseDelay + stepDelay * 3}s` }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <Cpu size={24} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight">{t.neuroHydra}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t.neuroHydraDesc}
              </div>
            </div>
          </div>
        </div>

        {/* Practical considerations */}
        <div
          className="flex gap-5 w-full reveal-line"
          style={{ animationDelay: `${baseDelay + stepDelay * 4}s` }}
        >
          {considerations.map((item, i) => {
            const Icon = item.icon;
            const colors = ['from-indigo-50 to-blue-50 border-indigo-100', 'from-amber-50 to-orange-50 border-amber-100', 'from-teal-50 to-cyan-50 border-teal-100'];
            const iconColors = ['text-indigo-600', 'text-amber-600', 'text-teal-600'];
            return (
              <div
                key={i}
                className={`flex-1 p-4 rounded-2xl bg-gradient-to-br ${colors[i]} border shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} strokeWidth={2.5} className={iconColors[i]} />
                  <span className="text-sm font-bold text-slate-700">{item.title}</span>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.desc}</p>
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

export default IntegrationSlide;
