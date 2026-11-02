(() => {
  const bindBookDemoHomeLinks = () => {
    for (const link of document.querySelectorAll(
      "[data-book-demo-home-link]",
    )) {
      if (!(link instanceof HTMLAnchorElement)) continue;
      if (link.dataset.bookDemoHomeLinkBound === "true") continue;

      link.dataset.bookDemoHomeLinkBound = "true";
      link.addEventListener("click", (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        event.preventDefault();
        window.location.assign("/");
      });
    }
  };

  bindBookDemoHomeLinks();
  document.addEventListener("astro:page-load", bindBookDemoHomeLinks);
})();

document.documentElement.dataset.bookDemoState = 'form';
