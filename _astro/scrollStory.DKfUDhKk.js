const T = new Map();
let O = !1;
const H = "(min-width: 960px)",
  L = "[data-scroll-story-step]",
  k = "[data-scroll-story-body]",
  C = "[data-scroll-story-panel]",
  P = "[data-scroll-story-button]",
  B = "[data-scroll-story-track]",
  V = "[data-scroll-story-stage]",
  U = "[data-scroll-story-panel-stack]",
  I = "[data-scroll-story-inline-panel]",
  Y = "video[data-scroll-story-video-src]",
  K = "240px 0px",
  G = 1.35,
  _ = (e, t, s) => Math.min(s, Math.max(t, e)),
  f = (e) =>
    e.getClientRects().length > 0 &&
    getComputedStyle(e).display !== "none" &&
    getComputedStyle(e).visibility !== "hidden",
  q = (e) => {
    const t = e.dataset.scrollStoryVideoSrc;
    t && (e.getAttribute("src") !== t && (e.setAttribute("src", t), e.load()), e.play().catch(() => {}));
  },
  x = (e) => {
    e.pause();
  },
  w = (e, t) => {
    e.querySelectorAll(Y).forEach((s) => {
      const r = s.closest(C);
      if (r) {
        r.dataset.active === "true" && f(r) ? q(s) : x(s);
        return;
      }
      const a = s.closest(I);
      a && (t.has(a) && f(a) ? q(s) : x(s));
    });
  },
  W = (e, t) => {
    const s = Array.from(e.querySelectorAll(I));
    if (s.length === 0) return () => {};
    const r = new IntersectionObserver(
      (a) => {
        (a.forEach((n) => {
          n.target instanceof HTMLElement && (n.isIntersecting ? t.add(n.target) : t.delete(n.target));
        }),
          w(e, t));
      },
      { rootMargin: K, threshold: 0.2 },
    );
    return (
      s.forEach((a) => r.observe(a)),
      () => {
        (r.disconnect(), t.clear());
      }
    );
  },
  $ = (e, t) => {
    if ("addEventListener" in e)
      return (e.addEventListener("change", t), () => e.removeEventListener("change", t));
    const s = e;
    return (s.addListener?.(t), () => s.removeListener?.(t));
  },
  Q = (e) => {
    const t = Number.parseFloat(getComputedStyle(e).top);
    return Number.isFinite(t) ? t : 0;
  },
  j = (e, t, s, r, a) => {
    if (!f(t) || !f(s) || !f(r)) return;
    const n = s.getBoundingClientRect().height,
      o = (r.getBoundingClientRect().height || n) * G * Math.max(a, 1),
      i = Math.max(n + o, n + 1);
    (e.style.setProperty("--ss2-stage-height", `${Math.ceil(n)}px`),
      (t.style.minHeight = `${Math.ceil(i)}px`));
  },
  J = (e, t) => {
    const s = e.getBoundingClientRect(),
      r = t.getBoundingClientRect(),
      a = Math.max(s.height - r.height, 1),
      n = (r.top - s.top) / a;
    return _(n, 0, 1);
  },
  X = (e, t) => (t <= 1 ? 0 : Math.min(t - 1, Math.floor(e * t))),
  Z = (e, t, s) => {
    if (s <= 0) return 0;
    const r = 1 / s,
      a = r * t,
      n = (e - a) / r;
    return _(n, 0, 1);
  },
  ee = (e, t, s, r) => {
    const a = e.getBoundingClientRect(),
      n = t.getBoundingClientRect(),
      c = Math.max(a.height - n.height, 0),
      o = Q(t),
      i = window.scrollY + a.top;
    if (r <= 1 || c === 0) return Math.round(i - o);
    const g = c / r,
      E = Math.min(g * s + g / 2, c);
    return Math.round(i - o + E);
  },
  A = (e) => {
    const t = e.querySelectorAll(L),
      s = e.querySelectorAll(k),
      r = e.querySelectorAll(C),
      a = e.querySelectorAll(P);
    ((e.dataset.enhanced = "false"),
      (e.dataset.activeIndex = "0"),
      t.forEach((n) => {
        ((n.dataset.active = "true"), n.style.removeProperty("--ss2-step-progress"));
      }),
      s.forEach((n) => {
        n.dataset.active = "true";
      }),
      r.forEach((n, c) => {
        const o = c === 0;
        ((n.dataset.active = String(o)),
          n.setAttribute("aria-hidden", String(!o)),
          o ? n.removeAttribute("inert") : n.setAttribute("inert", ""));
      }),
      a.forEach((n) => {
        ((n.disabled = !0), n.setAttribute("aria-expanded", "true"));
      }));
  },
  te = (e, t) => {
    const s = e.querySelectorAll(L),
      r = s.length;
    s.forEach((a, n) => {
      a.style.setProperty("--ss2-step-progress", Z(t, n, r).toFixed(4));
    });
  },
  se = (e, t) => {
    const s = e.querySelectorAll(L),
      r = e.querySelectorAll(k),
      a = e.querySelectorAll(C),
      n = e.querySelectorAll(P);
    ((e.dataset.activeIndex = String(t)),
      s.forEach((c, o) => {
        c.dataset.active = String(o === t);
      }),
      r.forEach((c, o) => {
        c.dataset.active = String(o === t);
      }),
      a.forEach((c, o) => {
        const i = o === t;
        ((c.dataset.active = String(i)),
          c.setAttribute("aria-hidden", String(!i)),
          i ? c.removeAttribute("inert") : c.setAttribute("inert", ""));
      }),
      n.forEach((c, o) => {
        c.setAttribute("aria-expanded", String(o === t));
      }));
  },
  ne = (e) => {
    const t = e.querySelector(B),
      s = e.querySelector(V),
      r = e.querySelector(U);
    if (!t || !s || !r) return (A(e), () => A(e));
    const a = new Set(),
      n = W(e, a),
      c = Array.from(e.querySelectorAll(L)),
      o = Array.from(e.querySelectorAll(P)),
      i = window.matchMedia(H),
      g = e.hasAttribute("data-scroll-story-mobile");
    let E = 0,
      p = 0,
      b = !0;
    const z = () => {
        if (!i.matches && !g) {
          ((E = 0), e.style.removeProperty("--ss2-stage-height"), (t.style.minHeight = ""), A(e), w(e, a));
          return;
        }
        const l = e.dataset.enhanced === "true";
        ((e.dataset.enhanced = "true"),
          o.forEach((R) => {
            R.disabled = !1;
          }));
        const v = J(t, s);
        te(e, v);
        const u = X(v, c.length);
        ((!l || u !== E || e.dataset.activeIndex !== String(u)) && ((E = u), se(e, u), y(!0)), w(e, a));
      },
      y = (l = !1) => {
        (l && (b = !0),
          p === 0 &&
            (p = window.requestAnimationFrame(() => {
              ((p = 0), b && ((b = !1), j(e, t, s, r, c.length)), z());
            })));
      },
      M = () => {
        y();
      },
      d = () => {
        y(!0);
      },
      D = o.map((l, v) => {
        const u = () => {
          if (!i.matches && !g) return;
          const R = ee(t, s, v, c.length);
          window.scrollTo({ top: R, behavior: "smooth" });
        };
        return (l.addEventListener("click", u), () => l.removeEventListener("click", u));
      }),
      F = $(i, d);
    let S = null;
    "ResizeObserver" in window &&
      ((S = new ResizeObserver(() => {
        y(!0);
      })),
      S.observe(e),
      S.observe(s),
      S.observe(r));
    const m = window.visualViewport;
    return (
      m?.addEventListener("resize", d),
      m?.addEventListener("scroll", d),
      window.addEventListener("scroll", M, { passive: !0 }),
      window.addEventListener("resize", d),
      y(!0),
      () => {
        (p !== 0 && window.cancelAnimationFrame(p),
          window.removeEventListener("scroll", M),
          window.removeEventListener("resize", d),
          m?.removeEventListener("resize", d),
          m?.removeEventListener("scroll", d),
          S?.disconnect(),
          F(),
          D.forEach((l) => l()),
          n(),
          e.style.removeProperty("--ss2-stage-height"),
          (t.style.minHeight = ""),
          A(e),
          w(e, a));
      }
    );
  },
  N = () => {
    (T.forEach((e) => e()), T.clear());
  },
  h = () => {
    const e = Array.from(document.querySelectorAll("[data-scroll-story]"));
    (N(),
      e.forEach((t) => {
        ((t.dataset.initialized = "false"), T.set(t, ne(t)));
      }),
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          e.forEach((t) => {
            t.isConnected && (t.dataset.initialized = "true");
          });
        });
      }));
  },
  re = () => {
    if (O) {
      h();
      return;
    }
    ((O = !0),
      h(),
      document.addEventListener("astro:before-swap", N),
      document.addEventListener("astro:page-load", h),
      window.addEventListener("pageshow", h),
      window.addEventListener("load", h, { once: !0 }),
      document.fonts && document.fonts.ready.then(h).catch(() => {}));
  };
export { re as b };
