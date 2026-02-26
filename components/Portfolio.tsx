'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Zap, MapPin, Leaf, Clock, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    client: "Lukoil Uzbekistan",
    power: "200 кВт",
    location: "Бухарская область",
    payback: "3.2 года",
    co2: "180 тонн",
    modules: "Tier-1 монокристалл",
    image: "https://images.unsplash.com/photo-1708568328382-8daa0944d801?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    client: "Westminster International School",
    power: "150 кВт",
    location: "г. Ташкент",
    payback: "3.5 года",
    co2: "135 тонн",
    modules: "Оптимизаторы мощности",
    image: "https://images.unsplash.com/photo-1724041875334-0a6397111c7e?q=80&w=687&auto=format&fit=crop"
  },
  {
    id: 3,
    client: "Sedat Triko Tashkent",
    power: "500 кВт",
    location: "г. Ташкент",
    payback: "2.8 года",
    co2: "450 тонн",
    modules: "Промышленный инвертор",
    image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 4,
    client: "Agromir Самарканд",
    power: "1.2 МВт",
    location: "г. Самарканд",
    payback: "2.5 года",
    co2: "1080 тонн",
    modules: "Трекерная система",
    image: "https://images.unsplash.com/photo-1617269778723-73a40cf299bd?q=80&w=1470&auto=format&fit=crop"
  }
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%", 
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-bgDark border-t border-white/5 relative" id="portfolio">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Технические <span className="text-primary">кейсы</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Детальный разбор реализованных проектов. Математика окупаемости и спецификации интегрированного оборудования.
            </p>
          </div>
          <button className="flex items-center gap-2 text-white border border-white/20 px-6 py-4 rounded-xl font-semibold transition-colors hover:bg-white/10 shrink-0">
            Запросить референс-лист <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              ref={addToCardsRef}
              className="group relative h-[450px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent transition-opacity duration-500 group-hover:opacity-90 group-hover:bg-[#0A0A0A]/90" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4 transform transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium tracking-wide">{project.location}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                    {project.client}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 overflow-hidden max-h-0 opacity-0 transform translate-y-8 transition-all duration-500 ease-out group-hover:max-h-[200px] group-hover:opacity-100 group-hover:translate-y-0 border-t border-white/10 pt-6">
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Мощность</span>
                    <div className="flex items-center gap-2 text-white">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="font-mono font-bold text-lg">{project.power}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Окупаемость</span>
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-4 h-4 text-[#10B981]" />
                      <span className="font-mono font-bold text-lg">{project.payback}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Снижение CO₂</span>
                    <div className="flex items-center gap-2 text-white">
                      <Leaf className="w-4 h-4 text-[#10B981]" />
                      <span className="font-mono font-bold text-lg">{project.co2}/год</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Оборудование</span>
                    <div className="flex items-center gap-2 text-white">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">{project.modules}</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}