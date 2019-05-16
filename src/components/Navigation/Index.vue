<!-- eslint-disable -->
<template>
  <nav class="Navigation" :class="!isInitialize ? '-not-init' : ''">
    <hamburger class="-hidden-pc" @click="handleHambergerClick" :is-close="isShowSpMenu" :is-show="!isOnTop" />
    <sp-modal-menu :menus="menus" :snses="snses" :is-show="isShowSpMenu" />
    <pc-menu :menus="menus" :snses="snses" :is-show="!isOnTop" />
  </nav>
</template>
<!-- eslint-enable -->

<script lang="ts">
import Vue from 'vue';
import throttle from 'lodash/throttle';

import Hamburger from './Hamburger.vue';
import SpModalMenu from './SpModalMenu.vue';
import PcMenu from './PcMenu.vue';

type Data = { isShowSpMenu: boolean; isInitialize: boolean };
type Methods = { handleHambergerClick: () => void };
type Computed = {};
type Props = { menus: string[]; snses: { key: string; url: string; desc: string }[]; isOnTop: boolean };

const defaultData: Data = { isShowSpMenu: false, isInitialize: false };

const components = { Hamburger, SpModalMenu, PcMenu };

const vue = Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: {
    menus: { type: Array, default: () => [] },
    snses: { type: Array, default: () => [] },
    isOnTop: { type: Boolean, default: false },
  },
  data() {
    return { ...defaultData };
  },
  mounted() {
    setTimeout(() => (this.isInitialize = true), 50);
  },
  methods: {
    handleHambergerClick: throttle(function handleHambergerClick(this: typeof vue) {
      this.isShowSpMenu = !this.isShowSpMenu;
    }, 1000),
  },
});

export default vue;
</script>

<style lang="scss" scoped>
.Navigation {
  z-index: nth($zLevels, 8);
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;

  @include sp {
    padding: 4vw;
  }
}
</style>
