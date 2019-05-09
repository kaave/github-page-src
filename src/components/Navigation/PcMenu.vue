<!-- eslint-disable -->
<template>
  <div class="PcMenu -hidden-sp">
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
              <component class="PcMenu__icon" :class="`-${key}`" :is="`icon-${key}`"></component>
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

import IconFacebook from '../Svg/IconFacebook.vue';
import IconGithub from '../Svg/IconGithub.vue';
import IconTwitter from '../Svg/IconTwitter.vue';
import IconWantedly from '../Svg/IconWantedly.vue';

type Data = {};
type Methods = {};
type Computed = {};
type Props = { menus: string[]; snses: string[] };

const defaultData: Data = { isShowSpMenu: false };

const components = { IconFacebook, IconGithub, IconTwitter, IconWantedly };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: {
    menus: { type: Array, default: () => [] },
    snses: { type: Array, default: () => [] },
  },
  data() {
    return { ...defaultData };
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

  @include notSp {
    padding: 0;
  }
}

.PcMenu__inner {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: $maxWidth;
  padding: $horizontalPadding;
  margin: auto;
}

.PcMenu__header {
  display: block;
  font-size: 3.06vw;

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
  display: inline-block;

  &,
  &:hover,
  &:active {
    color: $colorWhite;
    text-decoration: none;
  }
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
