import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Database, 
  Layers, 
  GitMerge, 
  Activity, 
  Scan, 
  FileSpreadsheet, 
  Minimize2,
  Binary,
  Stethoscope,
  Play,
  Pause,
  RotateCcw,
  Camera
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const ModelPipeline = ({ autoPlay = true, manualTick = 0 }) => {
  const { language } = useLanguage();
  const t = translations[language].modelPipeline;
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isScrolling, setIsScrolling] = useState(false);
  const firstManual = useRef(true);
  
  const scrollContainerRef = useRef(null);
  const stageRefs = useRef([]); 
  const animationRef = useRef(null);

  const stages = ['input', 'encoder', 'fusion', 'merging', 'decoder', 'heads'];
  
  // 获取当前阶段的描述文本
  const getCurrentDescription = () => {
    const stageKey = stages[activeStage];
    return t.stageDescriptions?.[stageKey] || '';
  };

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setIsScrolling(true); 
        setActiveStage((prev) => (prev + 1) % stages.length);
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  useEffect(() => {
    if (manualTick === 0 || autoPlay) return;
    if (firstManual.current) {
      firstManual.current = false;
      return;
    }
    setIsScrolling(true);
    setActiveStage((prev) => (prev + 1) % stages.length);
  }, [manualTick, autoPlay, stages.length]);

  const scrollToPosition = (element, target, duration, onComplete) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      if (timeElapsed < duration) {
        let progress = timeElapsed / duration;
        const ease = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        element.scrollLeft = start + change * ease;
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        element.scrollLeft = target;
        if (onComplete) onComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const activeElement = stageRefs.current[activeStage];

    if (activeElement) {
      // 如果不是手动触发（比如由Interval触发），这里也确保设置为 scrolling
      // (为了逻辑严谨，虽然Interval已经设置了)
      if (!isScrolling) setIsScrolling(true);

      let offsetLeft = 0;
      let el = activeElement;
      while (el && el !== container) {
        offsetLeft += el.offsetLeft;
        el = el.offsetParent;
      }

      const containerWidth = container.clientWidth;
      const elementWidth = activeElement.clientWidth;
      const targetScrollLeft = offsetLeft - (containerWidth / 2) + (elementWidth / 2);

      scrollToPosition(container, targetScrollLeft, 1200, () => {
        setIsScrolling(false);
      });
    }
  }, [activeStage]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setActiveStage(0);
    setIsScrolling(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (scrollContainerRef.current) {
        // 重置时需要考虑到 padding 导致的偏移，通常滚动到 0 并不一定是视觉中心
        // 最好是重新触发一次 scrollToPosition 到 0 号元素
        // 但简单起见，这里重置状态，useEffect 会自动处理对齐到第 0 个
    }
  };

  const isCardActive = (index) => activeStage === index && !isScrolling;
  
  const getCardStyle = (stageIndex, themeColor) => {
    const active = isCardActive(stageIndex);
    const isTarget = activeStage === stageIndex && isScrolling;
    const isPast = activeStage > stageIndex;
    
    let base = "transition-all duration-700 ease-out rounded-3xl relative overflow-hidden h-full flex flex-col justify-center border-2 border-transparent fix-safari-radius will-change-transform ";
    
    if (active) {
      base += "scale-105 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] z-10 ";
    } else if (isTarget) {
      base += "scale-95 opacity-70 bg-slate-50 border-slate-200 border-dashed ";
    } else if (isPast) {
      base += "scale-100 opacity-90 ";
    } else {
      base += "scale-95 opacity-40 ";
    }

    const colors = {
      blue: {
        active: "bg-gradient-to-br from-blue-400 via-indigo-500 to-indigo-600 text-white animate-gradient-xy bg-[length:200%_200%] shadow-blue-500/40",
        inactive: "bg-slate-50 text-slate-600 border-slate-200"
      },
      green: {
        active: "bg-gradient-to-br from-emerald-400 via-teal-500 to-teal-600 text-white animate-gradient-xy bg-[length:200%_200%] shadow-emerald-500/40",
        inactive: "bg-slate-50 text-slate-600 border-slate-200"
      },
      indigo: {
        active: "bg-gradient-to-br from-indigo-400 via-violet-500 to-indigo-600 text-white animate-gradient-xy bg-[length:200%_200%] shadow-indigo-500/40",
        inactive: "bg-slate-50 text-slate-600 border-slate-200"
      },
      teal: {
        active: "bg-gradient-to-br from-cyan-400 via-teal-500 to-teal-600 text-white animate-gradient-xy bg-[length:200%_200%] shadow-cyan-500/40",
        inactive: "bg-slate-50 text-slate-600 border-slate-200"
      },
      purple: {
        active: "bg-gradient-to-br from-fuchsia-500 via-purple-500 to-violet-600 text-white animate-gradient-xy bg-[length:200%_200%] shadow-purple-500/40",
        inactive: "bg-slate-50 text-slate-600 border-slate-200"
      },
      amber: {
        active: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 text-white animate-gradient-xy bg-[length:200%_200%] shadow-orange-500/40",
        inactive: "bg-slate-50 text-slate-600 border-slate-200"
      },
      rose: {
        active: "bg-gradient-to-br from-rose-400 via-pink-500 to-pink-600 text-white animate-gradient-xy bg-[length:200%_200%] shadow-rose-500/40",
        inactive: "bg-slate-50 text-slate-600 border-slate-200"
      },
      dark: {
        active: "bg-gradient-to-br from-slate-700 via-slate-800 to-black text-white animate-gradient-xy bg-[length:200%_200%] shadow-slate-800/40",
        inactive: "bg-slate-50 text-slate-600 border-slate-200"
      }
    };

    const theme = colors[themeColor] || colors.blue;
    
    if (isTarget) return base;
    return base + (active ? theme.active : theme.inactive);
  };

  const IconBox = ({ children, active, themeColor = 'blue' }) => {
    const bgClass = active ? "bg-white/25 text-white backdrop-blur-md border border-white/20" : "bg-white border border-slate-100 shadow-sm";
    
    const textColors = {
      blue: "text-blue-600",
      green: "text-emerald-600",
      indigo: "text-indigo-600",
      teal: "text-teal-600",
      purple: "text-purple-600",
      amber: "text-amber-600",
      rose: "text-rose-600",
      dark: "text-slate-700"
    };
    
    const colorClass = active ? "text-white" : (textColors[themeColor] || "text-slate-400");

    return (
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 ${bgClass} ${colorClass}`}>
        {children}
      </div>
    );
  };

  // Token形状组件 - 根据数据类型显示不同形状
  const TokenShape = ({ type, color, size = 8, delay = 0 }) => {
    const baseStyle = {
      animationDelay: `${delay}s`,
      filter: `drop-shadow(0 0 3px ${color})`,
    };
    
    if (type === 'square') {
      // MRI数据 - 方形 (image patches)
      return (
        <div 
          className="absolute animate-token-flow"
          style={{
            ...baseStyle,
            width: size,
            height: size,
            background: color,
            borderRadius: 2,
          }}
        />
      );
    } else if (type === 'circle') {
      // Tabular数据 - 圆形 (discrete variables)
      return (
        <div 
          className="absolute animate-token-flow rounded-full"
          style={{
            ...baseStyle,
            width: size,
            height: size,
            background: color,
          }}
        />
      );
    } else if (type === 'hexagon') {
      // 融合数据 - 六边形
      return (
        <div 
          className="absolute animate-token-flow"
          style={{
            ...baseStyle,
            width: size,
            height: size * 0.866,
            background: color,
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          }}
        />
      );
    } else if (type === 'diamond') {
      // 分类输出 - 菱形
      return (
        <div 
          className="absolute animate-token-flow"
          style={{
            ...baseStyle,
            width: size,
            height: size,
            background: color,
            transform: 'rotate(45deg)',
            borderRadius: 2,
          }}
        />
      );
    }
    return null;
  };

  const HConnector = ({ active, width = "w-16", tokenType = "square", tokenColor = "#60A5FA" }) => (
    <div className={`flex items-center ${width} h-full relative overflow-hidden flex-shrink-0 justify-center group`}>
      {/* 管道背景 */}
      <div className="h-[3px] w-full bg-slate-100 rounded-full relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/60 to-transparent w-[50%] animate-shimmer-subtle opacity-50"></div>
      </div>
      
      {/* 激活状态的管道高亮 */}
      {active && (
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="h-[3px] w-full bg-gradient-to-r from-blue-400/30 via-purple-400/40 to-blue-400/30 rounded-full"></div>
        </div>
      )}
      
      {/* 持续流动的token粒子 - 使用符合数据类型的形状 */}
      {active && (
        <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
          {[0, 1, 2].map((i) => (
            <TokenShape key={i} type={tokenType} color={tokenColor} size={8} delay={i * 0.6} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-slide bg-white text-slate-800 font-sans selection:bg-blue-100 overflow-hidden flex flex-col relative" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        
        /* 关键修复：利用 mask-image 修复 Safari/Chrome 在 transform 时 overflow-hidden 圆角失效的问题 */
        .fix-safari-radius {
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          mask-image: radial-gradient(white, black);
          isolation: isolate;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        @keyframes flow-beam {
          0% { left: -100%; opacity: 0; transform: scaleX(0.5); }
          30% { opacity: 1; transform: scaleX(1); }
          70% { opacity: 1; transform: scaleX(1); }
          100% { left: 100%; opacity: 0; transform: scaleX(0.5); }
        }
        .animate-flow-beam {
          animation: flow-beam 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        /* Token流动动画 - 物理加速效果 */
        @keyframes token-flow {
          0% { 
            left: -8px; 
            opacity: 0;
            transform: scale(0.5);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% { 
            left: calc(100% + 8px); 
            opacity: 0;
            transform: scale(0.5);
          }
        }
        .animate-token-flow {
          animation: token-flow 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        /* SVG路径上的token流动 */
        @keyframes svg-token-flow {
          0% { 
            offset-distance: 0%;
            opacity: 0;
            transform: scale(0.3);
          }
          5% {
            opacity: 1;
            transform: scale(1);
          }
          95% {
            opacity: 1;
            transform: scale(1);
          }
          100% { 
            offset-distance: 100%;
            opacity: 0;
            transform: scale(0.3);
          }
        }

        @keyframes shimmer-subtle {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .animate-shimmer-subtle {
          animation: shimmer-subtle 3s linear infinite;
        }

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
        
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 6s ease infinite; 
        }

        @keyframes float-organic {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-float-organic {
          animation: float-organic 5s ease-in-out infinite;
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }

        @keyframes pop-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: pop-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes dash-flow {
          to { stroke-dashoffset: -24; }
        }
        .animate-dash-flow {
          animation: dash-flow 3s linear infinite;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        /* 隐藏滚动条 */
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      {/* Background Gradient Blurs - Natural Colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left gradient - 柔和天蓝 */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20 animate-float-slow" 
             style={{ 
               background: 'radial-gradient(circle, rgba(96, 165, 250, 0.35) 0%, rgba(96, 165, 250, 0.28) 15%, rgba(147, 197, 253, 0.22) 30%, rgba(96, 165, 250, 0.14) 45%, rgba(96, 165, 250, 0.06) 60%, rgba(96, 165, 250, 0.02) 75%, transparent 90%)',
               filter: 'blur(120px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
        
        {/* Bottom-right gradient - 柔和翠绿 */}
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full opacity-18 animate-float-slower" 
             style={{ 
               background: 'radial-gradient(circle, rgba(52, 211, 153, 0.32) 0%, rgba(52, 211, 153, 0.26) 15%, rgba(110, 231, 183, 0.2) 30%, rgba(52, 211, 153, 0.12) 45%, rgba(52, 211, 153, 0.05) 60%, rgba(52, 211, 153, 0.02) 75%, transparent 90%)',
               filter: 'blur(130px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
        
        {/* Center accent - 淡紫色 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-15" 
             style={{ 
               background: 'radial-gradient(circle, rgba(165, 180, 252, 0.3) 0%, rgba(165, 180, 252, 0.24) 15%, rgba(199, 210, 254, 0.18) 30%, rgba(165, 180, 252, 0.11) 45%, rgba(165, 180, 252, 0.04) 60%, rgba(165, 180, 252, 0.01) 75%, transparent 90%)',
               filter: 'blur(125px)',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
      </div>

      {/* Main Canvas */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden scroll-smooth flex items-center relative z-10"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* 调整：添加 px-[50vw] 确保首尾元素可以居中 */}
        <div className="flex items-center min-w-max px-[50vw] py-10 space-x-0">
          
          {/* --- STAGE 1: INPUTS --- */}
          <div 
            ref={el => stageRefs.current[0] = el}
            className="flex flex-col gap-12 h-full justify-center"
          >
            
            {/* MRI Input Card */}
            <div className={`w-56 h-56 p-6 ${getCardStyle(0, 'blue')}`}>
               <div className="flex gap-2.5 justify-center mb-6">
                 {[1,2,3].map((i) => (
                   <div key={i} className={`w-11 h-14 rounded-xl flex items-center justify-center shadow-sm transition-all duration-700 ${isCardActive(0) ? 'bg-white/20 backdrop-blur-sm text-white animate-pop' : 'bg-slate-50 text-blue-300'}`} style={{animationDelay: `${i*100}ms`}}>
                     <Brain size={20} strokeWidth={isCardActive(0) ? 2 : 1.5} />
                   </div>
                 ))}
               </div>
               <div className="text-center">
                 <div className="text-lg font-bold tracking-tight">{t.mriData}</div>
                 <div className={`text-xs font-bold mt-2 uppercase tracking-wide ${isCardActive(0) ? 'text-blue-100' : 'text-slate-400'}`}>{t.mriTypes}</div>
               </div>
            </div>

            {/* Tabular Input Card */}
            <div className={`w-56 h-56 p-6 ${getCardStyle(0, 'green')}`}>
               <div className="flex justify-center mb-6">
                 <IconBox active={isCardActive(0)} themeColor="green">
                   <FileSpreadsheet size={26} strokeWidth={2} />
                 </IconBox>
               </div>
               <div className="text-center">
                 <div className="text-lg font-bold tracking-tight">{t.tabularData}</div>
                 <div className={`text-xs font-bold mt-2 uppercase tracking-wide ${isCardActive(0) ? 'text-emerald-100' : 'text-slate-400'}`}>{t.clinicalRecords}</div>
               </div>
            </div>

          </div>

          {/* Connectors - MRI用方形，Tabular用圆形 */}
          <div className="flex flex-col gap-12 h-full justify-center px-8">
             <div className="h-56 flex items-center justify-center">
                <HConnector active={activeStage >= 1} tokenType="square" tokenColor="#3B82F6" />
             </div>
             <div className="h-56 flex items-center justify-center">
                <HConnector active={activeStage >= 1} tokenType="circle" tokenColor="#10B981" />
             </div>
          </div>

          {/* --- STAGE 2: ENCODERS --- */}
          <div 
            ref={el => stageRefs.current[1] = el}
            className="flex flex-col gap-12 h-full justify-center"
          >
            
            {/* MRI Encoder */}
            <div className={`w-64 h-56 p-7 ${getCardStyle(1, 'indigo')}`}>
               <div className="flex items-center gap-4 mb-6">
                 <IconBox active={isCardActive(1)} themeColor="indigo">
                   <Scan size={24} strokeWidth={2} />
                 </IconBox>
                 <div>
                    <span className="font-bold text-lg block tracking-tight">{t.mriEncoder}</span>
                    <span className={`text-xs font-bold ${isCardActive(1) ? 'text-indigo-100' : 'text-slate-400'}`}>{t.visualProcessing}</span>
                 </div>
               </div>
               <div className="space-y-3">
                 <div className={`px-4 py-3 rounded-xl text-xs font-bold flex justify-between items-center transition-colors duration-700 ${isCardActive(1) ? 'bg-white/10 text-white' : 'bg-white border border-slate-200 text-indigo-500'}`}>
                   <span className="tracking-tight">{t.dinov3Backbone}</span>
                   <span className={`w-2.5 h-2.5 rounded-full ${isCardActive(1) ? 'bg-white animate-pulse' : 'bg-indigo-200'}`}></span>
                 </div>
                 <div className="flex gap-2 flex-wrap">
                   {[t.patch, t.axis, t.slice].map((label, i) => (
                     <span key={label} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-700 ${isCardActive(1) ? 'bg-indigo-600/50 text-white border border-white/10' : 'bg-white text-slate-500 border border-slate-200'}`} style={{transitionDelay: isCardActive(1) ? `${i*100}ms` : '0ms'}}>{label}</span>
                   ))}
                 </div>
               </div>
            </div>

            {/* Tabular Encoder */}
            <div className={`w-64 h-56 p-7 ${getCardStyle(1, 'teal')}`}>
               <div className="flex items-center gap-4 mb-6">
                 <IconBox active={isCardActive(1)} themeColor="teal">
                    <Database size={24} strokeWidth={2} />
                 </IconBox>
                 <div>
                    <span className="font-bold text-lg block tracking-tight">{t.tabularEncoder}</span>
                    <span className={`text-xs font-bold ${isCardActive(1) ? 'text-teal-100' : 'text-slate-400'}`}>{t.featureExtraction}</span>
                 </div>
               </div>
               
               <div className={`flex items-center justify-center p-3 rounded-xl border border-dashed mb-3 transition-colors duration-700 ${isCardActive(1) ? 'bg-white/10 border-white/30 text-white' : 'bg-white border-teal-200 text-teal-600'}`}>
                <span className="text-xs font-bold">{t.mlpProjection}</span>
               </div>
               <div className={`text-[11px] font-extrabold text-center rounded-lg py-2 border tracking-wide uppercase transition-all duration-700 ${isCardActive(1) ? 'bg-teal-600/50 text-white border-white/10' : 'bg-white text-teal-600 border-teal-100'}`}>
                {t.metaTokenOutput}
               </div>
            </div>

          </div>

          {/* CONVERGE CURVE (SVG) */}
          <div className="w-32 h-[360px] relative flex-shrink-0 mx-4">
             <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
               <defs>
                 {/* 蓝色发光效果 - 用于MRI路径 */}
                 <filter id="glowBlue" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
                   <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                   <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.231  0 0 0 0 0.51  0 0 0 0 0.965  0 0 0 1 0" result="coloredBlur"/>
                   <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
                 {/* 绿色发光效果 - 用于Tabular路径 */}
                 <filter id="glowGreen" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
                   <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                   <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.063  0 0 0 0 0.725  0 0 0 0 0.506  0 0 0 1 0" result="coloredBlur"/>
                   <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
                 <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                   <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.6"/>
                   <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3"/>
                 </linearGradient>
                 <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#10B981" stopOpacity="0.3"/>
                   <stop offset="50%" stopColor="#34D399" stopOpacity="0.6"/>
                   <stop offset="100%" stopColor="#10B981" stopOpacity="0.3"/>
                 </linearGradient>
               </defs>
               
               {/* 背景虚线管道 */}
               <path d="M 0 60 C 64 60, 64 180, 128 180" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="6 6" className="animate-dash-flow opacity-50" />
               <path d="M 0 300 C 64 300, 64 180, 128 180" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="6 6" className="animate-dash-flow opacity-50" />
               
               {/* 激活后的管道 */}
               <path d="M 0 60 C 64 60, 64 180, 128 180" fill="none" stroke={activeStage >= 2 ? "url(#blueGrad)" : "transparent"} strokeWidth="5" className="transition-all duration-700" />
               <path d="M 0 300 C 64 300, 64 180, 128 180" fill="none" stroke={activeStage >= 2 ? "url(#greenGrad)" : "transparent"} strokeWidth="5" className="transition-all duration-700" />

               {/* 持续流动的token粒子 - 上路径(蓝色方形) - MRI visual patches */}
               {activeStage >= 1 && (
                 <>
                   {[0, 1, 2].map((i) => (
                     <g key={`top-${i}`} filter="url(#glowBlue)">
                       <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#3B82F6">
                         <animateMotion 
                           dur="2s" 
                           repeatCount="indefinite" 
                           path="M 0 60 C 64 60, 64 180, 128 180"
                           begin={`${i * 0.7}s`}
                           calcMode="spline" 
                           keySplines="0.4 0 0.2 1"
                           keyTimes="0;1"
                           rotate="auto"
                         />
                         <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" begin={`${i * 0.7}s`}/>
                       </rect>
                     </g>
                   ))}
                   
                   {/* 持续流动的token粒子 - 下路径(绿色圆形) - Tabular discrete variables */}
                   {[0, 1, 2].map((i) => (
                     <g key={`bottom-${i}`} filter="url(#glowGreen)">
                       <circle r="5" fill="#10B981">
                         <animateMotion 
                           dur="2s" 
                           repeatCount="indefinite" 
                           path="M 0 300 C 64 300, 64 180, 128 180"
                           begin={`${i * 0.7}s`}
                           calcMode="spline" 
                           keySplines="0.4 0 0.2 1"
                           keyTimes="0;1"
                         />
                         <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" begin={`${i * 0.7}s`}/>
                         <animate attributeName="r" values="3;5;5;3" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" begin={`${i * 0.7}s`}/>
                       </circle>
                     </g>
                   ))}
                 </>
               )}
             </svg>
          </div>

          {/* --- MIDDLE PIPELINE --- */}
          <div className="flex items-center gap-8">
            
            {/* AS-VSF Container with Dashed Border */}
            <div className="relative p-8 rounded-3xl border-2 border-dashed border-indigo-300/60 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 backdrop-blur-sm transition-all duration-700">
              
              {/* AS-VSF Label */}
              <div className="absolute -top-4 left-6 px-4 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-black tracking-wider uppercase rounded-full shadow-lg border-2 border-white">
                AS-VSF
              </div>
              
              <div className="flex items-center gap-8">
                {/* Fusion Block */}
                <div 
                  ref={el => stageRefs.current[2] = el}
                  className={`w-44 h-40 p-6 ${getCardStyle(2, 'purple')}`}
                >
                   <div className="flex justify-center mb-3">
                      <IconBox active={isCardActive(2)} themeColor="purple">
                         <Layers size={24} strokeWidth={2} />
                      </IconBox>
                   </div>
                   <span className="text-sm font-bold tracking-tight uppercase text-center block mb-3">{t.fusion}</span>
                   <div className="flex justify-center -space-x-2">
                     {[1,2,3].map(i => (
                        <div key={i} className={`w-8 h-8 rounded-full border-[3px] shadow-sm overflow-hidden transition-transform duration-700 ${isCardActive(2) ? 'border-white/20 scale-110' : 'border-white scale-100 grayscale bg-white'}`} style={{transitionDelay: isCardActive(2) ? `${i*100}ms` : '0ms'}}>
                            <div className={`w-full h-full ${i===1?'bg-blue-400':i===2?'bg-green-400':'bg-purple-400'}`}></div>
                        </div>
                     ))}
                   </div>
                </div>

                {/* AS-VSF内部连接器 - 六边形token表示融合数据 */}
                <div className="flex items-center w-12 h-full relative overflow-hidden flex-shrink-0 justify-center">
                  <div className="h-[3px] w-full bg-slate-100 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/60 to-transparent w-[50%] animate-shimmer-subtle opacity-50"></div>
                  </div>
                  {activeStage >= 2 && (
                    <div className="absolute inset-0 flex items-center pointer-events-none">
                      <div className="h-[3px] w-full bg-gradient-to-r from-purple-400/30 via-amber-400/40 to-purple-400/30 rounded-full"></div>
                    </div>
                  )}
                  {activeStage >= 2 && (
                    <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
                      {[0, 1].map((i) => (
                        <TokenShape key={i} type="hexagon" color="#A855F7" size={10} delay={i * 0.9} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Merging Block */}
                <div 
                  ref={el => stageRefs.current[3] = el}
                  className={`w-44 h-40 p-6 ${getCardStyle(3, 'amber')}`}
                >
                   <div className="flex justify-center mb-3">
                      <IconBox active={isCardActive(3)} themeColor="amber">
                         <Minimize2 size={24} strokeWidth={2} />
                      </IconBox>
                   </div>
                   <span className="text-sm font-bold tracking-tight uppercase text-center block mb-3">{t.merging}</span>
                   <div className="flex justify-center">
                      <span className={`text-[10px] font-bold px-4 py-2 rounded-full tracking-wide transition-colors duration-700 ${isCardActive(3) ? 'bg-white/20 text-white' : 'bg-white border border-slate-200 text-orange-600'}`}>{t.coAxial}</span>
                   </div>
                </div>
              </div>
              
            </div>

            {/* AS-VSF到Mamba的连接器 - 六边形token流入序列模型 */}
            <div className="flex items-center w-12 h-full relative overflow-hidden flex-shrink-0 justify-center">
              <div className="h-[3px] w-full bg-slate-100 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/60 to-transparent w-[50%] animate-shimmer-subtle opacity-50"></div>
              </div>
              {activeStage >= 3 && (
                <div className="absolute inset-0 flex items-center pointer-events-none">
                  <div className="h-[3px] w-full bg-gradient-to-r from-amber-400/30 via-slate-500/40 to-amber-400/30 rounded-full"></div>
                </div>
              )}
              {activeStage >= 3 && (
                <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
                  {[0, 1, 2].map((i) => (
                    <TokenShape key={i} type="hexagon" color="#F59E0B" size={10} delay={i * 0.6} />
                  ))}
                </div>
              )}
            </div>

            {/* Mamba Decoder Block */}
            <div 
              ref={el => stageRefs.current[4] = el}
              className={`w-80 h-64 p-8 ${getCardStyle(4, 'dark')}`}
            >
               
               <div className={`absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${isCardActive(4) ? 'opacity-100 animate-spin-slow' : 'opacity-0'}`}></div>
               
               <div className="flex items-center gap-5 z-10 mb-6">
                 <IconBox active={isCardActive(4)} themeColor="dark">
                    <Activity size={28} strokeWidth={2} />
                 </IconBox>
                 <div>
                    <span className="font-extrabold text-2xl block tracking-tight">{t.mambaDecoder}</span>
                    <span className={`text-xs uppercase tracking-widest font-bold ${isCardActive(4) ? 'text-slate-400' : 'text-slate-400'}`}>{t.sequenceModeling}</span>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-3 z-10">
                 {[t.globalContext, t.crossSlice, t.crossView, t.tabularMix].map((label, i) => (
                   <div key={i} className={`backdrop-blur-md border rounded-xl px-4 py-3 text-xs font-bold shadow-sm flex items-center gap-2 transition-all duration-700 ${isCardActive(4) ? 'bg-white/10 border-white/5 text-slate-200' : 'bg-white text-slate-500 border-slate-200'}`} style={{transitionDelay: isCardActive(4) ? `${i*100}ms` : '0ms'}}>
                     <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-700 ${isCardActive(4) ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]' : 'bg-slate-300'}`}></div>
                     <span className="tracking-tight">{label}</span>
                   </div>
                 ))}
               </div>
            </div>

          </div>

          {/* DIVERGE CURVE (SVG) */}
          <div className="w-32 h-[360px] relative flex-shrink-0 ml-10 mr-4">
             <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
               <defs>
                  {/* 蓝色发光 - Segmentation */}
                  <filter id="glowBlueDiv" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                    <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.376  0 0 0 0 0.647  0 0 0 0 0.98  0 0 0 1 0" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  {/* 紫色发光 - ILAE */}
                  <filter id="glowPurple" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                    <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.753  0 0 0 0 0.518  0 0 0 0 0.988  0 0 0 1 0" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  {/* 红色发光 - Pathology */}
                  <filter id="glowRed" x="-100%" y="-100%" width="300%" height="300%" colorInterpolationFilters="sRGB">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                    <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.973  0 0 0 0 0.443  0 0 0 0 0.443  0 0 0 1 0" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="blueGradDiv" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                    <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3"/>
                  </linearGradient>
                  <linearGradient id="purpleGradDiv" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9333EA" stopOpacity="0.3"/>
                    <stop offset="50%" stopColor="#C084FC" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#9333EA" stopOpacity="0.3"/>
                  </linearGradient>
                  <linearGradient id="redGradDiv" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3"/>
                    <stop offset="50%" stopColor="#F87171" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3"/>
                  </linearGradient>
               </defs>
               
               {/* 背景虚线管道 */}
               <path d="M 6 180 C 67 180, 67 55, 128 55" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="6 6" className="animate-dash-flow opacity-50" />
               <path d="M 6 180 L 128 180" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="6 6" className="animate-dash-flow opacity-50" />
               <path d="M 6 180 C 67 180, 67 305, 128 305" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="6 6" className="animate-dash-flow opacity-50" />
               
               {/* 激活后的管道 */}
               <path d="M 6 180 C 67 180, 67 55, 128 55" fill="none" stroke={activeStage >= 5 ? "url(#blueGradDiv)" : "transparent"} strokeWidth="5" className="transition-all duration-700" />
               <path d="M 6 180 L 128 180" fill="none" stroke={activeStage >= 5 ? "url(#purpleGradDiv)" : "transparent"} strokeWidth="5" className="transition-all duration-700" />
               <path d="M 6 180 C 67 180, 67 305, 128 305" fill="none" stroke={activeStage >= 5 ? "url(#redGradDiv)" : "transparent"} strokeWidth="5" className="transition-all duration-700" />
               
               {/* 持续流动的token粒子 - 不同形状对应不同输出任务 */}
               {activeStage >= 4 && (
                 <>
                   {/* 上路径 - 方形 (Segmentation - 像素级分割输出) */}
                   {[0, 1, 2].map((i) => (
                     <g key={`div-top-${i}`} filter="url(#glowBlueDiv)">
                       <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#60A5FA">
                         <animateMotion 
                           dur="2.2s" 
                           repeatCount="indefinite" 
                           path="M 6 180 C 67 180, 67 55, 128 55"
                           begin={`${i * 0.7}s`}
                           calcMode="spline" 
                           keySplines="0.4 0 0.2 1"
                           keyTimes="0;1"
                           rotate="auto"
                         />
                         <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.2s" repeatCount="indefinite" begin={`${i * 0.7}s`}/>
                       </rect>
                     </g>
                   ))}
                   
                   {/* 中路径 - 菱形 (ILAE - 分类决策) */}
                   {[0, 1, 2].map((i) => (
                     <g key={`div-mid-${i}`} filter="url(#glowPurple)">
                       <rect x="-4" y="-4" width="8" height="8" rx="1" fill="#C084FC" transform="rotate(45)">
                         <animateMotion 
                           dur="1.8s" 
                           repeatCount="indefinite" 
                           path="M 6 180 L 128 180"
                           begin={`${i * 0.6}s`}
                           calcMode="spline" 
                           keySplines="0.4 0 0.2 1"
                           keyTimes="0;1"
                         />
                         <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.8s" repeatCount="indefinite" begin={`${i * 0.6}s`}/>
                       </rect>
                     </g>
                   ))}
                   
                   {/* 下路径 - 圆形 (Pathology - 多标签概率) */}
                   {[0, 1, 2].map((i) => (
                     <g key={`div-bot-${i}`} filter="url(#glowRed)">
                       <circle r="5" fill="#F87171">
                         <animateMotion 
                           dur="2.2s" 
                           repeatCount="indefinite" 
                           path="M 6 180 C 67 180, 67 305, 128 305"
                           begin={`${i * 0.7}s`}
                           calcMode="spline" 
                           keySplines="0.4 0 0.2 1"
                           keyTimes="0;1"
                         />
                         <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2.2s" repeatCount="indefinite" begin={`${i * 0.7}s`}/>
                         <animate attributeName="r" values="3;5;5;3" keyTimes="0;0.1;0.9;1" dur="2.2s" repeatCount="indefinite" begin={`${i * 0.7}s`}/>
                       </circle>
                     </g>
                   ))}
                 </>
               )}
             </svg>
          </div>

          {/* --- STAGE 6: HEADS --- */}
          <div 
            ref={el => stageRefs.current[5] = el}
            className="flex flex-col gap-6 h-full justify-center"
          >
             
             {/* Segmentation Head */}
             <div className={`w-72 p-6 ${getCardStyle(5, 'blue')}`}>
                <div className="flex items-center gap-5">
                   <IconBox active={isCardActive(5)} themeColor="blue">
                      <Brain size={26} strokeWidth={2} />
                   </IconBox>
                   <div>
                    <div className="text-base font-bold tracking-tight">{t.segmentation}</div>
                    <div className={`text-xs mt-1 font-bold ${isCardActive(5) ? 'text-blue-100' : 'text-slate-400'}`}>{t.segmentation3D}</div>
                   </div>
                </div>
             </div>

             {/* ILAE Head */}
             <div className={`w-72 p-6 ${getCardStyle(5, 'purple')}`}>
                <div className="flex items-center gap-5">
                   <IconBox active={isCardActive(5)} themeColor="purple">
                      <Binary size={26} strokeWidth={2} />
                   </IconBox>
                   <div>
                    <div className="text-base font-bold tracking-tight">{t.ilaeClassification}</div>
                    <div className={`text-xs mt-1 font-bold ${isCardActive(5) ? 'text-purple-100' : 'text-slate-400'}`}>{t.outcomeScore}</div>
                   </div>
                </div>
             </div>

             {/* Pathology Head */}
             <div className={`w-72 p-6 ${getCardStyle(5, 'rose')}`}>
                <div className="flex items-center gap-5">
                   <IconBox active={isCardActive(5)} themeColor="rose">
                      <Stethoscope size={26} strokeWidth={2} />
                   </IconBox>
                   <div>
                    <div className="text-base font-bold tracking-tight">{t.pathology}</div>
                    <div className={`text-xs mt-1 font-bold ${isCardActive(5) ? 'text-rose-100' : 'text-slate-400'}`}>{t.multiLabelProbabilities}</div>
                   </div>
                </div>
             </div>

          </div>

        </div>
      </div>

      {/* Bottom Description Bar - 悬浮旁白区域 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-5xl">
        <div className="relative px-8 py-3 rounded-xl bg-slate-800/75 backdrop-blur-2xl shadow-lg shadow-slate-900/20 border border-slate-700/50">
          {/* 装饰光效 */}
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"></div>
          
          <p 
            key={activeStage}
            className="text-lg leading-snug text-white/95 font-medium text-center tracking-wide animate-fade-in"
          >
            {getCurrentDescription()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelPipeline;