const i = "[data-animated-section-description]",
  s = (e) => {
    e.classList.add("is-visible");
  },
  n = () => {
    const e = Array.from(document.querySelectorAll(i)).filter((t) => !t.classList.contains("is-visible"));
    if (e.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      e.forEach(s);
      return;
    }
    const o = new IntersectionObserver(
      (t) => {
        t.forEach((r) => {
          r.isIntersecting && (s(r.target), o.unobserve(r.target));
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -4% 0px" },
    );
    e.forEach((t) => o.observe(t));
  };
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", n, { once: !0 }) : n();
document.addEventListener("astro:page-load", n);
