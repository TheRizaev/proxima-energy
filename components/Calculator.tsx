'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function Calculator() {
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
    const capacity = area * 0.2;
    const cost = capacity * 10000000;
    const savingsYearly = capacity * 4.5 * 365 * tariff;
    const payback = cost / savingsYearly;

    setResults({ capacity, cost, savingsYearly, payback });
  }, [area, tariff]);

  useEffect(() => {
    const formatNumber = (val: number) => Math.round(val).toLocaleString('ru-RU');

    // Используем overwrite: true, чтобы анимации не конфликтовали при быстром движении слайдера
    gsap.to({ val: 0 }, { 
      val: results.capacity, 
      duration: 0.5, 
      overwrite: true,
      ease: "power2.out", 
      onUpdate: function () { if (capacityRef.current) capacityRef.current.innerText = formatNumber(this.targets()[0].val) + ' кВт'; } 
    });
    gsap.to({ val: 0 }, { 
      val: results.cost, 
      duration: 0.5, 
      overwrite: true,
      ease: "power2.out", 
      onUpdate: function () { if (costRef.current) costRef.current.innerText = formatNumber(this.targets()[0].val) + ' UZS'; } 
    });
    gsap.to({ val: 0 }, { 
      val: results.savingsYearly, 
      duration: 0.5, 
      overwrite: true,
      ease: "power2.out", 
      onUpdate: function () { if (savingsRef.current) savingsRef.current.innerText = formatNumber(this.targets()[0].val) + ' UZS'; } 
    });
    gsap.to({ val: 0 }, { 
      val: results.payback, 
      duration: 0.5, 
      overwrite: true,
      ease: "power2.out", 
      onUpdate: function () { if (paybackRef.current) paybackRef.current.innerText = (this.targets()[0].val).toFixed(1) + ` ${t.calc.years}`; } 
    });
  }, [results, t.calc.years]);

  return (
    <section className="py-12 md:py-24 bg-bgDark text-white overflow-hidden" id="calculator">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.calc.title} <span className="text-primary">{t.calc.titleSpan}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2">
            {t.calc.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 bg-surfaceDark border border-white/10 rounded-2xl p-4 sm:p-8 lg:p-12 shadow-2xl items-start">
          
          {/* Левая часть: Слайдеры */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-semibold">
                  {t.calc.areaLabel}
                </label>
                <div className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
                  {area.toLocaleString('ru-RU')} м²
                </div>
              </div>
              <input 
                type="range" min="100" max="5000" step="50" value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-semibold">
                  {t.calc.tariffLabel}
                </label>
                <div className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
                  {tariff.toLocaleString('ru-RU')} UZS
                </div>
              </div>
              <input 
                type="range" min="450" max="2500" step="50" value={tariff}
                onChange={(e) => setTariff(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <p className="text-[11px] md:text-sm text-gray-500 border-l-2 border-primary pl-4 italic leading-relaxed">
              {t.calc.areaNote}
            </p>
          </div>

          {/* Правая часть: Результаты с фиксированной высотой строк */}
          <div className="flex flex-col gap-2 bg-bgDark/50 p-5 md:p-8 rounded-xl border border-white/5 h-full">
            {[
              { label: t.calc.capLabel, ref: capacityRef, color: 'text-white' },
              { label: t.calc.costLabel, ref: costRef, color: 'text-white' },
              { label: t.calc.saveLabel, ref: savingsRef, color: 'text-success' },
              { label: t.calc.pbLabel, ref: paybackRef, color: 'text-primary' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 py-3 min-h-[64px] sm:min-h-[40px] gap-1">
                <span className="text-xs md:text-sm text-gray-400">{item.label}</span>
                <span 
                  ref={item.ref} 
                  className={`text-lg md:text-xl font-bold tabular-nums ${item.color} break-all sm:break-normal`}
                >
                  0
                </span>
              </div>
            ))}

            <button className="w-full mt-6 bg-primary hover:bg-white text-black py-4 rounded-xl font-bold transition-all active:scale-[0.98] text-sm md:text-base shadow-lg shadow-primary/20">
              {t.calc.btn}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}