import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import { LanguageProvider } from "../context/LanguageContext"; // Импорт провайдера

const inter = Inter({ subsets: ["latin", "cyrillic"] });

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
      <body className={`${inter.className} bg-bgDark text-white antialiased`}>
        {/* Интеграция глобального стейта языка на весь проект */}
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}