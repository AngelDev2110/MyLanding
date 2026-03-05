<template>
  <component :is="props.component" class="appearing-text">
    <span
      v-for="(word, index) in words"
      :key="index"
      :style="{
        animationDelay: `${(props.delay ?? 0) + index * 0.1}s`,
      }"
    >
      {{ word }}
    </span>
  </component>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { props } from "./AppearingText.d.ts";

const props = defineProps<props>();

const words = computed(() => props.text.split(" "));
</script>

<style lang="sass" scoped>
.appearing-text
  display: flex
  flex-wrap: wrap
  gap: 0.5rem
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
