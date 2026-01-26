import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// DINOv3 可视化 - 自蒸馏概念：Teacher和Student网络
const DINOVisualization = ({ delay }) => {
  return (
    <div 
      className="relative w-[200px] h-[90px] reveal-line"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 200 90" className="w-full h-full">
        <defs>
          <linearGradient id="dinoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="dinoGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        
        {/* Teacher Network */}
        <g className="animate-pulse" style={{ animationDuration: '3s' }}>
          <rect x="10" y="20" width="50" height="50" rx="8" fill="url(#dinoGrad)" opacity="0.9"/>
          {/* Grid pattern inside - representing image patches */}
          {[0,1,2].map(i => [0,1,2].map(j => (
            <rect key={`t-${i}-${j}`} x={16 + i*14} y={26 + j*14} width="10" height="10" rx="2" fill="white" opacity="0.3"/>
          )))}
          <text x="35" y="82" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="600">Teacher</text>
        </g>
        
        {/* Student Network */}
        <g className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
          <rect x="140" y="20" width="50" height="50" rx="8" fill="url(#dinoGrad2)" opacity="0.9"/>
          {/* Grid pattern inside */}
          {[0,1,2].map(i => [0,1,2].map(j => (
            <rect key={`s-${i}-${j}`} x={146 + i*14} y={26 + j*14} width="10" height="10" rx="2" fill="white" opacity="0.3"/>
          )))}
          <text x="165" y="82" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="600">Student</text>
        </g>
        
        {/* Distillation Arrow */}
        <g>
          <path d="M 65 45 Q 100 25, 135 45" fill="none" stroke="url(#dinoGrad)" strokeWidth="2" strokeDasharray="4,2">
            <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.5s" repeatCount="indefinite"/>
          </path>
          <polygon points="133,42 140,45 133,48" fill="#9333ea"/>
          <text x="100" y="18" textAnchor="middle" fontSize="7" fill="#9333ea" fontWeight="500">Distill</text>
        </g>
        
        {/* No Labels indicator */}
        <g>
          <circle cx="100" cy="60" r="12" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7"/>
          <line x1="92" y1="52" x2="108" y2="68" stroke="#ef4444" strokeWidth="1.5" opacity="0.7"/>
          <text x="100" y="63" textAnchor="middle" fontSize="6" fill="#ef4444" fontWeight="500">Labels</text>
        </g>
      </svg>
    </div>
  );
};

// AS-VSF 可视化 - 轴向切片融合
const ASVSFVisualization = ({ delay }) => {
  return (
    <div 
      className="relative w-[200px] h-[90px] reveal-line"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 200 90" className="w-full h-full">
        <defs>
          <linearGradient id="asvsfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        
        {/* 三个轴向切片 - 3D cube representation */}
        <g transform="translate(15, 15)">
          {/* Axial slice (top view) */}
          <g className="animate-pulse" style={{ animationDuration: '2s' }}>
            <rect x="0" y="0" width="35" height="35" rx="4" fill="#2563eb" opacity="0.8"/>
            <text x="17.5" y="50" textAnchor="middle" fontSize="6" fill="#64748b">Axial</text>
            {/* Dense dots */}
            {[0,1,2,3,4].map(i => [0,1,2,3,4].map(j => (
              <circle key={`a-${i}-${j}`} cx={5 + i*7} cy={5 + j*7} r="1.5" fill="white" opacity="0.5"/>
            )))}
          </g>
          
          {/* Sagittal slice */}
          <g transform="translate(45, 0)" className="animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.3s' }}>
            <rect x="0" y="0" width="35" height="35" rx="4" fill="#9333ea" opacity="0.8"/>
            <text x="17.5" y="50" textAnchor="middle" fontSize="6" fill="#64748b">Sagittal</text>
            {[0,1,2,3,4].map(i => [0,1,2,3,4].map(j => (
              <circle key={`s-${i}-${j}`} cx={5 + i*7} cy={5 + j*7} r="1.5" fill="white" opacity="0.5"/>
            )))}
          </g>
          
          {/* Coronal slice */}
          <g transform="translate(90, 0)" className="animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.6s' }}>
            <rect x="0" y="0" width="35" height="35" rx="4" fill="#ec4899" opacity="0.8"/>
            <text x="17.5" y="50" textAnchor="middle" fontSize="6" fill="#64748b">Coronal</text>
            {[0,1,2,3,4].map(i => [0,1,2,3,4].map(j => (
              <circle key={`c-${i}-${j}`} cx={5 + i*7} cy={5 + j*7} r="1.5" fill="white" opacity="0.5"/>
            )))}
          </g>
        </g>
        
        {/* Sparse clinical data */}
        <g transform="translate(145, 15)">
          <rect x="0" y="0" width="40" height="35" rx="4" fill="none" stroke="url(#asvsfGrad)" strokeWidth="1.5" opacity="0.5"/>
          {/* Sparse points */}
          <circle cx="10" cy="10" r="4" fill="url(#asvsfGrad)" opacity="0.8"/>
          <circle cx="30" cy="12" r="4" fill="url(#asvsfGrad)" opacity="0.8"/>
          <circle cx="15" cy="25" r="4" fill="url(#asvsfGrad)" opacity="0.8"/>
          <circle cx="32" cy="28" r="4" fill="url(#asvsfGrad)" opacity="0.8"/>
          <text x="20" y="50" textAnchor="middle" fontSize="6" fill="#64748b">Sparse</text>
        </g>
        
        {/* Fusion indicator */}
        <g transform="translate(0, 62)">
          <rect x="50" y="0" width="100" height="18" rx="9" fill="url(#asvsfGrad)" opacity="0.15"/>
          <text x="100" y="12" textAnchor="middle" fontSize="8" fill="#9333ea" fontWeight="600">→ Fusion →</text>
        </g>
      </svg>
    </div>
  );
};

// MAMBA 可视化 - 状态空间模型序列
const MAMBAVisualization = ({ delay }) => {
  return (
    <div 
      className="relative w-[200px] h-[90px] reveal-line"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 200 90" className="w-full h-full">
        <defs>
          <linearGradient id="mambaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="stateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        
        {/* State representation - flowing line */}
        <path 
          d="M 20 45 Q 50 25, 80 45 Q 110 65, 140 45 Q 170 25, 190 45" 
          fill="none" 
          stroke="url(#mambaGrad)" 
          strokeWidth="3"
          opacity="0.3"
        />
        
        {/* Animated state flow */}
        <path 
          d="M 20 45 Q 50 25, 80 45 Q 110 65, 140 45 Q 170 25, 190 45" 
          fill="none" 
          stroke="url(#mambaGrad)" 
          strokeWidth="3"
          strokeDasharray="20,180"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="2s" repeatCount="indefinite"/>
        </path>
        
        {/* Sequential states */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${25 + i * 38}, 35)`}>
            <rect 
              x="-12" y="-12" width="24" height="24" rx="6" 
              fill="url(#stateGrad)" 
              opacity={0.6 + i * 0.1}
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}
            />
            <text x="0" y="4" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">
              h{i}
            </text>
          </g>
        ))}
        
        {/* Arrows between states */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`arrow-${i}`}>
            <line 
              x1={37 + i * 38} y1="35" 
              x2={50 + i * 38} y2="35" 
              stroke="#9333ea" 
              strokeWidth="1.5"
              opacity="0.6"
            />
            <polygon 
              points={`${50 + i * 38},32 ${54 + i * 38},35 ${50 + i * 38},38`} 
              fill="#9333ea"
              opacity="0.6"
            />
          </g>
        ))}
        
        {/* Memory indicator */}
        <g transform="translate(100, 70)">
          <rect x="-35" y="-8" width="70" height="16" rx="8" fill="url(#stateGrad)" opacity="0.2"/>
          <text x="0" y="4" textAnchor="middle" fontSize="7" fill="#0d9488" fontWeight="600">Learnable Memory</text>
        </g>
        
        {/* Input/Output labels */}
        <text x="15" y="70" textAnchor="middle" fontSize="7" fill="#64748b">Input</text>
        <text x="185" y="70" textAnchor="middle" fontSize="7" fill="#64748b">Output</text>
      </svg>
    </div>
  );
};

const ComponentsSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      items: [
        {
          title: 'DINOv3',
          description: 'Self-Distillation with No Labels · 2D 医学图像基础骨干网络',
          visualization: 'dino'
        },
        {
          title: 'AS-VSF',
          description: 'Axis-Slice Visual-Sparse Fusion · 融合密集和稀疏信息',
          visualization: 'asvsf'
        },
        {
          title: 'MAMBA',
          description: 'State Space Model · 序列建模，可学习记忆',
          visualization: 'mamba'
        }
      ],
      narration: 'NeuroHydra 由三个核心组件构成：DINOv3 用于图像特征提取，AS-VSF 用于多模态融合，Mamba 用于高效序列建模。'
    },
    en: {
      items: [
        {
          title: 'DINOv3',
          description: 'Self-Distillation with No Labels · 2D Medical Image Foundation Backbone',
          visualization: 'dino'
        },
        {
          title: 'AS-VSF',
          description: 'Axis-Slice Visual-Sparse Fusion · Fusing Dense and Sparse Information',
          visualization: 'asvsf'
        },
        {
          title: 'MAMBA',
          description: 'State Space Model · Sequential Modeling, Learnable Memory',
          visualization: 'mamba'
        }
      ],
      narration: 'NeuroHydra consists of three core components: DINOv3 for image feature extraction, AS-VSF for multimodal fusion, and Mamba for efficient sequence modeling.'
    }
  };

  const t = content[language];
  const baseDelay = 0.2;
  const stepDelay = 0.4;

  const renderVisualization = (type, delay) => {
    switch (type) {
      case 'dino':
        return <DINOVisualization delay={delay} />;
      case 'asvsf':
        return <ASVSFVisualization delay={delay} />;
      case 'mamba':
        return <MAMBAVisualization delay={delay} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-20 py-20 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", maxWidth: '100vw', overflowX: 'hidden' }}
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

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-6 items-center">
        {t.items.map((item, index) => {
          const itemDelay = baseDelay + index * stepDelay;

          return (
            <div key={item.title} className="flex flex-col gap-2 items-center text-center">
              {/* 可视化图示 */}
              {renderVisualization(item.visualization, itemDelay)}
              
              <h1
                className="text-[48px] font-black leading-none tracking-[-0.01em] reveal-line"
                style={{ animationDelay: `${itemDelay + 0.1}s`, fontSize: 'clamp(32px, 5vw, 48px)' }}
              >
                <span className="gradient-text">
                  {item.title}
                </span>
              </h1>
              <p
                className="text-[14px] font-normal text-slate-500 leading-relaxed reveal-line"
                style={{ animationDelay: `${itemDelay + stepDelay * 0.3}s` }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Description Bar - 旁白区域 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-5xl">
        <div className="relative px-8 py-3 rounded-xl bg-slate-800/75 backdrop-blur-2xl shadow-lg shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"></div>
          <p className="text-lg leading-snug text-white/95 font-medium text-center tracking-wide">
            {t.narration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComponentsSlide;
