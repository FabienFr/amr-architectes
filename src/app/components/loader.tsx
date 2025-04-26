"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Loader() {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountElement = mountRef.current;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountElement.appendChild(renderer.domElement);

    // Créer un groupe pour tous les éléments
    const loaderGroup = new THREE.Group();
    scene.add(loaderGroup);

    // Matériaux
    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdaa520,
      metalness: 0.9,
      roughness: 0.1,
      reflectivity: 1.0,
    });

    const goldLineMaterial = new THREE.LineBasicMaterial({
      color: 0xdaa520,
      transparent: true,
      opacity: 0.6,
    });

    // Créer une structure architecturale minimaliste pour le loader
    function createLoaderStructure() {
      // Créer un cube wireframe
      const cubeSize = 5;
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const edges = new THREE.EdgesGeometry(cubeGeometry);
      const wireframe = new THREE.LineSegments(edges, goldLineMaterial);
      loaderGroup.add(wireframe);

      // Ajouter des nœuds aux coins
      const vertices = cubeGeometry.attributes.position;
      for (let i = 0; i < vertices.count; i += 3) {
        const x = vertices.getX(i);
        const y = vertices.getY(i);
        const z = vertices.getZ(i);

        const nodeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const node = new THREE.Mesh(nodeGeometry, goldMaterial);
        node.position.set(x, y, z);
        loaderGroup.add(node);
      }

      // // Ajouter des lignes diagonales pour plus de complexité
      // const diagonalLines = new THREE.Group();
      // loaderGroup.add(diagonalLines);

      // for (let i = 0; i < 4; i++) {
      //   const lineGeometry = new THREE.BufferGeometry();
      //   const start = new THREE.Vector3((Math.random() - 0.5) * cubeSize, (Math.random() - 0.5) * cubeSize, (Math.random() - 0.5) * cubeSize);
      //   const end = new THREE.Vector3((Math.random() - 0.5) * cubeSize, (Math.random() - 0.5) * cubeSize, (Math.random() - 0.5) * cubeSize);

      //   const points = [start, end];
      //   lineGeometry.setFromPoints(points);

      //   const line = new THREE.Line(lineGeometry, goldLineMaterial);
      //   diagonalLines.add(line);
      // }
    }

    createLoaderStructure();

    // Éclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 15);
    scene.add(directionalLight);

    const goldLight = new THREE.PointLight(0xdaa520, 1, 50);
    goldLight.position.set(-10, 15, 10);
    scene.add(goldLight);

    // Animation
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Rotation douce et continue
      loaderGroup.rotation.y += delta * 0.5;
      loaderGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;

      // Effet de pulsation
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.1;
      loaderGroup.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    }

    animate();

    // Gestion du chargement
    const handleLoad = () => {
      if (progressRef.current) {
        progressRef.current.style.width = "100%";
        setTimeout(() => {
          mountElement.style.opacity = "0";
          setTimeout(() => {
            mountElement.style.display = "none";
          }, 500);
        }, 500);
      }
    };

    // Simuler le chargement
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        handleLoad();
      }
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
    }, 100);

    // Responsive
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      if (mountElement) {
        mountElement.removeChild(renderer.domElement);
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Conteneur pour le texte - séparé de la barre de progression */}
      <div className="absolute bottom-28 left-0 right-0 mx-auto text-center">
        <h3 className="text-amber-500 font-extrabold text-xl tracking-wide uppercase font-archivo">AMR</h3>
        <h3 className="text-amber-500 font-extrabold text-xl tracking-wide uppercase font-archivo">ARCHITECTES</h3>
      </div>

      {/* Barre de progression */}
      <div className="absolute bottom-20 left-0 right-0 mx-auto w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full bg-amber-500 transition-all duration-300 ease-out" style={{ width: "0%" }} />
      </div>
    </div>
  );
}
