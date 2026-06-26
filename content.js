// ============================================================
//  content.js
//  Personaliza aquí todo el contenido de la página:
//  títulos, mensajes y los "recuerdos" que aparecen como
//  burbujas orbitando la galaxia.
// ============================================================

// IMAGEN POR DEFECTO que aparece en TODOS los mensajes (ej. Kuromi).
// 1. Descarga tu imagen y guárdala dentro de esta misma carpeta,
//    por ejemplo en una subcarpeta "assets/kuromi.png".
// 2. Escribe esa ruta aquí abajo. Si la dejas vacía (""), no se
//    muestra ninguna imagen.
const DEFAULT_MODAL_IMAGE = "assets/kuromi.jpg";

const INTRO = {
  glyph: "💌",
  title: "I LOVE YOU",
  subtitle: "Haz clic para iniciar",
  buttonLabel: "Iniciar"
};

const HUD = {
  eyebrow: "Para Alguien Especial",
  headline: "Cada estrella tiene tu nombre escrito"
};

// Cada "memory" se muestra como una burbuja orbitando la galaxia.
// angle: posición inicial en grados (0-360) alrededor del centro
// radius: qué tan lejos del centro orbita (en % del tamaño de pantalla)
// speed: velocidad orbital relativa (1 = normal)
// image: (opcional) ruta a una imagen específica para ESTE mensaje.
//        Si no la pones, se usa DEFAULT_MODAL_IMAGE de arriba.
const MEMORIES = [
  {
    emoji: "🐻",
    label: "Contigo Siempre",
    angle: 20,
    radius: 30,
    speed: 1,
    title: "Contigo Siempre",
    text: "Desde el día en que te conocí, supe que quería tenerte cerca en cada capítulo de mi vida. Contigo el tiempo se siente distinto: más lento, más cálido, más nuestro.",
    image: "assets/nosotros3.jpeg"
  },
  {
    emoji: "⭐",
    label: "Estrella Polar",
    angle: 80,
    radius: 34,
    speed: 0.8,
    title: "Mi Estrella Polar",
    text: "En los días confusos, pienso en ti y todo vuelve a tener sentido. Eres el punto fijo que me ayuda a encontrar el camino a casa.",
    image: ""
  },
  {
    emoji: "💋",
    label: "Nebulosa de Besos",
    angle: 150,
    radius: 28,
    speed: 1.1,
    title: "Nebulosa de Besos",
    text: "Si pudiera juntar cada beso que te he dado, formarían su propia galaxia. Y aún así querría darte uno más.",
    image: ""
  },
  {
    emoji: "♾️",
    label: "Infinito",
    angle: 210,
    radius: 32,
    speed: 0.9,
    title: "Hasta el Infinito",
    text: "No importa cuántas vueltas dé el universo, mi cariño por ti no tiene fecha de caducidad. Esto es para siempre.",
    image: ""
  },
  {
    emoji: "🪐",
    label: "Órbita Eterna",
    angle: 270,
    radius: 36,
    speed: 1,
    title: "Órbita Eterna",
    text: "Giro alrededor de ti como un planeta alrededor de su sol: sin esfuerzo, sin pedirlo, simplemente porque es lo natural.",
    image: ""
  },
  {
    emoji: "🌌",
    label: "Gravedad de Amor",
    angle: 330,
    radius: 30,
    speed: 1.05,
    title: "Gravedad de Amor",
    text: "Hay una fuerza que no puedo explicar con física, solo con tu nombre. Me atrae hacia ti sin remedio, y no quiero que cambie.",
    image: ""
  }
];

const FOOTER_TEXT = "Hecho con ❤ — personaliza este código con tu propia historia";
