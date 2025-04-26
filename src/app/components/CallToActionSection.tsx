"use client";

import { useState } from "react";
import { X, Calendar, MessageSquare } from "lucide-react";
import CallBooking from "./CallBooking";
import ContactForm from "./ContactForm";

export default function CallToActionSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"message" | "call">("message");

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
    <section className="py-24 bg-white/70 text-black text-center px-6">
      <div>
        <h2 className="text-4xl font-extrabold mb-12">
          Nos honoraires sont réintégrés dans le projet global !
        </h2>
        <button
          onClick={() => openLightbox("message")}
          className="bg-white/30 text-black border-black border-2 hover:bg-black hover:text-white transition px-8 py-4 rounded-xl text-lg font-semibold"
        >
          Commencer mon projet
        </button>
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
                <CallBooking />
              ) : (
                <ContactForm onSubmitSuccess={closeLightbox} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
