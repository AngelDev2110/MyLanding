export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("intersect", {
    mounted(el, binding) {
      const { enterClass, leaveClass, threshold = 0.5 } = binding.value || {};

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (enterClass) el.classList.add(enterClass);
              if (leaveClass) el.classList.remove(leaveClass);
            } else {
              if (leaveClass) el.classList.add(leaveClass);
              if (enterClass) el.classList.remove(enterClass);
            }
          });
        },
        { threshold },
      );

      observer.observe(el);
    },
  });
});
