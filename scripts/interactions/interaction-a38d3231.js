const i = ".marquee[data-animated='true']",
  r = new Map();
function c(e) {
  const n = e.querySelector(".marquee__group");
  if (!(n instanceof HTMLElement)) return;
  const t = n.getBoundingClientRect().width;
  t > 0 && e.style.setProperty("--marquee-distance", `${t}px`);
}
function a(e) {
  const n = e.querySelector(".marquee__group");
  if (!(n instanceof HTMLElement)) return;
  const t = r.get(e);
  t && t.disconnect();
  const o = new ResizeObserver(() => {
    c(e);
  });
  (o.observe(e), o.observe(n), r.set(e, o), c(e));
}
function s() {
  for (const [e, n] of r) e.isConnected || (n.disconnect(), r.delete(e));
  document.querySelectorAll(i).forEach((e) => {
    a(e);
  });
}
s();
document.addEventListener("astro:page-load", s);
window.addEventListener("load", s, { once: !0 });
document.fonts?.ready.then(() => {
  s();
});
