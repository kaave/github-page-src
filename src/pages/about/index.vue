<!-- eslint-disable -->
<template>
  <main id="main" class="Main" role="main">About</main>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Main {
  z-index: 1;
  position: relative;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, MutationMethod } from 'vuex';

type Data = {};
type Methods = {};
type Computed = {};
type Props = {};

const defaultData: Data = {};

const components = {};

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
});
</script>
