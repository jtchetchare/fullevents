"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Mail, Star } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: "Josué Tchetchare",
    role: "Directeur Artistique & Tresorier ",
    description: "Architecte de la santé financière & Gardien de la viabilité des projets.",
    image: "/ray.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "alexandre@fullevent.com"
    },
    skills: ["Stratégie", "Leadership", "Innovation"]
  },
  {
    id: 2,
    name: "Francky Lembe",
    role: "CEO & Fondateur",
    description: "Designer événementielle primé, il donne vie à chaque projet avec créativité et précision.",
    image: "/Francky.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "sophie@fullevent.com"
    },
    skills: ["Créativité", "Design", "Direction artistique"]
  },
  {
    id: 3,
    name: "Josh Tanga",
    role: "Responsable Multimedia",
    description: "Responsable Multimédia avec 7 ans d'expertise dans la création d'écosystèmes digitaux pour événements.",
    image: "/Josh.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "thomas@fullevent.com"
    },
    skills: ["Logistique", "Technique", "Coordination"]
  },
  {
    id: 4,
    name: "Belly Carter",
    role: "Chef de Projet",
    description: "Organisateur méthodique, il assure la gestion parfaite de chaque détail événementiel.",
    image: "/Belly.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "marie@fullevent.com"
    },
    skills: ["Gestion", "Planification", "Communication"]
  },
  {
    id: 5,
    name: "Salomon Houl",
    role: "Responsable Partenariats",
    description: "Connecteur né, il bâtit des relations durables avec nos partenaires et fournisseurs.",
    image: "/Salo.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "julien@fullevent.com"
    },
    skills: ["Réseau", "Négociation", "Partnariats"]
  },
  {
    id: 6,
    name: "Jasmin Didi",
    role: "Spécialiste Marketing",
    description: "Stratège en communication, il donne de la visibilité à chaque événement.",
    image: "/Jasmin.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "emma@fullevent.com"
    },
    skills: ["Marketing", "Communication", "Stratégie"]
  }
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleMembers, setVisibleMembers] = useState(3); // Nombre de cartes visibles

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === teamMembers.length - visibleMembers ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? teamMembers.length - visibleMembers : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Ajuste le nombre de cartes visibles selon la largeur d'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleMembers(1);
      } else if (window.innerWidth < 1024) {
        setVisibleMembers(2);
      } else {
        setVisibleMembers(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play optionnel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Rencontrez notre équipe
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Des experts passionnés qui donnent vie à vos événements
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Boutons de navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 border border-gray-700 shadow-xl"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 border border-gray-700 shadow-xl"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div 
              className={`flex gap-6 transition-transform duration-500 ease-out ${
                isAnimating ? 'opacity-90' : 'opacity-100'
              }`}
              style={{ 
                transform: `translateX(calc(-${currentIndex * (100 / visibleMembers)}% - ${currentIndex * 1.5}rem))`,
                width: `calc(${(teamMembers.length / visibleMembers) * 100}% + ${(teamMembers.length - visibleMembers) * 1.5}rem)`
              }}
            >
              {teamMembers.map((member, index) => {
                const isVisible = index >= currentIndex && index < currentIndex + visibleMembers;
                
                return (
                  <div
                    key={member.id}
                    className={`flex-shrink-0 w-full ${
                      visibleMembers === 1 ? 'max-w-md' : 
                      visibleMembers === 2 ? 'max-w-lg' : 
                      'max-w-md'
                    } mx-auto transition-all duration-500 ${
                      isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
                    }`}
                  >
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-gray-700">
                      {/* Photo */}
                      <div className="relative h-64 md:h-72 bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-800">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </div>
                        
                        {/* Badge rôle */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-gradient-to-r from-[#E3C32F] to-[#f0d558] text-gray-900 text-sm font-bold rounded-full">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* Contenu */}
                      <div className="p-6">
                        {/* Nom */}
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {member.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 mb-4">
                          {member.description}
                        </p>

                        {/* Compétences */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {member.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Social */}
                        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                          <div className="flex items-center gap-3">
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="w-5 h-5 text-gray-300" />
                            </a>
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                              aria-label="Twitter"
                            >
                              <Twitter className="w-5 h-5 text-gray-300" />
                            </a>
                            <a
                              href={`mailto:${member.social.email}`}
                              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                              aria-label="Email"
                            >
                              <Mail className="w-5 h-5 text-gray-300" />
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-gray-300 text-sm">Expert</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Indicateurs */}
        <div className="flex flex-col items-center gap-8 mt-12">
          {/* Points de navigation */}
          <div className="flex gap-3">
            {Array.from({ length: teamMembers.length - visibleMembers + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#E3C32F] w-8' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                aria-label={`Aller au membre ${index + 1}`}
              />
            ))}
          </div>

          {/* Info de slide actuel */}
          <div className="text-center">
            <p className="text-gray-400">
              <span className="text-white font-bold">{currentIndex + 1}</span>
              <span className="mx-2">/</span>
              <span>{teamMembers.length - visibleMembers + 1}</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Glissez ou utilisez les flèches pour naviguer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}