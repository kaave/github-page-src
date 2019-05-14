<!-- eslint-disable -->
<template>
  <div class="Container">
    <introduction-component v-if="!isLoaded" :is-loaded="isLoaded" :tasks="tasks" @on-finished="onTaskFinished" />
    <span role="presentation" class="PageTopHook" ref="hook"></span>
    <background-component />
    <transition name="main-entry" :duration="2000">
      <div v-if="isLoaded">
        <navigation-component :menus="menus" :snses="snses" :is-on-top="isOnTop" />
        <nuxt />
        <footer-component :menus="menus" :snses="snses" />
      </div>
    </transition>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
import Vue from 'vue';

import IntroductionComponent from '~/components/Introduction.vue';
import BackgroundComponent from '~/components/Background/Index.vue';
import NavigationComponent from '~/components/Navigation/Index.vue';
import FooterComponent from '~/components/Footer/Index.vue';

type Data = { tasks: Promise<any>[]; isLoaded: boolean; isOnTop: boolean };
type Methods = {};
type Computed = { menus: string[]; snses: { key: string; url: string; desc: string }[] };
type Props = {};

const tasks = [...Array(5).keys()].map(i => new Promise(resolve => setTimeout(resolve, i * 500)));
if (typeof window !== 'undefined') {
  tasks.push(new Promise(resolve => window.addEventListener('load', resolve)));
}
const defaultData: Data = { tasks, isLoaded: false, isOnTop: false };
const components = { IntroductionComponent, BackgroundComponent, NavigationComponent, FooterComponent };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  computed: {
    menus() {
      return ['about', 'entries', 'lts'];
    },
    snses() {
      return [
        { key: 'twitter', url: 'https://twitter.com/junkjunctions', desc: '@junkjunctions' },
        { key: 'facebook', url: 'https://www.facebook.com/kyousuke.abe.9', desc: 'Kyousuke Abe' },
        { key: 'github', url: 'https://github.com/kaave', desc: 'kaave' },
        { key: 'wantedly', url: 'https://www.wantedly.com/users/57487254', desc: '安部亨佑' },
      ];
    },
  },
  mounted() {
    const { hook } = this.$refs;
    if (!(hook instanceof HTMLElement)) return;

    const observer = new IntersectionObserver(
      event => event.forEach(entry => (this.isOnTop = entry.intersectionRatio === 1)),
      { threshold: [0, 1] },
    );
    observer.observe(hook);
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

.PageTopHook {
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  pointer-events: none;
  display: block;
  width: 1px;
  height: 1px;
}
</style>
