const c = new WeakSet();
function d(s) {
  if (c.has(s)) return;
  const t = [...s.querySelectorAll("[data-tab]")],
    l = [...s.querySelectorAll("[data-panel]")];
  if (t.length === 0 || l.length === 0) return;
  c.add(s);
  const o = (n, { focus: r = !1 } = {}) => {
    for (const e of t) {
      const a = e.dataset.tab === n;
      (e.setAttribute("aria-selected", a ? "true" : "false"), (e.tabIndex = a ? 0 : -1), a && r && e.focus());
    }
    for (const e of l) e.hidden = e.dataset.panel !== n;
    s.dispatchEvent(new CustomEvent("figure-tab-change", { bubbles: !0, detail: { id: n } }));
  };
  t.forEach((n, r) => {
    (n.addEventListener("click", () => {
      n.dataset.tab && o(n.dataset.tab);
    }),
      n.addEventListener("keydown", (e) => {
        let a = r;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") a = (r + 1) % t.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") a = (r - 1 + t.length) % t.length;
        else if (e.key === "Home") a = 0;
        else if (e.key === "End") a = t.length - 1;
        else return;
        e.preventDefault();
        const i = t[a].dataset.tab;
        i && o(i, { focus: !0 });
      }));
  });
}
function f(s = document) {
  for (const t of s.querySelectorAll("[data-figure-tabs]")) d(t);
}
f();
document.addEventListener("astro:page-load", () => f());
