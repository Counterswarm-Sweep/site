const a = () => {
  const t = document.querySelectorAll('[data-motif-frame][data-motif-ready="false"]');
  if (!t.length) return;
  if (!("IntersectionObserver" in window)) {
    t.forEach((e) => {
      e.dataset.motifReady = "true";
    });
    return;
  }
  const r = new IntersectionObserver(
    (e) => {
      e.forEach((o) => {
        o.isIntersecting && ((o.target.dataset.motifReady = "true"), r.unobserve(o.target));
      });
    },
    { threshold: 0.25 },
  );
  (t.forEach((e) => r.observe(e)),
    document.addEventListener("astro:before-swap", () => r.disconnect(), { once: !0 }));
};
a();
document.addEventListener("astro:page-load", a);
