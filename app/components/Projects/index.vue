<template>
  <section id="projects" class="projects">
    <div class="projects__intro">
      <p class="section-label">{{ $t("projects.label") }}</p>
      <h2 class="section-heading">{{ $t("projects.heading") }}</h2>
      <p class="section-subheading">{{ $t("projects.sub") }}</p>
    </div>

    <div class="projects__grid">
      <ProjectsProjectCard
        v-for="project in PROJECTS"
        :key="project.title"
        v-bind="project"
      />
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
    image: PROJECT_LINKS[index]?.image ?? null,
  })),
);

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.projects
  background: $surface
  position: relative

  &__intro
    max-width: 600px
    margin-bottom: 56px

  &__grid
    display: grid
    grid-template-columns: 1fr
    gap: 28px
    @media (min-width: $bp-md)
      grid-template-columns: repeat(2, 1fr)
</style>
