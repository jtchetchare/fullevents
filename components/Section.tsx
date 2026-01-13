"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Calendar, MapPin } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Dance the Night",
    description: "Une nuit entière de musique avec les meilleurs DJs internationaux. Expérience immersive avec mapping vidéo et effets spéciaux.",
    date: "15 Juillet 2026",
    location: "Dakar, Ngor Timis",
    category: "Musique",
    rating: 4.8,
    attendees: "2.5k",
    price: "Gratuit",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
    color: "from-purple-600 to-blue-500"
  },
  {
    id: 2,
    title: "Beach Party",
    description: "Une expérience indescriptible musique, boissons, tout en full ça va être chaud.",
    date: "22 Août 2025",
    location: "Monaco Beach, Dakar",
    category: "Beach",
    rating: 4.9,
    attendees: "1.2k",
    price: "Gratuit",
    image: "/beach.jpg",
    color: "from-blue-600 to-cyan-500"
  },
  {
    id: 3,
    title: "Balade en trottinette électrique",
    description: "Venez profitez d'une balade détente en trottinette électrique avec la communauté.",
    date: "5 Septembre 2025",
    location: "La coriche de Dakar",
    category: "Balade",
    rating: 5.0,
    attendees: "80",
    price: "À partir de 2000 Fcfa",
    image: "/balade.jpg",
    color: "from-amber-600 to-orange-500"
  },
  {
    id: 4,
    title: "Projection du Classico Barcelone VS Real Madrid ",
    description: "Venez vibrer pour votre équipe lors du classico Barcelone VS Real Madrid.",
    date: "30 Août 2025",
    location: "Jardin, Dakar",
    category: "Sport",
    rating: 4.7,
    attendees: "5k",
    price: "Gratuit",
    image: "Match.jpg",
    color: "from-green-600 to-emerald-500"
  },
  {
    id: 5,
    title: "Jour de Match",
    description: "Jour de match FULL EVENT VS TONGO INVESTMENT venez soutenir votre équipe favorite.",
    date: "12 Octobre 2025",
    location: "Yoff virage",
    category: "Sport",
    rating: 4.6,
    attendees: "800",
    price: "Gratuit",
    image: "/day.jpeg",
    color: "from-pink-600 to-rose-500"
  }
];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play optionnel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentEvent = events[currentIndex];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Titre de la section */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-white mb-3">Événements à ne pas manquer</h2>
        <p className="text-gray-400">Découvrez nos événements les plus populaires</p>
      </div>

      {/* Carousel Container */}
      <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
        
        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
          
          {/* Colonne de gauche - Image */}
          <div className="relative h-[350px] lg:h-[400px] rounded-xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isAnimating ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {/* Overlay gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`} />
            </div>
            
            {/* Badge catégorie */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30">
                {currentEvent.category}
              </span>
            </div>
            
            {/* Indicateur de slide */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white w-8' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Aller à l'événement ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Colonne de droite - Texte */}
          <div className="flex flex-col justify-center p-4 lg:p-6">
            {/* Évaluation */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(currentEvent.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-yellow-400 font-semibold">{currentEvent.rating}</span>
              <span className="text-gray-500">({currentEvent.attendees} participants)</span>
            </div>

            {/* Titre */}
            <h3 className={`text-3xl lg:text-4xl font-bold text-white mb-4 transition-colors duration-500 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}>
              {currentEvent.title}
            </h3>

            {/* Description */}
            <p className={`text-gray-300 mb-6 text-lg leading-relaxed transition-colors duration-500 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}>
              {currentEvent.description}
            </p>

            {/* Informations */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">{currentEvent.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">{currentEvent.location}</span>
              </div>
            </div>

            {/* Prix et CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
              <div>
                <span className="text-2xl font-bold text-white">{currentEvent.price}</span>
                <p className="text-gray-500 text-sm">par personne</p>
              </div>
              <button className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl">
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>

        {/* Boutons de navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-gray-700 shadow-lg z-10"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-gray-700 shadow-lg z-10"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Indicateur de progression */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
            style={{ 
              width: `${((currentIndex + 1) / events.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Miniatures des autres événements */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        {events.map((event, index) => (
          <button
            key={event.id}
            onClick={() => goToSlide(index)}
            className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
              index === currentIndex 
                ? 'border-blue-500 scale-105' 
                : 'border-gray-800 hover:border-gray-600'
            }`}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs font-semibold truncate">{event.title}</p>
            </div>
            {index === currentIndex && (
              <div className="absolute inset-0 border-2 border-blue-500 rounded-xl" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}