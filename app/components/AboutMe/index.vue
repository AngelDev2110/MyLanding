<template>
  <section id="about" class="about">
    <div class="about__inner">
      <div
        class="about__terminal-wrap animate__animated"
        v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.1 }"
      >
        <TerminalWindow title="angel@dev: ~">
          <p class="terminal__line">
            <span class="terminal__prompt">$</span>
            <span class="terminal__cmd">cat about.md</span>
          </p>

          <AboutMeAboutContent />
        </TerminalWindow>
      </div>

      <div
        class="about__photo-wrap animate__animated"
        v-intersect="{ enterClass: 'animate__fadeIn', threshold: 0.2 }"
      >
        <img
          src="/img/meFormal.jpeg"
          alt="Angel De La Torre"
          loading="lazy"
          decoding="async"
          class="about__photo"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports

// Component Options

// Props and Emits

// Composition API Helpers

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
// Must match $scene in Hero.vue
$scene: "(min-width: #{$bp-lg}) and (prefers-reduced-motion: no-preference)"

.about
  background: $surface
  position: relative
  // In the desktop scene the hero terminal prints about.md, so this section is
  // only the #about anchor: an invisible, zero-height marker inside the hero's
  // scroll range. An anchor jump to top 180vh lands at 1.8vh, when the About
  // layout is complete; the nav's 40% line crosses it at 1.4vh, a third of the
  // way into the switch
  @media #{$scene}
    position: absolute
    top: 180vh
    left: 0
    right: 0
    height: 0
    padding: 0
    overflow: hidden
    visibility: hidden

  &__inner
    display: flex
    flex-direction: column
    gap: 48px
    align-items: center
    max-width: 1140px
    margin: 0 auto
    @media (min-width: $bp-lg)
      flex-direction: row
      align-items: flex-start
      gap: 64px

  &__terminal-wrap
    flex: 1
    min-width: 0
    width: 100%
    max-width: 720px
    animation-fill-mode: both

  &__photo-wrap
    flex-shrink: 0
    width: min(300px, 100%)
    animation-fill-mode: both
    @media (min-width: $bp-lg)
      width: 320px
      margin-top: 48px

  &__photo
    display: block
    width: 100%
    aspect-ratio: 5 / 6
    object-fit: cover
    object-position: top center
    border-radius: 14px
    border: 1px solid rgba($accent, 0.22)
    // Same edge and depth as the terminal windows, so the photo reads as part of the set
    box-shadow: 0 24px 60px rgba($black, 0.5)
</style>
