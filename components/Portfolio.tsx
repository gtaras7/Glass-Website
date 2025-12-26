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
      link: 'https://n8n.io/workflows/11381-monitor-google-maps-reviews-with-gpt-4o-sentiment-analysis-and-telegram-rag-agent-using-pinecone/'
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
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold mb-2 text-slate-800 dark:text-white">{t('portfolio.title')}</h2>
            <p className="text-slate-600 dark:text-white/60">{t('portfolio.subtitle')}</p>
          </div>

          {/* Toggle Switch */}
          <div className="mt-6 md:mt-0 p-1 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-full flex relative">
            <div
              className={`absolute top-1 bottom-1 w-[50%] bg-white shadow-sm dark:bg-cyan-500/20 rounded-full transition-all duration-300 ${activeTab === 'web' ? 'left-1' : 'left-[48%]'}`}
            />
            <button
              onClick={() => setActiveTab('web')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeTab === 'web' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white'}`}
            >
              {t('portfolio.websitesTab')}
            </button>
            <button
              onClick={() => setActiveTab('n8n')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeTab === 'n8n' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white'}`}
            >
              {t('portfolio.workflowsTab')}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'web' ? (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {webProjects.map((project) => (
                <GlassCard key={project.id} className="group">
                  <div className="h-48 overflow-hidden relative">
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
                        className="px-6 py-2 bg-white text-black rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-cyan-100 transition-colors"
                      >
                        {t('portfolio.visitSite')} <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{project.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-white/60 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-cyan-700 dark:text-cyan-200 border border-slate-200 dark:border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="n8n"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {automationProjects.map((project) => {
                // Determine icons based on project type to visualize the flow
                const getWorkflowIcons = () => {
                  if (project.id === 'n1') return [MapPin, Bot, MessageCircle];
                  return [Mail, FileText, FileSpreadsheet];
                };
                const [Icon1, Icon2, Icon3] = getWorkflowIcons();

                return (
                  <GlassCard
                    key={project.id}
                    className="p-0 relative overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-colors"
                    onClick={() => project.link && window.open(project.link, '_blank')}
                  >
                    {/* Dashboard Header Style */}
                    <div className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-green-600 dark:text-green-400">ACTIVE</span>
                      </div>
                      <span className="text-xs text-slate-400 dark:text-white/40 font-mono">ID: {project.id.toUpperCase()}</span>
                    </div>

                    <div className="p-8">
                      {/* Visual Node Flow */}
                      <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/20 border border-blue-100 dark:border-blue-500/30 flex items-center justify-center">
                          <Icon1 className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="h-px w-8 bg-slate-300 dark:bg-white/20 relative">
                          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-slate-400 dark:bg-white/40 rounded-full" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/20 border border-purple-100 dark:border-purple-500/30 flex items-center justify-center">
                          <Icon2 className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="h-px w-8 bg-slate-300 dark:bg-white/20 relative">
                          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-slate-400 dark:bg-white/40 rounded-full" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-500/20 border border-green-100 dark:border-green-500/30 flex items-center justify-center">
                          <Icon3 className="text-green-600 dark:text-green-400" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">{project.title}</h3>
                      <p className="text-slate-600 dark:text-white/60 mb-6">{project.description}</p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-100 dark:bg-black/20 rounded-lg p-3 border border-slate-200 dark:border-white/5">
                          <div className="text-xs text-slate-500 dark:text-white/40 mb-1 flex items-center gap-1"><Clock size={12} /> {t('portfolio.timeSaved')}</div>
                          <div className="text-xl font-mono text-cyan-600 dark:text-cyan-400">{project.stats?.hoursSaved} hrs</div>
                        </div>
                      </div>

                      <div className="w-full py-3 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/20 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                        <ExternalLink size={16} /> {t('portfolio.viewWorkflow')}
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};