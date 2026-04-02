// React 核心和 Hooks / React core and Hooks
import React, { useEffect, useRef, useState, useCallback } from 'react'

// 页面配置 / Pages configuration
import { pages, totalPages as configTotalPages } from './pagesConfig'

// 上下文和工具 / Context and utilities
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { Layers, CircuitBoard, Languages, Play, MousePointerClick, ChevronLeft, ChevronRight } from 'lucide-react'
import { translations } from './translations'

// 默认语言 / Default language: 'zh' or 'en'
const DEFAULT_LANGUAGE = 'en'

// 顶部控制栏组件（鼠标移至顶部显示）
// Top control bar (shows when mouse moves to top)
const TopControls = ({
  onToggleLanguage,
  language,
  onToggleAuto,
  autoPlay,
}) => {
  const t = translations[language].controls;
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      if (e.clientY <= 8) {
        if (hideTimer.current) {
          clearTimeout(hideTimer.current)
          hideTimer.current = null
        }
        setVisible(true)
      } else if (visible) {
        if (hideTimer.current) clearTimeout(hideTimer.current)
        hideTimer.current = setTimeout(() => setVisible(false), 900)
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [visible])

  const baseBtn =
    'h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-150 hover:bg-white active:scale-[0.98] text-slate-700'

  return (
    <div
      className={`fixed top-2 left-0 right-0 flex justify-center gap-3 transition-opacity duration-200 z-50 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        className={baseBtn}
        onClick={onToggleLanguage}
        title={language === 'zh' ? t.switchToEnglish : t.switchToChinese}
        aria-label={language === 'zh' ? t.switchToEnglish : t.switchToChinese}
        data-top-control
      >
        <Languages size={18} />
      </button>
      <button
        className={baseBtn}
        onClick={onToggleAuto}
        title={autoPlay ? t.switchToManual : t.switchToAuto}
        aria-label={autoPlay ? t.switchToManual : t.switchToAuto}
        data-top-control
      >
        {autoPlay ? <MousePointerClick size={18} /> : <Play size={18} />}
      </button>
    </div>
  )
}

// 页面导航按钮（右下角药丸形按钮）
// Page navigation buttons (pill-shaped buttons at bottom-right)
const PageNavigation = ({ currentPage, totalPages, onPrevPage, onNextPage, language }) => {
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef(null)

  useEffect(() => {
    const handleMove = (e) => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      const showThreshold = 150
      
      // 检测鼠标是否在右下角区域
      if (e.clientX >= screenWidth - showThreshold && e.clientY >= screenHeight - showThreshold) {
        if (hideTimer.current) {
          clearTimeout(hideTimer.current)
          hideTimer.current = null
        }
        setVisible(true)
      } else if (visible) {
        if (hideTimer.current) clearTimeout(hideTimer.current)
        hideTimer.current = setTimeout(() => setVisible(false), 300)
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [visible])

  return (
    <>
      <style>{`
        .nav-pill {
          display: flex;
          gap: 1px;
          padding: 4px;
          border-radius: 50px;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        }
        
        .nav-pill-btn {
          height: 36px;
          width: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .nav-pill-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .nav-pill-btn:active:not(:disabled) {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(0.95);
        }
        
        .nav-pill-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
      
      <div className={`fixed right-6 bottom-6 transition-all duration-200 z-50 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="nav-pill">
          {/* 上一页按钮 */}
          <button
            className="nav-pill-btn"
            onClick={onPrevPage}
            disabled={currentPage === 0}
            title={language === 'zh' ? '上一页' : 'Previous'}
            aria-label={language === 'zh' ? '上一页' : 'Previous'}
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          {/* 下一页按钮 */}
          <button
            className="nav-pill-btn"
            onClick={onNextPage}
            disabled={currentPage === totalPages - 1}
            title={language === 'zh' ? '下一页' : 'Next'}
            aria-label={language === 'zh' ? '下一页' : 'Next'}
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  )
}

// 应用主内容组件 / Main app content component
function AppContent() {
  // 状态管理 / State management
  const [currentPage, setCurrentPage] = useState(0)                // 当前页面索引 / Current page index
  const [isTransitioning, setIsTransitioning] = useState(false)    // 过渡状态 / Transition state
  const [autoPlay, setAutoPlay] = useState(false)                  // 自动播放模式 / Auto-play mode
  const [manualTick, setManualTick] = useState(0)                  // 手动点击计数 / Manual click counter
  const { language, toggleLanguage } = useLanguage()               // 语言设置 / Language settings

  // 页面配置从 pagesConfig.js 导入 / Pages configuration imported from pagesConfig.js
  const totalPages = configTotalPages

  // 使用 ref 防止过渡期间重复触发
  // Use ref to prevent duplicate triggers during transition
  const transitioningRef = useRef(false)
  const currentPageRef = useRef(currentPage)
  
  useEffect(() => {
    currentPageRef.current = currentPage
  }, [currentPage])

  // Match slide height to the real visual viewport (Chrome vs Safari, DPI, moving window across monitors)
  useEffect(() => {
    const root = document.documentElement

    const syncViewport = () => {
      const vv = window.visualViewport
      const h = vv?.height ?? window.innerHeight
      const w = vv?.width ?? window.innerWidth
      root.style.setProperty('--app-vh', `${h}px`)
      root.style.setProperty('--app-vw', `${w}px`)
    }

    syncViewport()
    window.addEventListener('resize', syncViewport)
    const vv = window.visualViewport
    vv?.addEventListener('resize', syncViewport)
    vv?.addEventListener('scroll', syncViewport)
    return () => {
      window.removeEventListener('resize', syncViewport)
      vv?.removeEventListener('resize', syncViewport)
      vv?.removeEventListener('scroll', syncViewport)
    }
  }, [])

  // 上一页处理（淡出 → 切换 → 淡入）
  // Previous page handler (fade out → switch → fade in)
  const handlePrevPage = useCallback(() => {
    if (transitioningRef.current || currentPageRef.current === 0) return
    
    transitioningRef.current = true
    setIsTransitioning(true)     // 1. 淡出开始 (500ms) / Fade out starts
    
    setTimeout(() => {            // 2. 淡出完成后 / After fade out
      setCurrentPage(prev => prev - 1)
      setManualTick(0)
      setTimeout(() => {          // 3. 淡入开始 / Fade in starts
        setIsTransitioning(false)
        transitioningRef.current = false
      }, 100)
    }, 500)
  }, [])

  // 下一页处理（淡出 → 切换 → 淡入）
  // Next page handler (fade out → switch → fade in)
  const handleNextPage = useCallback(() => {
    if (transitioningRef.current || currentPageRef.current >= totalPages - 1) return
    
    transitioningRef.current = true
    setIsTransitioning(true)     // 1. 淡出开始 (500ms) / Fade out starts
    
    setTimeout(() => {            // 2. 淡出完成后 / After fade out
      setCurrentPage(prev => prev + 1)
      setManualTick(0)
      setTimeout(() => {          // 3. 淡入开始 / Fade in starts
        setIsTransitioning(false)
        transitioningRef.current = false
      }, 100)
    }, 500)
  }, [totalPages])

  // 切换自动/手动模式 / Toggle auto/manual mode
  const toggleAuto = () => {
    setAutoPlay((prev) => !prev)
  }

  // 手动点击推进（仅在手动模式有效）
  // Manual click to advance (only in manual mode)
  const handleManualClick = (e) => {
    if (autoPlay) return
    if (e.target.closest('[data-top-control]')) return
    setManualTick((t) => t + 1)
  }

  // 键盘导航支持（方向键控制页面切换）
  // Keyboard navigation (arrow keys to switch pages)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()               // 阻止默认滚动 / Prevent default scroll
        e.stopPropagation()
        e.stopImmediatePropagation()
        
        // ← ↑ 上一页 / Previous page
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          handlePrevPage()
        } 
        // → ↓ 下一页 / Next page
        else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          handleNextPage()
        }
        
        return false
      }
    }

    // 捕获阶段监听，优先级最高 / Capture phase for highest priority
    document.addEventListener('keydown', handleKeyDown, { capture: true, passive: false })
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true, passive: false })
  }, [handlePrevPage, handleNextPage])
  
  // 额外禁用方向键滚动（双重保险）
  // Extra prevention of arrow key scrolling (double insurance)
  useEffect(() => {
    const preventArrowScroll = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
        return false
      }
    }
    
    window.addEventListener('keydown', preventArrowScroll, { passive: false })
    return () => window.removeEventListener('keydown', preventArrowScroll, { passive: false })
  }, [])

  return (
    <div onClick={handleManualClick} className="relative overflow-hidden">
      {/* CSS 样式：过渡动画和页面滚动控制 / CSS: Transition animations and scroll control */}
      <style>{`
        /* 禁用页面级滚动 / Disable page-level scrolling */
        body, html {
          overflow: hidden !important;
          height: var(--app-vh, 100dvh);
          width: 100%;
          max-width: 100%;
        }
        
        /* 页面过渡动画 / Page transition animation */
        .page-wrapper {
          transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        .page-fade-in {
          opacity: 1;
        }

        .page-fade-out {
          opacity: 0;
        }
      `}</style>

      {/* 顶部控制栏：语言切换、自动/手动模式 */}
      {/* Top controls: language toggle, auto/manual mode */}
      <TopControls
        onToggleLanguage={toggleLanguage}
        language={language}
        onToggleAuto={toggleAuto}
        autoPlay={autoPlay}
      />

      {/* 右下角导航按钮：上一页/下一页 */}
      {/* Bottom-right navigation: previous/next page */}
      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        language={language}
      />

      {/* 页面内容渲染 / Page content rendering */}
      <div className="relative overflow-hidden">
        {(() => {
          const page = pages[currentPage]
          const PageComponent = page.component

          return (
            <div className={`page-wrapper ${isTransitioning ? 'page-fade-out' : 'page-fade-in'}`}>
              {/* 动态 key 确保页面切换时组件重新挂载 / Dynamic key ensures component remount on page switch */}
              <PageComponent 
                key={`${page.key}-${currentPage}`}
                autoPlay={autoPlay} 
                manualTick={manualTick} 
              />
            </div>
          )
        })()}
      </div>
    </div>
  )
}

// 应用根组件（包含语言上下文）
// App root component (with language context)
export default function App() {
  return (
    <LanguageProvider initialLanguage={DEFAULT_LANGUAGE}>
      <AppContent />
    </LanguageProvider>
  )
}
