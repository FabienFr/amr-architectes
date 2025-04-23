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
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full border-4 border-white opacity-30"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 relative">
                  {/* Remplacer par une vraie image quand disponible */}
                  {/* <Image 
                    src="/images/lightbulb-icon.svg" 
                    alt="Idée créative" 
                    fill 
                    className="object-contain"
                  /> */}

                  {/* Ampoule SVG en attendant */}
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path
                      d="M9 21H15M9 21H15M9 21V18M15 21V18M12 3C8.68629 3 6 5.68629 6 9C6 10.2145 6.36084 11.3447 6.98117 12.2893C7.93507 13.7418 9 15.5351 9 18M12 3C15.3137 3 18 5.68629 18 9C18 10.2145 17.6392 11.3447 17.0188 12.2893C16.0649 13.7418 15 15.5351 15 18M12 3V7M10 7H14M9.5 12L8 13.5M14.5 12L16 13.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
