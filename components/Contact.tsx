'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  // Состояния для хранения введенных данных
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998',
    company: ''
  });

  // Состояния интерфейса: загрузка и успешная отправка
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setIsSubmitting(true);

    // Здесь позже будет реальный POST-запрос на твой FastAPI бэкенд.
    // Пока эмулируем задержку сети (2 секунды) для показа анимации загрузки.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Сбрасываем форму после успешной отправки
      setFormData({ name: '', phone: '+998', company: '' });
      
      // Возвращаем кнопку в исходное состояние через 3 секунды
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  return (
    <section className="py-24 bg-bgDark border-t border-white/5 relative overflow-hidden">
      {/* Фоновый декоративный элемент (свечение) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* ЛЕВАЯ ЧАСТЬ: Контакты и призыв к действию */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Готовы обсудить <br/>
              <span className="text-primary">ваш проект?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              Оставьте заявку, и наш главный инженер свяжется с вами для бесплатной консультации и предварительного аудита объекта.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Телефон отдела продаж</div>
                  <a href="tel:+998951153333" className="text-xl font-semibold text-white hover:text-primary transition-colors">
                    +998 95 115 33 33
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Электронная почта</div>
                  <a href="mailto:info@proximaenergy.uz" className="text-xl font-semibold text-white hover:text-primary transition-colors">
                    info@proximaenergy.uz
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Центральный офис</div>
                  <div className="text-lg text-white max-w-[250px]">
                    г. Ташкент, Яккасарайский район, ул. Шота Руставели 73
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ: Интерактивная форма */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Поле: Имя */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Как к вам обращаться?</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-bgDark border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Иван Иванов"
                />
              </div>

              {/* Поле: Телефон */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-400">Номер телефона</label>
                <input 
                  type="tel" 
                  id="phone"
                  required
                  // Простая регулярка для проверки формата (минимум 12 символов для +998XXXXXXXXX)
                  minLength={13}
                  maxLength={13}
                  value={formData.phone}
                  onChange={(e) => {
                    // Разрешаем вводить только цифры и плюс
                    const val = e.target.value.replace(/[^\d+]/g, '');
                    setFormData({...formData, phone: val});
                  }}
                  className="bg-bgDark border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              {/* Поле: Компания */}
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="company" className="text-sm font-medium text-gray-400">Название компании (опционально)</label>
                <input 
                  type="text" 
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="bg-bgDark border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="ООО 'Ваша Компания'"
                />
              </div>

              {/* Кнопка отправки с динамическим состоянием */}
              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  isSuccess 
                    ? 'bg-success text-white' 
                    : 'bg-primary text-bgDark hover:bg-yellow-400 hover:-translate-y-1'
                } disabled:opacity-70 disabled:hover:translate-y-0`}
              >
                {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                {isSuccess && <CheckCircle2 className="w-5 h-5" />}
                {!isSubmitting && !isSuccess && "Получить консультацию"}
                {isSubmitting && "Отправка..."}
                {isSuccess && "Заявка принята!"}
              </button>

              <p className="text-xs text-center text-gray-500 mt-2">
                Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}