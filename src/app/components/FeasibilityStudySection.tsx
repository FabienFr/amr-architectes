"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Composant pour animer le texte lettre par lettre
const AnimatedText = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className: string;
  delay?: number;
}) => {
  return (
    <motion.div className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.02,
            delay: delay + index * 0.01,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function FeasibilityStudySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const feasibilityLevels = [
    {
      name: "Étude Préliminaire",
      price: "GRATUIT",
      description: "Premier entretien et analyse préliminaire de votre projet",
      features: [
        "Entretien & conseil initial",
        "Visite de site",
        "Analyse du PLU et des gabarits (orale)",
        "Intégration environnementale",
        "Estimation des surfaces créables",
      ],
      images: [
        "/images/feasibility/level1-sketch.jpg",
        "/images/feasibility/level1-planning.jpg",
      ],
    },
    {
      name: "Étude Avancée",
      price: "1000 €",
      description:
        "Étude approfondie avec options d'implantation et modélisation",
      features: [
        "Entretien & conseil initial",
        "Visite de site",
        "Analyse du PLU et des gabarits",
        "Vérification du bâti existant",
        "Relevé ou modélisation",
        "Esquisse ou options d'implantation",
        "Intégration environnementale",
        "Estimation des surfaces créables",
        "Dossier graphique PDF remis",
      ],
      images: [
        "/images/feasibility/level2-model.jpg",
        "/images/feasibility/level2-options.jpg",
      ],
    },
    {
      name: "Étude Urbanisme",
      price: "SUR DEVIS",
      description:
        "Une étude de faisabilité complète pour une présentation aux services de l'urbanisme",
      features: [
        "Tous les services du Level II",
        "Estimation budgétaire des travaux",
        "Aide à la stratégie foncière et patrimoniale",
        "Dossier complet pour présentation aux services d'urbanisme",
      ],
      images: [
        "/images/feasibility/level3-complete.jpg",
        "/images/feasibility/level3-presentation.jpg",
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-black/10 text-white px-6">
      <div className="max-w-6xl mx-auto">
        {isInView && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-norwester text-4xl md:text-5xl text-center mb-6 text-gold-gradient">
                <AnimatedText
                  text="COMMENCER UNE ÉTUDE DE FAISABILITÉ"
                  className="flex flex-wrap justify-center"
                />
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.7 }}
            >
              <div className="text-center text-gray-300 mb-16 max-w-3xl mx-auto">
                <AnimatedText
                  text="Travailler avec un architecte c'est une question de relation, car lorsque les études de faisabilité amènent un projet jusqu'au bout, cela nous embarque ensemble pour plusieurs mois d'une étroite collaboration."
                  className="flex flex-wrap justify-center"
                  delay={0.5}
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {feasibilityLevels.map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 + index * 0.4 }}
                  className="border border-gray-800 bg-white/90 overflow-hidden rounded-xl"
                >
                  <div className="bg-white/90 text-black p-4 text-center">
                    <h3 className="font-norwester text-2xl mb-1">
                      {level.name}
                    </h3>
                    <div className="text-xl font-bold">{level.price}</div>
                  </div>

                  <div className="h-48 bg-gray-800 relative overflow-hidden">
                    {/* Uncomment when you have actual images */}
                    {/* <Image 
                      src={level.images[0]} 
                      alt={`${level.name} visualization`} 
                      fill 
                      className="object-cover"
                    /> */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      Images du {level.name}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="font-norwester text-black mb-4 text-2xl">
                      {level.description}
                    </p>

                    <h4 className="font-semibold mb-2 text-[#daa520] text-xl">
                      Inclus :
                    </h4>
                    <ul className="text-sm text-black space-y-1 mb-4">
                      {level.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 2.2 + index * 0.4 + i * 0.1,
                          }}
                        >
                          <span className="text-[#daa520] mr-2">✓</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Comparison Table */}
            {/* <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-3 text-left">Actions / Contenus</th>
                    <th className="p-3 text-center">
                      FAISA LEVEL I<br />
                      Gratuit
                    </th>
                    <th className="p-3 text-center">
                      FAISA LEVEL II
                      <br />1 000 € HT
                    </th>
                    <th className="p-3 text-center">
                      FAISA LEVEL WINNER
                      <br />
                      Sur devis
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Entretien & conseil initial",
                    "Visite de site",
                    "Analyse du PLU et des gabarits",
                    "Vérification du bâti existant",
                    "Relevé ou modélisation",
                    "Esquisse ou options d'implantation",
                    "Intégration environnementale",
                    "Estimation des surfaces créables",
                    "Estimation budgétaire des travaux",
                    "Dossier graphique PDF remis",
                    "Aide à la stratégie foncière et patrimoniale",
                  ].map((action, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-900" : "bg-black"}>
                      <td className="p-3 border-t border-gray-800">{action}</td>
                      <td className="p-3 border-t border-gray-800 text-center">
                        {i <= 2 || i === 6 || i === 7 ? "✓" : ""}
                        {i === 2 ? " (orale)" : ""}
                      </td>
                      <td className="p-3 border-t border-gray-800 text-center">{i <= 8 || i === 9 ? "✓" : ""}</td>
                      <td className="p-3 border-t border-gray-800 text-center">✓</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
          </>
        )}
      </div>
    </section>
  );
}
