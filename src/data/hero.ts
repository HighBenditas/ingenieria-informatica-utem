import type { ImageMetadata } from "astro";
import cybersecurity from "../assets/hero-ciberseguridad.webp";
import development from "../assets/hero-desarrollo.webp";
import servers from "../assets/hero-servidores.webp";

interface HeroSlide {
  image: ImageMetadata;
  label: string;
  alt: string;
  position: string;
  author: string;
  source: string;
}
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
