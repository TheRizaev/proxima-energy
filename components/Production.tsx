'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Factory, Cpu, ThermometerSun, HardHat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Production() {
  const sectionRef = useRef<HTMLElement>(null);
  const bentoItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bentoItemsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const addToBentoRef = (el: HTMLDivElement | null) => {
    if (el && !bentoItemsRef.current.includes(el)) {
      bentoItemsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-bgDark border-t border-white/5 relative overflow-hidden" id="production">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.prod.title} <span className="text-primary">{t.prod.titleSpan}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">{t.prod.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-fr">
          <div ref={addToBentoRef} className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between group hover:bg-white/10 transition-colors">
            <div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20">
                <Factory className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.prod.card1Title}</h3>
              <p className="text-gray-400 mb-6">{t.prod.card1Desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <div className="text-2xl font-bold text-white">30 м/с</div>
                <div className="text-sm text-gray-500">{t.prod.card1Stat1}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">-15%</div>
                <div className="text-sm text-gray-500">{t.prod.card1Stat2}</div>
              </div>
            </div>
          </div>

          <div ref={addToBentoRef} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col group hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{t.prod.card2Title}</h3>
            <p className="text-gray-400 text-sm">{t.prod.card2Desc}</p>
          </div>

          <div ref={addToBentoRef} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col group hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20">
              <ThermometerSun className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{t.prod.card3Title}</h3>
            <p className="text-gray-400 text-sm">{t.prod.card3Desc}</p>
          </div>

          <div ref={addToBentoRef} className="md:col-span-2 bg-primary border border-primary/50 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <HardHat className="w-6 h-6 text-bgDark" />
                <h3 className="text-2xl font-bold text-bgDark">{t.prod.card4Title}</h3>
              </div>
              <p className="text-bgDark/80 max-w-lg font-medium">{t.prod.card4Desc}</p>
            </div>
            <button className="relative z-10 bg-bgDark text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-900 transition-colors whitespace-nowrap">
              {t.prod.card4Btn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}