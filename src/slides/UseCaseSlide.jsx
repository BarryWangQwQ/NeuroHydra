import React from 'react';
import { Brain, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// 高维数据可视化组件 - 密集点阵表示大量体素
const HighDimVisualization = ({ delay }) => {
  // 生成12x12的密集点阵
  const gridSize = 12;
  const dots = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      dots.push({ x: i, y: j, delay: (i + j) * 0.01 });
    }
  }
  
  return (
    <div 
      className="relative w-[120px] h-[120px] reveal-line"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="highDimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {/* 背景框 */}
        <rect 
          x="5" y="5" width="90" height="90" 
          rx="8" 
          fill="none" 
          stroke="url(#highDimGradient)" 
          strokeWidth="1.5"
          opacity="0.3"
        />
        {/* 密集的点阵 */}
        {dots.map((dot, idx) => (
          <circle
            key={idx}
            cx={12 + dot.x * 6.5}
            cy={12 + dot.y * 6.5}
            r="2"
            fill="url(#highDimGradient)"
            opacity={0.7 + Math.random() * 0.3}
            className="animate-pulse"
            style={{ 
              animationDelay: `${dot.delay}s`,
              animationDuration: `${1.5 + Math.random()}s`
            }}
          />
        ))}
        {/* 维度标注 */}
        <text x="50" y="98" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="500">
          10⁷ voxels
        </text>
      </svg>
    </div>
  );
};

// 低维数据可视化组件 - 稀疏点表示少量变量
const LowDimVisualization = ({ delay }) => {
  // 生成约20个稀疏的点
  const points = [
    { x: 20, y: 25, label: 'Age' },
    { x: 45, y: 20, label: 'Onset' },
    { x: 70, y: 30, label: 'ASM' },
    { x: 30, y: 50, label: '' },
    { x: 55, y: 45, label: '' },
    { x: 80, y: 55, label: '' },
    { x: 25, y: 75, label: '' },
    { x: 50, y: 70, label: '' },
    { x: 75, y: 80, label: '' },
    { x: 40, y: 35, label: '' },
    { x: 65, y: 60, label: '' },
    { x: 35, y: 65, label: '' },
    { x: 60, y: 25, label: '' },
    { x: 85, y: 40, label: '' },
    { x: 15, y: 45, label: '' },
    { x: 45, y: 85, label: '' },
    { x: 70, y: 15, label: '' },
    { x: 20, y: 60, label: '' },
    { x: 55, y: 55, label: '' },
    { x: 80, y: 70, label: '' },
  ];
  
  return (
    <div 
      className="relative w-[120px] h-[120px] reveal-line"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="lowDimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {/* 背景框 */}
        <rect 
          x="5" y="5" width="90" height="90" 
          rx="8" 
          fill="none" 
          stroke="url(#lowDimGradient)" 
          strokeWidth="1.5"
          opacity="0.3"
        />
        {/* 稀疏的点 */}
        {points.map((point, idx) => (
          <g key={idx}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="url(#lowDimGradient)"
              opacity="0.8"
              className="animate-pulse"
              style={{ 
                animationDelay: `${idx * 0.1}s`,
                animationDuration: '2s'
              }}
            />
            {point.label && (
              <text 
                x={point.x} 
                y={point.y + 3} 
                textAnchor="middle" 
                fontSize="4" 
                fill="white" 
                fontWeight="600"
              >
                {point.label.charAt(0)}
              </text>
            )}
          </g>
        ))}
        {/* 维度标注 */}
        <text x="50" y="98" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="500">
          ~20 vars
        </text>
      </svg>
    </div>
  );
};

const UseCaseSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: 'Use Case',
      items: [
        {
          icon: Brain,
          title: 'Dense Imaging',
          highlight: '(High-Dim)',
          descriptionLine1: '结构性 MRI（磁共振成像）：T1w（T1加权）+ FLAIR（液体衰减反转恢复），约 10^7 体素/体积。',
          descriptionLine2: '需要稳健特征提取（DINOv3: 自监督视觉 Transformer）。',
          visualization: 'high'
        },
        {
          icon: FileText,
          title: 'Sparse Clinical',
          highlight: '(Low-Dim)',
          descriptionLine1: '约 20 个变量：年龄、起病、症状学、ASM（抗癫痫药物）。',
          descriptionLine2: '关键上下文常被影像淹没。',
          visualization: 'low'
        }
      ],
      narration: '我们的应用场景结合了高维的医学影像数据和低维的临床数据。这两种数据需要有效融合。'
    },
    en: {
      title: 'Use Case',
      items: [
        {
          icon: Brain,
          title: 'Dense Imaging',
          highlight: '(High-Dim)',
          descriptionLine1: 'Structural MRI (Magnetic Resonance Imaging): T1w (T1-weighted) + FLAIR (Fluid-Attenuated Inversion Recovery). ~10^7 voxels per volume.',
          descriptionLine2: 'Requires robust feature extraction (DINOv3: self-supervised Vision Transformer).',
          visualization: 'high'
        },
        {
          icon: FileText,
          title: 'Sparse Clinical',
          highlight: '(Low-Dim)',
          descriptionLine1: '~20 variables: Age, Onset, Semiology, ASM (Anti-Seizure Medications).',
          descriptionLine2: 'Critical context often drowned by imaging.',
          visualization: 'low'
        }
      ],
      narration: 'Our use case combines high-dimensional medical imaging data with low-dimensional clinical data. These two data types need effective fusion.'
    }
  };

  const t = content[language];
  const baseDelay = 0.2;
  const stepDelay = 0.3;

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

        @keyframes aurora-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes breathe {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.95;
          }
        }

        @keyframes aurora-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3),
                        0 0 40px rgba(147, 51, 234, 0.2),
                        0 0 60px rgba(236, 72, 153, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(37, 99, 235, 0.5),
                        0 0 60px rgba(147, 51, 234, 0.4),
                        0 0 90px rgba(236, 72, 153, 0.3);
          }
        }

        .reveal-line {
          opacity: 0;
          animation: fade-up 0.8s ease forwards;
        }

        .aurora-text {
          background: linear-gradient(90deg, #2563eb, #9333ea, #ec4899, #2563eb);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: aurora-shift 3s ease infinite;
        }

        .icon-aurora {
          background: linear-gradient(135deg, #2563eb, #9333ea, #ec4899, #2563eb);
          background-size: 200% 200%;
          animation: aurora-shift 4s ease infinite, breathe 3s ease-in-out infinite, aurora-glow 3s ease-in-out infinite;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

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

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-8">
        <h1
          className="text-[48px] font-black tracking-[-0.01em] text-slate-900"
          style={{ animationDelay: `${baseDelay}s`, fontSize: 'clamp(32px, 5vw, 48px)' }}
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent reveal-line inline-block">
            {t.title}
          </span>
        </h1>

        <div className="flex flex-col gap-10">
          {t.items.map((item, index) => {
            const Icon = item.icon;
            const blockDelay = baseDelay + (index + 1) * stepDelay * 2;
            const titleDelay = blockDelay;
            const subDelay = blockDelay + stepDelay;
            const descDelay = blockDelay + stepDelay * 2;

            return (
              <div key={item.title} className="flex items-start gap-8">
                {/* 可视化图形替代原来的图标 */}
                <div className="flex-shrink-0">
                  {item.visualization === 'high' ? (
                    <HighDimVisualization delay={titleDelay} />
                  ) : (
                    <LowDimVisualization delay={titleDelay} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2
                      className="text-[28px] font-black leading-none tracking-[-0.01em] text-slate-900 reveal-line"
                      style={{ animationDelay: `${titleDelay}s`, fontSize: 'clamp(20px, 3vw, 28px)' }}
                    >
                      {item.title}
                    </h2>
                    <span
                      className="text-[28px] font-black tracking-[-0.01em] bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent reveal-line flex-shrink-0"
                      style={{ animationDelay: `${titleDelay}s`, fontSize: 'clamp(20px, 3vw, 28px)' }}
                    >
                      {item.highlight}
                    </span>
                  </div>
                  {item.descriptionLine1 ? (
                    <div className="mt-3 space-y-1">
                      <p
                        className="text-[16px] text-slate-500 leading-relaxed reveal-line"
                        style={{ animationDelay: `${descDelay}s` }}
                      >
                        {item.descriptionLine1}
                      </p>
                      <p
                        className="text-[16px] text-slate-500 leading-relaxed reveal-line"
                        style={{ animationDelay: `${descDelay + stepDelay * 0.5}s` }}
                      >
                        {item.descriptionLine2}
                      </p>
                    </div>
                  ) : (
                    <p
                      className="mt-3 text-[16px] text-slate-500 leading-relaxed reveal-line"
                      style={{ animationDelay: `${descDelay}s` }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Description Bar - 旁白区域 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-5xl">
        <div className="relative px-8 py-3 rounded-xl bg-slate-800/75 backdrop-blur-2xl shadow-lg shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
          <p className="text-lg leading-snug text-white/95 font-medium text-center tracking-wide">
            {t.narration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseCaseSlide;
