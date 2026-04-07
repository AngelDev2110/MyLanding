<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__inner">
      <a href="#hero" class="navbar__logo" @click.prevent="scrollTo('#hero')">
        <span class="navbar__logo-bracket">&lt;</span>
        ADT
        <span class="navbar__logo-bracket">/&gt;</span>
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

      <div class="navbar__lang">
        <button
          v-for="localeCode in availableLocales"
          :key="localeCode"
          class="navbar__lang-btn"
          :class="{ 'navbar__lang-btn--active': currentLocale === localeCode }"
          @click="setLocale(localeCode)"
        >
          {{ localeCode.toUpperCase() }}
        </button>
      </div>

      <button
        class="navbar__burger"
        :class="{ 'navbar__burger--open': menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="navbar__mobile">
        <a
          v-for="link in navLinks"
          :key="link.key"
          :href="`#${link.key}`"
          class="navbar__mobile-link"
          @click.prevent="mobileNavigate(link.key)"
        >
          {{ $t(`nav.${link.key}`) }}
        </a>
        <div class="navbar__mobile-lang">
          <button
            v-for="localeCode in availableLocales"
            :key="localeCode"
            class="navbar__lang-btn"
            :class="{
              'navbar__lang-btn--active': currentLocale === localeCode,
            }"
            @click="setLocale(localeCode)"
          >
            {{ localeCode.toUpperCase() }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script lang="ts" setup>
// Imports
import { useScroll } from "@vueuse/core";

// Component Options

// Props and Emits

// Composition API Helpers
const { locale, availableLocales, setLocale } = useI18n();
const currentLocale = computed(() => locale.value);

// Reactive Variables
const menuOpen = ref(false);
const activeSection = ref("hero");

const navLinks = [
  { key: "about" },
  { key: "stack" },
  { key: "experience" },
  { key: "contact" },
];

const { y: scrollY } = useScroll(typeof window !== "undefined" ? window : null);
const isScrolled = computed(() => (scrollY.value ?? 0) > 60);

// Computed Properties

// Watchers

// Lifecycle Hooks
onMounted(() => {
  const sections = ["hero", ...navLinks.map((l) => l.key)];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      });
    },
    { threshold: 0.15 },
  );
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});

// Methods
function scrollTo(selector: string) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
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
    background: rgba(14, 17, 22, 0.85)
    backdrop-filter: blur(20px)
    box-shadow: 0 1px 0 $border

  &__inner
    display: flex
    align-items: center
    gap: 32px
    height: 68px

  &__logo
    font-family: $font-mono
    font-size: 1.1rem
    font-weight: 700
    color: $white
    text-decoration: none
    letter-spacing: 0.03em
    flex-shrink: 0
    transition: color $transition-fast
    &:hover
      color: $accent
    &-bracket
      color: $accent

  &__links
    display: none
    list-style: none
    margin: 0
    padding: 0
    gap: 32px
    margin-left: auto
    @media (min-width: $bp-md)
      display: flex

  &__link
    font-family: $font-mono
    font-size: 0.85rem
    color: $text-muted
    text-decoration: none
    letter-spacing: 0.05em
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
    margin-left: 20px
    @media (min-width: $bp-md)
      display: flex

  &__lang-btn
    font-family: $font-mono
    font-size: 0.78rem
    background: none
    border: 1px solid $border
    color: $text-muted
    padding: 4px 10px
    border-radius: 4px
    cursor: pointer
    transition: all $transition-fast
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
    gap: 5px
    background: none
    border: none
    cursor: pointer
    padding: 4px
    margin-left: auto
    @media (min-width: $bp-md)
      display: none
    span
      display: block
      width: 22px
      height: 2px
      background: $white
      border-radius: 2px
      transition: all $transition-base
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
    font-family: $font-mono
    font-size: 0.95rem
    color: $text-muted
    text-decoration: none
    padding: 10px 4px
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
.mobile-menu-enter-active,
.mobile-menu-leave-active
  transition: all $transition-base
  overflow: hidden

.mobile-menu-enter-from,
.mobile-menu-leave-to
  opacity: 0
  max-height: 0
  transform: translateY(-8px)

.mobile-menu-enter-to,
.mobile-menu-leave-from
  opacity: 1
  max-height: 300px
  transform: translateY(0)
</style>
