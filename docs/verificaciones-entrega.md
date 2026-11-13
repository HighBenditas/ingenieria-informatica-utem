# Verificaciones de entrega

Esta lista distingue inspección de código, pruebas automatizadas y comprobaciones reales pendientes. No acredita cumplimiento total de la rúbrica; hace falta adjuntar su versión original y los informes finales.

## Pruebas automatizadas

### Resultado de esta etapa (12 de noviembre de 2026)

- `npm run verify` con SITE_URL temporal `https://example.org`: terminó correctamente. Astro Check informó 0 errores, 0 advertencias y 0 sugerencias. Se generaron y comprobaron el índice y el sitemap de la landing, canonical, Open Graph y robots.
- Se probaron siete configuraciones: local sin URL, URL principal de Netlify, prioridad de SITE_URL, Netlify sin URL, localhost, HTTP y URL con ruta. Las tres primeras se aceptaron según lo esperado; las cuatro inválidas se rechazaron.
- Se compararon los nueve textos académicos del JSON extraído contra el componente previo en Git, normalizando únicamente espacios: coincidieron exactamente.
- Se reconstruyó sin SITE_URL y se ejecutó el verificador nuevamente: resultado correcto, sin URLs canónicas ficticias. Este build local no es el despliegue definitivo.
- Se eliminó la entrada idéntica repetida `mifuturo`; las referencias restantes conservaron sus identificadores. El build ya no emite esa advertencia.
- `git diff --check` no detectó errores de espacios. Los cambios locales previos se conservaron; no se hicieron commits ni push.

Estos resultados no incluyen capturas, Lighthouse, CompliaScan ni una validación manual de contrastes.

Ejecutar `npm run verify`. Incluye Astro Check/TypeScript, build estático y verificación de HTML, anclas, recursos locales, colecciones y SEO. No comprueba disponibilidad de los enlaces externos ni certifica vigencia académica.

Prueba aislada de sitemap en PowerShell (no publicar este build):

```powershell
$env:SITE_URL = 'https://example.org'
npm.cmd run verify
Remove-Item Env:SITE_URL
npm.cmd run build
node scripts/verify-build.mjs
```

Si la variable tenía un valor real previamente, restaurarlo en lugar de eliminarlo. Los archivos esperados con URL son `dist/sitemap-index.xml` y `dist/sitemap-0.xml`. Sin URL, el build local no incluye canonical, `og:url`, `og:image` ni anuncio de sitemap. En Netlify se requiere SITE_URL o URL principal.

## Inspección de código y límites

- Hay enlace de salto al contenido, estilos `:focus-visible`, navegación móvil con `<details>` y cierre con Escape, y acordeones HTML nativos.
- La malla usa radios con etiquetas, leyenda textual, panel desplazable con foco y anuncio de semestre. Las asignaturas conservan ocho semestres y 44 elementos.
- Las imágenes tienen texto alternativo, tamaños reservados, `srcset` y versiones WebP. Solo la primera tiene carga prioritaria. La imagen más detallada de servidores genera una versión de 1600 px de aproximadamente 241 kB: medir su efecto real en rendimiento.
- Las transiciones y el autoplay consultan `prefers-reduced-motion`. No hay framework cliente hidratado: `experience.ts` es un módulo de mejora progresiva.
- El video usa carga diferida, pero es un recurso externo que debe incluirse en las mediciones.
- El carrusel incluye un control persistente «Pausar / Reanudar», además de detenerse durante hover/foco y respetar `prefers-reduced-motion`. Verificar manualmente su funcionamiento mediante teclado. [Explicación WCAG 2.2.2 de W3C](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).
- No se midieron contrastes calculados ni navegación real en esta ejecución. La presencia de estilos y atributos no demuestra su resultado visual.

## Capturas y revisión manual: 360, 768 y 1280 px

El acceso automatizado al navegador no estaba disponible en esta ejecución; no se generaron capturas nuevas. No presentar capturas de versiones anteriores como evidencia actual.

1. Ejecutar el build y `npm run preview`; abrir la URL impresa en Chrome o Edge.
2. Abrir DevTools (`F12`) y activar la barra de dispositivos (`Ctrl+Shift+M`). Seleccionar modo Responsive, escala 100 %, ancho 360 px y alto 900 px.
3. Recorrer hero, navegación, tarjetas, comparación abierta y cerrada, malla, campo laboral, FAQ abierta y footer. El desplazamiento horizontal intencional de la malla debe quedar dentro de su panel, no de toda la página.
4. En DevTools, abrir el menú de comandos (`Ctrl+Shift+P`), buscar `Capture full size screenshot` y guardar una captura real. Repetir a 768 × 1024 y 1280 × 900. Registrar versión/commit, fecha y navegador junto a los archivos.
5. Para mostrar el encuadre del carrusel, guardar además una captura de cada diapositiva en cada ancho usando sus indicadores.
6. Probar Tab y Shift+Tab desde el salto al contenido: foco visible, menú con Enter y Escape, destinos visibles bajo la cabecera, FAQ con Enter/Espacio y radios con flechas. Comprobar que se puede desplazar la malla por teclado.
7. En DevTools > Rendering, emular `prefers-reduced-motion: reduce` y recargar; comprobar que no hay avance automático ni animaciones de aparición.
8. Usar el selector de color/contraste de DevTools o un analizador de accesibilidad para textos, enlaces, foco y estados de la malla. Referencia WCAG AA: 4,5:1 texto normal y 3:1 texto grande; revisar también contraste no textual donde corresponda.

## Lighthouse / PageSpeed Insights

No existe URL pública confirmada en los archivos y no se ejecutó una medición pública. No hay puntuaciones reales que reportar.

Tras desplegar, abrir https://pagespeed.web.dev/, pegar la URL HTTPS definitiva y ejecutar el análisis. Guardar URL del informe, fecha, móvil/escritorio, versión del sitio y puntuaciones de rendimiento, accesibilidad, buenas prácticas y SEO. La meta solicitada es ≥90 en las cuatro categorías; repetir tras corregir hallazgos. Si el sitio no tiene datos de usuarios reales suficientes, distinguirlos de la prueba de laboratorio.

## CompliaScan

Abrir https://compliascan.com/ con la versión ya desplegada, introducir la URL real y ejecutar la auditoría disponible. Si pide cuenta o acceso, completarlo con la cuenta del equipo. Conservar el informe real con fecha, URL, versión y hallazgos. Comparar su resultado con el umbral exacto de la rúbrica; ese umbral no está especificado en los archivos revisados. No hay resultado certificado en esta ejecución.

## Pendientes antes de entregar

- Completar nombres de ambos integrantes y revisión efectiva del equipo.
- Confirmar dominio, desplegar y comprobar canonical/sitemap públicos.
- Obtener capturas y mediciones reales; corregir los hallazgos que aparezcan.
- Contrastar la rúbrica original, incluyendo formato de citas, documentación de IA e investigación de audiencia. Conservar los pendientes académicos previamente detectados; esta etapa técnica no los resuelve.

Referencias técnicas: [Sitemap oficial de Astro](https://docs.astro.build/en/guides/integrations-guide/sitemap/), [variables de Netlify](https://docs.netlify.com/build/configure-builds/environment-variables/).
