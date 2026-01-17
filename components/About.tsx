import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { Briefcase, GraduationCap, Heart } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const About: React.FC = () => {
   const { t } = useLanguage();

   return (
      <section id="about" className="py-24 relative z-10">
         <div className="container mx-auto px-6">
            <div className="flex justify-center">
               {/* Text Content */}
               <div className="max-w-3xl space-y-6 text-center">
                  <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">{t('about.title')}</h2>

                  <GlassCard className="p-6 md:p-8 !bg-white/60 dark:!bg-white/5">
                     <p className="text-lg text-slate-700 dark:text-white/80 leading-relaxed mb-6">
                        {t('about.paragraph1')}
                     </p>
                     <p className="text-slate-600 dark:text-white/60 mb-6">
                        {t('about.paragraph2').split(/(ServiceNow|n8n)/g).map((part, index) => {
                           if (part === 'ServiceNow' || part === 'n8n') {
                              return <strong key={index} className="text-cyan-600 dark:text-cyan-300">{part}</strong>;
                           }
                           return <React.Fragment key={index}>{part}</React.Fragment>;
                        })}
                     </p>

                     <div className="grid sm:grid-cols-2 gap-4 mt-8">
                        <div className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-white/70">
                           <GraduationCap className="text-purple-600 dark:text-purple-400" size={20} />
                           <span>{t('about.credential1')}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-white/70">
                           <Heart className="text-red-500 dark:text-red-400" size={20} />
                           <span>{t('about.credential2')}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-white/70 sm:col-span-2">
                           <Briefcase className="text-blue-600 dark:text-blue-400" size={20} />
                           <span>{t('about.credential3')}</span>
                        </div>
                     </div>
                  </GlassCard>
               </div>
            </div>
         </div>
      </section>
   );
};