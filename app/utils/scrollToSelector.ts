/**
 * Scrolls to the element matching `selector`, smoothly unless the user
 * asked the OS to reduce motion.
 */
export function scrollToSelector(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}
