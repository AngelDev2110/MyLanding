<template>
  <a
    :href="props.link"
    target="_blank"
    rel="noopener noreferrer"
    class="project-card animate__animated"
    v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.2 }"
  >
    <div class="project-card__media">
      <img
        v-if="props.image"
        :src="`/img/${props.image}`"
        :alt="props.title"
        class="project-card__image"
      />
      <div v-else class="project-card__placeholder">
        <span class="project-card__placeholder-icon">&lt;/&gt;</span>
      </div>
    </div>

    <div class="project-card__body">
      <h3 class="project-card__title">{{ props.title }}</h3>
      <p class="project-card__description">{{ props.description }}</p>

      <div class="project-card__tags">
        <span v-for="tag in props.tags" :key="tag" class="project-card__tag">
          {{ tag }}
        </span>
      </div>

      <span class="project-card__link">
        {{ $t("projects.viewProject") }}
        <span class="project-card__arrow">↗</span>
      </span>
    </div>
  </a>
</template>

<script lang="ts" setup>
// Imports
import type { Props } from "./ProjectCard.d.ts";

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
.project-card
  display: flex
  flex-direction: column
  background: $surface-card
  border: 1px solid $border
  border-radius: 16px
  overflow: hidden
  text-decoration: none
  animation-fill-mode: both
  transition: border-color $transition-fast, box-shadow $transition-fast, transform $transition-fast
  &:hover
    border-color: rgba(100,255,218,0.25)
    box-shadow: 0 8px 40px rgba(0,0,0,0.3)
    transform: translateY(-3px)
    .project-card__arrow
      transform: translate(3px, -3px)
    .project-card__title
      color: $accent

  &__media
    aspect-ratio: 16 / 9
    background: $surface-2

  &__image
    width: 100%
    height: 100%
    object-fit: cover
    display: block

  &__placeholder
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center

  &__placeholder-icon
    font-family: $font-mono
    font-size: 1.6rem
    color: $gray-700

  &__body
    padding: 28px
    display: flex
    flex-direction: column
    flex: 1

  &__title
    font-family: $font-lora
    font-size: 1.25rem
    color: $white
    margin: 0 0 10px
    font-weight: 600
    transition: color $transition-fast

  &__description
    font-size: 0.9rem
    color: $text-muted
    line-height: 1.6
    margin: 0 0 20px

  &__tags
    display: flex
    flex-wrap: wrap
    gap: 8px
    margin-bottom: 20px

  &__tag
    font-family: $font-mono
    font-size: 0.72rem
    color: $accent
    background: $accent-dim
    border: 1px solid rgba(100,255,218,0.2)
    padding: 3px 10px
    border-radius: 4px

  &__link
    display: flex
    align-items: center
    gap: 8px
    font-family: $font-mono
    font-size: 0.82rem
    color: $accent
    margin-top: auto

  &__arrow
    font-size: 1rem
    transition: transform $transition-base
</style>
