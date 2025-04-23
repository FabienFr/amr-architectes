"use client";
import { useState } from "react";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", name: "Tous les projets" },
    { id: "residential", name: "Résidentiel" },
    { id: "commercial", name: "Commercial" },
    { id: "renovation", name: "Rénovation" },
    { id: "extension", name: "Extension" },
  ];

  const projects = [
    {
      id: 1,
      name: "Résidence Les Terrasses",
      category: "residential",
      location: "Biarritz",
      year: "2022",
      image: "/images/gallery/project1.jpg",
    },
    {
      id: 2,
      name: "Campus Innovant",
      category: "commercial",
      location: "Bordeaux",
      year: "2021",
      image: "/images/gallery/project2.jpg",
    },
    {
      id: 3,
      name: "Surélévation Contemporaine",
      category: "extension",
      location: "Anglet",
      year: "2023",
      image: "/images/gallery/project3.jpg",
    },
    {
      id: 4,
      name: "Villa Écologique",
      category: "residential",
      location: "Hossegor",
      year: "2022",
      image: "/images/gallery/project4.jpg",
    },
    {
      id: 5,
      name: "Module Autonome",
      category: "extension",
      location: "Capbreton",
      year: "2021",
      image: "/images/gallery/project5.jpg",
    },
    {
      id: 6,
      name: "Rénovation Haussmannienne",
      category: "renovation",
      location: "Bordeaux",
      year: "2020",
      image: "/images/gallery/project6.jpg",
    },
    {
      id: 7,
      name: "Maison Bioclimatique",
      category: "residential",
      location: "Bayonne",
      year: "2023",
      image: "/images/gallery/project7.jpg",
    },
    {
      id: 8,
      name: "Immeuble Collectif",
      category: "residential",
      location: "Biarritz",
      year: "2022",
      image: "/images/gallery/project8.jpg",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section className="py-24 bg-white text-black px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-norwester text-4xl md:text-5xl text-center mb-12">
          Nos Réalisations
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-none transition-colors ${activeFilter === category.id ? "bg-white text-black" : "bg-transparent text-black border border-black hover:bg-black/10"}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden aspect-square cursor-pointer"
            >
              <div className="absolute inset-0 bg-gray-800">
                {/* Remplacer par vos vraies images quand disponibles */}
                {/* <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                /> */}

                {/* Placeholder en attendant les vraies images */}
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <span className="text-sm text-gray-400">
                    Image: {project.name}
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <h3 className="font-norwester text-xl text-white mb-1">
                  {project.name}
                </h3>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
