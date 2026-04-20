/* ============================================================
   MH DENTAL WORLD — Premium 3D Hero Animation
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("hero-3d-canvas");
  if (!container || typeof THREE === 'undefined') return;

  // 1. Setup Scene, Camera, Renderer
  const scene = new THREE.Scene();
  
  const isMobile = window.innerWidth <= 768;
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, isMobile ? 12 : 9.5); // Zooms out optimally so the whole tooth is gracefully framed

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, logarithmicDepthBuffer: true });
  const width = container.clientWidth || 500;
  const height = container.clientHeight || 550;
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  container.appendChild(renderer.domElement);

  // 2. Procedural Premium 3D Tooth Generation
  const toothGroup = new THREE.Group();

  // Solid, Hyper-Visible Darker Pink Enamel
  const enamelMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xc71585, // Medium Violet Red / Darker Pink
    emissive: 0x8b0022, // Deep Crimson glow
    emissiveIntensity: 0.6,
    metalness: 0.1,
    roughness: 0.05, 
    transmission: 0, 
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });

  const crownGeo = new THREE.CylinderGeometry(1.6, 1.2, 1.8, 64);
  const crown = new THREE.Mesh(crownGeo, enamelMaterial);
  crown.position.y = 0.6;
  toothGroup.add(crown);

  const createCusp = (x, z) => {
    const cuspGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const cusp = new THREE.Mesh(cuspGeo, enamelMaterial);
    cusp.position.set(x, 1.3, z);
    cusp.scale.set(1, 0.8, 1);
    toothGroup.add(cusp);
  };
  createCusp(0.65, 0.65);
  createCusp(-0.65, 0.65);
  createCusp(0.65, -0.65);
  createCusp(-0.65, -0.65);

  const createRoot = (x, z, rotZ, rotX) => {
    const rootGeo = new THREE.CylinderGeometry(0.6, 0.05, 3.2, 32);
    const root = new THREE.Mesh(rootGeo, enamelMaterial);
    root.position.set(x, -1.3, z);
    root.rotation.z = rotZ;
    root.rotation.x = rotX;
    toothGroup.add(root);
  };
  createRoot(0.6, 0, 0.2, 0);
  createRoot(-0.6, 0, -0.2, 0);

  toothGroup.rotation.x = 0.2;
  toothGroup.rotation.y = -0.4;
  toothGroup.position.y = isMobile ? 0.8 : 1.5; // Adjusted down for responsive framing
  scene.add(toothGroup);

  // 3. Dynamic Ambient Particles
  const particlesGeo = new THREE.BufferGeometry();
  const particleCount = 150;
  const posArray = new Float32Array(particleCount * 3);
  for(let i=0; i<particleCount*3; i++){
    posArray[i] = (Math.random() - 0.5) * 11;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMat = new THREE.PointsMaterial({
    size: 0.25,
    color: 0xff1493, 
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending
  });
  const particleMesh = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particleMesh);

  // 4. Advanced Studio Lighting Rig
  const hemiLight = new THREE.HemisphereLight(0xffb6c1, 0xdc3558, 1.5);
  scene.add(hemiLight);

  const keyLight = new THREE.PointLight(0xff1493, 8.0, 50);
  keyLight.position.set(6, 6, 4);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xdc3558, 6.0, 50);
  fillLight.position.set(-6, 2, 4);
  scene.add(fillLight);

  // 5. Mouse Interaction / Parallax Setup
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
  });

  // 6. Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    const baseY = window.innerWidth <= 768 ? 0.5 : 1.2;
    toothGroup.position.y = baseY + Math.sin(elapsedTime * 2.0) * 0.25; // Base shifted dynamically
    toothGroup.rotation.y += 0.02; 

    targetX = mouseX * 0.8;
    targetY = mouseY * 0.8;
    
    toothGroup.rotation.y += 0.05 * (targetX - toothGroup.rotation.y);
    toothGroup.rotation.x += 0.05 * (targetY - toothGroup.rotation.x);

    particleMesh.rotation.y -= 0.003; 
    particleMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.3;

    renderer.render(scene, camera);
  }

  animate();

  // 7. Responsive Window Resizing
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 550;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
});
