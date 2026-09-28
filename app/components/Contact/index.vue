<template>
  <section id="contact" class="contact">
    <div class="contact__inner">
      <div class="contact__header">
        <h2 class="section-heading">{{ $t("contact.heading") }}</h2>
        <p class="section-subheading">{{ $t("contact.sub") }}</p>
      </div>

      <div
        class="contact__terminal-wrap animate__animated"
        v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.3 }"
      >
        <TerminalWindow title="angel@dev: ~/contact" class="contact__terminal">
          <p class="terminal__line">
            <span class="terminal__prompt">$</span>
            <span class="terminal__cmd">mail angel</span>
          </p>
          <p class="contact__email">{{ emailUser }}@<wbr />{{ emailDomain }}</p>
          <div class="contact__actions">
            <button type="button" class="contact__action" @click="handleCopy">
              <AppIcon :name="copied ? 'check' : 'copy'" />
              {{ $t("contact.copyEmail") }}
            </button>
            <a :href="`mailto:${EMAIL}`" class="contact__action">
              <AppIcon name="mail" />
              {{ $t("contact.sendEmail") }}
            </a>
          </div>
          <p
            role="status"
            aria-live="polite"
            class="terminal__output contact__status"
            :class="{ 'contact__status--error': copyFailed && !copied }"
          >
            <template v-if="copied">
              <AppIcon name="check" :size="16" />
              {{ $t("contact.emailCopied") }}
            </template>
            <template v-else-if="copyFailed">{{ $t("contact.copyFailed") }}</template>
          </p>
          <ul class="contact__links">
            <li v-for="social in SOCIAL_LINKS" :key="social.key">
              <a
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="contact__link"
              >
                <span class="terminal__prompt" aria-hidden="true">$</span>
                <span class="contact__link-body">
                  <span class="contact__link-cmd">open {{ social.key }}</span>
                  <span class="contact__link-note">
                    <span aria-hidden="true">// </span>
                    {{ $t(`contact.socials.${social.key}.description`) }}
                  </span>
                </span>
                <span class="contact__link-arrow">
                  <AppIcon name="arrow-up-right" :size="16" />
                </span>
                <span class="sr-only">({{ $t("contact.newTab") }})</span>
              </a>
            </li>
          </ul>
          <p class="terminal__line" aria-hidden="true">
            <span class="terminal__prompt">$</span>
            <span class="contact__cursor">▮</span>
          </p>
        </TerminalWindow>
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
const { copy, copied } = useClipboard({ copiedDuring: 2500, legacy: true });

// Reactive Variables
const EMAIL = "angeldev2110@gmail.com";
const [emailUser, emailDomain] = EMAIL.split("@");
const copyFailed = ref(false);
let copyFailedTimer: ReturnType<typeof setTimeout> | undefined;

// Computed Properties

// Watchers

// Lifecycle Hooks
onBeforeUnmount(() => clearTimeout(copyFailedTimer));

// Methods
async function handleCopy() {
  clearTimeout(copyFailedTimer);
  copyFailed.value = false;
  try {
    await copy(EMAIL);
    if (!copied.value) throw new Error("Clipboard unavailable");
  } catch {
    copyFailed.value = true;
    copyFailedTimer = setTimeout(() => (copyFailed.value = false), 4000);
  }
}
</script>

<style lang="sass" scoped>
.contact
  background: $surface
  position: relative
  overflow: hidden
  text-align: center

  &__inner
    max-width: 680px
    margin: 0 auto
    display: flex
    flex-direction: column
    align-items: center
    gap: 0

  &__header
    margin-bottom: 48px
    .section-heading,
    .section-subheading
      margin-left: auto
      margin-right: auto

  &__terminal-wrap
    width: 100%
    animation-fill-mode: both

  &__email
    margin: 4px 0 0
    font-family: $font-display
    font-size: clamp(1rem, 5.4vw, 2.75rem)
    font-weight: 700
    line-height: 1.15
    letter-spacing: -0.015em
    color: $white
    overflow-wrap: anywhere

  &__actions
    display: flex
    flex-wrap: wrap
    gap: 12px
    margin-top: 8px

  &__action
    display: inline-flex
    align-items: center
    justify-content: center
    gap: 10px
    flex: 1 1 180px
    min-height: 48px
    padding: 0 20px
    font-family: $font-mono
    font-size: 0.9rem
    font-weight: 500
    color: $accent
    background: $accent-dim
    border: 1px solid rgba($accent, 0.3)
    border-radius: 8px
    text-decoration: none
    cursor: pointer
    transition: background $transition-fast, border-color $transition-fast
    &:hover,
    &:focus-visible
      background: rgba($accent, 0.2)
      border-color: $accent

  &__status
    display: flex
    align-items: center
    gap: 8px
    min-height: 1.5em
    &--error
      color: $text-muted
      text-shadow: none

  // Secondary to the email actions: plain terminal lines that light up like a selected row
  &__links
    list-style: none
    margin: -8px 0 0
    padding: 0
    display: flex
    flex-direction: column
    gap: 4px

  // 24px lines + 12px padding: one line fills the 48px target, and a wrapped note keeps $ on the first line
  &__link
    display: flex
    align-items: flex-start
    gap: 10px
    min-height: 48px
    // Negative margin keeps the $ aligned with the other prompts while the hover row bleeds past it
    margin: 0 -12px
    padding: 12px
    line-height: 24px
    border-radius: 6px
    font-family: $font-mono
    font-size: 0.95rem
    text-decoration: none
    transition: background-color $transition-fast
    &:hover,
    &:focus-visible
      background: rgba($accent, 0.08)
      .contact__link-cmd
        color: $accent
      .contact__link-arrow
        transform: translate(2px, -2px)

  &__link-body
    display: flex
    flex-wrap: wrap
    align-items: baseline
    gap: 2px 14px
    flex: 1
    min-width: 0

  &__link-cmd
    color: $white
    transition: color $transition-fast

  &__link-note
    font-size: 0.82rem
    line-height: 20px
    color: $text-muted

  &__link-arrow
    display: inline-flex
    align-items: center
    height: 24px
    color: $accent
    flex-shrink: 0
    transition: transform $transition-fast

  // The page ends on a live prompt; the global reduced-motion block stops the blink
  &__cursor
    color: $accent
    animation: blink 1.1s step-end infinite

@keyframes blink
  0%, 100%
    opacity: 1
  50%
    opacity: 0
</style>
