/* ---------------------------------------------------------
   2. GALAXIA ESPIRAL (puntos de colores girando)
--------------------------------------------------------- */
const GALAXY_COUNT = 9000;
const galaxyGeometry = new THREE.BufferGeometry();
const galaxyPositions = new Float32Array(GALAXY_COUNT * 3);
const galaxyColors = new Float32Array(GALAXY_COUNT * 3);
const galaxyAngles = new Float32Array(GALAXY_COUNT);
const galaxyRadii = new Float32Array(GALAXY_COUNT);

// Paleta de colores ajustada para un morado cósmico
const palette = [
  new THREE.Color(0x6a0dad), // Morado intenso
  new THREE.Color(0x9370db), // Morado medio
  new THREE.Color(0x4b0082), // Índigo
  new THREE.Color(0x00008b), // Azul oscuro
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

  // Selección de color aleatoria de la nueva paleta morada
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

// Núcleo brillante en el centro con un tono más frío
const coreLight = new THREE.PointLight(0xe0b0ff, 6, 10, 2); // Lavanda suave
coreLight.position.set(0, 0.2, 0);
scene.add(coreLight);

const coreGeo = new THREE.SphereGeometry(0.18, 24, 24);
const coreMat = new THREE.MeshBasicMaterial({ color: 0xf3eaff }); // Ink color de la intro
const coreMesh = new THREE.Mesh(coreGeo, coreMat);
scene.add(coreMesh);
