<template>
  <section id="contact" class="contact">
    <div class="contact__bg-glow" />

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
          <p class="terminal__line" aria-hidden="true">
            <span class="terminal__prompt">$</span>
            <span class="contact__cursor">▮</span>
          </p>
        </TerminalWindow>
      </div>

      <div class="contact__divider">
        <span class="contact__divider-line" />
        <span class="contact__divider-text">{{ $t("contact.findMe") }}</span>
        <span class="contact__divider-line" />
      </div>

      <div class="contact__socials">
        <ContactSocialCard
          v-for="social in featuredSocials"
          :key="social.href"
          v-bind="social"
        />
      </div>

      <p v-for="social in extraSocials" :key="social.href" class="contact__extra">
        {{ social.description }}:
        <a
          :href="social.href"
          :target="social.external ? '_blank' : undefined"
          :rel="social.external ? 'noopener noreferrer' : undefined"
          class="contact__extra-link"
        >
          {{ social.label }}
          <AppIcon name="arrow-up-right" :size="14" />
          <span v-if="social.external" class="sr-only">
            ({{ $t("contact.newTab") }})
          </span>
        </a>
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import { useClipboard } from "@vueuse/core";
import { SOCIAL_LINKS } from "./constants";
import type { Props as SocialCardProps } from "./SocialCard/SocialCard.d.ts";

// Component Options

// Props and Emits

// Composition API Helpers
const { copy, copied } = useClipboard({ copiedDuring: 2500, legacy: true });
const { t } = useI18n();

// Reactive Variables
const EMAIL = "angeldev2110@gmail.com";
const [emailUser, emailDomain] = EMAIL.split("@");
const copyFailed = ref(false);
let copyFailedTimer: ReturnType<typeof setTimeout> | undefined;

// Computed Properties
const SOCIALS = computed<(SocialCardProps & { featured: boolean })[]>(() =>
  SOCIAL_LINKS.map((link) => ({
    href: link.href,
    icon: link.icon,
    username: link.username,
    external: link.external,
    featured: link.featured,
    label: t(`contact.socials.${link.key}.label`),
    description: t(`contact.socials.${link.key}.description`),
  })),
);
const featuredSocials = computed<SocialCardProps[]>(() =>
  SOCIALS.value
    .filter((social) => social.featured)
    .map(({ featured: _featured, ...social }) => social),
);
const extraSocials = computed(() =>
  SOCIALS.value.filter((social) => !social.featured),
);

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

  &__bg-glow
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 600px
    height: 600px
    background: radial-gradient(circle, rgba($accent, 0.05) 0%, transparent 70%)
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
    .section-heading,
    .section-subheading
      margin-left: auto
      margin-right: auto

  &__terminal-wrap
    width: 100%
    margin-bottom: 56px
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

  &__cursor
    color: $accent

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

  &__extra
    margin: 24px 0 0
    font-size: 0.9rem
    color: $text-muted

  &__extra-link
    color: $accent
    text-decoration: underline
    text-decoration-color: rgba($accent, 0.35)
    text-underline-offset: 3px
    transition: text-decoration-color $transition-fast
    white-space: nowrap
    &:hover
      text-decoration-color: $accent

</style>
