import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Calculator from "@/components/Calculator";
import Production from "@/components/Production";
import Portfolio from "@/components/Portfolio";
import Suppliers from "@/components/Suppliers"; // <--- Импортируем компонент
import Process from "@/components/Process"; 
import Contact from "@/components/Contact";
import Footer from "@/components/Footer"; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A0A] selection:bg-[#FFB800] selection:text-black overflow-hidden relative">
      <Header />
      
      <div id="hero"><Hero /></div>
      <Clients />
      <div id="calculator"><Calculator /></div>
      <div id="production"><Production /></div>
      
      <div id="portfolio"><Portfolio /></div>
            <Suppliers />
      <div id="process"><Process /></div> 
      <div id="contact"><Contact /></div>
      
      <Footer />
    </main>
  );
}