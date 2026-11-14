# Informe del proyecto: landing page de Ingeniería en Informática UTEM

**Asignatura:** EFE685 · Electivo de Computación Móvil
**Departamento:** Departamento de Informática y Computación, Facultad de Ingeniería
**Docente:** Sebastián Salazar Molina
**Fecha:** 13 de noviembre de 2026
**Sitio publicado:** https://paginawebutem.netlify.app
**Repositorio:** https://github.com/HighBenditas/ingenieria-informatica-utem

**Integrantes**

| Nombre completo | Correo institucional | Usuario en GitHub |
|---|---|---|
| Benjamin Marti Morales | bmarti@utem.cl | HighBenditas |
| Kevin Flores Peña | kfloresp@utem.cl | Wskrdmon |

---

## Índice

1. [Por qué hicimos esta página y para quién](#1-por-qué-hicimos-esta-página-y-para-quién)
2. [Cómo trabajamos](#2-cómo-trabajamos)
3. [Fase A: de dónde sale cada dato](#3-fase-a-de-dónde-sale-cada-dato)
4. [Fase B: qué quería saber nuestro público](#4-fase-b-qué-quería-saber-nuestro-público)
5. [Fase C: cómo ordenamos la página](#5-fase-c-cómo-ordenamos-la-página)
6. [Fase D: cómo escribimos los textos](#6-fase-d-cómo-escribimos-los-textos)
7. [Fase E: validación](#7-fase-e-validación)
8. [Cómo está construida la página](#8-cómo-está-construida-la-página)
9. [Calidad medida: accesibilidad, rendimiento y diseño responsivo](#9-calidad-medida-accesibilidad-rendimiento-y-diseño-responsivo)
10. [Publicación y trabajo en equipo](#10-publicación-y-trabajo-en-equipo)
11. [Anexos](#11-anexos)

---

## 1. Por qué hicimos esta página y para quién

La Dirección de la Escuela necesitaba una página de una sola vista que ayudara a futuros postulantes a decidir si Ingeniería en Informática es para ellos. Nuestro público principal son estudiantes de 3.° y 4.° medio y sus familias. El secundario son personas que buscan cambiarse de carrera o que terminaron la enseñanza media hace algunos años.

Desde el inicio nos pusimos una regla: **nada de frases publicitarias sin respaldo**. En vez de decir que la carrera es "la mejor", preferimos mostrar datos que cualquiera pueda comprobar. Por eso cada dato del sitio tiene una cita que lleva a su fuente, y las opiniones o interpretaciones del equipo están marcadas como tales.

La página responde las cinco preguntas que se hace cualquier postulante:

| Pregunta | Dónde se responde en la página |
|---|---|
| ¿Qué es esta carrera y en qué se diferencia de otras parecidas? | Portada y "La carrera" |
| ¿Qué aprenderé y cómo está organizado el plan? | "Plan de estudios" (malla interactiva) |
| ¿Qué podré hacer al egresar y dónde podría trabajar? | "Tu perfil profesional" y "Campo laboral" |
| ¿Qué respaldo tiene la carrera? | "Respaldo institucional" |
| ¿Cómo postulo y qué necesito? | "Admisión 2027" |

## 2. Cómo trabajamos

Seguimos las cinco fases que pide la pauta: buscar fuentes, conocer al público, ordenar el contenido, redactar y validar. En la práctica no fue un camino perfectamente lineal. La primera versión del sitio se construyó antes de tener los resultados de la encuesta, y después usamos esos resultados para revisar si la página respondía lo que la gente realmente preguntaba. Lo contamos así porque es lo que pasó, y porque esa revisión nos mostró cosas que habíamos dado por supuestas (ver sección 4).

Usamos herramientas de inteligencia artificial como apoyo para programar y revisar. Su uso está declarado en detalle en el Anexo A. Ningún dato del sitio viene solo de una IA: todos se contrastaron con su fuente original.

## 3. Fase A: de dónde sale cada dato

### 3.1 Cómo evaluamos las fuentes

Antes de usar una fuente la revisamos con cinco criterios:

- **Autoridad:** ¿quien la publica es responsable del dato?
- **Vigencia:** ¿tiene fecha? ¿es la versión más reciente?
- **Trazabilidad:** ¿cualquier persona puede abrirla y comprobarla?
- **Objetividad:** ¿distingue datos de publicidad?
- **Pertinencia:** ¿responde alguna de las cinco preguntas del encargo?

Priorizamos fuentes **primarias**, es decir, publicadas por quien produce el dato: la propia universidad, el DEMRE (Departamento de Evaluación, Medición y Registro Educacional) y el Ministerio de Educación.

### 3.2 Matriz de fuentes (Producto A)

Usamos 13 fuentes, todas primarias. Doce aparecen citadas en el sitio y una (F13) se consultó para contrastar la malla. "Parcial" significa que el criterio se cumple con alguna reserva, que se explica en la justificación.

| ID | Fuente (resumen) | Tipo | Fecha del dato | Consulta | Autoridad | Vigencia | Trazabilidad | Objetividad | Pertinencia | Se usa en |
|---|---|---|---|---|---|---|---|---|---|---|
| F01 | Ficha web de Ingeniería en Informática (UTEM) | Primaria | Sin fecha | 05-11-2026 | Cumple | Parcial | Cumple | Parcial | Cumple | Portada, La carrera, Perfil, Campo laboral, Respaldo, FAQ |
| F02 | Folleto y malla curricular (UTEM) | Primaria | Sin fecha | 05-11-2026 | Cumple | Parcial | Cumple | Cumple | Cumple | Plan de estudios, Portada (campus), Respaldo, FAQ |
| F03 | Ficha de Ing. Civil en Computación mención Informática (UTEM) | Primaria | Sin fecha | 05-11-2026 | Cumple | Parcial | Cumple | Parcial | Cumple | La carrera (comparación) |
| F04 | Ficha de Ing. Civil en Ciencia de Datos (UTEM) | Primaria | Sin fecha | 05-11-2026 | Cumple | Parcial | Cumple | Parcial | Cumple | La carrera (comparación) |
| F05 | Oferta académica admisión 2027 (UTEM) | Primaria | 2026 | 05-11-2026 | Cumple | Cumple | Cumple | Cumple | Cumple | Admisión, Portada (código DEMRE) |
| F06 | Admisión vía PAES (UTEM) | Primaria | Sin fecha | 05-11-2026 | Cumple | Parcial | Cumple | Cumple | Cumple | Admisión, FAQ |
| F07 | Acceso Directo (UTEM) | Primaria | Sin fecha | 05-11-2026 | Cumple | Parcial | Cumple | Cumple | Cumple | Admisión |
| F08 | Calendario del Proceso de Admisión 2027 (DEMRE) | Primaria | Sin fecha (proceso 2027) | 05-11-2026 | Cumple | Cumple | Cumple | Cumple | Cumple | Admisión |
| F09 | Noticia "UTEM acreditada Nivel Avanzado" | Primaria (institucional) | 18-10-2026 | 05-11-2026 | Parcial | Cumple | Cumple | Parcial | Cumple | Respaldo institucional |
| F10 | Manual de identidad visual UTEM | Primaria | 2026 | 05-11-2026 | Cumple | Cumple | Cumple | Cumple | No cumple | Diseño (colores) y créditos |
| F11 | Mi Futuro (Mineduc) | Primaria | Sin fecha | 05-11-2026 | Cumple | Parcial | Cumple | Cumple | Cumple | Campo laboral (enlace) |
| F12 | Video "Ingeniería en Informática en la UTEM" (Admisión UTEM) | Primaria (institucional) | 23-06-2026 | 12-11-2026 | Cumple | Cumple | Cumple | Parcial | Cumple | Video institucional |
| F13 | Resolución Exenta N.º 03838, plan de estudios código 21030 (UTEM) | Primaria | 04-10-2022 | 13-11-2026 | Cumple | Parcial | Cumple | Cumple | Cumple | Contraste de la malla (aún no citada en el sitio) |

**Justificación de los casos "Parcial" y "No cumple"**

- **Vigencia sin fecha (F01–F04, F06, F07, F11).** Son páginas institucionales que no muestran fecha de publicación. Las aceptamos porque las publica la propia universidad o el ministerio, pero declaramos "s. f." (sin fecha) y la fecha en que las consultamos. No inventamos fechas a partir de la dirección web.
- **Objetividad de las fichas de carrera (F01, F03, F04).** Mezclan datos con lenguaje promocional. De ellas tomamos solo datos verificables (duración, título, áreas de trabajo) y no copiamos frases publicitarias.
- **Autoridad de la acreditación (F09).** El dato lo emite la CNA (Comisión Nacional de Acreditación), pero la fuente que usamos es la noticia de la universidad que lo informa. Intentamos contrastarlo con la resolución de la CNA y su portal no respondió durante la revisión. Por eso el sitio lo dice abiertamente: "Resolución CNA actualizada pendiente de contraste directo".
- **Video (F12).** Es material institucional y por lo tanto promocional. Lo presentamos como "contenido institucional, no elaborado por el equipo", y no tomamos datos desde él. De hecho, su descripción dice "acreditada hasta 2030", mientras que la noticia más reciente (F09) indica hasta 2031, así que para la acreditación usamos la fuente más reciente.
- **Manual de identidad (F10).** No responde ninguna de las cinco preguntas del encargo. Lo usamos solo para elegir colores coherentes con la universidad, por eso marcamos "No cumple" en pertinencia.
- **Resolución del plan (F13).** Es la fuente de mayor autoridad sobre la malla, pero data de 2022 y el PDF público está incompleto. Además muestra pequeñas diferencias de nombres respecto del folleto (por ejemplo, "Estructura de Datos" frente a "Estructuras de Datos"). Lo registramos en `docs/hallazgos-finales.md` y lo dejamos como punto a confirmar con la Escuela.

### 3.3 Referencias en formato APA 7

- Departamento de Evaluación, Medición y Registro Educacional. (s. f.). *Calendario del Proceso de Admisión 2027*. Recuperado el 5 de noviembre de 2026, de https://demre.cl/calendario/calendario-proceso-2027
- Ministerio de Educación de Chile. (s. f.). *Mi Futuro*. Recuperado el 5 de noviembre de 2026, de https://www.mifuturo.cl/
- Admisión UTEM. (2026, 23 de junio). *Ingeniería en Informática en la UTEM* [Video]. YouTube. https://youtu.be/VGQ9TptyvuI
- Universidad Tecnológica Metropolitana. (s. f.-a). *Acceso Directo*. Recuperado el 5 de noviembre de 2026, de https://accesodirecto.utem.cl/
- Universidad Tecnológica Metropolitana. (s. f.-b). *Admisión Acceso Vía PAES*. Recuperado el 5 de noviembre de 2026, de https://www.utem.cl/admision/admision-acceso-via-paes/
- Universidad Tecnológica Metropolitana. (s. f.-c). *Ingeniería Civil en Ciencia de Datos*. Recuperado el 5 de noviembre de 2026, de https://www.utem.cl/carreras/ingenieria-civil-en-ciencia-de-datos/
- Universidad Tecnológica Metropolitana. (s. f.-d). *Ingeniería Civil en Computación mención Informática*. Recuperado el 5 de noviembre de 2026, de https://www.utem.cl/carreras/ingenieria-civil-en-computacion-mencion-informatica/
- Universidad Tecnológica Metropolitana. (s. f.-e). *Ingeniería en Informática*. Recuperado el 5 de noviembre de 2026, de https://www.utem.cl/carreras/ingenieria-en-informatica/
- Universidad Tecnológica Metropolitana. (s. f.-f). *Ingeniería en Informática* [Folleto y malla curricular]. https://www.utem.cl/wp-content/uploads/2026/05/INGENIERIA_EN_INFORMATICA_UTEM.pdf
- Universidad Tecnológica Metropolitana. (2022, 4 de octubre). *Resolución Exenta N.º 03838: aprobación del plan de estudios de Ingeniería en Informática, código 21030*. https://transparencia.utem.cl/lbt5
- Universidad Tecnológica Metropolitana. (2026a). *Manual de identidad visual UTEM*. https://www.utem.cl/wp-content/uploads/2026/07/MANUAL_UTEM_2026.pdf
- Universidad Tecnológica Metropolitana. (2026b). *Oferta académica admisión 2027: Ponderaciones, puntajes y vacantes*. https://www.utem.cl/wp-content/uploads/2026/09/Oferta-Academica-UTEM-2027.pdf
- Universidad Tecnológica Metropolitana. (2026, 18 de octubre). *UTEM acreditada Nivel Avanzado*. https://noticias.utem.cl/2026/10/18/utem-acreditada-nivel-avanzado/

## 4. Fase B: qué quería saber nuestro público

### 4.1 Qué hicimos

Aplicamos un cuestionario en línea de nueve preguntas sobre la carrera, más una de consentimiento y otra para el nombre o apodo (el instrumento completo está en el Anexo B). Lo respondieron **8 personas** entre el 11 y el 13 de noviembre de 2026. Todas aceptaron participar de forma voluntaria y que sus respuestas se usaran en este proyecto.

Para proteger su privacidad, en este informe las identificamos con códigos (P1 a P8). Las respuestas originales y los consentimientos quedan en poder del equipo para que el docente pueda verificarlos, y no se publican en el repositorio.

| Perfil de quien respondió | Personas |
|---|---|
| Familiar de un futuro postulante | 3 |
| Estudiante que considera cambiar de carrera | 2 |
| Egresado/a de enseñanza media | 2 |
| Estudiante de 3.° medio | 1 |

Una limitación que hay que decir: solo una persona pertenece al público principal (estudiantes de 3.° y 4.° medio). Las demás corresponden a familias y al público secundario. Los resultados sirven como orientación, pero no representan del todo a los escolares.

### 4.2 Qué encontramos

| Pregunta del cuestionario | Respuesta más frecuente | Frecuencia |
|---|---|---|
| ¿Qué información es más importante al investigar una carrera? (varias opciones) | Campo laboral y oportunidades de trabajo | 7 de 8 |
| | Malla curricular y asignaturas | 4 de 8 |
| | Becas, aranceles y financiamiento / Duración y título / Empleabilidad e ingresos | 3 de 8 cada una |
| | Requisitos y puntajes de admisión | 1 de 8 |
| ¿Qué te gustaría saber de las diferencias entre las tres carreras? (varias opciones) | Diferencias en el campo laboral / Qué habilidades se desarrollan | 6 de 8 cada una |
| | Qué se aprende en cada carrera | 5 de 8 |
| ¿Cómo preferirías explorar la malla? | Mediante una visualización interactiva | 6 de 8 |
| ¿Qué te ayudaría más a comprender una carrera en una web? | Explicaciones breves y sencillas | 4 de 8 |
| | Videos o testimonios / Imágenes | 2 de 8 cada una |
| ¿Por dónde buscarías información? (varias opciones) | Google / Página oficial de la universidad | 6 de 8 cada una |
| | Instagram o TikTok / Ferias o charlas | 3 de 8 cada una |
| ¿Cuánto conoces la carrera? | "Tengo algunos conocimientos" | 4 de 8 |

En la pregunta abierta sobre dudas, cinco de las seis personas que respondieron hablaron del **trabajo**. Por ejemplo, P7 escribió que entiende que la informática "tiene un campo bastante extenso", pero no sabe "en qué podría terminar trabajando". Otras dudas fueron cuántos semestres dura la carrera y qué asignaturas tiene.

En sugerencias, aparecieron: saber qué se pide hoy en el mercado laboral (2 personas), el puntaje necesario para entrar, las habilidades que se desarrollan, las horas de clase por asignatura y un "test" para quien no está seguro de elegir la carrera.

### 4.3 Perfil de usuario (persona)

> **"Camila", 17 años, y su familia**
>
> **Contexto:** está terminando la enseñanza media o acaba de egresar. Le gusta la tecnología, pero no sabe bien qué estudia un informático. Muchas veces quien busca primero es su mamá, su papá o alguien de la familia.
>
> **Preguntas principales:** ¿de qué voy a trabajar?, ¿cuánto dura y qué título obtengo?, ¿qué ramos tiene?
>
> **Dudas:** en qué se diferencia de Ingeniería Civil en Computación o de Ciencia de Datos, y en qué área le conviene especializarse.
>
> **Barreras:** la información de la universidad está repartida en varias páginas y PDF, y le cuesta comparar carreras con nombres parecidos. También le preocupa el costo y el puntaje que necesita.
>
> **Canal de llegada:** busca en Google o entra directamente a la página de la universidad; a veces llega desde Instagram o TikTok, o después de una feria universitaria.

### 4.4 Preguntas priorizadas según frecuencia

| Prioridad | Pregunta del público | Frecuencia | Cómo responde la página |
|---|---|---|---|
| 1 | ¿De qué voy a trabajar? | 7 de 8 (más 5 dudas abiertas) | Campo laboral: cinco áreas de desempeño con enlaces a ofertas reales y acceso a los indicadores de Mi Futuro. Además es el primer acceso rápido de la página y tiene su propia pregunta frecuente. |
| 2 | ¿Qué habilidades desarrollo? | 6 de 8 | Tu perfil profesional: seis competencias en lenguaje sencillo. |
| 3 | ¿En qué se diferencia de carreras parecidas? | 6 de 8 | La carrera: comparación con dos carreras afines, marcada como interpretación del equipo. |
| 4 | ¿Qué ramos voy a tener? | 4 de 8 (y 6 de 8 prefieren verlo de forma interactiva) | Plan de estudios: malla interactiva por semestre. |
| 5 | ¿Cuánto dura y qué título obtengo? | 3 de 8 | Portada: ficha con duración, jornada, título, grado y campus. |
| 6 | ¿Hay becas? ¿Cuánto cuesta? | 3 de 8 | Admisión: enlaces oficiales a becas, aranceles y orientación. |
| 7 | ¿Qué puntaje necesito? | 1 de 8 (y 1 sugerencia) | Admisión: ponderaciones, promedio mínimo, fechas y vías de ingreso. |

## 5. Fase C: cómo ordenamos la página

### 5.1 Orden de las secciones y por qué

| N.º | Sección | Pregunta que responde | Por qué va en este lugar |
|---|---|---|---|
| 1 | Portada (hero) | ¿Qué es la carrera? | Lo primero que alguien necesita es saber qué es, cuánto dura y qué título entrega. La ficha de datos responde la prioridad 5 sin hacer scroll. |
| 2 | Accesos rápidos | ¿A dónde voy? | Seis de ocho personas llegan desde Google o la web oficial con una duda puntual. Estos accesos las llevan directo a campo laboral, malla, perfil, admisión o FAQ. "Campo laboral" va primero porque fue lo más pedido. |
| 3 | La carrera | ¿En qué se diferencia? | Seis de ocho quieren comparar carreras parecidas. Va temprano porque ayuda a decidir si vale la pena seguir leyendo. |
| 4 | Video institucional | ¿Cómo se ve la carrera? | Dos personas pidieron videos o testimonios. Lo ubicamos después de la explicación para que complemente el texto, no lo reemplace. |
| 5 | Tu perfil profesional | ¿Qué podré hacer? | Responde la prioridad 2 (habilidades). |
| 6 | Plan de estudios | ¿Qué aprenderé? | Responde la prioridad 4 con la malla interactiva que pidió la mayoría. |
| 7 | Campo laboral | ¿Dónde trabajaré? | Sigue el recorrido natural: qué es, qué aprendo y dónde trabajo. |
| 8 | Respaldo institucional | ¿Qué garantías hay? | Da confianza justo antes de la decisión de postular. |
| 9 | Admisión 2027 | ¿Cómo postulo? | Es el paso siguiente una vez que la persona está convencida. |
| 10 | Preguntas frecuentes | Dudas puntuales | Resuelve dudas sueltas al final del recorrido. |
| 11 | Referencias | ¿De dónde sale esto? | Cierra la página mostrando todas las fuentes. |

Una decisión que discutimos: el campo laboral fue lo más pedido (7 de 8), pero como sección quedó en el séptimo lugar. La mantuvimos ahí porque la página sigue un orden de lectura natural (qué es, qué aprendo, dónde trabajo). Para que nadie tenga que recorrer toda la página para encontrarla, la pusimos como **primer acceso rápido**, justo debajo de la portada, también está en el menú y agregamos una pregunta frecuente sobre el tema ("¿En qué podré trabajar al titularme?").

### 5.2 Relación entre secciones y fuentes

| Sección | Fuentes (ID de la matriz) |
|---|---|
| Portada | F01, F02, F05 |
| La carrera | F01, F03, F04, más interpretación del equipo identificada como tal |
| Video institucional | F12 |
| Tu perfil profesional | F01 (síntesis del equipo identificada como tal) |
| Plan de estudios | F02 (contrastada con F13) |
| Campo laboral | F01, F11 |
| Respaldo institucional | F09, F01, F02 |
| Admisión 2027 | F05, F06, F07, F08 |
| Preguntas frecuentes | F01, F02, F06 |
| Referencias | Todas |

### 5.3 Wireframes de baja fidelidad

Son bocetos simples de la estructura, sin colores ni diseño final. Muestran cómo se acomoda la página en celular y en computador.

**Celular (360 px)**

```
┌──────────────────────────┐
│ Aviso: proyecto académico│
├──────────────────────────┤
│ [Logo UTEM]      Menú ☰  │
├──────────────────────────┤
│  IMAGEN DE FONDO         │
│  Título principal (H1)   │
│  Texto breve             │
│  [Explorar la carrera]   │
│  ● ○ ○   Pausar          │
├──────────────────────────┤
│ Duración  │ Jornada      │
│ Título    │ Grado        │
│ Campus    │ Código DEMRE │
├──────────────────────────┤
│ [Campo laboral]          │
│ [Malla]        [Perfil]  │
│ [Admisión]     [FAQ]     │
├──────────────────────────┤
│ La carrera (bloques      │
│ apilados) + comparación  │
├──────────────────────────┤
│ Video 16:9               │
├──────────────────────────┤
│ Competencias (2 columnas)│
├──────────────────────────┤
│ Filtro de semestre       │
│ ← malla desplazable →    │
├──────────────────────────┤
│ Campo laboral (lista)    │
│ Respaldo · Admisión      │
│ FAQ (desplegables)       │
│ Referencias · Pie        │
└──────────────────────────┘
```

**Computador (1280 px)**

```
┌──────────────────────────────────────────────────────────┐
│ Aviso: proyecto académico                                │
├──────────────────────────────────────────────────────────┤
│ [Logo UTEM]  La carrera · Qué aprenderás · Campo laboral │
│                                        [Cómo postular →] │
├──────────────────────────────────────────────────────────┤
│  IMAGEN DE FONDO A TODO EL ANCHO                         │
│  Título principal (H1)                                   │
│  Texto breve        [Explorar la carrera] Conoce la malla│
├──────────────────────────────────────────────────────────┤
│ Duración │ Jornada │ Título │ Grado │ Campus │ Código    │
├──────────────────────────────────────────────────────────┤
│ [Campo laboral] [Malla] [Perfil] [Admisión] [FAQ]        │
├──────────────────────────────────────────────────────────┤
│ ¿Qué es?           │ Ejemplo ilustrativo                 │
│ Comparación: esta carrera │ otras dos carreras afines    │
├──────────────────────────────────────────────────────────┤
│ Video 16:9 a lo ancho del contenido                      │
├──────────────────────────────────────────────────────────┤
│ Competencias en 3 columnas                               │
├──────────────────────────────────────────────────────────┤
│ Filtro │ Sem1 Sem2 Sem3 Sem4 Sem5 Sem6 Sem7 Sem8         │
├──────────────────────────────────────────────────────────┤
│ Título campo laboral   │ Lista de 5 áreas                │
├──────────────────────────────────────────────────────────┤
│ Acreditación (grande)  │ Certificación · Sede            │
├──────────────────────────────────────────────────────────┤
│ Pasos de admisión │ Ponderaciones │ Becas y orientación  │
├──────────────────────────────────────────────────────────┤
│ Título FAQ             │ Preguntas desplegables          │
│ Referencias · Pie de página con redes sociales           │
└──────────────────────────────────────────────────────────┘
```

## 6. Fase D: cómo escribimos los textos

### 6.1 Nuestra guía de estilo

- **Frases cortas y en voz activa.** Por ejemplo: "La informática empieza con un problema real".
- **Siglas explicadas la primera vez.** DEMRE, PAES (Prueba de Acceso a la Educación Superior), NEM (Notas de Enseñanza Media), M1 y M2 (Competencia Matemática 1 y 2), CNA y CONAIC aparecen con su nombre completo.
- **Cada dato con su cita.** Al lado de cada dato hay un enlace corto que salta a su referencia, en el formato "Autor · Tema · Año".
- **Dato, interpretación y opinión, separados a la vista.** Lo que es interpretación del equipo lo dice explícitamente: "Interpretación del equipo", "Síntesis del equipo", "Ejemplo ilustrativo del equipo". El video lleva la nota "Contenido institucional, no elaborado por el equipo". No usamos testimonios propios.
- **Textos alternativos en todas las imágenes**, que describen lo que se ve. Por ejemplo: "Un desarrollador trabaja con código y documentación en dos monitores".
- **Créditos visibles** de las fotografías (Pexels, con autor y enlace) y de los íconos.
- **Ninguna cifra sin año verificable.** Para los indicadores de empleabilidad e ingresos, el sitio remite a Mi Futuro, la fuente oficial del Ministerio de Educación.

### 6.2 Dónde están los textos (Producto D)

Los textos que cambian con frecuencia no están dentro del código, sino en archivos de datos que una persona de la Escuela puede editar:

| Contenido | Archivo |
|---|---|
| Malla curricular (8 semestres, 44 asignaturas) | `src/content/malla.json` |
| Campo laboral (5 áreas) | `src/content/campo-laboral.json` |
| Preguntas frecuentes (8) | `src/content/faq.json` |
| Comparación de carreras (resumen y detalle) | `src/content/comparacion.json` |
| Respaldo institucional (acreditación, certificación y sede) | `src/content/respaldo.json` |
| Pasos de admisión | `src/content/admision.json` |
| Referencias (12) | `src/content/referencias.json` |
| Ficha de la portada, ponderaciones, competencias y enlaces | `src/data/site.ts` |

Los datos verificables principales (ficha de la portada, comparación, malla, campo laboral, respaldo, pasos de admisión, ponderaciones, preguntas frecuentes y referencias) viven en estos archivos, junto con su fuente. En los componentes quedan sobre todo los títulos y textos introductorios de cada sección. Así, actualizar un dato no requiere tocar el diseño.

## 7. Fase E: validación

Revisamos los datos del sitio contra otras fuentes oficiales. El registro completo está en `docs/hallazgos-finales.md`. Lo más importante:

| Afirmación revisada | Hallazgo | Qué hicimos |
|---|---|---|
| Malla de 8 semestres y 44 asignaturas | La resolución del plan (F13) coincide en la secuencia, pero hay diferencias menores de nombres con el folleto (por ejemplo "Estadística y Probabilidades" / "Probabilidad"). | Mantuvimos la malla del folleto y dejamos las diferencias anotadas para confirmar con la Escuela. |
| Trabajo de Título I y II | El folleto los ubica de forma distinta a la resolución. | Corregimos la numeración según la resolución. |
| Campus | El folleto dice Ñuñoa y la ficha web menciona Macul. | Mantuvimos "Campus Ñuñoa", como indica el folleto, y anotamos la diferencia para la Escuela. |
| Acreditación hasta 2031 | La descripción del video dice "hasta 2030". | Usamos la noticia más reciente (F09) y lo declaramos "pendiente de contraste" con la CNA. |
| Referencia de Mi Futuro | Estaba repetida. | Eliminamos el duplicado. |
| Fecha de consulta del video | Todas las referencias mostraban la misma fecha de consulta, aunque el video se revisó otro día. | Corregimos el sitio para que cada referencia muestre su fecha real de consulta. |

## 8. Cómo está construida la página

Esta sección explica las decisiones técnicas en lenguaje simple. Los detalles de cada archivo están comentados en el propio código.

### 8.1 Por qué Astro

Astro es una herramienta que arma la página **antes** de publicarla, de modo que al visitante le llega una página ya lista, liviana y rápida, sin depender de un servidor ni de una base de datos. Para una página informativa como esta es lo más adecuado: carga rápido incluso con mala conexión, que es justamente como muchas personas la verán desde un celular.

### 8.2 Contenido separado del diseño

Como vimos en la sección 6.2, los datos están en archivos aparte. Cada archivo tiene un **esquema**: una regla que dice qué campos debe tener cada dato y de qué tipo (por ejemplo, que un semestre sea un número entre 1 y 8, o que una URL sea válida). Si alguien escribe mal un dato, **la página no se publica** y muestra el error. Además, cada dato debe apuntar a una referencia que exista; si se borra una fuente que está siendo usada, la página tampoco se publica. Así es más difícil publicar información incompleta o sin respaldo por accidente.

### 8.3 TypeScript en modo estricto

Escribimos el código en TypeScript, una versión de JavaScript que obliga a declarar qué tipo de dato usa cada parte del programa. Lo activamos en su modo más exigente y no usamos el tipo `any`, que desactiva estas comprobaciones. Esto detecta errores antes de publicar, no cuando un visitante ya está usando la página.

### 8.4 Una pieza por sección

La página está dividida en componentes, uno por sección (`Hero.astro`, `Malla.astro`, `CampoLaboral.astro`, etc.), y un molde común (`BaseLayout.astro`) que concentra lo que comparten todas: idioma, título, descripción, metadatos para redes sociales y el único script. Eso permite cambiar una sección sin tocar las demás.

### 8.5 Por qué hay un poco de JavaScript (y por qué solo un poco)

La pauta pide usar el mínimo de JavaScript en el navegador. La página funciona y se lee completa sin él. Usamos un solo archivo (`src/scripts/experience.ts`) que **mejora** la experiencia en cinco puntos, cada uno con una razón:

| Mejora | Por qué la incluimos |
|---|---|
| Filtro de la malla por semestre | Seis de ocho encuestados prefieren explorar la malla de forma interactiva. |
| Carrusel de imágenes con pausa | Le da vida a la portada. Por accesibilidad tiene botón de pausa, se detiene al pasar el cursor o el teclado, y no se mueve si la persona pidió reducir el movimiento en su sistema. |
| Video que carga solo cuando se acerca a la pantalla | Evita que el video de YouTube haga más lenta la carga inicial. |
| Aparición suave de secciones al bajar | Hace la lectura más agradable. Nunca deja contenido oculto si se navega con teclado o con un enlace. |
| Menú móvil y citas | Cierra el menú al elegir una opción o con la tecla Escape, y abre la lista de referencias al hacer clic en una cita. |

No usamos frameworks adicionales como React ni Vue, que habrían agregado mucho más código al navegador.

### 8.6 Un verificador propio

Además de las comprobaciones de Astro, el comando `npm run verify` revisa la página final: que haya un solo título principal, que el idioma sea español de Chile, que todos los enlaces internos lleven a algo, que estén los ocho semestres y las 44 asignaturas, que haya un solo script y, cuando el sitio tiene su dirección pública, que el sitemap y los metadatos sean coherentes. Si algo falla, el comando lo avisa.

## 9. Calidad medida: accesibilidad, rendimiento y diseño responsivo

### 9.1 Lighthouse (PageSpeed Insights)

Medimos la versión publicada en https://pagespeed.web.dev/ en modo celular. Los resultados quedaron registrados en el historial de trabajo del equipo (Anexo A, prompts P-031 y P-032):

| Medición | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| Primera medición | 61 | 100 | 96 | 100 |
| Después de optimizar (carga diferida de imágenes y video) | 100 | 100 | 100 | 100 |
| **Medición final de la versión entregada** (13 de noviembre de 2026, 23:16) | **98** | **100** | **100** | **100** |

La primera medición tenía un rendimiento bajo porque la portada tardaba en mostrarse. Lo corregimos cargando primero solo la imagen visible y difiriendo las demás imágenes y el video. Desde entonces las cuatro categorías se mantienen sobre la meta de 90.

La medición final se hizo en modo celular (Moto G Power emulado, Lighthouse 13.6.0). Sus métricas fueron:

| Métrica | Qué mide | Resultado |
|---|---|---|
| First Contentful Paint | Cuánto tarda en aparecer el primer contenido | 1,0 s |
| Largest Contentful Paint | Cuánto tarda en aparecer el contenido principal | 1,3 s |
| Total Blocking Time | Cuánto tiempo la página no responde mientras carga | 60 ms |
| Cumulative Layout Shift | Cuánto se "mueve" la página mientras carga | 0 |
| Speed Index | Qué tan rápido se completa visualmente | 3,9 s |

El único valor en amarillo es el Speed Index. PageSpeed sugiere reducir recursos que bloquean la carga (ahorro estimado de 150 ms) y mejorar el almacenamiento en caché y la entrega de imágenes (unos 11 KiB cada uno). Son mejoras menores que no afectan la meta.

La página no tiene aún "datos de usuarios reales" en PageSpeed porque tiene pocas visitas. Por eso los resultados son de laboratorio, es decir, simulados por la herramienta.

### 9.2 Accesibilidad (CompliaScan y WCAG 2.2)

| Medición | Puntaje | Hallazgos principales |
|---|---|---|
| Primera medición | 83/100 | Botones y enlaces demasiado pequeños para tocar; contenido fuera de las zonas principales de la página. |
| Segunda medición | 86/100 | Un problema de contraste de color y una advertencia sobre el iframe de YouTube. |
| Tercera medición (13 de noviembre de 2026, 23:16) | 86/100 | 0 críticos, 1 serio, 3 moderados, 0 menores. |
| **Medición final de la versión entregada** (13 de noviembre de 2026, 23:49) | **91/100** | 0 críticos, 0 serios, 3 moderados, 0 menores. Se revisaron 64 reglas y se aprobaron 52. |

La medición final dio **91/100**, sobre el mínimo de 90 que pide la pauta, sin hallazgos serios. La diferencia con la medición anterior se explica porque el problema de contraste aparecía solo si el auditor revisaba la página justo mientras se animaba la aparición de las secciones. Para que no dependa del momento de la revisión, corregimos la causa de forma permanente, junto con los demás hallazgos.

La advertencia sobre el iframe corresponde al reproductor externo de YouTube, que el auditor no puede revisar por dentro. No la "arreglamos" alterando el reproductor, porque eso solo maquillaría el puntaje.

**Correcciones aplicadas a partir de la tercera medición.** Revisamos cada hallazgo con axe-core, el mismo motor de reglas que usa CompliaScan, ejecutado sobre la página en nuestro computador:

| Hallazgo de CompliaScan | Causa que encontramos | Corrección |
|---|---|---|
| Contraste insuficiente (serio, 254 elementos, texto #f7f8f9 sobre blanco) | La animación que hace aparecer las secciones partía con el texto transparente. Si el auditor revisa la página a mitad de la animación, el texto casi invisible no tiene contraste. | Las secciones ahora solo se desplazan al aparecer; nunca se vuelven transparentes. |
| Enlaces que abren una pestaña nueva sin avisar (11 elementos) | Los enlaces a ofertas de trabajo y a redes sociales abrían otra pestaña. | Ahora abren en la misma pestaña, que es lo que la persona espera. |
| Objetivo táctil menor a 24 × 24 px (1 elemento) | Enlaces dentro de párrafos medían entre 14 y 21 px de alto. | Se agrandó su zona táctil sin mover el texto. |
| Texto menor a 12 px (3 elementos) | Etiquetas, notas, citas y números de la malla usaban entre 9 y 11,8 px. | Todos los textos quedaron en 12 px como mínimo. |

Después de los cambios, axe-core no encontró problemas en 390 ni en 1280 px, ningún texto quedó bajo 12 px, ningún enlace táctil quedó bajo 24 px, y la página no tiene desplazamiento horizontal en 360, 768 ni 1280 px.

Vale la pena notar la diferencia entre herramientas: Lighthouse da 100 en accesibilidad y CompliaScan revisa reglas adicionales, como el tamaño mínimo de letra. Por eso usamos ambas, y ninguna reemplaza una revisión manual.

Además de la herramienta, la página incluye:

- Un enlace para saltar directamente al contenido, útil para quienes navegan con teclado.
- Foco visible al navegar con la tecla Tab.
- Un solo título principal y títulos de sección ordenados.
- Textos alternativos en todas las imágenes.
- Desplegables y menú que funcionan sin JavaScript.
- Respeto de la preferencia de "reducir movimiento" del sistema.
- Idioma declarado como español de Chile (`lang="es-CL"`).

### 9.3 SEO

La página tiene título y descripción propios, metadatos Open Graph (para que se vea bien al compartirla en redes), dirección canónica, `sitemap-index.xml` y `robots.txt`. Comprobamos que el sitemap publicado responde correctamente.

### 9.4 Diseño responsivo

Revisamos la página en celular (360 a 393 px) con capturas sección por sección, y corregimos lo que se veía mal:

- La franja superior se partía en dos líneas con letra de 9 px: la dejamos en una línea con letra de 12 px.
- El carrusel tenía flechas y un pie de foto que estorbaban en pantallas chicas: los quitamos y mantuvimos los puntos y la pausa.
- Las tarjetas de la malla eran muy altas: las ajustamos y agrandamos la leyenda.
- Dos títulos perdían el espacio entre palabras ("formasde", "abrencaminos"): los corregimos.
- Había espacios en blanco excesivos en la comparación de carreras y en la sección del video: los redujimos.

Además, comprobamos de forma automática en los tres anchos que pide la pauta (360, 768 y 1280 px) que la página no se desborda hacia los lados. El único desplazamiento horizontal es el de la malla, que está dentro de su propio panel y es intencional.

## 10. Publicación y trabajo en equipo

- **Publicación:** el sitio está en Netlify, en https://paginawebutem.netlify.app. Cada cambio que se sube a la rama principal se publica automáticamente, y la publicación se detiene si el verificador encuentra un error.
- **Repositorio:** https://github.com/HighBenditas/ingenieria-informatica-utem, con una rama principal estable (`main`).
- **Aporte de cada integrante:** cada uno registró 6 commits.
  - Benjamin construyó la primera versión de la página, la optimización de rendimiento, la preparación del despliegue, el contraste del carrusel y la auditoría de documentación de IA.
  - Kevin trabajó el diseño responsivo, el video institucional, las correcciones de títulos y referencias, las correcciones de accesibilidad, el README para la Escuela y los comentarios explicativos del código.

---

## 11. Anexos

### Anexo A. Declaración de uso de inteligencia artificial

Usamos asistentes de IA como apoyo, no como fuente de datos. Toda cifra o afirmación del sitio se verificó en su fuente primaria y se cita esa fuente, no la herramienta.

| Herramienta | Integrante | Para qué se usó | Prompts |
|---|---|---|---|
| Codex | Benjamin Marti | Construcción inicial de la página, mejoras por etapas, carrusel, imágenes, campo laboral, optimización de rendimiento y accesibilidad, y auditoría de trazabilidad. | 32 prompts (P-001 a P-032) |
| Claude (Anthropic) | Kevin Flores | Revisión del proyecto contra la pauta, ajustes de diseño responsivo, video institucional, correcciones de referencias, README y comentarios explicativos del código. | 85 prompts (C-001 a C-085) |
| ChatGPT | Equipo | Mencionado en el README; sus prompts no fueron recuperados. | No recuperados |

Cada prompt, la tarea que resolvió y qué se modificó del resultado están en:

- [docs/anexo-uso-ia.md](docs/anexo-uso-ia.md): tabla por herramienta, con el texto de cada prompt.
- [docs/trazabilidad-prompts-ia.md](docs/trazabilidad-prompts-ia.md): transcripción completa de los prompts de Codex y relación de cada prompt con los archivos y líneas que modificó.

El código que se generó con ayuda de IA está comentado en cada archivo para explicar qué hace cada parte y por qué.

### Anexo B. Instrumento aplicado (cuestionario)

1. ¿Aceptas participar voluntariamente y que tus respuestas sean usadas en este proyecto académico?
2. Primer nombre o apodo.
3. ¿Cuál de las siguientes opciones te representa mejor?
4. ¿Qué información consideras más importante al investigar una carrera universitaria?
5. ¿Qué tanto conoces sobre Ingeniería en Informática?
6. ¿Qué te gustaría saber sobre las diferencias entre Ingeniería en Informática, Ingeniería Civil en Computación mención Informática e Ingeniería Civil en Ciencia de Datos?
7. ¿Qué dudas tendrías antes de elegir Ingeniería en Informática?
8. ¿Cómo preferirías explorar la malla curricular de una carrera?
9. ¿Qué elemento te ayudaría más a comprender una carrera en una página web?
10. ¿Por dónde buscarías información sobre una carrera?
11. ¿Qué información o funcionalidad adicional te gustaría encontrar en una página sobre Ingeniería en Informática?

Las respuestas individuales y los consentimientos se conservan fuera del repositorio público para que el docente pueda verificarlos.

### Anexo C. Glosario

| Término | Qué significa |
|---|---|
| Accesibilidad | Que la página pueda usarla cualquier persona, incluidas personas con discapacidad visual, auditiva, motora o cognitiva. |
| APA 7 | Norma para citar fuentes de forma ordenada. |
| Build | Proceso que transforma el código en la página final que se publica. |
| Commit | Registro de un cambio guardado en el repositorio, con autor y fecha. |
| Componente | Pieza reutilizable de la página, como una sección. |
| Esquema | Regla que define qué campos y tipos de dato debe tener un archivo. |
| Fuente primaria | Documento publicado por quien produce el dato. |
| Lighthouse | Herramienta de Google que mide rendimiento, accesibilidad, buenas prácticas y SEO, de 0 a 100. |
| Repositorio | Espacio donde se guarda el código y su historial de cambios. |
| Responsivo | Diseño que se adapta al tamaño de la pantalla. |
| SEO | Prácticas para que la página aparezca en buscadores como Google. |
| WCAG | Pautas internacionales de accesibilidad web. |
