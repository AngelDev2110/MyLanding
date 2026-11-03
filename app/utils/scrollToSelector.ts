export function scrollToSelector(selector: string) {
  if (!import.meta.client) return;
  const el = document.querySelector(selector);
  if (!el) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}
