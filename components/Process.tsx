'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, PenTool, Truck, Activity, ShieldCheck, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Строгая структура этапов EPC-контракта (Engineering, Procurement, Construction)
const WORKFLOW = [
  {
    icon: ClipboardCheck,
    title: "Энергоаудит и ТЭО",
    time: "1–3 дня",
    desc: "Анализ графиков электрической нагрузки объекта. 3D-моделирование инсоляции и затенения (Shading Analysis). Расчет Технико-экономического обоснования (ТЭО) с точностью до 98%."
  },
  {
    icon: PenTool,
    title: "Проектирование (P-Stage)",
    time: "7–14 дней",
    desc: "Разработка рабочей документации. Построение однолинейных схем, расчет ветровых (до 30 м/с) и снеговых нагрузок на несущие конструкции. Подбор сечения кабельных трасс."
  },
  {
    icon: Truck,
    title: "Поставка и СМР",
    time: "14–45 дней",
    desc: "Прямая поставка оборудования Tier-1. Монтаж алюминиевых конструкций (сплав 6063-T6), установка фотоэлектрических модулей, прокладка DC/AC трасс и монтаж инверторных узлов."
  },
  {
    icon: Activity,
    title: "Пусконаладка (Commissioning)",
    time: "3–5 дней",
    desc: "Проверка сопротивления изоляции и заземления. Тестовый запуск инверторов, настройка системы удаленного мониторинга генерации и синхронизация с внешней сетью (АСКУЭ)."
  },
  {
    icon: ShieldCheck,
    title: "O&M (Обслуживание)",
    time: "24/7",
    desc: "Постоянный мониторинг телеметрии станции. Превентивное техническое обслуживание, очистка модулей и замена компонентов по гарантии (до 25 лет на сохранение 84% мощности)."
  }
];

// Технический FAQ для снятия возражений B2B сектора
const FAQ_DATA = [
  {
    question: "Требуются ли специальные разрешения от РЭС на установку СЭС?",
    answer: "Если станция работает исключительно на внутреннее потребление объекта (без выдачи излишков в общую сеть), установка производится в уведомительном порядке. Для генерации в сеть по зеленому тарифу мы полностью сопровождаем процесс получения ТУ и сертификации."
  },
  {
    question: "Какова динамика генерации в зимний период и при облачности?",
    answer: "Фотоэлектрические модули генерируют энергию за счет видимого спектра света, а не теплового излучения. При плотной облачности КПД падает на 40-60%, однако генерация не останавливается. Отрицательные температуры (до -40°C) физически увеличивают проводимость кремниевых ячеек, повышая номинальное напряжение."
  },
  {
    question: "Каков реальный процент деградации кремниевых панелей?",
    answer: "Мы используем модули N-type (TOPCon), уровень деградации которых в первый год составляет <1%, а в последующие — не более 0.4% в год. Линейная гарантия производителя подтверждает сохранение минимум 87.4% изначальной мощности через 30 лет эксплуатации."
  }
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // Первый вопрос открыт по умолчанию

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация появления таймлайна (Этапы работы)
      gsap.fromTo(
        timelineRef.current?.children ? Array.from(timelineRef.current.children) : [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          }
        }
      );

      // Анимация появления FAQ
      gsap.fromTo(
        faqRef.current?.children ? Array.from(faqRef.current.children) : [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-bgDark border-t border-white/5" id="process">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* ЛЕВАЯ ЧАСТЬ: EPC Таймлайн (Workflow) */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Алгоритм <span className="text-primary">реализации</span>
            </h2>
            <p className="text-gray-400 mb-12">
              Строгий инженерный подход на каждом этапе EPC-контракта гарантирует соблюдение проектных сроков и расчетных показателей генерации.
            </p>

            <div ref={timelineRef} className="relative border-l border-white/10 pl-8 ml-4 flex flex-col gap-10">
              {WORKFLOW.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative group">
                    {/* Точка на таймлайне */}
                    <div className="absolute -left-[53px] top-0 w-10 h-10 bg-bgDark border-2 border-white/10 rounded-full flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-sm font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ: Технический FAQ */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-12 lg:mt-0">
              Технический <span className="text-primary">FAQ</span>
            </h2>
            <p className="text-gray-400 mb-12">
              Ответы главного инженера на наиболее частые вопросы корпоративных заказчиков.
            </p>

            <div ref={faqRef} className="flex flex-col gap-4">
              {FAQ_DATA.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`border border-white/10 rounded-xl overflow-hidden transition-colors ${isOpen ? 'bg-white/5 border-white/20' : 'bg-transparent'}`}
                  >
                    <button 
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left cursor-pointer outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <span className="font-semibold text-white pr-8">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                    </button>
                    
                    {/* Контент аккордеона анимируется через CSS grid */}
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="p-6 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Блок захвата контактов сразу под FAQ */}
            <div className="mt-12 bg-primary/10 border border-primary/20 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-bold mb-1">Остались вопросы?</h4>
                <p className="text-sm text-gray-400">Наш инженер предоставит точные расчеты для вашего объекта.</p>
              </div>
              <a href="#contact" className="bg-primary text-bgDark px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors shrink-0 whitespace-nowrap">
                Связаться
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}