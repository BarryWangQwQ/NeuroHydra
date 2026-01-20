import React from 'react';
import { Brain, Microscope, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MultiTaskLabelsSlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: 'Multi-Task Labels',
      items: [
        {
          icon: Brain,
          title: 'Lesion Segmentation',
          subtitle: '(resection mask)'
        },
        {
          icon: Microscope,
          title: 'Pathology Classification',
          subtitle: '(FCD/HS etc.)'
        },
        {
          icon: TrendingUp,
          title: 'Surgical Outcome',
          subtitle: '(Seizure Freedom Score)'
        }
      ]
    },
    en: {
      title: 'Multi-Task Labels',
      items: [
        {
          icon: Brain,
          title: 'Lesion Segmentation',
          subtitle: '(resection mask)'
        },
        {
          icon: Microscope,
          title: 'Pathology Classification',
          subtitle: '(FCD/HS etc.)'
        },
        {
          icon: TrendingUp,
          title: 'Surgical Outcome',
          subtitle: '(Seizure Freedom Score)'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div
      className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-20 py-20 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

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

        @keyframes aurora-shift {
          0%, 100% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
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

        .icon-aurora {
          background: linear-gradient(135deg, #2563eb, #9333ea, #ec4899, #2563eb);
          background-size: 200% 200%;
          animation: aurora-shift 4s ease infinite, breathe 3s ease-in-out infinite, aurora-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background gradients matching UseCaseSlide */}
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

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-start">

        {/* Title */}
        <h1 className="text-[64px] font-black tracking-[-0.01em] text-slate-900 mb-14">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            {t.title}
          </span>
        </h1>

        {/* Items with icons - left aligned */}
        <div className="w-full flex flex-col items-start space-y-8">
          {t.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl icon-aurora flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <Icon className="w-8 h-8 text-white relative z-10" strokeWidth={1.6} />
                </div>
                <div className="text-xl font-normal text-slate-700 leading-relaxed pt-1">
                  <span className="font-semibold">{item.title}</span>
                  {item.subtitle && (
                    <span className="font-normal ml-2 text-slate-500">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultiTaskLabelsSlide;
