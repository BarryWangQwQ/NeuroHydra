import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// 2D到3D桥接可视化
const Bridge2D3DVisualization = ({ delay }) => {
  return (
    <div 
      className="relative w-[100px] h-[80px] reveal-line flex-shrink-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <defs>
          <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        
        {/* 2D Slices stacking to form 3D */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.15}s`, animationDuration: '2s' }}>
            <rect 
              x={10 + i * 4} 
              y={45 - i * 8} 
              width="28" 
              height="28" 
              rx="3"
              fill={i === 4 ? 'url(#bridgeGrad)' : '#e2e8f0'}
              stroke="url(#bridgeGrad)"
              strokeWidth="1"
              opacity={0.4 + i * 0.15}
            />
          </g>
        ))}
        
        {/* 2D label */}
        <text x="22" y="78" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="600">2D</text>
        
        {/* Arrow */}
        <g>
          <line x1="45" y1="40" x2="58" y2="40" stroke="url(#bridgeGrad)" strokeWidth="2"/>
          <polygon points="58,37 64,40 58,43" fill="url(#bridgeGrad)"/>
        </g>
        
        {/* 3D Cube representation */}
        <g transform="translate(68, 20)">
          {/* Front face */}
          <rect x="0" y="15" width="25" height="25" rx="3" fill="url(#bridgeGrad)" opacity="0.9"/>
          {/* Top face */}
          <polygon points="0,15 10,5 35,5 25,15" fill="url(#bridgeGrad)" opacity="0.6"/>
          {/* Right face */}
          <polygon points="25,15 35,5 35,30 25,40" fill="url(#bridgeGrad)" opacity="0.75"/>
          
          {/* Grid on front */}
          {[0, 1, 2].map((i) => [0, 1, 2].map((j) => (
            <rect key={`g-${i}-${j}`} x={3 + i * 7} y={18 + j * 7} width="5" height="5" rx="1" fill="white" opacity="0.3"/>
          )))}
        </g>
        
        {/* 3D label */}
        <text x="80" y="78" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="600">3D</text>
      </svg>
    </div>
  );
};

// 计算效率可视化
const EfficiencyVisualization = ({ delay }) => {
  return (
    <div 
      className="relative w-[100px] h-[80px] reveal-line flex-shrink-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <defs>
          <linearGradient id="effGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        
        {/* Exponential curve (3D attention - crossed out) */}
        <g opacity="0.4">
          <path 
            d="M 10 65 Q 25 60, 35 45 Q 45 25, 50 10" 
            fill="none" 
            stroke="#ef4444" 
            strokeWidth="2"
            strokeDasharray="3,2"
          />
          <text x="52" y="12" fontSize="6" fill="#ef4444">O(n³)</text>
          {/* Cross out */}
          <line x1="8" y1="70" x2="55" y2="8" stroke="#ef4444" strokeWidth="1.5"/>
        </g>
        
        {/* Linear curve (our approach) */}
        <path 
          d="M 10 65 L 90 35" 
          fill="none" 
          stroke="url(#greenGrad)" 
          strokeWidth="2.5"
        >
          <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="1.5s" fill="freeze"/>
        </path>
        <text x="88" y="30" fontSize="6" fill="#10b981" fontWeight="600">O(n)</text>
        
        {/* Checkmark */}
        <g transform="translate(75, 45)">
          <circle cx="8" cy="8" r="10" fill="url(#greenGrad)" opacity="0.2"/>
          <path d="M 3 8 L 7 12 L 14 4" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        
        {/* Axes */}
        <line x1="8" y1="68" x2="95" y2="68" stroke="#cbd5e1" strokeWidth="1"/>
        <line x1="8" y1="68" x2="8" y2="5" stroke="#cbd5e1" strokeWidth="1"/>
        <text x="50" y="78" textAnchor="middle" fontSize="6" fill="#94a3b8">Complexity</text>
      </svg>
    </div>
  );
};

// 可解释性融合可视化
const InterpretableVisualization = ({ delay }) => {
  return (
    <div 
      className="relative w-[100px] h-[80px] reveal-line flex-shrink-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 100 80" className="w-full h-full">
        <defs>
          <linearGradient id="interpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        
        {/* Brain scan with attention heatmap */}
        <g transform="translate(5, 8)">
          {/* Base scan */}
          <rect x="0" y="0" width="40" height="50" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"/>
          
          {/* Attention heatmap cells */}
          {[
            { x: 4, y: 4, o: 0.2 },
            { x: 14, y: 4, o: 0.3 },
            { x: 24, y: 4, o: 0.4 },
            { x: 4, y: 14, o: 0.5 },
            { x: 14, y: 14, o: 0.9 }, // High attention
            { x: 24, y: 14, o: 0.7 },
            { x: 4, y: 24, o: 0.3 },
            { x: 14, y: 24, o: 0.8 }, // High attention
            { x: 24, y: 24, o: 0.5 },
            { x: 4, y: 34, o: 0.2 },
            { x: 14, y: 34, o: 0.4 },
            { x: 24, y: 34, o: 0.3 },
          ].map((cell, i) => (
            <rect 
              key={i}
              x={cell.x} 
              y={cell.y} 
              width="10" 
              height="10" 
              rx="2"
              fill="url(#interpGrad)"
              opacity={cell.o}
              className={cell.o > 0.7 ? "animate-pulse" : ""}
              style={{ animationDuration: '1.5s' }}
            />
          ))}
          
          {/* Slice indicator */}
          <text x="20" y="62" textAnchor="middle" fontSize="6" fill="#64748b">Slices</text>
        </g>
        
        {/* Arrow */}
        <g transform="translate(48, 30)">
          <line x1="0" y1="5" x2="10" y2="5" stroke="url(#interpGrad)" strokeWidth="1.5"/>
          <polygon points="10,2 15,5 10,8" fill="url(#interpGrad)"/>
        </g>
        
        {/* Clinical factors with attention weights */}
        <g transform="translate(65, 8)">
          {[
            { label: 'Age', w: 0.3 },
            { label: 'Onset', w: 0.8 },
            { label: 'ASM', w: 0.5 },
            { label: 'Sem', w: 0.9 },
          ].map((factor, i) => (
            <g key={i} transform={`translate(0, ${i * 13})`}>
              <rect 
                x="0" 
                y="0" 
                width={factor.w * 28} 
                height="10" 
                rx="2"
                fill="url(#interpGrad)"
                opacity={0.3 + factor.w * 0.6}
                className={factor.w > 0.7 ? "animate-pulse" : ""}
                style={{ animationDuration: '1.5s' }}
              />
              <text x="30" y="8" fontSize="6" fill="#64748b">{factor.label}</text>
            </g>
          ))}
          <text x="17" y="62" textAnchor="middle" fontSize="6" fill="#64748b">Factors</text>
        </g>
        
        {/* Eye icon for interpretability */}
        <g transform="translate(45, 58)">
          <ellipse cx="5" cy="5" rx="8" ry="5" fill="none" stroke="url(#interpGrad)" strokeWidth="1.2"/>
          <circle cx="5" cy="5" r="2.5" fill="url(#interpGrad)"/>
        </g>
      </svg>
    </div>
  );
};

const SignificanceSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: 'Significance',
      items: [
        {
          title: 'Bridges 2D and 3D domains',
          description: 'Learns volumetric context from slice-level data without full 3D supervision.',
          visualization: 'bridge'
        },
        {
          title: 'Achieves computational efficiency',
          description: 'Avoids exponential 3D attention cost while preserving spatial coherence.',
          visualization: 'efficiency'
        },
        {
          title: 'Enables interpretable fusion',
          description: 'Visualizes which slices and clinical factors drive predictions.',
          visualization: 'interpretable'
        }
      ],
      narration: '这项工作有三个重要意义：连接2D和3D处理、计算效率高、以及可解释的融合方式。'
    },
    en: {
      title: 'Significance',
      items: [
        {
          title: 'Bridges 2D and 3D domains',
          description: 'Learns volumetric context from slice-level data without full 3D supervision.',
          visualization: 'bridge'
        },
        {
          title: 'Achieves computational efficiency',
          description: 'Avoids exponential 3D attention cost while preserving spatial coherence.',
          visualization: 'efficiency'
        },
        {
          title: 'Enables interpretable fusion',
          description: 'Visualizes which slices and clinical factors drive predictions.',
          visualization: 'interpretable'
        }
      ],
      narration: 'This work has three key contributions: bridging 2D and 3D processing, computational efficiency, and interpretable fusion.'
    }
  };

  const t = content[language];
  const baseDelay = 0.2;
  const stepDelay = 0.3;

  const renderVisualization = (type, delay) => {
    switch (type) {
      case 'bridge':
        return <Bridge2D3DVisualization delay={delay} />;
      case 'efficiency':
        return <EfficiencyVisualization delay={delay} />;
      case 'interpretable':
        return <InterpretableVisualization delay={delay} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-slide bg-white flex items-center justify-center px-slide-x py-slide-y relative overflow-hidden"
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

      <div className="relative z-10 w-full max-w-slide flex flex-col gap-section">
        <h1
          className="text-[48px] font-black tracking-[-0.01em] text-slate-900"
          style={{ animationDelay: `${baseDelay}s`, fontSize: 'clamp(32px, 5vw, 48px)' }}
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent reveal-line inline-block">
            {t.title}
          </span>
        </h1>

        <div className="flex flex-col gap-section">
          {t.items.map((item, index) => {
            const itemDelay = baseDelay + (index + 1) * stepDelay;

            return (
              <div key={index} className="flex items-center gap-6">
                {/* 可视化图示 */}
                {renderVisualization(item.visualization, itemDelay)}
                
                <div className="flex-1 reveal-line" style={{ animationDelay: `${itemDelay + 0.1}s` }}>
                  <p className="text-[18px] font-semibold text-slate-700 leading-relaxed">
                    <strong>{item.title}</strong>
                  </p>
                  <p className="text-[16px] font-normal text-slate-500 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Description Bar - 旁白区域 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-slide">
        <div className="relative px-8 py-3 rounded-xl bg-slate-800/75 backdrop-blur-2xl shadow-lg shadow-slate-900/20 border border-slate-700/50">
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          <p className="text-lg leading-snug text-white/95 font-medium text-center tracking-wide">
            {t.narration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignificanceSlide;
