'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Factory, Cpu, ThermometerSun, HardHat } from 'lucide-react';

// Регистрация плагина для отслеживания скролла
gsap.registerPlugin(ScrollTrigger);

export default function Production() {
  // Инициализация ссылок на главный контейнер и массив модулей (карточек)
  const sectionRef = useRef<HTMLElement>(null);
  const bentoItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Контекст GSAP для корректного управления памятью в жизненном цикле React
    const ctx = gsap.context(() => {
      // Анимация массива элементов. Запуск при достижении 85% высоты экрана.
      gsap.fromTo(
        bentoItemsRef.current,
        { y: 50, opacity: 0 }, // Вектор начала: сдвиг по оси Y вниз на 50px, абсолютная прозрачность
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1, // Интервал между началом анимации каждого последующего элемента в массиве
          ease: "power3.out", // Математическая функция затухания скорости
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Координата срабатывания
            toggleActions: "play none none reverse",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Вспомогательная функция наполнения массива ссылок DOM-узлами
  const addToBentoRef = (el: HTMLDivElement | null) => {
    if (el && !bentoItemsRef.current.includes(el)) {
      bentoItemsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Инжиниринг и <span className="text-[#FFB800]">Собственное производство</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Комплексное выполнение EPC-контрактов. Локализация производства несущих конструкций снижает итоговый CAPEX проекта и гарантирует структурную надежность модулей.
          </p>
        </div>

        {/* Асимметричная сетка Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          
          {/* Модуль 1: Основной блок (занимает 2 колонки на десктопе) */}
          <div 
            ref={addToBentoRef}
            className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between group hover:bg-white/10 transition-colors"
          >
            <div>
              <div className="w-12 h-12 bg-[#FFB800]/10 rounded-xl flex items-center justify-center mb-6 border border-[#FFB800]/20">
                <Factory className="w-6 h-6 text-[#FFB800]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Производство монтажных систем</h3>
              <p className="text-gray-400 mb-6">
                Собственная линия по выпуску систем крепления солнечных панелей. Использование алюминиевого сплава АД31Т1 (6063-T6) с анодированным покрытием 20 мкм. 
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <div className="text-2xl font-bold text-white">30 м/с</div>
                <div className="text-sm text-gray-500">Допустимая ветровая нагрузка</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">-15%</div>
                <div className="text-sm text-gray-500">Экономия на логистике каркасов</div>
              </div>
            </div>
          </div>

          {/* Модуль 2: Оборудование */}
          <div 
            ref={addToBentoRef}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col group hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 bg-[#FFB800]/10 rounded-xl flex items-center justify-center mb-6 border border-[#FFB800]/20">
              <Cpu className="w-6 h-6 text-[#FFB800]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Оборудование Tier-1</h3>
            <p className="text-gray-400 text-sm">
              Интеграция фотоэлектрических модулей и инверторов исключительно от производителей, входящих в мировой рейтинг ТОП-10 BloombergNEF. Максимальный КПД преобразования.
            </p>
          </div>

          {/* Модуль 3: Температурный режим */}
          <div 
            ref={addToBentoRef}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col group hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 bg-[#FFB800]/10 rounded-xl flex items-center justify-center mb-6 border border-[#FFB800]/20">
              <ThermometerSun className="w-6 h-6 text-[#FFB800]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Экстремальные условия</h3>
            <p className="text-gray-400 text-sm">
              Аппаратные компоненты рассчитаны на бесперебойную генерацию при температурных градиентах от -60°С до +50°C. Системы терморегуляции инверторов предотвращают троттлинг.
            </p>
          </div>

          {/* Модуль 4: EPC-контракт (занимает 2 колонки на десктопе) */}
          <div 
            ref={addToBentoRef}
            className="md:col-span-2 bg-[#FFB800] border border-[#FFB800]/50 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative"
          >
            {/* Фоновый геометрический паттерн для желтого блока */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <HardHat className="w-6 h-6 text-black" />
                <h3 className="text-2xl font-bold text-black">EPC подрядчик полного цикла</h3>
              </div>
              <p className="text-black/80 max-w-lg">
                Engineering (Проектирование) → Procurement (Закупки) → Construction (Строительство). Единая точка ответственности за ввод объекта в эксплуатацию.
              </p>
            </div>
            <button className="relative z-10 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-900 transition-colors whitespace-nowrap">
              Аудит объекта
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}