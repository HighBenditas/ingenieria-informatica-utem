export const site = {
  title: "Ingeniería en Informática UTEM | Explora tu futuro",
  description:
    "Conoce Ingeniería en Informática UTEM: ocho semestres, perfil de egreso, malla curricular, campo laboral y orientación para la admisión 2027. Proyecto estudiantil.",
  university: "Universidad Tecnológica Metropolitana",
  campus: "Campus Ñuñoa",
  admissionsUrl: "https://www.utem.cl/admision/admision-acceso-via-paes/",
  curriculumUrl:
    "https://www.utem.cl/wp-content/uploads/2026/05/INGENIERIA_EN_INFORMATICA_UTEM.pdf",
  reviewDate: "5 de noviembre de 2026",
};
export const navigation = [
  { href: "#inicio", label: "Inicio" },
  { href: "#carrera", label: "La carrera" },
  { href: "#malla", label: "Qué aprenderás" },
  { href: "#campo-laboral", label: "Campo laboral" },
  { href: "#admision", label: "Admisión" },
  { href: "#preguntas", label: "Preguntas frecuentes" },
];
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
export const admissions = {
  process: 2027,
  code: "21030",
  minimumAverage: 458,
  weights: [
    { label: "NEM", value: 10 },
    { label: "Ranking", value: 25 },
    { label: "Competencia Lectora", value: 20 },
    { label: "Matemática M1", value: 30 },
    { label: "Matemática M2", value: 5 },
    { label: "Ciencias o Historia y Cs. Sociales", value: 10 },
  ],
};
// Do not publish unsupported figures. Each future indicator must include its year and source.
export interface VerifiedIndicator {
  label: string;
  value: string;
  year: number;
  sourceUrl: string;
}
export const employmentIndicators: VerifiedIndicator[] = [];
export const pendingVerification = [
  "Confirmar con la Escuela las diferencias restantes entre la malla web y el folleto PDF.",
  "Verificar créditos del Sistema de Créditos Transferibles (SCT) y prerrequisitos en una resolución vigente antes de agregarlos.",
  "Contrastar la acreditación institucional con la resolución actualizada de CNA; su portal no respondió durante esta revisión.",
  "Obtener indicadores de Mi Futuro y del Servicio de Información de Educación Superior (SIES) con año y cohorte identificados. El folleto no especifica el año estadístico.",
  "Validar las preguntas frecuentes mediante la investigación de audiencia pendiente.",
  "Confirmar recursos de laboratorios y cuerpo académico específicos de la carrera antes de describirlos.",
];
