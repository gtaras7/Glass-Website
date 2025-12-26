import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

export const Hero: React.FC = () => {
  const scrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-600 dark:from-white dark:via-blue-100 dark:to-white/60">
              Building Smart Websites for <br />
              <span className="text-cyan-600 dark:text-cyan-400">Thessaloniki’s</span> Businesses
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-600 dark:text-blue-100/70 max-w-lg"
          >
            I combine premium glass-morphic design with powerful n8n automation to save you time, reduce costs, and modernize your digital presence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#portfolio"
              onClick={scrollToPortfolio}
              className="
                group relative px-8 py-4 rounded-xl 
                bg-cyan-600/10 dark:bg-white/10 backdrop-blur-md 
                border border-cyan-600/20 dark:border-white/20
                text-cyan-800 dark:text-white font-semibold flex items-center gap-3
                hover:bg-cyan-600/20 dark:hover:bg-white/20 transition-all 
                shadow-[0_0_20px_rgba(56,189,248,0.1)] dark:shadow-[0_0_20px_rgba(56,189,248,0.3)] cursor-pointer
              "
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right Visual - Abstract 3D Dashboard representation */}
        <motion.div 
          className="relative z-10 hidden lg:block perspective-1000"
          initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: -5 }}
          transition={{ duration: 1.2, type: "spring" }}
        >
           {/* Floating elements container */}
           <div className="relative w-full h-[500px]">
              {/* Main Laptop/Screen Interface */}
              <GlassCard className="absolute top-10 left-10 right-0 bottom-10 z-20 !bg-white/80 dark:!bg-gray-900/60 !backdrop-blur-xl border-slate-200 dark:border-blue-500/30 flex flex-col" tilt>
                 {/* Fake Header */}
                 <div className="h-12 border-b border-slate-200 dark:border-white/10 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
                 {/* Fake Content Area */}
                 <div className="flex-1 p-6 grid grid-cols-2 gap-4">
                    <div className="col-span-1 space-y-3">
                       <div className="h-20 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 animate-pulse"></div>
                       <div className="h-8 rounded-lg bg-slate-200 dark:bg-white/5 w-3/4"></div>
                       <div className="h-8 rounded-lg bg-slate-200 dark:bg-white/5 w-1/2"></div>
                    </div>
                    <div className="col-span-1 relative">
                       {/* Floating Node Graph Visual */}
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Cpu className="w-24 h-24 text-cyan-600 dark:text-cyan-400 opacity-80 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                       </div>
                    </div>
                 </div>
              </GlassCard>

              {/* Floating Element 1 - Code Snippet */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-8 z-30"
              >
                <GlassCard className="p-4 !bg-white/90 dark:!bg-black/40 !border-cyan-500/20 dark:!border-cyan-500/30 shadow-lg">
                  <Code2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mb-2" />
                  <div className="space-y-2">
                    <div className="w-24 h-2 bg-slate-300 dark:bg-white/20 rounded"></div>
                    <div className="w-16 h-2 bg-slate-200 dark:bg-white/10 rounded"></div>
                  </div>
                </GlassCard>
              </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};