"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Composant pour animer le texte lettre par lettre
const AnimatedText = ({ text, className, delay = 0 }: { text: string; className: string; delay?: number }) => {
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

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="py-24 text-white px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {isInView && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-2/3">
              <div className="mb-8">
                <h2 className="font-norwester text-5xl md:text-6xl mb-3 flex flex-col items-start">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-2xl italic text-white mb-2">
                    <AnimatedText text="Qui sommes" className="flex" />
                  </motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="font-norwester text-gold-gradient">
                    <AnimatedText text="NOUS?" className="flex" delay={0.5} />
                  </motion.span>
                </h2>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
                <h3 className="text-2xl font-norwester mb-6 text-white">
                  <AnimatedText text="Une agence engagée et indépendante" className="flex flex-wrap" delay={1} />
                </h3>
              </motion.div>

              <div className="space-y-6 text-lg">
                <motion.p className="leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.8 }}>
                  Fondée par Michaël, architecte DPLG certifié DDQE, AMR accompagne particuliers, investisseurs et collectivités sur des projets à impact, entre Bordeaux et la côte basque.
                </motion.p>

                <motion.p className="leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 2.2 }}>
                  Notre approche : des conceptions durables, une écoute attentive, et une mise en œuvre cadrée à chaque étape – de la recherche de terrain jusqu&apos;au chantier.
                </motion.p>
              </div>
            </div>

            <motion.div className="md:w-1/3 flex justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 2 }}>
              <div className="relative w-68 h-68">
                <div className="absolute inset-0 rounded-full border-4 border-white opacity-30"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-68 h-68 relative rounded-full overflow-hidden">
                    <Image src="/images/mickael.jpg" alt="Idée créative" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
