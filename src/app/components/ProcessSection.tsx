import React from "react";

export default function ProcessSection() {
  const steps = [
    {
      title: "ANALYSE DE POTENTIEL",
      description:
        "Évaluation complète de votre projet, du terrain et des contraintes réglementaires pour déterminer la faisabilité et optimiser les possibilités.",
    },
    {
      title: "MONTAGE DE PROJET PERSONNALISÉ",
      description:
        "Élaboration d'une stratégie sur mesure adaptée à vos besoins, votre budget et vos aspirations architecturales.",
    },
    {
      title: "CONCEPTION ARCHITECTURALE",
      description:
        "Création de plans et designs innovants qui allient esthétique, fonctionnalité et respect des normes environnementales.",
    },
    {
      title: "PERMIS DE CONSTRUIRE & DP",
      description:
        "Gestion complète des démarches administratives et suivi rigoureux pour l'obtention des autorisations nécessaires.",
    },
  ];

  return (
    <section className="py-24 bg-black/10 text-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-norwester text-4xl md:text-5xl text-center mb-16 italic text-gold-gradient">
          UN ACCOMPAGNEMENT COMPLET, DE L&apos;IDÉE AU CHANTIER
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col">
              <div className="mb-6 flex items-center">
                <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center mr-3">
                  <span className="font-bold">{index + 1}</span>
                </div>
                <div className="flex-grow h-px bg-white/30"></div>
              </div>

              <h3 className="font-norwester text-xl mb-4 relative">
                <span className="relative z-10 inline-block bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform">
                  {step.title}
                </span>
                <span className="absolute -bottom-1 left-0 w-1/3 h-px bg-[#FFD700]"></span>
              </h3>

              <p className="text-white text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
