let n,
  d = !1;
const l = () => {
  n?.();
  const o = document.querySelector("[data-home-hero]"),
    e = o?.querySelector(".customer-logo-grid"),
    s = e?.querySelector(".customer-logo-grid__eyebrow"),
    r = e?.querySelector("[data-logo-grid-cell]");
  if (!o || !e || !r) return;
  const i = () => {
    const c = `${Math.ceil(r.getBoundingClientRect().bottom - e.getBoundingClientRect().top)}px`;
    o.style.getPropertyValue("--home-proof-peek") !== c && o.style.setProperty("--home-proof-peek", c);
  };
  i();
  const t = new ResizeObserver(i);
  (t.observe(e), t.observe(r), s && t.observe(s), (n = () => t.disconnect()));
};
function u() {
  d ||
    ((d = !0),
    l(),
    document.addEventListener("astro:page-load", l),
    document.addEventListener("astro:before-swap", () => n?.()));
}
u();
