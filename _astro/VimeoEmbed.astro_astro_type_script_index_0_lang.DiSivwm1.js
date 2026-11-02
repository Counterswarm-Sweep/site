import { mountNativeVideo } from '/scripts/interactions/native-video.js';

// Retain the element name for existing layout and control selectors. Playback
// is entirely native and self-hosted; no third-party player SDK is required.
class LocalMarketingVideo extends HTMLElement {
  connectedCallback() {
    this.cleanup?.();
    const video = this.querySelector('video');
    this.cleanup = video ? mountNativeVideo(this, video) : undefined;
  }

  disconnectedCallback() {
    this.cleanup?.();
    this.cleanup = undefined;
  }
}

if (!customElements.get('vimeo-embed')) {
  customElements.define('vimeo-embed', LocalMarketingVideo);
}
