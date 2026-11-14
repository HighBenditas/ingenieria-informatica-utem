// Imágenes del carrusel del hero, con sus textos y créditos (los usan HeroCarousel.astro y Referencias.astro).
// ImageMetadata es el tipo que Astro da a una imagen importada (ruta, ancho y alto).
import type { ImageMetadata } from "astro";
// Se importan las imágenes locales; Astro las optimiza al construir el sitio.
import cybersecurity from "../assets/hero-ciberseguridad.webp";
import development from "../assets/hero-desarrollo.webp";
import servers from "../assets/hero-servidores.webp";

// Forma que debe tener cada diapositiva. TypeScript avisa si falta algún campo.
interface HeroSlide {
  // La imagen importada.
  image: ImageMetadata;
  // Nombre corto: se muestra en lectores de pantalla y en los créditos.
  label: string;
  // Texto alternativo: describe la imagen para personas que no la ven (accesibilidad).
  alt: string;
  // Parte de la imagen que se mantiene visible al recortarla (formato "horizontal% vertical%").
  position: string;
  // Autor de la fotografía y enlace al original en Pexels (crédito obligatorio).
  author: string;
  source: string;
}
// Las tres diapositivas, en el orden en que aparecen.
export const heroSlides: HeroSlide[] = [
  {
    image: cybersecurity,
    label: "Ciberseguridad · imagen conceptual",
    alt: "Pantalla con una interfaz tecnológica azul y paneles de información, como representación conceptual de ciberseguridad.",
    position: "60% 50%",
    author: "Tima Miroshnichenko",
    source: "https://www.pexels.com/photo/close-up-view-of-system-hacking-5380642/",
  },
  {
    image: development,
    label: "Desarrollo de software",
    alt: "Un desarrollador trabaja con código y documentación en dos monitores.",
    position: "60% 55%",
    author: "Zayed Hossain",
    source:
      "https://www.pexels.com/photo/developer-working-on-code-in-a-modern-office-36706460/",
  },
  {
    image: servers,
    label: "Servidores y almacenamiento de datos",
    alt: "Pasillo de un centro de datos con filas de gabinetes de servidores y una estación de mantenimiento.",
    position: "65% 50%",
    author: "Brett Sayles",
    source:
      "https://www.pexels.com/photo/server-racks-on-data-center-4508751/",
  },
];
