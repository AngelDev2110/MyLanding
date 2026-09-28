<template>
  <div class="about-content">
    <h2 class="about-content__heading about-content__block" style="--i: 0">
      <span class="about-content__mark" aria-hidden="true">#</span>
      {{ $t("about.heading") }}
    </h2>

    <p class="about-content__block" style="--i: 1">{{ $t("about.bio1") }}</p>
    <p class="about-content__block" style="--i: 2">{{ $t("about.bio2") }}</p>
    <p class="about-content__block" style="--i: 3">{{ $t("about.bio3") }}</p>

    <ul class="about-content__traits">
      <li
        v-for="(trait, index) in TRAITS"
        :key="trait.key"
        class="about-content__trait about-content__block"
        :style="{ '--i': 4 + index }"
      >
        <span class="about-content__mark" aria-hidden="true">-</span>
        <span>
          {{ $t(`about.traits.${trait.key}.claim`) }}
          <template v-if="trait.demo || trait.repo">
            <span class="about-content__arrow" aria-hidden="true">
              <AppIcon name="arrow-right" :size="14" />
            </span>
            <a
              :href="trait.demo ?? trait.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="about-content__proof"
            >
              {{ splitLastWord($t(`about.traits.${trait.key}.proof`)).head
              }}<span class="about-content__proof-tail"
                >{{ splitLastWord($t(`about.traits.${trait.key}.proof`)).tail
                }}<AppIcon name="arrow-up-right" :size="13"
              /></span>
              <span class="sr-only">({{ $t("contact.newTab") }})</span>
            </a>
            <template v-if="trait.demo && trait.repo">
              <span class="about-content__sep" aria-hidden="true">·</span>
              <a
                :href="trait.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="about-content__code"
              >
                {{ $t("projects.viewCode")
                }}<span class="sr-only"
                  >: {{ $t(`about.traits.${trait.key}.proof`) }} ({{
                    $t("contact.newTab")
                  }})</span
                >
              </a>
            </template>
          </template>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// Imports
import { TRAITS } from "../constants";

// Component Options

// Props and Emits

// Composition API Helpers

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
// The last word travels with the ↗ icon so the icon never wraps onto a line alone
function splitLastWord(text: string) {
  const index = text.lastIndexOf(" ") + 1;
  return { head: text.slice(0, index), tail: text.slice(index) };
}
</script>

<style lang="sass" scoped>
// Rendered about.md, shared by the About section and the hero terminal. Prose stays
// in the body face; the markdown syntax is mono amber. Each block carries --i so a
// parent can reveal them in order
.about-content
  display: flex
  flex-direction: column
  gap: 14px
  padding-left: 22px
  @media (max-width: $bp-sm - 1)
    padding-left: 0
  p
    margin: 0
    color: $text-muted
    line-height: 1.75
    font-size: 1rem

  &__mark
    font-family: $font-mono
    font-weight: 400
    color: $accent
    text-shadow: 0 0 8px rgba($accent, 0.45)
    user-select: none

  &__heading
    margin: 6px 0 4px
    font-family: $font-display
    font-size: clamp(1.6rem, 3.4vw, 2.4rem)
    font-weight: 700
    line-height: 1.15
    letter-spacing: -0.015em
    text-wrap: balance
    color: $white
    .about-content__mark
      font-size: 0.6em
      vertical-align: 0.25em
      margin-right: 6px

  &__traits
    list-style: none
    padding: 0
    margin: 4px 0 0
    display: grid
    gap: 8px

  &__trait
    display: flex
    gap: 10px
    font-family: $font-mono
    font-size: 0.85rem
    line-height: 1.6
    color: $white

  &__arrow
    display: inline-flex
    vertical-align: -2px
    margin: 0 4px
    color: $gray-600

  // Markdown link: the proof reads as amber link text, underlined like the footer's
  &__proof
    color: $accent
    text-decoration: underline
    text-decoration-color: rgba($accent, 0.35)
    text-underline-offset: 3px
    transition: text-decoration-color $transition-fast
    .app-icon
      margin-left: 4px
      vertical-align: -1px
    &:hover
      text-decoration-color: $accent

  &__proof-tail
    white-space: nowrap

  &__sep
    margin: 0 6px
    color: $gray-600

  // The repo is the secondary proof: muted until hovered, like the project cards' Code link
  &__code
    color: $text-muted
    text-decoration: underline
    text-decoration-color: rgba($text-muted, 0.35)
    text-underline-offset: 3px
    transition: color $transition-fast, text-decoration-color $transition-fast
    &:hover
      color: $accent
      text-decoration-color: $accent
</style>
