<!-- eslint-disable -->
<template>
  <footer id="footer" class="Footer">
    <div class="Footer__inner">
      <h2 class="Footer__header">kaave.github.io</h2>
      <div class="Footer__menus-and-snses">
        <ul class="Footer__link Menu">
          <li v-for="menu in menus" :key="menu" class="Menu__cell">
            <nuxt-link :to="`/${menu}`" class="Menu__link">{{ menu }}</nuxt-link>
          </li>
        </ul>
        <ul class="Footer__snses SNS">
          <li v-for="{ key, url } in snses" :key="key" class="SNS__cell">
            <a :href="url" class="SNS__link" target="_blank" rel="noopener">
              <icon class="SNS__icon" :iconKey="key" />
            </a>
          </li>
        </ul>
      </div>
      <address class="Footer__copyright">@2019 kaave</address>
    </div>
  </footer>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
$footer-text-color: #aaa;

.Footer {
  position: relative;
  width: 100%;
  background: #0008;
}

.Footer__inner {
  position: relative;
  display: grid;
  grid-template:
    'Footer__header' auto
    'Footer__menus-and-snses' auto
    'Footer__copyright' auto /
    auto;
  width: 100%;
  height: 100%;
  padding: 0 4vw 20vw;
  color: $footer-text-color;

  @include notSp {
    max-width: $maxWidth;
    padding: 0 $horizontalPadding 20px;
    margin: auto;
  }
}

.Footer__header {
  grid-area: Footer__header;
  font-size: 5.357vw;
  line-height: 1;
  letter-spacing: 0.05em;
  margin: 1em 0 0.5em;

  $pc-font-size: 3;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    margin-bottom: 1.5em;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.Footer__menus-and-snses {
  grid-area: Footer__menus-and-snses;
  display: grid;
  grid-template:
    'Menu SNS' auto /
    auto auto;
  font-size: 4.286vw;
  line-height: 1.8;

  $pc-font-size: 1.6;
  @include notSp {
    line-height: 1.6;
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.Menu {
  grid-area: Menu;
}

.Menu__cell {
  display: inline-block;

  &:not(:first-child) {
    margin-left: 1em;
  }
}

.Menu__link {
  color: currentColor;

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }
}

.SNS {
  grid-area: SNS;
  text-align: right;
}

.SNS__link {
  &,
  &:hover,
  &:active {
    color: currentColor;
    text-decoration: none;
  }
}

.SNS__cell {
  display: inline-block;

  &:not(:first-child) {
    margin-left: 0.5em;
  }
}

.Footer__copyright {
  grid-area: Footer__copyright;
  margin-top: 1em;
  text-align: right;
}
</style>

<script lang="ts">
import Vue from 'vue';

import Icon from '../Icon.vue';

type Data = {};
type Methods = {};
type Computed = {};
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
});
</script>
