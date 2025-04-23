export default function ValuesSection() {
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

  return (
    <section className="py-24 bg-black text-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-norwester text-4xl md:text-5xl text-center mb-16">
          Bâtir malin, penser éco-conception.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="border border-white p-6 rounded-lg flex flex-col items-start"
            >
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                <h3 className="font-norwester text-xl">{value.title}</h3>
              </div>
              <p className="text-gray-300 text-sm">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="border border-white hover:bg-white hover:text-black transition-colors duration-300 px-8 py-3 rounded-lg">
            Parlez-nous de votre projet
          </button>
        </div>
      </div>
    </section>
  );
}
