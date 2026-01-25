import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FullScreenImageSlide = ({ imagePath = '/images/slide-image.png' }) => {
  const { language } = useLanguage();

  const content = {
    zh: {
      narration: '这是 IDEAS 数据集。它有 MRI 扫描、病人信息、手术记录和长期结果。我们用它来训练和测试模型。'
    },
    en: {
      narration: 'This is the IDEAS dataset. It has MRI scans, patient info, surgery records, and long-term results. We use it to train and test our model.'
    }
  };

  const t = content[language] ?? content.en;

  return (
    <div 
      className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        
        .fullscreen-image {
          width: 100vw;
          height: 100vh;
          object-fit: contain;
          object-position: center;
          display: block;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
      
      <img 
        src={imagePath} 
        alt="Full screen slide"
        className="fullscreen-image"
        onError={(e) => {
          console.error('Failed to load image:', imagePath);
          e.target.style.display = 'none';
        }}
      />

      {/* Bottom Description Bar - 悬浮旁白区域 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-6xl">
        <div className="relative px-12 py-4 rounded-xl bg-slate-800/90 backdrop-blur-xl shadow-xl shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>
          <p className="text-xl leading-snug text-white font-medium text-center tracking-wide animate-fade-in">
            {t.narration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenImageSlide;
