<!-- eslint-disable -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 700 700">
    <title>Wantedly</title>
    <path
      d="M0 108.6h100l150 362.1L300 350 200 108.6h100l50 120.7 50-120.7h100L400 350l50 120.7 150-362.1h100L500 591.4H400l-50-120.7-50 120.7H200z"
    ></path>
  </svg>
</template>
<!-- eslint-enable -->

<script lang="ts">
import Vue from 'vue';

type Data = {};
type Methods = {};
type Computed = {};
type Props = { width: number; height: number };

const defaultData: Data = {};

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    width: { type: Number, default: 700 },
    height: { type: Number, default: 700 },
  },
  data() {
    return { ...defaultData };
  },
});
</script>
