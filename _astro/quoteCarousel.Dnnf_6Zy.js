const b = new Map();
let I = !1;
const L = 240,
  w = 8,
  R = "(prefers-reduced-motion: reduce)",
  z = (e, t) => Math.min(Math.max(e, 0), Math.max(t - 1, 0)),
  P = (e, t) => {
    const n = Number.parseInt(e.dataset.activeIndex ?? "0", 10);
    return z(Number.isFinite(n) ? n : 0, t);
  },
  N = (e) => (e === "forward" || e === "backward" ? e : void 0),
  Y = (e) => Array.from(e.querySelectorAll("[data-fade-swap-panel]")),
  q = (e) => {
    e.forEach((t) => {
      (t.getAnimations().forEach((n) => n.cancel()), (t.style.opacity = ""), (t.style.transform = ""));
    });
  },
  y = (e, t, n) => {
    ((e.dataset.activeIndex = String(n)),
      t.forEach((a, s) => {
        const r = s === n;
        ((a.dataset.active = String(r)),
          (a.hidden = !r),
          a.setAttribute("aria-hidden", String(!r)),
          (a.style.opacity = ""),
          (a.style.transform = ""));
      }));
  },
  U = (e, t, n, a, s, r, i) => {
    if (((e.dataset.activeIndex = String(a)), n === a)) {
      y(e, t, a);
      return;
    }
    if (
      (q(t),
      t.forEach((v, p) => {
        v.dataset.active = String(p === a);
      }),
      s.matches || e.dataset.fadeSwapAnimate === "false")
    ) {
      ((r.current += 1), y(e, t, a));
      return;
    }
    const o = t[n],
      d = t[a];
    if (!o || !d) {
      y(e, t, a);
      return;
    }
    const S = r.current + 1;
    ((r.current = S),
      t.forEach((v, p) => {
        const g = p === n || p === a;
        ((v.hidden = !g), v.setAttribute("aria-hidden", String(p !== a)));
      }),
      (o.hidden = !1),
      o.setAttribute("aria-hidden", "false"),
      (d.hidden = !1),
      d.setAttribute("aria-hidden", "false"));
    const l = e.dataset.fadeSwapAxis === "horizontal",
      f = e.dataset.fadeSwapTravel
        ? e.dataset.fadeSwapTravel === "right-to-left"
        : i
          ? i === "forward"
          : a > n,
      E = l
        ? f
          ? [
              { opacity: 1, transform: "translateX(0)" },
              { opacity: 0, transform: `translateX(-${w}px)` },
            ]
          : [
              { opacity: 1, transform: "translateX(0)" },
              { opacity: 0, transform: `translateX(${w}px)` },
            ]
        : [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: `translateY(-${w}px)` },
          ],
      h = l
        ? f
          ? [
              { opacity: 0, transform: `translateX(${w}px)` },
              { opacity: 1, transform: "translateX(0)" },
            ]
          : [
              { opacity: 0, transform: `translateX(-${w}px)` },
              { opacity: 1, transform: "translateX(0)" },
            ]
        : [
            { opacity: 0, transform: `translateY(${w}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
      m = o.animate(E, { duration: L, easing: "ease", fill: "forwards" }),
      u = d.animate(h, {
        duration: L,
        delay: e.dataset.fadeSwapMode === "sequential" ? L : 0,
        easing: "ease",
        fill: "both",
      });
    Promise.allSettled([m.finished, u.finished]).then(() => {
      r.current === S && (q(t), y(e, t, a));
    });
  },
  Q = (e) => {
    const t = Y(e);
    if (t.length < 2) return () => {};
    const n = window.matchMedia(R),
      a = { current: 0 };
    let s = P(e, t.length);
    ((e.dataset.enhanced = "true"), y(e, t, s));
    const r = new MutationObserver(() => {
      const i = P(e, t.length);
      if (i === s) return;
      const o = s;
      s = i;
      const d = N(e.dataset.fadeSwapDirection);
      (delete e.dataset.fadeSwapDirection, U(e, t, o, i, n, a, d));
    });
    return (
      r.observe(e, { attributes: !0, attributeFilter: ["data-active-index"] }),
      () => {
        (r.disconnect(), (a.current += 1), q(t), y(e, t, s));
      }
    );
  },
  X = () => {
    const e = Array.from(document.querySelectorAll("[data-fade-swap]")),
      t = new Set(e);
    (b.forEach((n, a) => {
      t.has(a) || (n(), b.delete(a));
    }),
      e.forEach((n) => {
        if (b.has(n)) return;
        const a = Q(n);
        b.set(n, a);
      }));
  },
  W = () => {
    I || ((I = !0), document.addEventListener("astro:page-load", X), X());
  },
  A = new Map();
let F = !1;
const V = 7e3,
  O = (e) => {
    if (e.dataset.stageHeight === "content") {
      e.style.height = "auto";
      return;
    }
    const t = Array.from(e.querySelectorAll("[data-fade-swap-panel]"));
    if (t.length === 0) return;
    const n = t.map((s) => s.hidden);
    ((e.style.height = "auto"), t.forEach((s) => (s.hidden = !1)));
    let a = 0;
    (t.forEach((s) => {
      a = Math.max(a, s.scrollHeight);
    }),
      t.forEach((s, r) => (s.hidden = n[r])),
      (e.style.height = `${a}px`));
  },
  K = (e, t) => Math.min(Math.max(e, 0), Math.max(t - 1, 0)),
  j = (e) => {
    const t = e.querySelector("[data-fade-swap]"),
      n = e.dataset.quoteControlsId ? document.getElementById(e.dataset.quoteControlsId) : null,
      a = n ?? e,
      s = a.querySelector("[data-quote-carousel-prev]"),
      r = a.querySelector("[data-quote-carousel-next]");
    return { fadeSwap: t, prevBtn: s, nextBtn: r, sharedControls: n };
  },
  G = (e) => e.querySelectorAll("[data-fade-swap-panel]").length,
  _ = (e, t, n, a, s) => {
    ((e.dataset.activeIndex = String(a)),
      s ? (t.dataset.fadeSwapDirection = s) : delete t.dataset.fadeSwapDirection,
      (t.dataset.activeIndex = String(a)),
      e.setAttribute("aria-label", `Customer quotes (${a + 1} of ${n})`));
  },
  J = (e) => {
    const { fadeSwap: t, prevBtn: n, nextBtn: a, sharedControls: s } = j(e);
    if (!t) return () => {};
    const r = G(t);
    if (r < 2) return () => {};
    let i = 0,
      o = null,
      d = e.matches(":hover"),
      S = !e.hasAttribute("data-autoplay-in-view");
    const l = e.querySelector(".quote-carousel__stage");
    ((e.dataset.enhanced = "true"), (e.tabIndex = 0), _(e, t, r, i), l && O(l));
    let f = null;
    const E = () => {
      (f !== null && window.clearTimeout(f),
        (f = window.setTimeout(() => {
          l && O(l);
        }, 150)));
    };
    window.addEventListener("resize", E);
    const h = () => {
        o !== null && (window.clearInterval(o), (o = null));
      },
      m = () => {
        (h(),
          e.dataset.autoplay !== "false" &&
            S &&
            (d ||
              e.matches(":focus-within") ||
              document.hidden ||
              r < 2 ||
              window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
              (o = window.setInterval(() => {
                u((i + 1) % r, !1, "forward");
              }, V))));
      },
      u = (c, D = !1, H) => {
        const $ = K(c, r);
        if ($ === i) {
          D && e.focus();
          return;
        }
        ((i = $), _(e, t, r, i, H), D && e.focus(), m());
      },
      v = () => {
        u(i - 1 < 0 ? r - 1 : i - 1, !1, "backward");
      },
      p = () => {
        u(i + 1 >= r ? 0 : i + 1, !1, "forward");
      };
    (n && (s || (n.disabled = !1), n.addEventListener("click", v)),
      a && (s || (a.disabled = !1), a.addEventListener("click", p)));
    const g = (c) => {
      if (c.key === "ArrowRight" || c.key === "ArrowDown") {
        (c.preventDefault(), u(i + 1 >= r ? 0 : i + 1, !0, "forward"));
        return;
      }
      if (c.key === "ArrowLeft" || c.key === "ArrowUp") {
        (c.preventDefault(), u(i - 1 < 0 ? r - 1 : i - 1, !0, "backward"));
        return;
      }
      if (c.key === "Home") {
        (c.preventDefault(), u(0, !0));
        return;
      }
      c.key === "End" && (c.preventDefault(), u(r - 1, !0));
    };
    e.addEventListener("keydown", g);
    const M = () => {
        ((d = !0), h());
      },
      k = () => {
        ((d = !1), m());
      };
    (e.addEventListener("pointerenter", M),
      e.addEventListener("pointerleave", k),
      e.addEventListener("focusin", h));
    const C = () => queueMicrotask(m);
    e.addEventListener("focusout", C);
    const T = () => {
      document.hidden ? h() : m();
    };
    document.addEventListener("visibilitychange", T);
    const x = e.hasAttribute("data-autoplay-in-view")
      ? new IntersectionObserver(
          ([c]) => {
            ((S = c.isIntersecting && c.intersectionRatio >= 0.25), m());
          },
          { threshold: [0, 0.25] },
        )
      : null;
    return (
      x?.observe(e),
      m(),
      () => {
        (h(),
          x?.disconnect(),
          f !== null && window.clearTimeout(f),
          window.removeEventListener("resize", E),
          n && n.removeEventListener("click", v),
          a && a.removeEventListener("click", p),
          e.removeEventListener("keydown", g),
          e.removeEventListener("pointerenter", M),
          e.removeEventListener("pointerleave", k),
          e.removeEventListener("focusin", h),
          e.removeEventListener("focusout", C),
          document.removeEventListener("visibilitychange", T),
          e.removeAttribute("tabindex"),
          e.setAttribute("aria-label", "Customer quotes"),
          l && (l.style.height = ""));
      }
    );
  },
  B = () => {
    const e = Array.from(document.querySelectorAll("[data-quote-carousel]")),
      t = new Set(e);
    (A.forEach((n, a) => {
      t.has(a) || (n(), A.delete(a));
    }),
      e.forEach((n) => {
        if (A.has(n)) return;
        const a = J(n);
        A.set(n, a);
      }));
  },
  Z = () => {
    F || ((F = !0), document.addEventListener("astro:page-load", B), B());
  };
export { Z as a, W as b };
