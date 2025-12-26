import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { Palette, Share2, TrendingUp } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      icon: Palette,
      title: "Premium Web Design",
      description: "Custom-coded, high-performance websites using React and Tailwind. No cookie-cutter templates—just pure, polished glassmorphism aesthetics tailored to your brand."
    },
    {
      icon: Share2,
      title: "n8n Automation",
      description: "I connect your apps (Gmail, Slack, Sheets, CRM) to create seamless workflows. Save hundreds of hours by automating repetitive tasks like lead generation and invoicing.",
    },
    {
      icon: TrendingUp,
      title: "Business Solutions",
      description: "Digital strategy meets technical execution. From setting up your Google Business Profile to integrating ServiceNow workflows for larger operations.",
    }
  ];

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-300 dark:to-purple-400">
            My Expertise
          </h2>
          <p className="text-slate-600 dark:text-blue-100/60 max-w-xl mx-auto">
            Bridging the gap between beautiful design and intelligent logic.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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