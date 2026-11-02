function j(e) {
  const i = Array.from(e.querySelectorAll("[data-logo-grid-cell]")),
    o = window.matchMedia("(prefers-reduced-motion: reduce)"),
    m = new AbortController(),
    { signal: r } = m;
  let v,
    w,
    h = [],
    p = !!e.querySelector("[data-logo-grid-cell]:hover") && window.matchMedia("(hover: hover)").matches,
    L = !1;
  const I = () => {
      (w !== void 0 && window.clearTimeout(w), (w = void 0));
    },
    b = (n) => {
      (h.forEach((s) => s.removeAttribute("data-logo-highlighted")),
        (h = n),
        h.forEach((s) => s.setAttribute("data-logo-highlighted", "")));
    },
    f = () => {
      (I(), b([]));
    },
    C = () => !r.aborted && !document.hidden && !o.matches && !p && !L && !e.contains(document.activeElement),
    A = () =>
      i.filter((n) => {
        const s = n.getBoundingClientRect();
        return s.width > 0 && s.height > 0 && s.bottom > 0 && s.top < window.innerHeight;
      }),
    S = (n) => {
      const s = Math.min(n.length, Math.random() < 0.5 ? 3 : 4),
        F = n.filter((u) => !h.includes(u)),
        E = F.length >= s ? F : [...n];
      for (let u = 0; u < s; u++) {
        const M = u + Math.floor(Math.random() * (E.length - u));
        [E[u], E[M]] = [E[M], E[u]];
      }
      (b(E.slice(0, s)),
        (w = window.setTimeout(() => {
          if (((w = void 0), !C())) {
            f();
            return;
          }
          const u = A();
          u.length ? S(u) : f();
        }, 2400)));
    },
    d = () => {
      r.aborted ||
        v !== void 0 ||
        (v = window.requestAnimationFrame(() => {
          if (((v = void 0), !C())) {
            f();
            return;
          }
          const n = A();
          if (!n.length) {
            f();
            return;
          }
          (w !== void 0 && h.every((s) => n.includes(s))) || (I(), S(n));
        }));
    };
  (e.addEventListener(
    "pointerover",
    (n) => {
      n.pointerType !== "touch" &&
        (!(n.target instanceof Element) || !n.target.closest("[data-logo-grid-cell]") || ((p = !0), f()));
    },
    { signal: r },
  ),
    e.addEventListener(
      "pointerout",
      (n) => {
        if (n.pointerType === "touch") return;
        const s =
          n.relatedTarget instanceof Element ? n.relatedTarget.closest("[data-logo-grid-cell]") : null;
        (s && e.contains(s)) || ((p = !1), d());
      },
      { signal: r },
    ),
    e.addEventListener(
      "pointerdown",
      () => {
        ((L = !0), f());
      },
      { signal: r },
    ));
  const T = () => {
    L && ((L = !1), d());
  };
  (document.addEventListener("pointerup", T, { signal: r }),
    document.addEventListener("pointercancel", T, { signal: r }),
    e.addEventListener("focusin", f, { signal: r }),
    e.addEventListener("focusout", () => queueMicrotask(d), { signal: r }),
    window.addEventListener("scroll", d, { passive: !0, signal: r }),
    window.addEventListener("resize", d, { passive: !0, signal: r }));
  const N = new ResizeObserver(d);
  return (
    N.observe(e),
    document.addEventListener("visibilitychange", d, { signal: r }),
    o.addEventListener("change", d, { signal: r }),
    d(),
    () => {
      (m.abort(), N.disconnect(), v !== void 0 && window.cancelAnimationFrame(v), I(), b([]));
    }
  );
}
const O = new Map();
let U = !1;
const Q = "(prefers-reduced-motion: reduce)",
  J = 5e3,
  K = 2800,
  V = 220,
  X = 5,
  _ = (e) =>
    Array.from(e.querySelectorAll("[data-logo-grid-cell]")).filter(
      (l) => window.getComputedStyle(l).display !== "none",
    ),
  k = (e) => {
    const l = _(e),
      i = e.querySelector("[data-logo-grid-cells]"),
      o = i ? window.getComputedStyle(i).gridTemplateColumns.trim() : "",
      m = o ? o.split(/\s+/).length : 1;
    return Math.min(m, Math.max(l.length - 1, 0));
  },
  x = (e, l, i) => {
    const o = i.get(l);
    if (!o) return null;
    const m = o.content.cloneNode(!0),
      r = m.firstElementChild;
    return (e.replaceChildren(m), (e.dataset.logoId = l), r instanceof HTMLElement ? r : null);
  },
  Z = (e) => {
    const l = new Map(
        Array.from(e.querySelectorAll("[data-logo-grid-template]"))
          .map((t) => [t.dataset.logoGridTemplate, t])
          .filter((t) => !!t[0]),
      ),
      i = Array.from(l.keys());
    if (i.length === 0) return () => {};
    const o = window.matchMedia(Q),
      m = Number.parseInt(e.dataset.initialSwapDelay ?? "", 10),
      r = Number.isFinite(m) ? Math.max(m, 1e3) : J,
      v = Number.parseInt(e.dataset.swapInterval ?? "", 10),
      w = Number.isFinite(v) ? Math.max(v, 1e3) : K;
    let h = null,
      p = null,
      L = 0,
      I = k(e),
      b = !1,
      f = !1,
      C = !1,
      A = !1,
      S = !1;
    const d = () => {
        h !== null && (window.clearTimeout(h), (h = null));
      },
      T = () => {
        const t = new Set();
        _(e).forEach((c) => {
          const a = c.dataset.logoId;
          if (a && l.has(a) && !t.has(a)) {
            t.add(a);
            return;
          }
          const g = i.find((y) => !t.has(y));
          g && (x(c, g, l), t.add(g));
        });
      },
      N = () => {
        const t = _(e);
        return !S && b && !document.hidden && !f && !C && !o.matches && i.length > t.length;
      },
      n = () => {
        (d(), N() && (h = window.setTimeout(u, A ? w : r)));
      },
      s = (t) => {
        for (let c = 0; c < i.length; c += 1) {
          const a = i[L % i.length];
          if (((L += 1), !t.has(a))) return a;
        }
        return null;
      },
      F = (t) => {
        for (let c = 0; c < t.length; c += 1) {
          const a = (I + c) % t.length,
            g = t[a];
          if (!g.contains(document.activeElement)) return ((I = (a + X) % t.length), g);
        }
        return null;
      },
      E = async (t, c) => {
        const a = t.firstElementChild;
        if (((t.dataset.logoId = c), !(a instanceof HTMLElement) || o.matches)) {
          x(t, c, l);
          return;
        }
        const g = Number.parseFloat(window.getComputedStyle(a).opacity),
          y = Number.isFinite(g) ? g : 0.42;
        if (
          (await a
            .animate(
              [
                { opacity: y, transform: "translateY(0)" },
                { opacity: 0, transform: "translateY(-6px)" },
              ],
              { duration: V, easing: "ease", fill: "forwards" },
            )
            .finished.catch(() => {}),
          S || !t.isConnected)
        )
          return;
        const R = x(t, c, l);
        if (R) {
          const Y = Number.parseFloat(window.getComputedStyle(R).opacity);
          R.animate(
            [
              { opacity: 0, transform: "translateY(6px)" },
              { opacity: Number.isFinite(Y) ? Y : 0.42, transform: "translateY(0)" },
            ],
            { duration: V, easing: "ease" },
          );
        }
      };
    function u() {
      h = null;
      const t = _(e),
        c = new Set(t.map((y) => y.dataset.logoId).filter((y) => !!y)),
        a = s(c),
        g = F(t);
      (a &&
        g &&
        (E(g, a),
        (A = !0),
        (e.dataset.swapCount = String(Number.parseInt(e.dataset.swapCount ?? "0", 10) + 1))),
        n());
    }
    const M = () => {
        ((f = !0), d());
      },
      H = () => {
        ((f = !1), n());
      },
      q = () => {
        ((C = !0), d());
      },
      D = () => {
        window.setTimeout(() => {
          ((C = e.contains(document.activeElement)), n());
        }, 0);
      },
      G = () => n(),
      P = () => n(),
      z = new IntersectionObserver(
        ([t]) => {
          ((b = !!t?.isIntersecting), n());
        },
        { threshold: 0.1 },
      ),
      B = new ResizeObserver(() => {
        (p !== null && window.cancelAnimationFrame(p),
          (p = window.requestAnimationFrame(() => {
            ((p = null), T(), A || (I = k(e)), n());
          })));
      });
    return (
      (e.dataset.enhanced = "true"),
      T(),
      z.observe(e),
      B.observe(e),
      e.addEventListener("pointerenter", M),
      e.addEventListener("pointerleave", H),
      e.addEventListener("focusin", q),
      e.addEventListener("focusout", D),
      document.addEventListener("visibilitychange", G),
      o.addEventListener("change", P),
      () => {
        ((S = !0),
          d(),
          p !== null && window.cancelAnimationFrame(p),
          z.disconnect(),
          B.disconnect(),
          e.getAnimations({ subtree: !0 }).forEach((t) => t.cancel()),
          e.removeEventListener("pointerenter", M),
          e.removeEventListener("pointerleave", H),
          e.removeEventListener("focusin", q),
          e.removeEventListener("focusout", D),
          document.removeEventListener("visibilitychange", G),
          o.removeEventListener("change", P),
          (e.dataset.enhanced = "false"));
      }
    );
  },
  W = () => {
    const e = Array.from(
        document.querySelectorAll("[data-customer-logo-grid], [data-logo-random-highlight]"),
      ),
      l = new Set(e);
    (O.forEach((i, o) => {
      l.has(o) || (i(), O.delete(o));
    }),
      e.forEach((i) => {
        if (O.has(i)) return;
        const o = i.hasAttribute("data-customer-logo-grid") ? Z(i) : () => {},
          m = i.hasAttribute("data-logo-random-highlight") ? j(i) : () => {};
        O.set(i, () => {
          (o(), m());
        });
      }));
  },
  $ = () => {
    U || ((U = !0), document.addEventListener("astro:page-load", W), W());
  };
$();
