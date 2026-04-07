<template>
  <section id="experience" class="experience">
    <div class="experience__intro">
      <p class="section-label">{{ $t("experience.label") }}</p>
      <h2 class="section-heading">{{ $t("experience.heading") }}</h2>
      <p class="section-subheading">{{ $t("experience.sub") }}</p>
    </div>

    <div class="experience__timeline">
      <div class="experience__line">
        <div
          ref="lineRef"
          class="experience__line-fill"
          :class="{ 'experience__line-fill--active': lineStarted }"
        />
      </div>

      <ExperienceExperienceEntry
        v-for="(entry, index) in EXPERIENCE"
        :key="entry.role"
        :entry="entry"
        :index="index"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import { useIntersectionObserver } from "@vueuse/core";
import type { ExperienceEntry } from "./constants";

// Component Options

// Props and Emits

// Composition API Helpers
const { tm, rt } = useI18n();

// Reactive Variables
const lineRef = ref<HTMLElement | null>(null);
const lineStarted = ref(false);

// Computed Properties
const EXPERIENCE = computed<ExperienceEntry[]>(() =>
  (tm("experience.entries") as any[]).map((entry) => ({
    role: rt(entry.role),
    period: rt(entry.period),
    type: rt(entry.type),
    highlights: (entry.highlights as any[]).map((h) => rt(h)),
    tags: (entry.tags as any[]).map((tag) => rt(tag)),
  })),
);

// Watchers

// Lifecycle Hooks
useIntersectionObserver(
  lineRef,
  ([entry]) => {
    if (entry && entry.isIntersecting) lineStarted.value = true;
  },
  { threshold: 0.2 },
);

// Methods
</script>

<style lang="sass" scoped>
.experience
  background: $surface
  position: relative

  &__intro
    max-width: 600px
    margin-bottom: 72px

  &__timeline
    position: relative
    padding-bottom: 20px

  &__line
    position: absolute
    left: 50%
    top: 8px
    bottom: 0
    width: 1px
    background: $border
    transform: translateX(-50%)
    overflow: hidden
    @media (max-width: $bp-md)
      left: 0

  &__line-fill
    width: 100%
    background: linear-gradient(to bottom, $accent, rgba(100,255,218,0.2))
    height: 0
    transition: height 2.5s cubic-bezier(0.16, 1, 0.3, 1)
    &--active
      height: 100%
</style>
