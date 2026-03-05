export function useInjectWindowScroll() {
  const scrollY = inject<Readonly<globalThis.Ref<number, number>>>("scrollY");
  return { scrollY };
}
