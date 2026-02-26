'use client';

import { Instagram, Facebook, Mail, MapPin, Phone, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-bgDark border-t border-white/10 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="flex flex-col gap-6">
            <a href="#hero" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Proxima <span className="text-primary">Energy</span>
              </span>
            </a>
            <p className="text-gray-400 leading-relaxed">{t.footer.desc}</p>
            <div className="text-gray-500 mt-2 space-y-1">
              <p>ООО «PROXIMA ENERGY»</p>
              <p>ИНН: 309 254 118</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold uppercase tracking-wider mb-2">{t.footer.nav}</h4>
            <nav className="flex flex-col gap-3">
              <a href="#calculator" className="text-gray-400 hover:text-primary transition-colors w-fit">{t.header.calc}</a>
              <a href="#production" className="text-gray-400 hover:text-primary transition-colors w-fit">{t.header.prod}</a>
              <a href="#portfolio" className="text-gray-400 hover:text-primary transition-colors w-fit">{t.header.proj}</a>
              <a href="#process" className="text-gray-400 hover:text-primary transition-colors w-fit">{t.header.steps}</a>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold uppercase tracking-wider mb-2">{t.footer.serv}</h4>
            <ul className="flex flex-col gap-3 text-gray-400">
              <li>{t.footer.serv1}</li>
              <li>{t.footer.serv2}</li>
              <li>{t.footer.serv3}</li>
              <li>{t.footer.serv4}</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold uppercase tracking-wider mb-2">{t.footer.cont}</h4>
            <div className="flex flex-col gap-3 text-gray-400">
              <a href="tel:+998951153333" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +998 95 115 33 33
              </a>
              <a href="mailto:info@proximaenergy.uz" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary" /> info@proximaenergy.uz
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{t.contact.addressVal}</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/proximaenergy.uz" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-bgDark hover:border-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-bgDark hover:border-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500">
          <p>© {new Date().getFullYear()} ООО «PROXIMA ENERGY». {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}