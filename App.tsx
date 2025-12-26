import React, { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Cursor } from './components/ui/Cursor';

function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Sync scrollbar styles when theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="relative font-sans antialiased text-slate-900 dark:text-white selection:bg-cyan-500/30 transition-colors duration-500 min-h-screen">
        <Cursor />
        <Background isDark={isDark} />

        <div className="relative" style={{ zIndex: 10 }}>
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />

          <main className="flex flex-col">
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Contact />
          </main>

          <footer className="py-8 text-center text-slate-500 dark:text-white/20 text-sm border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
            <p>© {new Date().getFullYear()} NextGen Automation. Built with React & Glass.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;