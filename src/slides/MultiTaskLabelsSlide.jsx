import React from 'react';
import { Brain, Microscope, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import lesionExampleImage from '../images/lesion_example.png';

const MultiTaskLabelsSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: 'Multi-Task Labels',
      narration: '模型同时处理三个任务：病灶分割、病理分类和手术结果预测。一个模型，三个输出。',
      items: [
        {
          icon: Brain,
          title: 'Lesion Segmentation',
          subtitle: '切除掩膜',
          image: lesionExampleImage
        },
        {
          icon: Microscope,
          title: 'Pathology Classification',
          subtitle: '病理分类',
          table: {
            headers: ['Type', 'Description'],
            rows: [
              ['[HS]', 'Hippocampal Sclerosis'],
              ['[FCD]', 'Focal Cortical Dysplasia'],
              ['[DNT]', 'Dysembryoplastic neuroepithelial tumour'],
              ['[CAV]', 'Cavernoma'],
              ['[GL]', 'Glioma'],
              ['[EFG]', 'End-folium gliosis'],
              ['[Dual]', 'Two pathologies']
            ]
          }
        },
        {
          icon: TrendingUp,
          title: 'Surgical Outcome',
          subtitle: '癫痫自由度评分',
          table: {
            headers: ['ILAE', 'Outcome'],
            rows: [
              ['ILAE 1', 'Completely seizure-free'],
              ['ILAE 2', 'Only auras'],
              ['ILAE 3', '1-3 seizure days/year'],
              ['ILAE 4', '4+ seizure days/year'],
              ['ILAE 5', '<50% reduction'],
              ['ILAE 6', 'Worse']
            ]
          }
        }
      ]
    },
    en: {
      title: 'Multi-Task Labels',
      narration: 'The model handles three tasks simultaneously: lesion segmentation, pathology classification, and surgical outcome prediction. One model, three outputs.',
      items: [
        {
          icon: Brain,
          title: 'Lesion Segmentation',
          subtitle: 'Resection Mask',
          image: lesionExampleImage
        },
        {
          icon: Microscope,
          title: 'Pathology Classification',
          subtitle: 'Disease Type',
          table: {
            headers: ['Type', 'Description'],
            rows: [
              ['[HS]', 'Hippocampal Sclerosis'],
              ['[FCD]', 'Focal Cortical Dysplasia'],
              ['[DNT]', 'Dysembryoplastic neuroepithelial tumour'],
              ['[CAV]', 'Cavernoma'],
              ['[GL]', 'Glioma'],
              ['[EFG]', 'End-folium gliosis'],
              ['[Dual]', 'Two pathologies']
            ]
          }
        },
        {
          icon: TrendingUp,
          title: 'Surgical Outcome',
          subtitle: 'Seizure Freedom Score',
          table: {
            headers: ['ILAE', 'Outcome'],
            rows: [
              ['ILAE 1', 'Completely seizure-free'],
              ['ILAE 2', 'Only auras'],
              ['ILAE 3', '1-3 seizure days/year'],
              ['ILAE 4', '4+ seizure days/year'],
              ['ILAE 5', '<50% reduction'],
              ['ILAE 6', 'Worse']
            ]
          }
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div
      className="min-h-slide w-full bg-white flex flex-col items-center justify-center px-slide-x py-slide-y relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", maxWidth: '100vw', overflowX: 'hidden' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.95; }
        }

        @keyframes aurora-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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

        .icon-aurora {
          background: linear-gradient(135deg, #2563eb, #9333ea, #ec4899, #2563eb);
          background-size: 200% 200%;
          animation: aurora-shift 4s ease infinite, breathe 3s ease-in-out infinite, aurora-glow 3s ease-in-out infinite;
        }

        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
      `}</style>

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-[640px] h-[640px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-slide-lg">
        {/* Title */}
        <h1 className="text-[52px] font-black tracking-[-0.02em] text-center mb-12">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </span>
        </h1>

        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {t.items.map((item, index) => {
            const Icon = item.icon;
            const colors = [
              { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-50', border: 'border-blue-100' },
              { bg: 'from-purple-500 to-purple-600', light: 'bg-purple-50', border: 'border-purple-100' },
              { bg: 'from-pink-500 to-pink-600', light: 'bg-pink-50', border: 'border-pink-100' }
            ];
            const color = colors[index];

            return (
              <div 
                key={index} 
                className={`card-hover bg-white rounded-2xl border ${color.border} shadow-lg overflow-hidden flex flex-col`}
              >
                {/* Card Header */}
                <div className={`${color.light} px-5 py-4 border-b ${color.border}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color.bg} flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 leading-tight">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 p-4 flex items-center justify-center">
                  {item.image ? (
                    <img 
                      src={item.image}
                      alt="Lesion Segmentation" 
                      className="w-full h-auto rounded-lg shadow-sm border border-slate-100"
                      style={{ objectFit: 'contain', maxHeight: '280px' }}
                    />
                  ) : item.table ? (
                    <div className="w-full">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50">
                            {item.table.headers.map((header, hIdx) => (
                              <th key={hIdx} className="px-3 py-2 text-left font-semibold text-slate-600 border-b border-slate-200 text-xs">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {item.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                              {row.map((cell, cIdx) => (
                                <td 
                                  key={cIdx} 
                                  className={`px-3 py-1.5 text-xs leading-relaxed ${
                                    cIdx === 0 
                                      ? 'font-semibold text-slate-700' 
                                      : 'text-slate-600'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Description Bar - 旁白区域 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-slide">
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

export default MultiTaskLabelsSlide;
