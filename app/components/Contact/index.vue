<template>
  <section id="contact" class="contact">
    <div class="contact__bg-glow" />

    <div class="contact__inner">
      <div class="contact__header">
        <p class="section-label">{{ $t("contact.label") }}</p>
        <h2 class="section-heading">{{ $t("contact.heading") }}</h2>
        <p class="section-subheading">{{ $t("contact.sub") }}</p>
      </div>

      <div
        class="contact__email-wrap animate__animated"
        v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.3 }"
      >
        <span class="contact__email-label">{{ $t("contact.copyEmail") }}</span>
        <button class="contact__email-btn" @click="handleCopy">
          <span class="contact__email-text">{{ $t("contact.email") }}</span>
          <Transition name="copy-icon">
            <span v-if="!copied" class="contact__email-icon">⎘</span>
            <span
              v-else
              class="contact__email-icon contact__email-icon--success"
              >✓</span
            >
          </Transition>
        </button>
        <Transition name="copy-toast">
          <div v-if="copied" class="contact__toast">
            {{ $t("contact.emailCopied") }}
          </div>
        </Transition>
      </div>

      <div class="contact__divider">
        <span class="contact__divider-line" />
        <span class="contact__divider-text">{{ $t("contact.findMe") }}</span>
        <span class="contact__divider-line" />
      </div>

      <div class="contact__socials">
        <ContactSocialCard
          v-for="link in SOCIAL_LINKS"
          :key="link.href"
          v-bind="link"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import { useClipboard } from "@vueuse/core";
import { SOCIAL_LINKS } from "./constants";

// Component Options

// Props and Emits

// Composition API Helpers
const { copy, copied } = useClipboard({ copiedDuring: 2500 });

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
function handleCopy() {
  copy("angeldev2110@gmail.com");
}
</script>

<style lang="sass" scoped>
.contact
  background: $dark-navy
  position: relative
  overflow: hidden
  text-align: center

  &__bg-glow
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 600px
    height: 600px
    background: radial-gradient(circle, rgba(100,255,218,0.05) 0%, transparent 70%)
    pointer-events: none
    z-index: 0

  &__inner
    position: relative
    z-index: 1
    max-width: 680px
    margin: 0 auto
    display: flex
    flex-direction: column
    align-items: center
    gap: 0

  &__header
    margin-bottom: 48px
    .section-label,
    .section-heading,
    .section-subheading
      margin-left: auto
      margin-right: auto
    .section-label
      justify-content: center
      &::after
        display: none

  &__email-wrap
    position: relative
    display: flex
    flex-direction: column
    align-items: center
    gap: 12px
    animation-fill-mode: both
    margin-bottom: 48px

  &__email-label
    font-family: $font-mono
    font-size: 0.75rem
    color: $text-muted
    letter-spacing: 0.1em
    text-transform: uppercase

  &__email-btn
    display: flex
    align-items: center
    gap: 14px
    background: $surface-card
    border: 1px solid $border
    border-radius: 12px
    padding: 16px 28px
    cursor: pointer
    transition: all $transition-base
    &:hover
      border-color: rgba(100,255,218,0.4)
      background: $accent-dim
      box-shadow: 0 0 30px rgba(100,255,218,0.1)

  &__email-text
    font-family: $font-mono
    font-size: clamp(0.85rem, 2.5vw, 1.1rem)
    color: $white
    letter-spacing: 0.02em

  &__email-icon
    font-size: 1.3rem
    color: $accent
    display: inline-flex
    align-items: center
    justify-content: center
    width: 28px
    transition: all $transition-fast
    &--success
      color: $accent
      animation: successPop 0.3s cubic-bezier(0.4, 0, 0.2, 1)

  &__toast
    position: absolute
    bottom: -36px
    left: 50%
    transform: translateX(-50%)
    font-family: $font-mono
    font-size: 0.78rem
    color: $accent
    background: $accent-dim
    border: 1px solid rgba(100,255,218,0.25)
    padding: 5px 14px
    border-radius: 100px
    white-space: nowrap
    pointer-events: none

  &__divider
    display: flex
    align-items: center
    gap: 16px
    width: 100%
    margin-bottom: 32px

  &__divider-line
    flex: 1
    height: 1px
    background: $border

  &__divider-text
    font-family: $font-mono
    font-size: 0.75rem
    color: $text-muted
    white-space: nowrap
    letter-spacing: 0.08em

  &__socials
    display: flex
    flex-direction: column
    gap: 16px
    width: 100%

// Transitions
.copy-icon-enter-active,
.copy-icon-leave-active
  transition: all $transition-fast

.copy-icon-enter-from
  opacity: 0
  transform: scale(0.5)

.copy-icon-leave-to
  opacity: 0
  transform: scale(0.5)

.copy-toast-enter-active,
.copy-toast-leave-active
  transition: all $transition-base

.copy-toast-enter-from,
.copy-toast-leave-to
  opacity: 0
  transform: translateX(-50%) translateY(8px)

@keyframes successPop
  0%
    transform: scale(0.5)
  60%
    transform: scale(1.2)
  100%
    transform: scale(1)
</style>
