'use client'; // Директива для Next.js, указывающая на рендеринг компонента на стороне клиента (CSR)

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Инициализация объекта Lenis для перехвата стандартного события scroll
    const lenis = new Lenis({
      duration: 1.2, // Время интерполяции в секундах
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Математическая функция затухания ease-out
      orientation: 'vertical', // Ось смещения
      smoothWheel: true, // Применение функции к колесу манипулятора
    });

    // Функция синхронизации обновления кадров браузера с расчетами матрицы смещения Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Первичный вызов рекурсивной функции
    requestAnimationFrame(raf);

    // Очистка выделенной памяти и удаление слушателей событий при демонтировании узла
    return () => {
      lenis.destroy();
    };
  }, []); // Пустой массив зависимостей предотвращает повторное выполнение функции

  // Возврат дочерних узлов DOM без изменения иерархии
  return <>{children}</>;
}