<template>
  <section id="hero" class="hero">
    <div class="hero__bg-grid" aria-hidden="true" />
    <div class="hero__bg-glow" aria-hidden="true" />

    <div class="hero__panel">
      <div class="hero__panel-inner">
        <div class="hero__left">
          <Transition name="hero-switch" mode="out-in">
            <div v-if="showIntro" key="intro" class="hero__intro">
              <AppearingText
                component="h1"
                :text="$t('myName')"
                class="hero__name"
              />
              <AppearingText
                component="h2"
                :text="$t('myRole')"
                class="hero__role"
                :delay="0.5"
              />
              <p
                class="hero__tagline animate__animated animate__fadeInUp"
                style="animation-delay: 0.5s"
              >
                {{ $t("tagline") }}
              </p>

              <div
                class="hero__ctas animate__animated animate__fadeInUp"
                style="animation-delay: 0.7s"
              >
                <a
                  href="#projects"
                  class="hero__cta hero__cta--primary"
                  @click.prevent="scrollToSection('#projects')"
                >
                  {{ $t("hero.ctaProjects") }}
                  <span class="hero__cta-arrow">
                    <AppIcon name="arrow-right" :size="16" />
                  </span>
                </a>
                <a
                  href="#contact"
                  class="hero__cta hero__cta--secondary"
                  @click.prevent="scrollToSection('#contact')"
                >
                  {{ $t("contact.getInTouch") }}
                </a>
              </div>

              <p
                class="hero__badge animate__animated animate__fadeInUp"
                style="animation-delay: 1s"
              >
                <span class="hero__badge-status">
                  <span class="hero__badge-dot" aria-hidden="true" />
                  {{ $t("hero.availability") }}
                </span>
                <span class="hero__badge-sep" aria-hidden="true">·</span>
                <span>{{ $t("yearsExp") }}</span>
              </p>
            </div>

            <div v-else key="terminal" class="hero__terminal">
              <div class="hero__terminal-bar">
                <span class="hero__terminal-dot hero__terminal-dot--red" />
                <span class="hero__terminal-dot hero__terminal-dot--yellow" />
                <span class="hero__terminal-dot hero__terminal-dot--green" />
                <span class="hero__terminal-title">angel@dev: ~</span>
              </div>
              <div class="hero__terminal-body">
                <p class="hero__terminal-line">
                  <span class="hero__terminal-prompt">$</span>
                  <span class="hero__terminal-cmd">whoami</span>
                </p>
                <p class="hero__terminal-output">
                  {{ $t("myName") }} — {{ $t("myRole") }}
                </p>
                <p class="hero__terminal-line">
                  <span class="hero__terminal-prompt">$</span>
                  <span class="hero__terminal-cmd">cat philosophy.md</span>
                </p>
                <p class="hero__terminal-comment">
                  <span class="hero__terminal-hash">//</span>
                  {{ $t("funnyQuote") }}
                  <span class="hero__terminal-cursor">▮</span>
                </p>
                <p class="hero__terminal-line hero__terminal-line--dim">
                  <span class="hero__terminal-prompt">$</span>
                  <span class="hero__terminal-cmd">{{
                    $t("terminalCmd")
                  }}</span>
                </p>
              </div>
            </div>
          </Transition>
        </div>

        <div class="hero__right" :class="{ 'hero__right--hidden': !showIntro }">
          <div class="hero__photo-frame">
            <img
              src="/img/me.jpeg"
              :alt="$t('hero.photoAlt')"
              class="hero__photo"
            />
            <div class="hero__photo-glow" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="hero__scroll-indicator"
      :class="{ 'hero__scroll-indicator--hidden': !showIntro }"
      aria-hidden="true"
    >
      <span class="hero__scroll-line" />
      <span class="hero__scroll-text">{{ $t("hero.scroll") }}</span>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports

// Composition API Helpers
const { scrollY } = useInjectWindowScroll();

// Computed
const showIntro = computed(
  () =>
    (scrollY?.value ?? 0) <
    (typeof window !== "undefined" ? window.innerHeight * 0.4 : 400),
);

// Methods
function scrollToSection(selector: string) {
  scrollToSelector(selector);
}
</script>

<style lang="sass" scoped>
.hero
  position: relative
  height: 220vh
  background: $dark-navy
  padding: 0

.hero__bg-grid
  position: absolute
  inset: 0
  background-image: linear-gradient(rgba($accent, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba($accent, 0.04) 1px, transparent 1px)
  background-size: 60px 60px
  pointer-events: none
  z-index: 0

.hero__bg-glow
  position: absolute
  top: 0
  left: -5%
  width: 100vw
  height: 100vw
  max-width: 700px
  max-height: 700px
  background: radial-gradient(circle, rgba($accent, 0.08) 0%, transparent 65%)
  pointer-events: none
  z-index: 0

.hero__panel
  position: sticky
  top: 0
  height: 100vh
  height: 100svh
  z-index: 2
  display: flex
  align-items: stretch

.hero__panel-inner
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: space-between
  padding: 68px 20px 68px
  box-sizing: border-box
  @media (min-width: $bp-md)
    padding: 68px 60px
  @media (min-width: $bp-lg)
    padding: 68px 100px

.hero__left
  flex: 1
  min-width: 0

.hero__intro
  .hero__name
    font-family: $font-lora
    font-size: clamp(2.5rem, 6vw, 4rem)
    margin: 0 0 8px
    font-weight: 700
    color: $white

  .hero__role
    font-family: $font-lora
    font-size: clamp(1.1rem, 3vw, 1.5rem)
    margin: 0
    color: $accent

.hero__tagline
  font-family: $font-nunito
  font-size: clamp(0.9rem, 2vw, 1.05rem)
  color: $text-muted
  margin: 16px 0 0
  max-width: 420px
  line-height: 1.6
  animation-fill-mode: both

.hero__ctas
  display: flex
  gap: 16px
  margin-top: 32px
  flex-wrap: wrap
  animation-fill-mode: both

.hero__cta
  display: inline-flex
  align-items: center
  gap: 8px
  font-family: $font-mono
  font-size: 0.9rem
  text-decoration: none
  padding: 12px 24px
  border-radius: 6px
  transition: all $transition-base
  font-weight: 500
  letter-spacing: 0.02em
  &--primary
    background: $accent
    color: $dark-navy
    border: 1px solid $accent
    &:hover,
    &:focus-visible
      background: transparent
      color: $accent
      .hero__cta-arrow
        transform: translateX(4px)
  &--secondary
    background: transparent
    color: $white
    border: 1px solid $border
    &:hover,
    &:focus-visible
      border-color: $accent
      color: $accent

.hero__cta-arrow
  display: inline-flex
  transition: transform $transition-fast

.hero__badge
  display: inline-flex
  flex-direction: column
  align-items: flex-start
  flex-wrap: wrap
  gap: 4px 8px
  margin: 24px 0 0
  font-family: $font-mono
  font-size: 0.78rem
  color: $text-muted
  border: 1px solid $border
  padding: 6px 14px
  border-radius: 16px
  animation-fill-mode: both
  @media (min-width: $bp-sm)
    flex-direction: row
    align-items: center
  &-status
    display: inline-flex
    align-items: center
    gap: 8px
    color: $white
  &-sep
    color: $gray-700
    // On narrow screens the two facts stack instead of leaving a dangling "·"
    display: none
    @media (min-width: $bp-sm)
      display: inline
  &-dot
    width: 7px
    height: 7px
    background: $accent
    border-radius: 50%
    animation: pulse 2s ease infinite

.hero__terminal
  background: rgba($dark-navy, 0.85)
  border: 1px solid rgba($accent, 0.22)
  border-radius: 14px
  overflow: hidden
  max-width: 560px
  box-shadow: 0 0 60px rgba($accent, 0.08), 0 24px 60px rgba(0,0,0,0.5)
  backdrop-filter: blur(8px)

.hero__terminal-bar
  display: flex
  align-items: center
  gap: 6px
  padding: 12px 16px
  background: rgba(255,255,255,0.04)
  border-bottom: 1px solid rgba($accent, 0.12)

.hero__terminal-dot
  width: 12px
  height: 12px
  border-radius: 50%
  &--red
    background: #ff5f57
  &--yellow
    background: #febc2e
  &--green
    background: #28c840

.hero__terminal-title
  font-family: $font-mono
  font-size: 0.72rem
  color: $text-muted
  margin-left: 8px
  letter-spacing: 0.04em

.hero__terminal-body
  padding: 24px 28px 28px
  display: flex
  flex-direction: column
  gap: 14px

.hero__terminal-line
  font-family: $font-mono
  font-size: 0.95rem
  display: flex
  align-items: center
  gap: 10px
  &--dim
    margin-top: 6px
    // Secondary, but still AA (6.8:1) — no opacity fade
    .hero__terminal-cmd
      color: $gray-600

.hero__terminal-output
  font-family: $font-mono
  font-size: 0.95rem
  color: $accent
  margin: -6px 0 4px
  padding-left: 22px

.hero__terminal-prompt
  color: $accent
  font-weight: 700
  user-select: none

.hero__terminal-cmd
  color: $white

.hero__terminal-comment
  font-family: $font-lora
  font-size: clamp(1.2rem, 2.5vw, 1.55rem)
  color: $white
  line-height: 1.55

.hero__terminal-hash
  font-family: $font-mono
  color: $accent
  font-size: 1rem
  margin-right: 8px
  opacity: 0.75

.hero__terminal-cursor
  display: inline-block
  color: $accent
  margin-left: 4px
  animation: blink 1.1s step-end infinite

.hero__right
  position: relative
  flex-shrink: 0
  opacity: 1
  transform: translateY(0) scale(1)
  transition: opacity 0.3s ease, transform 0.3s ease
  display: none
  @media (min-width: $bp-lg)
    display: block
  &--hidden
    opacity: 0
    transform: translateY(12px) scale(0.97)
    pointer-events: none

.hero__photo-frame
  position: relative
  width: 280px
  height: 340px
  border-radius: 20px
  overflow: hidden
  border: 1px solid $border

.hero__photo
  width: 100%
  height: 100%
  object-fit: cover
  // Landscape photo in a portrait frame: keep Angel (right third) in view, not the bay
  object-position: 75% center

.hero__photo-glow
  position: absolute
  inset: 0
  background: linear-gradient(to top, rgba($dark-navy, 0.55) 0%, transparent 60%)
  pointer-events: none

.hero__scroll-indicator
  position: fixed
  bottom: 40px
  left: 50%
  transform: translateX(-50%)
  display: flex
  flex-direction: column
  align-items: center
  gap: 8px
  opacity: 1
  transition: opacity 0.4s ease
  pointer-events: none
  z-index: 3
  &--hidden
    opacity: 0

.hero__scroll-line
  width: 1px
  height: 48px
  background: linear-gradient(to bottom, $accent, transparent)
  animation: scrollPulse 1.8s ease infinite

.hero__scroll-text
  font-family: $font-mono
  font-size: 0.65rem
  color: $text-muted
  letter-spacing: 0.15em
  text-transform: uppercase

.hero-switch-enter-active,
.hero-switch-leave-active
  transition: opacity 0.35s ease, transform 0.35s ease

.hero-switch-enter-from
  opacity: 0
  transform: translateY(20px)

.hero-switch-leave-to
  opacity: 0
  transform: translateY(-20px)

@keyframes pulse
  0%, 100%
    opacity: 1
    transform: scale(1)
  50%
    opacity: 0.5
    transform: scale(0.8)

@keyframes scrollPulse
  0%, 100%
    opacity: 1
    transform: scaleY(1)
    transform-origin: top
  50%
    opacity: 0.4
    transform: scaleY(0.6)
    transform-origin: top

@keyframes blink
  0%, 100%
    opacity: 1
  50%
    opacity: 0
</style>
