const pe = "__counterswarmSiteHeader",
  V = (t) => {
    if (t)
      try {
        t.focus({ preventScroll: !0 });
      } catch {
        t.focus();
      }
  },
  ke = () => {
    const t = document.querySelector("[data-site-header]");
    if (!(t instanceof HTMLElement)) return () => {};
    const h = t.querySelector("[data-mobile-nav-toggle]"),
      K = t.querySelector("[data-mobile-nav-toggle-label]"),
      R = t.querySelector("[data-mobile-nav-overlay]");
    if (!(h instanceof HTMLButtonElement) || !(K instanceof HTMLElement) || !(R instanceof HTMLElement))
      return () => {};
    const Y = Array.from(document.querySelectorAll("[data-header-theme]")),
      z = Array.from(t.querySelectorAll("[data-mobile-nav-close]")),
      _ = Array.from(t.querySelectorAll("[data-header-dropdown-trigger]")).filter(
        (e) => e instanceof HTMLButtonElement,
      ),
      ge = Array.from(t.querySelectorAll("[data-header-dropdown-panel]")).filter(
        (e) => e instanceof HTMLElement,
      ),
      C = Array.from(t.querySelectorAll("[data-mobile-dropdown-toggle]")).filter(
        (e) => e instanceof HTMLButtonElement,
      ),
      N = Array.from(t.querySelectorAll("[data-mobile-dropdown-panel]")).filter(
        (e) => e instanceof HTMLElement,
      ),
      W = R.querySelector(".site-header__mobile-link, .site-header__mobile-group-toggle"),
      he = document.documentElement;
    let T = 0,
      D = !1,
      L = 0;
    const U = [],
      G = [],
      $ = [],
      we = (e) => (e === "" || e === "/" ? "/" : e.endsWith("/") ? e.slice(0, -1) || "/" : e),
      j = (e) => we(e) === "/",
      u = () => window.innerWidth > 960,
      M = () => t.dataset.mobileMenuOpen === "true",
      A = () => t.dataset.activeDropdown || "",
      J = () => {
        t.dataset.pageScrolled = window.scrollY > 0 ? "true" : "false";
      },
      Q = (e) => {
        if ((J(), t.dataset.stickyRequestDemoMode === "hero-anchor" && u() && typeof e == "boolean")) {
          t.dataset.scrolled = e ? "true" : "false";
          return;
        }
        t.dataset.scrolled = window.scrollY > 0 ? "true" : "false";
      },
      v = () => {
        T !== 0 && (window.clearTimeout(T), (T = 0));
      },
      B = (e) => {
        ((t.dataset.mobileMenuOpen = e ? "true" : "false"),
          h.setAttribute("aria-expanded", e ? "true" : "false"),
          (K.textContent = e ? "Close navigation" : "Open navigation"),
          (R.hidden = !e),
          he.toggleAttribute("data-mobile-nav-open", e),
          document.body.toggleAttribute("data-mobile-nav-open", e));
      },
      O = () => {
        for (const e of C) e.setAttribute("aria-expanded", "false");
        for (const e of N) e.hidden = !0;
      },
      X = (e, o) => {
        for (const n of C) {
          const r = n.dataset.mobileDropdownToggle === e;
          n.setAttribute("aria-expanded", r && o ? "true" : "false");
        }
        for (const n of N) {
          const r = n.dataset.mobileDropdownPanel === e;
          n.hidden = !(r && o);
        }
      },
      x = (e) => {
        const o = !!e;
        ((t.dataset.desktopDropdownOpen = o ? "true" : "false"), (t.dataset.activeDropdown = e));
        for (const n of _) {
          const r = n.dataset.headerDropdownTrigger === e;
          n.setAttribute("aria-expanded", r ? "true" : "false");
        }
        for (const n of ge) n.hidden = n.dataset.headerDropdownPanel !== e;
      };
    let f = null,
      w = null,
      c = null,
      m = null,
      S = !1,
      E = !1,
      q = null,
      I = !1;
    const P = (e) => {
        const o = Math.ceil(t.getBoundingClientRect().height),
          n = e.getBoundingClientRect();
        return n.bottom > o && n.top < window.innerHeight;
      },
      Z = (e, o = {}) => {
        const n =
          o.scope === "desktop" ? ".site-header__request-demo--desktop" : ".site-header__request-demo";
        for (const r of t.querySelectorAll(n))
          e
            ? (r.setAttribute("aria-hidden", "true"), r.setAttribute("tabindex", "-1"))
            : (r.removeAttribute("aria-hidden"), r.removeAttribute("tabindex"));
      },
      be = () => {
        ((q = null), (I = !1), delete t.dataset.stickyRequestDemoTransition);
      },
      ee = (e, o = {}) => {
        (o.animate
          ? ((I = !0), (t.dataset.stickyRequestDemoTransition = "true"))
          : I || delete t.dataset.stickyRequestDemoTransition,
          (q = e),
          (t.dataset.stickyRequestDemoVisible = e ? "true" : "false"),
          Z(!e, { scope: o.scope }));
      },
      te = (e, o = {}) => {
        ee(e, { scope: o.scope });
      },
      oe = (e, o = {}) => {
        ee(e, { animate: q !== null && q !== e, scope: o.scope });
      },
      H = (e = {}) => {
        if ((J(), t.dataset.stickyRequestDemoMode !== "tracked")) {
          t.dataset.scrolled = window.scrollY > 0 ? "true" : "false";
          return;
        }
        const o = c instanceof HTMLElement,
          n = m instanceof HTMLElement,
          r = (!o || !S) && (!n || !E);
        e.allowTransition === !1 ? te(r, { scope: "desktop" }) : oe(r, { scope: "desktop" });
        let s;
        (E ? (s = !1) : o ? (s = r) : (s = window.scrollY > 0), (t.dataset.scrolled = s ? "true" : "false"));
      },
      ve = () => {
        const e = t.getBoundingClientRect(),
          o = Math.min(window.innerHeight - 1, Math.max(0, e.bottom + 1)),
          n = Y[0];
        let r = n?.dataset.headerTheme || "light",
          s = n?.dataset.headerSurface || (r === "dark" ? "dark" : "page");
        for (const g of Y) {
          const y = g.getBoundingClientRect();
          y.top <= o &&
            y.bottom > o &&
            ((r = g.dataset.headerTheme || r),
            (s = g.dataset.headerSurface || (r === "dark" ? "dark" : "page")));
        }
        (t.dataset.desktopDropdownOpen === "true" && ((r = "light"), (s = "page")),
          (t.dataset.theme = r),
          (t.dataset.surface = s),
          t.dataset.stickyRequestDemoMode === "tracked" ? H() : Q(),
          (D = !1),
          (L = 0));
      },
      l = () => {
        D || ((D = !0), (L = window.requestAnimationFrame(ve)));
      },
      a = ({ restoreFocus: e = !1 } = {}) => {
        v();
        const o = A();
        if (!o) return;
        const n = _.find((r) => r.dataset.headerDropdownTrigger === o);
        (x(""), l(), e && n instanceof HTMLElement && window.requestAnimationFrame(() => V(n)));
      },
      F = (e) => {
        u() && (v(), x(e), l());
      },
      Ee = () => {
        (v(),
          !(!u() || !A()) &&
            (T = window.setTimeout(() => {
              a();
            }, 120)));
      },
      p = ({ restoreFocus: e = !1 } = {}) => {
        M() && (O(), B(!1), e && window.requestAnimationFrame(() => V(h)));
      },
      ye = () => {
        u() || M() || (B(!0), window.requestAnimationFrame(() => V(W instanceof HTMLElement ? W : h)));
      },
      ne = () => {
        if (M()) {
          p({ restoreFocus: !0 });
          return;
        }
        ye();
      },
      re = (e) => {
        if (e.key === "Escape") {
          if (M()) {
            (e.preventDefault(), p({ restoreFocus: !0 }));
            return;
          }
          A() && (e.preventDefault(), a({ restoreFocus: !0 }));
        }
      },
      se = () => {
        (u() ? (p(), O()) : a(), l(), me());
      },
      ae = () => {
        (a(), p());
      },
      ie = (e) => {
        e.target instanceof Node && (t.contains(e.target) || (a(), p()));
      },
      ce = () => {
        v();
      },
      le = () => {
        Ee();
      },
      de = (e) => {
        const o = e.target;
        if (!(o instanceof HTMLElement) || !u()) return;
        const n = o.closest("[data-header-dropdown-trigger]");
        if (n instanceof HTMLButtonElement) {
          F(n.dataset.headerDropdownTrigger || "");
          return;
        }
        (o.closest(".site-header__desktop-nav") || o.closest(".site-header__desktop-actions")) && a();
      },
      ue = (e) => {
        if (!u()) return;
        const o = e.relatedTarget;
        (o instanceof Node && t.contains(o)) || a();
      },
      fe = (e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const o = e.currentTarget;
        if (o instanceof HTMLAnchorElement)
          try {
            const n = new URL(o.href);
            if (n.origin !== window.location.origin || !j(n.pathname) || !j(window.location.pathname)) return;
            (e.preventDefault(), a(), p());
            const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            (window.scrollTo({ top: 0, behavior: r ? "auto" : "smooth" }), l());
          } catch {}
      },
      me = () => {
        (f?.disconnect(), w?.disconnect(), (f = null), (w = null));
        const e = () => {
            (delete t.dataset.stickyRequestDemoMode,
              delete t.dataset.stickyRequestDemoVisible,
              be(),
              (c = null),
              (m = null),
              (S = !1),
              (E = !1),
              Z(!1));
          },
          o = document.querySelector("[data-hero-demo-anchor]"),
          n = document.querySelector("[data-site-footer-demo-anchor]");
        if (
          ((c = o instanceof HTMLElement ? o : null), (m = n instanceof HTMLElement ? n : null), !c && !m)
        ) {
          (e(), l());
          return;
        }
        const s = {
          root: null,
          rootMargin: `-${Math.ceil(t.getBoundingClientRect().height)}px 0px 0px 0px`,
          threshold: 0,
        };
        if (m) {
          ((t.dataset.stickyRequestDemoMode = "tracked"),
            (S = c ? P(c) : !1),
            (E = P(m)),
            c &&
              ((f = new IntersectionObserver((d) => {
                const i = d[0];
                i && ((S = i.isIntersecting), H());
              }, s)),
              f.observe(c)),
            (w = new IntersectionObserver((d) => {
              const i = d[0];
              i && ((E = i.isIntersecting), H());
            }, s)),
            w.observe(m),
            H({ allowTransition: !1 }));
          return;
        }
        const g = c;
        if (!g) {
          (e(), l());
          return;
        }
        t.dataset.stickyRequestDemoMode = "hero-anchor";
        const y = (d, i = {}) => {
          (i.allowTransition === !1 ? te(d, { scope: "desktop" }) : oe(d, { scope: "desktop" }), Q(d));
        };
        (y(!P(g), { allowTransition: !1 }),
          (f = new IntersectionObserver((d) => {
            const i = d[0];
            i && y(!i.isIntersecting);
          }, s)),
          f.observe(g));
      };
    (me(),
      B(!1),
      O(),
      x(""),
      l(),
      h.addEventListener("click", ne),
      window.addEventListener("scroll", l, { passive: !0 }),
      window.addEventListener("resize", se),
      document.addEventListener("keydown", re),
      document.addEventListener("pointerdown", ie),
      t.addEventListener("pointerenter", ce),
      t.addEventListener("pointerleave", le),
      t.addEventListener("focusin", de),
      t.addEventListener("focusout", ue));
    for (const e of z) e.addEventListener("click", ae);
    for (const e of _) {
      const o = () => {
          const r = e.dataset.headerDropdownTrigger || "";
          if (A() === r) {
            a({ restoreFocus: !0 });
            return;
          }
          F(r);
        },
        n = () => {
          u() && F(e.dataset.headerDropdownTrigger || "");
        };
      (e.addEventListener("click", o),
        e.addEventListener("pointerenter", n),
        U.push(() => {
          (e.removeEventListener("click", o), e.removeEventListener("pointerenter", n));
        }));
    }
    for (const e of C) {
      const o = () => {
        const n = e.dataset.mobileDropdownToggle || "";
        if (e.getAttribute("aria-expanded") === "true") {
          X(n, !1);
          return;
        }
        X(n, !0);
      };
      (e.addEventListener("click", o),
        G.push(() => {
          e.removeEventListener("click", o);
        }));
    }
    for (const e of t.querySelectorAll("a.site-header__brand"))
      e instanceof HTMLAnchorElement &&
        (e.addEventListener("click", fe),
        $.push(() => {
          e.removeEventListener("click", fe);
        }));
    return () => {
      (f?.disconnect(),
        w?.disconnect(),
        (f = null),
        (w = null),
        p(),
        a(),
        v(),
        L !== 0 && window.cancelAnimationFrame(L),
        (D = !1),
        h.removeEventListener("click", ne),
        window.removeEventListener("scroll", l),
        window.removeEventListener("resize", se),
        document.removeEventListener("keydown", re),
        document.removeEventListener("pointerdown", ie),
        t.removeEventListener("pointerenter", ce),
        t.removeEventListener("pointerleave", le),
        t.removeEventListener("focusin", de),
        t.removeEventListener("focusout", ue));
      for (const e of z) e.removeEventListener("click", ae);
      for (const e of U) e();
      for (const e of G) e();
      for (const e of $) e();
    };
  },
  k = window[pe];
k &&
  typeof k.cleanup == "function" &&
  (typeof k.refresh == "function" && document.removeEventListener("astro:page-load", k.refresh), k.cleanup());
const b = { cleanup: () => {}, refresh: () => {} };
b.refresh = () => {
  (b.cleanup(), (b.cleanup = ke()));
};
window[pe] = b;
b.refresh();
document.addEventListener("astro:page-load", b.refresh);
