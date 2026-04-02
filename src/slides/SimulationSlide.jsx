import React, { useState, useRef, useEffect } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const SimulationDemo = ({ autoPlay = false, manualTick = 0 }) => {
  const { language } = useLanguage();
  const t = translations[language].simulationSlide;
  // --- Fixed Parameters ---
  const mriSize = 256; 
  const patchSize = 16;
  const mergeRatio = 0.5; // 50% Fusion
  
  // Model Configs
  const VIT_DIM = 768; 
  const CONV_FACTOR = 768; 
  
  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState(null);
  
  const [progress, setProgress] = useState({
    transformer: 0,
    tomeTransformer: 0,
    resnet: 0,
    convnext: 0,
    mamba2: 0,
    tomeMamba2: 0
  });

  const [timings, setTimings] = useState({
    transformer: 0,
    tomeTransformer: 0,
    resnet: 0,
    convnext: 0,
    mamba2: 0,
    tomeMamba2: 0
  });

  const [sortedModels, setSortedModels] = useState([
    'resnet',
    'convnext',
    'transformer',
    'tomeTransformer',
    'mamba2',
    'tomeMamba2'
  ]);

  const [finishedModels, setFinishedModels] = useState(new Set());

  const requestRef = useRef();
  const startTimeRef = useRef();
  const targetTimingsRef = useRef({});

  // --- Core Calculation Logic ---
  const calculateTargets = () => {
    const patchTokens = Math.pow(mriSize / patchSize, 2); 
    const sliceN = patchTokens; 
    const numSlices = 3 * mriSize; 
    const totalN = numSlices * sliceN; 

    const D = VIT_DIM;
    
    // 调整后的参数，使得速度更合理
    const TRANS_BASE = 0.000003;  // Transformer 基础系数
    const PE_COST = 0.0000008 * totalN * D;  // 位置编码成本

    // ViT: O(N²) 复杂度，最慢
    const transSliceCost = TRANS_BASE * Math.pow(sliceN, 2) * D;
    const transformerScore = (numSlices * transSliceCost) + PE_COST + 200;

    // ViT + AS-VSF: Token 减少 50%，速度提升明显
    const reducedSliceN = sliceN * (1 - mergeRatio);
    const tomeOverhead = 0.000005 * sliceN * D; 
    const tomeSliceCost = TRANS_BASE * Math.pow(reducedSliceN, 2) * D + tomeOverhead;
    const tomeTransScore = (numSlices * tomeSliceCost) + PE_COST + 200;

    // 3D CNN: 虽然是 O(N)，但 3D 卷积计算量大
    const RESNET_CONST = 0.000025;  // 提高系数，反映 3D 卷积的实际开销
    const resnetScore = (RESNET_CONST * totalN * CONV_FACTOR) + 180;

    // ConvNeXt: 优化的 CNN，比标准 CNN 稍快
    const CONVNEXT_CONST = 0.000020;
    const convnextScore = (CONVNEXT_CONST * totalN * CONV_FACTOR) + 150;

    // Mamba2: O(N) 线性复杂度，专门为序列优化
    const MAMBA_CONST = 0.000010;
    const mambaScore = (MAMBA_CONST * totalN * D) + PE_COST + 100;

    // Mamba2 + AS-VSF: 最快
    const reducedTotalN = totalN * (1 - mergeRatio);
    const tomeMambaOverhead = 0.0000002 * totalN * D; 
    const tomeMambaScore = (MAMBA_CONST * reducedTotalN * D) + PE_COST + tomeMambaOverhead + 100;

    return {
      transformer: Math.max(transformerScore, 100),
      tomeTransformer: Math.max(tomeTransScore, 100),
      resnet: Math.max(resnetScore, 90),
      convnext: Math.max(convnextScore, 80),
      mamba2: Math.max(mambaScore, 50),
      tomeMamba2: Math.max(tomeMambaScore, 50)
    };
  };

  const startSimulation = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    setResults(null);
    setProgress({ transformer: 0, tomeTransformer: 0, resnet: 0, convnext: 0, mamba2: 0, tomeMamba2: 0 });
    setTimings({ transformer: 0, tomeTransformer: 0, resnet: 0, convnext: 0, mamba2: 0, tomeMamba2: 0 });
    setFinishedModels(new Set());
    setSortedModels(['resnet', 'convnext', 'transformer', 'tomeTransformer', 'mamba2', 'tomeMamba2']);

    const targets = calculateTargets();
    targetTimingsRef.current = targets;
    
    startTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);
  };

  const animate = (time) => {
    const elapsed = time - startTimeRef.current;
    const targets = targetTimingsRef.current;
    
    const newProgress = {};
    const currentTimings = {};
    let allFinished = true;
    const newlyFinished = [];

    ['transformer', 'tomeTransformer', 'resnet', 'convnext', 'mamba2', 'tomeMamba2'].forEach(key => {
      const targetTime = targets[key];
      let p = (elapsed / targetTime) * 100;
      
      if (p >= 100) {
        p = 100;
        currentTimings[key] = targetTime;
        // 检查是否新完成
        if (!finishedModels.has(key)) {
          newlyFinished.push(key);
        }
      } else {
        allFinished = false;
        currentTimings[key] = elapsed;
      }
      newProgress[key] = p;
    });

    setProgress(newProgress);
    setTimings(prev => ({...prev, ...currentTimings}));

    // 只在有新完成的模型时才重新排序
    if (newlyFinished.length > 0) {
      setFinishedModels(prev => {
        const updated = new Set(prev);
        newlyFinished.forEach(model => updated.add(model));
        
        // 重新排序
        const modelsList = ['transformer', 'tomeTransformer', 'resnet', 'convnext', 'mamba2', 'tomeMamba2'];
        const finished = modelsList.filter(m => updated.has(m));
        const unfinished = modelsList.filter(m => !updated.has(m));
        
        // 已完成的按时间排序
        finished.sort((a, b) => targets[a] - targets[b]);
        
        // 合并：已完成的在前，未完成的保持原顺序在后
        setSortedModels([...finished, ...unfinished]);
        
        return updated;
      });
    }

    if (allFinished) {
      setIsSimulating(false);
      setResults(targets);
    } else {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  const reset = () => {
    setIsSimulating(false);
    cancelAnimationFrame(requestRef.current);
    setProgress({ transformer: 0, tomeTransformer: 0, resnet: 0, convnext: 0, mamba2: 0, tomeMamba2: 0 });
    setTimings({ transformer: 0, tomeTransformer: 0, resnet: 0, convnext: 0, mamba2: 0, tomeMamba2: 0 });
    setResults(null);
    setFinishedModels(new Set());
    setSortedModels(['resnet', 'convnext', 'transformer', 'tomeTransformer', 'mamba2', 'tomeMamba2']);
  };

  // 自动开始动画 - 页面加载时自动开始
  useEffect(() => {
    // 延迟500ms开始，让页面过渡完成
    const timer = setTimeout(() => {
      startSimulation();
    }, 500);
    
    // 清理函数
    return () => {
      clearTimeout(timer);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 只在挂载时运行一次

  // 模型配置
  const modelConfigs = {
    transformer: {
      name: t.visionTransformer,
      shortName: 'Transformer',
      gradient: 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500',
      badge: t.baseline
    },
    tomeTransformer: {
      name: t.visionTransformerAsvs,
      shortName: 'Transformer (AS-VSF)',
      gradient: 'bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500',
      badge: null
    },
    resnet: {
      name: t.standard3dCnn,
      shortName: 'CNN',
      gradient: 'bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500',
      badge: t.baseline
    },
    convnext: {
      name: t.convnext,
      shortName: 'ConvNeXt',
      gradient: 'bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500',
      badge: null
    },
    mamba2: {
      name: t.mamba2,
      shortName: 'Mamba-2',
      gradient: 'bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500',
      badge: null
    },
    tomeMamba2: {
      name: t.mamba2Asvs,
      shortName: 'Mamba-2 (AS-VSF)',
      gradient: 'bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500',
      badge: t.fastest
    }
  };

  // --- Sub-Components ---
  
  const ModelRow = ({ id }) => {
    const config = modelConfigs[id];
    const isFinished = progress[id] === 100;
    const time = (timings[id] / 1000).toFixed(2);
    const speedup = results && results[id] > 0 ? (results.transformer / results[id]).toFixed(2) : '-';
    
    // 计算排名（模型完成后立即显示）
    const rank = isFinished ? sortedModels.indexOf(id) + 1 : null;
    const showRank = rank && rank <= 3;
    
    return (
      <motion.div 
        layout
        layoutId={id}
        initial={false}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        className="w-full flex flex-col gap-1.5"
      > 
        <div className="flex justify-between items-center"> 
          <div className="flex items-center gap-3 flex-1"> 
                {showRank && (
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-black text-sm shadow-lg ${
                    rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' :
                    rank === 2 ? 'bg-gradient-to-br from-gray-300 to-slate-400 text-white' :
                    'bg-gradient-to-br from-amber-600 to-orange-700 text-white'
                  }`}>
                    {rank === 1 ? <Trophy size={16} strokeWidth={2.5} /> :
                     rank === 2 ? <Medal size={16} strokeWidth={2.5} /> :
                     <Medal size={16} strokeWidth={2.5} />}
                  </div>
                )}
                
                <span className="font-bold text-lg text-slate-800 tracking-tight">{config.shortName}</span>
                {config.badge && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold uppercase tracking-wider shadow-sm">
                        {config.badge}
                    </span>
                )}
          </div>
          
          <div className="text-right flex items-center gap-4">
             {id !== 'transformer' && results && (
                <span className="text-base font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {speedup}x
                </span>
             )}
             <span className={`font-mono text-2xl font-bold tabular-nums min-w-[120px] text-right transition-all duration-300 ${isFinished ? 'text-slate-800' : 'text-slate-300'}`}> 
               {time}<span className="text-base text-slate-500 font-semibold ml-1">s</span>
             </span>
          </div>
        </div>
        
        <div className="h-5 w-full bg-[#F0F2F5] rounded-full overflow-hidden relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]"> 
           <div 
             className={`h-full transition-all duration-100 ease-out rounded-full ${config.gradient} relative overflow-hidden`}
             style={{ width: `${progress[id]}%` }}
           >
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
           </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-slide min-h-slide bg-white text-[#1C1E21] selection:bg-blue-100 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden relative flat-scrollbar px-12 py-8" style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      
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

        /* 扁平滚动条样式（仅用于本页容器） */
        .flat-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.5) #f8fafc;
        }
        .flat-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .flat-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          box-shadow: none;
        }
        .flat-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 0;
          box-shadow: none;
        }
        .flat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.6);
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
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
      `}</style>

      {/* Background Gradient Blurs - Natural Colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left gradient - 柔和靛紫 */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20 animate-float-slow" 
             style={{ 
               background: 'radial-gradient(circle, rgba(129, 140, 248, 0.35) 0%, rgba(129, 140, 248, 0.28) 15%, rgba(165, 180, 252, 0.22) 30%, rgba(129, 140, 248, 0.14) 45%, rgba(129, 140, 248, 0.06) 60%, rgba(129, 140, 248, 0.02) 75%, transparent 90%)',
               filter: 'blur(120px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
        
        {/* Bottom-right gradient - 柔和青绿 */}
        <div className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full opacity-17 animate-float-slower" 
             style={{ 
               background: 'radial-gradient(circle, rgba(45, 212, 191, 0.32) 0%, rgba(45, 212, 191, 0.26) 15%, rgba(94, 234, 212, 0.2) 30%, rgba(45, 212, 191, 0.12) 45%, rgba(45, 212, 191, 0.05) 60%, rgba(45, 212, 191, 0.02) 75%, transparent 90%)',
               filter: 'blur(130px)',
               willChange: 'transform',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
        
        {/* Center accent - 淡粉橙 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-14" 
             style={{ 
               background: 'radial-gradient(circle, rgba(251, 146, 60, 0.28) 0%, rgba(251, 146, 60, 0.22) 15%, rgba(253, 186, 116, 0.16) 30%, rgba(251, 146, 60, 0.1) 45%, rgba(251, 146, 60, 0.04) 60%, rgba(251, 146, 60, 0.01) 75%, transparent 90%)',
               filter: 'blur(125px)',
               transform: 'translateZ(0)',
               backfaceVisibility: 'hidden',
               WebkitFontSmoothing: 'antialiased'
             }}></div>
      </div>
      
      {/* Main block — vertically centered as one unit (like BenchmarkTableSlide), not stuck to top */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col shrink-0">
          
          {/* Title — matches BenchmarkTableSlide heading treatment */}
          <div className="mb-2 w-full">
              <h1 className="text-[48px] font-black leading-[1.1] tracking-[-0.02em]">
                <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                  {t.title}
                </span>
              </h1>
              <p className="mt-1.5 text-[14px] text-slate-500 leading-snug max-w-6xl">
                {t.scenario}
              </p>
          </div>

          {/* Race rows — tight under title; whole column is centered in viewport */}
          <div className="pt-1">
              <LayoutGroup>
                <div className="flex flex-col gap-3">
                    {sortedModels.map((modelId) => (
                      <ModelRow key={modelId} id={modelId} />
                    ))}
                </div>
              </LayoutGroup>
          </div>

          {/* Description Bar */}
          <div className="mt-3 w-full">
            <div className="relative px-6 py-2.5 rounded-xl bg-slate-800/75 backdrop-blur-2xl shadow-lg shadow-slate-900/20 border border-slate-700/50">
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
              <p className="text-base leading-snug text-white/95 font-medium text-center tracking-wide animate-fade-in">
                {t.description}
              </p>
            </div>
          </div>

      </div>
    </div>
  );
};

export default SimulationDemo;