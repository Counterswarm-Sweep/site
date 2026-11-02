const m = [
    "gmail.com",
    "googlemail.com",
    "icloud.com",
    "me.com",
    "mac.com",
    "protonmail.com",
    "protonmail.ch",
    "proton.me",
    "pm.me",
    "tutanota.com",
    "tutamail.com",
    "aol.com",
    "mail.com",
    "web.de",
    "mail.ru",
    "rambler.ru",
    "qq.com",
    "163.com",
    "126.com",
    "sina.com",
    "naver.com",
    "daum.net",
    "rediffmail.com",
    "10minutemail.com",
    "guerrillamail.com",
    "mailinator.com",
    "tempmail.org",
  ],
  r = [
    String.raw`yahoo\.[a-z0-9.-]+`,
    String.raw`hotmail\.[a-z0-9.-]+`,
    String.raw`outlook\.[a-z0-9.-]+`,
    String.raw`live\.[a-z0-9.-]+`,
    String.raw`msn\.[a-z0-9.-]+`,
    String.raw`gmx\.[a-z0-9.-]+`,
    String.raw`yandex\.[a-z0-9.-]+`,
  ],
  l = [
    "mailinator.com",
    "guerrillamail.com",
    "sharklasers.com",
    "10minutemail.com",
    "trashmail.com",
    "tempmail.com",
    "temp-mail.org",
    "yopmail.com",
    "getnada.com",
    "maildrop.cc",
    "dispostable.com",
    "throwawaymail.com",
  ],
  c = "please provide a valid business email",
  g = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  v = 254,
  I = r.map((e) => new RegExp(`^${e}$`, "i")),
  L = new Set(m),
  _ = new Set(l);
function n(e) {
  const t = e.trim(),
    a = t.lastIndexOf("@");
  if (a <= 0) return t;
  const i = t.slice(0, a),
    S = t.slice(a + 1).toLowerCase();
  return `${i}@${S}`;
}
function A(e) {
  const t = n(e),
    a = t.lastIndexOf("@");
  if (!(a <= 0 || a === t.length - 1)) return t.slice(a + 1);
}
function y(e) {
  const t = e.trim().toLowerCase();
  return L.has(t) || I.some((a) => a.test(t));
}
function w(e) {
  return _.has(e.trim().toLowerCase());
}
function u(e) {
  const t = n(e);
  if (t.length === 0 || t.length > v || !g.test(t)) return "invalid_syntax";
  const a = A(t);
  if (!a) return "invalid_syntax";
  if (w(a)) return "disposable_domain";
  if (y(a)) return "personal_domain";
}
const s = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
[...m.map(s), ...l.map(s), ...r].join("|");
const M = "[data-business-email-form]",
  R = "[data-business-email-input]";
function d(e) {
  return Array.from(e.querySelectorAll(R)).filter((t) => t instanceof HTMLInputElement);
}
function E(e) {
  return (
    (e.value = n(e.value)),
    e.setCustomValidity(""),
    u(e.value) && e.setCustomValidity(c),
    e.checkValidity()
  );
}
function f(e) {
  for (const t of d(e)) if (!E(t)) return (t.reportValidity(), !1);
  return !0;
}
function o(e = document) {
  for (const t of d(e))
    t.dataset.businessEmailValidationBound !== "true" &&
      ((t.dataset.businessEmailValidationBound = "true"),
      t.addEventListener("blur", () => {
        t.value = n(t.value);
      }),
      t.addEventListener("input", () => {
        t.setCustomValidity("");
      }),
      t.addEventListener("invalid", () => {
        u(t.value) || t.validity.patternMismatch ? t.setCustomValidity(c) : t.setCustomValidity("");
      }));
}
function p(e) {
  const t = e.target,
    i = (t instanceof Element ? t : null)?.closest(M);
  return !(i instanceof HTMLFormElement) || f(i)
    ? !1
    : (e.preventDefault(), e.stopImmediatePropagation(), !0);
}
window.counterswarmBusinessEmailValidation = { sync: o, validateForm: f, validateInput: E };
o();
document.addEventListener("astro:page-load", () => o());
document.addEventListener(
  "click",
  (e) => {
    const t = e.target;
    !(t instanceof HTMLElement) || !t.closest('[type="submit"]') || p(e);
  },
  { capture: !0 },
);
document.addEventListener("submit", p, { capture: !0 });
