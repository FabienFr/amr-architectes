"use client";

import { Home, Hammer, Maximize, Palette } from "lucide-react";
import { useState } from "react";
import CallBooking from "./CallBooking";
import { X } from "lucide-react";

export default function ServicesSection() {
  const [showCallBooking, setShowCallBooking] = useState(false);

  const services = [
    {
      title: "Construire neuf",
      subtitle: "Concevoir un bâtiment sain, performant, et adapté à son environnement.",
      description: "Nous utilisons des matériaux biosourcés et géosourcés, pour bâtir durablement — que ce soit pour une maison individuelle, des bureaux ou un projet collectif. Chaque construction est pensée pour durer.",
      icon: <Home className="w-12 h-12" />,
    },
    {
      title: "Rénover",
      subtitle: "Redonner vie à l'existant tout en améliorant le confort et la performance.",
      description: "Nous intervenons sur des bâtiments anciens ou récents pour optimiser les volumes, valoriser le patrimoine et intégrer des solutions durables à haute efficacité énergétique.",
      icon: <Hammer className="w-12 h-12" />,
    },
    {
      title: "Agrandir",
      subtitle: "Gagner de l'espace sans repartir de zéro.",
      description: "Surélévation, extension, restructuration… Nous concevons des solutions sur mesure pour répondre à vos besoins tout en valorisant le bien existant, dans le respect du cadre bâti.",
      icon: <Maximize className="w-12 h-12" />,
    },
    {
      title: "Décoration intérieure",
      subtitle: "Créer un intérieur qui vous ressemble, jusque dans les moindres détails.",
      description: "Du choix des matériaux aux finitions, nous vous accompagnons pour donner vie à vos envies : harmonies, matières, usages… tout est pensé avec soin pour refléter votre quotidien et vos goûts.",
      icon: <Palette className="w-12 h-12" />,
    },
  ];

  const handleOpenCallBooking = () => {
    setShowCallBooking(true);
  };

  const handleCloseCallBooking = () => {
    setShowCallBooking(false);
  };

  return (
    <section className="py-24 bg-white/70 text-black px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-norwester text-4xl md:text-5xl text-center mb-16">Nos domaines d&apos;intervention</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-left">
              <div className="rounded-full border-3 border-black p-12 inline-flex items-center justify-center mb-6">{service.icon}</div>
              <h3 className="font-norwester text-2xl mb-4">{service.title}</h3>
              <h4 className="text-xl mb-4">{service.subtitle}</h4>
              <p className="text-black">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="font-norwester text-2xl mb-6">Planifiez un appel / RDV avec un architecte</h3>
          <button onClick={handleOpenCallBooking} className="text-lg border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 px-8 py-4 rounded-lg">
            Déposez les premières pierres de votre projet
          </button>

          {showCallBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="relative bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <button onClick={handleCloseCallBooking} className="absolute right-4 top-4 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700" aria-label="Fermer">
                  <X className="h-6 w-6" />
                </button>
                <CallBooking />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
