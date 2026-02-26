'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, PenTool, Truck, Activity, ShieldCheck, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Подписка на контекст
  const { t } = useLanguage();

  // Локальная инициализация массивов данных с ключами перевода
  const WORKFLOW = [
    { icon: ClipboardCheck, title: t.process.step1Title, time: t.process.step1Time, desc: t.process.step1Desc },
    { icon: PenTool, title: t.process.step2Title, time: t.process.step2Time, desc: t.process.step2Desc },
    { icon: Truck, title: t.process.step3Title, time: t.process.step3Time, desc: t.process.step3Desc },
    { icon: Activity, title: t.process.step4Title, time: t.process.step4Time, desc: t.process.step4Desc },
    { icon: ShieldCheck, title: t.process.step5Title, time: t.process.step5Time, desc: t.process.step5Desc }
  ];

  const FAQ_DATA = [
    { question: t.process.q1, answer: t.process.a1 },
    { question: t.process.q2, answer: t.process.a2 },
    { question: t.process.q3, answer: t.process.a3 }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(timelineRef.current?.children ? Array.from(timelineRef.current.children) : [], { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: timelineRef.current, start: "top 80%" } });
      gsap.fromTo(faqRef.current?.children ? Array.from(faqRef.current.children) : [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: faqRef.current, start: "top 85%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-bgDark border-t border-white/5" id="process">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.process.title} <span className="text-primary">{t.process.titleSpan}</span>
            </h2>
            <p className="text-gray-400 mb-12">{t.process.desc}</p>

            <div ref={timelineRef} className="relative border-l border-white/10 pl-8 ml-4 flex flex-col gap-10">
              {WORKFLOW.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative group">
                    <div className="absolute -left-[53px] top-0 w-10 h-10 bg-bgDark border-2 border-white/10 rounded-full flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{step.title}</h3>
                      <span className="text-sm font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded">{step.time}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-md">{step.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-12 lg:mt-0">
              {t.process.faqTitle} <span className="text-primary">{t.process.faqSpan}</span>
            </h2>
            <p className="text-gray-400 mb-12">{t.process.faqDesc}</p>

            <div ref={faqRef} className="flex flex-col gap-4">
              {FAQ_DATA.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className={`border border-white/10 rounded-xl overflow-hidden transition-colors ${isOpen ? 'bg-white/5 border-white/20' : 'bg-transparent'}`}>
                    <button onClick={() => setOpenFaqIndex(isOpen ? null : index)} className="w-full flex items-center justify-between p-6 text-left cursor-pointer outline-none focus:ring-2 focus:ring-primary/50">
                      <span className="font-semibold text-white pr-8">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="p-6 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 bg-primary/10 border border-primary/20 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-bold mb-1">{t.process.ctaTitle}</h4>
                <p className="text-sm text-gray-400">{t.process.ctaDesc}</p>
              </div>
              <a href="#contact" className="bg-primary text-bgDark px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors shrink-0 whitespace-nowrap">
                {t.process.ctaBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}