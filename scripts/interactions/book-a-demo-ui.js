// The shared conversion controller owns validation, attribution and submission.
// No inherited campaign, prize or scheduling-provider configuration is active.
const title = document.querySelector('[data-book-demo-hero-title]');
if (title) title.textContent = 'See Counterswarm in action.';
document.documentElement.dataset.bookDemoState = 'form';
