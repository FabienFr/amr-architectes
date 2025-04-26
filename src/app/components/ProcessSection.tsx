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
            duration: 0.05,
            delay: delay + index * 0.02,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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
    <section ref={sectionRef} className="py-24 bg-black/10 text-white px-6">
      <div className="max-w-6xl mx-auto">
        {isInView && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-norwester text-4xl md:text-5xl text-center mb-16 italic text-gold-gradient">
                <AnimatedText
                  text="UN ACCOMPAGNEMENT COMPLET, DE L'IDÉE AU CHANTIER"
                  className="flex flex-wrap justify-center"
                />
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1 + index * 0.4 }}
                >
                  <motion.div
                    className="mb-6 flex items-center"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.4 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-full border border-white flex items-center justify-center mr-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 1.1 + index * 0.4,
                      }}
                    >
                      <span className="font-bold">{index + 1}</span>
                    </motion.div>
                    <div className="flex-grow h-px bg-white/30"></div>
                  </motion.div>

                  <motion.h3
                    className="font-norwester text-xl mb-4 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 + index * 0.4 }}
                  >
                    <span className="relative z-10 inline-block bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform">
                      {step.title}
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-px bg-[#FFD700]"
                      initial={{ width: 0 }}
                      animate={{ width: "33%" }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.4 }}
                    ></motion.span>
                  </motion.h3>

                  <motion.p
                    className="text-white text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.4 }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
