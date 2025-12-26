import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Send, MapPin, Mail, Check } from 'lucide-react';

export const Contact: React.FC = () => {
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
                     <h2 className="text-3xl font-display font-bold mb-6 text-slate-800 dark:text-white">Let's Automate Your Success</h2>
                     <p className="text-slate-600 dark:text-white/60 mb-8">
                        Ready to upgrade your web presence or automate your workflow?
                        Drop me a message. I'm available for local meetings in Thessaloniki or remote calls.
                     </p>

                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                              <MapPin size={18} className="text-cyan-600 dark:text-cyan-400" />
                           </div>
                           <span className="text-slate-700 dark:text-white/80">Thessaloniki, Greece</span>
                        </div>
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
                        <label className="block text-xs font-medium text-slate-500 dark:text-white/50 mb-1 ml-1">Name</label>
                        <input
                           type="text"
                           name="name"
                           className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-black/40 transition-all shadow-inner"
                           placeholder="John Doe"
                           required
                           disabled={isSubmitting || isSent}
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-white/50 mb-1 ml-1">Email</label>
                        <input
                           type="email"
                           name="email"
                           className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-black/40 transition-all shadow-inner"
                           placeholder="john@business.com"
                           required
                           disabled={isSubmitting || isSent}
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-white/50 mb-1 ml-1">Message</label>
                        <textarea
                           name="message"
                           rows={4}
                           className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white dark:focus:bg-black/40 transition-all shadow-inner resize-none"
                           placeholder="I need a website that..."
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
                              <>Message Sent <Check size={18} /></>
                           ) : isSubmitting ? (
                              <>Sending...</>
                           ) : (
                              <>Send Message <Send size={18} /></>
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