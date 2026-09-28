<template>
  <section id="hero" ref="heroRef" class="hero">
    <div class="hero__panel" :style="sceneVars">
      <div class="hero__panel-inner">
        <div class="hero__stage">
          <div class="hero__left">
            <div
              class="hero__intro"
              :class="{ 'hero__intro--inactive': terminalActive }"
              :inert="terminalActive || undefined"
            >
              <h1 class="hero__name">
                <AppearingText
                  component="span"
                  :text="nameLines.first"
                  class="hero__name-line"
                />{{ " " }}<AppearingText
                  component="span"
                  :text="nameLines.rest"
                  class="hero__name-line"
                  :delay="0.1"
                />
              </h1>
              <AppearingText
                component="h2"
                :text="$t('myRole')"
                class="hero__role"
                :delay="0.5"
              />
              <p
                class="hero__tagline animate__animated animate__fadeInUp"
                style="animation-delay: 0.5s"
              >
                {{ $t("tagline") }}
              </p>

              <div
                class="hero__ctas animate__animated animate__fadeInUp"
                style="animation-delay: 0.7s"
              >
                <a
                  href="#projects"
                  class="hero__cta hero__cta--primary"
                  @click.prevent="scrollToSection('#projects')"
                >
                  {{ $t("hero.ctaProjects") }}
                  <span class="hero__cta-arrow">
                    <AppIcon name="arrow-right" :size="16" />
                  </span>
                </a>
                <a
                  href="#contact"
                  class="hero__cta hero__cta--secondary"
                  @click.prevent="scrollToSection('#contact')"
                >
                  {{ $t("contact.getInTouch") }}
                </a>
              </div>

              <p
                class="hero__badge animate__animated animate__fadeInUp"
                style="animation-delay: 1s"
              >
                <span class="hero__badge-status">
                  <span class="hero__badge-dot" aria-hidden="true" />
                  {{ $t("hero.availability") }}
                </span>
                <span class="hero__badge-sep" aria-hidden="true">·</span>
                <span>{{ $t("yearsExp") }}</span>
              </p>
            </div>
          </div>

          <div ref="photoWrapRef" class="hero__right">
            <div class="hero__photo-frame" :style="photoStyle">
              <img
                src="/img/me.jpeg"
                :alt="$t('hero.photoAlt')"
                class="hero__photo"
              />
              <div class="hero__photo-glow" />
            </div>
          </div>
        </div>

        <TerminalWindow
          title="angel@dev: ~"
          class="hero__terminal"
          :class="{ 'hero__terminal--inactive': terminalHidden }"
          :inert="terminalHidden || undefined"
        >
          <template #bar>
            <span ref="avatarSlotRef" class="hero__terminal-avatar">
              <img
                v-show="showSlotAvatar"
                src="/img/me.jpeg"
                alt=""
                class="hero__terminal-avatar-img"
              />
            </span>
          </template>
          <template v-for="(step, index) in typedSteps" :key="index">
            <p
              v-if="step.kind === 'cmd'"
              class="terminal__line"
              :class="{ 'hero__terminal-dim': step.dim }"
            >
              <span
                class="terminal__prompt"
                :class="{ 'hero__terminal-pending': !step.started }"
                >$</span
              >
              <span class="hero__type terminal__cmd">
                <span class="hero__type-ghost">{{ step.text }}</span>
                <span class="hero__type-shown" aria-hidden="true"
                  >{{ step.typed
                  }}<span
                    v-if="step.cursor"
                    class="hero__terminal-cursor"
                    :class="{ 'hero__terminal-cursor--paused': !heroInView }"
                    >▮</span
                  ></span
                >
              </span>
            </p>
            <dl
              v-else-if="step.kind === 'now'"
              class="hero__now"
              :class="{ 'hero__terminal-pending': !step.visible }"
            >
              <template v-for="entry in nowEntries" :key="entry.label">
                <dt class="hero__now-key">{{ entry.label }}:</dt>
                <dd class="hero__now-value">{{ entry.value }}</dd>
              </template>
            </dl>
            <p
              v-else
              class="hero__terminal-comment"
              :class="{ 'hero__terminal-pending': !step.visible }"
            >
              <span class="hero__terminal-hash">//</span>
              {{ $t("funnyQuote") }}
            </p>
          </template>
        </TerminalWindow>
      </div>
    </div>

    <div
      class="hero__scroll-indicator"
      :class="{ 'hero__scroll-indicator--hidden': terminalActive }"
      aria-hidden="true"
    >
      <span class="hero__scroll-line" />
      <span class="hero__scroll-text">{{ $t("hero.scroll") }}</span>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Imports

// Component Options

// Props and Emits

// Composition API Helpers
const { scrollY } = useInjectWindowScroll();
const { t } = useI18n();

// Reactive Variables
const heroRef = ref<HTMLElement | null>(null);
const photoWrapRef = ref<HTMLElement | null>(null);
const avatarSlotRef = ref<HTMLElement | null>(null);
const viewportHeight = ref(800);
const heroHeight = ref(Infinity);
const scene = ref(false);
const travel = ref({ dx: 0, dy: 0 });

// Must match $scene in the <style> block: the scroll scene only runs where it
// has room and the visitor accepts motion; everywhere else the hero is static
const SCENE_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const SWITCH_AT = 0.22;
const AVATAR_SIZE = 22;
const FRAME = { width: 280, height: 340, radius: 20 };
// Scroll positions in viewport heights; the 180vh scene leaves 0.8vh of sticky
// scroll, and typing ends at 0.7 so the finished terminal holds before leaving
const RANGES = {
  introOut: [0.08, SWITCH_AT],
  photo: [0.06, 0.32],
  terminalIn: [0.16, 0.3],
  typing: [0.3, 0.7],
} as const;
// Pause, in typed-character units, before each command's output appears
const OUTPUT_WEIGHT = { now: 8, quote: 10 };

// Computed Properties
const nameLines = computed(() => {
  const [first = "", ...rest] = t("myName").split(" ");
  return { first, rest: rest.join(" ") };
});

const nowEntries = computed(() => [
  { label: t("hero.now.locationLabel"), value: t("hero.now.location") },
  { label: t("hero.now.rolesLabel"), value: t("hero.now.roles") },
]);

const scrollInVh = computed(
  () => (scrollY?.value ?? 0) / viewportHeight.value,
);

const terminalActive = computed(
  () => scene.value && scrollInVh.value >= SWITCH_AT,
);
const terminalHidden = computed(() => scene.value && !terminalActive.value);
const heroInView = computed(() => (scrollY?.value ?? 0) < heroHeight.value);

const introProgress = computed(() =>
  scene.value ? easeOutCubic(segment(RANGES.introOut)) : 0,
);

const terminalProgress = computed(() =>
  scene.value ? easeOutCubic(segment(RANGES.terminalIn)) : 1,
);

const photoProgress = computed(() =>
  scene.value ? easeInOutCubic(segment(RANGES.photo)) : 0,
);

const showSlotAvatar = computed(
  () => !scene.value || photoProgress.value >= 1,
);

const sceneVars = computed(() => ({
  "--intro-out": introProgress.value,
  "--terminal-in": terminalProgress.value,
}));

const photoStyle = computed(() => {
  if (!scene.value) return {};
  const p = photoProgress.value;
  const scale = 1 + (AVATAR_SIZE / FRAME.width - 1) * p;
  const inset = ((FRAME.height - FRAME.width) / 2) * p;
  const radius = FRAME.radius + (FRAME.width / 2 - FRAME.radius) * p;
  return {
    transform: `translate(${travel.value.dx * p}px, ${travel.value.dy * p}px) scale(${scale})`,
    clipPath: `inset(${inset}px 0 ${inset}px 0 round ${radius}px)`,
    opacity: p >= 1 ? 0 : 1,
  };
});

const typedSteps = computed(() => {
  const commands = ["cat now.md", "cat philosophy.md", t("terminalCmd")];
  const units = [
    commands[0]!.length,
    OUTPUT_WEIGHT.now,
    commands[1]!.length,
    OUTPUT_WEIGHT.quote,
    commands[2]!.length,
  ];
  const total = units.reduce((sum, unit) => sum + unit, 0);
  let budget = scene.value
    ? Math.round(segment(RANGES.typing) * total)
    : total;

  const spent = units.map((unit) => {
    const used = Math.min(unit, Math.max(budget, 0));
    budget -= unit;
    return used;
  });
  const current = spent.findIndex((used, i) => used < units[i]!);
  // While an output is "running" the cursor waits at the end of its command
  const cursorAt = current === -1 ? 4 : current - (current % 2);

  const command = (commandIndex: number, unitIndex: number) => ({
    kind: "cmd" as const,
    text: commands[commandIndex]!,
    typed: commands[commandIndex]!.slice(0, spent[unitIndex]),
    cursor: cursorAt === unitIndex,
    started: spent[unitIndex]! > 0 || cursorAt === unitIndex,
    dim: unitIndex === 4,
  });
  return [
    command(0, 0),
    { kind: "now" as const, visible: spent[1]! >= units[1]! },
    command(1, 2),
    { kind: "quote" as const, visible: spent[3]! >= units[3]! },
    command(2, 4),
  ];
});

// Watchers

// Lifecycle Hooks
let sceneQuery: MediaQueryList | null = null;

onMounted(() => {
  sceneQuery = window.matchMedia(SCENE_QUERY);
  sceneQuery.addEventListener("change", syncMedia);
  window.addEventListener("resize", measure);
  document.fonts?.ready.then(measure);
  syncMedia();
});

onUnmounted(() => {
  sceneQuery?.removeEventListener("change", syncMedia);
  window.removeEventListener("resize", measure);
});

// Methods
function scrollToSection(selector: string) {
  scrollToSelector(selector);
}

function syncMedia() {
  scene.value = sceneQuery?.matches ?? false;
  // The layout switches with the media query; measure once Vue has re-rendered
  nextTick(measure);
}

function measure() {
  viewportHeight.value = window.innerHeight;
  heroHeight.value = heroRef.value?.offsetHeight ?? Infinity;
  const wrap = photoWrapRef.value?.getBoundingClientRect();
  const slot = avatarSlotRef.value?.getBoundingClientRect();
  if (!wrap || !slot || !wrap.width) return;
  travel.value = {
    dx: slot.left + slot.width / 2 - (wrap.left + wrap.width / 2),
    dy: slot.top + slot.height / 2 - (wrap.top + wrap.height / 2),
  };
}

function segment([from, to]: readonly [number, number]) {
  return Math.min(1, Math.max(0, (scrollInVh.value - from) / (to - from)));
}

function easeOutCubic(x: number) {
  return 1 - (1 - x) ** 3;
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2;
}
</script>

<style lang="sass" scoped>
// Must match SCENE_QUERY in the script
$scene: "(min-width: #{$bp-lg}) and (prefers-reduced-motion: no-preference)"

// Static by default: the intro, then the finished terminal in the flow.
// Only $scene pins the panel and turns the hero into a scroll-driven scene.
.hero
  position: relative
  background: $dark-navy
  padding: 0
  @media #{$scene}
    height: 180vh

.hero__panel
  position: relative
  z-index: 2
  @media #{$scene}
    position: sticky
    top: 0
    height: 100vh
    height: 100svh

.hero__panel-inner
  position: relative
  padding: 0 20px $section-padding-mobile
  @media (min-width: $bp-md)
    padding: 0 60px $section-padding
  @media (min-width: $bp-lg)
    padding: 0 100px $section-padding
  @media #{$scene}
    height: 100%
    padding-bottom: 0

.hero__stage
  display: flex
  align-items: center
  justify-content: space-between
  gap: 48px
  // Clears the fixed 68px navbar without a forced full-screen height, so the
  // terminal peeks in right below the intro instead of after an empty band
  padding: clamp(84px, 14svh, 132px) 0 48px
  @media #{$scene}
    height: 100%
    min-height: 0
    padding: 68px 0

.hero__left
  flex: 1
  min-width: 0

.hero__intro
  &--inactive
    pointer-events: none
  @media #{$scene}
    opacity: calc(1 - var(--intro-out, 0))
    transform: translateY(calc(var(--intro-out, 0) * -24px))

  .hero__name
    font-family: $font-display
    font-size: clamp(2.75rem, 13.5vw, 6rem)
    font-weight: 800
    // Without word-spacing the tight tracking fuses "De La Torre"; line-height 1 clears the "g" descender
    line-height: 1
    letter-spacing: -0.025em
    word-spacing: 0.06em
    margin: 0 0 20px
    color: $white
    @media (min-width: $bp-lg)
      font-size: clamp(5rem, 7vw, 7.5rem)
      margin-bottom: 24px

  .hero__name-line
    display: block

  .hero__role
    font-family: $font-display
    font-size: clamp(1.25rem, 2.4vw, 1.75rem)
    font-weight: 600
    letter-spacing: -0.01em
    margin: 0
    color: $accent

.hero__tagline
  font-family: $font-nunito
  font-size: clamp(1rem, 1.3vw, 1.125rem)
  color: $text-muted
  margin: 14px 0 0
  max-width: 44ch
  line-height: 1.6
  animation-fill-mode: both

.hero__ctas
  display: flex
  gap: 12px 16px
  margin-top: 32px
  flex-wrap: wrap
  animation-fill-mode: both

.hero__cta
  display: inline-flex
  align-items: center
  gap: 8px
  font-family: $font-mono
  font-size: 0.9rem
  text-decoration: none
  padding: 12px 24px
  border-radius: 6px
  transition: background-color $transition-fast, border-color $transition-fast, color $transition-fast
  font-weight: 500
  letter-spacing: 0.02em
  &--primary
    background: $accent
    color: $dark-navy
    border: 1px solid $accent
    &:hover,
    &:focus-visible
      background: transparent
      color: $accent
      .hero__cta-arrow
        transform: translateX(4px)
  &--secondary
    background: transparent
    color: $white
    border: 1px solid $border
    &:hover,
    &:focus-visible
      border-color: $accent
      color: $accent

.hero__cta-arrow
  display: inline-flex
  transition: transform $transition-fast

.hero__badge
  display: inline-flex
  flex-direction: column
  align-items: flex-start
  flex-wrap: wrap
  gap: 4px 8px
  margin: 24px 0 0
  font-family: $font-mono
  font-size: 0.78rem
  color: $text-muted
  border: 1px solid $border
  padding: 6px 14px
  border-radius: 16px
  animation-fill-mode: both
  @media (min-width: $bp-sm)
    flex-direction: row
    align-items: center
  &-status
    display: inline-flex
    align-items: center
    gap: 8px
    color: $white
  &-sep
    color: $gray-700
    display: none
    @media (min-width: $bp-sm)
      display: inline
  &-dot
    width: 7px
    height: 7px
    background: $accent
    border-radius: 50%
    animation: pulse 2s ease infinite

.hero__terminal
  position: relative
  z-index: 2
  max-width: 640px
  @media #{$scene}
    position: absolute
    top: 50%
    left: 50%
    width: min(640px, calc(100% - 40px))
    translate: -50% -50%
    opacity: var(--terminal-in, 0)
    clip-path: inset(0 0 calc((1 - var(--terminal-in, 0)) * 100%) 0 round 14px)
  &--inactive
    pointer-events: none

.hero__terminal-avatar
  display: inline-flex
  align-items: center
  justify-content: center
  width: 26px
  height: 26px
  margin-left: 10px
  border-radius: 50%
  border: 1.5px solid rgba($accent, 0.5)
  flex-shrink: 0

.hero__terminal-avatar-img
  width: 22px
  height: 22px
  border-radius: 50%
  object-fit: cover
  object-position: 75% center

.hero__now
  display: grid
  grid-template-columns: auto 1fr
  gap: 4px 14px
  margin: -6px 0 4px
  padding-left: 22px
  font-family: $font-mono
  font-size: 0.9rem
  line-height: 1.5

.hero__now-key
  color: $accent
  text-shadow: 0 0 8px rgba($accent, 0.45)

.hero__now-value
  margin: 0
  color: $white

.hero__terminal-dim .terminal__cmd
  color: $gray-600

.hero__type
  display: inline-grid

.hero__type-ghost,
.hero__type-shown
  grid-area: 1 / 1

.hero__type-ghost
  color: transparent

.hero__type-shown
  pointer-events: none
  user-select: none

.hero__terminal-pending
  opacity: 0

.hero__terminal-comment
  margin: 6px 0
  font-family: $font-display
  font-size: clamp(1.2rem, 2.5vw, 1.55rem)
  color: $white
  line-height: 1.55

.hero__terminal-hash
  font-family: $font-mono
  color: $accent
  font-size: 1rem
  margin-right: 8px
  opacity: 0.75
  text-shadow: 0 0 8px rgba($accent, 0.45)

.hero__terminal-cursor
  display: inline-block
  color: $accent
  margin-left: 2px
  animation: blink 1.1s step-end infinite
  &--paused
    animation-play-state: paused

.hero__right
  position: relative
  z-index: 3
  flex-shrink: 0
  display: none
  pointer-events: none
  @media (min-width: $bp-lg)
    display: block

.hero__photo-frame
  position: relative
  transform-origin: center
  width: 280px
  height: 340px
  border-radius: 20px
  overflow: hidden
  border: 1px solid $border

.hero__photo
  width: 100%
  height: 100%
  object-fit: cover
  // Landscape photo in a portrait frame: 75% keeps the person in view instead of the bay
  object-position: 75% center

.hero__photo-glow
  position: absolute
  inset: 0
  background: linear-gradient(to top, rgba($dark-navy, 0.55) 0%, transparent 60%)
  pointer-events: none

// Only the scene has something to scroll for. Static line: the availability dot is the page's only live pulse
.hero__scroll-indicator
  display: none
  @media #{$scene}
    display: flex
  position: fixed
  bottom: 40px
  left: 50%
  transform: translateX(-50%)
  flex-direction: column
  align-items: center
  gap: 8px
  opacity: 1
  transition: opacity 0.4s ease
  pointer-events: none
  z-index: 3
  &--hidden
    opacity: 0

.hero__scroll-line
  width: 1px
  height: 48px
  background: linear-gradient(to bottom, $accent, transparent)

.hero__scroll-text
  font-family: $font-mono
  font-size: 0.65rem
  color: $text-muted
  letter-spacing: 0.15em
  text-transform: uppercase

@keyframes pulse
  0%, 100%
    opacity: 1
    transform: scale(1)
  50%
    opacity: 0.5
    transform: scale(0.8)

@keyframes blink
  0%, 100%
    opacity: 1
  50%
    opacity: 0
</style>
