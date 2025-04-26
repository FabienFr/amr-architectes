"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { Paperclip } from "lucide-react";

interface ContactFormProps {
  type?: "contact" | "construire" | "agrandir";
  onSubmitSuccess: () => void;
}

export default function ContactForm({
  onSubmitSuccess,
  type = "contact",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const form = new FormData();
      form.append("type", type || "contact");
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone || "");
      form.append("message", formData.message);

      if (file) {
        form.append("file", file);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur inconnue.");
      }

      // ✅ Succès
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFile(null);
      setSubmitSuccess(true);

      setTimeout(() => {
        onSubmitSuccess(); // fermeture de la lightbox
      }, 2000);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error("Erreur submit :", err);
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        {type && (
          <h2 className="font-norwester text-2xl font-bold text-center text-black">
            {type === "construire"
              ? "Construire avec nous"
              : type === "agrandir"
                ? "Agrandir votre espace"
                : ""}
          </h2>
        )}
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Nom *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-black"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-black"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Téléphone (optionnel)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-black"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Votre message / idée de projet *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black text-black"
        />
      </div>

      <div>
        <label
          htmlFor="file"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Ajouter un fichier (photo, plan, annonce...)
        </label>
        <div className="relative">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf"
          />
          <label
            htmlFor="file"
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-500 hover:bg-gray-50"
          >
            <Paperclip className="h-4 w-4" />
            {file ? file.name : "Choisir un fichier"}
          </label>
        </div>
      </div>

      {submitError && (
        <div className="rounded-lg bg-red-50 p-3 text-red-600">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg
              className="h-5 w-5 animate-spin text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Envoi en cours...
          </>
        ) : (
          "Envoyer"
        )}
      </button>

      {submitSuccess && (
        <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-700">
          <div className="mb-4 rounded-full bg-green-100 p-3 animate-in zoom-in">
            <svg
              className="h-8 w-8 text-green-600 animate-in fade-in"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-green-700">
            Message envoyé !
          </h3>
          <p className="text-gray-600">
            Merci pour votre message. Nous vous répondrons dans les plus brefs
            délais.
          </p>
        </div>
      )}
    </form>
  );
}
