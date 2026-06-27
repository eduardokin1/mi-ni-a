// ============================================================
//  galaxy.js
//  Escena 3D: galaxia espiral de partículas + corazón que
//  emerge del centro. Además maneja el flujo de la interfaz
//  (intro -> escena -> burbujas -> modal).
// ============================================================

// THREE ya está disponible como variable global (cargado vía <script> en index.html)
// INTRO, HUD, MEMORIES y FOOTER_TEXT vienen de content.js (cargado antes que este archivo)

/* ---------------------------------------------------------
   1. SETUP BÁSICO DE THREE.JS
--------------------------------------------------------- */
const canvas = document.getElementById("scene-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05030d);
scene.fog = new THREE.FogExp2(0x05030d, 0.06);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 4.2, 9.5);
camera.lookAt(0, 1, 0);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ---------------------------------------------------------
   2. GALAXIA ESPIRAL (puntos de colores girando)
--------------------------------------------------------- */
const GALAXY_COUNT = 9000;
const galaxyGeometry = new THREE.BufferGeometry();
const galaxyPositions = new Float32Array(GALAXY_COUNT * 3);
const galaxyColors = new Float32Array(GALAXY_COUNT * 3);
const galaxyAngles = new Float32Array(GALAXY_COUNT);
const galaxyRadii = new Float32Array(GALAXY_COUNT);

const palette = [
  new THREE.Color(0xff3fb0), // magenta
  new THREE.Color(0x3fe0ff), // cyan
  new THREE.Color(0xffd76a), // gold
];

const ARMS = 4;
const SPIN = 3.2;
const RANDOMNESS = 0.4;

for (let i = 0; i < GALAXY_COUNT; i++) {
  const i3 = i * 3;

  const radius = Math.pow(Math.random(), 1.4) * 5.2;
  const armAngle = ((i % ARMS) / ARMS) * Math.PI * 2;
  const spinAngle = radius * SPIN;

  const randomX = (Math.random() - 0.5) * RANDOMNESS * radius * 0.5;
  const randomY = (Math.random() - 0.5) * RANDOMNESS * 0.25;
  const randomZ = (Math.random() - 0.5) * RANDOMNESS * radius * 0.5;

  const angle = armAngle + spinAngle;

  galaxyAngles[i] = angle;
  galaxyRadii[i] = radius;

  galaxyPositions[i3]     = Math.cos(angle) * radius + randomX;
  galaxyPositions[i3 + 1] = randomY;
  galaxyPositions[i3 + 2] = Math.sin(angle) * radius + randomZ;

  const color = palette[Math.floor(Math.random() * palette.length)].clone();
  const mix = Math.random() * 0.4;
  color.offsetHSL(0, 0, mix);

  galaxyColors[i3]     = color.r;
  galaxyColors[i3 + 1] = color.g;
  galaxyColors[i3 + 2] = color.b;
}

galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(galaxyPositions, 3));
galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(galaxyColors, 3));

const galaxyMaterial = new THREE.PointsMaterial({
  size: 0.045,
  sizeAttenuation: true,
  vertexColors: true,
  transparent: true,
  opacity: 0.9,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
scene.add(galaxyPoints);

// Núcleo brillante en el centro
const coreLight = new THREE.PointLight(0xffe9b0, 6, 10, 2);
coreLight.position.set(0, 0.2, 0);
scene.add(coreLight);

const coreGeo = new THREE.SphereGeometry(0.18, 24, 24);
const coreMat = new THREE.MeshBasicMaterial({ color: 0xfff3d6 });
const coreMesh = new THREE.Mesh(coreGeo, coreMat);
scene.add(coreMesh);

/* ---------------------------------------------------------
   3. CORAZÓN DE PARTÍCULAS (emerge sobre la galaxia)
--------------------------------------------------------- */
function heartPoint(t) {
  // Curva paramétrica clásica del corazón
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  return { x: x / 16, y: y / 16 };
}

const HEART_COUNT = 2600;
const heartGeometry = new THREE.BufferGeometry();
const heartPositions = new Float32Array(HEART_COUNT * 3);
const heartColors = new Float32Array(HEART_COUNT * 3);
const heartBase = new Float32Array(HEART_COUNT * 3); // posición base para animar

const heartColor = new THREE.Color(0xff2e9e);

for (let i = 0; i < HEART_COUNT; i++) {
  const i3 = i * 3;
  const t = Math.random() * Math.PI * 2;
  const jitter = Math.random() * 0.06;
  const p = heartPoint(t);

  const scale = 1.45;
  const x = p.x * scale + (Math.random() - 0.5) * jitter;
  const y = p.y * scale + (Math.random() - 0.5) * jitter + 3.0; // elevado sobre la galaxia
  const z = (Math.random() - 0.5) * 0.25;

  heartBase[i3] = x;
  heartBase[i3 + 1] = y;
  heartBase[i3 + 2] = z;

  heartPositions[i3] = x;
  heartPositions[i3 + 1] = 0; // arranca colapsado, se anima hacia arriba en el render loop
  heartPositions[i3 + 2] = z;

  const c = heartColor.clone().offsetHSL((Math.random() - 0.5) * 0.04, 0, Math.random() * 0.25);
  heartColors[i3] = c.r;
  heartColors[i3 + 1] = c.g;
  heartColors[i3 + 2] = c.b;
}

heartGeometry.setAttribute("position", new THREE.BufferAttribute(heartPositions, 3));
heartGeometry.setAttribute("color", new THREE.BufferAttribute(heartColors, 3));

const heartMaterial = new THREE.PointsMaterial({
  size: 0.05,
  vertexColors: true,
  transparent: true,
  opacity: 0.95,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const heartPoints = new THREE.Points(heartGeometry, heartMaterial);
scene.add(heartPoints);

/* ---------------------------------------------------------
   4. LOOP DE ANIMACIÓN
--------------------------------------------------------- */
const clock = new THREE.Clock();
let sceneStarted = false;
let revealProgress = 0; // 0 -> 1, anima el corazón apareciendo

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Rotar la galaxia lentamente
  galaxyPoints.rotation.y = elapsed * 0.06;
  coreMesh.rotation.y = elapsed * 0.06;

  // Suave "respiración" de cámara
  camera.position.x = Math.sin(elapsed * 0.05) * 0.6;
  camera.lookAt(0, 1.4, 0);

  if (sceneStarted && revealProgress < 1) {
    revealProgress = Math.min(1, revealProgress + 0.004);
    const posAttr = heartGeometry.getAttribute("position");
    for (let i = 0; i < HEART_COUNT; i++) {
      const i3 = i * 3;
      const targetY = heartBase[i3 + 1];
      posAttr.array[i3 + 1] = THREE.MathUtils.lerp(0, targetY, easeOutCubic(revealProgress));
    }
    posAttr.needsUpdate = true;
  }

  // Leve flotación del corazón ya formado
  if (revealProgress >= 1) {
    heartPoints.position.y = Math.sin(elapsed * 0.8) * 0.05;
  }

  renderer.render(scene, camera);
}
function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
animate();

/* ---------------------------------------------------------
   5. INTERFAZ: intro, hud, burbujas orbitales, modal
--------------------------------------------------------- */
function applyStaticContent() {
  document.querySelector(".intro-glyph").textContent = INTRO.glyph;
  document.querySelector(".intro-title").textContent = INTRO.title;
  document.querySelector(".intro-sub").textContent = INTRO.subtitle;
  document.getElementById("startBtn").textContent = INTRO.buttonLabel;

  document.querySelector("#hud .label-top").textContent = HUD.eyebrow;
  document.querySelector("#hud h1").textContent = HUD.headline;

  document.getElementById("footer-credit").textContent = FOOTER_TEXT;
}
applyStaticContent();

function buildOrbitBubbles() {
  const layer = document.getElementById("orbit-layer");
  layer.innerHTML = "";

  MEMORIES.forEach((mem, idx) => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.animationDelay = `${idx * 0.4}s`;
    bubble.dataset.index = idx;
    bubble.innerHTML = `${mem.emoji}<span class="tag">${mem.label}</span>`;
    layer.appendChild(bubble);

    bubble.addEventListener("click", () => openModal(mem));
  });

  positionBubbles();
}

function positionBubbles() {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2 + window.innerHeight * 0.04;
  const minDim = Math.min(window.innerWidth, window.innerHeight);

  document.querySelectorAll(".bubble").forEach((bubble) => {
    const idx = Number(bubble.dataset.index);
    const mem = MEMORIES[idx];
    const t = orbitState.time * mem.speed + (mem.angle * Math.PI) / 180;
    const r = (mem.radius / 100) * minDim;

    const x = cx + Math.cos(t) * r;
    const y = cy + Math.sin(t) * r * 0.55; // aplanada para look "orbital"

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
  });
}

const orbitState = { time: 0 };
function orbitLoop() {
  orbitState.time += 0.0022;
  if (sceneStarted) positionBubbles();
  requestAnimationFrame(orbitLoop);
}
orbitLoop();

window.addEventListener("resize", positionBubbles);

/* ----------------- Modal ----------------- */
const modalBackdrop = document.getElementById("modal-backdrop");
const modalImage = document.getElementById("modalImage");
const modalEmoji = document.getElementById("modalEmoji");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

function openModal(mem) {
  // Usa la imagen específica del mensaje si tiene una, si no, la imagen
  // por defecto (DEFAULT_MODAL_IMAGE, ej. tu foto de Kuromi).
  const imgSrc = (mem.image && mem.image.trim()) ? mem.image : DEFAULT_MODAL_IMAGE;

  if (imgSrc && imgSrc.trim()) {
    modalImage.src = imgSrc;
    modalImage.classList.add("has-image");
    // Si la imagen no existe o no carga, la ocultamos para no romper el diseño
    modalImage.onerror = () => modalImage.classList.remove("has-image");
  } else {
    modalImage.classList.remove("has-image");
  }

  modalEmoji.textContent = mem.emoji;
  modalTitle.textContent = mem.title;
  modalText.textContent = mem.text;
  modalBackdrop.classList.add("show");
}
function closeModal() {
  modalBackdrop.classList.remove("show");
}
document.getElementById("closeBtn").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

/* ----------------- Intro -> Start ----------------- */
document.getElementById("startBtn").addEventListener("click", () => {
  sceneStarted = true;
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("hud").classList.add("show");
  buildOrbitBubbles();
});
