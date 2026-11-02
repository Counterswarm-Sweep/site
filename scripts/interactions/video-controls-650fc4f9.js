for (const t of document.querySelectorAll(".video-embed")) {
  const e = t.querySelector("video"),
    o = t.querySelector(".video-embed__play");
  !e ||
    !o ||
    (o.addEventListener("click", () => {
      ((e.controls = !0), t.classList.add("is-playing"), e.play());
    }),
    e.addEventListener("pause", () => {
      t.classList.remove("is-playing");
    }),
    e.addEventListener("ended", () => {
      ((e.controls = !1), (e.currentTime = 0), t.classList.remove("is-playing"));
    }));
}
