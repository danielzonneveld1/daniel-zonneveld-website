document.getElementById("year").textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(
  ".about__grid, .timeline__item, .education, .thesis__card, .fact-card, .contact__inner"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const statEls = document.querySelectorAll(".stat__num");

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  if (reduceMotion || Number.isNaN(target)) {
    el.textContent = `${prefix}${target}${suffix}`;
    return;
  }
  const duration = 1100;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = `${prefix}${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

statEls.forEach((el) => statObserver.observe(el));
