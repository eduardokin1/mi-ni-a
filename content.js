// ============================================================
//  content.js
//  Personaliza aquí todo el contenido de la página:
//  títulos, mensajes y los "recuerdos" que aparecen como
//  burbujas orbitando la galaxia.
// ============================================================

// IMAGEN POR DEFECTO que aparece si un universo no tiene una imagen específica.
// Usamos "kuromi.jpg" que es la versión animada clásica que subiste.
const DEFAULT_MODAL_IMAGE = "kuromi.jpg";

const INTRO = {
  glyph: "💌",
  title: "Te amo",
  subtitle: "Haz clic para iniciar",
  buttonLabel: "Iniciar"
};

const HUD = {
  eyebrow: "Para Alguien Especial",
  headline: "Cada estrella tiene tu nombre escrito"
};

// Cada "memory" se muestra como una burbuja orbitando la galaxia.
// Se han asignado las fotos que subiste a cada sección correspondiente.
const MEMORIES = [
  {
    emoji: "🐻",
    label: "Contigo Siempre",
    angle: 20,
    radius: 30,
    speed: 1,
    title: "Contigo Siempre",
    text: "Desde el día en que te conocí supe que quería tenerte cerca en cada momento de mi vida Contigo el tiempo se siente distinto más lento, más cálido, más nuestro",
    image: "WhatsApp Image 2026-06-26 at 6.56.21 PM.jpeg" // Foto de ustedes dos juntos en el pasto
  },
  {
    emoji: "⭐",
    label: "Estrella Polar",
    angle: 80,
    radius: 34,
    speed: 0.8,
    title: "Mi Estrella Polar",
    text: "En los días confusos pienso en ti y todo vuelve a tener sentido Eres el punto fijo que me ayuda a encontrar el camino",
    image: "Kuromi-Character-PNG.jpg" // Kuromi en 3D con vestidito morado y sombrero
  },
  {
    emoji: "💋",
    label: "Nebulosa de Besos",
    angle: 150,
    radius: 28,
    speed: 1.1,
    title: "Nebulosa de Besos",
    text: "Si pudiera juntar cada beso que te he dado formarían su propia galaxia Y aún así querría darte mas besos",
    image: "WhatsApp Image 2026-06-26 at 6.56.58 PM.jpeg" // Foto de ustedes con el filtro de perrito
  },
  {
    emoji: "♾️",
    label: "Infinito",
    angle: 210,
    radius: 32,
    speed: 0.9,
    title: "Hasta el Infinito",
    text: "No importa cuántas vueltas dé el universo mi cariño por ti no tiene fecha de caducidad Esto es para siempre",
    image: "WhatsApp Image 2026-06-26 at 6.56.42 PM.jpeg" // Foto de sus manos entrelazadas en los asientos azules
  },
  {
    emoji: "🪐",
    label: "Órbita Eterna",
    angle: 270,
    radius: 36,
    speed: 1,
    title: "Órbita Eterna",
    text: "Giro alrededor de ti como un planeta alrededor de su sol sin esfuerzo, sin pedirlo, simplemente porque es lo natural",
    image: "kuromi-with-melody-free-vector.jpg" // Kuromi abrazando un peluche de My Melody
  },
  {
    emoji: "🌌",
    label: "Gravedad de Amor",
    angle: 330,
    radius: 30,
    speed: 1.05,
    title: "Gravedad de Amor",
    text: "Hay una fuerza que no puedo explicar me atrae hacia ti sin remedio y no quiero que cambie",
    image: "kuromi.jpg" // Imagen de Kuromi picando el ojo y moviendo la colita
  }
];

const FOOTER_TEXT = "Hecho con ❤ — Para la persona que ilumina mi universo";
