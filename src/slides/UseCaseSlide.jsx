import React from 'react';
import { Brain, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const UseCaseSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: 'Use Case',
      items: [
        {
          icon: Brain,
          title: 'Dense Imaging',
          highlight: '(High-Dim)',
          descriptionLine1: '结构性 MRI（磁共振成像）：T1w（T1加权）+ FLAIR（液体衰减反转恢复），约 10^7 体素/体积。',
          descriptionLine2: '需要稳健特征提取（DINOv3: 自监督视觉 Transformer）。'
        },
        {
          icon: FileText,
          title: 'Sparse Clinical',
          highlight: '(Low-Dim)',
          descriptionLine1: '约 20 个变量：年龄、起病、症状学、ASM（抗癫痫药物）。',
          descriptionLine2: '关键上下文常被影像淹没。'
        }
      ],
      narration: '医院的数据有两种：MRI 图像数据量很大，病人信息表数据量小但很关键。'
    },
    en: {
      title: 'Use Case',
      items: [
        {
          icon: Brain,
          title: 'Dense Imaging',
          highlight: '(High-Dim)',
          descriptionLine1: 'Structural MRI (Magnetic Resonance Imaging): T1w (T1-weighted) + FLAIR (Fluid-Attenuated Inversion Recovery). ~10^7 voxels per volume.',
          descriptionLine2: 'Requires robust feature extraction (DINOv3: self-supervised Vision Transformer).'
        },
        {
          icon: FileText,
          title: 'Sparse Clinical',
          highlight: '(Low-Dim)',
          descriptionLine1: '~20 variables: Age, Onset, Semiology, ASM (Anti-Seizure Medications).',
          descriptionLine2: 'Critical context often drowned by imaging.'
        }
      ],
      narration: 'Hospital data comes in two types: MRI images are large, patient records are small but crucial.'
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

        @keyframes breathe {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.95;
          }
        }

        @keyframes aurora-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3),
                        0 0 40px rgba(147, 51, 234, 0.2),
                        0 0 60px rgba(236, 72, 153, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(37, 99, 235, 0.5),
                        0 0 60px rgba(147, 51, 234, 0.4),
                        0 0 90px rgba(236, 72, 153, 0.3);
          }
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

        .icon-aurora {
          background: linear-gradient(135deg, #2563eb, #9333ea, #ec4899, #2563eb);
          background-size: 200% 200%;
          animation: aurora-shift 4s ease infinite, breathe 3s ease-in-out infinite, aurora-glow 3s ease-in-out infinite;
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

        <div className="flex flex-col gap-12">
          {t.items.map((item, index) => {
            const Icon = item.icon;
            const blockDelay = baseDelay + (index + 1) * stepDelay * 2;
            const titleDelay = blockDelay;
            const subDelay = blockDelay + stepDelay;
            const descDelay = blockDelay + stepDelay * 2;

            return (
              <div key={item.title} className="flex items-start gap-8">
                <div 
                  className="flex-shrink-0 w-14 h-14 rounded-2xl icon-aurora flex items-center justify-center mt-1 reveal-line relative overflow-hidden"
                  style={{ animationDelay: `${titleDelay}s` }}
                >
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <Icon className="w-8 h-8 text-white relative z-10" strokeWidth={1.6} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2
                      className="text-[36px] font-black leading-none tracking-[-0.01em] text-slate-900 reveal-line"
                      style={{ animationDelay: `${titleDelay}s` }}
                    >
                      {item.title}
                    </h2>
                    <span
                      className="text-[36px] font-black tracking-[-0.01em] bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent reveal-line flex-shrink-0"
                      style={{ animationDelay: `${titleDelay}s` }}
                    >
                      {item.highlight}
                    </span>
                  </div>
                  {item.descriptionLine1 ? (
                    <div className="mt-3 space-y-1">
                      <p
                        className="text-[16px] text-slate-500 leading-relaxed reveal-line"
                        style={{ animationDelay: `${descDelay}s` }}
                      >
                        {item.descriptionLine1}
                      </p>
                      <p
                        className="text-[16px] text-slate-500 leading-relaxed reveal-line"
                        style={{ animationDelay: `${descDelay + stepDelay * 0.5}s` }}
                      >
                        {item.descriptionLine2}
                      </p>
                    </div>
                  ) : (
                    <p
                      className="mt-3 text-[16px] text-slate-500 leading-relaxed reveal-line"
                      style={{ animationDelay: `${descDelay}s` }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Description Bar - 悬浮旁白区域 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-6xl">
        <div className="relative px-12 py-4 rounded-xl bg-slate-800/90 backdrop-blur-xl shadow-xl shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-pink-400/60 to-transparent"></div>
          <p className="text-xl leading-snug text-white font-medium text-center tracking-wide animate-fade-in">
            {t.narration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseCaseSlide;
