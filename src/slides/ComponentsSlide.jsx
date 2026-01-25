import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ComponentsSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      items: [
        {
          title: 'DINOv3',
          description: 'Self-Distillation with No Labels · 2D 医学图像基础骨干网络'
        },
        {
          title: 'AS-VSF',
          description: 'Axis-Slice Visual-Sparse Fusion · 融合密集和稀疏信息'
        },
        {
          title: 'MAMBA',
          description: 'State Space Model · 序列建模，可学习记忆'
        }
      ],
      narration: 'NeuroHydra 有三个主要部分：DINOv3 读取图像，AS-VSF 融合不同类型的数据，Mamba 处理长序列。'
    },
    en: {
      items: [
        {
          title: 'DINOv3',
          description: 'Self-Distillation with No Labels · 2D Medical Image Foundation Backbone'
        },
        {
          title: 'AS-VSF',
          description: 'Axis-Slice Visual-Sparse Fusion · Fusing Dense and Sparse Information'
        },
        {
          title: 'MAMBA',
          description: 'State Space Model · Sequential Modeling, Learnable Memory'
        }
      ],
      narration: 'NeuroHydra has three main parts: DINOv3 reads images, AS-VSF combines different data types, and Mamba handles long sequences.'
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
          animation: gradient-shift 3s ease;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
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

      {/* Bottom Description Bar - 悬浮旁白区域 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-6xl">
        <div className="relative px-12 py-4 rounded-xl bg-slate-800/90 backdrop-blur-xl shadow-xl shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
          <p className="text-xl leading-snug text-white font-medium text-center tracking-wide animate-fade-in">
            {t.narration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComponentsSlide;
