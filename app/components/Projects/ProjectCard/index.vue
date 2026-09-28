<template>
  <article
    class="project-card animate__animated"
    v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.2 }"
  >
    <TerminalWindow :title="`~/projects/${folder}`" class="project-card__window">
      <div class="project-card__media">
        <img
          v-if="props.image"
          :src="`/img/${props.image}`"
          :alt="$t('projects.screenshotAlt', { title: props.title })"
          class="project-card__image"
        />
        <div v-else class="project-card__placeholder" aria-hidden="true">
          &lt;/&gt;
        </div>
      </div>

      <h3 class="project-card__title">
        <a
          :href="props.link"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card__link"
        >
          {{ props.title }}
          <span class="sr-only">({{ $t("contact.newTab") }})</span>
        </a>
      </h3>
      <p class="project-card__description">{{ props.description }}</p>

      <ul class="project-card__tags">
        <li v-for="tag in props.tags" :key="tag" class="project-card__tag">
          <span aria-hidden="true">#</span>{{ tag }}
        </li>
      </ul>

      <span class="project-card__cta" aria-hidden="true">
        {{ $t("projects.viewProject") }}
        <span class="project-card__arrow">
          <AppIcon name="arrow-up-right" :size="16" />
        </span>
      </span>
    </TerminalWindow>
  </article>
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
// The window title mirrors the deployed path, e.g. /angel-front-themes
const folder = computed(() => {
  try {
    return new URL(props.link).pathname.replace(/^\/|\/$/g, "") || "app";
  } catch {
    return "app";
  }
});

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.project-card
  position: relative
  display: flex
  animation-fill-mode: both

  &__window
    flex: 1
    display: flex
    flex-direction: column
    transition: border-color $transition-fast
    :deep(.terminal__body)
      flex: 1
  &:hover &__window,
  &:focus-within &__window
    border-color: rgba($accent, 0.5)

  &__media
    aspect-ratio: 16 / 9
    background: $surface-2
    border-radius: 8px
    overflow: hidden
    border: 1px solid $border

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
    font-family: $font-mono
    font-size: 1.6rem
    color: $gray-700

  &__title
    margin: 6px 0 0
    font-family: $font-display
    font-size: clamp(1.35rem, 2.4vw, 1.75rem)
    font-weight: 700
    line-height: 1.2
    letter-spacing: -0.01em

  // The title link stretches over the window body (the positioned ancestor), so
  // the card stays one big target; its focus ring is drawn on the whole window
  // because the window's overflow: hidden would clip an outline on the link
  &__link
    color: $white
    text-decoration: none
    transition: color $transition-fast
    &::after
      content: ''
      position: absolute
      inset: 0
    &:focus-visible
      outline: none
  &:has(.project-card__link:focus-visible) .project-card__window
    outline: 2px solid $accent
    outline-offset: 3px
  &:hover &__link,
  &__link:focus-visible
    color: $accent

  &__description
    margin: 0
    font-size: 0.95rem
    color: $text-muted
    line-height: 1.65

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

  &__cta
    display: inline-flex
    align-items: center
    gap: 8px
    margin-top: auto
    padding-top: 6px
    font-family: $font-mono
    font-size: 0.85rem
    color: $accent

  &__arrow
    display: inline-flex
    transition: transform $transition-base
  &:hover &__arrow
    transform: translate(3px, -3px)
</style>
