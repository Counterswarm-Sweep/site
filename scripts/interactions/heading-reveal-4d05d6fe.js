class p extends HTMLElement {
  connectedCallback() {
    const i = this.dataset.selector;
    if (
      !i ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const a = new Set(),
      l = (e) => {
        const r = e.querySelectorAll(".heading-reveal__mask");
        let t = -1,
          n = -1 / 0;
        r.forEach((c) => {
          const o = c.getBoundingClientRect().top;
          (Math.abs(o - n) > 3 && ((t += 1), (n = o)), c.style.setProperty("--reveal-line", String(t)));
        });
      },
      d = new ResizeObserver(() => {
        a.forEach(l);
      }),
      f = () =>
        new IntersectionObserver(
          (e) => {
            for (const r of e) {
              const t = r.target;
              t.getClientRects().length &&
                (t.closest('[data-fade-swap-panel][data-active="false"]') ||
                  (!r.isIntersecting && r.boundingClientRect.bottom > 0) ||
                  (l(t),
                  t.classList.add("heading-reveal--visible"),
                  a.delete(t),
                  d.unobserve(t),
                  s.unobserve(r.target)));
            }
          },
          { rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.25)}px 0px`, threshold: 0 },
        );
    let s = f();
    const m = () => {
      (s.disconnect(), (s = f()), a.forEach((e) => s.observe(e)));
    };
    (window.addEventListener("resize", m, { passive: !0 }),
      document.querySelectorAll(i).forEach((e) => {
        if (e.classList.contains("heading-reveal") || e.querySelector("[data-ink-words]")) return;
        const r = document.createTreeWalker(e, NodeFilter.SHOW_TEXT),
          t = [];
        for (; r.nextNode();) t.push(r.currentNode);
        (t.forEach((n) => {
          if (!n.textContent?.trim()) return;
          const c = document.createDocumentFragment();
          (n.textContent.split(/(\s+)/).forEach((o) => {
            if (!o) return;
            if (/^\s+$/.test(o)) {
              c.append(document.createTextNode(o));
              return;
            }
            const u = document.createElement("span");
            u.className = "heading-reveal__mask";
            const v = document.createElement("span");
            ((v.className = "heading-reveal__content"), (v.textContent = o), u.append(v), c.append(u));
          }),
            n.replaceWith(c));
        }),
          e.classList.add("heading-reveal"),
          l(e),
          e.getClientRects().length && e.getBoundingClientRect().bottom <= 0
            ? e.classList.add("heading-reveal--visible")
            : (a.add(e), d.observe(e), s.observe(e)));
      }));
    const h = new MutationObserver((e) => {
      new Set(e.map((t) => t.target)).forEach((t) => {
        t.querySelectorAll(i).forEach((n) => {
          (t.hidden && n.classList.remove("heading-reveal--visible"),
            n.classList.contains("heading-reveal--visible") ||
              (a.add(n), d.observe(n), s.unobserve(n), s.observe(n)));
        });
      });
    });
    (document.querySelectorAll("[data-fade-swap-panel]").forEach((e) => {
      e.querySelector(i) && h.observe(e, { attributes: !0, attributeFilter: ["hidden", "data-active"] });
    }),
      document.fonts.ready.then(() => a.forEach(l)),
      (this.cleanup = () => {
        (h.disconnect(), s.disconnect(), d.disconnect(), window.removeEventListener("resize", m), a.clear());
      }));
  }
  cleanup;
  disconnectedCallback() {
    this.cleanup?.();
  }
}
customElements.get("heading-reveal") || customElements.define("heading-reveal", p);
