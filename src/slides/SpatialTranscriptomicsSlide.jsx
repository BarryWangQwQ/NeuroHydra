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
      className="min-h-screen bg-white text-slate-800 font-sans overflow-hidden flex flex-col relative"
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

      {/* Background blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', filter: 'blur(120px)' }} />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-18"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)', filter: 'blur(130px)' }} />
      </div>

      {/* Title */}
      <div className="pt-6 px-10 pb-4 relative z-10">
        <div className="reveal-line" style={{ animationDelay: `${baseDelay}s` }}>
          <h1
            className="text-[42px] font-black tracking-tight leading-tight"
            style={{ fontSize: 'clamp(28px, 4.5vw, 42px)' }}
          >
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-10 pb-6">
        <div className="flex items-stretch gap-0 w-full">

          {/* LEFT: Two stacked blocks */}
          <div className="flex flex-col gap-8 flex-shrink-0" style={{ width: '64%' }}>

            {/* Existing Framework block */}
            <div
              className="reveal-line relative rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50/60 via-white to-slate-50/40 p-10"
              style={{ animationDelay: `${baseDelay + step}s` }}
            >
              <div className="text-lg font-bold uppercase tracking-widest text-slate-400 mb-5">
                {t.existingFramework}
              </div>

              <div className="flex items-center gap-8">
                <div className="flex flex-col gap-5 flex-shrink-0">
                  <div className="flex items-center gap-5 bg-white rounded-2xl border border-slate-200 px-7 py-5 shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Brain size={30} className="text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-slate-700">MRI</span>
                  </div>
                  <div className="flex items-center gap-5 bg-white rounded-2xl border border-slate-200 px-7 py-5 shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center">
                      <Database size={30} className="text-teal-600" />
                    </div>
                    <span className="text-2xl font-bold text-slate-700">{t.clinicalData}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <svg width="80" height="28" viewBox="0 0 80 28">
                    <path d="M 0 14 L 64 14" stroke="#cbd5e1" strokeWidth="3.5" fill="none" />
                    <path d="M 58 6 L 72 14 L 58 22" stroke="#cbd5e1" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 px-8 py-7 shadow-sm flex-1">
                  <div className="text-2xl font-bold text-slate-700">{t.modalityEncoders}</div>
                </div>
              </div>
            </div>

            {/* Spatial Transcriptomics block */}
            <div
              className="reveal-line relative rounded-3xl border-2 border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30 p-10"
              style={{ animationDelay: `${baseDelay + step * 2}s` }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="text-lg font-bold uppercase tracking-widest text-emerald-600">
                  {t.stTitle}
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider rounded-full border border-amber-200">
                  {t.exploratoryLabel}
                </span>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex flex-col gap-5 flex-shrink-0">
                  <div className="flex items-center gap-5 bg-white rounded-2xl border border-emerald-200 px-7 py-5 shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Dna size={30} className="text-emerald-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-700">{t.spatialCoords}</div>
                  </div>
                  <div className="flex items-center gap-5 bg-white rounded-2xl border border-emerald-200 px-7 py-5 shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center">
                      <Dna size={30} className="text-teal-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-700">{t.geneExpression}</div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <svg width="80" height="28" viewBox="0 0 80 28">
                    <path d="M 0 14 L 64 14" stroke="#6ee7b7" strokeWidth="3.5" fill="none" />
                    <path d="M 58 6 L 72 14 L 58 22" stroke="#6ee7b7" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="flex flex-col gap-5 flex-1">
                  <div className="bg-white rounded-2xl border border-emerald-200 px-8 py-5 shadow-sm">
                    <div className="text-2xl font-bold text-slate-700">{t.spatialEncoder}</div>
                    <div className="text-base text-emerald-500 font-semibold mt-1">{t.spatialEncoderHint}</div>
                  </div>
                  <div className="bg-white rounded-2xl border border-emerald-200 px-8 py-5 shadow-sm">
                    <div className="text-2xl font-bold text-slate-700">{t.molecularEncoder}</div>
                    <div className="text-base text-emerald-500 font-semibold mt-1">{t.molecularEncoderHint}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONVERGE ARROWS */}
          <div
            className="reveal-line flex-shrink-0 flex items-center justify-center relative"
            style={{ width: '10%', animationDelay: `${baseDelay + step * 3}s` }}
          >
            <svg className="w-full h-96" viewBox="0 0 100 380" preserveAspectRatio="xMidYMid meet">
              <path d="M 0 100 C 50 100, 50 190, 100 190" fill="none" stroke="#cbd5e1" strokeWidth="3.5" className="draw-anim" style={{ animationDelay: `${baseDelay + step * 3.5}s` }} />
              <path d="M 0 280 C 50 280, 50 190, 100 190" fill="none" stroke="#6ee7b7" strokeWidth="3.5" className="draw-anim" style={{ animationDelay: `${baseDelay + step * 3.5}s` }} />
            </svg>
          </div>

          {/* RIGHT: Fusion block */}
          <div
            className="reveal-line flex-shrink-0 flex items-center"
            style={{ width: '26%', animationDelay: `${baseDelay + step * 4}s` }}
          >
            <div className="w-full rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-white p-10 shadow-lg flex flex-col items-center justify-center min-h-[260px]">
              <div className="rounded-2xl bg-indigo-100 flex items-center justify-center mb-5" style={{ width: '72px', height: '72px' }}>
                <Layers size={38} className="text-indigo-600" />
              </div>
              <div className="text-3xl font-extrabold text-indigo-700 tracking-tight">{t.fusion}</div>
              <div className="text-base text-indigo-400 font-semibold uppercase tracking-wider mt-2">{t.fusionHint}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom narration bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-5xl">
        <div className="relative px-8 py-3 rounded-xl bg-slate-800/75 backdrop-blur-2xl shadow-lg shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
          <p className="text-lg leading-snug text-white/95 font-medium text-center tracking-wide animate-fade-in">
            {t.narration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpatialTranscriptomicsSlide;
