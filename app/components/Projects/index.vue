<template>
  <section id="projects" class="projects">
    <div class="projects__inner">
      <div class="projects__intro">
        <h2 class="section-heading">{{ $t("projects.heading") }}</h2>
        <p class="section-subheading">{{ $t("projects.sub") }}</p>
      </div>

      <p class="projects__prompt" aria-hidden="true">
        <span class="projects__prompt-sign">$</span> ls projects/
      </p>

      <div class="projects__grid">
        <ProjectsProjectCard
          v-for="project in PROJECTS"
          :key="project.title"
          v-bind="project"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import { PROJECT_LINKS } from "./constants";
import type { Props as ProjectCardProps } from "./ProjectCard/ProjectCard.d.ts";

// Component Options

// Props and Emits

// Composition API Helpers
const { tm, rt } = useI18n();

// Reactive Variables

// Computed Properties
const PROJECTS = computed<ProjectCardProps[]>(() =>
  (tm("projects.entries") as any[]).map((entry, index) => ({
    title: rt(entry.title),
    description: rt(entry.description),
    tags: (entry.tags as any[]).map((tag) => rt(tag)),
    link: PROJECT_LINKS[index]?.link ?? "#",
    repo: PROJECT_LINKS[index]?.repo ?? null,
    image: PROJECT_LINKS[index]?.image ?? null,
  })),
);

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.projects
  background: $dark-navy
  position: relative

  &__inner
    max-width: 1140px
    margin: 0 auto

  &__intro
    max-width: 600px
    margin-bottom: 40px

  &__prompt
    margin: 0 0 16px
    font-family: $font-mono
    font-size: 0.95rem
    color: $white

  &__prompt-sign
    color: $accent
    font-weight: 700
    margin-right: 6px
    text-shadow: 0 0 8px rgba($accent, 0.45)

  // One showcase per row: the screenshots get the full width to be legible
  &__grid
    display: grid
    gap: 40px
</style>
