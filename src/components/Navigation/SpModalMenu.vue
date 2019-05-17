<!-- eslint-disable -->
<template>
  <aside class="SpModalMenu -hidden-pc" :hidden="!isShow">
    <background class="SpModalMenu__background" />
    <div class="SpModalMenu__inner">
      <h1 class="SpModalMenu__header">
        <nuxt-link to="/" class="SpModalMenu__header-link">
          <span v-for="(c, i) in 'kaave.github.io'" :key="`${c}__${i}`" class="SpModalMenu__header-link-char">
            {{ c }}
          </span>
        </nuxt-link>
      </h1>
      <hr class="SpModalMenu__line" />
      <ul class="SpModalMenu__list Menu">
        <li v-for="menu in menus" :key="menu" class="Menu__cell">
          <nuxt-link :to="`/${menu}`" class="Menu__link">
            <span v-for="(c, i) in menu" :key="`${c}__${i}`" class="Menu__link-char">{{ c }}</span>
          </nuxt-link>
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
  transition: transform 100ms $easeOutExpo;
}

.SpModalMenu[hidden] {
  transform: translate3d(-100vw);
  pointer-events: none;
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
  color: currentColor;

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }
}

.SpModalMenu__header-link-char {
  position: relative;
  display: inline-block;
  transform-origin: 70% center;
  transition: transform 400ms ease-out;
}

[hidden] .SpModalMenu__header-link-char {
  transform: scale3d(1, 0.05, 1);
}

/* stylelint-disable */
// 適当
@for $i from 1 through 20 {
  $transitionDelay: random() * 300ms + 300ms;

  .SpModalMenu__header-link-char:nth-child(#{$i}) {
    transition-delay: $transitionDelay;
  }
}
/* stylelint-enable */

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

.Menu__link-char {
  position: relative;
  display: inline-block;
  transform-origin: 70% center;
  transition: transform 400ms ease-out;
}

[hidden] .Menu__link-char {
  transform: scale3d(1, 0.1, 1);
}

/* stylelint-disable */
@for $i from 1 through 20 {
  $transitionDelay: random() * 300ms + 300ms;

  .Menu__link-char:nth-child(#{$i}) {
    transition-delay: $transitionDelay;
  }
}
/* stylelint-enable */

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

.SNS__icon {
  position: relative;
  display: inline-block;
  transform-origin: 70% center;
  transition: transform 400ms 500ms ease-out;
}

[hidden] .SNS__icon {
  transform: scale3d(1, 0.01, 1);
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
