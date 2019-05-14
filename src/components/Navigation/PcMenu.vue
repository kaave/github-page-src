<!-- eslint-disable -->
<template>
  <div class="PcMenu -hidden-sp" :hidden="!isShow">
    <background />
    <div class="PcMenu__inner">
      <h1 class="PcMenu__header">kaave.github.io</h1>
      <div class="PcMenu__links">
        <ul class="PcMenu__link-list -menu">
          <li v-for="menu in menus" :key="menu" class="PcMenu__link-cell">
            <nuxt-link :to="`/${menu}`" class="PcMenu__link -menu">{{ menu }}</nuxt-link>
          </li>
        </ul>
        <ul class="PcMenu__link-list -sns">
          <li v-for="{ key, url } in snses" :key="key" class="PcMenu__link-cell">
            <a :href="url" class="PcMenu__link -sns" target="_blank" rel="noopener">
              <icon class="PcMenu__icon" :iconKey="key" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
import Vue from 'vue';

import Background from './PcMenuBackground.vue';
import Icon from '../Icon.vue';

type Data = {};
type Methods = {};
type Computed = {};
type Props = { isShow: boolean; menus: string[]; snses: string[] };

const components = { Background, Icon };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: {
    isShow: { type: Boolean, default: false },
    menus: { type: Array, default: () => [] },
    snses: { type: Array, default: () => [] },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.PcMenu {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  padding: 4vw;
  color: $colorBlack;

  @include notSp {
    padding: 0;
  }
}

.PcMenu__background {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
  transition: transform 200ms $easeOutExpo;
}

[hidden] .PcMenu__background {
  transform: translate3d(0, -100%, 0);
}

.PcMenu__inner {
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: $maxWidth;
  padding: 10px $horizontalPadding;
  margin: auto;
  transition: transform 200ms 80ms $easeOutExpo;
}

[hidden] .PcMenu__inner {
  transform: translate3d(0, -100%, 0);
}

.PcMenu__header {
  display: block;
  font-size: 3.06vw;
  transform: translateY(-10%);

  @include maxSize {
    font-size: 3.2rem;
  }
}

.PcMenu__links {
  @include responsiveFontSize(2);

  @include maxSize {
    font-size: 2rem;
  }
}

.PcMenu__link-list {
  display: inline-block;
}

.PcMenu__link-cell {
  display: inline-block;
  margin-left: 0.8em;
}

.PcMenu__link {
  position: relative;
  display: inline-block;
  overflow: hidden;

  &,
  &:hover,
  &:active {
    color: currentColor;
    text-decoration: none;
  }
}

.PcMenu__link.-menu {
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    background: currentColor;
    user-select: none;
    pointer-events: none;
  }

  &::before {
    opacity: 0.3;
  }

  &::after {
    transform: translate3d(-100%, 0, 0);
    transition: transform 400ms $easeOutExpo;
  }
}

.PcMenu__link:hover.-menu::after {
  transform: none;
}

.PcMenu__icon {
  width: 1.2em;
  height: 1.2em;

  &.-twitter {
    fill: #1da1f2;
  }

  &.-facebook {
    fill: #3b5998;
  }

  &.-github {
    fill: currentColor;
  }

  &.-wantedly {
    fill: #01a4bb;
  }
}
</style>
