'use client';

import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    // Корневой контейнер подвала: темный фон, верхняя граница для визуального отделения
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Главная сетка навигации: 1 колонка (мобилки), 2 колонки (планшеты), 4 колонки (десктопы) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Колонка 1: Идентификация компании и юридическая информация */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Proxima <span className="text-[#FFB800]">Energy</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Комплексное выполнение работ в строительстве объектов ВИЭ. Проектирование, строительство и эксплуатация фотоэлектрических станций.
            </p>
            {/* Блок с реквизитами повышает доверие (Trust Factor) в B2B */}
            <div className="text-gray-500 mt-2 space-y-1">
              <p>ООО «PROXIMA ENERGY»</p>
              <p>ИНН: 309 254 118</p> {/* Заглушка, замени на реальный ИНН */}
            </div>
          </div>

          {/* Колонка 2: Быстрая навигация (Anchor links) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold uppercase tracking-wider mb-2">Навигация</h4>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-gray-400 hover:text-[#FFB800] transition-colors w-fit">О компании</a>
              <a href="#" className="text-gray-400 hover:text-[#FFB800] transition-colors w-fit">Калькулятор окупаемости</a>
              <a href="#" className="text-gray-400 hover:text-[#FFB800] transition-colors w-fit">Собственное производство</a>
              <a href="#" className="text-gray-400 hover:text-[#FFB800] transition-colors w-fit">Реализованные проекты</a>
            </nav>
          </div>

          {/* Колонка 3: Услуги (Техническая спецификация) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold uppercase tracking-wider mb-2">Услуги</h4>
            <ul className="flex flex-col gap-3 text-gray-400">
              <li>Проектирование СЭС (Engineering)</li>
              <li>Поставка оборудования (Procurement)</li>
              <li>Строительство и монтаж (Construction)</li>
              <li>Сервисное обслуживание (O&M)</li>
              <li>Энергоаудит предприятий</li>
            </ul>
          </div>

          {/* Колонка 4: Контакты и Социальные сети */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold uppercase tracking-wider mb-2">Связь с нами</h4>
            <div className="flex flex-col gap-3 text-gray-400">
              <a href="tel:+998951153333" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#FFB800]" />
                +998 95 115 33 33
              </a>
              <a href="mailto:info@proximaenergy.uz" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#FFB800]" />
                info@proximaenergy.uz
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <span>г. Ташкент, Яккасарайский район, ул. Шота Руставели 73</span>
              </div>
            </div>
            
            {/* Блок иконок социальных сетей. В B2B важно наличие LinkedIn */}
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/proximaenergy.uz" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#FFB800] hover:text-black hover:border-[#FFB800] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#FFB800] hover:text-black hover:border-[#FFB800] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#FFB800] hover:text-black hover:border-[#FFB800] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Нижняя полоса: Копирайт и юридические документы */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500">
          <p>© {new Date().getFullYear()} ООО «PROXIMA ENERGY». Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
          </div>
        </div>

      </div>
    </footer>
  );
}