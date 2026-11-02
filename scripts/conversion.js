/** Visual parity is independent of CRM configuration. Never sends requests to the reference's CRM. */
const params = new URLSearchParams(location.search);
const attributionFields = {
  utm_source: 'UTM Source', utm_medium: 'UTM Medium', utm_campaign: 'UTM Campaign',
  utm_term: 'UTM Term', utm_content: 'UTM Content', gclid: 'GCLID',
  gbraid: 'GBRAID', wbraid: 'WBRAID', matchtype: 'Match Type', network: 'Network',
  device: 'Device', invite_source_id: 'Invite Source ID', campaign_id: 'Platform Campaign ID',
  adset_id: 'Ad Set ID', ad_id: 'Ad ID',
};
let attribution = {};
try {
  attribution = JSON.parse(sessionStorage.getItem('replica-attribution') || '{}');
  for (const [key, field] of Object.entries(attributionFields)) {
    if (params.has(key)) attribution[field] = params.get(key);
  }
  sessionStorage.setItem('replica-attribution', JSON.stringify(attribution));
} catch { /* Navigation and forms still work when storage is unavailable. */ }
for (const input of document.querySelectorAll('[data-attribution-field]')) {
  input.value = attribution[input.dataset.attributionField] || '';
}
function track(event, properties = {}) {
  const detail = { event, path: location.pathname, ...properties };
  window.dataLayer ||= [];
  window.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent('site:conversion', { detail }));
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (link && (link.hasAttribute('data-demo-booking') || /book-a-demo/.test(link.getAttribute('href')))) {
    track('demo_cta_click', { label: link.textContent.trim() });
  }
});

for (const form of document.querySelectorAll('form')) {
  const select = form.querySelector('[data-referral-source-select]');
  const other = form.querySelector('[data-referral-source-other]');
  const otherInput = form.querySelector('[data-referral-source-other-input]');
  function syncReferral() {
    if (!select || !other || !otherInput) return;
    const show = select.value === 'other';
    other.hidden = !show;
    otherInput.required = show;
    if (!show) otherInput.value = '';
  }
  select?.addEventListener('change', syncReferral);
  syncReferral();
  const email = form.querySelector('[data-demo-email-input]');
  if (email && params.has('email')) email.value = params.get('email');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('[type=submit]');
    const originalText = button?.textContent;
    let status = form.querySelector('[data-submit-status]');
    if (!status) {
      status = document.createElement('p');
      status.dataset.submitStatus = '';
      status.setAttribute('role','status');
      status.className = 'text text--secondary text--sm';
      button?.after(status);
    }
    if (button) {button.disabled = true;button.textContent = 'Submitting…';}
    try {
      const configResponse = await fetch('/site-config.json');
      if (!configResponse.ok) throw new Error('Unable to load booking configuration.');
      const config = await configResponse.json();
      if (config.bookingUrl) {location.assign(config.bookingUrl);return;}
      if (!config.endpoint) {
        status.textContent = 'This is a preview. Demo booking is not connected yet.';
        return;
      }
      const response = await fetch(config.endpoint, { method:'POST', body:new FormData(form) });
      if (!response.ok) throw new Error('Your request could not be sent. Please try again.');
      track('demo_form_submit');
      if (config.successUrl) {location.assign(config.successUrl);return;}
      document.documentElement.dataset.bookDemoState = 'success';
      const panel = document.querySelector('[data-book-demo-panel="form"], [data-scan-form-panel]');
      const success = document.querySelector('[data-book-demo-panel="success"], [data-scan-success]');
      if (panel && success) {panel.hidden=true;success.hidden=false;}
      else status.textContent = 'Thank you. Your request has been received.';
    } catch (error) {status.textContent = error.message;}
    finally {if (button) {button.disabled = false;button.textContent = originalText;}}
  });
}
