<template>
  <div class="terminal">
    <div class="terminal__bar">
      <span class="terminal__dots" aria-hidden="true">
        <span class="terminal__dot" />
        <span class="terminal__dot" />
        <span class="terminal__dot" />
      </span>
      <slot name="bar" />
      <span class="terminal__title">{{ props.title }}</span>
    </div>
    <div class="terminal__body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
// Imports
import type { Props } from "./TerminalWindow.d.ts";

// Component Options

// Props and Emits
const props = defineProps<Props>();

// Composition API Helpers

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.terminal
  background: $dark-navy
  border: 1px solid rgba($accent, 0.22)
  border-radius: 14px
  overflow: hidden
  box-shadow: 0 24px 60px rgba($black, 0.5)
  text-align: left

.terminal__bar
  display: flex
  align-items: center
  padding: 12px 16px
  background: rgba($accent, 0.05)
  border-bottom: 1px solid rgba($accent, 0.12)

// Monochrome amber window controls: same phosphor as the text, no macOS colors
.terminal__dots
  display: inline-flex
  gap: 6px
  flex-shrink: 0

.terminal__dot
  width: 10px
  height: 10px
  border-radius: 50%
  border: 1.5px solid rgba($accent, 0.55)
  &:first-child
    background: rgba($accent, 0.55)

.terminal__title
  font-family: $font-mono
  font-size: 0.72rem
  color: $text-muted
  margin-left: 14px
  letter-spacing: 0.04em

.terminal__body
  position: relative
  padding: 20px 20px 24px
  @media (min-width: $bp-sm)
    padding: 24px 28px 28px
  display: flex
  flex-direction: column
  gap: 14px
  &::after
    content: ''
    position: absolute
    inset: 0
    pointer-events: none
    background: repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 0 1px, transparent 1px 3px)

:slotted(.terminal__line)
  font-family: $font-mono
  font-size: 0.95rem
  display: flex
  align-items: baseline
  gap: 10px
  margin: 0

:slotted(.terminal__prompt)
  color: $accent
  font-weight: 700
  user-select: none
  text-shadow: 0 0 8px rgba($accent, 0.45)

:slotted(.terminal__cmd)
  color: $white

:slotted(.terminal__output)
  font-family: $font-mono
  font-size: 0.95rem
  color: $accent
  margin: 0
  text-shadow: 0 0 8px rgba($accent, 0.45)
</style>
