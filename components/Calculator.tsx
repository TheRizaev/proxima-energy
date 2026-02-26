'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Calculator() {
  // Инициализация входных векторов пользователя
  const [area, setArea] = useState<number>(500);
  const [tariff, setTariff] = useState<number>(900);
  const { t } = useLanguage();

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
    // Математическая модель расчета:
    // 1. Установленная мощность (capacity) = Площадь (area) * Коэффициент эффективности м2 (0.2 кВт/м2)
    const capacity = area * 0.2;
    // 2. Стоимость (cost) = Мощность * Средняя удельная стоимость 1 кВт (10,000,000 UZS)
    const cost = capacity * 10000000;
    // 3. Годовая генерация = Мощность * Среднесуточная выработка (4.5 часа) * 365 дней
    // 4. Годовая экономия (savingsYearly) = Годовая генерация * Динамический тариф (tariff)
    const savingsYearly = capacity * 4.5 * 365 * tariff;
    // 5. Срок окупаемости (payback) = Стоимость / Годовая экономия
    const payback = cost / savingsYearly;

    setResults({ capacity, cost, savingsYearly, payback });
  }, [area, tariff]);

  useEffect(() => {
    const formatNumber = (val: number) => Math.round(val).toLocaleString('ru-RU');

    // Манипуляция DOM узлами для плавного инкремента числовых значений
    gsap.to({ val: 0 }, { val: results.capacity, duration: 1, ease: "power2.out", onUpdate: function () { if (capacityRef.current) capacityRef.current.innerText = formatNumber(this.targets()[0].val) + ' кВт'; } });
    gsap.to({ val: 0 }, { val: results.cost, duration: 1, ease: "power2.out", onUpdate: function () { if (costRef.current) costRef.current.innerText = formatNumber(this.targets()[0].val) + ' UZS'; } });
    gsap.to({ val: 0 }, { val: results.savingsYearly, duration: 1, ease: "power2.out", onUpdate: function () { if (savingsRef.current) savingsRef.current.innerText = formatNumber(this.targets()[0].val) + ' UZS'; } });
    gsap.to({ val: 0 }, { val: results.payback, duration: 1, ease: "power2.out", onUpdate: function () { if (paybackRef.current) paybackRef.current.innerText = (this.targets()[0].val).toFixed(1) + ` ${t.calc.years}`; } });
  }, [results, t.calc.years]);

  return (
    <section className="py-16 md:py-24 bg-bgDark text-white overflow-x-hidden w-full" id="calculator">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl w-full">
        <div className="mb-10 text-center px-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.calc.title} <span className="text-primary">{t.calc.titleSpan}</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">{t.calc.desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-surfaceDark border border-white/10 rounded-2xl p-5 sm:p-8 lg:p-12 shadow-2xl w-full">
          
          <div className="flex flex-col justify-center w-full">
            {/* Поле ввода: Площадь */}
            <label className="text-xs md:text-sm text-gray-400 mb-2 uppercase tracking-widest font-semibold">{t.calc.areaLabel}</label>
            <div className="text-3xl md:text-4xl font-bold mb-4 text-primary">{area.toLocaleString('ru-RU')} м²</div>
            <input 
              type="range" min="100" max="5000" step="50" value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary mb-8"
            />

            {/* Поле ввода: Динамический тариф */}
            <label className="text-xs md:text-sm text-gray-400 mb-2 uppercase tracking-widest font-semibold">{t.calc.tariffLabel}</label>
            <div className="text-3xl md:text-4xl font-bold mb-4 text-primary">{tariff.toLocaleString('ru-RU')} UZS</div>
            <input 
              type="range" min="450" max="2500" step="50" value={tariff}
              onChange={(e) => setTariff(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary mb-8 md:mb-12"
            />
            
            <p className="text-xs md:text-sm text-gray-500 border-l-2 border-primary pl-4">{t.calc.areaNote}</p>
          </div>

          <div className="flex flex-col gap-4 md:gap-6 bg-bgDark p-5 md:p-8 rounded-xl border border-white/5 w-full">
            <div className="flex justify-between items-center border-b border-white/10 pb-3 md:pb-4 gap-4">
              <span className="text-sm md:text-base text-gray-400">{t.calc.capLabel}</span>
              <span ref={capacityRef} className="text-lg md:text-2xl font-bold text-white whitespace-nowrap">0 кВт</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-3 md:pb-4 gap-4">
              <span className="text-sm md:text-base text-gray-400">{t.calc.costLabel}</span>
              <span ref={costRef} className="text-lg md:text-2xl font-bold text-white whitespace-nowrap">0 UZS</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-3 md:pb-4 gap-4">
              <span className="text-sm md:text-base text-gray-400">{t.calc.saveLabel}</span>
              <span ref={savingsRef} className="text-lg md:text-2xl font-bold text-success whitespace-nowrap">0 UZS</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <span className="text-sm md:text-base text-gray-400">{t.calc.pbLabel}</span>
              <span ref={paybackRef} className="text-lg md:text-2xl font-bold text-primary whitespace-nowrap">0 {t.calc.years}</span>
            </div>
            <button className="w-full mt-4 md:mt-6 bg-primary text-bgDark py-3 md:py-4 rounded-lg font-bold transition-colors hover:bg-white text-sm md:text-base">
              {t.calc.btn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}