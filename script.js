/* ==========================================================================
   NOT ZENO — script.js
   Edit PROJECTS below to change your project showcase.
   ========================================================================== */

const PROJECTS = [
  {
    name: "Project One",
    description: "A short description of what this project does and the problem it solves.",
    stack: "HTML · CSS · JavaScript",
    github: "#",
    demo: "#"
  },
  {
    name: "Project Two",
    description: "A short description of what this project does and the problem it solves.",
    stack: "Python",
    github: "#",
    demo: "#"
  },
  {
    name: "Project Three",
    description: "A short description of what this project does and the problem it solves.",
    stack: "React · JavaScript",
    github: "#",
    demo: "#"
  },
  {
    name: "Project Four",
    description: "A short description of what this project does and the problem it solves.",
    stack: "HTML · CSS",
    github: "#",
    demo: "#"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupMobileNav();
  setupRevealOnScroll();
  setupBackToTop();
  setupScrollCue();
});

/* ---------------------------- Render projects ---------------------------- */
function renderProjects() {
  const list = document.getElementById("projectsList");
  if (!list) return;

  list.innerHTML = PROJECTS.map((p, i) => {
    const index = String(i + 1).padStart(2, "0");
    const href = p.demo && p.demo !== "#" ? p.demo : (p.github || "#");
    return `
      <div class="project-row">
        <span class="project-row__index">${index}</span>
        <div>
          <div class="project-row__name">${escapeHTML(p.name)}</div>
          <p class="project-row__desc">${escapeHTML(p.description)}</p>
          <div class="project-row__stack">${escapeHTML(p.stack)}</div>
        </div>
        <a class="project-row__link" href="${href}" target="_blank" rel="noopener">
          View Project <span class="project-row__arrow">&rarr;</span>
        </a>
      </div>
    `;
  }).join("");
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ------------------------------ Mobile nav -------------------------------- */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

/* --------------------------- Reveal on scroll ----------------------------- */
function setupRevealOnScroll() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  items.forEach(el => observer.observe(el));
}

/* ------------------------------ Back to top -------------------------------- */
function setupBackToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ------------------------------ Scroll cue --------------------------------- */
function setupScrollCue() {
  const cue = document.getElementById("scrollCue");
  const about = document.getElementById("about");
  if (!cue || !about) return;
  cue.addEventListener("click", () => {
    about.scrollIntoView({ behavior: "smooth" });
  });
}
