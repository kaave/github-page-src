<!-- eslint-disable -->
<template>
  <main-component />
</template>
<!-- eslint-enable -->

<script lang="ts">
import Vue from 'vue';

import MainComponent from '~/components/Top.vue';

type Data = {};
type Methods = {};
type Computed = {};
type Props = {};

const defaultData: Data = {};
const components = { MainComponent };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
});
</script>
