<!-- eslint-disable -->
<template>
  <section class="Top">
    <div class="Top__inner">
      <h2 class="Top__header">kaave.github.io</h2>
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

.Top__texts {
  grid-area: Top__texts;
}

.Top__text {
  font-size: 3.75vw;
  line-height: 1.8;

  @include notSp {
    @include responsiveFontSize(2);
    line-height: 1.6;
  }

  @include maxSize {
    font-size: 2rem;
  }
}

.Top__text:not(:first-child) {
  margin-top: 1em;
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
