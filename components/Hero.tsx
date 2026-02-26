'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Zap, ShieldCheck, Sun } from 'lucide-react'; // Импортируем премиальные векторные иконки

export default function Hero() {
  // 1. Инициализация ссылок на узлы DOM для управления через GSAP
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. Создаем временную шкалу для строгой последовательности анимаций
    const tl = gsap.timeline();

    // 2.1 Изолированная анимация фона: кинематографичный медленный зум (Scale 1.1 -> 1.0)
    gsap.fromTo(
      bgRef.current,
      { scale: 1.15 },
      { scale: 1, duration: 12, ease: "none" }
    );

    // 2.2 Появление элементов интерфейса по оси Y с изменением прозрачности
    tl.fromTo(
      badgeRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    )
    .fromTo(
      titleLinesRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" },
      "-=0.7" // Нахлест анимаций для динамики
    )
    .fromTo(
      descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      statsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  // Вспомогательная функция для сбора строк заголовка в массив
  const addToTitleRef = (el: HTMLSpanElement | null) => {
    if (el && !titleLinesRef.current.includes(el)) {
      titleLinesRef.current.push(el);
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center bg-bgDark text-white overflow-hidden">
      
      {/* ФОНОВЫЙ БЛОК */}
      {/* Изображение с абсолютным позиционированием на весь экран */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop)' }}
      />
      {/* Градиентная маска: плотный черный слева плавно переходит в прозрачный справа */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
      {/* Дополнительное затемнение по всей площади для контраста текста */}
      <div className="absolute inset-0 z-0 bg-black/30" />


      {/* КОНТЕНТНЫЙ БЛОК */}
      {/* Контейнер ограничивает ширину контента и задает отступы */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col justify-center pt-32">
        
        <div className="max-w-4xl"> {/* Ограничитель ширины текста для комфортного чтения */}
          
          {/* Премиальный бейдж (Badge) с эффектом стекла (glassmorphism) */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="text-sm font-medium tracking-wide text-gray-300 uppercase">
              Топ-10 EPC подрядчиков в Узбекистане
            </span>
          </div>

          {/* Заголовок H1. Разбиваем на логические блоки для анимации. 
              Размеры текста адаптируются под экраны: text-5xl на мобильных, text-7xl на десктопах */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            <span ref={addToTitleRef} className="block overflow-hidden pb-1">Проектирование и</span>
            <span ref={addToTitleRef} className="block overflow-hidden pb-1">строительство СЭС</span>
            <span ref={addToTitleRef} className="block overflow-hidden pb-1 text-primary">для вашего бизнеса</span>
          </h1>

          <p ref={descRef} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Снижение затрат на электроэнергию до 80%. Полный цикл работ: от первичного аудита до ввода станции в эксплуатацию с гарантией.
          </p>

          {/* Блок с кнопками */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <button className="group bg-primary text-bgDark px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-yellow-400 hover:scale-[1.02] active:scale-95">
              Рассчитать стоимость
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="px-8 py-4 rounded-xl font-semibold text-white bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10">
              Посмотреть портфолио
            </button>
          </div>

          {/* Блок с быстрой статистикой (Micro-stats) */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-3xl">
            <div>
              <div className="text-3xl font-bold text-white mb-1">100+</div>
              <div className="text-sm text-gray-400">Реализованных проектов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">10 МВт</div>
              <div className="text-sm text-gray-400">Введенной мощности</div>
            </div>
            <div className="hidden md:block">
              <div className="text-3xl font-bold flex items-center gap-2 text-success mb-1">
                <ShieldCheck className="w-6 h-6" /> 25 лет
              </div>
              <div className="text-sm text-gray-400">Гарантии на панели</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}