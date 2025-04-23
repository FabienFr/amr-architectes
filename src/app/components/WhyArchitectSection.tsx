"use client";
import { useState } from "react";

export default function WhyArchitectSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const reasons = [
    {
      title: "Compréhension de vos besoins",
      content:
        "L'architecte commence par écouter attentivement vos attentes, vos goûts et votre mode de vie. Il vous aide à définir un programme adapté, en tenant compte de l'évolution possible de votre famille et de vos besoins futurs. Un bon projet commence par une bonne écoute. On vous aide à clarifier vos priorités, à définir un programme réaliste et à anticiper les contraintes (techniques, budgétaires, réglementaires).",
    },
    {
      title: "Conception sur mesure",
      content:
        "Fort de cette compréhension, l'architecte conçoit un projet personnalisé qui optimise l'utilisation de l'espace, respecte le caractère du bâtiment existant et s'intègre harmonieusement dans son environnement. Chaque projet est unique. Nous optimisons les surfaces, la lumière, les usages, et intégrons des matériaux biosourcés ou réemployés, pour construire durablement, sans compromis sur le confort.",
    },
    {
      title: "Gestion des démarches administratives",
      content:
        "L'architecte vous accompagne dans la préparation et le dépôt des demandes de permis de construire, en veillant au respect des réglementations en vigueur. Son intervention est obligatoire pour tout projet soumis à une demande de permis de construire, sauf exceptions prévues par la loi.",
    },
    {
      title: "Coordination des intervenants",
      content:
        "Nous coordonnons les études, préparons les démarches administratives (permis, etc.), mobilisons les bons artisans, et assurons un pilotage rigoureux du chantier jusqu’à la réception. En tant que maître d'œuvre, l'architecte coordonne les différents professionnels impliqués dans le projet (ingénieurs, entrepreneurs, artisans), assurant ainsi une exécution fluide et conforme aux plans établis.",
    },
    {
      title: "Garantie de qualité et d'économies",
      content:
        "Grâce à son expertise, l'architecte veille à la qualité de la construction, au respect des délais et au contrôle des coûts, vous garantissant ainsi le meilleur rapport qualité/prix et des économies appréciables à l'entretien.",
    },
    {
      title: "Intégration environnementale",
      content:
        "L'architecte intègre des solutions durables et respectueuses de l'environnement, favorisant l'efficacité énergétique et l'utilisation de matériaux écologiques, contribuant ainsi à un développement durable.",
    },
    {
      title: "Sécurité juridique",
      content:
        "En tant qu’architectes inscrits à l’Ordre, nous vous faisons bénéficier d’assurances professionnelles solides, notamment la garantie décennale, pour protéger votre investissement.",
    },
    {
      title: "Une vraie valeur ajoutée",
      content:
        "Bien conçu, un projet valorise mieux votre bien, limite les surcoûts, et maximise la qualité de vie. Notre rôle, c’est d’y veiller à chaque étape.",
    },
  ];

  return (
    <section className="py-24 bg-white text-black px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="font-norwester text-4xl md:text-5xl mb-6">
            Pourquoi travailler avec un architecte ?
          </h2>
          <p className="text-black italic text-lg">
            En qualité d&apos;Architecte inscrit à l&apos;Ordre, je suis une
            éponge, j&apos;absorbe vos envies, les spécificités du site.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-teal-400 mr-3 font-bold">
                    {index + 1}.
                  </span>
                  <span className="font-norwester text-xl">{reason.title}</span>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 py-4 bg-gray-100 text-black">
                  <p>{reason.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-black">
          <p className="mb-6">
            En résumé, travailler avec un architecte vous assure une approche
            professionnelle, sécurisée et personnalisée, transformant vos idées
            en réalité tout en optimisant la valeur et la durabilité de votre
            projet
          </p>
        </div>
      </div>
    </section>
  );
}
