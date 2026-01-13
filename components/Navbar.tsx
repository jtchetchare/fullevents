"use client"

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogOut, Settings, Calendar, Ticket } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const services = [
    { name: 'Consultation', href: '/services/consultation' },
    { name: 'Formation', href: '/services/formation' },
    { name: 'Support', href: '/services/support' }
  ];

  const events = [
    { name: 'Événements à venir', href: '/evenements/a-venir' },
    { name: 'Événements passés', href: '/evenements/passes' },
    { name: 'Réservation', href: '/evenements/reservation' }
  ];

  // Vérifier l'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        
        // Récupérer les données utilisateur depuis Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData({
              displayName: user.displayName || "Utilisateur",
              email: user.email
            });
          }
        } catch (error) {
          console.error("Erreur récupération données:", error);
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUserData(null);
      setProfileOpen(false);
      router.push('/login');
    } catch (error) {
      console.error("Erreur déconnexion:", error);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="shadow-lg text-white fixed top-0 bg-black/80 backdrop-blur-md left-0 right-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo2.png" 
                alt="Logo FULL EVENT"
                width={100} 
                height={40}
                className=""
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-[#E3C32F] transition-colors">
              Accueil
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-[#E3C32F] transition-colors">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-3 text-white hover:bg-white/10 hover:text-[#E3C32F] first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Événements Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-[#E3C32F] transition-colors">
                Événements
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {events.map((event) => (
                  <Link
                    key={event.name}
                    href={event.href}
                    className="block px-4 py-3 text-white hover:bg-white/10 hover:text-[#E3C32F] first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {event.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/galerie" className="text-white hover:text-[#E3C32F] transition-colors">
              Galerie
            </Link>

            <Link href="/faqs" className="text-white hover:text-[#E3C32F] transition-colors">
              FAQs
            </Link>

            {/* Profil Utilisateur */}
            {loading ? (
              <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse"></div>
            ) : isAuthenticated ? (
              <div className="relative group">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 text-white hover:text-[#E3C32F] transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#E3C32F] to-[#C9A926] flex items-center justify-center text-black font-semibold text-sm">
                    {userData?.displayName ? getInitials(userData.displayName) : "U"}
                  </div>
                  <span className="hidden lg:inline">{userData?.displayName?.split(' ')[0] || "Profil"}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Dropdown Profil */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-20">
                    {/* En-tête profil */}
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#E3C32F] to-[#C9A926] flex items-center justify-center text-black font-bold">
                          {userData?.displayName ? getInitials(userData.displayName) : "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{userData?.displayName || "Utilisateur"}</p>
                          <p className="text-xs text-gray-400">{userData?.email || ""}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Liens profil */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-3 text-white hover:bg-white/10 hover:text-[#E3C32F] transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Mon profil
                      </Link>
                      <Link
                        href="/mes-reservations"
                        className="flex items-center px-4 py-3 text-white hover:bg-white/10 hover:text-[#E3C32F] transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Ticket className="h-4 w-4 mr-3" />
                        Mes réservations
                      </Link>
                      <Link
                        href="/mes-evenements"
                        className="flex items-center px-4 py-3 text-white hover:bg-white/10 hover:text-[#E3C32F] transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Calendar className="h-4 w-4 mr-3" />
                        Mes événements
                      </Link>
                      <Link
                        href="/parametres"
                        className="flex items-center px-4 py-3 text-white hover:bg-white/10 hover:text-[#E3C32F] transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Paramètres
                      </Link>
                    </div>
                    
                    {/* Séparateur */}
                    <div className="border-t border-white/10"></div>
                    
                    {/* Déconnexion */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-white hover:text-[#E3C32F] transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/login?tab=register"
                  className="bg-gradient-to-r from-[#E3C32F] to-[#C9A926] text-black px-5 py-2 rounded-lg hover:from-[#f0d14c] hover:to-[#e0c030] transition-all font-semibold"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#E3C32F]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-white hover:bg-white/10 hover:text-[#E3C32F] rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>

            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-white hover:bg-white/10 hover:text-[#E3C32F] rounded-md"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="pl-4">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block px-3 py-2 text-white/80 hover:bg-white/10 hover:text-[#E3C32F] rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Événements Dropdown */}
            <div>
              <button
                onClick={() => setEventsOpen(!eventsOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-white hover:bg-white/10 hover:text-[#E3C32F] rounded-md"
              >
                Événements
                <ChevronDown className={`h-4 w-4 transition-transform ${eventsOpen ? 'rotate-180' : ''}`} />
              </button>
              {eventsOpen && (
                <div className="pl-4">
                  {events.map((event) => (
                    <Link
                      key={event.name}
                      href={event.href}
                      className="block px-3 py-2 text-white/80 hover:bg-white/10 hover:text-[#E3C32F] rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      {event.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/galerie"
              className="block px-3 py-2 text-white hover:bg-white/10 hover:text-[#E3C32F] rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Galerie
            </Link>

            <Link
              href="/faqs"
              className="block px-3 py-2 text-white hover:bg-white/10 hover:text-[#E3C32F] rounded-md"
              onClick={() => setIsOpen(false)}
            >
              FAQs
            </Link>

            {/* Section authentification mobile */}
            <div className="pt-4 border-t border-white/10">
              {loading ? (
                <div className="px-3 py-2">
                  <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                <>
                  <div className="px-3 py-2 mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#E3C32F] to-[#C9A926] flex items-center justify-center text-black font-semibold text-sm">
                        {userData?.displayName ? getInitials(userData.displayName) : "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{userData?.displayName || "Utilisateur"}</p>
                        <p className="text-xs text-gray-400">{userData?.email || ""}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/profile"
                    className="flex items-center px-3 py-2 text-white hover:bg-white/10 hover:text-[#E3C32F] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Mon profil
                  </Link>
                  
                  <Link
                    href="/mes-reservations"
                    className="flex items-center px-3 py-2 text-white hover:bg-white/10 hover:text-[#E3C32F] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Ticket className="h-4 w-4 mr-3" />
                    Mes réservations
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center px-3 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-md"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-white hover:bg-white/10 hover:text-[#E3C32F] rounded-md mb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/login?tab=register"
                    className="block text-center bg-gradient-to-r from-[#E3C32F] to-[#C9A926] text-black px-6 py-2 rounded-lg hover:from-[#f0d14c] hover:to-[#e0c030] font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overlay pour fermer le dropdown */}
      {profileOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setProfileOpen(false)}
        />
      )}
    </nav>
  );
}