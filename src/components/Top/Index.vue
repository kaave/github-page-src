<!-- eslint-disable -->
<template>
  <section class="Top">
    <div class="Top__inner">
      <h2 class="Top__header">kaave.github.io</h2>
      <p class="Top__text">愛知県でWebエンジニアとしてはたらく安部亨佑 aka kaaveのWebサイトです。</p>
      <p class="Top__text">楽しんでってください！</p>
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
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 4vw;
}

.Top__header {
  font-size: 8.571vw;
  line-height: 1;
  letter-spacing: 0.05em;
  margin-bottom: 0.5em;
}

.Top__text {
  font-size: 3.75vw;
  line-height: 1.8;
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
