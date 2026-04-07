<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__left">
        <span class="footer__logo">
          <span class="footer__logo-bracket">&lt;</span>
          ADT
          <span class="footer__logo-bracket">/&gt;</span>
        </span>
        <p class="footer__built">{{ $t("footer.built") }}</p>
      </div>

      <p class="footer__copy">
        © {{ year }} Angel De La Torre. {{ $t("footer.rights") }}.
      </p>

      <!-- Right: Lang toggle -->
      <div class="footer__lang">
        <button
          v-for="localeCode in availableLocales"
          :key="localeCode"
          class="footer__lang-btn"
          :class="{ 'footer__lang-btn--active': currentLocale === localeCode }"
          @click="setLocale(localeCode)"
        >
          {{ localeCode.toUpperCase() }}
        </button>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
// Imports

// Component Options

// Props and Emits

// Composition API Helpers
const { locale, availableLocales, setLocale } = useI18n();
const currentLocale = computed(() => locale.value);

// Reactive Variables
const year = new Date().getFullYear();

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.footer
  background: $dark-navy
  border-top: 1px solid $border
  padding: 32px 20px
  @media (min-width: $bp-md)
    padding: 32px 60px
  @media (min-width: $bp-lg)
    padding: 32px 100px

  &__inner
    display: flex
    flex-direction: column
    align-items: center
    gap: 20px
    @media (min-width: $bp-md)
      flex-direction: row
      justify-content: space-between
      align-items: center

  &__left
    display: flex
    flex-direction: column
    align-items: center
    gap: 6px
    @media (min-width: $bp-md)
      align-items: flex-start

  &__logo
    font-family: $font-mono
    font-size: 1rem
    font-weight: 700
    color: $white
    letter-spacing: 0.03em

  &__logo-bracket
    color: $accent

  &__built
    font-family: $font-mono
    font-size: 0.72rem
    color: $gray-600
    margin: 0
    letter-spacing: 0.04em

  &__copy
    font-family: $font-mono
    font-size: 0.75rem
    color: $text-muted
    margin: 0
    text-align: center

  &__lang
    display: flex
    gap: 6px

  &__lang-btn
    font-family: $font-mono
    font-size: 0.75rem
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
</style>
