const yearData = [
  {
    title1: "Мониторинг 2023-2024: средняя группа «Ромашки»",
    size1: "Сводная таблица, DOCX",
    href1: "./monitoring/2024 СВОДНАЯ  ТАБЛИЦА ПО УСВОЕНИЮ ПРОГРАММНЫХ ПОКАЗАТЕЛЕЙ ДЕТЬМИ гр. Ромашки Средняя гр 23-24.docx",
    title2: "Аналитическая справка 2023-2024",
    size2: "Выводы и рекомендации, DOCX",
    href2: "./monitoring/2024 Аналитическая справка по итогам педагогической диагностики 23-24.docx",
    group: "Средняя группа «Ромашки», 13 детей",
    total: "80%",
    firstHalfTotal: 43,
    secondHalfTotal: 80,
    label1: "Социально-коммуникативное развитие",
    label2: "Познавательное развитие",
    label3: "Речевое развитие",
    label4: "Художественно-эстетическое развитие",
    label5: "Физическое развитие",
    stat1: 85,
    stat2: 92,
    stat3: 69,
    stat4: 85,
    stat5: 69,
    base1: 58,
    base2: 75,
    base3: 42,
    base4: 17,
    base5: 25,
  },
  {
    title1: "Мониторинг 2024-2025: младшая группа «Ромашки»",
    size1: "Сводная таблица, DOCX",
    href1: "./monitoring/2025 СВОДНАЯ  ТАБЛИЦА ПО УСВОЕНИЮ ПРОГРАММНЫХ ПОКАЗАТЕЛЕЙ ДЕТЬМИ гр. Ромашки Младшая гр 24-25.docx",
    title2: "Аналитическая справка 2024-2025",
    size2: "Выводы и рекомендации, DOCX",
    href2: "./monitoring/2025 Аналитическая справка по итогам педагогической диагностики 24-25.docx",
    group: "Младшая группа «Ромашки», 12 детей",
    total: "56%",
    firstHalfTotal: 5,
    secondHalfTotal: 56,
    label1: "Социально-коммуникативное развитие",
    label2: "Познавательное развитие",
    label3: "Речевое развитие",
    label4: "Художественно-эстетическое развитие",
    label5: "Физическое развитие",
    stat1: 75,
    stat2: 58,
    stat3: 58,
    stat4: 33,
    stat5: 58,
    base1: 25,
    base2: 0,
    base3: 0,
    base4: 0,
    base5: 0,
  },
  {
    title1: "Мониторинг 2025-2026: группа «Светлячки»",
    size1: "Сводная таблица, XLSX",
    href1: "./monitoring/2026 СВОДНАЯ  ТАБЛИЦА ПО УСВОЕНИЮ ПРОГРАММНЫХ ПОКАЗАТЕЛЕЙ ДЕТЬМИ гр. Светлячки 25-26.xlsx",
    title2: "Аналитическая справка 2025-2026",
    size2: "Выводы по стартовой диагностике, DOCX",
    href2: "./monitoring/2026 Аналитическая справка по итогам педагогической диагностики 25-26.docx",
    group: "Группа «Светлячки», 14 детей",
    total: "6%",
    firstHalfTotal: 6,
    secondHalfTotal: 6,
    label1: "Социально-коммуникативное развитие",
    label2: "Познавательное развитие",
    label3: "Речевое развитие",
    label4: "Художественно-эстетическое развитие",
    label5: "Физическое развитие",
    stat1: 0,
    stat2: 0,
    stat3: 14,
    stat4: 0,
    stat5: 14,
    base1: 0,
    base2: 0,
    base3: 14,
    base4: 0,
    base5: 14,
  },
];

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setHref(id, value) {
  const element = document.getElementById(id);
  if (element && value) {
    element.setAttribute("href", value);
  }
}

function setBar(id, value) {
  const bar = document.getElementById(id);
  if (!bar) {
    return;
  }

  const width = `${value}%`;
  bar.style.width = "0%";
  bar.setAttribute("data-width", width);

  window.setTimeout(() => {
    bar.style.width = width;
  }, 50);
}



function formatDelta(currentValue, previousValue) {
  const delta = currentValue - previousValue;
  return `${delta >= 0 ? "+" : ""}${delta} п.п.`;
}



function moveYearGlider(button) {
  const glider = document.getElementById("year-glider");
  if (!glider || !button) {
    return;
  }

  glider.style.transform = `translateX(${button.offsetLeft - 6}px)`;
  glider.style.width = `${button.offsetWidth}px`;
}

function switchYear(index, button) {
  const data = yearData[index];
  const reportList = document.getElementById("reports-list");
  const statsContainer = document.getElementById("stats-container");

  if (!data || !reportList || !statsContainer) {
    return;
  }

  moveYearGlider(button);

  document.querySelectorAll(".year-btn").forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex === index);
  });

  reportList.style.opacity = "0";
  statsContainer.style.opacity = "0";

  window.setTimeout(() => {
    setText("report-title-1", data.title1);
    setText("report-size-1", data.size1);
    setHref("report-link-1", data.href1);
    setText("report-title-2", data.title2);
    setText("report-size-2", data.size2);
    setHref("report-link-2", data.href2);
    setText("stat-group", data.group);
    setText("stat-total", data.total);
    setText("first-half-total", `${data.firstHalfTotal}%`);
    setText("second-half-total", `${data.secondHalfTotal}%`);
    setText("total-delta", formatDelta(data.secondHalfTotal, data.firstHalfTotal));
    setText("stat-label-1", data.label1);
    setText("stat-label-2", data.label2);
    setText("stat-label-3", data.label3);
    setText("stat-label-4", data.label4);
    setText("stat-label-5", data.label5);
    setText("stat-val-1", data.stat1 ? `${data.stat1}%` : "-");
    setText("stat-val-2", data.stat2 ? `${data.stat2}%` : "-");
    setText("stat-val-3", data.stat3 ? `${data.stat3}%` : "-");
    setText("stat-val-4", data.stat4 ? `${data.stat4}%` : "-");
    setText("stat-val-5", data.stat5 ? `${data.stat5}%` : "-");

    const total = document.getElementById("stat-total");
    if (total) {
      total.classList.toggle("is-empty", data.total === "—");
    }

    reportList.style.opacity = "1";
    statsContainer.style.opacity = "1";

    setBar("stat-base-1", data.base1);
    setBar("stat-base-2", data.base2);
    setBar("stat-base-3", data.base3);
    setBar("stat-base-4", data.base4);
    setBar("stat-base-5", data.base5);
    setBar("stat-growth-1", data.stat1 - data.base1);
    setBar("stat-growth-2", data.stat2 - data.base2);
    setBar("stat-growth-3", data.stat3 - data.base3);
    setBar("stat-growth-4", data.stat4 - data.base4);
    setBar("stat-growth-5", data.stat5 - data.base5);
  }, 300);
}

function setupYearSwitcher() {
  const buttons = document.querySelectorAll(".year-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-year-index"));
      switchYear(index, button);
    });
  });

  const activeButton = document.querySelector(".year-btn.is-active");
  moveYearGlider(activeButton);
}

function setupRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("active");
        entry.target.querySelectorAll(".progress-base, .progress-growth").forEach((bar) => {
          window.setTimeout(() => {
            bar.style.width = bar.getAttribute("data-width") || "0%";
          }, 300);
        });
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("mobile-nav");

  if (!toggle || !nav) {
    return;
  }

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function setupHorizontalCarousel(viewportId, previousSelector, nextSelector, cardSelector) {
  const viewport = document.getElementById(viewportId);
  const previousButton = document.querySelector(previousSelector);
  const nextButton = document.querySelector(nextSelector);

  if (!viewport || !previousButton || !nextButton) {
    return;
  }

  const getStep = () => {
    const firstCard = viewport.querySelector(cardSelector);
    if (!firstCard) {
      return viewport.clientWidth;
    }

    const styles = window.getComputedStyle(firstCard);
    const margin = Number.parseFloat(styles.marginRight) || 0;
    return firstCard.getBoundingClientRect().width + margin + 28;
  };

  previousButton.addEventListener("click", () => {
    viewport.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    viewport.scrollBy({ left: getStep(), behavior: "smooth" });
  });
}

function setupCertificatesCarousel() {
  setupHorizontalCarousel("certificates-carousel", "[data-carousel-prev]", "[data-carousel-next]", ".certificate-card");
}

function setupEducationReportsCarousel() {
  setupHorizontalCarousel("education-reports-carousel", "[data-education-prev]", "[data-education-next]", ".education-report-card");
}

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupMobileMenu();
  setupYearSwitcher();
  setupCertificatesCarousel();
  setupEducationReportsCarousel();
  setupRevealAnimation();
});

window.addEventListener("resize", () => {
  const activeButton = document.querySelector(".year-btn.is-active");
  moveYearGlider(activeButton);
});
