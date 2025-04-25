import { Calendar } from "lucide-react";

export default function CallBooking() {
  return (
    <div className="text-center">
      <p className="mb-4 flex flex-col items-center justify-center gap-2 text-lg font-medium text-black">
        <Calendar className="h-8 w-8" />
        30 min d&apos;échange gratuit avec Michaël, architecte fondateur
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
        Réserver un RDV
      </a>
    </div>
  );
}
