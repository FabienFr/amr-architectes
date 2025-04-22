import { Home, Hammer, Maximize, Palette } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Construire neuf",
      description: "Spécialisés dans l'éco-construction avec matériaux biosourcés et géosourcés pour des bâtiments durables, sains et performants.",
      icon: <Home className="w-12 h-12" />,
    },
    {
      title: "Rénover",
      description: "Valoriser votre patrimoine grâce à une rénovation durable : amélioration énergétique, restructuration, réhabilitation.",
      icon: <Hammer className="w-12 h-12" />,
    },
    {
      title: "Agrandir",
      description: "Optimiser vos espaces avec une extension sur mesure, en maison individuelle ou en copropriété.",
      icon: <Maximize className="w-12 h-12" />,
    },
    {
      title: "Décoration intérieure",
      description: "Sublimer votre cadre de vie avec des solutions sur mesure alliant esthétisme et fonctionnalité.",
      icon: <Palette className="w-12 h-12" />,
    },
  ];

  return (
    <section className="py-24 bg-white text-black px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-norwester text-4xl md:text-5xl text-center mb-16">Nos domaines d&apos;intervention</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="rounded-full border-3 border-black p-12 inline-flex items-center justify-center mb-6">{service.icon}</div>
              <h3 className="font-font-norwester text-2xl mb-4">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="font-norwester text-2xl mb-6">Planifiez un appel avec un architecte</h3>
          <button className="border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 px-8 py-3 rounded-none">Jetez vos idées ici</button>
        </div>
      </div>
    </section>
  );
}
