'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react'; // Вернули импорт Zap

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Калькулятор', href: '#calculator' },
    { name: 'Производство', href: '#production' },
    { name: 'Проекты', href: '#portfolio' },
    { name: 'Этапы', href: '#process' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' 
          : 'bg-gradient-to-b from-black/80 to-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        
        {/* Логотип с иконкой молнии */}
        <a href="#hero" className="flex items-center gap-2 group z-50">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Proxima <span className="text-primary">Energy</span>
          </span>
        </a>

        {/* Десктопная навигация */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Десктопная кнопка */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            className="bg-white/10 border border-white/20 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/20 hover:border-white/30 transition-all"
          >
            Связаться с нами
          </a>
        </div>

        {/* Кнопка мобильного меню */}
        <button 
          className="md:hidden text-white p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Выпадающее Мобильное меню */}
      <div 
        className={`md:hidden absolute top-0 left-0 w-full h-screen bg-[#0A0A0A] transition-transform duration-500 ease-in-out flex flex-col px-6 pt-24 pb-8 gap-6 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ zIndex: 40 }}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="text-2xl font-bold text-white border-b border-white/5 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a 
          href="#contact" 
          className="w-full bg-primary text-bgDark text-center py-4 rounded-xl font-bold text-lg mt-auto mb-10"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Оставить заявку
        </a>
      </div>
    </header>
  );
}