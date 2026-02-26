import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll"; // Относительный путь импорта функции

// Инициализация шрифта
const inter = Inter({ subsets: ["latin", "cyrillic"] });

// Массив метаданных для поисковой индексации
export const metadata: Metadata = {
  title: "Proxima Energy | Солнечные электростанции для бизнеса",
  description: "Проектирование и строительство СЭС под ключ в Узбекистане.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      {/* Задание базовых параметров рендеринга: шрифт, цвет фона (#0A0A0A) и цвет шрифта */}
      <body className={`${inter.className} bg-[#0A0A0A] text-white antialiased`}>
        {/* Инъекция логики Lenis в дерево DOM */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}