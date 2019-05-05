<template>
  <nav class="Navigation">
    <div class="Navigation__content -hidden-pc">
      <button class="Hamberger" :class="isShowSpMenu ? '-close' : ''" @click="handleHambergerClick">
        <div class="Hamberger__inner">
          <span class="Hamberger__line"></span>
          <span class="Hamberger__line"></span>
          <span class="Hamberger__line"></span>
        </div>
      </button>
    </div>
    <transition name="sp-menu" :duration="600">
      <aside v-if="isShowSpMenu" class="Navigation__sp-modal-menu">
        <ul class="Navigation__sp-menu">
          <li v-for="menu in menus" :key="menu" class="Navigation__sp-menu-cell">
            <nuxt-link :to="`/${menu}`" class="Navigation__sp-menu-link">{{ menu }}</nuxt-link>
          </li>
        </ul>
        <ul class="Navigation__sp-sns">
          <li v-for="{ key, url, desc } in sns" :key="key" class="Navigation__sp-sns-cell">
            <a :href="url" class="Navigation__sp-sns-link">{{ desc }}</a>
          </li>
        </ul>
      </aside>
    </transition>
    <div class="Navigation__content -hidden-sp"></div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import throttle from 'lodash/throttle';

type Data = { isShowSpMenu: boolean };
type Methods = { handleHambergerClick: () => void };
type Computed = { menus: string[] };
type Props = {};

const defaultData: Data = { isShowSpMenu: false };

const components = {};

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  computed: {
    menus() {
      return ['about', 'entries', 'lts'];
    },
    sns() {
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

.Hamberger {
  appearance: none;
  border: 0;
  background: transparent;
  position: relative;
  display: block;
  font-size: 8vw;
  width: 1em;
  height: 1em;
  margin: 0;
}

.Hamberger__inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.Hamberger__line {
  position: absolute;
  top: 50%;
  left: 0;
  display: block;
  width: 100%;
  height: 1px;
  background: $colorWhite;
  transform-origin: center;
  transition: all 600ms $easeOutExpo;
}

.Hamberger__line:first-child {
  transform: translate3d(0, -3px, 0);
}

.Hamberger__line:last-child {
  transform: translate3d(0, 3px, 0);
}

.-close .Hamberger__line:first-child {
  transform: rotate3d(0, 0, 1, 135deg);
}

.-close .Hamberger__line:nth-child(2) {
  opacity: 0;
}

.-close .Hamberger__line:last-child {
  transform: rotate3d(0, 0, 1, -135deg);
}
</style>
