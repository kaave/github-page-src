<!-- eslint-disable -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 155.139 155.139">
    <title>facebook</title>
    <path
      d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
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
    width: { type: Number, default: 155.139 },
    height: { type: Number, default: 155.139 },
  },
  data() {
    return { ...defaultData };
  },
});
</script>
