<!-- eslint-disable -->
<template>
  <aside class="SpModalMenu" :hidden="!isShow">
    <background class="SpModalMenu__background" />
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
  transition: transform 200ms $easeOutExpo;
}

[hidden] .SpModalMenu__background {
  transform: translate3d(-100%, 0, 0);
}

.SpModalMenu__inner {
  position: relative;
  display: block;
  width: 100%;
  font-size: 6.429vw;
  letter-spacing: 0.05em;
  transition: transform 200ms 100ms $easeOutExpo;
}

[hidden] .SpModalMenu__inner {
  transform: translate3d(-100%, 0, 0);
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

<script lang="ts">
import Vue from 'vue';

import Icon from '../Icon.vue';
import Background from './SpMenuBackground.vue';

type Data = {};
type Methods = {};
type Computed = { backgroundColumnRange: number[] };
type Props = { menus: string[]; snses: string[]; isShow: boolean };

const defaultData: Data = {};

const components = { Icon, Background };

const backgroundColumnCount = 12;

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: {
    menus: { type: Array, default: () => [] },
    snses: { type: Array, default: () => [] },
    isShow: { type: Boolean, default: false },
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
