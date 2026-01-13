"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";

export default function Title() {
  return (
    <div className="relative overflow-hidden mb-[100px]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}} />
      
      {/* Section avec image de fond */}
      <section className="">
        

        {/* Contenu */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="mb-8 md:mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              <span className="block text-[#E3C32F] drop-shadow-2xl mb-2 animate-[fadeInUp_1s_ease-out] opacity-0 [animation-fill-mode:forwards]">
                L'art de l'organisation
              </span>
              <span className="block text-white/95 mt-2 md:mt-4 text-4xl md:text-5xl lg:text-6xl animate-[fadeInUp_1s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
                au service
              </span>
              <span className="block text-white/90 mt-2 md:mt-4 text-3xl md:text-4xl lg:text-5xl font-medium animate-[fadeInUp_1s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
                d'événements mémorables.
              </span>
            </h1>
          </div>

          {/* Slogan */}
          <div className="mb-10 md:mb-16 animate-[fadeIn_1s_ease-out_0.9s] opacity-0 [animation-fill-mode:forwards]">
            <p className="text-xl md:text-2xl text-white/80 italic font-light max-w-2xl mx-auto">
              "Des expériences uniques, chaque fois."
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto animate-[scaleIn_0.8s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
            <div className="relative group">
              <Input
                type="search"
                id="search"
                className="bg-white/90
                  backdrop-blur-md
                  text-gray-900
                  text-lg
                  h-14
                  md:h-16
                  pr-16
                  pl-6
                  border-2
                  border-white/40
                  group-hover:border-[#E3C32F]/50
                  focus:border-[#E3C32F]
                  focus:ring-4
                  focus:ring-[#E3C32F]/20
                  rounded-2xl
                  shadow-2xl
                  transition-all
                  duration-300
                  placeholder:text-gray-600
                "
                placeholder="Recherchez un événement, une date, un lieu, une catégorie..."
              />
              <Button 
                className="
                  absolute 
                  right-2 
                  top-1/2 
                  -translate-y-1/2 
                  h-10 
                  w-10
                  md:h-12
                  md:w-12
                  p-0
                  rounded-xl
                  bg-[#E3C32F]
                  hover:bg-[#d4b329]
                  border-2
                  border-white/20
                  text-white
                  shadow-xl
                  hover:shadow-2xl
                  hover:scale-110
                  transition-all
                  duration-300
                  group-hover:border-[#E3C32F]/40
                "
              >
                <Search className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </div>
            
            {/* Suggestions rapides */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {['Mariage', 'Conférence', 'Anniversaire', 'Concert', 'Soirée'].map((tag) => (
                <button
                  key={tag}
                  className="
                    px-4 py-2
                    bg-white/10
                    backdrop-blur-sm
                    text-white/90
                    text-sm
                    rounded-full
                    border border-white/20
                    hover:bg-white/20
                    hover:text-white
                    transition-colors
                    duration-200
                  "
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
}