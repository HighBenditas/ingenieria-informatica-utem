// Datos generales del sitio que usan varios componentes.
// Datos generales: título y descripción de la página (SEO), universidad, sede y enlaces oficiales.
export const site = {
  title: "Ingeniería en Informática UTEM | Explora tu futuro",
  description:
    "Conoce Ingeniería en Informática UTEM: ocho semestres, perfil de egreso, malla curricular, campo laboral y orientación para la admisión 2027. Proyecto estudiantil.",
  university: "Universidad Tecnológica Metropolitana",
  campus: "Campus Ñuñoa",
  // Página oficial de admisión por PAES.
  admissionsUrl: "https://www.utem.cl/admision/admision-acceso-via-paes/",
  // PDF oficial con el folleto y la malla.
  curriculumUrl:
    "https://www.utem.cl/wp-content/uploads/2026/05/INGENIERIA_EN_INFORMATICA_UTEM.pdf",
  // Fecha de la última revisión general del contenido (se muestra en Referencias).
  reviewDate: "5 de noviembre de 2026",
};
// Enlaces del menú: destino dentro de la página (href) y texto visible (label).
// Header.astro usa los elementos 1 a 3 en escritorio y todos en móvil.
export const navigation = [
  { href: "#inicio", label: "Inicio" },
  { href: "#carrera", label: "La carrera" },
  { href: "#malla", label: "Qué aprenderás" },
  { href: "#campo-laboral", label: "Campo laboral" },
  { href: "#admision", label: "Admisión" },
  { href: "#preguntas", label: "Preguntas frecuentes" },
];
// Competencias del perfil de egreso, reescritas en lenguaje claro (las muestra PerfilEgreso.astro).
// icon: nombre del ícono (ver Icon.astro). source: ID de la referencia de la que sale.
// "as const" hace que los valores sean fijos, para que TypeScript compruebe que cada icon existe.
export const competencies = [
  {
    icon: "code",
    title: "Crear software",
    description: "Diseñar e integrar soluciones informáticas.",
    source: "carrera",
  },
  {
    icon: "layers",
    title: "Gestionar sistemas",
    description: "Administrar tecnologías y recursos computacionales.",
    source: "carrera",
  },
  {
    icon: "network",
    title: "Conectar redes",
    description: "Organizar la comunicación de datos.",
    source: "carrera",
  },
  {
    icon: "shield",
    title: "Cuidar la información",
    description: "Aplicar criterios de seguridad y calidad.",
    source: "carrera",
  },
  {
    icon: "spark",
    title: "Resolver problemas",
    description: "Evaluar alternativas tecnológicas.",
    source: "carrera",
  },
  {
    icon: "people",
    title: "Trabajar en equipo",
    description: "Colaborar y comunicar con responsabilidad.",
    source: "carrera",
  },
] as const;
// Datos de admisión del proceso 2027 (los usan Hero, AccesosRapidos y Admision).
// weights: ponderación de cada prueba o criterio, en porcentaje.
export const admissions = {
  process: 2027,
  code: "21030",
  weights: [
    { label: "NEM", value: 10 },
    { label: "Ranking", value: 25 },
    { label: "Competencia Lectora", value: 20 },
    { label: "Matemática M1", value: 30 },
    { label: "Matemática M2", value: 5 },
    { label: "Ciencias o Historia y Cs. Sociales", value: 10 },
  ],
};
// Ficha de datos de la portada (la muestra Hero.astro). Cada dato tiene su etiqueta y una o más
// líneas de valor; "emphasis" es un número destacado que va antes del texto (por ejemplo "8" semestres).
export interface CareerFact {
  label: string;
  lines: string[];
  emphasis?: string;
}
export const careerFacts: CareerFact[] = [
  { label: "Duración", emphasis: "8", lines: ["semestres"] },
  { label: "Jornada", lines: ["Diurna"] },
  { label: "Título profesional", lines: ["Ingeniera / Ingeniero", "en Informática"] },
  { label: "Grado académico", lines: ["Licenciada / Licenciado", "en Informática"] },
  { label: "Sede o campus", lines: [site.campus] },
  { label: "Código DEMRE", lines: [admissions.code] },
];
// Do not publish unsupported figures. Each future indicator must include its year and source.
// Un indicador de empleabilidad verificado debe traer su valor, su año y el enlace a la fuente.
export interface VerifiedIndicator {
  label: string;
  value: string;
  year: number;
  sourceUrl: string;
}
// Lista vacía a propósito: no se publican cifras sin año y fuente verificables.
// CampoLaboral.astro los muestra solo cuando haya al menos uno.
export const employmentIndicators: VerifiedIndicator[] = [];
// Datos que el equipo aún debe confirmar (se muestran en Referencias, en "Transparencia editorial").
export const pendingVerification = [
  "Confirmar con la Escuela las diferencias restantes entre la malla web y el folleto PDF.",
  "Verificar créditos del Sistema de Créditos Transferibles (SCT) y prerrequisitos en una resolución vigente antes de agregarlos.",
  "Contrastar la acreditación institucional con la resolución actualizada de CNA; su portal no respondió durante esta revisión.",
  "Obtener indicadores de Mi Futuro y del Servicio de Información de Educación Superior (SIES) con año y cohorte identificados. El folleto no especifica el año estadístico.",
  "Validar las preguntas frecuentes mediante la investigación de audiencia pendiente.",
  "Confirmar recursos de laboratorios y cuerpo académico específicos de la carrera antes de describirlos.",
];
