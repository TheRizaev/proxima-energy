import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Calculator from "@/components/Calculator";
import Production from "@/components/Production";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer"; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A0A] selection:bg-[#FFB800] selection:text-black overflow-hidden">
      <Hero />
      <Clients />
      <Calculator />
      <Production />
      <Portfolio />
      <Contact />
      <Footer /> 
    </main>
  );
}