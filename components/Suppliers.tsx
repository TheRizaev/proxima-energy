'use client';

import { useLanguage } from '../context/LanguageContext';

// Список топовых Tier-1 поставщиков
const supplierLogos = [
  { name: 'JinkoSolar', id: 1 },
  { name: 'Huawei', id: 2 },
  { name: 'LONGi', id: 3 },
  { name: 'Sungrow', id: 4 },
  { name: 'Trina Solar', id: 5 },
  { name: 'JA Solar', id: 6 },
  { name: 'Solis', id: 7 },
  { name: 'Growatt', id: 8 },
];

export default function Suppliers() {
  const { t } = useLanguage();

  // Дублируем массив для создания эффекта бесконечной бесшовной карусели
  const duplicatedLogos = [...supplierLogos, ...supplierLogos, ...supplierLogos];

  return (
    <section className="py-20 bg-bgDark border-t border-white/5 overflow-hidden">
      
      {/* Стили для анимации бегущей строки */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="container mx-auto px-6 max-w-7xl mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.suppliers?.title} <span className="text-primary">{t.suppliers?.titleSpan}</span>
          </h2>
          <p className="text-gray-400 text-lg">
            {t.suppliers?.desc}
          </p>
        </div>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Градиенты по бокам для плавного появления/исчезновения */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />

        <div className="flex animate-marquee items-center gap-20 py-4">
          {duplicatedLogos.map((supplier, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center min-w-[150px] grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer"
            >
              {/* Если захотите вставить картинки, закомментируйте h3 и раскомментируйте img */}
              <h3 className="text-3xl font-black text-white tracking-widest uppercase opacity-80">{supplier.name}</h3>
              {/* <img src={`/suppliers/${supplier.name.toLowerCase()}.svg`} alt={supplier.name} className="h-12 object-contain" /> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}