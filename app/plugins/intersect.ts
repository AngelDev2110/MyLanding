export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("intersect", {
    mounted(el, binding) {
      const { enterClass, threshold = 0.5, once = true } = binding.value || {};

      // Without an observer (or with reduced motion) the element would stay at opacity 0 forever
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!("IntersectionObserver" in window) || reduceMotion) return;

      if (enterClass) {
        el.style.opacity = "0";
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // A block taller than the viewport can never reach a ratio like 0.3;
            // half a screen of it on view counts as entered too
            const entered =
              entry.intersectionRatio >= threshold ||
              entry.intersectionRect.height >= window.innerHeight / 2;
            if (entry.isIntersecting && entered) {
              el.style.opacity = "";
              if (enterClass) el.classList.add(enterClass);
              if (once) observer.unobserve(el);
            } else if (!once) {
              if (enterClass) {
                el.classList.remove(enterClass);
                el.style.opacity = "0";
              }
            }
          });
        },
        { threshold: [0, threshold, 0.1, 0.25, 0.5] },
      );

      observer.observe(el);

      (el as any).__intersectObserver = observer;
    },

    unmounted(el) {
      const observer = (el as any).__intersectObserver;
      if (observer) {
        observer.disconnect();
        delete (el as any).__intersectObserver;
      }
    },
  });
});
