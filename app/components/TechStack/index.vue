<template>
  <section id="stack" class="stack">
    <div class="stack__intro">
      <h2 class="section-heading">{{ $t("stack.heading") }}</h2>
      <p class="section-subheading">{{ $t("stack.sub") }}</p>
    </div>

    <div
      class="stack__terminal-wrap animate__animated"
      v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.1 }"
    >
      <TerminalWindow title="angel@dev: ~/stack">
        <p class="terminal__line">
          <span class="terminal__prompt">$</span>
          <span class="terminal__cmd">cat package.json</span>
        </p>
        <div class="stack__json">
          <span class="stack__punct" aria-hidden="true">{</span>
          <dl class="stack__groups">
            <div
              v-for="(category, index) in CATEGORIES"
              :key="category"
              class="stack__group"
            >
              <dt class="stack__key">
                <span aria-hidden="true">"</span
                >{{ $t(`stack.categories.${category}`)
                }}<span aria-hidden="true">":</span>
              </dt>
              <dd class="stack__value">
                <span class="stack__punct stack__bracket" aria-hidden="true"
                  >[</span
                >
                <ul class="stack__list">
                  <li
                    v-for="(tech, i) in techByCategory[category]"
                    :key="tech.title"
                    class="stack__item"
                  >
                    <img
                      :src="`/img/${tech.src}`"
                      alt=""
                      width="18"
                      height="18"
                      class="stack__logo"
                    />
                    <span
                      >{{ tech.title
                      }}<span
                        v-if="i < techByCategory[category].length - 1"
                        class="stack__punct"
                        aria-hidden="true"
                        >,</span
                      ></span
                    >
                  </li>
                </ul>
                <span class="stack__punct stack__bracket" aria-hidden="true"
                  >]{{ index < CATEGORIES.length - 1 ? "," : "" }}</span
                >
              </dd>
            </div>
          </dl>
          <span class="stack__punct" aria-hidden="true">}</span>
        </div>
      </TerminalWindow>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import { TECH_LIST, CATEGORIES } from "./constants";
import type { Tech, TechCategory } from "./constants";

// Component Options

// Props and Emits

// Composition API Helpers

// Reactive Variables

// Computed Properties
const techByCategory = computed(() =>
  CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = TECH_LIST.filter((t) => t.category === cat);
      return acc;
    },
    {} as Record<TechCategory, Tech[]>,
  ),
);

// Watchers

// Lifecycle Hooks

// Methods
</script>

<style lang="sass" scoped>
.stack
  background: $dark-navy

.stack__intro
  max-width: 880px
  margin: 0 auto 40px
  .section-heading
    margin-bottom: 10px
  .section-subheading
    margin-bottom: 0

.stack__terminal-wrap
  max-width: 880px
  margin: 0 auto
  animation-fill-mode: both

.stack__json
  font-family: $font-mono
  font-size: 0.9rem
  line-height: 1.6
  color: $white

.stack__punct
  color: $gray-600

// On narrow screens the arrays wrap; lone "[" / "]" lines would only add noise
.stack__bracket
  display: none
  @media (min-width: $bp-md)
    display: inline

.stack__groups
  margin: 4px 0
  padding-left: 2ch
  display: grid
  gap: 14px
  @media (min-width: $bp-md)
    grid-template-columns: max-content 1fr
    gap: 10px 2ch

// Each row is key + value; on md+ the rows share the grid columns so the arrays align
.stack__group
  @media (min-width: $bp-md)
    display: contents

.stack__key
  color: $accent
  text-shadow: 0 0 8px rgba($accent, 0.45)
  white-space: nowrap

.stack__value
  margin: 2px 0 0
  padding-left: 2ch
  display: flex
  flex-wrap: wrap
  align-items: baseline
  gap: 6px 10px
  @media (min-width: $bp-md)
    margin: 0
    padding-left: 0

.stack__list
  display: flex
  flex-wrap: wrap
  align-items: baseline
  gap: 6px 10px
  margin: 0
  padding: 0
  list-style: none

.stack__item
  display: inline-flex
  align-items: center
  gap: 8px
  white-space: nowrap

.stack__logo
  width: 18px
  height: 18px
  object-fit: contain
  flex-shrink: 0
</style>
