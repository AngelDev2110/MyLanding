<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled || menuOpen }">
    <div class="navbar__inner">
      <a href="#hero" class="navbar__logo" @click.prevent="scrollTo('#hero')">
        angel<span aria-hidden="true"
          ><span class="navbar__logo-host">@dev:~</span
          ><span class="navbar__logo-prompt">$</span></span
        ><span class="sr-only">, {{ $t("myName") }}</span>
      </a>

      <ul class="navbar__links">
        <li v-for="link in navLinks" :key="link.key">
          <a
            :href="`#${link.key}`"
            class="navbar__link"
            :class="{ 'navbar__link--active': activeSection === link.key }"
            @click.prevent="scrollTo(`#${link.key}`)"
          >
            {{ $t(`nav.${link.key}`) }}
          </a>
        </li>
      </ul>

      <div class="navbar__lang" role="group" :aria-label="$t('nav.language')">
        <button
          v-for="option in localeOptions"
          :key="option.code"
          type="button"
          class="navbar__lang-btn"
          :class="{ 'navbar__lang-btn--active': currentLocale === option.code }"
          :lang="option.code"
          :aria-pressed="currentLocale === option.code"
          @click="setLocale(option.code)"
        >
          {{ option.code.toUpperCase()
          }}<span class="sr-only"> {{ option.name }}</span>
        </button>
      </div>

      <button
        ref="burgerRef"
        type="button"
        class="navbar__burger"
        :class="{ 'navbar__burger--open': menuOpen }"
        :aria-label="$t('nav.menu')"
        aria-controls="navbar-mobile-menu"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span />
        <span />
        <span />
      </button>
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="menuOpen"
        id="navbar-mobile-menu"
        ref="mobileMenuRef"
        class="navbar__mobile"
      >
        <a
          v-for="link in navLinks"
          :key="link.key"
          :href="`#${link.key}`"
          class="navbar__mobile-link"
          @click.prevent="mobileNavigate(link.key)"
        >
          {{ $t(`nav.${link.key}`) }}
        </a>
        <div
          class="navbar__mobile-lang"
          role="group"
          :aria-label="$t('nav.language')"
        >
          <button
            v-for="option in localeOptions"
            :key="option.code"
            type="button"
            class="navbar__lang-btn"
            :class="{
              'navbar__lang-btn--active': currentLocale === option.code,
            }"
            :lang="option.code"
            :aria-pressed="currentLocale === option.code"
            @click="setLocale(option.code)"
          >
            {{ option.code.toUpperCase()
            }}<span class="sr-only"> {{ option.name }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script lang="ts" setup>
// Imports

// Component Options

// Props and Emits

// Composition API Helpers
const { locale, locales, setLocale } = useI18n();
const currentLocale = computed(() => locale.value);
const localeOptions = computed(() =>
  locales.value.map((l) =>
    typeof l === "string"
      ? { code: l, name: l }
      : { code: l.code, name: l.name ?? l.code },
  ),
);
const { scrollY } = useInjectWindowScroll();

// Reactive Variables
const menuOpen = ref(false);
const burgerRef = ref<HTMLButtonElement | null>(null);
const mobileMenuRef = ref<HTMLElement | null>(null);
const activeSection = ref("hero");

const navLinks = [
  { key: "about" },
  { key: "projects" },
  { key: "experience" },
  { key: "stack" },
  { key: "contact" },
];

// Must match $bp-md, where the inline links replace the burger
const DESKTOP_NAV_QUERY = "(min-width: 768px)";

const isScrolled = computed(() => (scrollY?.value ?? 0) > 60);

// Computed Properties

// Watchers
watch(menuOpen, async (open) => {
  if (!open) return;
  await nextTick();
  mobileMenuRef.value?.querySelector("a")?.focus();
});

watch(() => scrollY?.value, updateActiveSection);

// Lifecycle Hooks
let desktopQuery: MediaQueryList | null = null;

onMounted(() => {
  updateActiveSection();
  window.addEventListener("keydown", handleKeydown);
  desktopQuery = window.matchMedia(DESKTOP_NAV_QUERY);
  desktopQuery.addEventListener("change", closeOnDesktop);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  desktopQuery?.removeEventListener("change", closeOnDesktop);
});

// Methods
// The active section is the last one whose top has crossed 40% of the viewport.
// Intersection ratios misfire here: the hero scene and the pinned stack keep a
// section's box on screen for several screens while the next one peeks in
function updateActiveSection() {
  const line = window.innerHeight * 0.4;
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;
  let current = "hero";
  for (const id of ["hero", ...navLinks.map((l) => l.key)]) {
    const top = document.getElementById(id)?.getBoundingClientRect().top;
    if (top !== undefined && (top <= line || atBottom)) current = id;
  }
  activeSection.value = current;
}

function scrollTo(selector: string) {
  scrollToSelector(selector);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== "Escape" || !menuOpen.value) return;
  menuOpen.value = false;
  burgerRef.value?.focus();
}

// Past $bp-md the burger disappears, so an open menu would be left stranded
function closeOnDesktop(event: MediaQueryListEvent) {
  if (event.matches) menuOpen.value = false;
}

function mobileNavigate(key: string) {
  menuOpen.value = false;
  setTimeout(() => scrollTo(`#${key}`), 100);
}
</script>

<style lang="sass" scoped>
.navbar
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: $z-navbar
  transition: background $transition-base, box-shadow $transition-base, backdrop-filter $transition-base
  padding: 0 24px
  @media (min-width: $bp-lg)
    padding: 0 60px

  &--scrolled
    background: rgba($dark-navy, 0.85)
    backdrop-filter: blur(20px)
    box-shadow: 0 1px 0 $border

  &__inner
    display: flex
    align-items: center
    gap: 32px
    height: 68px

  // Same prompt as the terminal windows, so the page's mark belongs to its world
  &__logo
    display: inline-flex
    align-items: center
    min-height: 44px
    font-family: $font-mono
    font-size: 1rem
    font-weight: 700
    color: $white
    text-decoration: none
    flex-shrink: 0
    transition: color $transition-fast
    &:hover
      color: $accent
    &-host
      font-weight: 400
      color: $text-muted
    &-prompt
      margin-left: 0.5ch
      color: $accent
      text-shadow: 0 0 8px rgba($accent, 0.45)

  &__links
    display: none
    list-style: none
    margin: 0
    padding: 0
    gap: 20px
    margin-left: auto
    @media (min-width: $bp-md)
      display: flex
    @media (min-width: $bp-lg)
      gap: 32px

  &__link
    font-family: $font-mono
    font-size: 0.85rem
    color: $text-muted
    text-decoration: none
    letter-spacing: 0.05em
    white-space: nowrap
    transition: color $transition-fast
    position: relative
    padding-bottom: 2px
    &::after
      content: ''
      position: absolute
      bottom: -2px
      left: 0
      right: 0
      height: 1px
      background: $accent
      transform: scaleX(0)
      transition: transform $transition-fast
    &:hover,
    &--active
      color: $accent
      &::after
        transform: scaleX(1)

  &__lang
    display: none
    gap: 4px
    margin-left: 4px
    @media (min-width: $bp-md)
      display: flex
    @media (min-width: $bp-lg)
      margin-left: 20px

  &__lang-btn
    font-family: $font-mono
    font-size: 0.78rem
    background: none
    border: 1px solid $border
    color: $text-muted
    padding: 4px 12px
    border-radius: 4px
    cursor: pointer
    position: relative
    // Invisible hit area: the 26px pill stays compact but the target reaches 44px
    &::after
      content: ''
      position: absolute
      inset: -10px -2px
    transition: color $transition-fast, border-color $transition-fast, background-color $transition-fast
    &:hover
      border-color: $accent
      color: $accent
    &--active
      border-color: $accent
      color: $accent
      background: $accent-dim

  &__burger
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 5px
    width: 44px
    height: 44px
    background: none
    border: none
    cursor: pointer
    padding: 0
    margin: 0 -11px 0 auto
    @media (min-width: $bp-md)
      display: none
    span
      display: block
      width: 22px
      height: 2px
      background: $white
      border-radius: 2px
      transition: transform $transition-base, opacity $transition-base
    &--open
      span:nth-child(1)
        transform: translateY(7px) rotate(45deg)
      span:nth-child(2)
        opacity: 0
        transform: scaleX(0)
      span:nth-child(3)
        transform: translateY(-7px) rotate(-45deg)

  &__mobile
    display: flex
    flex-direction: column
    gap: 8px
    padding: 16px 0 24px
    border-top: 1px solid $border
    @media (min-width: $bp-md)
      display: none

  &__mobile-link
    display: flex
    align-items: center
    min-height: 44px
    font-family: $font-mono
    font-size: 0.95rem
    color: $text-muted
    text-decoration: none
    padding: 0 4px
    transition: color $transition-fast
    border-bottom: 1px solid $border
    &:hover
      color: $accent

  &__mobile-lang
    display: flex
    gap: 8px
    margin-top: 12px
    padding-top: 4px

// Transitions
// Reveals top-down with clip-path instead of animating max-height (no layout per frame)
.mobile-menu-enter-active,
.mobile-menu-leave-active
  transition: opacity $transition-base, transform $transition-base, clip-path $transition-base

.mobile-menu-enter-from,
.mobile-menu-leave-to
  opacity: 0
  transform: translateY(-8px)
  clip-path: inset(0 0 100% 0)
</style>
