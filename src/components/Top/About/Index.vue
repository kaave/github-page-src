<!-- eslint-disable -->
<template>
  <section
    class="About"
    v-observe-visibility="{ callback: visibilityChanged, intersection: { threshold: [0.4] }, once: true }"
  >
    <div class="About__inner" :class="getVisibilityClass">
      <h2 class="About__header">about</h2>
      <p class="About__text">
        名古屋在住のWebエンジニアによる一応ブログメインのサイトです。
        <br />メモ、実験、音楽ネタ、料理ネタ、自転車ネタやらでまわしてこうと思ってます。
      </p>
      <nuxt-link to="/about" class="About__link">詳細はこちら 👉</nuxt-link>
    </div>
  </section>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.About {
  position: relative;
  width: 100%;
}

.About__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 4vw;

  @include notSp {
    max-width: $maxWidth;
    padding: 0 $horizontalPadding;
    margin: auto;
  }
}

.About__header {
  width: 100%;
  font-size: 7.5vw;
  line-height: 1;
  margin-bottom: 0.5em;
  opacity: 0;
  transition: opacity 300ms ease-out;

  $pc-font-size: 4;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    margin-bottom: 1.5em;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.-visible .About__header {
  opacity: 1;
  animation: show-header 1.2s $easeOutExpo forwards;
}

.About__text {
  font-size: 3.75vw;
  line-height: 1.8;
  opacity: 0;
  transition: opacity 300ms 400ms ease-out;

  $pc-font-size: 1.6;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.-visible .About__text {
  opacity: 1;
}

.About__link {
  position: relative;
  display: inline-block;
  margin-top: 1em;
  font-size: 4.286vw;
  color: currentColor;
  opacity: 0;
  transition: opacity 300ms 400ms ease-out;
  overflow: hidden;

  $pc-font-size: 1.8;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }

  &::before,
  &::after {
    content: '';
    z-index: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: $colorWhite;
  }

  &::before {
    opacity: 0.3;
  }

  &::after {
    transform: translate3d(-100%, 0, 0);
    transition: transform 400ms $easeOutExpo;
  }
}

.-visible .About__link {
  opacity: 1;
}

.About__link:hover::after {
  transform: none;
}
</style>

<script lang="ts">
import Vue from 'vue';

type Data = { isVisible: boolean };
type Methods = { visibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry) => void };
type Computed = { getVisibilityClass: string };
type Props = {};

const defaultData: Data = { isVisible: false };

const components = {};

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
  methods: {
    visibilityChanged(isVisible, entry) {
      if (!isVisible) return;

      this.isVisible = true;
    },
  },
});
</script>
