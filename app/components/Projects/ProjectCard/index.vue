<template>
  <article
    class="project-card animate__animated"
    :class="{ 'project-card--compact': !props.image }"
    v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.2 }"
  >
    <TerminalWindow :title="`~/projects/${folder}`" class="project-card__window">
      <div v-if="props.image" class="project-card__media">
        <img
          :src="`/img/${props.image}`"
          :alt="$t('projects.screenshotAlt', { title: props.title })"
          loading="lazy"
          decoding="async"
          class="project-card__image"
        />
      </div>

      <div class="project-card__info">
        <div class="project-card__head">
          <h3 class="project-card__title">
            <a
              :href="primaryHref"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card__link"
            >
              {{ props.title }}
              <span v-if="!props.image" class="sr-only"
                >: {{ $t("projects.viewCode") }}</span
              >
              <span class="sr-only">({{ $t("contact.newTab") }})</span>
            </a>
          </h3>
          <ul class="project-card__tags">
            <li v-for="tag in props.tags" :key="tag" class="project-card__tag">
              <span aria-hidden="true">#</span>{{ tag }}
            </li>
          </ul>
        </div>

        <p class="project-card__description">{{ props.description }}</p>

        <div class="project-card__actions">
          <span class="project-card__cta" aria-hidden="true">
            {{ props.image ? $t("projects.viewProject") : $t("projects.viewCode") }}
            <span class="project-card__arrow">
              <AppIcon name="arrow-up-right" :size="16" />
            </span>
          </span>
          <a
            v-if="props.image && props.repo"
            :href="props.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="project-card__code"
          >
            {{ $t("projects.viewCode") }}
            <span class="sr-only">: {{ props.title }}</span>
            <AppIcon name="arrow-up-right" :size="16" />
            <span class="sr-only">({{ $t("contact.newTab") }})</span>
          </a>
        </div>
      </div>
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
// The window title mirrors the deployed path (/angel-front-themes), or the host
// for a site served at the root, like this one
const folder = computed(() => {
  try {
    const url = new URL(props.link);
    return (
      url.pathname.replace(/^\/|\/$/g, "") || url.hostname.replace(/^www\./, "")
    );
  } catch {
    return "app";
  }
});

// Without a screenshot there is no demo to show (it is this very page), so the
// card's one link is its code
const primaryHref = computed(() =>
  props.image ? props.link : (props.repo ?? props.link),
);

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
// Showcase: the screenshot spans the whole window so the app is legible, and
// the facts sit in one row under it (title + tags, description, actions)
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
      gap: 24px
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
    object-position: top left
    display: block

  &__info
    display: grid
    gap: 16px 40px
    @media (min-width: $bp-lg)
      // Fixed actions column so every card's description starts on the same line
      grid-template-columns: minmax(0, 5fr) minmax(0, 6fr) 10rem
      align-items: start

  &__head
    display: flex
    flex-direction: column
    gap: 10px

  &__title
    margin: 0
    font-family: $font-display
    font-size: clamp(1.75rem, 3.2vw, 2.75rem)
    font-weight: 700
    line-height: 1.05
    letter-spacing: -0.015em
    text-wrap: balance

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
    font-size: 1rem
    color: $text-muted
    line-height: 1.7
    max-width: 60ch

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

  &__actions
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 0 24px
    @media (min-width: $bp-lg)
      flex-direction: column
      align-items: flex-start

  &__cta
    display: inline-flex
    align-items: center
    gap: 8px
    min-height: 44px
    font-family: $font-mono
    font-size: 0.9rem
    color: $accent
    white-space: nowrap

  // Sits above the title's stretched link, so the card opens the demo and this opens the repo
  &__code
    position: relative
    z-index: 1
    display: inline-flex
    align-items: center
    gap: 8px
    min-height: 44px
    font-family: $font-mono
    font-size: 0.9rem
    color: $text-muted
    white-space: nowrap
    text-decoration: underline
    text-decoration-color: rgba($text-muted, 0.35)
    text-underline-offset: 3px
    transition: color $transition-fast, text-decoration-color $transition-fast
    &:hover,
    &:focus-visible
      color: $accent
      text-decoration-color: $accent

  &__arrow
    display: inline-flex
    transition: transform $transition-base
  &:hover &__arrow
    transform: translate(3px, -3px)

  // This site: no screenshot, a quieter window that reads as the last entry of
  // the listing rather than a third showcase
  &--compact &__title
    font-size: clamp(1.5rem, 2.4vw, 2rem)
</style>
