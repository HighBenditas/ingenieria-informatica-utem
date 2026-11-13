# Uso de asistencia de IA

## Alcance verificable

El usuario declara uso de Codex y ChatGPT. El historial disponible en esta conversación permite documentar asistencia en componentes Astro/TypeScript/CSS, navegación móvil, interacción por semestre, restauración del autoplay del carrusel, selección e integración de fotografías locales de Pexels y actualización de créditos. Los cambios exactos de cada persona deben confirmarse con Git y los registros del equipo; no se asignan autorías individuales aquí.

En esta etapa, Codex asistió en configuración de URL de producción y sitemap, validaciones de build, extracción controlada del texto de comparación a JSON con esquema y elaboración del README y estas instrucciones de verificación. Se eliminó una repetición idéntica de la referencia `mifuturo`, manteniendo su identificador y su fuente.

Las herramientas de ejecución consultaron archivos, diferencias de Git y comandos npm. Se utilizaron fuentes oficiales de Astro, Netlify y W3C para el criterio técnico. En etapas recientes, las imágenes se descargaron de Pexels y se optimizaron con la herramienta Sharp ya instalada por Astro. No son imágenes generadas por IA ni fotografías institucionales UTEM.

## Revisión humana

El historial registra aprobación explícita de la fotografía final de servidores y solicitudes de conservar el diseño. No demuestra una validación académica final de todos los textos ni una prueba integral por ambos integrantes.

Antes de entregar, ambos integrantes deben revisar y poder explicar:

- Cómo Astro genera HTML estático y por qué el módulo TypeScript no equivale a múltiples islas hidratadas.
- Cómo se validan colecciones y sus relaciones con referencias oficiales.
- Cómo funcionan los estados de semestres mediante CSS y el desplazamiento/anuncio mediante TypeScript.
- Cómo operan el autoplay, el control de pausa, el movimiento reducido y el foco del carrusel.
- Cómo se optimizan imágenes y se conservan autores y enlaces originales.
- Cómo SITE_URL o URL de Netlify alimenta canonical, Open Graph, robots y sitemap.
- Qué verifican los comandos automatizados y qué solo puede comprobar una revisión humana o una medición real.

## Evidencias y límites

Consultar `docs/verificaciones-entrega.md` y conservar las salidas reales de `npm run verify` junto a la versión evaluada. Las pruebas automatizadas no prueban exactitud académica, puntuaciones de Lighthouse/CompliaScan ni usabilidad con estudiantes.

No se reconstruyeron prompts ausentes ni se inventaron encuestas, capturas, resultados, firmas o revisiones. Si la rúbrica exige transcripciones completas, fechas por intervención, versiones de modelos o declaraciones firmadas, esos registros deben aportarse desde las conversaciones originales y completarse por el equipo. Esta síntesis no los reemplaza.
