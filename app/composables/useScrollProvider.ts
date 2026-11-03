export function useScrollProvider() {
  const scrollY = ref<number>(0);

  let ticking = false;

  const updateScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      scrollY.value = window.scrollY;
    });
  };

  onMounted(() => {
    window.addEventListener("scroll", updateScroll);
    updateScroll();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", updateScroll);
  });

  provide("scrollY", readonly(scrollY));
}
