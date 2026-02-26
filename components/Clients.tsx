'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Clients() {
  const tickerRef = useRef<HTMLDivElement>(null);
  
  // Извлечение функции перевода из глобального контекста
  const { t } = useLanguage();

  // Массив формируется динамически при каждом рендере компонента
  const CLIENTS = [
    t.clients.c1, 
    t.clients.c2, 
    t.clients.c3, 
    t.clients.c4, 
    t.clients.c5,
    t.clients.c6
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Математика сдвига: xPercent: -50 сдвигает блок на половину ширины, 
      // обеспечивая бесшовный цикл для продублированного массива
      gsap.to(tickerRef.current, {
        xPercent: -50,
        ease: "none", 
        duration: 30, 
        repeat: -1,   
      });
    });

    return () => ctx.revert(); 
  }, []);

  return (
    <section className="py-8 bg-bgDark border-y border-white/5 overflow-hidden flex items-center relative">
      <div className="absolute left-0 z-10 w-24 md:w-48 h-full bg-gradient-to-r from-bgDark to-transparent pointer-events-none" />

      <div ref={tickerRef} className="flex whitespace-nowrap items-center w-max">
        {/* Дублирование массива: O(2n) для создания иллюзии бесконечного цикла */}
        {[...CLIENTS, ...CLIENTS].map((client, index) => (
          <div key={index} className="flex items-center justify-center px-12 md:px-24 group cursor-pointer">
            <span className="text-xl md:text-2xl font-bold tracking-widest text-white/30 transition-all duration-300 group-hover:text-white group-hover:scale-105">
              {client.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute right-0 z-10 w-24 md:w-48 h-full bg-gradient-to-l from-bgDark to-transparent pointer-events-none" />
    </section>
  );
}