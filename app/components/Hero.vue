<template>
  <section class="hero">
    <header class="hero__header">
      <template v-if="isVisible.firstSection">
        <AppearingText component="h1" :text="$t('myName')" class="hero__name" />
        <AppearingText
          component="h2"
          :text="$t('myRole')"
          class="hero__role"
          :delay="0.6"
        />
      </template>
      <template v-else>
        <AppearingText
          component="p"
          :text="$t('funnyQuote')"
          class="hero__funny-quote"
        />
      </template>
    </header>
  </section>
</template>

<script lang="ts" setup>
// Imports

// Component Options

// Props and Emits

// Composition API Helpers

// Reactive Variables
const { scrollY } = useInjectWindowScroll();

// Computed Properties
const isVisible = computed(() => ({
  firstSection: (scrollY?.value ?? 0) < (window?.innerHeight ?? 1) * 0.6,
}));

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.hero
  display: flex
  align-items: flex-start
  width: 100%
  height: 200vh
  background: linear-gradient(
  to bottom,
  $dark-navy,
  $gray-900,
  $gray-800 20%,
  $gray-700,
  $gray-600 50%,
  $white
);
  &__header
    color: $white
    position: sticky
    top: 40%
    left: 10%
    transform: translateY(-50%)
    font-family: $font-lora
    .hero__name
      font-size: clamp(2rem, 5vw, 3rem)
      margin: 0 0 4px
    .hero__role
      font-size: clamp(1.1rem, 3vw, 1.5rem)
      margin: 0
    .hero__funny-quote
      color: $black
      font-size: clamp(1.5rem, 3vw, 2.5rem)
      max-width: 200px
      @media (min-width: $bp-md)
        max-width: 350px
</style>
