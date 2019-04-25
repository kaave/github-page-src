<template>
  <div class="Container">
    <introduction-component :tasks="tasks" @on-finished="onTaskFinished" />
    <header id="header" class="Header" role="banner">Header</header>
    <main id="main" class="Main" role="main">Main</main>
    <footer id="footer" class="Footer">Footer</footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import IntroductionComponent from '~/components/Introduction.vue';

type Data = { tasks: Promise<any>[] };
type Methods = {};
type Computed = {};
type Props = {};

const tasks = [...Array(5).keys()].map(i => new Promise(resolve => setTimeout(resolve, i * 500)));
const defaultData: Data = { tasks };
const components = { IntroductionComponent };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  methods: {
    onTaskFinished() {
      console.log('finished');
    },
  },
});
</script>

<style lang="scss" scoped>
.Container {
  position: relative;
  display: block;
  width: 100%;
  min-height: 100vh;
}
</style>
