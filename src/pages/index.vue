<!-- eslint-disable -->
<template>
  <div class="Container">
    <introduction-component v-if="!isLoaded" :is-loaded="isLoaded" :tasks="tasks" @on-finished="onTaskFinished" />
    <background-component />
    <transition name="main-entry" :duration="2000">
      <main-component v-if="isLoaded" />
    </transition>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
import Vue from 'vue';

import IntroductionComponent from '~/components/Introduction.vue';
import MainComponent from '~/components/Main.vue';
import BackgroundComponent from '~/components/Background/Index.vue';

type Data = {
  tasks: Promise<any>[];
  isLoaded: boolean;
};
type Methods = {};
type Computed = {};
type Props = {};

const tasks = [...Array(5).keys()].map(i => new Promise(resolve => setTimeout(resolve, i * 500)));
if (typeof window !== 'undefined') {
  tasks.push(new Promise(resolve => window.addEventListener('load', resolve)));
}
const defaultData: Data = { tasks, isLoaded: false };
const components = { IntroductionComponent, MainComponent, BackgroundComponent };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  methods: {
    onTaskFinished() {
      this.isLoaded = true;
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
