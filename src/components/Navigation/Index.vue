<!-- eslint-disable -->
<template>
  <nav class="Navigation">
    <div class="Navigation__content -hidden-pc">
      <hamburger @click="handleHambergerClick" :is-close="isShowSpMenu" />
    </div>
    <transition name="sp-menu" :duration="600" mode="out-in">
      <sp-modal-menu v-if="isShowSpMenu" :menus="menus" :snses="snses" />
    </transition>
    <div class="Navigation__content -hidden-sp"></div>
  </nav>
</template>
<!-- eslint-enable -->

<script lang="ts">
import Vue from 'vue';
import throttle from 'lodash/throttle';

import Hamburger from './Hamburger.vue';
import SpModalMenu from './SpModalMenu.vue';

type Data = { isShowSpMenu: boolean };
type Methods = { handleHambergerClick: () => void };
type Computed = { menus: string[]; snses: { key: string; url: string; desc: string }[] };
type Props = {};

const defaultData: Data = { isShowSpMenu: false };

const components = { Hamburger, SpModalMenu };

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
  mounted() {},
  methods: {
    handleHambergerClick: throttle(function handleHambergerClick() {
      // @ts-ignore
      this.isShowSpMenu = !this.isShowSpMenu;
    }, 1000),
  },
});
</script>

<style lang="scss" scoped>
.Navigation {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  padding: 4vw;
}

.Navigation__content {
  display: flex;
  justify-content: flex-end;
}
</style>
