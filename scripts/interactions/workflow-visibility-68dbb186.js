const s = document.querySelectorAll("[data-workflow-diagram]"),
  i = new IntersectionObserver(
    (t) => {
      for (const e of t)
        (e.target.classList.toggle("is-visible", e.isIntersecting && e.intersectionRatio >= 0.15),
          e.isIntersecting && e.intersectionRatio >= 0.15 && e.target.classList.add("is-inview"));
    },
    { threshold: 0.15 },
  );
s.forEach((t) => i.observe(t));
