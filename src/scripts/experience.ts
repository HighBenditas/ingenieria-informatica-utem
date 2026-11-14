// Único JavaScript que se ejecuta en el navegador. Mejora la página, pero no es necesario para leerla:
// Progressive enhancement: the first image and all content remain visible without JS.
// (Mejora progresiva: la primera imagen y todo el contenido se ven aunque JavaScript falle.)
//
// Contiene seis funciones, que se ejecutan al final del archivo:
//   setupCarousel, setupDeferredVideos, setupReveals, setupMobileMenu, setupCurriculum, setupReferenceLinks.

// Detecta si la persona pidió "reducir movimiento" en su sistema. Si es así, se evitan animaciones y autoplay.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

// ---------- 1. Carrusel del hero ----------
// "root" es el contenedor del carrusel (el elemento con data-carousel).
function setupCarousel(root: HTMLElement): void {
  // Busca las piezas del carrusel dentro de "root" por sus marcas data-*.
  const slides = [...root.querySelectorAll<HTMLElement>("[data-slide]")];
  const buttons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-slide-button]"),
  ];
  const controls = root.querySelector<HTMLElement>("[data-carousel-controls]");
  const caption = root.querySelector<HTMLElement>("[data-carousel-caption]");
  const counter = root.querySelector<HTMLElement>("[data-carousel-counter]");
  const play = root.querySelector<HTMLButtonElement>("[data-play]");
  const playLabel = root.querySelector<HTMLElement>("[data-play-label]");
  const playIcon = root.querySelector<HTMLElement>("[data-play-icon]");
  const announcement = root.querySelector<HTMLElement>(
    "[data-carousel-announcement]",
  );
  // Si faltan los controles o el mensaje para lectores de pantalla, o hay menos de 2 imágenes,
  // no se activa el carrusel (la primera imagen igual se ve).
  if (
    !controls ||
    !announcement ||
    slides.length < 2
  )
    return;

  // Estado del carrusel:
  let current = 0; // índice de la imagen visible
  let pausedByUser = motionPreference.matches; // pausado por la persona (o por preferir menos movimiento)
  let hovering = false; // el cursor está encima del carrusel
  let focused = false; // el foco del teclado está dentro del carrusel
  let inView = true; // el carrusel está visible en pantalla
  let timer: number | undefined; // temporizador del cambio automático
  let requestedSlide = 0; // número de la última petición de cambio (para ignorar peticiones antiguas)

  // Carga la imagen de la diapositiva "index" si todavía no se cargó. Las imágenes después de la
  // primera guardan su dirección en data-slide-src y solo se cargan cuando hace falta.
  function loadSlide(index: number): HTMLImageElement | null {
    const image = slides[index]?.querySelector<HTMLImageElement>("img");
    if (image?.dataset.slideSrc) {
      image.srcset = image.dataset.slideSrcset ?? "";
      image.src = image.dataset.slideSrc;
      delete image.dataset.slideSrc;
      delete image.dataset.slideSrcset;
    }
    return image ?? null;
  }

  // Programa el siguiente cambio automático a los 6,5 segundos, salvo que algo lo impida:
  // pausa de la persona, cursor encima, foco dentro, carrusel fuera de pantalla, pestaña oculta
  // o preferencia de menos movimiento.
  function schedule(): void {
    window.clearTimeout(timer);
    if (
      pausedByUser ||
      hovering ||
      focused ||
      !inView ||
      document.hidden ||
      motionPreference.matches
    )
      return;
    timer = window.setTimeout(() => {
      void show(current + 1, false).then(schedule);
    }, 6500);
  }
  // Actualiza el botón de pausa/reproducir (texto, ícono y aria-label) según el estado.
  // Se oculta si la persona prefiere menos movimiento. Luego vuelve a programar el cambio automático.
  const updatePlayback = (): void => {
    if (!play || !playLabel || !playIcon) {
      schedule();
      return;
    }
    playLabel.textContent = pausedByUser ? "Reproducir" : "Pausar";
    playIcon.textContent = pausedByUser ? "▷" : "Ⅱ";
    play.setAttribute(
      "aria-label",
      pausedByUser ? "Reproducir carrusel automáticamente" : "Pausar carrusel",
    );
    play.hidden = motionPreference.matches;
    schedule();
  };
  // Muestra la diapositiva "index" (con vuelta al principio al pasar la última).
  // manual = true cuando la persona eligió la imagen: en ese caso se pausa el cambio automático.
  const show = async (index: number, manual: boolean): Promise<void> => {
    const request = ++requestedSlide;
    const next = (index + slides.length) % slides.length;
    if (manual) {
      pausedByUser = true;
      updatePlayback();
    }
    // Keep the current photo visible until the requested one is ready.
    // (Se mantiene la foto actual hasta que la nueva esté lista para mostrarse.)
    await loadSlide(next)?.decode().catch(() => undefined);
    // Si mientras tanto se pidió otra imagen, esta petición queda descartada.
    if (request !== requestedSlide) return;
    current = next;
    // Precarga la siguiente imagen para que el próximo cambio sea fluido.
    if (!motionPreference.matches) loadSlide((current + 1) % slides.length);
    // Marca la diapositiva activa y oculta las demás a lectores de pantalla.
    slides.forEach((slide, i) => {
      slide.dataset.active = String(i === current);
      slide.setAttribute("aria-hidden", String(i !== current));
    });
    // Marca cuál de los puntos está activo.
    buttons.forEach((button, i) =>
      button.setAttribute("aria-pressed", String(i === current)),
    );
    // Actualiza el pie de foto y el contador, si existen en la página.
    if (caption) caption.textContent = slides[current]?.dataset.caption ?? "";
    if (counter)
      counter.textContent = (current + 1).toString().padStart(2, "0") + " /";
    // Si la persona eligió la imagen, se anuncia el cambio a lectores de pantalla.
    if (manual) {
      announcement.textContent =
        slides[current]?.getAttribute("aria-label") ?? "";
      if (play) pausedByUser = true;
      updatePlayback();
    }
  };

  // Cada punto muestra su imagen al hacer clic.
  buttons.forEach((button, index) =>
    button.addEventListener("click", () => show(index, true)),
  );
  // El botón de pausa alterna entre pausar y reproducir.
  play?.addEventListener("click", () => {
    pausedByUser = !pausedByUser;
    updatePlayback();
  });
  // Con el mouse encima, el carrusel se detiene; al salir, continúa.
  root.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") {
      hovering = true;
      schedule();
    }
  });
  root.addEventListener("pointerleave", () => {
    hovering = false;
    schedule();
  });
  // Pause while keyboard focus remains inside the carousel.
  // (Se pausa mientras el foco del teclado esté dentro del carrusel.)
  root.addEventListener("focusin", (event) => {
    focused = true;
    if (play && event.target !== play) {
      pausedByUser = true;
    }
    updatePlayback();
  });
  root.addEventListener("focusout", (event) => {
    // Si el foco solo se movió a otro elemento del carrusel, no se hace nada.
    if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget))
      return;
    focused = false;
    schedule();
  });
  // Si la pestaña se oculta o se vuelve a mostrar, se recalcula el cambio automático.
  document.addEventListener("visibilitychange", schedule);
  // Si la preferencia de movimiento cambia mientras se usa la página, se actualiza.
  motionPreference.addEventListener("change", () => {
    if (motionPreference.matches) pausedByUser = true;
    updatePlayback();
  });
  // Detecta si el carrusel está visible en pantalla (IntersectionObserver); si no lo está, no cambia.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      schedule();
    }).observe(root);
  }
  // Los controles empiezan ocultos (atributo hidden): se muestran aquí, porque ya sabemos que JavaScript funciona.
  controls.hidden = false;
  updatePlayback();
  // Do not compete with the first photo before it has decoded and painted.
  // (No se carga la segunda imagen hasta que la primera esté lista, y se espera 1 segundo más.)
  void loadSlide(0)?.decode().catch(() => undefined).then(() => {
    window.setTimeout(() => {
      if (!motionPreference.matches && !document.hidden && inView)
        loadSlide((current + 1) % slides.length);
    }, 1000);
  });
}

// ---------- 2. Video diferido ----------
// El iframe del video guarda su dirección en data-video-src y no carga nada. Aquí se copia a "src"
// justo antes de que el video entre en pantalla, para no frenar la carga inicial de la página.
function setupDeferredVideos(): void {
  const frames = document.querySelectorAll<HTMLIFrameElement>("iframe[data-video-src]");
  const load = (frame: HTMLIFrameElement): void => {
    if (frame.dataset.videoSrc) {
      frame.src = frame.dataset.videoSrc;
      delete frame.dataset.videoSrc;
    }
  };
  // Si el navegador no tiene IntersectionObserver, el video se carga de inmediato.
  if (!("IntersectionObserver" in window)) {
    frames.forEach(load);
    return;
  }
  // Observa el contenedor del video. rootMargin "200px": empieza a cargar 200 px antes de que se vea.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const frame = entry.target.querySelector<HTMLIFrameElement>("iframe[data-video-src]");
        if (frame) load(frame);
        // Una vez cargado, deja de observarlo.
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "200px" });
  frames.forEach((frame) => {
    if (frame.parentElement) observer.observe(frame.parentElement);
  });
}

// ---------- 3. Revelado al hacer scroll ----------
// Las secciones que están más abajo de la pantalla aparecen suavemente al llegar a ellas.
function setupReveals(): void {
  // Sin IntersectionObserver o con preferencia de menos movimiento, no se hace nada: todo queda visible.
  if (!("IntersectionObserver" in window) || motionPreference.matches) return;
  // Bloques que se revelan (selectores CSS).
  const elements = document.querySelectorAll<HTMLElement>(
    ".section-heading, .about-grid, .competency-grid, .curriculum, .work-grid, .backing-grid, .admissions-steps, .weights-block, .faq-grid, .references-section > .container",
  );
  // Quita la clase que lo oculta y deja de observarlo.
  const reveal = (element: Element): void => {
    element.classList.remove("reveal-pending");
    observer.unobserve(element);
  };
  // Revela cada bloque cuando al menos un 6% entra en pantalla.
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => reveal(entry.target));
    },
    { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
  );
  // Solo se ocultan los bloques que están debajo de la pantalla; los que ya se ven quedan como están.
  elements.forEach((element) => {
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add("reveal-pending");
      observer.observe(element);
    }
  });
  // Never leave keyboard focus or an anchor destination inside hidden content.
  // (Nunca se deja el foco del teclado ni el destino de un enlace dentro de contenido oculto.)
  function revealTarget(target: Element | null): void {
    elements.forEach((element) => {
      if (target && (element.contains(target) || target.contains(element)))
        reveal(element);
    });
  }
  // Si el teclado enfoca algo, se revela el bloque que lo contiene.
  document.addEventListener("focusin", (event) => {
    if (event.target instanceof Element) revealTarget(event.target);
  });
  // Si se navega a un enlace interno (#algo), se revela su destino.
  window.addEventListener("hashchange", () =>
    revealTarget(document.getElementById(location.hash.slice(1))),
  );
  // Si se activa la preferencia de menos movimiento, se revela todo.
  motionPreference.addEventListener("change", () => {
    if (motionPreference.matches) elements.forEach(reveal);
  });
  // Si la página se abrió con un #destino en la dirección, se revela de inmediato.
  revealTarget(document.getElementById(location.hash.slice(1)));
}

// ---------- 4. Menú móvil ----------
// El menú es un <details> (abre y cierra sin JavaScript). Este código mejora su comportamiento.
function setupMobileMenu(): void {
  const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu");
  const summary = menu?.querySelector<HTMLElement>("summary");
  if (!menu || !summary) return;

  // Al elegir un enlace interno, se cierra el menú.
  menu.addEventListener("click", (event) => {
    const link = event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
      : null;
    // Se ignoran clics que no sean un clic simple (por ejemplo con Ctrl o Shift) o sin enlace.
    if (!link || event.defaultPrevented || event.button !== 0 ||
      event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    menu.open = false;
    // Keep native anchor scrolling and move keyboard focus out of the closed menu.
    // (Se conserva el desplazamiento normal y el foco del teclado pasa al destino, fuera del menú cerrado.)
    if (!target.hasAttribute("tabindex")) {
      target.tabIndex = -1;
      // Al perder el foco, se quita el tabindex temporal.
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
        once: true,
      });
    }
    target.focus({ preventScroll: true });
  });
  // Con la tecla Escape se cierra el menú y el foco vuelve al botón "Menú".
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      event.preventDefault();
      menu.open = false;
      summary.focus();
    }
  });
}

// ---------- 5. Malla curricular: filtro de semestre ----------
// Al elegir un semestre en el filtro, se desplaza la malla hasta él y se anuncia el cambio.
// El resaltado de semestres anteriores, seleccionado y siguientes lo hace el CSS.
function setupCurriculum(): void {
  const root = document.querySelector<HTMLElement>(".curriculum");
  const scroller = root?.querySelector<HTMLElement>(".curriculum-scroll");
  const announcement = document.querySelector<HTMLElement>(
    "[data-semester-announcement]",
  );
  if (!root || !scroller) return;
  // Escucha los cambios de los botones de opción del filtro.
  root.addEventListener("change", (event) => {
    const input = event.target;
    if (
      !(input instanceof HTMLInputElement) ||
      input.name !== "academic-semester"
    )
      return;
    // Valor elegido: 0 = toda la malla, 1 a 8 = ese semestre. Si no es válido, no hace nada.
    const selectedSemester = Number(input.value);
    if (
      !Number.isInteger(selectedSemester) ||
      selectedSemester < 0 ||
      selectedSemester > 8
    )
      return;
    // Columna del semestre elegido.
    const semester = root.querySelector<HTMLElement>(
      '.semester[data-semester="' + selectedSemester + '"]',
    );
    // Move only this horizontal panel; keep the visitor's vertical position.
    // (Se mueve solo este panel horizontal; la posición vertical de la página no cambia.)
    // Cálculo: posición de la columna respecto al panel + lo ya desplazado - 3 px de margen. Para "toda la malla", vuelve al inicio (0).
    const left = semester
      ? semester.getBoundingClientRect().left -
        scroller.getBoundingClientRect().left +
        scroller.scrollLeft -
        3
      : 0;
    // Desplazamiento suave, o inmediato si la persona prefiere menos movimiento.
    scroller.scrollTo({
      left,
      behavior: motionPreference.matches ? "instant" : "smooth",
    });
    // Mensaje para lectores de pantalla sobre lo que se está mostrando.
    if (announcement)
      announcement.textContent =
        selectedSemester === 0
          ? "Mostrando la malla completa, sin semestres destacados."
          : "Semestre " +
            selectedSemester +
            " destacado. Los anteriores están tachados y los siguientes en gris.";
  });
}

// ---------- 6. Citas que abren su referencia ----------
// Al hacer clic en una cita (por ejemplo "UTEM · Carrera · 2026"), se abre el desplegable que
// contiene su referencia, para que el salto (#ref-...) llegue a algo visible.
function setupReferenceLinks(): void {
  document.addEventListener("click", (event) => {
    const link = event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>('a.citation[href^="#ref-"]')
      : null;
    if (!link) return;
    const target = document.getElementById(link.hash.slice(1));
    const details = target?.closest<HTMLDetailsElement>("details");
    if (details) details.open = true;
  });
}

// ---------- Inicio: se ejecutan las seis funciones ----------
// Activa el carrusel en cada elemento marcado con data-carousel.
document
  .querySelectorAll<HTMLElement>("[data-carousel]")
  .forEach(setupCarousel);
setupReveals();
setupMobileMenu();
setupCurriculum();
setupReferenceLinks();
setupDeferredVideos();
