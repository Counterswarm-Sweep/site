const et = (e, n) => ({ a: n.x === "max" ? e.x : -e.x, b: n.y === "max" ? -e.y : e.y });
function lt(e, n) {
  const d = e.map((c) => et(c, n));
  return e.map((c, i) => i).sort((c, i) => d[i].a - d[c].a || d[i].b - d[c].b);
}
function J(e, n, d, c = () => !0) {
  const i = [];
  let f = Number.NEGATIVE_INFINITY;
  for (const l of n) {
    if (!c(l)) continue;
    const { a, b: y } = et(e[l], d);
    if (!(y <= f)) {
      for (f = y; i.length >= 2;) {
        const g = i[i.length - 2],
          h = i[i.length - 1];
        if ((h.a - g.a) * (y - g.b) - (h.b - g.b) * (a - g.a) > 0) break;
        i.pop();
      }
      i.push({ index: l, a, b: y });
    }
  }
  return i.map(({ index: l }) => l).sort((l, a) => e[l].x - e[a].x);
}
function U(e) {
  return e.length < 2
    ? ""
    : e.map((n, d) => `${d === 0 ? "M" : "L"}${n.x.toFixed(2)},${n.y.toFixed(2)}`).join(" ");
}
function Z(e, n) {
  const d = e[0],
    c = e[e.length - 1];
  if (n <= d.x) return d;
  if (n >= c.x) return c;
  for (let i = 1; i < e.length; i += 1) {
    const f = e[i];
    if (n > f.x) continue;
    const l = e[i - 1],
      a = f.x === l.x ? 0 : (n - l.x) / (f.x - l.x);
    return { x: n, y: l.y + (f.y - l.y) * a };
  }
  return c;
}
function ut(e, n) {
  const d = [...e].sort((a, y) => a.x - y.x),
    c = new Set(n.map((a) => a.id)),
    i = new Map(e.map((a) => [a.id, a])),
    f = n.map((a) => ({ id: a.id, from: i.get(a.id) ?? (d.length > 0 ? Z(d, a.x) : a), to: a, leaving: !1 }));
  for (const a of e)
    c.has(a.id) || f.push({ id: a.id, from: a, to: n.length > 0 ? Z(n, a.x) : a, leaving: !0 });
  const l = (a) => (a.leaving ? a.from : a.to);
  return f.sort((a, y) => l(a).x - l(y).x);
}
const ft = (e, n) => ({
    id: e.id,
    x: e.from.x + (e.to.x - e.from.x) * n,
    y: e.from.y + (e.to.y - e.from.y) * n,
  }),
  O = 10,
  R = 2,
  bt = 480,
  K = "pareto:frontier-toggle",
  ht = (e) => 1 - (1 - e) ** 4,
  Q = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1,
  tt = new WeakSet();
function xt(e) {
  const n = e.querySelector("[data-chart-payload]");
  if (!n?.textContent) return null;
  try {
    return JSON.parse(n.textContent);
  } catch {
    return null;
  }
}
function mt(e) {
  if (tt.has(e)) return;
  const n = xt(e),
    d = e.querySelector("[data-chart-svg]"),
    c = e.querySelector("[data-chart-hit]"),
    i = e.querySelector(".pareto__guides"),
    f = e.querySelector("[data-chart-guide-x]"),
    l = e.querySelector("[data-chart-guide-y]"),
    a = e.querySelector(".pareto__readouts"),
    y = e.querySelector("[data-chart-readout-x]"),
    g = e.querySelector("[data-chart-readout-y]"),
    h = e.querySelector("[data-chart-mark-label]");
  if (!n || !d || !c || !i || !f || !l || !a || !y || !g || !h) return;
  tt.add(e);
  const v = [...e.querySelectorAll("[data-chart-series]")],
    k = [...e.querySelectorAll("[data-chart-mark]")],
    st = [...e.querySelectorAll(".pareto__inline-label")],
    D = [...e.querySelectorAll('[data-tick="x"]')],
    H = [...e.querySelectorAll('[data-tick="y"]')],
    x = new Set(v.filter((t) => t.dataset.hidden === "true").map((t) => Number(t.dataset.seriesIndex))),
    q = new Set(x);
  let I = -1;
  const Y = [...c.querySelectorAll("[data-point-index]")],
    L = e.querySelector("[data-chart-frontier]"),
    S = n.frontier,
    C = n.points.map((t) => ({ x: t.x, y: t.y })),
    $ = S ? lt(C, S) : [],
    G = (t) => !x.has(n.points[t].seriesIndex),
    z = (t) => ({ id: t, x: n.points[t].x, y: n.points[t].y });
  let E = S ? J(C, $, S, G) : [],
    N = E.map(z),
    F = 0,
    M = e.dataset.frontierVisible === "true";
  const X = (t) => {
      const r = new Set(t);
      k.forEach((s, o) => {
        r.has(o) ? s.setAttribute("data-frontier", "true") : s.removeAttribute("data-frontier");
      });
      for (const s of Y) {
        const o = s.dataset.label ?? "",
          u = Number(s.dataset.pointIndex);
        s.setAttribute("aria-label", M && r.has(u) ? `${o}${n.frontierAriaSuffix}` : o);
      }
    },
    W = e.querySelector("[data-chart-frontier-toggle]"),
    at = (t) => {
      t !== M &&
        ((M = t),
        (e.dataset.frontierVisible = t ? "true" : "false"),
        W?.setAttribute("aria-checked", t ? "true" : "false"),
        X(E),
        t &&
          L &&
          !Q() &&
          L.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
            duration: 520,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          }));
    };
  (e.addEventListener(K, (t) => {
    at(t.detail);
  }),
    W?.addEventListener("click", () => {
      const t = e.closest("[data-figure-tabs]") ?? e,
        r = t.matches("[data-cost-score-chart]") ? [t] : [...t.querySelectorAll("[data-cost-score-chart]")],
        s = !M;
      for (const o of r) o.dispatchEvent(new CustomEvent(K, { detail: s }));
    }));
  const it = () => {
      if (!S || !L) return;
      const t = J(C, $, S, G);
      if (t.length === E.length && t.every((A, b) => A === E[b])) return;
      ((E = t), X(t), cancelAnimationFrame(F));
      const r = t.map(z),
        s = () => {
          ((N = r), L.setAttribute("d", U(r)), (F = 0));
        };
      if (Q()) {
        s();
        return;
      }
      const o = ut(N, r),
        u = performance.now(),
        m = (A) => {
          const b = Math.min(1, (A - u) / bt);
          if (b >= 1) {
            s();
            return;
          }
          const w = ht(b);
          ((N = o.map((B) => ft(B, w))), L.setAttribute("d", U(N)), (F = requestAnimationFrame(m)));
        };
      F = requestAnimationFrame(m);
    },
    ot = (t, r) => {
      const s = [
          { x: t + O, y: r - 9, anchor: "start" },
          { x: t + O, y: r + 20, anchor: "start" },
          { x: t - O, y: r - 9, anchor: "end" },
          { x: t - O, y: r + 20, anchor: "end" },
        ],
        o = st.map((u) => u.getBBox());
      for (const u of s) {
        (h.setAttribute("x", String(u.x)),
          h.setAttribute("y", String(u.y)),
          h.setAttribute("text-anchor", u.anchor));
        const m = h.getBBox();
        if (
          o.every(
            (b) =>
              m.x + m.width + R < b.x ||
              b.x + b.width < m.x - R ||
              m.y + m.height + R < b.y ||
              b.y + b.height < m.y - R,
          )
        )
          return;
      }
    },
    p = () => {
      ((I = -1),
        i.setAttribute("data-visible", "false"),
        a.setAttribute("data-visible", "false"),
        h.setAttribute("data-visible", "false"));
      for (const t of k) t.classList.remove("is-active");
      for (const t of v) t.removeAttribute("data-dimmed");
      for (const t of [...D, ...H]) t.classList.remove("is-muted");
    },
    P = window.matchMedia("(max-width: 600px)"),
    V = new Set(n.mobileSeriesIds),
    ct = new Map(n.points.map((t) => [t.seriesIndex, t.modelId])),
    T = () => {
      x.clear();
      for (const t of v) {
        const r = Number(t.dataset.seriesIndex);
        (((P.matches && V.size > 0 && !V.has(ct.get(r) ?? "")) || q.has(r)) && x.add(r),
          t.setAttribute("data-hidden", String(x.has(r))));
      }
      for (const t of e.querySelectorAll("[data-chart-legend]"))
        t.setAttribute("aria-pressed", String(!x.has(Number(t.dataset.chartLegend))));
      for (const t of Y) {
        const r = n.points[Number(t.dataset.pointIndex)];
        r && x.has(r.seriesIndex)
          ? (t.removeAttribute("tabindex"), t.setAttribute("aria-hidden", "true"))
          : ((t.tabIndex = 0), t.removeAttribute("aria-hidden"));
      }
      (p(), it());
    };
  V.size &&
    (T(),
    P.addEventListener("change", T),
    document.addEventListener("astro:before-swap", () => P.removeEventListener("change", T), { once: !0 }));
  const _ = (t) => {
    const r = n.points[t];
    if (!r || x.has(r.seriesIndex)) {
      p();
      return;
    }
    I = t;
    for (const s of k) s.classList.remove("is-active");
    k[t]?.classList.add("is-active");
    for (const s of v) {
      const o = Number(s.dataset.seriesIndex) === r.seriesIndex;
      s.setAttribute("data-dimmed", o ? "false" : "true");
    }
    (i.style.setProperty("--guide-color", r.color),
      f.setAttribute("x1", String(r.x)),
      f.setAttribute("x2", String(r.x)),
      f.setAttribute("y1", String(r.y)),
      l.setAttribute("y1", String(r.y)),
      l.setAttribute("y2", String(r.y)),
      l.setAttribute("x1", String(r.x)),
      i.setAttribute("data-visible", "true"),
      y.setAttribute("x", String(r.x)),
      (y.textContent = r.cost),
      g.setAttribute("y", String(r.y + 5)),
      (g.textContent = r.score),
      a.setAttribute("data-visible", "true"),
      r.label
        ? (h.style.setProperty("--mark-label-color", r.color),
          (h.textContent = r.label),
          ot(r.x, r.y),
          h.setAttribute("data-visible", "true"))
        : h.setAttribute("data-visible", "false"));
    for (const s of D) {
      const o = Number(s.getAttribute("x") ?? 0);
      s.classList.toggle("is-muted", Math.abs(o - r.x) < 26);
    }
    for (const s of H) {
      const o = Number(s.getAttribute("y") ?? 0);
      s.classList.toggle("is-muted", Math.abs(o - (r.y + 5)) < 14);
    }
  };
  e.addEventListener("chart-highlight-point", (t) => {
    const r = t.detail;
    if (!r) {
      p();
      return;
    }
    const s = n.points.findIndex((o) => o.modelId === r.modelId && (o.label ?? "") === r.thinking);
    s < 0 ? p() : s !== I && _(s);
  });
  const dt = (t, r) => {
    const s = d.getBoundingClientRect(),
      o = s.width / n.viewWidth,
      u = (t - s.left) / o,
      m = (r - s.top) / o;
    let A = -1,
      b = Number.POSITIVE_INFINITY;
    return (
      n.points.forEach((w, B) => {
        if (x.has(w.seriesIndex)) return;
        const j = (w.x - u) ** 2 + (w.y - m) ** 2;
        j < b && ((b = j), (A = B));
      }),
      A
    );
  };
  (c.addEventListener("pointermove", (t) => {
    const r = dt(t.clientX, t.clientY);
    r >= 0 && r !== I && _(r);
  }),
    c.addEventListener("pointerleave", p));
  for (const t of c.querySelectorAll("[data-point-index]"))
    t.addEventListener("focus", () => {
      const r = Number(t.dataset.pointIndex),
        s = n.points[r];
      !s || x.has(s.seriesIndex) || _(r);
    });
  (c.addEventListener("blur", p, !0),
    c.addEventListener("keydown", (t) => {
      const r = n.points
        .map((u, m) => ({ point: u, index: m }))
        .filter(({ point: u }) => !x.has(u.seriesIndex));
      if (r.length === 0) return;
      if (t.key === "Escape") {
        p();
        return;
      }
      const s = r.findIndex(({ index: u }) => u === I);
      let o = s;
      if (t.key === "ArrowRight" || t.key === "ArrowDown") o = s < 0 ? 0 : Math.min(r.length - 1, s + 1);
      else if (t.key === "ArrowLeft" || t.key === "ArrowUp") o = s < 0 ? r.length - 1 : Math.max(0, s - 1);
      else if (t.key === "Home") o = 0;
      else if (t.key === "End") o = r.length - 1;
      else return;
      (t.preventDefault(), _(r[o].index));
    }));
  for (const t of e.querySelectorAll("[data-chart-legend]"))
    t.addEventListener("click", () => {
      const r = Number(t.dataset.chartLegend);
      (q.has(r) ? q.delete(r) : !x.has(r) && x.size < v.length - 1 && q.add(r), T());
    });
}
function rt(e = document) {
  for (const n of e.querySelectorAll("[data-cost-score-chart]")) mt(n);
}
const yt = "[data-cost-score-chart]",
  gt = 0.25,
  pt = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1,
  At = (e) => {
    (delete e.dataset.revealed, e.offsetWidth, (e.dataset.revealed = "true"));
  },
  vt = (e) => {
    const n = e.closest('[role="tabpanel"]');
    if (!n) return;
    new MutationObserver(() => {
      n.hasAttribute("hidden") || (e.dataset.revealed === "true" && At(e));
    }).observe(n, { attributes: !0, attributeFilter: ["hidden"] });
  };
function nt(e = document) {
  e.querySelectorAll(yt).forEach((n) => {
    if (
      n.dataset.revealInit === "true" ||
      ((n.dataset.revealInit = "true"), pt() || typeof IntersectionObserver != "function")
    )
      return;
    n.dataset.animate = "true";
    const d = new IntersectionObserver(
      (c) => {
        c.forEach((i) => {
          i.isIntersecting && (d.unobserve(i.target), (i.target.dataset.revealed = "true"));
        });
      },
      { threshold: gt },
    );
    (d.observe(n), vt(n));
  });
}
rt();
nt();
document.addEventListener("astro:page-load", () => {
  (rt(), nt());
});
