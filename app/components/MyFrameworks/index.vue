<template>
  <section class="my-frameworks">
    <h2 class="my-frameworks__title">{{ $t("myFrameworks") }}</h2>
    <div class="my-frameworks__cards">
      <FrameworksCard
        v-for="framework in FRAMEWORKS_CONF"
        :key="framework.title"
        :title="framework.title"
        :src="framework.src"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import { FRAMEWORKS_CONF } from "./constants";

// Component Options

// Props and Emits

// Composition API Helpers

// Reactive Variables

// Computed Properties

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.my-frameworks
  width: 100%
  text-align: center
  &__title
    font-size: clamp(1.1rem, 3vw, 1.5rem)
    font-weight: bold
    margin-top: 2rem
  &__cards
    display: flex
    flex-wrap: wrap
    justify-content: center
    gap: 20px
    margin-top: 2rem
</style>
