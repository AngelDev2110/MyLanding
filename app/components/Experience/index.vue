<template>
  <section id="experience" class="experience">
    <div class="experience__inner">
      <div class="experience__intro">
        <h2 class="section-heading">{{ $t("experience.heading") }}</h2>
        <p class="section-subheading">{{ $t("experience.sub") }}</p>
      </div>

      <div
        class="experience__terminal-wrap animate__animated"
        v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.1 }"
      >
        <TerminalWindow title="angel@dev: ~/career">
          <p class="terminal__line">
            <span class="terminal__prompt">$</span>
            <span class="terminal__cmd">git log --graph</span>
          </p>
          <ol class="experience__log">
            <ExperienceExperienceEntry
              v-for="entry in EXPERIENCE"
              :key="entry.role"
              :entry="entry"
            />
          </ol>
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import type { ExperienceEntry } from "./constants";

// Component Options

// Props and Emits

// Composition API Helpers
const { tm, rt } = useI18n();

// Reactive Variables

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

// Methods
</script>

<style lang="sass" scoped>
.experience
  background: $surface
  position: relative

  &__inner
    max-width: 880px
    margin: 0 auto

  &__intro
    max-width: 600px
    margin-bottom: 40px

  &__terminal-wrap
    animation-fill-mode: both

  &__log
    list-style: none
    margin: 4px 0 0
    padding: 0
</style>
