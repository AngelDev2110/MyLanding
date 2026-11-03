<template>
  <component :is="props.component" class="appearing-text">
    <template v-for="(word, index) in words" :key="index">
      <span
        :style="{
          animationDelay: `${(props.delay ?? 0) + index * 0.1}s`,
        }"
        >{{ word }}</span
      >{{ index < words.length - 1 ? " " : "" }}
    </template>
  </component>
</template>

<script lang="ts" setup>
// Imports
import type { Props } from "./AppearingText.d.ts";

// Component Options

// Props and Emits
const props = defineProps<Props>();

// Composition API Helpers

// Reactive Variables

// Computed Properties
const words = computed(() => props.text.split(" "));

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
// Real spaces, not flex gap: otherwise copy/paste loses the spaces between words
.appearing-text
  span
    opacity: 0
    transform: translateY(15px)
    display: inline-block
    animation: wordUp 0.7s cubic-bezier(.22,1,.36,1) forwards

@keyframes wordUp
  to
    opacity: 1
    transform: translateY(0)
</style>
