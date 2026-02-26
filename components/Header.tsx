'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.header.calc, href: '#calculator' },
    { name: t.header.prod, href: '#production' },
    { name: t.header.proj, href: '#portfolio' },
    { name: t.header.steps, href: '#process' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        
        <a href="#hero" className="flex items-center gap-2 group z-50">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Proxima <span className="text-primary">Energy</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <div className="relative group z-50">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              {language}
            </button>
            <div className="absolute top-full right-0 mt-2 w-24 bg-[#0A0A0A] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden">
              <button onClick={() => setLanguage('ru')} className={`px-4 py-2 text-sm text-left hover:bg-white/5 transition-colors ${language === 'ru' ? 'text-primary' : 'text-gray-300'}`}>RU</button>
              <button onClick={() => setLanguage('uz')} className={`px-4 py-2 text-sm text-left hover:bg-white/5 transition-colors ${language === 'uz' ? 'text-primary' : 'text-gray-300'}`}>UZ</button>
              <button onClick={() => setLanguage('en')} className={`px-4 py-2 text-sm text-left hover:bg-white/5 transition-colors ${language === 'en' ? 'text-primary' : 'text-gray-300'}`}>EN</button>
            </div>
          </div>

          <a href="#contact" className="bg-white/10 border border-white/20 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/20 hover:border-white/30 transition-all">
            {t.header.contactBtn}
          </a>
        </div>

        <button className="md:hidden text-white p-2 z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-[#0A0A0A] transition-transform duration-500 ease-in-out flex flex-col px-6 pt-24 pb-8 gap-6 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`} style={{ zIndex: 40 }}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="text-2xl font-bold text-white border-b border-white/5 pb-4" onClick={() => setIsMobileMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        {/* Блок переключения языка в мобильном меню */}
        <div className="flex flex-col gap-4 mt-4">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-widest flex items-center gap-2">
            <Globe size={16} /> {language === 'ru' ? 'Выберите язык' : 'Tilni tanlang'}
          </span>
          <div className="flex gap-3">
            {['ru', 'uz', 'en'].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang as 'ru' | 'uz' | 'en');
                  // Можно закрывать меню после выбора, если нужно:
                  // setIsMobileMenuOpen(false); 
                }}
                className={`flex-1 py-3 rounded-xl border font-bold transition-all ${
                  language === lang 
                    ? 'bg-primary/20 border-primary text-primary' 
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <a href="#contact" className="w-full bg-primary text-black text-center py-4 rounded-xl font-bold text-lg mt-auto mb-10" onClick={() => setIsMobileMenuOpen(false)}>
          {t.header.contactBtn}
        </a>
      </div>
    </header>
  );
}