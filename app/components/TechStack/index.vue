<template>
  <section id="stack" ref="sectionRef" class="stack">
    <div class="stack__intro">
      <h2 class="section-heading">{{ $t("stack.heading") }}</h2>
      <p class="section-subheading">{{ $t("stack.sub") }}</p>
    </div>

    <div
      class="stack__terminal-wrap animate__animated"
      v-intersect="{ enterClass: 'animate__fadeInUp', threshold: 0.1 }"
    >
      <TerminalWindow title="angel@dev: ~/stack" class="stack__window">
        <p class="terminal__line">
          <span class="terminal__prompt">$</span>
          <span class="terminal__cmd">
            <span class="stack__cmd-static">cat package.json</span>
            <span class="stack__cmd-scene">less package.json</span>
          </span>
        </p>
        <div class="stack__json">
          <span class="stack__punct" aria-hidden="true">{</span>
          <div class="stack__viewport">
            <dl ref="trackRef" class="stack__groups">
              <div
                v-for="(category, index) in CATEGORIES"
                :key="category"
                class="stack__group"
                :class="{ 'stack__group--active': activeIndex === index }"
              >
                <dt class="stack__key">
                  <span aria-hidden="true">"</span
                  >{{ $t(`stack.categories.${category}`)
                  }}<span aria-hidden="true">":</span
                  ><span class="stack__punct stack__bracket-key" aria-hidden="true">
                    [</span
                  >
                </dt>
                <dd class="stack__value">
                  <span
                    class="stack__punct stack__bracket stack__bracket--open"
                    aria-hidden="true"
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
                        :class="{ 'stack__logo--on-dark': tech.onDark }"
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
          </div>
          <span class="stack__punct" aria-hidden="true">}</span>
        </div>

        <p class="stack__pager" aria-hidden="true">
          <span>
            package.json
            <span class="stack__pager-pos"
              >{{ activeIndex + 1 }}/{{ CATEGORIES.length }}
              ({{ Math.round(progress * 100) }}%)</span
            >
          </span>
          <span class="stack__pager-hint">
            {{ $t("stack.scroll") }}
            <AppIcon name="arrow-down" :size="14" />
          </span>
        </p>
      </TerminalWindow>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TECH_LIST, CATEGORIES } from "./constants";
import type { Tech, TechCategory } from "./constants";

// Component Options

// Props and Emits

// Composition API Helpers
const { locale } = useI18n();

// Reactive Variables
const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const progress = ref(0);
let mm: gsap.MatchMedia | null = null;

// Must match $scene in the <style> block: the pinned horizontal scroll only runs
// where it has room and the visitor accepts motion; elsewhere the block is static
const SCENE_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

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

const activeIndex = computed(() =>
  Math.round(progress.value * (CATEGORIES.length - 1)),
);

// Watchers
// Translated keys and copy change the widths and the page height above the pin
watch(locale, () => nextTick(() => ScrollTrigger.refresh()));

// Lifecycle Hooks
onMounted(() => {
  const section = sectionRef.value;
  const track = trackRef.value;
  if (!section || !track) return;

  gsap.registerPlugin(ScrollTrigger);

  // matchMedia builds the pin only while SCENE_QUERY matches and reverts it
  // (inline styles and pin spacer included) when it stops matching
  mm = gsap.matchMedia();
  mm.add(SCENE_QUERY, () => {
    const distance = () =>
      Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? 0));

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.value = self.progress;
        },
      },
    });

    return () => {
      progress.value = 0;
    };
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
});

onUnmounted(() => {
  // Reverts only this component's tween and ScrollTrigger
  mm?.revert();
});

// Methods
</script>

<style lang="sass" scoped>
// Must match SCENE_QUERY in the script
$scene: "(min-width: #{$bp-lg}) and (prefers-reduced-motion: no-preference)"

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

.stack__cmd-scene
  display: none

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

.stack__logo--on-dark
  border-radius: 50%
  box-shadow: 0 0 0 1.5px rgba($white, 0.55)

.stack__pager,
.stack__bracket-key
  display: none

// Pinned horizontal scroll: the section fills the viewport, the terminal fills
// the rest, and the JSON keys become columns that GSAP slides sideways
@media #{$scene}
  .stack
    height: 100vh
    display: flex
    flex-direction: column
    padding-top: clamp(84px, 11vh, 100px)
    padding-bottom: clamp(20px, 4vh, 40px)

  .stack__intro,
  .stack__terminal-wrap
    width: 100%
    max-width: 1240px

  .stack__intro
    flex-shrink: 0
    margin-bottom: min(28px, 3vh)
    // Short laptop screens (720–800px tall) need the room for the columns
    .section-heading
      font-size: clamp(2.25rem, 6vh, 4rem)

  .stack__terminal-wrap
    flex: 1
    min-height: 0
    display: flex

  .stack__window
    flex: 1
    display: flex
    flex-direction: column
    min-height: 0
    :deep(.terminal__body)
      flex: 1
      min-height: 0

  .stack__cmd-static
    display: none

  .stack__cmd-scene
    display: inline

  .stack__json
    flex: 1
    min-height: 0
    display: flex
    flex-direction: column
    font-size: 1rem

  .stack__viewport
    flex: 1
    min-height: 0
    overflow: hidden
    display: flex
    align-items: center
    // Columns fade out at the edges instead of being cut mid-glyph
    mask-image: linear-gradient(to right, transparent, #000 32px, #000 calc(100% - 48px), transparent)

  .stack__groups
    display: flex
    align-items: flex-start
    gap: 0
    margin: 12px 0
    will-change: transform

  .stack__group
    display: flex
    flex-direction: column
    flex: 0 0 clamp(320px, 36vw, 500px)
    padding: 0 48px 0 0
    & + .stack__group
      padding-left: 40px
      border-left: 1px dashed $border

  // The column in view reads as the "current line"; others stay AA-readable
  .stack__key
    font-size: 1.35rem
    color: $gray-600
    text-shadow: none
    transition: color $transition-base, text-shadow $transition-base

  .stack__group--active .stack__key
    color: $accent
    text-shadow: 0 0 10px rgba($accent, 0.5)

  .stack__bracket-key
    display: inline

  .stack__bracket--open
    display: none

  .stack__value
    flex-direction: column
    align-items: flex-start
    gap: 10px
    margin-top: 12px

  .stack__list
    flex-direction: column
    align-items: flex-start
    gap: clamp(6px, 1.1vh, 16px)
    padding-left: 2ch

  .stack__item
    gap: 14px
    font-size: 1.1rem
    color: $text-muted
    transition: color $transition-base

  .stack__group--active .stack__item
    color: $white

  .stack__logo
    width: 28px
    height: 28px

  // Inverse status line of a pager like `less`
  .stack__pager
    display: flex
    justify-content: space-between
    gap: 16px
    margin: 0
    padding: 3px 10px
    font-family: $font-mono
    font-size: 0.8rem
    background: $accent
    color: $dark-navy

  .stack__pager-pos
    margin-left: 12px

  .stack__pager-hint
    display: inline-flex
    align-items: center
    gap: 6px
</style>
