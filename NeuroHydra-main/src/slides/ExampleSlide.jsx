import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ExampleSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: '添加新页面',
      steps: [
        {
          number: '01',
          title: '创建组件',
          text: '在 ',
          highlight: 'src/slides/',
          text2: ' 创建新的 .jsx 文件'
        },
        {
          number: '02',
          title: '注册组件',
          text: '在 ',
          highlight: 'pagesConfig.js',
          text2: ' 的 pages 数组中添加'
        },
        {
          number: '03',
          title: '开始设计',
          text: '使用现有样式规范进行设计',
          highlight: null,
          text2: ''
        }
      ]
    },
    en: {
      title: 'Add New Page',
      steps: [
        {
          number: '01',
          title: 'Create Component',
          text: 'Create new .jsx file in ',
          highlight: 'src/slides/',
          text2: ''
        },
        {
          number: '02',
          title: 'Register Component',
          text: 'Add to pages array in ',
          highlight: 'pagesConfig.js',
          text2: ''
        },
        {
          number: '03',
          title: 'Start Designing',
          text: 'Use existing style guidelines',
          highlight: null,
          text2: ''
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-white flex items-start justify-start px-20 py-20 relative overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes float-gentle {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float-gentle {
          animation: float-gentle 15s ease-in-out infinite;
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
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl animate-float-gentle" 
             style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl" 
             style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)' }}></div>
      </div>

      {/* 主内容 */}
      <div className="max-w-6xl w-full relative z-10">
        
        {/* 主标题 */}
        <h1 className="text-[100px] font-black leading-[1.2] tracking-[-0.01em] mb-20 title-with-stroke relative">
          <span className="title-stroke-layer">{t.title}</span>
          <span className="title-gradient-layer bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
            {t.title}
          </span>
        </h1>

        {/* 步骤列表 */}
        <div className="space-y-12">
          {t.steps.map((step, index) => (
            <div 
              key={index}
              className="group"
            >
              <div className="flex items-start gap-8">
                {/* 数字 */}
                <div className="flex-shrink-0 w-24">
                  <span className="text-7xl font-black text-slate-200 group-hover:text-blue-400 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* 内容 */}
                <div className="flex-1 pt-3">
                  <h2 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-2xl text-slate-500 font-normal leading-relaxed">
                    {step.text}
                    {step.highlight && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold">
                        {step.highlight}
                      </span>
                    )}
                    {step.text2}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExampleSlide;
