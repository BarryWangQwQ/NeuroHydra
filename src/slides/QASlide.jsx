import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const QASlide = () => {
  const { language } = useLanguage();

  const content = {
    zh: {
      teamLabel: 'NeuroHydra Team',
      collabLabel: 'Collaborators',
      team: [
        {
          name: 'Tim Pagliaro',
          lines: ['Imaging Scientist', 'Formerly: Novartis & Novo Nordisk'],
        },
        {
          name: 'Yuhan Wang',
          lines: [
            'Independent Researcher',
            'Duke MSQM: Health Analytics',
            'Finance Liaison to Medical Affairs (Biotech/Pharma)',
          ],
        },
        {
          name: 'Bo Wang',
          lines: ['Barry@owo.ai'],
        },
      ],
      collaborators: [
        {
          name: 'Christopher P. Eckstein, MD',
          lines: [
            'Associate Professor of Neurology',
            'Division Chief, Neuroimmunology and Multiple Sclerosis',
          ],
        },
        {
          name: 'Liu Meng',
          lines: [],
        },
        {
          name: 'Felix Nwajei',
          lines: [
            'Residency: Duke University School of Medicine (Neurology)',
            'MD: University of Lagos College of Medicine',
            'PhD: University of Lagos College of Medicine',
          ],
        },
      ],
    },
    en: {
      teamLabel: 'NeuroHydra Team',
      collabLabel: 'Collaborators',
      team: [
        {
          name: 'Tim Pagliaro',
          lines: ['Imaging Scientist', 'Formerly: Novartis & Novo Nordisk'],
        },
        {
          name: 'Yuhan Wang',
          lines: [
            'Independent Researcher',
            'Duke MSQM: Health Analytics',
            'Finance Liaison to Medical Affairs (Biotech/Pharma)',
          ],
        },
        {
          name: 'Bo Wang',
          lines: ['Barry@owo.ai'],
        },
      ],
      collaborators: [
        {
          name: 'Christopher P. Eckstein, MD',
          lines: [
            'Associate Professor of Neurology',
            'Division Chief, Neuroimmunology and Multiple Sclerosis',
          ],
        },
        {
          name: 'Liu Meng',
          lines: [],
        },
        {
          name: 'Felix Nwajei',
          lines: [
            'Residency: Duke University School of Medicine (Neurology)',
            'MD: University of Lagos College of Medicine',
            'PhD: University of Lagos College of Medicine',
          ],
        },
      ],
    },
  };

  const t = content[language] ?? content.en;

  const PersonCard = ({ person, delay, dotColor }) => (
    <li
      className="flex items-start gap-3 reveal-line"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-2.5 ${dotColor}`} />
      <div className="flex flex-col">
        <span className="text-[20px] font-semibold text-slate-800 leading-relaxed">
          {person.name}
        </span>
        {person.lines.map((line, i) => (
          <span key={i} className="text-[15px] font-medium text-slate-500 leading-relaxed">
            {line}
          </span>
        ))}
      </div>
    </li>
  );

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-20 py-20 relative overflow-hidden"
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .reveal-line {
          opacity: 0;
          animation: fade-up 0.8s ease forwards;
        }
      `}</style>

      {/* Background gradients */}
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

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-10">

          {/* Left column — NeuroHydra Team */}
          <div
            className="relative px-10 py-8 rounded-3xl bg-gradient-to-br from-indigo-50/80 to-blue-50/60 border border-indigo-100 shadow-sm reveal-line"
            style={{ animationDelay: '0.15s' }}
          >
            <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
            <h3 className="text-[24px] font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
              {t.teamLabel}
            </h3>
            <ul className="space-y-5">
              {t.team.map((person, i) => (
                <PersonCard key={i} person={person} delay={0.25 + i * 0.1} dotColor="bg-indigo-400" />
              ))}
            </ul>
          </div>

          {/* Right column — Collaborators */}
          <div
            className="relative px-10 py-8 rounded-3xl bg-gradient-to-br from-purple-50/80 to-pink-50/60 border border-purple-100 shadow-sm reveal-line"
            style={{ animationDelay: '0.25s' }}
          >
            <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
            <h3 className="text-[24px] font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
              {t.collabLabel}
            </h3>
            <ul className="space-y-5">
              {t.collaborators.map((person, i) => (
                <PersonCard key={i} person={person} delay={0.35 + i * 0.1} dotColor="bg-purple-400" />
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QASlide;
