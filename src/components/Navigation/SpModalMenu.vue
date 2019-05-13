<!-- eslint-disable -->
<template>
  <aside class="SpModalMenu">
    <div class="SpModalMenu__background" role="presentation">
      <span v-for="i in backgroundColumnRange" :key="i" class="SpModalMenu__background-block"></span>
    </div>
    <div class="SpModalMenu__inner">
      <h1 class="SpModalMenu__header">
        <nuxt-link to="/" class="SpModalMenu__header-link">kaave.github.io</nuxt-link>
      </h1>
      <hr class="SpModalMenu__line" />
      <ul class="SpModalMenu__list Menu">
        <li v-for="menu in menus" :key="menu" class="Menu__cell">
          <nuxt-link :to="`/${menu}`" class="Menu__link">{{ menu }}</nuxt-link>
        </li>
      </ul>
      <hr class="SpModalMenu__line" />
      <ul class="SpModalMenu__list SNS">
        <li v-for="{ key, url } in snses" :key="key" class="SNS__cell">
          <a :href="url" class="SNS__link" target="_blank" rel="noopener">
            <icon class="SNS__icon" :iconKey="key" />
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
<!-- eslint-enable -->

<script lang="ts">
import Vue from 'vue';

import Icon from '../Icon.vue';

type Data = {};
type Methods = {};
type Computed = { backgroundColumnRange: number[] };
type Props = { menus: string[]; snses: string[] };

const defaultData: Data = {};

const components = { Icon };

const backgroundColumnCount = 12;

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: {
    menus: { type: Array, default: () => [] },
    snses: { type: Array, default: () => [] },
  },
  data() {
    return { ...defaultData };
  },
  computed: {
    backgroundColumnRange() {
      return [...Array(backgroundColumnCount).keys()];
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.SpModalMenu {
  z-index: nth($zLevels, 8);
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 80%;
  padding: 8vw 6vw;
}

.SpModalMenu__background {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.SpModalMenu__background-block {
  display: block;
  background: rgba($colorWhite, 0.9);
  margin: auto auto auto 0;
}

$blockSizes: 12%, 12%, 2%, 1%, 9%, 22%, 2%, 8%, 12%, 4%, 3%, 15%;

@for $i from 1 through length($blockSizes) {
  $blockSize: nth($blockSizes, $i);

  .SpModalMenu__background-block:nth-child(#{$i}) {
    width: 100% - random(20);
    height: $blockSize;
  }
}

$backgroundBlockTransition: all 300ms $easeOutExpo;

.sp-menu-enter-active .SpModalMenu__background-block,
.sp-menu-leave .SpModalMenu__background-block {
  transition: $backgroundBlockTransition;
}

.sp-menu-enter .SpModalMenu__background-block,
.sp-menu-leave-active .SpModalMenu__background-block {
  transform: translate3d(-100%, 0, 0);
  transition: $backgroundBlockTransition;
}

.SpModalMenu__inner {
  position: relative;
  display: block;
  width: 100%;
  font-size: 6.429vw;
  letter-spacing: 0.05em;
}

.SpModalMenu__header {
  color: $colorBlack;
  font-size: 1.3em;
  margin-bottom: 1em;
}

.SpModalMenu__header-link {
  &,
  &:hover,
  &:active {
    color: currentColor;
    text-decoration: none;
  }
}

.Menu {
  display: block;
}

.Menu__cell {
  display: block;

  &:not(:first-child) {
    margin-top: 0.5em;
  }
}

.Menu__link {
  &,
  &:hover,
  &:active {
    color: $colorBlack;
    text-decoration: none;
  }
}

.SpModalMenu__line {
  width: 3em;
  height: 1px;
  padding: 0;
  border: 0;
  margin: 1em 0;
  background: $colorBlack;
}

.SNS {
  display: flex;
}

.SNS__cell:not(:first-child) {
  margin-left: 0.5em;
}

.SNS__link {
  &,
  &:hover,
  &:active {
    color: $colorBlack;
    text-decoration: none;
  }
}
</style>
