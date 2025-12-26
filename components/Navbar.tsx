import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const { language, toggleLanguage, t } = useLanguage();

  const links = [
    { name: 'home', href: '#home' },
    { name: 'services', href: '#services' },
    { name: 'portfolio', href: '#portfolio' },
    { name: 'about', href: '#about' },
    { name: 'contact', href: '#contact' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          pointer-events-auto
          flex items-center gap-1 sm:gap-6 px-4 py-3 sm:px-8 sm:py-4
          bg-white/70 dark:bg-white/10 backdrop-blur-md 
          border border-slate-200 dark:border-white/20 
          rounded-full shadow-lg dark:shadow-none
          transition-colors duration-500
        "
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="
              relative px-3 py-1 text-xs sm:text-sm font-medium
              text-slate-600 dark:text-white/80
              transition-colors hover:text-slate-900 dark:hover:text-white
              group cursor-pointer
            "
          >
            {t(`navbar.${link.name}`)}
            <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
        ))}

        <div className="w-px h-4 bg-slate-300 dark:bg-white/20 mx-1 sm:mx-0" />

        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:scale-110 transition-all active:scale-95 cursor-pointer"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-white/20 mx-1 sm:mx-0" />

        <button
          onClick={toggleLanguage}
          className="p-1.5 px-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:scale-110 transition-all active:scale-95 cursor-pointer font-medium text-xs"
          aria-label="Toggle Language"
        >
          {language === 'en' ? 'GR' : 'EN'}
        </button>
      </motion.nav>
    </div>
  );
};