import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const ASVSFSlide = () => {
  const { language } = useLanguage();
  const t = translations[language].asvsfSlide;

  return (
    <div
      className="h-screen bg-white flex flex-col justify-center px-6 py-4 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .reveal-title {
          opacity: 0;
          animation: fade-up 0.9s ease forwards;
        }

        .reveal-component {
          opacity: 0;
          animation: fade-up 0.7s ease forwards;
        }

        .gradient-text {
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 4s ease infinite;
        }

        /* ===== MRI ENCODER 动画 ===== */
        @keyframes cube-rotate {
          0%, 100% { transform: rotateX(-15deg) rotateY(-25deg); }
          50% { transform: rotateX(-15deg) rotateY(25deg); }
        }

        .cube-wrapper {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cube-3d {
          width: 80px;
          height: 80px;
          position: relative;
          transform-style: preserve-3d;
          animation: cube-rotate 4s ease-in-out infinite;
        }

        .cube-face {
          position: absolute;
          width: 80px;
          height: 80px;
          border: 3px solid rgba(59, 130, 246, 0.6);
          background: rgba(59, 130, 246, 0.15);
          border-radius: 8px;
        }

        .cube-face.front { transform: translateZ(40px); }
        .cube-face.back { transform: translateZ(-40px); }
        .cube-face.left { transform: rotateY(-90deg) translateZ(40px); }
        .cube-face.right { transform: rotateY(90deg) translateZ(40px); }
        .cube-face.top { transform: rotateX(90deg) translateZ(40px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(40px); }

        @keyframes slice-separate {
          0%, 20% { 
            transform: translateX(0) translateY(0);
            opacity: 0.4;
          }
          40%, 100% { 
            transform: translateX(var(--slice-x, 0)) translateY(var(--slice-y, 0));
            opacity: 1;
          }
        }

        .slice-wrapper {
          width: 120px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slice-container {
          position: relative;
          width: 100px;
          height: 90px;
        }

        .slice {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          animation: slice-separate 3s ease-in-out infinite;
        }

        .slice-axial {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
          top: 0;
          left: 50%;
          margin-left: -22px;
          --slice-x: 0px;
          --slice-y: -10px;
        }

        .slice-coronal {
          background: linear-gradient(135deg, #34d399, #10b981);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
          top: 50%;
          left: 0;
          margin-top: -22px;
          --slice-x: -14px;
          --slice-y: 0px;
          animation-delay: 0.3s;
        }

        .slice-sagittal {
          background: linear-gradient(135deg, #f472b6, #ec4899);
          box-shadow: 0 0 12px rgba(236, 72, 153, 0.5);
          top: 50%;
          right: 0;
          margin-top: -22px;
          --slice-x: 14px;
          --slice-y: 0px;
          animation-delay: 0.6s;
        }

        @keyframes patch-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .patches-wrapper {
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .patches-grid {
          display: grid;
          grid-template-columns: repeat(3, 22px);
          grid-template-rows: repeat(3, 22px);
          gap: 4px;
        }

        .patch-item {
          width: 22px;
          height: 22px;
          border-radius: 4px;
          background: linear-gradient(135deg, #818cf8, #6366f1);
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
          animation: patch-pulse 2s ease-in-out infinite;
        }

        /* ===== FUSION 动画 - 三轴融合 + 拼接 ===== */
        .fusion-main-container {
          display: flex;
          align-items: center;
          gap: 20px;
          justify-content: center;
        }

        .fusion-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .fusion-row {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 36px;
        }

        @keyframes patch-move {
          0%, 25% { transform: translateX(0); }
          45%, 100% { transform: translateX(8px); }
        }

        @keyframes pos-move {
          0%, 25% { transform: translateX(0); }
          45%, 100% { transform: translateX(-8px); }
        }

        @keyframes result-token-appear {
          0%, 35% { opacity: 0; }
          55%, 100% { opacity: 1; }
        }

        /* Axial - 蓝色 */
        .fusion-patch-axial {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          animation: patch-move 3s ease-in-out infinite;
        }

        .fusion-pos-axial {
          width: 18px;
          height: 32px;
          border-radius: 5px;
          background: linear-gradient(135deg, #93c5fd, #60a5fa);
          animation: pos-move 3s ease-in-out infinite;
        }

        .fusion-result-wrapper {
          width: 44px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fusion-result-axial {
          width: 44px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(90deg, #3b82f6 60%, #93c5fd 60%);
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
          opacity: 0;
          animation: result-token-appear 3s ease-in-out infinite;
        }

        /* Coronal - 绿色 */
        .fusion-patch-coronal {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(135deg, #34d399, #10b981);
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
          animation: patch-move 3s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .fusion-pos-coronal {
          width: 18px;
          height: 32px;
          border-radius: 5px;
          background: linear-gradient(135deg, #6ee7b7, #34d399);
          animation: pos-move 3s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .fusion-result-coronal {
          width: 44px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(90deg, #10b981 60%, #6ee7b7 60%);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.6);
          opacity: 0;
          animation: result-token-appear 3s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        /* Sagittal - 粉色 */
        .fusion-patch-sagittal {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(135deg, #f472b6, #ec4899);
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
          animation: patch-move 3s ease-in-out infinite;
          animation-delay: 0.4s;
        }

        .fusion-pos-sagittal {
          width: 18px;
          height: 32px;
          border-radius: 5px;
          background: linear-gradient(135deg, #f9a8d4, #f472b6);
          animation: pos-move 3s ease-in-out infinite;
          animation-delay: 0.4s;
        }

        .fusion-result-sagittal {
          width: 44px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(90deg, #ec4899 60%, #f9a8d4 60%);
          box-shadow: 0 0 12px rgba(236, 72, 153, 0.6);
          opacity: 0;
          animation: result-token-appear 3s ease-in-out infinite;
          animation-delay: 0.4s;
        }

        .fusion-plus {
          font-size: 18px;
          font-weight: bold;
          color: #cbd5e1;
        }

        .fusion-arrow-small {
          font-size: 18px;
          color: #94a3b8;
        }

        .fusion-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fusion-big-arrow {
          font-size: 36px;
          color: #a78bfa;
          font-weight: bold;
        }

        .fusion-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes tokens-merge {
          0%, 50% { opacity: 1; }
          70%, 100% { opacity: 0; }
        }

        @keyframes final-token-appear {
          0%, 60% { opacity: 0; }
          80%, 100% { opacity: 1; }
        }

        .merge-tokens-wrapper {
          width: 50px;
          height: 130px;
          position: relative;
        }

        .merge-token-axial {
          width: 44px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(90deg, #3b82f6 60%, #93c5fd 60%);
          position: absolute;
          top: 0;
          left: 3px;
          animation: tokens-merge 3s ease-in-out infinite;
        }

        .merge-token-coronal {
          width: 44px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(90deg, #10b981 60%, #6ee7b7 60%);
          position: absolute;
          top: 44px;
          left: 3px;
          animation: tokens-merge 3s ease-in-out infinite;
          animation-delay: 0.1s;
        }

        .merge-token-sagittal {
          width: 44px;
          height: 32px;
          border-radius: 6px;
          background: linear-gradient(90deg, #ec4899 60%, #f9a8d4 60%);
          position: absolute;
          top: 88px;
          left: 3px;
          animation: tokens-merge 3s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .final-1d-token {
          position: absolute;
          top: 0;
          left: 3px;
          width: 44px;
          height: 120px;
          border-radius: 8px;
          background: linear-gradient(180deg, 
            #3b82f6 0%, #3b82f6 30%,
            #10b981 35%, #10b981 65%,
            #ec4899 70%, #ec4899 100%
          );
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
          opacity: 0;
          animation: final-token-appear 3s ease-in-out infinite;
        }

        /* ===== MERGING 动画 ===== */
        @keyframes merge-tokens-anim {
          0%, 20% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(var(--merge-x, 0)); opacity: 0.8; }
          80%, 100% { transform: translateX(var(--merge-x, 0)); opacity: 0; }
        }

        @keyframes merged-appear {
          0%, 60% { opacity: 0; }
          80%, 100% { opacity: 1; }
        }

        .merge-anim-wrapper {
          width: 180px;
          height: 100px;
          position: relative;
        }

        .merge-input {
          position: absolute;
          top: 50%;
          margin-top: -16px;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: linear-gradient(135deg, #fb7185, #f43f5e);
          box-shadow: 0 0 10px rgba(244, 63, 94, 0.5);
          animation: merge-tokens-anim 2.8s ease-in-out infinite;
        }

        .merge-input:nth-child(1) { left: 0; --merge-x: 70px; }
        .merge-input:nth-child(2) { left: 36px; --merge-x: 50px; animation-delay: 0.1s; }
        .merge-input:nth-child(3) { left: 72px; --merge-x: 30px; animation-delay: 0.2s; }
        .merge-input:nth-child(4) { left: 108px; --merge-x: 10px; animation-delay: 0.3s; }

        .merge-output {
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -22px;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #e11d48, #be123c);
          box-shadow: 0 0 20px rgba(225, 29, 72, 0.6);
          opacity: 0;
          animation: merged-appear 2.8s ease-in-out infinite;
        }

        /* ===== 流动连接器 ===== */
        .flow-connector {
          position: relative;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .flow-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 6px,
            rgba(148, 163, 184, 0.5) 6px,
            rgba(148, 163, 184, 0.5) 12px
          );
        }

        @keyframes flow-dot {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: calc(100% - 12px); opacity: 0; }
        }

        .flow-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--dot-color, #818cf8);
          box-shadow: 0 0 12px var(--dot-color, #818cf8);
          animation: flow-dot 1.5s ease-in-out infinite;
        }

        .flow-dot.delay-1 { animation-delay: 0.5s; }

        .module-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .module-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 right-1/4 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto flex-1 flex flex-col justify-center">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h1 className="text-[84px] font-black leading-none tracking-[-0.02em] reveal-title">
            <span className="gradient-text">AS-VSF</span>
          </h1>
          <p className="text-2xl font-medium text-slate-400 mt-3 reveal-component" style={{ animationDelay: '0.2s' }}>
            {t.description}
          </p>
        </div>

        {/* Main Flow */}
        <div className="flex justify-center items-stretch gap-5 max-h-[340px]">
          
          {/* Module 1: MRI Encoder */}
          <div 
            className="module-card reveal-component flex-1 max-w-[520px]"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border-2 border-blue-100 shadow-xl h-full flex flex-col">
              <h3 className="text-2xl font-bold text-slate-800 text-center mb-4">{t.mriEncoder}</h3>
              
              <div className="flex items-center justify-center gap-3 flex-1">
                {/* 3D Cube */}
                <div className="flex flex-col items-center">
                  <div className="cube-wrapper" style={{ perspective: '400px' }}>
                    <div className="cube-3d">
                      <div className="cube-face front"></div>
                      <div className="cube-face back"></div>
                      <div className="cube-face left"></div>
                      <div className="cube-face right"></div>
                      <div className="cube-face top"></div>
                      <div className="cube-face bottom"></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-500 mt-2">3D MRI</span>
                </div>

                <div className="text-slate-300 text-3xl font-light">→</div>

                {/* 切片 */}
                <div className="flex flex-col items-center">
                  <div className="slice-wrapper">
                    <div className="slice-container">
                      <div className="slice slice-axial"></div>
                      <div className="slice slice-coronal"></div>
                      <div className="slice slice-sagittal"></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-500">Tri-Axis</span>
                </div>

                <div className="text-slate-300 text-3xl font-light">→</div>

                {/* Patches Grid */}
                <div className="flex flex-col items-center">
                  <div className="patches-wrapper">
                    <div className="patches-grid">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="patch-item" style={{ animationDelay: `${i * 0.1}s` }}></div>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-500 mt-2">Patches</span>
                </div>
              </div>

              <div className="bg-blue-500 text-white rounded-xl px-5 py-3 mt-4 text-center shadow-lg">
                <p className="text-base font-bold">DINOv3 Encoder</p>
              </div>
            </div>
          </div>

          {/* Flow Connector 1 */}
          <div 
            className="flow-connector reveal-component self-center"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="flow-line" />
            <div className="flow-dot" style={{ '--dot-color': '#6366f1' }}></div>
            <div className="flow-dot delay-1" style={{ '--dot-color': '#6366f1' }}></div>
          </div>

          {/* Module 2: Fusion */}
          <div 
            className="module-card reveal-component flex-1 max-w-[480px]"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-3xl p-6 border-2 border-purple-100 shadow-xl h-full flex flex-col">
              <h3 className="text-2xl font-bold text-slate-800 text-center mb-4">{t.fusion}</h3>
              
              <div className="fusion-main-container flex-1">
                {/* 左侧：三轴各自 Patch + Position */}
                <div className="fusion-left">
                  <div className="fusion-row">
                    <span className="text-sm font-bold text-blue-600 w-8">Ax</span>
                    <div className="fusion-patch-axial"></div>
                    <span className="fusion-plus">+</span>
                    <div className="fusion-pos-axial"></div>
                    <span className="fusion-arrow-small">→</span>
                    <div className="fusion-result-wrapper">
                      <div className="fusion-result-axial"></div>
                    </div>
                  </div>
                  
                  <div className="fusion-row">
                    <span className="text-sm font-bold text-emerald-600 w-8">Co</span>
                    <div className="fusion-patch-coronal"></div>
                    <span className="fusion-plus">+</span>
                    <div className="fusion-pos-coronal"></div>
                    <span className="fusion-arrow-small">→</span>
                    <div className="fusion-result-wrapper">
                      <div className="fusion-result-coronal"></div>
                    </div>
                  </div>
                  
                  <div className="fusion-row">
                    <span className="text-sm font-bold text-pink-600 w-8">Sa</span>
                    <div className="fusion-patch-sagittal"></div>
                    <span className="fusion-plus">+</span>
                    <div className="fusion-pos-sagittal"></div>
                    <span className="fusion-arrow-small">→</span>
                    <div className="fusion-result-wrapper">
                      <div className="fusion-result-sagittal"></div>
                    </div>
                  </div>
                </div>

                <div className="fusion-center">
                  <span className="fusion-big-arrow">⟹</span>
                </div>

                <div className="fusion-right">
                  <div className="merge-tokens-wrapper">
                    <div className="merge-token-axial"></div>
                    <div className="merge-token-coronal"></div>
                    <div className="merge-token-sagittal"></div>
                    <div className="final-1d-token"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 text-sm font-bold text-center mt-4">
                <div className="flex gap-1">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg">Ax</span>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg">Co</span>
                  <span className="bg-pink-100 text-pink-700 px-3 py-1.5 rounded-lg">Sa</span>
                </div>
                <span className="text-slate-400 text-2xl">→</span>
                <span className="bg-purple-200 text-purple-800 px-4 py-1.5 rounded-lg font-black">1D Token</span>
              </div>

              <div className="bg-purple-500 text-white rounded-xl px-5 py-3 mt-3 text-center shadow-lg">
                <p className="text-base font-bold">Patch + Position → Concat</p>
              </div>
            </div>
          </div>

          {/* Flow Connector 2 */}
          <div 
            className="flow-connector reveal-component self-center"
            style={{ animationDelay: '0.7s' }}
          >
            <div className="flow-line" />
            <div className="flow-dot" style={{ '--dot-color': '#a855f7' }}></div>
            <div className="flow-dot delay-1" style={{ '--dot-color': '#a855f7' }}></div>
          </div>

          {/* Module 3: Merging */}
          <div 
            className="module-card reveal-component flex-1 max-w-[340px]"
            style={{ animationDelay: '0.8s' }}
          >
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 border-2 border-pink-100 shadow-xl h-full flex flex-col">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-slate-800">{t.merging}</h3>
                <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                  ⚡ Learnable
                </span>
              </div>
              
              <div className="flex justify-center items-center flex-1">
                <div className="merge-anim-wrapper">
                  <div className="merge-input"></div>
                  <div className="merge-input"></div>
                  <div className="merge-input"></div>
                  <div className="merge-input"></div>
                  <div className="merge-output"></div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 text-lg font-bold text-center mt-4">
                <div className="bg-rose-100 rounded-xl px-4 py-2 text-rose-700">N Tokens</div>
                <div className="text-slate-400 text-2xl">→</div>
                <div className="bg-rose-200 rounded-xl px-4 py-2 text-rose-800">N/k</div>
              </div>

              <div className="bg-rose-500 text-white rounded-xl px-5 py-3 mt-3 text-center shadow-lg">
                <p className="text-base font-bold">Co-Axial Merge</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Description Bar - 悬浮旁白区域 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-6xl">
        <div className="relative px-12 py-4 rounded-xl bg-slate-800/90 backdrop-blur-xl shadow-xl shadow-slate-900/20 border border-slate-700/50">
          {/* 装饰光效 */}
          <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent"></div>
          
          <p className="text-xl leading-snug text-white font-medium text-center tracking-wide">
            {t.insightDetail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ASVSFSlide;
