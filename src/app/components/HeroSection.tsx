"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

type HeroContentKey = "default" | "construire" | "agrandir";

export default function HeroSection() {
  const [activeImage, setActiveImage] = useState<HeroContentKey>("default");
  const [isMobile, setIsMobile] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const router = useRouter();

  // Détecter si l'appareil est mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Vérifier au chargement
    checkIfMobile();

    // Vérifier au redimensionnement
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const heroContent: Record<HeroContentKey, { image: string; title: string; textColor: string; path: string; enabled: boolean }> = {
    default: {
      image: "/images/hero.jpg",
      title: "LAISSEZ-NOUS CONSTRUIRE LE PROJET DE VOS RÊVES",
      textColor: "text-black",
      path: "/",
      enabled: true,
    },
    construire: {
      image: "/images/construire.jpg",
      title: "CONSTRUIRE VOTRE MAISON SUR MESURE",
      textColor: "text-white",
      path: "/construire",
      enabled: false,
    },
    agrandir: {
      image: "/images/agrandir.jpg",
      title: "AGRANDIR VOTRE ESPACE DE VIE",
      textColor: "text-white",
      path: "/agrandir",
      enabled: false,
    },
  };

  const currentContent = heroContent[activeImage];

  // Gérer le survol sur desktop
  const handleMouseEnter = (type: HeroContentKey) => {
    if (!isMobile && !isNavigating && !isButtonClicked) {
      setActiveImage(type);
    }
  };

  // Gérer la fin du survol sur desktop
  const handleMouseLeave = () => {
    if (!isMobile && !isNavigating && !isButtonClicked) {
      setActiveImage("default");
    }
  };

  // Gérer le clic sur un bouton
  const handleButtonClick = (type: HeroContentKey) => {
    // Si déjà en train de naviguer, ne rien faire
    if (isNavigating) return;

    // Marquer le bouton comme cliqué pour empêcher le retour à l'image par défaut
    setIsButtonClicked(true);

    // Changer l'image dans tous les cas
    setActiveImage(type);

    // Si la page n'existe pas encore, ne pas naviguer mais garder l'image affichée pendant un moment
    if (!heroContent[type].enabled) {
      console.log(`La page ${heroContent[type].path} n'est pas encore disponible`);

      // Après un délai, revenir à l'image par défaut
      setTimeout(() => {
        setIsButtonClicked(false);
        setActiveImage("default");
      }, 3000);

      return;
    }

    // Sinon, préparer la navigation
    setIsNavigating(true);

    // Attendre que l'animation se termine avant de naviguer
    setTimeout(() => {
      router.push(heroContent[type].path);
    }, 2000);
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-white text-black px-6">
      <Link href="/" className={`absolute z-20 top-3 left-3 no-underline transition-colors duration-500 ${currentContent.textColor}`}>
        <div>
          <h3 className="font-extrabold text-xl tracking-wide uppercase font-archivo">AMR</h3>
          <h3 className="font-extrabold text-xl tracking-wide uppercase font-archivo">ARCHITECTES</h3>
        </div>
      </Link>

      {/* Image de fond avec transition */}
      <div className="absolute inset-0 w-full h-full">
        {/* Image par défaut */}
        <div className={`absolute inset-0 transition-opacity duration-000 ease-in-out ${activeImage === "default" ? "opacity-100" : "opacity-0"}`}>
          <Image src={heroContent.default.image} alt="Image par défaut" className="object-cover w-full h-full" fill priority />
        </div>

        {/* Image Construire */}
        <div className={`absolute inset-0 transition-opacity duration-900 ease-in-out ${activeImage === "construire" ? "opacity-100" : "opacity-0"}`}>
          <Image src={heroContent.construire.image} alt="Construire" className="object-cover w-full h-full" fill priority={false} />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Image Agrandir */}
        <div className={`absolute inset-0 transition-opacity duration-900 ease-in-out ${activeImage === "agrandir" ? "opacity-100" : "opacity-0"}`}>
          <Image src={heroContent.agrandir.image} alt="Agrandir" className="object-cover w-full h-full" fill priority={false} />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <div className="relative h-[250px] w-[300px] md:h-[400px] md:w-[550px] mb-6 overflow-hidden">
          {(Object.keys(heroContent) as HeroContentKey[]).map((key) => (
            <h1 key={key} className={`font-norwester text-5xl md:text-7xl font-extrabold leading-tight tracking-wider absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${activeImage === key ? "opacity-100" : "opacity-0"} ${heroContent[key].textColor}`}>
              {heroContent[key].title}
            </h1>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white/60 text-black border-black border-2 hover:bg-gray-200 transition px-8 py-4 w-full sm:w-40 rounded-lg text-lg font-semibold" onMouseEnter={() => handleMouseEnter("construire")} onMouseLeave={handleMouseLeave} onClick={() => handleButtonClick("construire")}>
            Construire
          </button>

          <button className="bg-white/60 text-black border-black border-2 hover:bg-gray-200 transition px-8 py-4 w-full sm:w-40 rounded-lg text-lg font-semibold" onMouseEnter={() => handleMouseEnter("agrandir")} onMouseLeave={handleMouseLeave} onClick={() => handleButtonClick("agrandir")}>
            Agrandir
          </button>
        </div>
      </div>
    </section>
  );
}
