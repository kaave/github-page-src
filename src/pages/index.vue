<template>
  <div class="Container">
    <introduction-component />
    <header id="header" class="Header" role="banner">Header</header>
    <main id="main" class="Main" role="main">Main</main>
    <footer id="footer" class="Footer">Footer</footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import IntroductionComponent from '~/components/Introduction.vue';

type Data = {};
type Methods = {};
type Computed = {};
type Props = {};
const defaultData: Data = {};
const components = { IntroductionComponent };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
});
</script>

<style lang="scss" scoped>
.Container {
  position: relative;
  display: block;
  width: 100%;
  min-height: 100vh;
}
</style>
