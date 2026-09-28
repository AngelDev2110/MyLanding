<template>
  <div class="terminal">
    <div class="terminal__bar">
      <span class="terminal__dot terminal__dot--red" aria-hidden="true" />
      <span class="terminal__dot terminal__dot--yellow" aria-hidden="true" />
      <span class="terminal__dot terminal__dot--green" aria-hidden="true" />
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
  background: rgba($dark-navy, 0.85)
  border: 1px solid rgba($accent, 0.22)
  border-radius: 14px
  overflow: hidden
  box-shadow: 0 0 60px rgba($accent, 0.08), 0 24px 60px rgba(0, 0, 0, 0.5)
  backdrop-filter: blur(8px)
  text-align: left

.terminal__bar
  display: flex
  align-items: center
  gap: 6px
  padding: 12px 16px
  background: rgba(255, 255, 255, 0.04)
  border-bottom: 1px solid rgba($accent, 0.12)

.terminal__dot
  width: 12px
  height: 12px
  border-radius: 50%
  &--red
    background: #ff5f57
  &--yellow
    background: #febc2e
  &--green
    background: #28c840

.terminal__title
  font-family: $font-mono
  font-size: 0.72rem
  color: $text-muted
  margin-left: 8px
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
