<!-- eslint-disable -->
<template>
  <section class="About">
    <div class="About__inner">
      <h2 class="About__header">about</h2>
      <p class="About__text">
        名古屋在住のWebエンジニアによる一応ブログメインのサイトです。
        メモ、実験、音楽ネタ、料理ネタ、自転車ネタやらでまわしてます。
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
  font-size: 7.5vw;
  line-height: 1;
  letter-spacing: 0.05em;
  margin-bottom: 0.5em;

  $pc-font-size: 4;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    margin-bottom: 1.5em;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.About__text {
  font-size: 3.75vw;
  line-height: 1.8;

  $pc-font-size: 1.6;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.About__link {
  position: relative;
  display: inline-block;
  margin-top: 1em;
  font-size: 4.286vw;
  color: currentColor;

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

  &::after {
    content: '';
    z-index: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background: rgba($colorWhite, 0.6);
    transition: background-color 200ms $easeOutExpo;
  }
}

.About__link:hover::after {
  background-color: rgba($colorWhite, 0.9);
}
</style>

<script lang="ts">
import Vue from 'vue';

type Data = {};
type Methods = {};
type Computed = {};
type Props = {};

const defaultData: Data = {};

const components = {};

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
});
</script>
