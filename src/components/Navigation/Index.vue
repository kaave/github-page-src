<!-- eslint-disable -->
<template>
  <!-- eslint-disable -->
  <nav class="Navigation" :class="!isInitialize ? '-not-init' : ''">
    <div class="Navigation__content -hidden-pc">
      <hamburger @click="handleHambergerClick" :is-close="isShowSpMenu" />
    </div>
    <transition name="sp-menu" :duration="600">
      <sp-modal-menu v-if="isShowSpMenu" :menus="menus" :snses="snses" />
    </transition>
    <pc-menu :menus="menus" :snses="snses" />
  </nav>
  <!-- eslint-enable -->
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
type Computed = { menus: string[]; snses: { key: string; url: string; desc: string }[] };
type Props = {};

const defaultData: Data = { isShowSpMenu: false, isInitialize: false };

const components = { Hamburger, SpModalMenu, PcMenu };

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
    setTimeout(() => (this.isInitialize = true), 50);
  },
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
  @include sp {
    z-index: nth($zLevels, 8);
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    padding: 4vw;
  }
}

.Navigation__content.-hidden-pc {
  display: flex;
  justify-content: flex-end;

  @include notSp {
    padding: 0;
  }
}

@include sp {
  .Navigation__content {
    display: flex;
    justify-content: flex-end;
  }
}

.Navigation__inner {
  width: 100%;
  max-width: $maxWidth;
  padding: $horizontalPadding;
  margin: auto;
}

.Navigation__header {
  font-size: 2.72vw;

  @include maxSize {
    font-size: 3.2rem;
  }
}

.Navigation__sp-modal-menu {
  color: $colorWhite;
  font-size: 3.75vw;
  margin-top: 1em;
}

.Navigation__sp-menu {
  margin: 0;
  text-align: right;
}

.Navigation__sp-menu-cell {
  margin: 0.5em 0 0;
}

.Navigation__sp-menu-link {
  display: inline-block;

  &,
  &:hover,
  &:active {
    color: currentColor;
    text-decoration: none;
  }
}

.sp-menu-enter .Navigation__sp-menu-cell {
  transform: translate3d(10vw, 0, 0);
  opacity: 0;
}

.sp-menu-enter-active .Navigation__sp-menu-cell {
  transition: all 200ms $easeOutQuad;
}

.sp-menu-leave-active .Navigation__sp-menu-cell {
  transform: translate3d(10vw, 0, 0);
  opacity: 0;
  transition: all 400ms $easeOutQuad;
}

.sp-menu-enter-active,
.sp-menu-leave-active {
  .Navigation__sp-menu-cell:first-child {
    transition-delay: 100ms;
  }

  .Navigation__sp-menu-cell:nth-child(2) {
    transition-delay: 150ms;
  }

  .Navigation__sp-menu-cell:last-child {
    transition-delay: 200ms;
  }
}

.Navigation__sp-sns {
  display: flex;
  justify-content: space-between;
  width: 7.5em;
  margin: 2em 0 0 auto;
}

.sp-menu-enter .Navigation__sp-sns {
  transform: translate3d(10vw, 0, 0);
  opacity: 0;
}

.sp-menu-enter-active .Navigation__sp-sns {
  transition: all 200ms 250ms $easeOutQuad;
}

.sp-menu-leave-active .Navigation__sp-sns {
  transform: translate3d(10vw, 0, 0);
  opacity: 0;
  transition: all 400ms 250ms $easeOutQuad;
}

.Navigation__sp-sns-cell {
  margin: 0;
}

.Navigation__sp-sns-link {
  display: block;

  &,
  &:hover,
  &:active {
    color: currentColor;
    text-decoration: none;
  }
}

.Navigation__sp-sns-icon {
  width: 1.5em;
  height: 1.5em;
  fill: currentColor;
}

.Navigation__pc-menu {
  position: absolute;
  top: 50%;
  left: 1em;
  transform: translateY(-50%);
  margin: 0;
  font-size: 1.6rem;
}

.Navigation__pc-menu-cell {
  margin: 1em 0 0;
  transition: all 400ms $easeOutQuad;
}

.Navigation__pc-menu-cell:first-child {
  margin-top: 0;
  transition-delay: 100ms;
}

.Navigation__pc-menu-cell:nth-child(2) {
  transition-delay: 150ms;
}

.Navigation__pc-menu-cell:last-child {
  transition-delay: 200ms;
}

.-not-init .Navigation__pc-menu-cell {
  transform: translate3d(-10rem, 0, 0);
  opacity: 0;
}

.Navigation__pc-menu-link {
  display: inline-block;

  &,
  &:hover,
  &:active {
    color: currentColor;
    text-decoration: none;
  }
}
</style>
