"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WireframeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountElement = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountElement.appendChild(renderer.domElement);

    // Créer une géométrie d'icosaèdre pour avoir des triangles bien définis
    const baseGeometry = new THREE.IcosahedronGeometry(3, 1);

    // Convertir en géométrie de triangles individuels
    const triangles: THREE.Mesh[] = [];
    const positions = baseGeometry.attributes.position.array;

    // Créer des triangles individuels
    for (let i = 0; i < positions.length; i += 9) {
      const triangleGeometry = new THREE.BufferGeometry();
      const vertices = new Float32Array([positions[i], positions[i + 1], positions[i + 2], positions[i + 3], positions[i + 4], positions[i + 5], positions[i + 6], positions[i + 7], positions[i + 8]]);

      triangleGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

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
        direction: new THREE.Vector3(centerX * (Math.random() * 0.5 + 0.5), centerY * (Math.random() * 0.5 + 0.5), centerZ * (Math.random() * 0.5 + 0.5)).normalize(),
      };

      triangles.push(triangle);
      scene.add(triangle);
    }

    const clock = new THREE.Clock();

    // Facteur d'éclatement (0 = forme originale, 1 = complètement éclaté)
    let explosionFactor = 0;

    function animate() {
      requestAnimationFrame(animate);

      // Trouver la section Values
      const valuesSection = document.querySelector(".values-section");
      let scrollTriggerPoint = 0;

      if (valuesSection) {
        // Calculer le point de déclenchement au milieu de la section Values
        const valuesSectionRect = valuesSection.getBoundingClientRect();
        const valuesSectionMiddle = valuesSectionRect.top + valuesSectionRect.height / 1.5;
        scrollTriggerPoint = window.scrollY + valuesSectionMiddle - window.innerHeight / 1.5;
      }

      // Calculer le facteur d'éclatement basé sur le scroll par rapport au point de déclenchement
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Normaliser la progression du scroll à partir du point de déclenchement
      // 0 = avant le point de déclenchement, 1 = fin de la page
      const scrollProgress = Math.max(0, Math.min(1, (scrollPosition - scrollTriggerPoint) / (documentHeight - scrollTriggerPoint)));

      const targetExplosion = Math.max(0, Math.min(1, scrollProgress * 0.6)); // Multiplier pour accélérer l'effet

      // Transition douce avec une vitesse différente selon la direction du scroll
      // Plus rapide pour recomposer (scroll up) que pour exploser (scroll down)
      const transitionSpeed = targetExplosion > explosionFactor ? 0.05 : 0.1;
      explosionFactor += (targetExplosion - explosionFactor) * transitionSpeed;

      // Mettre à jour la position de chaque triangle
      triangles.forEach((triangle) => {
        const { direction } = triangle.userData;

        // Déplacer le triangle en fonction du facteur d'éclatement
        const explosionDistance = 15; // Distance maximale d'éclatement
        triangle.position.x = direction.x * explosionFactor * explosionDistance;
        triangle.position.y = direction.y * explosionFactor * explosionDistance;
        triangle.position.z = direction.z * explosionFactor * explosionDistance;

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
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 opacity-90" />;
}
