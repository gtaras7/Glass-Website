import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { Palette, Share2, TrendingUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Palette,
      title: t('services.webDesign.title'),
      description: t('services.webDesign.description'),
    },
    {
      icon: Share2,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
    },
  ];

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-300 dark:to-purple-400">
            {t('services.title')}
          </h2>
          <p className="text-slate-600 dark:text-blue-100/60 max-w-xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <GlassCard key={index} tilt className="min-h-[300px] p-8 flex flex-col group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-white/5 border border-cyan-100 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">{service.title}</h3>
              <p className="text-slate-600 dark:text-white/60 leading-relaxed">
                {service.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};