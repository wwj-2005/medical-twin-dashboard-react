import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Heart3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const light = new THREE.DirectionalLight(0xff8866, 1.0);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x335577, 0.6));

    const material = new THREE.MeshPhongMaterial({ color: 0xff5c5c, wireframe: true, transparent: true, opacity: 0.8 });
    const sph1 = new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 24), material);
    const sph2 = new THREE.Mesh(new THREE.SphereGeometry(1.1, 24, 24), material);
    sph1.position.x = -0.6; sph2.position.x = 0.6;
    sph1.rotation.z = 0.2; sph2.rotation.z = -0.2;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.2, 24, 1, true), material);
    cone.rotation.x = Math.PI;
    cone.position.y = -1.3;

    const group = new THREE.Group();
    group.add(sph1); group.add(sph2); group.add(cone);
    scene.add(group);

    let t = 0;
    const animate = () => {
      t += 0.02;
      const scale = 1.0 + 0.06 * Math.sin(t * 2.5);
      group.scale.setScalar(scale);
      group.rotation.y += 0.003;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    resize(); animate();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => {
      observer.disconnect();
      renderer.dispose();
    }
  }, []);

  return <canvas className="three" />;
}