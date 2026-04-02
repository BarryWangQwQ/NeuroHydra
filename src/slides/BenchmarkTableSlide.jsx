import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BenchmarkTableSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: '基准结果',
      subtitle: 'IDEAS 数据集对比 · Dice: 重叠系数 · HD95: 第95百分位豪斯多夫距离 · ILAE: 国际抗癫痫联盟 · AUROC: 受试者工作特征曲线下面积 · FLOPs: 浮点运算次数（基于128×128×64输入）',
      caption: 'Table 1. Benchmark comparison on the IDEAS dataset.',
      columns: [
        'Method',
        'Dice ↑',
        'HD95 ↓',
        'Sensitivity ↑',
        'Specificity ↑',
        'Pathology Acc. ↑',
        'ILAE-5 AUROC ↑',
        'FLOPs (T) ↓'
      ],
      rows: [
        {
          method: 'NeuroHydra (ours)',
          dice: '0.71',
          hd95: '5.3',
          sens: '0.80',
          spec: '0.97',
          pathAcc: '0.78',
          auroc: '0.85',
          flops: '0.156',
          highlight: true
        },
        {
          method: 'nnU-Net 3D',
          dice: '0.57',
          hd95: '8.0',
          sens: '0.67',
          spec: '0.95',
          pathAcc: '–',
          auroc: '–',
          flops: '0.287'
        },
        {
          method: 'UNETR',
          dice: '0.59',
          hd95: '7.5',
          sens: '0.70',
          spec: '0.95',
          pathAcc: '–',
          auroc: '–',
          flops: '0.499'
        },
        {
          method: 'UNETR + TabCat',
          dice: '0.64',
          hd95: '6.2',
          sens: '0.74',
          spec: '0.96',
          pathAcc: '0.71',
          auroc: '0.78',
          flops: '0.512'
        },
        {
          method: 'ConvNeXt + LGBM',
          dice: '0.50',
          hd95: '10.1',
          sens: '0.55',
          spec: '0.93',
          pathAcc: '0.72',
          auroc: '0.74',
          flops: '0.204'
        },
        {
          method: 'Mamba-Seg (ablation)',
          dice: '0.66',
          hd95: '6.8',
          sens: '0.77',
          spec: '0.96',
          pathAcc: '–',
          auroc: '–',
          flops: '0.090'
        }
      ],
      note: '提示：高亮行为我们的方法。',
      description: '接下来看看测试结果。简单来说，表格里数字越蓝越好。可以看到我们的方法不仅更准，还能一次完成三个任务，而且跑得更快。'
    },
    en: {
      title: 'Benchmark Results',
      subtitle: 'IDEAS dataset comparison · Dice: Overlap Coefficient · HD95: 95th Percentile Hausdorff Distance · ILAE: International League Against Epilepsy · AUROC: Area Under ROC Curve · FLOPs: Floating Point Operations (based on 128×128×64 input)',
      caption: 'Table 1. Benchmark comparison on the IDEAS dataset.',
      columns: [
        'Method',
        'Dice ↑',
        'HD95 ↓',
        'Sensitivity ↑',
        'Specificity ↑',
        'Pathology Acc. ↑',
        'ILAE-5 AUROC ↑',
        'FLOPs (T) ↓'
      ],
      rows: [
        {
          method: 'NeuroHydra (ours)',
          dice: '0.71',
          hd95: '5.3',
          sens: '0.80',
          spec: '0.97',
          pathAcc: '0.78',
          auroc: '0.85',
          flops: '0.156',
          highlight: true
        },
        {
          method: 'nnU-Net 3D',
          dice: '0.57',
          hd95: '8.0',
          sens: '0.67',
          spec: '0.95',
          pathAcc: '–',
          auroc: '–',
          flops: '0.287'
        },
        {
          method: 'UNETR',
          dice: '0.59',
          hd95: '7.5',
          sens: '0.70',
          spec: '0.95',
          pathAcc: '–',
          auroc: '–',
          flops: '0.499'
        },
        {
          method: 'UNETR + TabCat',
          dice: '0.64',
          hd95: '6.2',
          sens: '0.74',
          spec: '0.96',
          pathAcc: '0.71',
          auroc: '0.78',
          flops: '0.512'
        },
        {
          method: 'ConvNeXt + LGBM',
          dice: '0.50',
          hd95: '10.1',
          sens: '0.55',
          spec: '0.93',
          pathAcc: '0.72',
          auroc: '0.74',
          flops: '0.204'
        },
        {
          method: 'Mamba-Seg (ablation)',
          dice: '0.66',
          hd95: '6.8',
          sens: '0.77',
          spec: '0.96',
          pathAcc: '–',
          auroc: '–',
          flops: '0.090'
        }
      ],
      note: 'Note: highlighted row is our method.',
      description: "Now let's look at the results. Simply put, the bluer the numbers, the better. As you can see, our method is not only more accurate, but also does three tasks at once—and runs faster too."
    }
  };

  const t = content[language] ?? content.en;

  return (
    <div
      className="h-slide bg-white flex items-center justify-center px-slide-x py-slide-y relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient-shift {
          background-size: 200% auto;
          animation: gradient-shift 8s ease infinite;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

      {/* Background gradients (match existing slides) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-[680px] h-[680px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(129, 140, 248, 0.14) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-[560px] h-[560px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-slide-lg pb-10">
        <div className="mb-4">
          <h1 className="text-[48px] font-black leading-[1.1] tracking-[-0.02em]">
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
              {t.title}
            </span>
          </h1>
          <p className="mt-2 text-[14px] text-slate-500 leading-relaxed max-w-readable">
            {t.subtitle}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-[0_10px_40px_rgba(15,23,42,0.06)] overflow-hidden">
          <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between gap-4">
            <div className="text-[13px] font-semibold text-slate-700">{t.caption}</div>
            <div className="text-[12px] text-slate-500">{t.note}</div>
          </div>

          <div className="px-6 py-4">
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    {t.columns.map((col) => (
                      <th
                        key={col}
                        className="text-left text-[12px] font-semibold text-slate-500 uppercase tracking-wide pb-3 border-b border-slate-200"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr
                      key={r.method}
                      className={
                        r.highlight
                          ? 'bg-gradient-to-r from-blue-50/80 via-purple-50/70 to-pink-50/60'
                          : 'hover:bg-slate-50/70 transition-colors'
                      }
                    >
                      <td className="py-3 pr-6 text-[14px] font-semibold text-slate-900 border-b border-slate-100">
                        {r.method}
                      </td>
                      <td className={`py-3 pr-6 text-[14px] border-b border-slate-100 ${r.highlight ? 'font-bold text-blue-600' : 'text-slate-700'}`}>{r.dice}</td>
                      <td className="py-3 pr-6 text-[14px] text-slate-700 border-b border-slate-100">{r.hd95}</td>
                      <td className={`py-3 pr-6 text-[14px] border-b border-slate-100 ${r.highlight ? 'font-bold text-blue-600' : 'text-slate-700'}`}>{r.sens}</td>
                      <td className="py-3 pr-6 text-[14px] text-slate-700 border-b border-slate-100">{r.spec}</td>
                      <td className="py-3 pr-6 text-[14px] text-slate-700 border-b border-slate-100">{r.pathAcc}</td>
                      <td className="py-3 pr-6 text-[14px] text-slate-700 border-b border-slate-100">{r.auroc}</td>
                      <td className={`py-3 text-[14px] border-b border-slate-100 ${r.highlight ? 'font-bold text-green-600' : 'text-slate-700'}`}>{r.flops}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Description Bar - 悬浮旁白区域 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-slide">
        <div className="relative px-8 py-3 rounded-xl bg-slate-800/75 backdrop-blur-2xl shadow-lg shadow-slate-900/20 border border-slate-700/50">
          {/* 装饰光效 */}
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          
          <p className="text-lg leading-snug text-white/95 font-medium text-center tracking-wide animate-fade-in">
            {t.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkTableSlide;

