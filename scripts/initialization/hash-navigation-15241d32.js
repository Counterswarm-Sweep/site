(() => {
  const initKey = "__counterswarmHashScrollSyncInit";
  if (window[initKey]) return;
  window[initKey] = true;

  const extraOffset = 16;

  const getHashTarget = () => {
    const rawHash = window.location.hash.slice(1);
    if (!rawHash) return null;

    const id = decodeURIComponent(rawHash);
    return document.getElementById(id);
  };

  const syncHashScroll = (attempt = 0) => {
    const target = getHashTarget();

    if (!(target instanceof HTMLElement)) {
      if (attempt < 6) {
        window.setTimeout(() => syncHashScroll(attempt + 1), 120);
      }

      return;
    }

    const header = document.querySelector("[data-site-header]");
    const headerHeight =
      header instanceof HTMLElement
        ? Math.ceil(header.getBoundingClientRect().height)
        : 0;
    const desiredTop = headerHeight + extraOffset;
    const currentTop = target.getBoundingClientRect().top;
    const nextTop = Math.max(0, window.scrollY + currentTop - desiredTop);

    if (Math.abs(currentTop - desiredTop) <= 2) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion && attempt === 0) {
      window.scrollTo({
        top: nextTop,
        behavior: "smooth",
      });

      window.setTimeout(() => syncHashScroll(attempt + 1), 420);
      return;
    }

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({
      top: nextTop,
      behavior: "auto",
    });
    window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior;
    });

    if (attempt < 3) {
      window.setTimeout(() => syncHashScroll(attempt + 1), 120);
    }
  };

  const scheduleHashScrollSync = () => {
    if (!window.location.hash) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        syncHashScroll();
      });
    });
  };

  if (document.readyState === "complete") {
    scheduleHashScrollSync();
  } else {
    window.addEventListener("load", scheduleHashScrollSync, {
      once: true,
    });
  }

  document.addEventListener("astro:page-load", scheduleHashScrollSync);
})();
