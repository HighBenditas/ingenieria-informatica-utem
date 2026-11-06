// Progressive enhancement: the first image and all content remain visible without JS.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

function setupCarousel(root: HTMLElement): void {
  const slides = [...root.querySelectorAll<HTMLElement>("[data-slide]")];
  const buttons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-slide-button]"),
  ];
  const controls = root.querySelector<HTMLElement>("[data-carousel-controls]");
  const caption = root.querySelector<HTMLElement>("[data-carousel-caption]");
  const counter = root.querySelector<HTMLElement>("[data-carousel-counter]");
  const previous = root.querySelector<HTMLButtonElement>("[data-previous]");
  const next = root.querySelector<HTMLButtonElement>("[data-next]");
  const play = root.querySelector<HTMLButtonElement>("[data-play]");
  const playLabel = root.querySelector<HTMLElement>("[data-play-label]");
  const playIcon = root.querySelector<HTMLElement>("[data-play-icon]");
  const announcement = root.querySelector<HTMLElement>(
    "[data-carousel-announcement]",
  );
  if (
    !controls ||
    !previous ||
    !next ||
    !play ||
    !playLabel ||
    !playIcon ||
    !announcement ||
    slides.length < 2
  )
    return;

  let current = 0;
  let pausedByUser = motionPreference.matches;
  let hovering = false;
  let inView = true;
  let timer: number | undefined;

  function schedule(): void {
    window.clearTimeout(timer);
    if (
      pausedByUser ||
      hovering ||
      !inView ||
      document.hidden ||
      motionPreference.matches
    )
      return;
    timer = window.setTimeout(() => {
      show(current + 1, false);
      schedule();
    }, 6500);
  }
  const updatePlayback = (): void => {
    playLabel.textContent = pausedByUser ? "Reproducir" : "Pausar";
    playIcon.textContent = pausedByUser ? "▷" : "Ⅱ";
    play.setAttribute(
      "aria-label",
      pausedByUser ? "Activar cambio automático" : "Pausar carrusel",
    );
    play.hidden = motionPreference.matches;
    schedule();
  };
  const show = (index: number, manual: boolean): void => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.dataset.active = String(i === current);
      slide.setAttribute("aria-hidden", String(i !== current));
    });
    buttons.forEach((button, i) =>
      button.setAttribute("aria-pressed", String(i === current)),
    );
    if (caption) caption.textContent = slides[current]?.dataset.caption ?? "";
    if (counter)
      counter.textContent = (current + 1).toString().padStart(2, "0") + " /";
    if (manual) {
      pausedByUser = true;
      announcement.textContent =
        slides[current]?.getAttribute("aria-label") ?? "";
      updatePlayback();
    }
  };
  previous.addEventListener("click", () => show(current - 1, true));
  next.addEventListener("click", () => show(current + 1, true));
  buttons.forEach((button, index) =>
    button.addEventListener("click", () => show(index, true)),
  );
  play.addEventListener("click", () => {
    pausedByUser = !pausedByUser;
    updatePlayback();
  });
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
  // Keyboard interaction stops autoplay until the visitor explicitly restarts it.
  root.addEventListener("focusin", (event) => {
    if (event.target !== play) {
      pausedByUser = true;
      updatePlayback();
    }
  });
  document.addEventListener("visibilitychange", schedule);
  motionPreference.addEventListener("change", () => {
    if (motionPreference.matches) pausedByUser = true;
    updatePlayback();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      schedule();
    }).observe(root);
  }
  controls.hidden = false;
  updatePlayback();
}

function setupReveals(): void {
  if (!("IntersectionObserver" in window) || motionPreference.matches) return;
  const elements = document.querySelectorAll<HTMLElement>(
    ".section-heading, .about-grid, .competency-grid, .curriculum, .work-grid, .backing-grid, .admissions-steps, .weights-block, .faq-grid, .references-section > .container",
  );
  const reveal = (element: Element): void => {
    element.classList.remove("reveal-pending");
    observer.unobserve(element);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => reveal(entry.target));
    },
    { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
  );
  elements.forEach((element) => {
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add("reveal-pending");
      observer.observe(element);
    }
  });
  // Never leave keyboard focus or an anchor destination inside hidden content.
  function revealTarget(target: Element | null): void {
    elements.forEach((element) => {
      if (target && (element.contains(target) || target.contains(element)))
        reveal(element);
    });
  }
  document.addEventListener("focusin", (event) => {
    if (event.target instanceof Element) revealTarget(event.target);
  });
  window.addEventListener("hashchange", () =>
    revealTarget(document.getElementById(location.hash.slice(1))),
  );
  motionPreference.addEventListener("change", () => {
    if (motionPreference.matches) elements.forEach(reveal);
  });
  revealTarget(document.getElementById(location.hash.slice(1)));
}

function setupCurriculum(): void {
  const root = document.querySelector<HTMLElement>(".curriculum");
  const scroller = root?.querySelector<HTMLElement>(".curriculum-scroll");
  const announcement = document.querySelector<HTMLElement>(
    "[data-semester-announcement]",
  );
  if (!root || !scroller) return;
  root.addEventListener("change", (event) => {
    const input = event.target;
    if (
      !(input instanceof HTMLInputElement) ||
      input.name !== "academic-semester"
    )
      return;
    const selectedSemester = Number(input.value);
    if (
      !Number.isInteger(selectedSemester) ||
      selectedSemester < 0 ||
      selectedSemester > 8
    )
      return;
    const semester = root.querySelector<HTMLElement>(
      '.semester[data-semester="' + selectedSemester + '"]',
    );
    // Move only this horizontal panel; keep the visitor's vertical position.
    const left = semester
      ? semester.getBoundingClientRect().left -
        scroller.getBoundingClientRect().left +
        scroller.scrollLeft -
        3
      : 0;
    scroller.scrollTo({
      left,
      behavior: motionPreference.matches ? "instant" : "smooth",
    });
    if (announcement)
      announcement.textContent =
        selectedSemester === 0
          ? "Mostrando la malla completa, sin semestres destacados."
          : "Semestre " +
            selectedSemester +
            " destacado. Los anteriores están tachados y los siguientes en gris.";
  });
}

document
  .querySelectorAll<HTMLElement>("[data-carousel]")
  .forEach(setupCarousel);
setupReveals();
setupCurriculum();
