import type { ImageMetadata } from "astro";
import coding from "../assets/coding-team.jpg";
import students from "../assets/students.jpg";
import collaboration from "../assets/collaboration.jpg";

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
    image: coding,
    label: "Crear soluciones",
    alt: "Un equipo conversa frente a un computador con código en pantalla.",
    position: "65% 50%",
    author: "cottonbro studio",
    source: "https://www.pexels.com/photo/people-working-together-6804071/",
  },
  {
    image: students,
    label: "Aprender en equipo",
    alt: "Cuatro personas comparten ideas mientras trabajan con un computador portátil.",
    position: "65% 45%",
    author: "Alexander Suhorucov",
    source:
      "https://www.pexels.com/photo/multiethnic-students-using-laptop-while-studying-6457572/",
  },
  {
    image: collaboration,
    label: "Conectar ideas",
    alt: "Vista superior de varias manos reunidas alrededor de un computador portátil.",
    position: "70% 50%",
    author: "Mikhail Nilov",
    source:
      "https://www.pexels.com/photo/group-of-people-with-their-hands-on-laptop-6894202/",
  },
];
