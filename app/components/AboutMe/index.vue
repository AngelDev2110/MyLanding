<template>
  <section id="about" class="about">
    <div class="about__inner">
      <div
        class="about__content animate__animated"
        v-intersect="{
          enterClass: 'animate__fadeInLeft',
          threshold: 0.2,
        }"
      >
        <p class="section-label">{{ $t("about.label") }}</p>
        <h2 class="section-heading">{{ $t("about.heading") }}</h2>

        <div class="about__bio">
          <p>{{ $t("about.bio1") }}</p>
          <p>{{ $t("about.bio2") }}</p>
          <p>{{ $t("about.bio3") }}</p>
        </div>

        <ul class="about__traits">
          <li v-for="trait in TRAITS" :key="trait" class="about__trait">
            <span class="about__trait-icon">▹</span>
            {{ $t(`about.traits.${trait}`) }}
          </li>
        </ul>

        <div class="about__open-badge">
          <span class="about__open-dot" />
          {{ $t("openToWork") }}
        </div>
      </div>

      <div
        class="about__photo-wrap animate__animated"
        v-intersect="{
          enterClass: 'animate__fadeInRight',
          threshold: 0.2,
        }"
      >
        <div class="about__photo-container">
          <img
            src="/img/meFormal.jpeg"
            alt="Angel De La Torre"
            class="about__photo"
          />
          <div class="about__photo-overlay" />
        </div>
        <div class="about__photo-border" />

        <div class="about__chip about__chip--top">
          <span class="about__chip-dot" />
          Frontend Dev
        </div>
        <div class="about__chip about__chip--bottom">
          <span class="about__chip-dot" />
          México 🇲🇽
        </div>
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
</script>

<style lang="sass" scoped>
.about
  background: $surface
  position: relative
  overflow: hidden

  &::before
    content: ''
    position: absolute
    top: -200px
    right: -200px
    width: 500px
    height: 500px
    background: radial-gradient(circle, $accent-dim 0%, transparent 70%)
    pointer-events: none

  &__inner
    display: flex
    flex-direction: column
    gap: 60px
    align-items: center
    @media (min-width: $bp-lg)
      flex-direction: row
      gap: 80px
      align-items: center

  &__content
    flex: 1
    max-width: 560px
    animation-fill-mode: both

  &__bio
    margin: 28px 0
    display: flex
    flex-direction: column
    gap: 16px
    p
      color: $text-muted
      line-height: 1.8
      font-size: 1rem
      margin: 0

  &__traits
    list-style: none
    padding: 0
    margin: 0 0 32px
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 12px
    @media (min-width: $bp-sm)
      grid-template-columns: 1fr 1fr

  &__trait
    display: flex
    align-items: flex-start
    gap: 10px
    font-family: $font-mono
    font-size: 0.82rem
    color: $text-muted
    line-height: 1.4

  &__trait-icon
    color: $accent
    flex-shrink: 0
    margin-top: 1px

  &__open-badge
    display: inline-flex
    align-items: center
    gap: 10px
    background: $accent-dim
    border: 1px solid $accent-glow
    color: $accent
    font-family: $font-mono
    font-size: 0.8rem
    padding: 8px 18px
    border-radius: 100px
    letter-spacing: 0.04em

  &__open-dot
    width: 8px
    height: 8px
    background: $accent
    border-radius: 50%
    animation: pulse 2s ease infinite

  &__photo-wrap
    position: relative
    flex-shrink: 0
    animation-fill-mode: both
    overflow: visible
    @media (min-width: $bp-lg)
      margin-left: auto

  &__photo-container
    width: 300px
    height: 360px
    border-radius: 20px
    overflow: hidden
    position: relative
    @media (min-width: $bp-md)
      width: 340px
      height: 400px

  &__photo
    width: 100%
    height: 100%
    object-fit: cover
    object-position: top center
    transition: transform $transition-slow
    &:hover
      transform: scale(1.04)

  &__photo-overlay
    position: absolute
    inset: 0
    background: linear-gradient(to top, rgba($surface, 0.4) 0%, transparent 60%)
    pointer-events: none

  &__photo-border
    position: absolute
    inset: 0
    width: 300px
    height: 360px
    border-radius: 20px
    border: 2px solid $accent
    top: 14px
    left: 14px
    z-index: -1
    // Hidden on small screens to avoid horizontal overflow
    display: none
    @media (min-width: $bp-md)
      display: block
      width: 340px
      height: 400px

  &__chip
    position: absolute
    display: flex
    align-items: center
    gap: 8px
    background: rgba($dark-navy, 0.9)
    backdrop-filter: blur(12px)
    border: 1px solid $border
    color: $white
    font-family: $font-mono
    font-size: 0.78rem
    padding: 8px 16px
    border-radius: 100px
    white-space: nowrap
    &--top
      top: -16px
      right: -20px
      @media (max-width: $bp-md)
        right: 0
    &--bottom
      bottom: 20px
      left: -30px
      @media (max-width: $bp-md)
        left: 0

  &__chip-dot
    width: 7px
    height: 7px
    background: $accent
    border-radius: 50%
    animation: pulse 2.5s ease infinite

@keyframes pulse
  0%, 100%
    opacity: 1
    box-shadow: 0 0 0 0 $accent-glow
  50%
    opacity: 0.7
    box-shadow: 0 0 0 6px transparent
</style>
