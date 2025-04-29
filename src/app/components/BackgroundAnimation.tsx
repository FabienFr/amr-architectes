"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WireframeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountElement = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountElement.appendChild(renderer.domElement);

    // Créer une géométrie d'icosaèdre pour avoir des triangles bien définis
    const baseGeometry = new THREE.IcosahedronGeometry(3, 1);

    // Créer une maison moderne en wireframe
    const createModernHouseWireframe = () => {
      const houseGroup = new THREE.Group();

      // Matériau pour les structures
      const structureMaterial = new THREE.LineBasicMaterial({
        color: 0x766f64,
        transparent: true,
        opacity: 0.8,
      });

      // Matériau pour les vitres
      const glassMaterial = new THREE.LineBasicMaterial({
        color: 0x87ceeb,
        transparent: true,
        opacity: 0.6,
      });

      // Base / Socle
      const createBase = () => {
        const baseGroup = new THREE.Group();

        // Plateforme principale
        const mainPlatformGeometry = new THREE.BoxGeometry(10, 0.3, 8);
        const mainPlatformEdges = new THREE.EdgesGeometry(mainPlatformGeometry);
        const mainPlatformLine = new THREE.LineSegments(
          mainPlatformEdges,
          structureMaterial,
        );
        mainPlatformLine.position.y = -2;
        baseGroup.add(mainPlatformLine);

        // Escaliers d'entrée
        const stairsGeometry = new THREE.BoxGeometry(3, 0.15, 1.5);
        const stairsEdges = new THREE.EdgesGeometry(stairsGeometry);
        const stairsLine = new THREE.LineSegments(
          stairsEdges,
          structureMaterial,
        );
        stairsLine.position.set(0, -2.15, 4.75);
        baseGroup.add(stairsLine);

        return baseGroup;
      };

      // Volume principal
      const createMainVolume = () => {
        const mainGroup = new THREE.Group();

        // Volume central
        const centralVolumeGeometry = new THREE.BoxGeometry(7, 2.5, 6);
        const centralVolumeEdges = new THREE.EdgesGeometry(
          centralVolumeGeometry,
        );
        const centralVolumeLine = new THREE.LineSegments(
          centralVolumeEdges,
          structureMaterial,
        );
        centralVolumeLine.position.y = -0.75;
        mainGroup.add(centralVolumeLine);

        // Grandes baies vitrées façade avant
        const frontWindowGeometry = new THREE.BoxGeometry(6, 2, 0.1);
        const frontWindowEdges = new THREE.EdgesGeometry(frontWindowGeometry);
        const frontWindowLine = new THREE.LineSegments(
          frontWindowEdges,
          glassMaterial,
        );
        frontWindowLine.position.set(0, -0.75, 3);
        mainGroup.add(frontWindowLine);

        // Baies vitrées latérales
        const sideWindowGeometry = new THREE.BoxGeometry(0.1, 2, 5);
        const sideWindowEdges = new THREE.EdgesGeometry(sideWindowGeometry);
        const leftSideWindowLine = new THREE.LineSegments(
          sideWindowEdges,
          glassMaterial,
        );
        leftSideWindowLine.position.set(-3.5, -0.75, 0);
        mainGroup.add(leftSideWindowLine);

        const rightSideWindowLine = new THREE.LineSegments(
          sideWindowEdges.clone(),
          glassMaterial,
        );
        rightSideWindowLine.position.set(3.5, -0.75, 0);
        mainGroup.add(rightSideWindowLine);

        return mainGroup;
      };

      // Volume supérieur décalé
      const createUpperVolume = () => {
        const upperGroup = new THREE.Group();

        // Volume principal décalé
        const upperVolumeGeometry = new THREE.BoxGeometry(8, 2, 5);
        const upperVolumeEdges = new THREE.EdgesGeometry(upperVolumeGeometry);
        const upperVolumeLine = new THREE.LineSegments(
          upperVolumeEdges,
          structureMaterial,
        );
        upperVolumeLine.position.set(1, 1, -0.5);
        upperGroup.add(upperVolumeLine);

        // Grandes baies vitrées
        const upperWindowGeometry = new THREE.BoxGeometry(7, 1.5, 0.1);
        const upperWindowEdges = new THREE.EdgesGeometry(upperWindowGeometry);
        const upperWindowLine = new THREE.LineSegments(
          upperWindowEdges,
          glassMaterial,
        );
        upperWindowLine.position.set(1, 1, 2);
        upperGroup.add(upperWindowLine);

        // Fenêtres arrière
        const backWindowGeometry = new THREE.BoxGeometry(7, 1.5, 0.1);
        const backWindowEdges = new THREE.EdgesGeometry(backWindowGeometry);
        const backWindowLine = new THREE.LineSegments(
          backWindowEdges,
          glassMaterial,
        );
        backWindowLine.position.set(1, 1, -3);
        upperGroup.add(backWindowLine);

        return upperGroup;
      };

      // Volume en porte-à-faux
      const createCantileveredVolume = () => {
        const cantileveredGroup = new THREE.Group();

        // Volume principal en porte-à-faux
        const cantileveredGeometry = new THREE.BoxGeometry(4, 2, 3);
        const cantileveredEdges = new THREE.EdgesGeometry(cantileveredGeometry);
        const cantileveredLine = new THREE.LineSegments(
          cantileveredEdges,
          structureMaterial,
        );
        cantileveredLine.position.set(-3, 1, 1.5);
        cantileveredGroup.add(cantileveredLine);

        // Fenêtres
        const windowGeometry = new THREE.BoxGeometry(3.5, 1.5, 0.1);
        const windowEdges = new THREE.EdgesGeometry(windowGeometry);
        const windowLine = new THREE.LineSegments(windowEdges, glassMaterial);
        windowLine.position.set(-3, 1, 3);
        cantileveredGroup.add(windowLine);

        // Fenêtre latérale
        const sideWindowGeometry = new THREE.BoxGeometry(0.1, 1.5, 2.5);
        const sideWindowEdges = new THREE.EdgesGeometry(sideWindowGeometry);
        const sideWindowLine = new THREE.LineSegments(
          sideWindowEdges,
          glassMaterial,
        );
        sideWindowLine.position.set(-5, 1, 1.5);
        cantileveredGroup.add(sideWindowLine);

        return cantileveredGroup;
      };

      // Toit-terrasse
      const createRoofTerrace = () => {
        const roofGroup = new THREE.Group();

        // Dalle de toit principale
        const mainRoofGeometry = new THREE.BoxGeometry(8, 0.2, 5);
        const mainRoofEdges = new THREE.EdgesGeometry(mainRoofGeometry);
        const mainRoofLine = new THREE.LineSegments(
          mainRoofEdges,
          structureMaterial,
        );
        mainRoofLine.position.set(1, 2.1, -0.5);
        roofGroup.add(mainRoofLine);

        // Garde-corps toit
        const createRailing = (
          width: number,
          depth: number,
          x: number,
          z: number,
        ) => {
          const railingGeometry = new THREE.BoxGeometry(width, 0.8, depth);
          const railingEdges = new THREE.EdgesGeometry(railingGeometry);
          const railingLine = new THREE.LineSegments(
            railingEdges,
            structureMaterial,
          );
          railingLine.position.set(x, 2.5, z);
          railingLine.scale.set(1, 0.1, 0.1);
          return railingLine;
        };

        // Ajouter les garde-corps sur les 4 côtés
        roofGroup.add(createRailing(8, 0.1, 1, -2.95)); // Arrière
        roofGroup.add(createRailing(8, 0.1, 1, 1.95)); // Avant
        roofGroup.add(createRailing(0.1, 5, -2.95, -0.5)); // Gauche
        roofGroup.add(createRailing(0.1, 5, 4.95, -0.5)); // Droite

        return roofGroup;
      };

      // Éléments architecturaux supplémentaires
      const createArchitecturalDetails = () => {
        const detailsGroup = new THREE.Group();

        // Colonnes de soutien pour le porte-à-faux
        const createColumn = (x: number, z: number) => {
          const columnGeometry = new THREE.BoxGeometry(0.3, 2, 0.3);
          const columnEdges = new THREE.EdgesGeometry(columnGeometry);
          const columnLine = new THREE.LineSegments(
            columnEdges,
            structureMaterial,
          );
          columnLine.position.set(x, -1, z);
          return columnLine;
        };

        detailsGroup.add(createColumn(-3, 0));
        detailsGroup.add(createColumn(-4.5, 0));

        // Pergola sur le toit
        const pergolaBaseGeometry = new THREE.BoxGeometry(4, 0.1, 3);
        const pergolaBaseEdges = new THREE.EdgesGeometry(pergolaBaseGeometry);
        const pergolaBaseLine = new THREE.LineSegments(
          pergolaBaseEdges,
          structureMaterial,
        );
        pergolaBaseLine.position.set(2, 2.2, -1);
        detailsGroup.add(pergolaBaseLine);

        // Lattes de la pergola
        for (let i = 0; i < 5; i++) {
          const latteGeometry = new THREE.BoxGeometry(4, 0.05, 0.1);
          const latteEdges = new THREE.EdgesGeometry(latteGeometry);
          const latteLine = new THREE.LineSegments(
            latteEdges,
            structureMaterial,
          );
          latteLine.position.set(2, 2.3, -2 + i * 0.8);
          detailsGroup.add(latteLine);
        }

        return detailsGroup;
      };

      // Ajouter tous les éléments à la maison
      houseGroup.add(createBase());
      houseGroup.add(createMainVolume());
      houseGroup.add(createUpperVolume());
      houseGroup.add(createCantileveredVolume());
      houseGroup.add(createRoofTerrace());
      houseGroup.add(createArchitecturalDetails());

      // Ajuster la taille et la position
      houseGroup.scale.set(0.5, 0.5, 0.5);

      return houseGroup;
    };

    const modernHouse = createModernHouseWireframe();
    modernHouse.visible = false;
    modernHouse.position.set(0, -1, -5);
    modernHouse.rotation.y = Math.PI;
    scene.add(modernHouse);

    // Convertir en géométrie de triangles individuels
    const triangles: THREE.Mesh[] = [];
    const positions = baseGeometry.attributes.position.array;

    // Créer des triangles individuels
    for (let i = 0; i < positions.length; i += 9) {
      const triangleGeometry = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        positions[i],
        positions[i + 1],
        positions[i + 2],
        positions[i + 3],
        positions[i + 4],
        positions[i + 5],
        positions[i + 6],
        positions[i + 7],
        positions[i + 8],
      ]);

      triangleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3),
      );

      const material = new THREE.MeshBasicMaterial({
        color: 0x766f64,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });

      const triangle = new THREE.Mesh(triangleGeometry, material);

      // Calculer le centre du triangle pour les animations
      const centerX = (vertices[0] + vertices[3] + vertices[6]) / 3;
      const centerY = (vertices[1] + vertices[4] + vertices[7]) / 3;
      const centerZ = (vertices[2] + vertices[5] + vertices[8]) / 3;

      // Stocker les positions originales et le centre
      triangle.userData = {
        originalPosition: new THREE.Vector3(0, 0, 0),
        center: new THREE.Vector3(centerX, centerY, centerZ),
        direction: new THREE.Vector3(
          centerX * (Math.random() * 0.5 + 0.5),
          centerY * (Math.random() * 0.5 + 0.5),
          centerZ * (Math.random() * 0.5 + 0.5),
        ).normalize(),
      };

      triangles.push(triangle);
      scene.add(triangle);
    }

    const clock = new THREE.Clock();

    // Facteur d'éclatement (0 = forme originale, 1 = complètement éclaté)
    let explosionFactor = 0;
    // Facteur d'apparition de la maison (0 = invisible, 1 = complètement visible)
    let houseVisibilityFactor = 0;
    // Facteur de rotation de la maison (0 = pas de rotation, 1 = rotation complète)
    let houseRotationFactor = 0;
    // Facteur de fade out des triangles (0 = pleine opacité, 1 = complètement transparents)
    let triangleFadeOutFactor = 0;

    // Stocker la dernière position de défilement pour détecter la direction
    let lastScrollPosition = window.scrollY;

    function animate() {
      requestAnimationFrame(animate);

      // Détecter la direction du défilement
      const currentScrollPosition = window.scrollY;
      const scrollingDown = currentScrollPosition > lastScrollPosition;
      lastScrollPosition = currentScrollPosition;

      // Trouver les sections clés
      const valuesSection = document.querySelector(".values-section");
      const projetSection = document.querySelector("#projet");
      const footerSection = document.querySelector("footer");

      let valuesTriggerPoint = 0;
      let projetTriggerPoint = document.documentElement.scrollHeight * 0.6; // Par défaut
      let footerTriggerPoint = document.documentElement.scrollHeight * 0.9; // Par défaut

      if (valuesSection) {
        // Calculer le point de déclenchement au milieu de la section Values
        const valuesSectionRect = valuesSection.getBoundingClientRect();
        const valuesSectionMiddle =
          valuesSectionRect.top + valuesSectionRect.height / 1.5;
        valuesTriggerPoint =
          window.scrollY + valuesSectionMiddle - window.innerHeight / 1.5;
      }

      if (projetSection) {
        // Calculer le point de déclenchement au début de la section Projet
        const projetSectionRect = projetSection.getBoundingClientRect();
        projetTriggerPoint =
          window.scrollY + projetSectionRect.top - window.innerHeight / 0.8;
      }

      if (footerSection) {
        // Calculer le point de déclenchement au début du footer
        const footerSectionRect = footerSection.getBoundingClientRect();
        footerTriggerPoint =
          window.scrollY + footerSectionRect.top - window.innerHeight / 0.8;
      }

      // Calculer le facteur d'éclatement basé sur le scroll
      const scrollPosition = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Normaliser la progression du scroll pour l'éclatement (de Values jusqu'à Projet)
      const scrollOffset = 0.06;
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          ((scrollPosition - valuesTriggerPoint) /
            (projetTriggerPoint - valuesTriggerPoint) -
            scrollOffset) /
            (1 - scrollOffset),
        ),
      );

      // Calculer le facteur de fade out des triangles (à partir de la section Projet)
      const fadeOutProgress = Math.max(
        0,
        Math.min(
          1,
          ((scrollPosition - projetTriggerPoint) /
            (footerTriggerPoint - projetTriggerPoint)) *
            2,
        ),
      );

      // Calculer le facteur d'apparition de la maison (synchronisé avec le fade out des triangles)
      const houseVisibilityProgress = fadeOutProgress;

      // Calculer le facteur de rotation de la maison (à partir du footer)
      const rotationProgress = Math.max(
        0,
        Math.min(
          1,
          (scrollPosition - footerTriggerPoint) /
            (documentHeight - footerTriggerPoint),
        ),
      );

      // Définir les valeurs cibles en fonction de la direction du défilement
      let targetExplosion,
        targetTriangleFadeOut,
        targetHouseVisibility,
        targetRotation;

      if (scrollingDown) {
        // Défilement vers le bas - progression normale
        targetExplosion = Math.max(0, Math.min(1, scrollProgress * 0.8));
        targetTriangleFadeOut = Math.max(0, Math.min(1, fadeOutProgress));
        targetHouseVisibility = Math.max(
          0,
          Math.min(1, houseVisibilityProgress),
        );
        targetRotation = Math.max(0, Math.min(1, rotationProgress * 2));
      } else {
        // Défilement vers le haut - recomposition de la sphère et disparition de la maison
        if (scrollPosition < projetTriggerPoint) {
          // Avant la section Projet - recomposer la sphère normalement
          targetExplosion = Math.max(0, Math.min(1, scrollProgress * 0.8));
          targetTriangleFadeOut = 0; // Triangles pleinement visibles
          targetHouseVisibility = 0; // Maison invisible
        } else {
          // Après la section Projet - maintenir l'état actuel des triangles mais ajuster la maison
          targetExplosion = explosionFactor;
          targetTriangleFadeOut = Math.max(0, Math.min(1, fadeOutProgress));
          targetHouseVisibility = Math.max(
            0,
            Math.min(1, houseVisibilityProgress),
          );
        }
        targetRotation = Math.max(0, Math.min(1, rotationProgress * 2));
      }

      // Transition douce
      const explosionTransitionSpeed = 0.05;
      const fadeTransitionSpeed = 0.03;
      const houseTransitionSpeed = 0.03;
      const rotationTransitionSpeed = 0.01; // Transition très douce pour la rotation

      explosionFactor +=
        (targetExplosion - explosionFactor) * explosionTransitionSpeed;
      triangleFadeOutFactor +=
        (targetTriangleFadeOut - triangleFadeOutFactor) * fadeTransitionSpeed;
      houseVisibilityFactor +=
        (targetHouseVisibility - houseVisibilityFactor) * houseTransitionSpeed;
      houseRotationFactor +=
        (targetRotation - houseRotationFactor) * rotationTransitionSpeed;

      // Mettre à jour la visibilité et la position de la maison
      modernHouse.visible = houseVisibilityFactor > 0.01;
      modernHouse.position.z = -15 + houseVisibilityFactor * 20; // Avancer progressivement depuis le fond

      // Rotation progressive de la maison en fin de site
      modernHouse.rotation.y = Math.PI * 1 + houseRotationFactor * Math.PI;

      // Ajuster l'opacité des matériaux de la maison
      modernHouse.traverse((object) => {
        if (object instanceof THREE.LineSegments) {
          if (object.material instanceof THREE.Material) {
            object.material.opacity = Math.min(0.6, houseVisibilityFactor);
          }
        }
      });

      // Mettre à jour la position et l'opacité de chaque triangle
      triangles.forEach((triangle) => {
        const { direction } = triangle.userData;

        // Déplacer le triangle en fonction du facteur d'éclatement
        const explosionDistance = 15; // Distance maximale d'éclatement
        triangle.position.x = direction.x * explosionFactor * explosionDistance;
        triangle.position.y = direction.y * explosionFactor * explosionDistance;
        triangle.position.z = direction.z * explosionFactor * explosionDistance;

        // Ajuster l'opacité en fonction du fade out
        (triangle.material as THREE.MeshBasicMaterial).opacity = Math.max(
          0,
          0.4 * (1 - triangleFadeOutFactor),
        );

        // Faire tourner chaque triangle individuellement
        triangle.rotation.x += 0.001;
        triangle.rotation.y += 0.002;
      });

      // Rotation globale de la caméra pour un effet plus dynamique
      camera.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.5;
      camera.position.y = Math.cos(clock.getElapsedTime() * 0.2) * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountElement) {
        mountElement.removeChild(renderer.domElement);
      }

      // Nettoyer les ressources
      triangles.forEach((triangle) => {
        triangle.geometry.dispose();
        (triangle.material as THREE.Material).dispose();
      });
      baseGeometry.dispose();

      // Nettoyer les ressources de la maison moderne
      modernHouse.traverse((object) => {
        if (object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 opacity-90" />;
}
