'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Calculator() {
  const [area, setArea] = useState<number>(500);

  const [results, setResults] = useState({
    capacity: 0,
    cost: 0,
    savingsYearly: 0,
    payback: 0,
  });

  const capacityRef = useRef<HTMLDivElement>(null);
  const costRef = useRef<HTMLDivElement>(null);
  const savingsRef = useRef<HTMLDivElement>(null);
  const paybackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Математическая модель расчета
    const capacity = area * 0.2;
    const cost = capacity * 10000000;
    const savingsYearly = capacity * 4.5 * 365 * 900;
    const payback = cost / savingsYearly;

    setResults({ capacity, cost, savingsYearly, payback });
  }, [area]);

  useEffect(() => {
    const formatNumber = (val: number) => Math.round(val).toLocaleString('ru-RU');

    // Анимация изменения значений через манипуляцию DOM
    gsap.to({ val: 0 }, {
      val: results.capacity,
      duration: 1,
      ease: "power2.out",
      onUpdate: function () {
        if (capacityRef.current) capacityRef.current.innerText = formatNumber(this.targets()[0].val) + ' кВт';
      }
    });

    gsap.to({ val: 0 }, {
      val: results.cost,
      duration: 1,
      ease: "power2.out",
      onUpdate: function () {
        if (costRef.current) costRef.current.innerText = formatNumber(this.targets()[0].val) + ' UZS';
      }
    });

    gsap.to({ val: 0 }, {
      val: results.savingsYearly,
      duration: 1,
      ease: "power2.out",
      onUpdate: function () {
        if (savingsRef.current) savingsRef.current.innerText = formatNumber(this.targets()[0].val) + ' UZS';
      }
    });

    gsap.to({ val: 0 }, {
      val: results.payback,
      duration: 1,
      ease: "power2.out",
      onUpdate: function () {
        if (paybackRef.current) paybackRef.current.innerText = (this.targets()[0].val).toFixed(1) + ' лет';
      }
    });
  }, [results]);

  return (
    // Добавлен overflow-x-hidden для предотвращения горизонтального скролла на мобильных устройствах
    <section className="py-16 md:py-24 bg-bgDark text-white overflow-x-hidden w-full">
      {/* Уменьшены горизонтальные отступы px-4 для узких экранов */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl w-full">
        <div className="mb-10 text-center px-2">
          {/* Адаптивный размер шрифта: text-3xl для мобильных, text-5xl для десктопов */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Инженерный расчет <span className="text-primary">окупаемости</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Рассчитайте технические параметры и финансовую эффективность солнечной станции для вашего объекта на основе математического моделирования.
          </p>
        </div>

        {/* Изменены отступы внутри карточки: p-5 на мобильных, p-12 на десктопах */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-surfaceDark border border-white/10 rounded-2xl p-5 sm:p-8 lg:p-12 shadow-2xl w-full">
          
          <div className="flex flex-col justify-center w-full">
            <label className="text-xs md:text-sm text-gray-400 mb-2 uppercase tracking-widest font-semibold">
              Свободная площадь крыши (м²)
            </label>
            {/* Адаптивный размер цифр площади */}
            <div className="text-3xl md:text-4xl font-bold mb-6 text-primary">{area.toLocaleString('ru-RU')} м²</div>
            
            <input 
              type="range" 
              min="100" 
              max="5000" 
              step="50"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              // Ширина ползунка строго ограничена 100% родительского контейнера
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary mb-8 md:mb-12"
            />
            
            <p className="text-xs md:text-sm text-gray-500 border-l-2 border-primary pl-4">
              Расчет производится с учетом инсоляции в условиях Республики Узбекистан и усредненного тарифа 900 сум/кВт⋅ч для юридических лиц.
            </p>
          </div>

          {/* Контейнер результатов с адаптивными отступами p-5 -> p-8 */}
          <div className="flex flex-col gap-4 md:gap-6 bg-bgDark p-5 md:p-8 rounded-xl border border-white/5 w-full">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3 md:pb-4 gap-4">
              <span className="text-sm md:text-base text-gray-400">Установленная мощность:</span>
              <span ref={capacityRef} className="text-lg md:text-2xl font-bold text-white whitespace-nowrap">0 кВт</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3 md:pb-4 gap-4">
              <span className="text-sm md:text-base text-gray-400">Ориентировочная стоимость:</span>
              <span ref={costRef} className="text-lg md:text-2xl font-bold text-white whitespace-nowrap">0 UZS</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-3 md:pb-4 gap-4">
              <span className="text-sm md:text-base text-gray-400">Экономия в год:</span>
              <span ref={savingsRef} className="text-lg md:text-2xl font-bold text-success whitespace-nowrap">0 UZS</span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-sm md:text-base text-gray-400">Срок окупаемости:</span>
              <span ref={paybackRef} className="text-lg md:text-2xl font-bold text-primary whitespace-nowrap">0 лет</span>
            </div>

            <button className="w-full mt-4 md:mt-6 bg-primary text-bgDark py-3 md:py-4 rounded-lg font-bold transition-colors hover:bg-yellow-400 text-sm md:text-base">
              Отправить данные инженерам
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}