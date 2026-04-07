<template>
  <div
    class="exp-entry"
    :class="[`exp-entry--${side}`, { 'exp-entry--first': props.index === 0 }]"
  >
    <div class="exp-entry__dot">
      <span class="exp-entry__dot-inner" />
    </div>

    <div
      v-intersect="{
        enterClass:
          side === 'left' ? 'animate__fadeInLeft' : 'animate__fadeInRight',
        threshold: 0.2,
      }"
      class="exp-entry__card animate__animated"
    >
      <div class="exp-entry__card-header">
        <div>
          <span class="exp-entry__type">{{ props.entry.type }}</span>
          <h3 class="exp-entry__role">{{ props.entry.role }}</h3>
        </div>
        <span class="exp-entry__period">{{ props.entry.period }}</span>
      </div>

      <ul class="exp-entry__highlights">
        <li
          v-for="(h, i) in props.entry.highlights"
          :key="i"
          class="exp-entry__highlight"
        >
          <span class="exp-entry__bullet">▹</span>
          {{ h }}
        </li>
      </ul>

      <div class="exp-entry__tags">
        <span v-for="tag in props.entry.tags" :key="tag" class="exp-entry__tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Imports
import type { Props } from "./ExperienceEntry.d.ts";

// Component Options

// Props and Emits
const props = defineProps<Props>();

// Composition API Helpers

// Reactive Variables

// Computed Properties
const side = computed(() => (props.index % 2 === 0 ? "left" : "right"));

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.exp-entry
  display: flex
  animation-fill-mode: both
  position: relative
  justify-content: flex-end
  padding-right: calc(50% + 40px)
  padding-bottom: 56px
  &--right
    justify-content: flex-start
    padding-right: 0
    padding-left: calc(50% + 40px)
  @media (max-width: $bp-md)
    padding-right: 0
    padding-left: 40px
    justify-content: flex-start
    &--right
      padding-left: 40px

  &__dot
    position: absolute
    left: 50%
    top: 0
    transform: translateX(-50%)
    width: 16px
    height: 16px
    background: $surface
    border: 2px solid $accent
    border-radius: 50%
    z-index: 1
    display: flex
    align-items: center
    justify-content: center
    @media (max-width: $bp-md)
      left: 0

  &__dot-inner
    width: 6px
    height: 6px
    background: $accent
    border-radius: 50%
    animation: pulse 2.5s ease infinite

  &__card
    background: $surface-card
    border: 1px solid $border
    border-radius: 16px
    padding: 28px
    max-width: 460px
    width: 100%
    transition: border-color $transition-fast, box-shadow $transition-fast
    &:hover
      border-color: rgba(100,255,218,0.25)
      box-shadow: 0 8px 40px rgba(0,0,0,0.3)

  &__card-header
    display: flex
    align-items: flex-start
    justify-content: space-between
    gap: 12px
    margin-bottom: 20px
    flex-wrap: wrap

  &__type
    font-family: $font-mono
    font-size: 0.72rem
    color: $accent
    letter-spacing: 0.12em
    text-transform: uppercase
    display: block
    margin-bottom: 6px

  &__role
    font-family: $font-lora
    font-size: 1.25rem
    color: $white
    margin: 0
    font-weight: 600

  &__period
    font-family: $font-mono
    font-size: 0.78rem
    color: $text-muted
    white-space: nowrap
    flex-shrink: 0
    margin-top: 4px

  &__highlights
    list-style: none
    padding: 0
    margin: 0 0 20px
    display: flex
    flex-direction: column
    gap: 10px

  &__highlight
    display: flex
    gap: 10px
    align-items: flex-start
    font-size: 0.9rem
    color: $text-muted
    line-height: 1.6

  &__bullet
    color: $accent
    flex-shrink: 0
    margin-top: 2px

  &__tags
    display: flex
    flex-wrap: wrap
    gap: 8px

  &__tag
    font-family: $font-mono
    font-size: 0.72rem
    color: $accent
    background: $accent-dim
    border: 1px solid rgba(100,255,218,0.2)
    padding: 3px 10px
    border-radius: 4px

@keyframes pulse
  0%, 100%
    opacity: 1
    box-shadow: 0 0 0 0 rgba(100,255,218,0.4)
  50%
    opacity: 0.6
    box-shadow: 0 0 0 6px rgba(100,255,218,0)
</style>
