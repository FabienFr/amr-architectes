"use client";

import { useState, useRef } from "react";
import { X, Calendar, MessageSquare } from "lucide-react";
import CallBooking from "./CallBooking";
import ContactForm from "./ContactForm";
import BackgroundAnimation from "./BackgroundAnimation";
import { motion, useInView } from "framer-motion";

// Composant pour animer le texte lettre par lettre
const AnimatedText = ({
  text,
  className,
  delay = 0,
  onComplete = () => {},
}: {
  text: string;
  className: string;
  delay?: number;
  onComplete?: () => void;
}) => {
  return (
    <motion.div className={className} onAnimationComplete={onComplete}>
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

export default function ValuesSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"message" | "call">("message");

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const values = [
    {
      title: "Conceptions bioclimatiques",
      description: "Par un architecte certifié développement durable",
    },
    {
      title: "Projets clef-en-main",
      description: "De la recherche de terrain à la livraison du chantier",
    },
    {
      title: "Phasage des travaux",
      description: "Pour s'adapter à vos capacités financières",
    },
    {
      title: "Intégration du travail paysagé",
      description:
        "Parce qu'un projet doit être systématiquement pensé avec son environnement",
    },
  ];

  const openLightbox = (type: "message" | "call") => {
    setFormType(type);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      ref={sectionRef}
      className="values-section py-24 bg-black/10 text-white px-6"
    >
      <BackgroundAnimation />
      <div className="max-w-6xl mx-auto">
        {isInView && (
          <>
            <AnimatedText
              text="Bâtir malin, penser éco-conception."
              className="font-norwester text-4xl md:text-5xl text-center mb-16 flex flex-wrap justify-center"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }} // Délai estimé pour l'animation du premier titre
            >
              <AnimatedText
                text="Concevoir autrement. Construire durablement."
                className="text-2xl md:text-3xl text-center mb-8 text-gold-gradient flex flex-wrap justify-center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }} // Délai pour le deuxième titre
            >
              <AnimatedText
                text="De l'esquisse à la livraison, nous accompagnons vos projets d'architecture sur mesure — neufs, rénovés ou agrandis — avec une attention particulière à l'environnement, au territoire, et à la manière dont vous vivez."
                className="text-xl md:text-2xl text-center mb-16 flex flex-wrap justify-center"
              />
            </motion.div>

            {/* Cards avec animation séquentielle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }} // Délai pour le paragraphe plus long
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 2.2 + index * 0.4, // Animation séquentielle avec plus d'espacement
                  }}
                  className="border border-white p-6 rounded-lg flex flex-col items-start"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                    <h3 className="font-norwester text-xl text-gold-gradient">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-white text-sm">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA avec délai ajusté */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 4 }} // Délai augmenté pour apparaître après toutes les cartes
            >
              <button
                onClick={() => openLightbox("message")}
                className="text-lg border border-white hover:bg-white hover:text-black transition-colors duration-300 px-8 py-4 rounded-lg"
              >
                Parlez-nous de votre projet
              </button>
            </motion.div>
          </>
        )}

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton de fermeture */}
              <button
                onClick={closeLightbox}
                className="absolute right-4 top-4 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                aria-label="Fermer"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mb-6 mt-2 text-center">
                <h2 className="font-norwester text-2xl font-bold text-black">
                  {formType === "call"
                    ? "Réserver un appel"
                    : "Prendre le temps d'en parler"}
                </h2>

                <p className="mt-2 text-gray-600">
                  Chaque projet commence par une rencontre.
                  <br />
                  Dites-nous où vous en êtes — une idée, un terrain, un bien en
                  vue ? Nous vous aidons à y voir clair, sans engagement.
                </p>
              </div>

              {/* Onglets */}
              <div className="mb-6 flex rounded-lg border">
                <button
                  onClick={() => setFormType("message")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-l-lg py-3 font-medium transition-colors ${formType === "message" ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Message
                </button>
                <button
                  onClick={() => setFormType("call")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-r-lg py-3 font-medium transition-colors ${formType === "call" ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                >
                  <Calendar className="h-4 w-4" />
                  Appel
                </button>
              </div>

              {formType === "call" ? (
                <CallBooking />
              ) : (
                <ContactForm onSubmitSuccess={closeLightbox} />
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
