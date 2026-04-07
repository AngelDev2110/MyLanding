<template>
  <div id="stack" ref="wrapperRef" class="tech-stack-wrapper">
    <div class="tech-stack-progress">
      <div
        class="tech-stack-progress__bar"
        :style="{ width: `${progress * 100}%` }"
      />
    </div>

    <div class="tech-stack-pin">
      <div class="tech-stack__header">
        <p class="section-label">{{ $t("stack.label") }}</p>
        <h2 class="section-heading">{{ $t("stack.heading") }}</h2>
        <p class="section-subheading">{{ $t("stack.sub") }}</p>
        <p class="tech-stack__scroll-hint">
          <span class="tech-stack__scroll-hint-arrow">↓</span>
          {{ $t("stack.scroll") }}
        </p>
      </div>

      <div ref="trackRef" class="tech-stack__track">
        <div
          v-for="category in CATEGORIES"
          :key="category"
          class="tech-stack__slide"
        >
          <h3 class="tech-stack__slide-title">
            {{ $t(`stack.categories.${category}`) }}
          </h3>
          <div class="tech-stack__cards">
            <TechCard
              v-for="tech in techByCategory[category]"
              :key="tech.title"
              :title="tech.title"
              :src="tech.src"
              :category="tech.category"
            />
          </div>
        </div>
      </div>

      <div class="tech-stack__dots">
        <div
          v-for="(cat, i) in CATEGORIES"
          :key="cat"
          class="tech-stack__dot"
          :class="{ 'tech-stack__dot--active': activeSlide === i }"
        />
      </div>
    </div>
  </div>

  <section id="stack-mobile" class="tech-stack-mobile">
    <p class="section-label">{{ $t("stack.label") }}</p>
    <h2 class="section-heading">{{ $t("stack.heading") }}</h2>
    <p class="section-subheading">{{ $t("stack.sub") }}</p>
    <div
      v-for="category in CATEGORIES"
      :key="category"
      class="tech-stack-mobile__group"
    >
      <h3 class="tech-stack-mobile__group-title">
        {{ $t(`stack.categories.${category}`) }}
      </h3>
      <div class="tech-stack-mobile__cards">
        <TechCard
          v-for="tech in techByCategory[category]"
          :key="tech.title"
          :title="tech.title"
          :src="tech.src"
          :category="tech.category"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TECH_LIST, CATEGORIES } from "./constants";
import type { TechCategory } from "./constants";

// Component Options

// Props and Emits

// Composition API Helpers

// Reactive Variables
const wrapperRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const progress = ref(0);
const activeSlide = ref(0);
let scrollTriggerInstance: ReturnType<typeof ScrollTrigger.create> | null =
  null;
let tween: gsap.core.Tween | null = null;

// Computed Properties
const techByCategory = computed(() =>
  CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = TECH_LIST.filter((t) => t.category === cat);
      return acc;
    },
    {} as Record<TechCategory, typeof TECH_LIST>,
  ),
);

// Watchers

// Lifecycle Hooks
onMounted(() => {
  if (typeof window === "undefined") return;

  const mq = window.matchMedia(`(min-width: 1024px)`);
  if (!mq.matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const track = trackRef.value;
  const wrapper = wrapperRef.value;
  if (!track || !wrapper) return;

  const slides = track.querySelectorAll<HTMLElement>(".tech-stack__slide");
  const totalSlides = slides.length;
  const slideWidth = window.innerWidth;
  const totalTrackWidth = slideWidth * totalSlides;
  const scrollDistance = totalTrackWidth - slideWidth;

  gsap.set(track, { width: totalTrackWidth });

  tween = gsap.to(track, {
    x: -scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: () => `+=${scrollDistance}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        progress.value = self.progress;
        activeSlide.value = Math.round(self.progress * (totalSlides - 1));
      },
    },
  });
});

onUnmounted(() => {
  tween?.kill();
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<style lang="sass" scoped>
.tech-stack-wrapper
  position: relative
  background: $dark-navy
  display: none
  @media (min-width: $bp-lg)
    display: block

.tech-stack-progress
  position: fixed
  top: 68px
  left: 0
  right: 0
  height: 2px
  background: $border
  z-index: $z-navbar - 1
  &__bar
    height: 100%
    background: $accent
    transition: width 0.1s linear

.tech-stack-pin
  width: 100vw
  height: 100vh
  overflow: hidden
  position: relative
  display: flex
  flex-direction: column
  padding: 80px 100px 40px

.tech-stack__header
  flex-shrink: 0
  margin-bottom: 48px
  .section-heading
    margin-bottom: 10px
  .section-subheading
    margin-bottom: 0

.tech-stack__scroll-hint
  display: flex
  align-items: center
  gap: 8px
  margin-top: 16px
  font-family: $font-mono
  font-size: 0.75rem
  color: $gray-600
  letter-spacing: 0.08em
  animation: hintBounce 2s ease infinite

  &-arrow
    animation: arrowDown 1.5s ease infinite

.tech-stack__track
  display: flex
  align-items: flex-start
  flex: 1

.tech-stack__slide
  width: 100vw
  flex-shrink: 0
  padding-right: 100px

.tech-stack__slide-title
  font-family: $font-lora
  font-size: clamp(1.4rem, 2.5vw, 2rem)
  color: $white
  margin: 0 0 32px
  position: relative
  &::after
    content: ''
    display: block
    width: 40px
    height: 2px
    background: $accent
    margin-top: 10px

.tech-stack__cards
  display: flex
  flex-wrap: wrap
  gap: 16px

.tech-stack__dots
  display: flex
  justify-content: center
  gap: 10px
  padding-top: 20px
  flex-shrink: 0

.tech-stack__dot
  width: 8px
  height: 8px
  border-radius: 50%
  background: $border
  border: none
  transition: all $transition-fast
  padding: 0
  &--active
    background: $accent
    transform: scale(1.3)

.tech-stack-mobile
  background: $dark-navy
  display: block
  @media (min-width: $bp-lg)
    display: none

  .section-heading
    margin-bottom: 10px

  &__group
    margin-top: 48px

  &__group-title
    font-family: $font-lora
    font-size: 1.4rem
    color: $white
    margin: 0 0 24px
    &::after
      content: ''
      display: block
      width: 32px
      height: 2px
      background: $accent
      margin-top: 8px

  &__cards
    display: flex
    flex-wrap: wrap
    gap: 14px

@keyframes hintBounce
  0%, 100%
    opacity: 0.5
  50%
    opacity: 1

@keyframes arrowDown
  0%, 100%
    transform: translateY(0)
  50%
    transform: translateY(4px)
</style>
