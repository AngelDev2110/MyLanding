<template>
  <div
    ref="cardRef"
    class="tech-card animate__animated"
    v-intersect="{
      enterClass: 'animate__fadeInUp',
      threshold: 0.3,
    }"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    :style="cardStyle"
  >
    <div class="tech-card__glow" :style="glowStyle" />
    <img :src="`/img/${props.src}`" :alt="props.title" class="tech-card__image" />
    <span class="tech-card__title">{{ props.title }}</span>
  </div>
</template>

<script lang="ts" setup>
// Imports
import type { Props } from "./TechCard.d.ts";

// Component Options

// Props and Emits
const props = defineProps<Props>();

// Composition API Helpers

// Reactive Variables
const cardRef = ref<HTMLElement | null>(null);
const rotateX = ref(0);
const rotateY = ref(0);
const glowX = ref(50);
const glowY = ref(50);

// Computed Properties
const cardStyle = computed(() => ({
  transform: `perspective(600px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(1.04,1.04,1.04)`,
}));

const glowStyle = computed(() => ({
  background: `radial-gradient(circle at ${glowX.value}% ${glowY.value}%, rgba(100,255,218,0.15), transparent 70%)`,
}));

// Watchers

// Lifecycle Hooks

// Methods
function onMouseMove(e: MouseEvent) {
  const card = cardRef.value;
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  rotateY.value = ((x - centerX) / centerX) * 8;
  rotateX.value = -((y - centerY) / centerY) * 8;
  glowX.value = (x / rect.width) * 100;
  glowY.value = (y / rect.height) * 100;
}

function onMouseLeave() {
  rotateX.value = 0;
  rotateY.value = 0;
  glowX.value = 50;
  glowY.value = 50;
}
</script>

<style lang="sass" scoped>
.tech-card
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 12px
  background: $surface-card
  backdrop-filter: blur(10px)
  border-radius: 16px
  border: 1px solid $border
  padding: 28px 24px
  width: 130px
  cursor: default
  transition: transform $transition-base, border-color $transition-fast, box-shadow $transition-base
  animation-fill-mode: both
  overflow: hidden
  &:hover
    border-color: rgba(100, 255, 218, 0.35)
    box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(100,255,218,0.08)

  &__glow
    position: absolute
    inset: 0
    border-radius: inherit
    pointer-events: none
    opacity: 0
    transition: opacity $transition-fast
  &:hover &__glow
    opacity: 1

  &__image
    width: 40px
    height: 40px
    object-fit: contain

  &__title
    font-family: $font-mono
    font-size: 0.78rem
    color: $text-muted
    letter-spacing: 0.03em
    text-align: center
    transition: color $transition-fast
  &:hover &__title
    color: $accent
</style>
