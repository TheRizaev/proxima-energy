'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Language, dictionaries } from '../dictionaries';

// Определение интерфейса контекста
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof dictionaries['ru']; // Функция получения текущего словаря
}

// Создание объекта контекста
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Компонент-провайдер, оборачивающий дерево DOM
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Инициализация состояния. По умолчанию 'ru'
  const [language, setLanguageState] = useState<Language>('ru');

  // Функция для обновления состояния и записи выбора в локальное хранилище браузера
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('appLanguage', lang);
    }
  };

  // Проверка сохраненного языка при монтировании компонента на клиенте
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') as Language;
    if (savedLang && ['ru', 'uz', 'en'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  // Переменная t содержит активный словарь в зависимости от стейта language
  const t = dictionaries[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Пользовательский хук для быстрого доступа к контексту в компонентах
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}