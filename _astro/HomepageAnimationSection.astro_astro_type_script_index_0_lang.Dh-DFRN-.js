import { b as c } from "./scrollStory.DKfUDhKk.js";
c();
const s = () => {
  document.querySelectorAll("[data-homepage-workflow]").forEach((e) => {
    if (e.dataset.ready) return;
    e.dataset.ready = "true";
    const t = new AbortController(),
      a = matchMedia("(max-width: 959px)"),
      r = e.querySelector(".homepage-workflow__title"),
      n = e.querySelector("[data-scroll-story-track]"),
      l = e.querySelector("[data-scroll-story-stage]"),
      o = () => {
        a.matches ? e.insertBefore(r, n) : l.prepend(r);
      };
    (a.addEventListener("change", o, { signal: t.signal }),
      o(),
      document.addEventListener("astro:before-swap", () => t.abort(), { once: !0 }));
  });
};
s();
document.addEventListener("astro:page-load", s);
