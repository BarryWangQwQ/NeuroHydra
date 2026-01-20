import React, { useState, useEffect, useRef } from 'react';
import { 
  Scan, 
  FileText,
  Activity,
  TrendingUp,
  Layers, 
  Brain,
  Stethoscope,
  AlertTriangle,
  Pill,
  Microscope,
  Cpu,
  Target,
  GitBranch,
  Dna,
  Eye,
  Search,
  Hourglass,
  RotateCcw,
  ScrollText,
  MessageCircleQuestion,
  Database,
  Waves,          
  Camera,         
  Zap,            
  ImagePlus,      
  PenTool,        
  Sparkles,       
  ShieldCheck,    
  ScanLine        
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const MultimodalPipeline = ({ autoPlay = true, manualTick = 0 }) => {
  const { language } = useLanguage();
  const t = translations[language].multimodalPipeline;
  const [activeStage, setActiveStage] = useState(0);
  const [scanWave, setScanWave] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const firstManual = useRef(true);
  const manualCenterStep = useRef(false); // 手动模式：下一步回到起点前先停留中心
  
  const scrollContainerRef = useRef(null);
  const stageRefs = useRef([]); 
  const animationRef = useRef(null);

  const stages = ['input', 'encoder', 'processing', 'heads'];

  // 医疗相关的 Encoder 类型
  const encoders = [
    { icon: Brain, name: t.brainMRI, theme: 'indigo' },
    { icon: Scan, name: t.chestCT, theme: 'blue' },
    { icon: Microscope, name: t.pathologyWSI, theme: 'rose' },   
    { icon: FileText, name: t.clinicalNotes, theme: 'teal' }, 
    { icon: Dna, name: t.genomics, theme: 'green' },    
    { icon: Activity, name: t.leadECG, theme: 'red' }, 
    { icon: Search, name: t.dermoscopy, theme: 'orange' }, 
    { icon: Eye, name: t.fundusImage, theme: 'cyan' },
    { icon: Waves, name: t.ultrasound, theme: 'blue' },
    { icon: Camera, name: t.endoscopyVid, theme: 'purple' },
    { icon: Zap, name: t.eegSignal, theme: 'amber' },
    { icon: ScanLine, name: t.xRayImaging, theme: 'indigo' },
  ];

  // 医疗相关的 Task Header 类型
  const taskHeaders = [
    { icon: Target, name: t.tumorSegmentation, subtitle: t.lesionMasking, theme: 'blue' },
    { icon: GitBranch, name: t.diseaseSubtyping, subtitle: t.molecularClass, theme: 'purple' },
    { icon: Stethoscope, name: t.diffDiagnosis, subtitle: t.topKCandidates, theme: 'rose' },
    { icon: Hourglass, name: t.survivalAnalysis, subtitle: t.timeToEvent, theme: 'amber' },
    { icon: RotateCcw, name: t.readmission, subtitle: t.dayRisk, theme: 'orange' },
    { icon: Pill, name: t.drugResponse, subtitle: t.sensitivity, theme: 'cyan' },
    { icon: ScrollText, name: t.reportGen, subtitle: t.autoFindings, theme: 'indigo' },
    { icon: MessageCircleQuestion, name: t.visualQA, subtitle: t.clinicalQA, theme: 'green' },
    { icon: PenTool, name: t.surgicalPlan, subtitle: t.reconstruction3D, theme: 'teal' },
    { icon: ImagePlus, name: t.imageRetrieval, subtitle: t.similarCaseSearch, theme: 'blue' },
    { icon: Sparkles, name: t.dataSynthesis, subtitle: t.privacyGen, theme: 'purple' },
    { icon: ShieldCheck, name: t.federatedLearn, subtitle: t.privacyPreserving, theme: 'green' },
  ];

  // 计算卡片的波浪索引（对角线位置）
  const getWaveIndex = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return row + col;
  };

  // 主流程控制
  useEffect(() => {
    if (autoPlay) {
      setIsAnimationComplete(false);
      setShowLabels(false);
      setScanWave(-1);
    }
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    let interval;
    if (isPlaying && !isAnimationComplete && autoPlay) {
      interval = setInterval(() => {
        setIsScrolling(true); 
        setActiveStage((prev) => {
          const next = (prev + 1) % stages.length;
          // 当完成一轮循环后，停在 Mamba 阶段（stage 2）
          if (next === 0) {
            setIsAnimationComplete(true);
            // 使用 requestAnimationFrame 确保 DOM 更新后再显示标签，触发渐入动画
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setShowLabels(true);
              });
            });
            return 2; // 停在 Mamba 阶段
          }
          return next;
        });
        setScanWave(-1); 
      }, 4000); // 稍微增加总时长，配合放慢的动画
    }
    return () => clearInterval(interval);
  }, [isPlaying, isAnimationComplete, autoPlay, stages.length]);

  useEffect(() => {
    if (manualTick === 0 || autoPlay) return;
    if (firstManual.current) {
      firstManual.current = false;
      return;
    }
    
    // 如果上一轮已经在中心视角，当前点击回到起点
    if (manualCenterStep.current) {
      manualCenterStep.current = false;
      setIsAnimationComplete(false);
      setShowLabels(false);
      setScanWave(-1);
      setIsScrolling(true);
      setActiveStage(0);
      return;
    }

    setScanWave(-1);
    setIsScrolling(true);
    setActiveStage((prev) => {
      const baseNext = (prev + 1) % stages.length;

      // 一轮结束时（从 stage 3 点击），先停留中心视角（NeuroHydra）
      if (baseNext === 0) {
        manualCenterStep.current = true;
        return 2; // 聚焦 NeuroHydra
      }

      // 普通推进
      setIsAnimationComplete(false);
      setShowLabels(false);
      return baseNext;
    });
  }, [manualTick, autoPlay, stages.length]);

  // 当手动模式到达中心视角时，点亮标签
  useEffect(() => {
    if (!autoPlay && activeStage === 2 && manualCenterStep.current && !isScrolling) {
      setIsAnimationComplete(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowLabels(true);
        });
      });
    }
  }, [activeStage, autoPlay, isScrolling]);

  // 扫描动画控制：波浪式扫描
  useEffect(() => {
    let scanInterval;
    if (activeStage === 1 || activeStage === 3) {
      setScanWave(-1);
      
      // 优化：延迟300ms开始扫描，让镜头先移动一会，波浪再跟上
      const startDelay = setTimeout(() => {
        let count = 0;
        const maxSteps = 7; 
        
        // 优化：放慢波浪频率至 180ms，配合平滑运镜
        scanInterval = setInterval(() => {
          setScanWave(prev => {
            if (prev >= maxSteps) return prev;
            return prev + 1;
          });
          count++;
          if (count > maxSteps + 2) clearInterval(scanInterval);
        }, 180); 
      }, 300);

      return () => {
        clearTimeout(startDelay);
        clearInterval(scanInterval);
      };
    } else {
      setScanWave(-1);
    }
  }, [activeStage]);


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

      // 优化：恢复到 1200ms 的平滑运镜速度
      scrollToPosition(container, targetScrollLeft, 1200, () => {
        setIsScrolling(false);
      });
    }
  }, [activeStage]);

  const isStageActive = (index) => activeStage === index;
  
  // 核心样式逻辑
  const getCardStyle = (stageIndex, themeColor, itemIndex = -1) => {
    const stageActive = isStageActive(stageIndex);
    const isPast = activeStage > stageIndex;
    
    let base = "transition-all duration-500 ease-out rounded-2xl relative overflow-hidden flex border fix-safari-radius will-change-transform ";
    
    let isFocused = false; 
    let isDone = false;    
    let isFinished = false; 
    let isPending = false; 

    // 动画完成后：点亮左右两侧的所有卡片（不包括第一个 RawData，即 stage 0）
    if (isAnimationComplete && stageIndex !== 0) {
      if (stageIndex === 1 || stageIndex === 3) {
        // Encoder 和 TaskHeaders 的所有卡片都点亮
        if (itemIndex !== -1) {
          isDone = true;
        }
      } else if (stageIndex === 2) {
        // Mamba 卡片激活
        isFocused = true;
      }
    } else if (stageActive) {
      if (itemIndex !== -1) {
        const itemWave = getWaveIndex(itemIndex);
        if (itemWave === scanWave) isFocused = true;
        else if (itemWave < scanWave) isDone = true;
        else isPending = true;
      } else {
        isFocused = true;
      }
    } else if (isPast) {
      isFinished = true;
    } else {
      isPending = true;
    }

    if (isFocused) {
      base += "scale-105 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] z-20 ring-2 ring-white/40 border-transparent ";
    } else if (isDone) {
      base += "scale-100 shadow-md z-10 border-white/10 opacity-100 ";
    } else if (isFinished) {
      base += "scale-95 opacity-50 bg-slate-100 border-slate-200 z-0 grayscale-[0.3] ";
      return base; 
    } else {
      base += "scale-95 opacity-30 bg-slate-50 border-slate-200 border-dashed z-0 grayscale-[0.8] ";
      return base;
    }

    const colors = {
      blue: "bg-gradient-to-br from-blue-500 via-indigo-600 to-indigo-700 text-white animate-gradient-xy bg-[length:200%_200%]",
      green: "bg-gradient-to-br from-emerald-500 via-teal-600 to-teal-700 text-white animate-gradient-xy bg-[length:200%_200%]",
      indigo: "bg-gradient-to-br from-indigo-500 via-violet-600 to-indigo-700 text-white animate-gradient-xy bg-[length:200%_200%]",
      teal: "bg-gradient-to-br from-cyan-500 via-teal-600 to-teal-700 text-white animate-gradient-xy bg-[length:200%_200%]",
      purple: "bg-gradient-to-br from-fuchsia-500 via-purple-600 to-violet-700 text-white animate-gradient-xy bg-[length:200%_200%]",
      amber: "bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white animate-gradient-xy bg-[length:200%_200%]",
      rose: "bg-gradient-to-br from-rose-500 via-pink-600 to-pink-700 text-white animate-gradient-xy bg-[length:200%_200%]",
      red: "bg-gradient-to-br from-red-500 via-rose-600 to-red-700 text-white animate-gradient-xy bg-[length:200%_200%]",
      orange: "bg-gradient-to-br from-orange-500 via-amber-600 to-orange-700 text-white animate-gradient-xy bg-[length:200%_200%]",
      cyan: "bg-gradient-to-br from-cyan-500 via-blue-600 to-cyan-700 text-white animate-gradient-xy bg-[length:200%_200%]",
    };

    const themeClass = colors[themeColor] || colors.blue;
    return base + themeClass;
  };

  const getSubtitleColor = (themeColor, active, isDone) => {
    if (active || isDone) return "text-white/80";
    return "text-slate-400";
  };

  const IconBox = ({ children, active, done, themeColor = 'blue' }) => {
    let bgClass = "bg-white border border-slate-100 shadow-sm";
    let colorClass = "text-slate-400";
    
    if (active || done) {
      bgClass = "bg-white/20 text-white backdrop-blur-md border border-white/20";
      colorClass = "text-white";
    } 

    return (
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${bgClass} ${colorClass}`}>
        {children}
      </div>
    );
  };

  const HConnector = ({ active, width = "w-16" }) => (
    <div className={`flex items-center ${width} h-full relative overflow-hidden flex-shrink-0 justify-center group`}>
      <div className="h-[2px] w-full bg-slate-100 rounded-full relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/60 to-transparent w-[50%] animate-shimmer-subtle opacity-50"></div>
      </div>
      
      {active && (
        <div className="absolute inset-0 flex items-center">
          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent absolute animate-flow-beam rounded-full z-10 blur-[0.5px]"></div>
        </div>
      )}
    </div>
  );

  const SectionLabel = ({ text, active }) => {
    const labelRef = useRef(null);
    
    useEffect(() => {
      if (labelRef.current) {
        const element = labelRef.current;
        // 强制浏览器重新计算样式，确保过渡动画能够触发
        void element.offsetHeight;
      }
    }, [active]);
    
    return (
      // 增加间距：mb-3 -> mb-6
      <div 
        ref={labelRef}
        className="mb-6 flex justify-center"
        style={{ 
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 1000ms ease-in-out, transform 1000ms ease-in-out',
          willChange: 'opacity, transform',
          pointerEvents: active ? 'auto' : 'none'
        }}
      >
        <div 
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full
            border shadow-sm backdrop-blur-md
            transition-all duration-1000 ease-in-out
            ${active 
              ? 'bg-white/80 border-slate-200/80 text-slate-700' 
              : 'bg-transparent border-transparent text-slate-400' 
            }
          `}
        >
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ease-in-out ${active ? 'bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)] opacity-100' : 'bg-transparent opacity-0'}`}></div>
          <span className={`text-[10px] font-bold uppercase tracking-widest leading-none mt-[1px] transition-all duration-1000 ease-in-out ${active ? 'text-slate-700 opacity-100' : 'text-slate-400 opacity-0'}`}>{text}</span>
        </div>
      </div>
    );
  };

  const isMambaActive = isStageActive(2) || isAnimationComplete;

  return (
    <div className="h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 overflow-hidden flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .fix-safari-radius {
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          mask-image: radial-gradient(white, black);
          isolation: isolate;
        }

        @keyframes flow-beam {
          0% { left: -100%; opacity: 0; transform: scaleX(0.5); }
          40% { opacity: 1; transform: scaleX(1); }
          60% { opacity: 1; transform: scaleX(1); }
          100% { left: 100%; opacity: 0; transform: scaleX(0.5); }
        }
        .animate-flow-beam {
          animation: flow-beam 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes shimmer-subtle {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .animate-shimmer-subtle {
          animation: shimmer-subtle 2s linear infinite;
        }

        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 6s ease infinite; 
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

      {/* Main Canvas */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden bg-white scroll-smooth flex items-center"
        style={{ scrollBehavior: 'auto' }}
      >
        <div className="flex items-center min-w-max px-[50vw] py-8 space-x-0">
          
          {/* --- STAGE 1: INPUTS --- */}
          <div className="flex flex-col justify-center h-full">
            {/* Input 部分增加 spacing 以匹配新的 Grid Label 高度 */}
            <div className="h-[42px] mb-6"></div> 
            
            <div 
                ref={el => stageRefs.current[0] = el}
                className="flex flex-col gap-2.5"
            >
                <div className={`w-40 h-28 ${getCardStyle(0, 'blue')}`}>
                <div className="w-full h-full p-3 flex flex-col items-center justify-center">
                    <IconBox active={isStageActive(0)} done={activeStage > 0} themeColor="blue">
                    <Database size={18} strokeWidth={2.5} />
                    </IconBox>
                    <div className="text-center mt-3">
                    <div className="text-sm font-bold tracking-tight">{t.rawData}</div>
                    </div>
                </div>
                </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex items-center px-2 pt-12">
            <HConnector active={activeStage >= 1} width="w-16" />
          </div>

          {/* --- STAGE 2: ENCODERS (Modality Encoders) --- */}
          <div 
            ref={el => stageRefs.current[1] = el}
            className="flex flex-col justify-center h-full"
          >
            <SectionLabel text={t.modalityEncoders} active={isStageActive(1) || (isAnimationComplete && showLabels)} />
            
            <div 
                className="grid grid-cols-3 gap-x-4 gap-y-3"
                style={{ width: '720px' }} 
            >
                {encoders.map((encoder, index) => {
                const IconComponent = encoder.icon;
                const stageActive = isStageActive(1);
                
                const itemWave = getWaveIndex(index);
                const isFocused = !isAnimationComplete && stageActive && itemWave === scanWave;
                const isDone = (!isAnimationComplete && stageActive && itemWave < scanWave) || isAnimationComplete;

                return (
                    <div 
                      key={index} 
                      className={`w-full h-22 ${getCardStyle(1, encoder.theme, index)}`}
                    >
                    <div className="w-full h-full p-3 pl-4 flex items-center gap-3">
                        <IconBox active={isFocused} done={isDone} themeColor={encoder.theme}>
                        <IconComponent size={18} strokeWidth={2.5} />
                        </IconBox>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="text-[13px] font-bold tracking-tight leading-tight break-words">{encoder.name}</div>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
          </div>

          {/* Connector */}
          <div className="flex items-center px-2 pt-12">
            <HConnector active={activeStage >= 2} width="w-16" />
          </div>

          {/* --- MIDDLE PIPELINE --- */}
          <div className="flex flex-col justify-center h-full">
            {/* Input 部分增加 spacing 以匹配新的 Grid Label 高度 */}
            <div className="h-[42px] mb-6"></div>
            
            <div 
                ref={el => stageRefs.current[2] = el}
                className={`w-56 h-48 ${getCardStyle(2, 'purple')}`} 
            >
                <div className="w-full h-full p-5 flex flex-col items-center justify-center text-center">
                    <IconBox active={isMambaActive} done={false} themeColor="purple">
                    <Cpu size={22} strokeWidth={2.5} />
                    </IconBox>
                    <div className="mt-4">
                    <div className={`font-extrabold text-lg block tracking-tight mb-1 ${isMambaActive || activeStage > 2 ? 'text-white' : 'text-slate-800'}`}>{t.neuroHydra}</div>
                    <div className={`text-[10px] uppercase tracking-widest font-bold leading-tight ${isMambaActive || activeStage > 2 ? 'text-purple-100' : 'text-slate-400'}`}>{t.multimodalFusion}</div>
                    </div>
                </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex items-center px-2 pt-12">
            <HConnector active={activeStage >= 3 || isAnimationComplete} width="w-16" />
          </div>

          {/* --- STAGE 4: TASK HEADS (Downstream Tasks) --- */}
          <div 
            ref={el => stageRefs.current[3] = el}
            className="flex flex-col justify-center h-full"
          >
            <SectionLabel text={t.downstreamTasks} active={isStageActive(3) || (isAnimationComplete && showLabels)} />

            <div 
                className="grid grid-cols-3 gap-x-4 gap-y-3"
                style={{ width: '720px' }}
            >
                {taskHeaders.map((task, index) => {
                const IconComponent = task.icon;
                const stageActive = isStageActive(3);
                
                const itemWave = getWaveIndex(index);
                const isFocused = !isAnimationComplete && stageActive && itemWave === scanWave;
                const isDone = (!isAnimationComplete && stageActive && itemWave < scanWave) || isAnimationComplete;

                return (
                    <div 
                      key={index} 
                      className={`w-full h-22 ${getCardStyle(3, task.theme, index)}`}
                    >
                    <div className="w-full h-full p-3 pl-4 flex items-center gap-3">
                        <div className="flex-shrink-0">
                        <IconBox active={isFocused} done={isDone} themeColor={task.theme}>
                            <IconComponent size={18} strokeWidth={2.5} />
                        </IconBox>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="text-[13px] font-bold tracking-tight leading-tight mb-0.5">{task.name}</div>
                        <div className={`text-[11px] font-medium leading-tight truncate ${getSubtitleColor(task.theme, isFocused, isDone)}`}>
                            {task.subtitle}
                        </div>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MultimodalPipeline;