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
                component="p"
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
                <span class="hero__badge-meta">
                  <span class="hero__badge-piece">{{ $t("yearsExp") }}</span
                  ><span aria-hidden="true"> · </span
                  ><span class="hero__badge-piece">{{ $t("hero.location") }}</span>
                </span>
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

        <img
          v-if="scene"
          src="/img/meFormal.jpeg"
          alt="Angel De La Torre"
          class="hero__about-photo"
        />

        <TerminalWindow
          title="angel@dev: ~"
          class="hero__terminal"
          :class="{
            'hero__terminal--inactive': terminalHidden,
            'hero__terminal--scrolling': aboutState.cleared && aboutOverflow > 0,
          }"
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
          <div ref="scrollerRef" class="hero__scroller" :style="scrollerStyle">
            <div v-show="!aboutState.cleared" class="hero__lines">
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
                        v-if="step.cursor && !aboutState.started"
                        class="hero__terminal-cursor"
                        :class="{ 'hero__terminal-cursor--paused': !heroInView }"
                        >▮</span
                      ></span
                    >
                  </span>
                </p>
                <p
                  v-else
                  class="hero__terminal-comment"
                  :class="{ 'hero__terminal-pending': !step.visible }"
                >
                  <span class="hero__terminal-hash">//</span>
                  {{ $t("funnyQuote") }}
                </p>
              </template>

              <p v-if="aboutState.started" class="terminal__line">
                <span class="terminal__prompt">$</span>
                <span class="hero__type terminal__cmd">
                  <span class="hero__type-ghost">clear</span>
                  <span class="hero__type-shown" aria-hidden="true"
                    >{{ aboutState.clearTyped
                    }}<span v-if="!aboutState.cleared" class="hero__terminal-cursor"
                      >▮</span
                    ></span
                  >
                </span>
              </p>
            </div>

            <!-- Desktop scene only: the same window goes on to print about.md -->
            <div
              v-if="scene"
              v-show="aboutState.cleared"
              class="hero__about"
              :class="{ 'hero__about--revealed': aboutState.revealed }"
            >
              <p class="terminal__line">
                <span class="terminal__prompt">$</span>
                <span class="hero__type terminal__cmd">
                  <span class="hero__type-ghost">cat about.md</span>
                  <span class="hero__type-shown" aria-hidden="true"
                    >{{ aboutState.catTyped
                    }}<span v-if="!aboutState.revealed" class="hero__terminal-cursor"
                      >▮</span
                    ></span
                  >
                </span>
              </p>
              <AboutMeAboutContent />
            </div>
          </div>
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
const { t, locale } = useI18n();

// Reactive Variables
const heroRef = ref<HTMLElement | null>(null);
const photoWrapRef = ref<HTMLElement | null>(null);
const avatarSlotRef = ref<HTMLElement | null>(null);
const viewportHeight = ref(800);
const heroHeight = ref(Infinity);
const scene = ref(false);
const travel = ref({ dx: 0, dy: 0 });
const typingProgress = ref(0);
const scrollerRef = ref<HTMLElement | null>(null);
// Milliseconds into the about sequence; -1 until it starts
const aboutElapsed = ref(-1);
const aboutOverflow = ref(0);
const smoothY = ref(0);
let typingFrame = 0;
let aboutFrame = 0;
let smoothFrame = 0;

// Must match $scene in the <style> block: the scroll scene only runs where it
// has room and the visitor accepts motion; everywhere else the hero is static
const SCENE_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const SWITCH_AT = 0.3;
const AVATAR_SIZE = 22;
const FRAME = { width: 280, height: 340, radius: 20 };
// Must match the rise in .hero__terminal: the window starts this many px lower
const TERMINAL_RISE = 16;
// Scroll positions in viewport heights; the 360vh scene leaves 2.6vh of sticky
// scroll. Each change spans ~0.3–0.45vh (3–4 wheel notches, since one notch is
// ~0.1vh) so it reads as motion, not a jump. The hero swap is done by 0.52;
// from ABOUT_AT the same window prints
// about.md, slides left into the About layout and, if about.md is taller than
// the window, scrolls its output during the read range.
// The intro is gone before the window opens, so the two never stack; the photo
// shrinks first and travels after, so it lands as an avatar, not a card
const RANGES = {
  introOut: [0.02, SWITCH_AT],
  photoShrink: [0, 0.34],
  photoTravel: [0.08, 0.52],
  terminalIn: [0.2, 0.52],
  aboutIn: [1.2, 1.8],
  read: [1.88, 2.48],
} as const;
// Entering and leaving differ so a small scroll back does not replay the sequence
const ABOUT_AT = 1.24;
const ABOUT_LEAVE = 1.18;
// Time constant of the scroll smoothing: the scene eases toward the real scroll
// position instead of jumping a whole wheel notch per frame (like GSAP's scrub)
const SMOOTHING_MS = 160;
const ABOUT_COMMANDS = { clear: "clear", cat: "cat about.md" };
// Per-character typing and the pauses after `clear` and before the markdown lands
const ABOUT_TIMING = { clearChar: 55, clearHold: 350, catChar: 38, revealHold: 140 };
// Typing runs on its own clock once the terminal is in, so no scroll is spent on
// an empty window; the output pause is counted in typed-character units
const MS_PER_UNIT = 14;
const QUOTE_PAUSE = 8;

// Computed Properties
const nameLines = computed(() => {
  const [first = "", ...rest] = t("myName").split(" ");
  return { first, rest: rest.join(" ") };
});

const scrollInVh = computed(
  () =>
    (scene.value ? smoothY.value : (scrollY?.value ?? 0)) /
    viewportHeight.value,
);

const terminalActive = computed(
  () => scene.value && scrollInVh.value >= SWITCH_AT,
);
const terminalHidden = computed(() => scene.value && !terminalActive.value);
const heroInView = computed(() => (scrollY?.value ?? 0) < heroHeight.value);

const introProgress = computed(() =>
  scene.value ? easeInOutCubic(segment(RANGES.introOut)) : 0,
);

const terminalProgress = computed(() =>
  scene.value ? easeInOutCubic(segment(RANGES.terminalIn)) : 1,
);

const photoShrink = computed(() =>
  scene.value ? easeOutCubic(segment(RANGES.photoShrink)) : 0,
);

const photoTravel = computed(() =>
  scene.value ? easeInOutCubic(segment(RANGES.photoTravel)) : 0,
);

const showSlotAvatar = computed(() => !scene.value || photoTravel.value >= 1);

const aboutIn = computed(() =>
  scene.value ? easeInOutCubic(segment(RANGES.aboutIn)) : 0,
);

const aboutState = computed(() => {
  const elapsed = aboutElapsed.value;
  const { clearChar, clearHold, catChar, revealHold } = ABOUT_TIMING;
  const clearAt = ABOUT_COMMANDS.clear.length * clearChar + clearHold;
  const catEnd = clearAt + ABOUT_COMMANDS.cat.length * catChar;
  const typed = (text: string, since: number, perChar: number) =>
    text.slice(0, Math.max(0, Math.floor((elapsed - since) / perChar)));
  return {
    started: elapsed >= 0,
    clearTyped: typed(ABOUT_COMMANDS.clear, 0, clearChar),
    cleared: elapsed >= clearAt,
    catTyped: typed(ABOUT_COMMANDS.cat, clearAt, catChar),
    revealed: elapsed >= catEnd + revealHold,
  };
});

const scrollerStyle = computed(() =>
  scene.value && aboutState.value.cleared
    ? { transform: `translateY(${-aboutOverflow.value * segment(RANGES.read)}px)` }
    : {},
);

const sceneVars = computed(() => ({
  "--intro-out": introProgress.value,
  "--terminal-in": terminalProgress.value,
  "--about-in": aboutIn.value,
}));

const photoStyle = computed(() => {
  if (!scene.value) return {};
  const s = photoShrink.value;
  const m = photoTravel.value;
  const scale = 1 + (AVATAR_SIZE / FRAME.width - 1) * s;
  const inset = ((FRAME.height - FRAME.width) / 2) * s;
  const radius = FRAME.radius + (FRAME.width / 2 - FRAME.radius) * s;
  return {
    transform: `translate(${travel.value.dx * m}px, ${travel.value.dy * m}px) scale(${scale})`,
    clipPath: `inset(${inset}px 0 ${inset}px 0 round ${radius}px)`,
    opacity: m >= 1 ? 0 : 1,
  };
});

const typedSteps = computed(() => {
  const commands = ["cat philosophy.md", t("terminalCmd")];
  const units = [commands[0]!.length, QUOTE_PAUSE, commands[1]!.length];
  const total = units.reduce((sum, unit) => sum + unit, 0);
  let budget = scene.value ? Math.round(typingProgress.value * total) : total;

  const spent = units.map((unit) => {
    const used = Math.min(unit, Math.max(budget, 0));
    budget -= unit;
    return used;
  });
  const current = spent.findIndex((used, i) => used < units[i]!);
  // While an output is "running" the cursor waits at the end of its command
  const cursorAt = current === -1 ? 2 : current - (current % 2);

  const command = (commandIndex: number, unitIndex: number) => ({
    kind: "cmd" as const,
    text: commands[commandIndex]!,
    typed: commands[commandIndex]!.slice(0, spent[unitIndex]),
    cursor: cursorAt === unitIndex,
    started: spent[unitIndex]! > 0 || cursorAt === unitIndex,
    dim: unitIndex === 2,
  });
  return [
    command(0, 0),
    { kind: "quote" as const, visible: spent[1]! >= units[1]! },
    command(1, 2),
  ];
});

// Watchers
// Starts once, when the terminal is mostly in; scrolling back does not rewind it.
// Watching scene too covers a reload mid-scene, where the progress never changes
watch([terminalProgress, scene], ([progress, isScene]) => {
  if (isScene && progress >= 0.5 && typingProgress.value === 0) startTyping();
});

watch(
  () => scrollY?.value ?? 0,
  () => {
    if (scene.value && !smoothFrame) smoothFrame = requestAnimationFrame(smoothStep);
  },
);

watch(scrollInVh, (vh) => {
  if (!scene.value) return;
  if (vh >= ABOUT_AT && !aboutState.value.started) startAbout();
  else if (vh < ABOUT_LEAVE && aboutState.value.started) resetAbout();
});

watch(
  () => aboutState.value.cleared,
  (cleared) => cleared && nextTick(measureOverflow),
);

watch(scene, (isScene) => {
  if (!isScene) resetAbout();
});

// Translated about.md has a different height, so the scrolled output changes too
watch(locale, () => nextTick(measureOverflow));

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
  cancelAnimationFrame(typingFrame);
  cancelAnimationFrame(aboutFrame);
  cancelAnimationFrame(smoothFrame);
});

// Methods
function scrollToSection(selector: string) {
  scrollToSelector(selector);
}

function syncMedia() {
  scene.value = sceneQuery?.matches ?? false;
  // Snap on load or mode change; only live scrolling is smoothed
  smoothY.value = window.scrollY;
  // The layout switches with the media query; measure once Vue has re-rendered
  nextTick(measure);
}

function measure() {
  viewportHeight.value = window.innerHeight;
  heroHeight.value = heroRef.value?.offsetHeight ?? Infinity;
  const wrap = photoWrapRef.value?.getBoundingClientRect();
  const slot = avatarSlotRef.value?.getBoundingClientRect();
  measureOverflow();
  if (!wrap || !slot || !wrap.width) return;
  // Aim at where the slot ends up once the window has finished rising
  const rise = scene.value ? TERMINAL_RISE * (1 - terminalProgress.value) : 0;
  travel.value = {
    dx: slot.left + slot.width / 2 - (wrap.left + wrap.width / 2),
    dy: slot.top + slot.height / 2 - rise - (wrap.top + wrap.height / 2),
  };
}

function startTyping() {
  const total =
    "cat philosophy.md".length + QUOTE_PAUSE + t("terminalCmd").length;
  const duration = total * MS_PER_UNIT;
  const start = performance.now();
  const tick = (now: number) => {
    typingProgress.value = Math.min(1, (now - start) / duration);
    if (typingProgress.value < 1) typingFrame = requestAnimationFrame(tick);
  };
  typingFrame = requestAnimationFrame(tick);
}

function startAbout() {
  // Scrolling on before the joke finishes skips straight to its end
  cancelAnimationFrame(typingFrame);
  typingProgress.value = 1;
  const { clearChar, clearHold, catChar, revealHold } = ABOUT_TIMING;
  const total =
    ABOUT_COMMANDS.clear.length * clearChar +
    clearHold +
    ABOUT_COMMANDS.cat.length * catChar +
    revealHold;
  const start = performance.now();
  const tick = (now: number) => {
    aboutElapsed.value = now - start;
    if (aboutElapsed.value < total) aboutFrame = requestAnimationFrame(tick);
  };
  aboutElapsed.value = 0;
  aboutFrame = requestAnimationFrame(tick);
}

function resetAbout() {
  cancelAnimationFrame(aboutFrame);
  aboutElapsed.value = -1;
}

// How much taller about.md is than the window body; that much output scrolls
function measureOverflow() {
  const scroller = scrollerRef.value;
  const body = scroller?.parentElement;
  if (!scroller || !body || !aboutState.value.cleared) return;
  const style = getComputedStyle(body);
  const room =
    body.clientHeight -
    parseFloat(style.paddingTop) -
    parseFloat(style.paddingBottom);
  aboutOverflow.value = Math.max(0, scroller.scrollHeight - room);
}

let lastSmoothTime = 0;

function smoothStep(now: number) {
  const target = scrollY?.value ?? 0;
  const dt = lastSmoothTime ? Math.min(now - lastSmoothTime, 64) : 16;
  lastSmoothTime = now;
  smoothY.value += (target - smoothY.value) * (1 - Math.exp(-dt / SMOOTHING_MS));
  if (Math.abs(target - smoothY.value) < 0.5) {
    smoothY.value = target;
    smoothFrame = 0;
    lastSmoothTime = 0;
    return;
  }
  smoothFrame = requestAnimationFrame(smoothStep);
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
$ease-out: cubic-bezier(0.16, 1, 0.3, 1)

// Static by default: the intro, then the finished terminal in the flow.
// Only $scene pins the panel and turns the hero into a scroll-driven scene.
.hero
  position: relative
  background: $dark-navy
  padding: 0
  @media #{$scene}
    height: 360vh

.hero__panel
  position: relative
  z-index: 2
  @media #{$scene}
    position: sticky
    top: 0
    height: 100vh
    height: 100svh
    // The About section's surface tone fades in with the about layout
    &::before
      content: ''
      position: absolute
      inset: 0
      background: $surface
      opacity: var(--about-in, 0)
      pointer-events: none

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
    z-index: 1
    // About layout, matching the About section: window + gap + photo inside one group
    --about-photo: clamp(240px, 22vw, 320px)
    --about-group: min(1104px, 100% - 200px)
    --about-term: calc(var(--about-group) - var(--about-photo) - 56px)

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
  min-height: 44px
  padding: 0 24px
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
  // Narrow screens wrap at the dot, never inside "Based in Mexico"
  &-piece
    white-space: nowrap
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
    // Centered for the hero; with --about-in it slides to the left column of the
    // About layout, widens, and anchors to the top so about.md grows downward
    top: calc(50% * (1 - var(--about-in, 0)) + (68px + 6vh) * var(--about-in, 0))
    left: calc(50% - var(--about-group) / 2 * var(--about-in, 0))
    width: calc(min(640px, 100% - 40px) * (1 - var(--about-in, 0)) + var(--about-term) * var(--about-in, 0))
    max-width: none
    max-height: calc(100vh - 68px - 12vh)
    display: flex
    flex-direction: column
    // Rises 16px (TERMINAL_RISE) as it opens, like a window arriving rather than a curtain dropping
    translate: calc(-50% * (1 - var(--about-in, 0))) calc(-50% * (1 - var(--about-in, 0)) + (1 - var(--terminal-in, 0)) * 16px)
    opacity: var(--terminal-in, 0)
    :deep(.terminal__body)
      flex: 1 1 auto
      min-height: 0
      overflow: hidden
  // Scrolled output fades at the body edges instead of being sliced by the bar
  &--scrolling :deep(.terminal__body)
    mask-image: linear-gradient(to bottom, transparent, #000 28px, #000 calc(100% - 28px), transparent)
    clip-path: inset(0 0 calc((1 - var(--terminal-in, 0)) * 100%) 0 round 14px)
  &--inactive
    pointer-events: none

.hero__scroller,
.hero__lines,
.hero__about
  display: flex
  flex-direction: column
  gap: 14px

.hero__scroller
  will-change: transform

// about.md lands block by block once `cat about.md` has been typed
.hero__about :deep(.about-content__block)
  opacity: 0
  translate: 0 10px
  transition: opacity 0.5s $ease-out, translate 0.5s $ease-out
  transition-delay: calc(var(--i) * 90ms)

.hero__about--revealed :deep(.about-content__block)
  opacity: 1
  translate: 0 0

.hero__about-photo
  display: none
  @media #{$scene}
    display: block
    position: absolute
    z-index: 2
    top: calc(68px + 6vh + 40px)
    left: calc(50% + var(--about-group) / 2 - var(--about-photo))
    width: var(--about-photo)
    aspect-ratio: 5 / 6
    object-fit: cover
    object-position: top center
    border-radius: 14px
    border: 1px solid rgba($accent, 0.22)
    box-shadow: 0 24px 60px rgba($black, 0.5)
    opacity: var(--about-in, 0)
    translate: calc((1 - var(--about-in, 0)) * 48px) 0
    pointer-events: none

// Sits at the right end of the bar: the photo flies in from the right, so it
// lands without crossing the window title
.hero__terminal-avatar
  order: 1
  margin-left: auto
  display: inline-flex
  align-items: center
  justify-content: center
  width: 26px
  height: 26px
  border-radius: 50%
  border: 1.5px solid rgba($accent, 0.5)
  flex-shrink: 0

.hero__terminal-avatar-img
  width: 22px
  height: 22px
  border-radius: 50%
  object-fit: cover
  object-position: 75% center

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
