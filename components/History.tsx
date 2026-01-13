import Image from "next/image";

export default function History() {
  return (
    <section className="bg-white text-black py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Colonne de gauche - Texte */}
          <div className="space-y-4 md:space-y-8">
            <div className="space-y-4">
              <span className="text-4xl inline-block  font-semibold text-black uppercase tracking-wider">
                Notre Histoire
              </span>
              <h1 className="text-xl md:text-xl lg:text-xl font-bold leading-tight">
                L'Art de créer
                <span className="block text-[#E3C32F]">des moments inoubliables</span>
              </h1>
            </div>

            <div className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed">
              <p className="border-l-4 border-[#E3C32F] pl-6 py-2 italic bg-gray-50/50 rounded-r-lg">
                "Un événement réussi ne s'improvise pas, il se compose."
              </p>
              
              <p>
                Tout a commencé en <span className="font-semibold text-[#E3C32F]">2025</span>, autour d'une conviction simple : un événement réussi ne s'improvise pas, il se compose. Forts de cette idée, nous avons fondé <span className="font-bold">FULL EVENTS</span> avec l'ambition de réinventer l'expérience événementielle, en mêlant sens créatif et exécution irréprochable.
              </p>
              
              <p>
                Depuis, chaque projet est une partition que nous orchestrons avec la même passion : celle de donner vie à des moments uniques, où émotion et organisation avancent main dans la main.
              </p>
              
              <p>
                Notre philosophie repose sur cet équilibre délicat : la créativité qui inspire, et la rigueur qui garantit. Nous croyons qu'un événement naît de cette alchimie entre audace esthétique et structure solide, entre surprise et maîtrise.
              </p>
            </div>

            {/* Bouton ou statistique optionnel */}
            <div className="pt-4">
              <button className="px-8 py-3 bg-[#E3C32F] text-gray-900 font-semibold rounded-lg hover:bg-[#d4b329] transition-colors duration-300 shadow-lg hover:shadow-xl">
                Découvrir notre équipe
              </button>
            </div>
          </div>

          {/* Colonne de droite - Image */}
          <div className="relative">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/show.jpeg"
                alt="Notre équipe FULL EVENT organisant un événement"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Overlay décoratif */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Cadre décoratif */}
              <div className="absolute -inset-4 border-2 border-[#E3C32F] rounded-2xl transform rotate-3 opacity-30"></div>
            </div>
            
            {/* Badge décoratif sur l'image */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl w-48">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E3C32F]">50+</div>
                <div className="text-sm font-medium text-gray-600 mt-2">Événements organisés</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}