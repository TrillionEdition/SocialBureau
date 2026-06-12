import { Hero } from "./Hero";
import { TeamSelector } from "./TeamSelector";
import { FullRoster } from "./FullRoster";
import { Podcast } from "./Podcast";
import { CTA } from "./CTA";
import TreasureHuntDiamond from "../../components/TreasureHuntDiamond";

export const Team = () => {
  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-pink selection:text-white">
      <main>
        <Hero />
        <TeamSelector />
        <FullRoster />
        <TreasureHuntDiamond 
          stepRequired={2} 
          clueText="Ranjith" 
        />
        <Podcast />
        <CTA />
        
      </main>
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-purple/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brand-pink/5 blur-[150px] rounded-full" />
        
        {/* Subtle grid line effect */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
        />
      </div>
    </div>
  );
};
