"use client";
import { useState } from "react";
import { X, Calendar, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"message" | "call">("message");

  const openLightbox = (type: "message" | "call") => {
    setFormType(type);
    setIsOpen(true);
    // Empêcher le défilement du body quand la lightbox est ouverte
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    // Réactiver le défilement
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => openLightbox("message")}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gray-500 text-gray-300 shadow-lg transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        aria-label="Contactez-nous"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Lightbox / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div
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
              <div className="text-center">
                <p className="mb-4 flex items-center justify-center gap-2 text-lg font-medium text-black">
                  <Calendar className="h-5 w-5" />
                  30 min d&apos;échange gratuit avec Michaël, architecte
                  fondateur
                </p>
                <p className="mb-6 text-gray-600">
                  En visio ou à l&apos;agence à Biarritz
                </p>
                <a
                  href="https://calendly.com/votre-lien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                >
                  Réserver un appel
                </a>
              </div>
            ) : (
              <ContactForm onSubmitSuccess={closeLightbox} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
