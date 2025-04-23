import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-24 text-white px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-2/3">
            <div className="mb-8">
              <h2 className="font-norwester text-5xl md:text-6xl mb-3 flex flex-col items-start">
                <span className="text-2xl italic text-white mb-2">Qui sommes</span>
                <span className="font-norwester  text-gold-gradient">NOUS?</span>
              </h2>
            </div>

            <h3 className="text-2xl font-norwester mb-6 text-white">Une agence engagée et indépendante</h3>

            <div className="space-y-6 text-lg">
              <p className="leading-relaxed">Fondée par Michaël, architecte DPLG certifié DDQE, AMR accompagne particuliers, investisseurs et collectivités sur des projets à impact, entre Bordeaux et la côte basque.</p>

              <p className="leading-relaxed">Notre approche : des conceptions durables, une écoute attentive, et une mise en œuvre cadrée à chaque étape – de la recherche de terrain jusqu&apos;au chantier.</p>
            </div>
          </div>

          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-68 h-68">
              <div className="absolute inset-0 rounded-full border-4 border-white opacity-30"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-68 h-68 relative rounded-full overflow-hidden">
                  <Image src="/images/mickael.jpg" alt="Idée créative" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
