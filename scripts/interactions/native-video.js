// Same controls and viewport behavior as the source player, with local media.
export function mountNativeVideo(host, video) {
  const play = host.querySelector('[data-vimeo-play]');
  const mute = host.querySelector('[data-vimeo-mute]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let manuallyPaused = false;
  const sync = () => {
    if (play) {
      play.dataset.state = video.paused ? 'paused' : 'playing';
      play.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video');
    }
    if (mute) {
      mute.hidden = video.hasAttribute('data-audio-pending');
      mute.dataset.state = video.muted ? 'muted' : 'unmuted';
      mute.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
    }
  };
  const update = () => {
    if (visible && !document.hidden && !motion.matches && !manuallyPaused) {
      video.play().catch(sync);
    } else video.pause();
  };
  const togglePlay = () => {
    manuallyPaused = !video.paused;
    if (video.paused) video.play().catch(sync);
    else video.pause();
  };
  const toggleMute = () => { video.muted = !video.muted; };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= .25;
    update();
  }, { threshold: [0, .25] });
  observer.observe(host);
  play?.addEventListener('click', togglePlay);
  mute?.addEventListener('click', toggleMute);
  for (const name of ['play', 'pause', 'volumechange', 'loadedmetadata']) video.addEventListener(name, sync);
  document.addEventListener('visibilitychange', update);
  motion.addEventListener('change', update);
  sync();
  return () => {
    observer.disconnect();
    video.pause();
    play?.removeEventListener('click', togglePlay);
    mute?.removeEventListener('click', toggleMute);
    for (const name of ['play', 'pause', 'volumechange', 'loadedmetadata']) video.removeEventListener(name, sync);
    document.removeEventListener('visibilitychange', update);
    motion.removeEventListener('change', update);
  };
}
