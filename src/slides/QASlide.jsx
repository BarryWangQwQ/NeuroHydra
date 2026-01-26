import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const QASlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      title: 'Acknowledgements',
      collaborators: [
        {
          name: 'Christopher P. Eckstein, MD',
          title: 'Associate Professor of Neurology',
          subtitle: 'Division Chief, Neuroimmunology and Multiple Sclerosis'
        },
        {
          name: 'Tim Pagliaro',
          title: 'Imaging Scientist',
          subtitle: 'Formerly: Novartis & Novo Nordisk'
        }
      ],
      contacts: [
        { name: 'YuHan Wang', email: 'wandereryuhan@gmail.com' },
        { name: 'Bo Wang', email: 'Barry@owo.ai' }
      ]
    },
    en: {
      title: 'Acknowledgements',
      collaborators: [
        {
          name: 'Christopher P. Eckstein, MD',
          title: 'Associate Professor of Neurology',
          subtitle: 'Division Chief, Neuroimmunology and Multiple Sclerosis'
        },
        {
          name: 'Tim Pagliaro',
          title: 'Imaging Scientist',
          subtitle: 'Formerly: Novartis & Novo Nordisk'
        }
      ],
      contacts: [
        { name: 'YuHan Wang', email: 'wandereryuhan@gmail.com' },
        { name: 'Bo Wang', email: 'Barry@owo.ai' }
      ]
    }
  };

  const t = content[language] ?? content.en;

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-20 py-20 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", maxWidth: '100vw', overflowX: 'hidden' }}
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

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .reveal-line {
          opacity: 0;
          animation: fade-up 0.8s ease forwards;
        }
      `}</style>

      {/* Background gradients (match existing slides) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-24 w-[720px] h-[720px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(129, 140, 248, 0.16) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-28 -right-28 w-[820px] h-[820px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.13) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.10) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center gap-20">
        <h1 className="text-[132px] font-black leading-[0.95] tracking-[-0.02em] text-center break-words" style={{ fontSize: 'clamp(48px, 12vw, 132px)' }}>
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
            {t.title}
          </span>
        </h1>

        {/* Collaborators and Contacts - Two distinct sections */}
        <div className="w-full flex flex-col gap-8 max-w-4xl">
          {/* Collaborators Section */}
          <div className="relative px-8 py-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-sm reveal-line" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            <h3 className="text-[20px] font-bold text-slate-800 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Collaborators
            </h3>
            <ul className="space-y-4">
              {t.collaborators.map((collaborator, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600"></span>
                  <div className="flex flex-col">
                    <span className="text-[18px] font-semibold text-slate-800 leading-relaxed">
                      {collaborator.name}
                    </span>
                    <span className="text-[15px] font-medium text-slate-600">
                      {collaborator.title}
                    </span>
                    <span className="text-[14px] text-slate-500">
                      {collaborator.subtitle}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts Section */}
          <div className="relative px-8 py-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 shadow-sm reveal-line" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            <h3 className="text-[20px] font-bold text-slate-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Contacts
            </h3>
            <ul className="space-y-3">
              {t.contacts.map((contact, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600"></span>
                  <div className="flex flex-col">
                    <span className="text-[18px] font-semibold text-slate-800 leading-relaxed">
                      {contact.name}
                    </span>
                    <span className="text-[15px] font-medium text-slate-600">
                      {contact.email}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QASlide;
