import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { Briefcase, GraduationCap, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative z-10">
       <div className="container mx-auto px-6">
         <div className="flex justify-center">
            {/* Text Content */}
            <div className="max-w-3xl space-y-6 text-center">
               <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Behind the Screen</h2>
               
               <GlassCard className="p-6 md:p-8 !bg-white/60 dark:!bg-white/5">
                  <p className="text-lg text-slate-700 dark:text-white/80 leading-relaxed mb-6">
                     Hi, I'm a developer based in Thessaloniki with a Business Computing background. 
                     I don't just build "pretty" websites; I build systems that work for you.
                  </p>
                  <p className="text-slate-600 dark:text-white/60 mb-6">
                     My journey started with a fascination for how businesses operate. 
                     Now, I'm channeling that into mastering <strong className="text-cyan-600 dark:text-cyan-300">ServiceNow</strong> and <strong className="text-cyan-600 dark:text-cyan-300">n8n</strong> to automate the boring stuff so you can focus on growth.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mt-8">
                     <div className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-white/70">
                        <GraduationCap className="text-purple-600 dark:text-purple-400" size={20} />
                        <span>BSc Business Computing</span>
                     </div>
                     <div className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-white/70">
                        <Heart className="text-red-500 dark:text-red-400" size={20} />
                        <span>Tennis & Football Fan 🎾⚽</span>
                     </div>
                     <div className="flex items-center justify-center gap-3 text-sm text-slate-600 dark:text-white/70 sm:col-span-2">
                        <Briefcase className="text-blue-600 dark:text-blue-400" size={20} />
                        <span>Future ServiceNow Architect</span>
                     </div>
                  </div>
               </GlassCard>
            </div>
         </div>
       </div>
    </section>
  );
};