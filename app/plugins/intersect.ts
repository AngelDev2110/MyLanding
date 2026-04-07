export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("intersect", {
    mounted(el, binding) {
      const { enterClass, threshold = 0.5, once = true } = binding.value || {};

      if (enterClass) {
        el.style.opacity = "0";
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
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
        { threshold },
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
