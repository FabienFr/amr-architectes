export default function TestimonialsSection() {
  const testimonials = [
    { name: "Natalia Lowe", quote: "Un accompagnement fluide, réactif, avec une vraie compréhension de nos besoins." },
    { name: "Emma W.", quote: "Michaël a su valoriser notre terrain avec une extension durable et sobre." },
    { name: "Lillian Pratt", quote: "Magik Mike le meilleur archisexteur de tous les temps." },
  ];

  return (
    <section className="pt-12 pb-24 bg-black text-black px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-norwester font-extrabold mb-10 text-center text-white">Happy Clients</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-xl">
              <p className="italic mb-4">&quot;{testimonial.quote}&quot;</p>
              <p className="font-bold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
