import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const TitleSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      mainTitle: 'NeuroHydra',
      subtitle: '基于 DINOv3–Mamba 的通用多模态生物医学 AI 框架',
      description: '整合多模态 MRI 和临床数据预测癫痫手术结果的概念验证'
    },
    en: {
      mainTitle: 'NeuroHydra',
      subtitle: 'A Generalizable DINOv3–Mamba Framework for Multimodal Biomedical AI',
      description: 'Proof-of-concept integrating multimodal MRI and clinical data to predict surgical outcomes in epilepsy'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white flex items-center justify-start px-20 py-20 relative overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 40px); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
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
      `}</style>

      {/* 背景渐变模糊 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 左上角渐变 */}
        <div className="absolute -top-48 -left-48 w-[900px] h-[900px] rounded-full blur-3xl animate-float-slow" 
             style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.25) 40%, transparent 70%)' }}></div>
        
        {/* 右下角渐变 */}
        <div className="absolute -bottom-48 -right-48 w-[1000px] h-[1000px] rounded-full blur-3xl animate-float-slower" 
             style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(99, 102, 241, 0.25) 40%, transparent 70%)' }}></div>
        
        {/* 中间点缀 */}
        <div className="absolute top-1/3 right-1/3 w-[700px] h-[700px] rounded-full blur-3xl" 
             style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(20, 184, 166, 0.15) 50%, transparent 70%)' }}></div>
      </div>

      {/* 主内容 */}
      <div className="max-w-6xl w-full relative z-10">
        
        {/* 主标题  */}
        <h1 className="text-[130px] font-black leading-[1.25] tracking-[-0.01em] mb-16 title-with-stroke relative">
          <span className="title-stroke-layer">{t.mainTitle}</span>
          <span className="title-gradient-layer bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent animate-gradient-shift">
            {t.mainTitle}
          </span>
        </h1>

        {/* 副标题 - 大字号中等粗细 */}
        <h2 className="text-[40px] font-semibold text-slate-700 leading-[1.3] tracking-[-0.015em] mb-10 max-w-5xl">
          {t.subtitle}
        </h2>

        {/* 描述 - 正常字号 */}
        <p className="text-[22px] font-normal text-slate-500 leading-[1.6] tracking-[-0.005em] max-w-4xl">
          {t.description}
        </p>

      </div>
    </div>
  );
};

export default TitleSlide;
