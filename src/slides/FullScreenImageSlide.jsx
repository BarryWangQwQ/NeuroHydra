import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FullScreenImageSlide = ({ imagePath = '/images/slide-image.png' }) => {
  const { language } = useLanguage();

  const content = {
    zh: {
      narration: '这是癫痫手术计划的典型流程图，展示了从影像采集到手术结果预测的完整过程。'
    },
    en: {
      narration: 'This is a typical workflow for epilepsy surgery planning, showing the complete process from imaging to outcome prediction.'
    }
  };

  const t = content[language] ?? content.en;

  return (
    <div 
      className="min-h-slide h-slide w-full bg-white flex items-center justify-center relative overflow-hidden px-slide-x py-slide-y"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        
        .fullscreen-image {
          width: var(--app-vw, 100dvw);
          height: var(--app-vh, 100dvh);
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
    </div>
  );
};

export default FullScreenImageSlide;
