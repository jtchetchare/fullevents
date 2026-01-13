import Image from "next/image";
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, Users, Globe, ChevronRight } from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "contact@fullevent.com",
      description: "Réponse sous 24h",
      color: "bg-black ",
      buttonText: "Envoyer un email",
      link: "mailto:contact@fullevent.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      details: "+221 78 751 72 25",
      description: "Disponible, 9h-18h",
      color: "bg-black",
      buttonText: "Appeler maintenant",
      link: "tel:+221787517225"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Chat en direct",
      details: "Disponible 24/7",
      description: "Support instantané",
      color: "bg-black",
      buttonText: "Démarrer le chat",
      link: "#chat"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Bureau",
      details: "Liberté 6 Scat Urbam",
      description: "Rue GY-602 Dakar, Senegal",
      color: "bg-black",
      buttonText: "Voir sur la carte",
      link: "https://www.google.com/maps/search/libert%C3%A9+6+khar+yalla/@14.7287902,-17.4541919,19z?entry=s&sa=X&ved=1t%3A199789"
    }
  ];

  const faqs = [
    { question: "Comment créer un événement ?", answer: "Utilisez notre tableau de bord intuitif." },
    { question: "Quels types d'événements organisez-vous ?", answer: "Mariages, conférences, concerts, etc." },
    { question: "Quels sont vos tarifs ?", answer: "Forfaits adaptés à chaque besoin." },
    { question: "Puis-je annuler mon événement ?", answer: "Oui, selon nos conditions générales." }
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Comment nous contacter ?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Nous sommes là pour vous accompagner à chaque étape de votre projet événementiel
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Colonne gauche - Image et texte */}
          <div className="space-y-8">
            {/* Carte image principale */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/Aide.png"
                alt="Notre équipe de support FULL EVENT"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Notre équipe dédiée</h3>
                <p className="text-white/90">Des experts à votre écoute 7j/7</p>
              </div>
            </div>

            {/* Texte descriptif */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-black  rounded-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Un support personnalisé
                  </h3>
                  <p className="text-gray-300">
                    Parcourez notre FAQ et, si vous ne trouvez pas ce que vous cherchez,
                    nos experts se feront un plaisir de répondre à vos questions.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Réponse sous 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Support multilingue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Méthodes de contact */}
          <div className="space-y-8">
            {/* Cartes de contact */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${method.color} mb-4`}>
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-300 font-medium mb-1">{method.details}</p>
                  <p className="text-gray-500 text-sm mb-4">{method.description}</p>
                  <a
                    href={method.link}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    {method.buttonText}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            {/* Formulaire de contact rapide */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Nom complet</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E3C32F] focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E3C32F] focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Sujet</label>
                  <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E3C32F] focus:border-transparent">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="event">Organisation d'événement</option>
                    <option value="technical">Support technique</option>
                    <option value="partnership">Partenariat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E3C32F] focus:border-transparent resize-none"
                    placeholder="Décrivez-nous votre projet ou votre question..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#E3C32F] to-[#f0d558] text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* FAQ rapide */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Questions fréquentes</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="group">
                    <details className="bg-gray-800 rounded-lg p-4 cursor-pointer">
                      <summary className="flex justify-between items-center text-white font-medium">
                        <span>{faq.question}</span>
                        <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-3 text-gray-300 pl-4">{faq.answer}</p>
                    </details>
                  </div>
                ))}
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 text-[#E3C32F] hover:text-[#f0d558] transition-colors font-medium"
                >
                  Voir toutes les questions
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA final */}
        {/*<div className="mt-16 text-center">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-12 border border-gray-800">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Prêt à créer un événement inoubliable ?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers d'organisateurs qui nous font déjà confiance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  Démarrer gratuitement
                </button>
                <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  Réserver une démo
                </button>
              </div>
            </div>
          </div>
        </div>*/}
      </div>
    </section>
  );
}