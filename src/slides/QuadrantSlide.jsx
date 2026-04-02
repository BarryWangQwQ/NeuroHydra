import React from 'react';
import { Zap, Target, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const QuadrantSlide = () => {
  const { language } = useLanguage();
  const t = translations[language].quadrantSlide;

  // 定义架构数据点 (x: 速度 0-100, y: 精度 0-100)
  // 基于实际测试: Transformer(116s) < Transformer+AS-VSF(30s) < CNN(3.95s) < ConvNeXt(3.17s) < Mamba2(1.73s) < Mamba2+AS-VSF(1.01s)
  const architectures = [
    { id: 1, name: t.vit, nameKey: 'vit', x: 10, y: 75, color: 'blue', size: 'medium' },
    { id: 2, name: t.vitAsvs, nameKey: 'vitAsvs', x: 35, y: 82, color: 'indigo', size: 'large' },
    { id: 3, name: t.cnn3d, nameKey: 'cnn3d', x: 65, y: 45, color: 'slate', size: 'small' },
    { id: 4, name: t.convnext, nameKey: 'convnext', x: 70, y: 58, color: 'emerald', size: 'medium' },
    { id: 5, name: t.mamba2, nameKey: 'mamba2', x: 80, y: 72, color: 'purple', size: 'medium' },
    { id: 6, name: t.mamba2Asvs, nameKey: 'mamba2Asvs', x: 92, y: 82, color: 'rose', size: 'large', isBest: true },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 border-blue-600 shadow-blue-500/50',
      indigo: 'bg-indigo-500 border-indigo-600 shadow-indigo-500/50',
      slate: 'bg-slate-500 border-slate-600 shadow-slate-500/50',
      emerald: 'bg-emerald-500 border-emerald-600 shadow-emerald-500/50',
      purple: 'bg-purple-500 border-purple-600 shadow-purple-500/50',
      rose: 'bg-rose-500 border-rose-600 shadow-rose-500/50',
    };
    return colors[color] || colors.blue;
  };

  const getSizeClasses = (size) => {
    const sizes = {
      small: 'w-4 h-4',
      medium: 'w-5 h-5',
      large: 'w-7 h-7',
    };
    return sizes[size] || sizes.medium;
  };

  return (
    <div className="h-slide bg-white text-slate-800 font-sans selection:bg-blue-100 overflow-hidden flex flex-col items-center justify-center p-6 relative" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      
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
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(244, 63, 94, 0.5); }
          50% { box-shadow: 0 0 30px rgba(244, 63, 94, 0.8), 0 0 40px rgba(244, 63, 94, 0.4); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

      {/* Background Gradient Blurs - Natural Colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left gradient - 柔和天青 */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-19 animate-float-slow" 
             style={{ 
               background: 'radial-gradient(circle, rgba(56, 189, 248, 0.32) 0%, rgba(56, 189, 248, 0.26) 15%, rgba(125, 211, 252, 0.2) 30%, rgba(56, 189, 248, 0.12) 45%, rgba(56, 189, 248, 0.05) 60%, rgba(56, 189, 248, 0.02) 75%, transparent 90%)',
               filter: 'blur(120px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
        
        {/* Bottom-right gradient - 柔和紫色 */}
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full opacity-17 animate-float-slower" 
             style={{ 
               background: 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, rgba(192, 132, 252, 0.24) 15%, rgba(216, 180, 254, 0.18) 30%, rgba(192, 132, 252, 0.11) 45%, rgba(192, 132, 252, 0.04) 60%, rgba(192, 132, 252, 0.01) 75%, transparent 90%)',
               filter: 'blur(130px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
        
        {/* Center accent - 淡玫瑰 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-14" 
             style={{ 
               background: 'radial-gradient(circle, rgba(251, 113, 133, 0.26) 0%, rgba(251, 113, 133, 0.2) 15%, rgba(252, 165, 165, 0.15) 30%, rgba(251, 113, 133, 0.09) 45%, rgba(251, 113, 133, 0.03) 60%, rgba(251, 113, 133, 0.01) 75%, transparent 90%)',
               filter: 'blur(125px)',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
      </div>

      {/* 标题 */}
      <div className="text-center mb-4 relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-1 bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 bg-clip-text text-transparent leading-tight" style={{ lineHeight: '1.3' }}>
          {t.title}
        </h1>
        <p className="text-slate-600 text-base font-medium">{t.subtitle}</p>
      </div>

      {/* 四象限图容器 - 调整高度给旁白留空间 */}
      <div className="relative w-full max-w-6xl h-[520px] bg-white rounded-2xl shadow-lg border border-slate-200 z-10 mb-16">
        
        {/* Y轴标签（左侧） */}
        <div className="absolute left-4 top-12 bottom-14 flex flex-col justify-between items-center">
          <div className="text-sm font-bold text-slate-700">{t.higher}</div>
          <div className="writing-mode-vertical text-base font-extrabold text-blue-600 flex items-center gap-1" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            <Target size={18} className="inline-block" style={{ transform: 'rotate(90deg)' }} />
            <span>{t.accuracy}</span>
            <Target size={18} className="inline-block" style={{ transform: 'rotate(90deg)' }} />
          </div>
          <div className="text-sm font-bold text-slate-700">{t.lower}</div>
        </div>

        {/* X轴标签（底部） */}
        <div className="absolute bottom-4 left-24 right-24 flex justify-between items-center">
          <div className="text-sm font-bold text-slate-700">{t.slower}</div>
          <div className="flex items-center gap-1 font-extrabold text-base text-amber-600">
            <Zap size={18} />
            <span>{t.inferenceSpeed}</span>
            <Zap size={18} />
          </div>
          <div className="text-sm font-bold text-slate-700">{t.faster}</div>
        </div>

        {/* 主图表区域 */}
        <div className="absolute top-12 bottom-14 left-24 right-12">
          
          {/* 坐标轴 */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-300"></div>
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-slate-300"></div>

          {/* 象限背景 */}
          <div className="absolute top-0 left-0 right-[50%] bottom-[50%] bg-amber-50/40"></div>
          <div className="absolute top-0 left-[50%] right-0 bottom-[50%] bg-emerald-50/40"></div>
          <div className="absolute top-[50%] left-0 right-[50%] bottom-0 bg-rose-50/40"></div>
          <div className="absolute top-[50%] left-[50%] right-0 bottom-0 bg-blue-50/40"></div>

          {/* 象限标签 */}
          <div className="absolute top-3 left-3 flex items-center gap-1 text-amber-700 font-bold text-xs bg-white/80 px-2 py-1 rounded-md">
            <AlertCircle size={12} />
            <span>{t.quadrant2}</span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 text-emerald-700 font-bold text-xs bg-white/80 px-2 py-1 rounded-md">
            <CheckCircle2 size={12} />
            <span>{t.quadrant1}</span>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-rose-700 font-bold text-xs bg-white/80 px-2 py-1 rounded-md">
            <AlertCircle size={12} />
            <span>{t.quadrant3}</span>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-blue-700 font-bold text-xs bg-white/80 px-2 py-1 rounded-md">
            <TrendingUp size={12} />
            <span>{t.quadrant4}</span>
          </div>

          {/* 数据点 */}
          {architectures.map((arch) => {
            const leftPercent = arch.x;
            const bottomPercent = arch.y;
            
            return (
              <div
                key={arch.id}
                className="absolute"
                style={{
                  left: `${leftPercent}%`,
                  bottom: `${bottomPercent}%`,
                  transform: 'translate(-50%, 50%)',
                }}
              >
                {/* 数据点圆圈 */}
                <div
                  className={`
                    ${getSizeClasses(arch.size)}
                    ${getColorClasses(arch.color)}
                    rounded-full border-4
                    ${arch.isBest ? 'animate-pulse-glow ring-4 ring-rose-300/50' : 'shadow-lg'}
                  `}
                ></div>

                {/* 永久显示的标签 */}
                <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 pointer-events-none z-20">
                  <div className={`
                    px-2 py-1 rounded-full shadow-md border whitespace-nowrap text-xs font-bold
                    ${arch.isBest 
                      ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white border-rose-300 shadow-rose-500/50' 
                      : 'bg-white text-slate-700 border-slate-200'
                    }
                  `}>
                    {arch.name}
                    {arch.isBest && (
                      <span className="ml-1 text-rose-100">★</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Description Bar - 悬浮旁白区域 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-5xl">
        <div className="relative px-8 py-3 rounded-xl bg-slate-800/75 backdrop-blur-2xl shadow-lg shadow-slate-900/20 border border-slate-700/50">
          {/* 装饰光效 */}
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-rose-400/50 to-transparent"></div>
          
          <p className="text-lg leading-snug text-white/95 font-medium text-center tracking-wide animate-fade-in">
            {t.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuadrantSlide;
