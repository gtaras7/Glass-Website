import React, { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Cursor } from './components/ui/Cursor';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './hooks/useLanguage';
import { useMetaTags } from './hooks/useMetaTags';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function AppContent({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const { language, t } = useLanguage();
  useMetaTags(language);

  // Initialize smooth scrolling
  const { scrollTo } = useSmoothScroll();

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="relative font-sans antialiased text-slate-900 dark:text-white selection:bg-cyan-500/30 transition-colors duration-500 min-h-[100dvh] bg-[#050511] flex flex-col w-full max-w-[100vw] overflow-x-hidden">
        <Cursor />
        <Background isDark={isDark} />

        <div className="relative flex-1 flex flex-col w-full" style={{ zIndex: 10 }}>
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />

          <main className="flex flex-col flex-1 w-full">
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Contact />
          </main>

          <footer className="py-8 text-center text-slate-500 dark:text-white/20 text-sm border-t border-slate-200 dark:border-white/5 transition-colors duration-500 w-full">
            <p>© {new Date().getFullYear()} NextGen Automation</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

function App() {
  const isDark = true;
  const toggleTheme = () => { }; // No-op

  // Enforce dark mode class on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <LanguageProvider>
      <AppContent isDark={isDark} toggleTheme={toggleTheme} />
    </LanguageProvider>
  );
}

export default App;