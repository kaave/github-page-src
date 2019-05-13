<!-- eslint-disable -->
<template>
  <section class="Top" :class="getVisibilityClass">
    <div class="Top__inner">
      <h2 class="Top__header">
        <span v-for="(c, i) in 'kaave.github.io'" :key="`${c}_${i}`" ref="headerChar" class="Top__header-char">
          <span class="-c" role="presentation">{{ c }}</span>
          <span class="-m" role="presentation">{{ c }}</span>
          <span class="-y" role="presentation">{{ c }}</span>
          <span class="-w">{{ c }}</span>
        </span>
      </h2>
      <div class="Top__texts">
        <p class="Top__text">愛知県でWebエンジニアとしてはたらく安部亨佑 aka kaaveのWebサイトです。</p>
        <p class="Top__text">楽しんでってください！</p>
      </div>
    </div>
  </section>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Top {
  position: relative;
  width: 100%;
  height: 100vh;
}

.Top__inner {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: grid;
  grid-template:
    'Top__header' auto
    'Top__texts' auto /
    auto;
  width: 100%;
  padding: 0 4vw;

  @include notSp {
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: $maxWidth;
    padding: 0 $horizontalPadding;
  }
}

.Top__header {
  grid-area: Top__header;
  position: relative;
  font-size: 8.571vw;
  line-height: 1;
  letter-spacing: 0.05em;
  margin-bottom: 0.5em;

  @include notSp {
    @include responsiveFontSize(6);
  }

  @include maxSize {
    font-size: 6rem;
  }
}

.Top__header-char {
  z-index: 1;
  position: relative;
  display: inline-block;
  opacity: 0;

  &::before {
    color: #f0f;
    transform: translate3d(0, -1.5em, 0);
  }

  &::after {
    color: #0ff;
    transform: translate3d(0, -0.5em, 0);
  }
}

@for $i from 1 through 30 {
  $transitionDelay: random() * 300ms;

  .Top__header-char:nth-child(#{$i}) {
    transition: opacity 1000ms $transitionDelay ease-out;
  }
}

.-visible .Top__header-char {
  opacity: 1;
}

.Top__header-char .-c,
.Top__header-char .-m,
.Top__header-char .-y {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(0, -1em, 0);
  transition: all 1s ease-out;
  display: inline-block;
  opacity: 0;
  user-select: none;
}

.Top__header-char .-c {
  color: #0ff;
  transition-delay: 300ms;
}

.Top__header-char .-m {
  color: #f0f;
  transition-delay: 150ms;
}

.Top__header-char .-y {
  color: #ff0;
}

.-visible .Top__header-char .-c,
.-visible .Top__header-char .-m,
.-visible .Top__header-char .-y {
  transform: none;
  opacity: 0.6;
}

.Top__header-char .-w {
  z-index: 1;
  position: relative;
  display: inline-block;
  color: $colorWhite;
}

.Top__texts {
  grid-area: Top__texts;
}

.Top__text {
  font-size: 3.75vw;
  line-height: 1.8;
  opacity: 0;
  transition: opacity 800ms 500ms ease-out;

  @include notSp {
    @include responsiveFontSize(2);
    line-height: 1.6;
  }

  @include maxSize {
    font-size: 2rem;
  }
}

.-visible .Top__text {
  opacity: 1;
}

.Top__text:not(:first-child) {
  margin-top: 1em;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { TweenLite, Power3 as Quart } from 'gsap';

type Data = { isVisible: boolean };
type Methods = {};
type Computed = { getVisibilityClass: string };
type Props = {};

const defaultData: Data = { isVisible: false };

const components = {};

const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function visibleHeaderChars(elements: HTMLElement[]) {
  elements.forEach(async element => {
    await wait(Math.floor(Math.random() * 200));
    TweenLite.fromTo(
      element,
      0.6,
      { transform: 'translate3d(0, -50%, 0)' },
      { transform: 'translate3d(0, 0, 0)', ease: Quart.easeOut },
    );
  });
}

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  computed: {
    getVisibilityClass() {
      return this.isVisible ? '-visible' : '';
    },
  },
  mounted() {
    setTimeout(async () => {
      this.isVisible = true;

      // const transitionAnimationMsec = 100;
      // const headerChars = this.$refs.headerChar as HTMLElement[];
      // setTimeout(() => visibleHeaderChars(headerChars), transitionAnimationMsec);
    }, 300);
  },
});
</script>
