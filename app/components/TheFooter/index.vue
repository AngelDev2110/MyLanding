<template>
  <footer class="footer">
    <p class="footer__line">
      <span>© {{ year }} Angel De La Torre. {{ $t("footer.rights") }}.</span>
      <span class="footer__sep" aria-hidden="true">·</span>
      <span>{{ $t("footer.built") }}</span>
    </p>
  </footer>
</template>

<script lang="ts" setup>
// Imports

// Component Options

// Props and Emits

// Composition API Helpers

// Reactive Variables
const year = new Date().getFullYear();

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.footer
  background: $surface
  border-top: 1px solid $border
  padding: 24px 20px

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
</style>
