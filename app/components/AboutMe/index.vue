<template>
  <section id="about" class="about">
    <div class="about__inner">
      <div
        class="about__terminal-wrap animate__animated"
        v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.1 }"
      >
        <TerminalWindow title="angel@dev: ~">
          <p class="terminal__line">
            <span class="terminal__prompt">$</span>
            <span class="terminal__cmd">cat about.md</span>
          </p>

          <div class="about__md">
            <h2 class="about__heading">
              <span class="about__md-mark" aria-hidden="true">#</span>
              {{ $t("about.heading") }}
            </h2>

            <p>{{ $t("about.bio1") }}</p>
            <p>{{ $t("about.bio2") }}</p>
            <p>{{ $t("about.bio3") }}</p>

            <ul class="about__traits">
              <li v-for="trait in TRAITS" :key="trait.key" class="about__trait">
                <span class="about__md-mark" aria-hidden="true">-</span>
                <span class="about__trait-text">
                  {{ $t(`about.traits.${trait.key}.claim`) }}
                  <span class="about__trait-arrow" aria-hidden="true">
                    <AppIcon name="arrow-right" :size="14" />
                  </span>
                  <a
                    v-if="isExternal(trait.href)"
                    :href="trait.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="about__proof"
                  >
                    {{ splitLastWord($t(`about.traits.${trait.key}.proof`)).head
                    }}<span class="about__proof-tail"
                      >{{ splitLastWord($t(`about.traits.${trait.key}.proof`)).tail
                      }}<AppIcon name="arrow-up-right" :size="13"
                    /></span>
                    <span class="sr-only">({{ $t("contact.newTab") }})</span>
                  </a>
                  <a
                    v-else
                    :href="trait.href"
                    class="about__proof"
                    @click.prevent="scrollToSection(trait.href)"
                  >
                    {{ $t(`about.traits.${trait.key}.proof`) }}
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </TerminalWindow>
      </div>

      <div
        class="about__photo-wrap animate__animated"
        v-intersect="{ enterClass: 'animate__fadeIn', threshold: 0.2 }"
      >
        <img
          src="/img/meFormal.jpeg"
          alt="Angel De La Torre"
          class="about__photo"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import { TRAITS } from "./constants";

// Component Options

// Props and Emits

// Composition API Helpers

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
function scrollToSection(selector: string) {
  scrollToSelector(selector);
}

// The last word travels with the ↗ icon so the icon never wraps onto a line alone
function splitLastWord(text: string) {
  const index = text.lastIndexOf(" ") + 1;
  return { head: text.slice(0, index), tail: text.slice(index) };
}

function isExternal(href: string) {
  return href.startsWith("http");
}
</script>

<style lang="sass" scoped>
.about
  background: $surface
  position: relative

  &__inner
    display: flex
    flex-direction: column
    gap: 48px
    align-items: center
    max-width: 1140px
    margin: 0 auto
    @media (min-width: $bp-lg)
      flex-direction: row
      align-items: flex-start
      gap: 64px

  &__terminal-wrap
    flex: 1
    min-width: 0
    width: 100%
    max-width: 720px
    animation-fill-mode: both

  // Rendered markdown: prose stays in the body face, the markdown syntax in mono amber
  &__md
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

  &__md-mark
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
    .about__md-mark
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

  &__trait-arrow
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

  &__proof-tail
    white-space: nowrap
    &:hover
      text-decoration-color: $accent

  &__photo-wrap
    flex-shrink: 0
    width: min(300px, 100%)
    animation-fill-mode: both
    @media (min-width: $bp-lg)
      width: 320px
      margin-top: 48px

  &__photo
    display: block
    width: 100%
    aspect-ratio: 5 / 6
    object-fit: cover
    object-position: top center
    border-radius: 14px
    border: 1px solid rgba($accent, 0.22)
    // Same edge and depth as the terminal windows, so the photo reads as part of the set
    box-shadow: 0 24px 60px rgba($black, 0.5)
</style>
