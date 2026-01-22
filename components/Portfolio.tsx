import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, Mail, FileSpreadsheet, MessageSquare, Clock, MapPin, Bot, MessageCircle, FileText } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../hooks/useLanguage';

export const Portfolio: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'web' | 'n8n'>('web');

  const webProjects: Project[] = [
    {
      id: '1',
      title: t('portfolio.intellity.title'),
      description: t('portfolio.intellity.description'),
      category: 'web',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      technologies: ['React', 'AI', 'Green Tech'],
      link: 'https://intellity.gr/'
    },
    {
      id: '2',
      title: t('portfolio.withoutSessions.title'),
      description: t('portfolio.withoutSessions.description'),
      category: 'web',
      image: '/without-sessions.jpg',
      technologies: ['React', 'Netlify', 'Framer Motion'],
      link: 'https://withoutsessions.netlify.app/'
    },
    {
      id: '3',
      title: t('portfolio.rollySkg.title'),
      description: t('portfolio.rollySkg.description'),
      category: 'web',
      image: '/rolly-skg-logo.jpg',
      technologies: ['React', 'Netlify', 'Tailwind'],
      link: 'https://rollyskg.netlify.app/'
    },
    {
      id: '4',
      title: t('portfolio.eaConstructions.title'),
      description: t('portfolio.eaConstructions.description'),
      category: 'web',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
      technologies: ['React', 'Netlify', 'Tailwind'],
      link: 'https://eaconstructions.netlify.app/'
    }
  ];

  const automationProjects: Project[] = [
    {
      id: 'n1',
      title: t('portfolio.googleMaps.title'),
      description: t('portfolio.googleMaps.description'),
      category: 'n8n',
      stats: {
        hoursSaved: 25,
        lastRun: '10 mins ago',
        nodes: 14
      },
      technologies: ['Google Maps', 'GPT-4o', 'Telegram', 'Pinecone'],
      link: 'https://n8n.io/workflows/11381-monitor-google-maps-reviews-with-sentiment-analysis-and-rag-agent-using-pinecone/'
    },
    {
      id: 'n2',
      title: t('portfolio.financialDoc.title'),
      description: t('portfolio.financialDoc.description'),
      category: 'n8n',
      stats: {
        hoursSaved: 60,
        lastRun: '3 hours ago',
        nodes: 9
      },
      technologies: ['Gmail', 'OpenAI', 'Google Sheets'],
      link: 'https://n8n.io/workflows/11290-financial-document-extraction-from-gmail-to-google-sheets/'
    },
    {
      id: 'n3',
      title: t('portfolio.expenseLogging.title'),
      description: t('portfolio.expenseLogging.description'),
      category: 'n8n',
      stats: {
        hoursSaved: 15,
        lastRun: '1 hour ago',
        nodes: 7
      },
      technologies: ['Telegram', 'Google Sheets'],
      link: 'https://n8n.io/workflows/8268-expense-logging-with-telegram-and-google-sheets/'
    },
    {
      id: 'n4',
      title: t('portfolio.hotelBooking.title'),
      description: t('portfolio.hotelBooking.description'),
      category: 'n8n',
      stats: {
        hoursSaved: 40,
        lastRun: '30 mins ago',
        nodes: 11
      },
      technologies: ['Gmail', 'GPT-4o-mini', 'Google Sheets'],
      link: 'https://n8n.io/workflows/10578-automate-hotel-booking-requests-from-gmail-to-google-sheets-with-gpt-5-mini/'
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2 text-white">{t('portfolio.title')}</h2>
            <p className="text-slate-600 dark:text-white/60">{t('portfolio.subtitle')}</p>
          </div>

          {/* Toggle Switch */}
          <div className="mt-6 md:mt-0 p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex relative shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
            <div
              className={`absolute top-1 bottom-1 w-[50%] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.3)] rounded-full transition-all duration-300 ${activeTab === 'web' ? 'left-1' : 'left-[48%]'}`}
            />
            <button
              onClick={() => setActiveTab('web')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeTab === 'web' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
            >
              {t('portfolio.websitesTab')}
            </button>
            <button
              onClick={() => setActiveTab('n8n')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeTab === 'n8n' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
            >
              {t('portfolio.workflowsTab')}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'web' ? (
            <motion.div
              key="web"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory px-4 -mx-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
              {webProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="min-w-[85vw] md:min-w-[600px] snap-center"
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <GlassCard
                    className="group cursor-pointer h-full hover:shadow-[0_12px_40px_rgba(34,211,238,0.25)] transition-shadow duration-300"
                    onClick={() => project.link && window.open(project.link, '_blank')}
                    hoverEffect={false}
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a
                          href={project.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-6 py-2 bg-white text-black rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-cyan-100 transition-colors"
                        >
                          {t('portfolio.visitSite')} <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                      <p className="text-blue-100/80 mb-6 text-lg">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span key={tech} className="text-sm px-3 py-1.5 rounded bg-white/10 text-cyan-200 border border-white/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="n8n"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory px-4 -mx-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
              {automationProjects.map((project) => {
                // Determine icons based on project type to visualize the flow
                const getWorkflowIcons = () => {
                  if (project.id === 'n1') return [MapPin, Bot, MessageCircle];
                  return [Mail, FileText, FileSpreadsheet];
                };
                const [Icon1, Icon2, Icon3] = getWorkflowIcons();

                return (
                  <motion.div
                    key={project.id}
                    className="min-w-[85vw] md:min-w-[600px] snap-center"
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <GlassCard
                      className="p-0 relative overflow-hidden group cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_12px_40px_rgba(168,85,247,0.25)] transition-all duration-300 h-full bg-gradient-to-br from-purple-600/30 via-purple-500/20 to-teal-500/30"
                      onClick={() => project.link && window.open(project.link, '_blank')}
                      hoverEffect={false}
                    >
                      {/* Dashboard Header Style */}
                      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs font-mono text-green-400 uppercase tracking-wider">Active</span>
                        </div>
                        <span className="text-xs text-white/40 font-mono">ID: {project.id.toUpperCase()}</span>
                      </div>

                      <div className="p-8">
                        {/* Visual Node Flow */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center shadow-lg">
                            <Icon1 className="text-blue-400 w-8 h-8" />
                          </div>
                          <div className="w-2 h-2 rounded-full bg-white/40" />
                          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 flex items-center justify-center shadow-lg">
                            <Icon2 className="text-purple-400 w-8 h-8" />
                          </div>
                          <div className="w-2 h-2 rounded-full bg-white/40" />
                          <div className="w-16 h-16 rounded-2xl bg-green-500/20 backdrop-blur-sm border border-green-400/30 flex items-center justify-center shadow-lg">
                            <Icon3 className="text-green-400 w-8 h-8" />
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-4 text-white leading-tight">{project.title}</h3>
                        <p className="text-white/70 mb-8 text-base leading-relaxed">{project.description}</p>

                        {/* Stats Grid */}
                        <div className="mb-8">
                          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                            <div className="text-xs text-white/50 mb-2 flex items-center gap-1 uppercase tracking-wider">
                              <Clock size={14} /> {t('portfolio.timeSaved')}
                            </div>
                            <div className="text-3xl font-bold text-cyan-400">{project.stats?.hoursSaved} hrs</div>
                          </div>
                        </div>

                        <div className="w-full py-4 rounded-xl bg-white/5 backdrop-blur-sm group-hover:bg-white/10 border border-white/10 text-white transition-all flex items-center justify-center gap-2 font-medium text-sm">
                          <ExternalLink size={16} /> {t('portfolio.viewWorkflow')}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};