import React from 'react';
import { Brain, Database, Dna, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const SpatialTranscriptomicsSlide = ({ autoPlay, manualTick }) => {
  const { language } = useLanguage();
  const t = translations[language].spatialTranscriptomicsSlide;

  const baseDelay = 0.15;
  const step = 0.22;

  return (
    <div
      className="min-h-slide bg-white flex items-center justify-center px-16 py-12 relative overflow-hidden"
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
        @keyframes draw-line {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .draw-anim {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-line 1s ease forwards;
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

      <div className="relative z-10 w-full max-w-7xl flex flex-col gap-8">
        {/* Title */}
        <div className="reveal-line" style={{ animationDelay: `${baseDelay}s` }}>
          <h1
            className="text-[42px] font-black tracking-tight leading-tight"
            style={{ fontSize: 'clamp(28px, 4.5vw, 42px)' }}
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
        </div>

        {/* Diagram */}
        <div className="flex items-stretch gap-0 w-full">

          {/* LEFT: Two stacked blocks */}
          <div className="flex flex-col gap-5 flex-shrink-0" style={{ width: '62%' }}>

            {/* Existing Framework block */}
            <div
              className="reveal-line relative rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50/60 via-white to-slate-50/40 p-5"
              style={{ animationDelay: `${baseDelay + step}s` }}
            >
              <div className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                {t.existingFramework}
              </div>

              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Brain size={18} className="text-blue-600" />
                    </div>
                    <span className="text-[15px] font-bold text-slate-700">MRI</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 py-2.5 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Database size={18} className="text-teal-600" />
                    </div>
                    <span className="text-[15px] font-bold text-slate-700">{t.clinicalData}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <svg width="56" height="20" viewBox="0 0 56 20">
                    <path d="M 0 10 L 40 10" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
                    <path d="M 36 4 L 48 10 L 36 16" stroke="#cbd5e1" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 shadow-sm flex-1">
                  <div className="text-[15px] font-bold text-slate-700">{t.modalityEncoders}</div>
                </div>
              </div>
            </div>

            {/* Spatial Transcriptomics block */}
            <div
              className="reveal-line relative rounded-2xl border-2 border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30 p-5"
              style={{ animationDelay: `${baseDelay + step * 2}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                  {t.stTitle}
                </div>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-200">
                  {t.exploratoryLabel}
                </span>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <div className="flex items-center gap-3 bg-white rounded-xl border border-emerald-200 px-4 py-2.5 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Dna size={18} className="text-emerald-600" />
                    </div>
                    <div className="text-[15px] font-bold text-slate-700">{t.spatialCoords}</div>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-xl border border-emerald-200 px-4 py-2.5 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Dna size={18} className="text-teal-600" />
                    </div>
                    <div className="text-[15px] font-bold text-slate-700">{t.geneExpression}</div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <svg width="56" height="20" viewBox="0 0 56 20">
                    <path d="M 0 10 L 40 10" stroke="#6ee7b7" strokeWidth="2.5" fill="none" />
                    <path d="M 36 4 L 48 10 L 36 16" stroke="#6ee7b7" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  <div className="bg-white rounded-xl border border-emerald-200 px-5 py-3 shadow-sm">
                    <div className="text-[15px] font-bold text-slate-700">{t.spatialEncoder}</div>
                    <div className="text-xs text-emerald-500 font-semibold mt-0.5">{t.spatialEncoderHint}</div>
                  </div>
                  <div className="bg-white rounded-xl border border-emerald-200 px-5 py-3 shadow-sm">
                    <div className="text-[15px] font-bold text-slate-700">{t.molecularEncoder}</div>
                    <div className="text-xs text-emerald-500 font-semibold mt-0.5">{t.molecularEncoderHint}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONVERGE ARROWS */}
          <div
            className="reveal-line flex-shrink-0 flex items-center justify-center relative"
            style={{ width: '8%', animationDelay: `${baseDelay + step * 3}s` }}
          >
            <svg className="w-full h-56" viewBox="0 0 100 280" preserveAspectRatio="xMidYMid meet">
              <path d="M 0 70 C 50 70, 50 140, 100 140" fill="none" stroke="#cbd5e1" strokeWidth="3" className="draw-anim" style={{ animationDelay: `${baseDelay + step * 3.5}s` }} />
              <path d="M 0 210 C 50 210, 50 140, 100 140" fill="none" stroke="#6ee7b7" strokeWidth="3" className="draw-anim" style={{ animationDelay: `${baseDelay + step * 3.5}s` }} />
            </svg>
          </div>

          {/* RIGHT: Fusion block */}
          <div
            className="reveal-line flex-shrink-0 flex items-center"
            style={{ width: '28%', animationDelay: `${baseDelay + step * 4}s` }}
          >
            <div className="w-full rounded-2xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-white p-6 shadow-lg flex flex-col items-center justify-center min-h-[160px]">
              <div className="rounded-xl bg-indigo-100 flex items-center justify-center mb-3" style={{ width: '48px', height: '48px' }}>
                <Layers size={24} className="text-indigo-600" />
              </div>
              <div className="text-xl font-extrabold text-indigo-700 tracking-tight">{t.fusion}</div>
              <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mt-1">{t.fusionHint}</div>
            </div>
          </div>
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

export default SpatialTranscriptomicsSlide;
