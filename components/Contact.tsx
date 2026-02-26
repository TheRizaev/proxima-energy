'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '+998', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '+998', company: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 2000);
  };

  return (
    <section className="py-24 bg-bgDark border-t border-white/5 relative overflow-hidden" id="contact">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t.contact.title} <br/><span className="text-primary">{t.contact.titleSpan}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">{t.contact.desc}</p>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">{t.contact.phone}</div>
                  <a href="tel:+998951153333" className="text-xl font-semibold text-white hover:text-primary transition-colors">+998 95 115 33 33</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">{t.contact.email}</div>
                  <a href="mailto:info@proximaenergy.uz" className="text-xl font-semibold text-white hover:text-primary transition-colors">info@proximaenergy.uz</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">{t.contact.address}</div>
                  <div className="text-lg text-white max-w-[250px]">{t.contact.addressVal}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">{t.contact.formName}</label>
                <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-bgDark border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder={t.contact.formNamePh} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-400">{t.contact.formPhone}</label>
                <input type="tel" id="phone" required minLength={13} maxLength={13} value={formData.phone} onChange={(e) => { const val = e.target.value.replace(/[^\d+]/g, ''); setFormData({...formData, phone: val}); }} className="bg-bgDark border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="company" className="text-sm font-medium text-gray-400">{t.contact.formComp}</label>
                <input type="text" id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="bg-bgDark border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder={t.contact.formCompPh} />
              </div>

              <button type="submit" disabled={isSubmitting || isSuccess} className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${isSuccess ? 'bg-success text-white' : 'bg-primary text-bgDark hover:bg-white hover:-translate-y-1'} disabled:opacity-70 disabled:hover:translate-y-0`}>
                {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                {isSuccess && <CheckCircle2 className="w-5 h-5" />}
                {!isSubmitting && !isSuccess && t.contact.btnInit}
                {isSubmitting && t.contact.btnLoad}
                {isSuccess && t.contact.btnSucc}
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">{t.contact.terms}</p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}