import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Send, MapPin, Mail, Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const Contact: React.FC = () => {
   const { t } = useLanguage();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSent, setIsSent] = useState(false);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formData = new FormData(e.currentTarget);

      try {
         const response = await fetch("https://formsubmit.co/ajax/nextgenautomationn@gmail.com", {
            method: "POST",
            body: formData
         });

         if (response.ok) {
            setIsSent(true);
            (e.target as HTMLFormElement).reset();
         } else {
            alert("Something went wrong. Please try again.");
         }
      } catch (error) {
         alert("Something went wrong. Please try again.");
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <section id="contact" className="py-24 relative z-10 pb-32">
         <div className="container mx-auto px-6 max-w-5xl">
            <GlassCard className="p-8 md:p-12">
               <div className="grid md:grid-cols-2 gap-12">
                  {/* Info */}
                  <div>
                     <h2 className="text-3xl font-display font-bold mb-6 text-slate-800 dark:text-white">{t('contact.title')}</h2>
                     <p className="text-slate-600 dark:text-white/60 mb-8">
                        {t('contact.description')}
                     </p>

                     <div className="space-y-4">
                        <a
                           href="google.com/maps/place/Thessaloniki,+Greece/@40.6401,22.9444,17z/data=!4m6!3m5!1s0x14a838f41428e0ed:0x9bae715b8d574a9!8m2!3d40.6400629!4d22.9444191!16zL20vMGIybWM?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-4 group hover:opacity-80 transition-opacity"
                        >
                           <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover:border-cyan-500/50 transition-colors">
                              <MapPin size={18} className="text-cyan-600 dark:text-cyan-400" />
                           </div>
                           <span className="text-slate-700 dark:text-white/80">{t('contact.location')}</span>
                        </a>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                              <Mail size={18} className="text-purple-600 dark:text-purple-400" />
                           </div>
                           <span className="text-slate-700 dark:text-white/80">nextgenautomationn@gmail.com</span>
                        </div>
                     </div>
                  </div>

                  {/* Form */}
                  <form className="space-y-4" onSubmit={handleSubmit}>
                     <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-white/50 mb-1 ml-1">{t('contact.nameLabel')}</label>
                        <input
                           type="text"
                           name="name"
                           className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-black/40 transition-all shadow-inner"
                           placeholder={t('contact.namePlaceholder')}
                           required
                           disabled={isSubmitting || isSent}
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-white/50 mb-1 ml-1">{t('contact.emailLabel')}</label>
                        <input
                           type="email"
                           name="email"
                           className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-black/40 transition-all shadow-inner"
                           placeholder={t('contact.emailPlaceholder')}
                           required
                           disabled={isSubmitting || isSent}
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-white/50 mb-1 ml-1">{t('contact.messageLabel')}</label>
                        <textarea
                           name="message"
                           rows={4}
                           className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-black/40 transition-all shadow-inner resize-none"
                           placeholder={t('contact.messagePlaceholder')}
                           required
                           disabled={isSubmitting || isSent}
                        />
                     </div>

                     <div className="pt-2">
                        <button
                           type="submit"
                           disabled={isSubmitting || isSent}
                           className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform hover:-translate-y-1 ${isSent
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-900/20'
                              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-blue-900/20 dark:shadow-blue-900/50'
                              } ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                        >
                           {isSent ? (
                              <>{t('contact.sentButton')} <Check size={18} /></>
                           ) : isSubmitting ? (
                              <>{t('contact.sendingButton')}</>
                           ) : (
                              <>{t('contact.sendButton')} <Send size={18} /></>
                           )}
                        </button>
                     </div>
                  </form>
               </div>
            </GlassCard>
         </div>
      </section>
   );
};