<!-- eslint-disable -->
<template>
  <button class="Hamburger" :class="isClose ? '-close' : ''" @click="handleHamburgerClick">
    <div class="Hamburger__inner">
      <span class="Hamburger__line"></span>
      <span class="Hamburger__line"></span>
      <span class="Hamburger__line"></span>
    </div>
  </button>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Hamburger {
  $max-hamberger-size-sp: 40px;

  appearance: none;
  border: 0;
  background: transparent;
  position: relative;
  display: block;
  font-size: 8vw;
  width: 1em;
  height: 1em;
  max-width: $max-hamberger-size-sp;
  max-height: $max-hamberger-size-sp;
  margin: 0;
}

.Hamburger__inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.Hamburger__line {
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

.Hamburger__line:first-child {
  transform: translate3d(0, -3px, 0);
}

.Hamburger__line:last-child {
  transform: translate3d(0, 3px, 0);
}

.-close .Hamburger__line:first-child {
  transform: rotate3d(0, 0, 1, 135deg);
}

.-close .Hamburger__line:nth-child(2) {
  opacity: 0;
}

.-close .Hamburger__line:last-child {
  transform: rotate3d(0, 0, 1, -135deg);
}
</style>

<script lang="ts">
import Vue from 'vue';

type Data = {};
type Methods = { handleHamburgerClick: () => void };
type Computed = {};
type Props = { isClose: boolean };

const defaultData: Data = {};

const components = {};

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: {
    isClose: { type: Boolean, default: false },
  },
  methods: {
    handleHamburgerClick() {
      this.$emit('click');
    },
  },
});
</script>
