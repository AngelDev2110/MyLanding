<template>
  <svg
    class="app-icon"
    :width="props.size ?? 18"
    :height="props.size ?? 18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in ICON_PATHS[props.name]" :key="i" :d="d" />
  </svg>
</template>

<script lang="ts" setup>
// Imports
import type { Props } from "./AppIcon.d.ts";
import { ICON_PATHS } from "./constants";

// Component Options

// Props and Emits
const props = defineProps<Props>();

// Composition API Helpers

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.app-icon
  display: inline-block
  flex-shrink: 0
  vertical-align: middle
</style>
