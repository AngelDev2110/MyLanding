<template>
  <div
    class="frameworks-card animate__animated"
    v-intersect="{
      enterClass: 'animate__flipInX',
      threshold: 0.2,
    }"
  >
    <img :src="getImageSrc()" alt="" class="frameworks-card__image" />
    <h3 class="frameworks-card__title">{{ $props.title }}</h3>
  </div>
</template>

<script lang="ts" setup>
// Imports
import type { Props } from "./FrameworksCard";

// Component Options

// Props and Emits
const props = defineProps<Props>();
// Composition API Helpers

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
function getImageSrc() {
  return `/img/${props.src}`;
}
</script>

<style lang="sass" scoped>
.frameworks-card
  display: flex
  align-items: center
  justify-content: center
  gap: 8px
  background-color: rgba(255, 255, 255, 0.25)
  backdrop-filter: blur(10px)
  border-radius: 16px
  border: 1px solid rgba(255, 255, 255, 0.3)
  padding: 24px
  box-shadow: 0 8px 32px rgba(0,0,0,0.1)
  &__image
    width: 35px
    height: 35px
  &__title
    font-size: clamp(1.1rem, 3vw, 1.5rem)
    font-weight: bold
</style>
