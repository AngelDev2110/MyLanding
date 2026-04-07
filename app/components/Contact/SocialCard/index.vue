<template>
  <a
    :href="props.href"
    :target="props.external ? '_blank' : undefined"
    :rel="props.external ? 'noopener noreferrer' : undefined"
    class="social-card animate__animated"
    v-intersect="{
      enterClass: 'animate__fadeInUp',
      threshold: 0.3,
    }"
  >
    <div class="social-card__icon-wrap">
      <img :src="`/img/${props.icon}`" :alt="props.label" class="social-card__icon" />
    </div>
    <div class="social-card__body">
      <span class="social-card__label">{{ props.label }}</span>
      <span class="social-card__username">{{ props.username }}</span>
      <span class="social-card__desc">{{ props.description }}</span>
    </div>
    <span class="social-card__arrow">↗</span>
  </a>
</template>

<script lang="ts" setup>
// Imports
import type { Props } from "./SocialCard.d.ts";

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
.social-card
  display: flex
  align-items: center
  gap: 20px
  background: $surface-card
  border: 1px solid $border
  border-radius: 16px
  padding: 24px 28px
  text-decoration: none
  transition: all $transition-base
  animation-fill-mode: both
  cursor: pointer
  position: relative
  overflow: hidden
  &::before
    content: ''
    position: absolute
    inset: 0
    background: linear-gradient(135deg, $accent-dim, transparent)
    opacity: 0
    transition: opacity $transition-base
  &:hover
    border-color: rgba(100,255,218,0.3)
    transform: translateY(-3px)
    box-shadow: 0 12px 40px rgba(0,0,0,0.3)
    &::before
      opacity: 1
    .social-card__arrow
      transform: translate(3px, -3px)
    .social-card__label
      color: $accent

  &__icon-wrap
    width: 48px
    height: 48px
    background: $surface-2
    border-radius: 12px
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    border: 1px solid $border

  &__icon
    width: 24px
    height: 24px
    object-fit: contain

  &__body
    display: flex
    flex-direction: column
    gap: 3px
    flex: 1
    min-width: 0

  &__label
    font-family: $font-mono
    font-size: 0.78rem
    color: $text-muted
    text-transform: uppercase
    letter-spacing: 0.1em
    transition: color $transition-fast

  &__username
    font-family: $font-lora
    font-size: 1.1rem
    color: $white
    font-weight: 600
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  &__desc
    font-size: 0.82rem
    color: $gray-600
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  &__arrow
    font-size: 1.2rem
    color: $accent
    flex-shrink: 0
    transition: transform $transition-base
    align-self: flex-start
</style>
