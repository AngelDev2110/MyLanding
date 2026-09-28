<template>
  <li class="exp-entry">
    <span class="exp-entry__graph" aria-hidden="true">*</span>

    <div class="exp-entry__body">
      <p class="exp-entry__meta">
        <span class="exp-entry__period">{{ props.entry.period }}</span>
        <span class="exp-entry__sep" aria-hidden="true">·</span>
        <span>{{ props.entry.type }}</span>
      </p>
      <h3 class="exp-entry__role">{{ props.entry.role }}</h3>

      <ul class="exp-entry__highlights">
        <li
          v-for="(h, i) in props.entry.highlights"
          :key="i"
          class="exp-entry__highlight"
        >
          {{ h }}
        </li>
      </ul>

      <ul class="exp-entry__tags">
        <li v-for="tag in props.entry.tags" :key="tag" class="exp-entry__tag">
          <span aria-hidden="true">#</span>{{ tag }}
        </li>
      </ul>
    </div>
  </li>
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

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
// git log --graph: a "*" per commit and a "|" rail joining it to the next one
.exp-entry
  position: relative
  display: grid
  grid-template-columns: 2ch 1fr
  column-gap: 10px
  @media (min-width: $bp-sm)
    column-gap: 14px
  padding-bottom: 32px
  &::before
    content: ''
    position: absolute
    left: calc(1ch - 0.5px)
    top: 1.6em
    bottom: 4px
    width: 1px
    background: rgba($accent, 0.45)
  &:last-child
    padding-bottom: 4px
    &::before
      display: none

  &__graph
    font-family: $font-mono
    font-size: 1.05rem
    line-height: 1.5
    font-weight: 700
    text-align: center
    color: $accent
    text-shadow: 0 0 8px rgba($accent, 0.45)

  &__body
    min-width: 0

  // Narrow screens stack period and type instead of leaving a dangling "·"
  &__meta
    display: flex
    flex-direction: column
    @media (min-width: $bp-sm)
      flex-direction: row
      flex-wrap: wrap
    gap: 2px 10px
    margin: 0
    font-family: $font-mono
    font-size: 0.8rem
    line-height: 1.9
    color: $text-muted

  &__period
    color: $accent

  &__sep
    display: none
    color: $gray-600
    @media (min-width: $bp-sm)
      display: inline

  &__role
    margin: 2px 0 14px
    font-family: $font-display
    font-size: clamp(1.3rem, 2.6vw, 1.7rem)
    font-weight: 700
    line-height: 1.2
    letter-spacing: -0.01em
    color: $white

  &__highlights
    list-style: none
    padding: 0
    margin: 0 0 14px
    display: flex
    flex-direction: column
    gap: 8px

  &__highlight
    position: relative
    padding-left: 14px
    font-size: 0.95rem
    color: $text-muted
    line-height: 1.6
    &::before
      content: '-'
      position: absolute
      left: 0
      font-family: $font-mono
      color: $accent

  &__tags
    list-style: none
    display: flex
    flex-wrap: wrap
    gap: 4px 14px
    margin: 0
    padding: 0

  &__tag
    font-family: $font-mono
    font-size: 0.78rem
    color: $text-muted
    white-space: nowrap
    span
      color: $accent
</style>
