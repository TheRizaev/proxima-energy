'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Массив с нашими клиентами
const CLIENTS = [
  "Uzairways", 
  "Lukoil", 
  "Westminster International School", 
  "Agromir Самарканд", 
  "Sedat Triko Tashkent",
  "Солнечный научный институт"
];

export default function Clients() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Используем gsap.context для безопасной очистки анимации при размонтировании
    const ctx = gsap.context(() => {
      // Анимируем контейнер: сдвигаем его влево ровно на половину (xPercent: -50),
      // так как внутри у нас два одинаковых набора логотипов. 
      // При достижении -50% он мгновенно прыгнет на 0 (незаметно для глаза) и начнет заново.
      gsap.to(tickerRef.current, {
        xPercent: -50,
        ease: "none", // Строго линейное движение без ускорений и замедлений
        duration: 30, // Скорость прокрутки (чем больше цифра, тем медленнее)
        repeat: -1,   // Бесконечный цикл
      });
    });

    return () => ctx.revert(); // Очистка памяти
  }, []);

  return (
    // Секция с тонкими рамками сверху и снизу для визуального отделения
    <section className="py-8 bg-bgDark border-y border-white/5 overflow-hidden flex items-center">
      
      {/* Левый градиент для плавного появления (fade effect) */}
      <div className="absolute left-0 z-10 w-24 md:w-48 hfull bg-gradient-to-r from-bgDark to-transparent pointer-events-none" />

      {/* Контейнер бегущей строки */}
      <div 
        ref={tickerRef} 
        className="flex whitespace-nowrap items-center w-max"
      >
        {/* Рендерим массив дважды для создания иллюзии бесконечности */}
        {[...CLIENTS, ...CLIENTS].map((client, index) => (
          <div 
            key={index}
            className="flex items-center justify-center px-12 md:px-24 group cursor-pointer"
          >
            {/* Текстовая заглушка вместо логотипа. 
                В будущем заменишь этот <span> на тег <img> с реальным SVG */}
            <span className="text-xl md:text-2xl font-bold tracking-widest text-white/30 transition-all duration-300 group-hover:text-white group-hover:scale-105">
              {client.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Правый градиент для плавного исчезновения */}
      <div className="absolute right-0 z-10 w-24 md:w-48 h-full bg-gradient-to-l from-bgDark to-transparent pointer-events-none" />
      
    </section>
  );
}