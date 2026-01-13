import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Shield,
  Heart,
  ChevronRight,
  Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "À propos", href: "/about" },
    { name: "Carrières", href: "/careers" },
    { name: "Presse", href: "/press" },
    { name: "Blog", href: "/blog" },
    { name: "Nous contacter", href: "/contact" },
  ];

  const eventLinks = [
    { name: "Créer un événement", href: "/create" },
    { name: "Explorer les événements", href: "/events" },
    { name: "Événements populaires", href: "/events/popular" },
    { name: "Événements à venir", href: "/events/upcoming" },
    { name: "Événements passés", href: "/events/past" },
  ];

  const resourcesLinks = [
    { name: "Centre d'aide", href: "/help" },
    { name: "FAQ", href: "/faq" },
    { name: "Guide d'organisation", href: "/guide" },
  ];

  const legalLinks = [
    { name: "Conditions d'utilisation", href: "/terms" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
    { name: "Mentions légales", href: "/legal" },
    { name: "CGV", href: "/cgv" },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", href: "https://facebook.com/fullevent" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", href: "https://twitter.com/fullevent" },
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", href: "https://instagram.com/fullevent" },
    { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", href: "https://linkedin.com/company/fullevent" },
    { icon: <Youtube className="w-5 h-5" />, name: "YouTube", href: "https://youtube.com/fullevent" },
  ];

  const appStores = [
    { 
      name: "App Store", 
      href: "https://apps.apple.com/app/fullevent",
      icon: "https://cdn-icons-png.flaticon.com/512/888/888841.png"
    },
    { 
      name: "Google Play", 
      href: "https://play.google.com/store/apps/details?id=com.fullevent",
      icon: "https://cdn-icons-png.flaticon.com/512/888/888857.png"
    }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Restez informé des derniers événements
              </h3>
              <p className="text-gray-400">
                Recevez nos conseils d'organisation et découvrez les événements près de chez vous
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-3 bg-white/10 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E3C32F] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-[#E3C32F] to-[#f0d558] text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  S'abonner
                </button>
              </form>
              <p className="text-gray-500 text-sm mt-3">
                En vous abonnant, vous acceptez notre politique de confidentialité
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Logo et description */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-15 h-15 bg-black  rounded-lg flex items-center justify-center">
                    <Image
                        src="/logo2.png" 
                        alt="Logo FULL EVENT"
                        width={100} 
                        height={300} 
                    />
                  </div>
                  <span className="text-2xl font-bold text-white">FULL EVENT</span>
                </div>
              </Link>
              <p className="text-gray-400 mb-8 max-w-md">
                Plateforme tout-en-un pour l'organisation d'événements mémorables.
                De la création à l'exécution, nous vous accompagnons à chaque étape.
              </p>
              
              {/* Contact info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5" />
                  <span>contact@fullevent.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5" />
                  <span>+221 78 751 7225</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>Liberté 6 Khar Yallah, Rue GY-602 Dakar</span>
                </div>
              </div>

              {/* Stores */}
              <div className="flex flex-wrap gap-3 mb-8">
                {appStores.map((store, index) => (
                  <a
                    key={index}
                    href={store.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <img 
                      src={store.icon} 
                      alt={store.name}
                      className="w-5 h-5"
                    />
                    <div className="text-white text-sm">
                      <div className="text-xs text-gray-400">Disponible sur</div>
                      <div className="font-medium">{store.name}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Liens rapides */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-[#E3C32F]" />
                Entreprise
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#E3C32F] transition-colors flex items-center gap-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#E3C32F]" />
                Événements
              </h4>
              <ul className="space-y-3">
                {eventLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#E3C32F] transition-colors flex items-center gap-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#E3C32F]" />
                Ressources
              </h4>
              <ul className="space-y-3">
                {resourcesLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#E3C32F] transition-colors flex items-center gap-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t border-gray-800 my-12"></div>

          {/* Bas du footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright et liens légaux */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-gray-500">
                © {currentYear} FULL EVENT. Tous droits réservés.
              </p>
              <div className="flex flex-wrap gap-4">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social et langue */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Langue */}
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <select className="bg-transparent text-gray-300 border-0 focus:outline-none focus:ring-0">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              {/* Social */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          
        </div>
      </div>

      
    </footer>
  );
}