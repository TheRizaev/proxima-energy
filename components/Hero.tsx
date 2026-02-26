'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.fromTo(bgRef.current, { scale: 1.15 }, { scale: 1, duration: 12, ease: "none" });
    tl.fromTo(badgeRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" })
      .fromTo(titleLinesRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }, "-=0.7")
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(buttonsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(statsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
  }, []);

  const addToTitleRef = (el: HTMLSpanElement | null) => {
    if (el && !titleLinesRef.current.includes(el)) titleLinesRef.current.push(el);
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center bg-bgDark text-white overflow-hidden pt-28 md:pt-0">
      <div ref={bgRef} className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop)' }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
      <div className="absolute inset-0 z-0 bg-black/30" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col justify-center pt-5 md:pt-20 pb-16 md:pb-0">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight break-words">
            <span ref={addToTitleRef} className="block overflow-hidden pb-1">{t.hero.title1}</span>
            <span ref={addToTitleRef} className="block overflow-hidden pb-1">{t.hero.title2}</span>
            <span ref={addToTitleRef} className="block overflow-hidden pb-1 text-primary">{t.hero.title3}</span>
          </h1>

          <p ref={descRef} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">{t.hero.desc}</p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="group bg-primary text-bgDark px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-white hover:scale-[1.02] active:scale-95">
              {t.hero.btnPrimary}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="px-8 py-4 rounded-xl font-semibold text-white bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/10">
              {t.hero.btnSecondary}
            </button>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-3xl">
            <div>
              <div className="text-3xl font-bold text-white mb-1">100+</div>
              <div className="text-sm text-gray-400">{t.hero.stat1}</div>
            </div>
            <div className="hidden md:block">
              <div className="text-3xl font-bold text-white mb-1">10 МВт</div>
              <div className="text-sm text-gray-400">{t.hero.stat2}</div>
            </div>
            <div>
              <div className="text-3xl font-bold flex items-center gap-2 text-success mb-1">
                <ShieldCheck className="w-6 h-6" /> 25
              </div>
              <div className="text-sm text-gray-400">{t.hero.stat3}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}