import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

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
      scrollTo(element, { duration: 1.2 });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          hidden md:flex pointer-events-auto
          items-center gap-6 px-8 py-4
          bg-white/10 backdrop-blur-md 
          border border-white/20 
          rounded-full shadow-none
          transition-colors duration-500
        "
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="
              relative px-3 py-1 text-sm font-medium
              text-white/80
              transition-colors hover:text-white
              group cursor-pointer
            "
          >
            {t(`navbar.${link.name}`)}
            <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform" />
          </a>
        ))}



        <div className="w-px h-4 bg-slate-300 dark:bg-white/20" />

        <button
          onClick={toggleLanguage}
          className="p-1.5 px-3 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:scale-110 transition-all active:scale-95 cursor-pointer font-medium text-xs"
          aria-label="Toggle Language"
        >
          {language === 'en' ? 'GR' : 'EN'}
        </button>
      </motion.nav>

      {/* Mobile Navbar Button */}
      <div className="md:hidden pointer-events-auto flex items-center gap-2">
        <motion.button
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="
            p-3 rounded-full 
            bg-white/10 backdrop-blur-md 
            border border-white/20 
            text-white 
            shadow-lg
          "
        >
          <Menu size={24} />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="
              absolute top-20 left-4 right-4 
              bg-slate-900/95 backdrop-blur-xl
              border border-white/20
              rounded-2xl shadow-2xl p-6
              pointer-events-auto md:hidden
              flex flex-col gap-6
            "
          >
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
              <span className="text-lg font-bold text-slate-900 dark:text-white">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="
                    px-4 py-3 rounded-xl
                    text-lg font-medium text-slate-600 dark:text-white/80
                    hover:bg-slate-50 dark:hover:bg-white/5
                    hover:text-cyan-600 dark:hover:text-cyan-400
                    transition-all
                  "
                >
                  {t(`navbar.${link.name}`)}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold hover:scale-105 transition-all"
              >
                {language === 'en' ? 'GR' : 'EN'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};