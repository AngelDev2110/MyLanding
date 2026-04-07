export function useScrollProvider() {
  const scrollY = ref<number>(0);

  const updateScroll = () => {
    scrollY.value = window.scrollY;
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
