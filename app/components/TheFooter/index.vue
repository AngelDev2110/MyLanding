<template>
  <footer class="footer">
    <p class="footer__line">
      <span>{{ $t("footer.built") }}</span>
      <span class="footer__sep" aria-hidden="true">·</span>
      <span>
        {{ $t("footer.stats") }}
        <a
          :href="WAKATIME_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__link"
        >
          WakaTime
          <AppIcon name="arrow-up-right" :size="12" />
          <span class="sr-only">({{ $t("contact.newTab") }})</span>
        </a>
      </span>
    </p>
  </footer>
</template>

<script lang="ts" setup>
// Imports
import { WAKATIME_URL } from "./constants";

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
// A footnote to the Contact terminal: same surface, no rule, so the page still ends on the prompt
.footer
  background: $surface
  padding: 0 20px 32px

.footer__line
  display: flex
  flex-direction: column
  align-items: center
  gap: 4px 12px
  margin: 0
  font-family: $font-mono
  font-size: 0.72rem
  color: $gray-600
  text-align: center
  letter-spacing: 0.04em
  @media (min-width: $bp-md)
    flex-direction: row
    justify-content: center

.footer__sep
  display: none
  @media (min-width: $bp-md)
    display: inline

.footer__link
  display: inline-flex
  align-items: center
  gap: 3px
  color: $text-muted
  text-decoration: underline
  text-decoration-color: rgba($accent, 0.35)
  text-underline-offset: 3px
  white-space: nowrap
  transition: color $transition-fast, text-decoration-color $transition-fast
  &:hover
    color: $accent
    text-decoration-color: $accent
</style>
