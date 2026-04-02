import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const TitleSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      mainTitle: 'NeuroHydra',
      subtitle: '通用多模态生物医学 AI 框架',
      description: '整合多模态 MRI 和临床数据预测癫痫手术结果',
      narration: '大家好！今天介绍 NeuroHydra，一个帮助医生分析医学影像的 AI 系统。'
    },
    en: {
      mainTitle: 'NeuroHydra',
      subtitle: 'A Generalizable Multimodal Biomedical AI Framework',
      description: 'Integrating multimodal MRI and clinical data to predict surgical outcomes in epilepsy',
      narration: 'Hello everyone! Today I\'ll introduce NeuroHydra, an AI system that helps doctors analyze medical images.'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white flex items-center justify-start px-20 py-20 relative overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", maxWidth: '100vw', overflowX: 'hidden' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -20px) rotate(3deg); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-25px, 25px) rotate(-3deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 30s ease-in-out infinite;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-shift {
          background-size: 200% auto;
          animation: gradient-shift 8s ease infinite;
        }
        
        .title-with-stroke {
          position: relative;
        }
        
        .title-stroke-layer {
          position: absolute;
          top: 0;
          left: 0;
          color: white;
          -webkit-text-stroke: 6px white;
          filter: blur(3px) brightness(2);
          z-index: 0;
          text-shadow: 
            0 0 15px rgba(255, 255, 255, 1),
            0 0 30px rgba(255, 255, 255, 1),
            0 0 45px rgba(255, 255, 255, 0.9),
            0 0 60px rgba(255, 255, 255, 0.7),
            0 0 80px rgba(255, 255, 255, 0.5);
        }
        
        .title-gradient-layer {
          position: relative;
          z-index: 1;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

      {/* Background Gradient Blurs - Rich Colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left gradient - 紫色 */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-25 animate-float-slow" 
             style={{ 
               background: 'radial-gradient(circle, rgba(167, 139, 250, 0.45) 0%, rgba(167, 139, 250, 0.36) 15%, rgba(196, 181, 253, 0.28) 30%, rgba(167, 139, 250, 0.18) 45%, rgba(167, 139, 250, 0.08) 60%, rgba(167, 139, 250, 0.03) 75%, transparent 90%)',
               filter: 'blur(120px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased',
               animationDelay: '0s'
             }}></div>
        
        {/* Top-right gradient - 粉色 */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full opacity-22 animate-float-slower" 
             style={{ 
               background: 'radial-gradient(circle, rgba(244, 114, 182, 0.4) 0%, rgba(244, 114, 182, 0.32) 15%, rgba(251, 182, 206, 0.24) 30%, rgba(244, 114, 182, 0.15) 45%, rgba(244, 114, 182, 0.07) 60%, rgba(244, 114, 182, 0.02) 75%, transparent 90%)',
               filter: 'blur(115px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased',
               animationDelay: '3s'
             }}></div>
        
        {/* Bottom-left gradient - 青色 */}
        <div className="absolute -bottom-30 -left-30 w-[650px] h-[650px] rounded-full opacity-24 animate-float-slow" 
             style={{ 
               background: 'radial-gradient(circle, rgba(103, 232, 249, 0.42) 0%, rgba(103, 232, 249, 0.34) 15%, rgba(165, 243, 252, 0.26) 30%, rgba(103, 232, 249, 0.16) 45%, rgba(103, 232, 249, 0.07) 60%, rgba(103, 232, 249, 0.02) 75%, transparent 90%)',
               filter: 'blur(125px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased',
               animationDelay: '6s'
             }}></div>
        
        {/* Bottom-right gradient - 蓝色 */}
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full opacity-23 animate-float-slower" 
             style={{ 
               background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, rgba(96, 165, 250, 0.32) 15%, rgba(147, 197, 253, 0.25) 30%, rgba(96, 165, 250, 0.15) 45%, rgba(96, 165, 250, 0.06) 60%, rgba(96, 165, 250, 0.02) 75%, transparent 90%)',
               filter: 'blur(130px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased',
               animationDelay: '9s'
             }}></div>
        
        {/* Center accent - 玫瑰金 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full opacity-18" 
             style={{ 
               background: 'radial-gradient(circle, rgba(251, 146, 60, 0.35) 0%, rgba(251, 146, 60, 0.28) 15%, rgba(253, 186, 116, 0.21) 30%, rgba(251, 146, 60, 0.13) 45%, rgba(251, 146, 60, 0.05) 60%, rgba(251, 146, 60, 0.02) 75%, transparent 90%)',
               filter: 'blur(110px)',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
      </div>

      {/* 主内容 */}
      <div className="max-w-6xl w-full relative z-10">
        
        {/* 主标题  */}
        <h1 className="text-[130px] font-black leading-[1.25] tracking-[-0.01em] mb-16 title-with-stroke relative break-words" style={{ fontSize: 'clamp(48px, 10vw, 130px)' }}>
          <span className="title-stroke-layer">{t.mainTitle}</span>
          <span className="title-gradient-layer bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent animate-gradient-shift">
            {t.mainTitle}
          </span>
        </h1>

        {/* 副标题 - 大字号中等粗细 */}
        <h2 className="text-[40px] font-semibold text-slate-700 leading-[1.2] tracking-[-0.015em] mb-4 break-words">
          {t.subtitle}
        </h2>

        {/* 描述 - 正常字号 */}
        <p className="text-[22px] font-normal text-slate-500 leading-[1.4] tracking-[-0.005em] mb-16 break-words">
          {t.description}
        </p>

      </div>
    </div>
  );
};

export default TitleSlide;
