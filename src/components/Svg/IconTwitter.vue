<!-- eslint-disable -->
<template>
  <svg :width="width" :height="height" viewBox="0 0 250 203.2" xmlns="http://www.w3.org/2000/svg">
    <title>Twitter</title>
    <path
      d="M78.62 203.163c94.34 0 145.94-78.16 145.94-145.94 0-2.22 0-4.43-.15-6.63A104.356 104.356 0 0 0 250 24.043a102.358 102.358 0 0 1-29.46 8.07 51.467 51.467 0 0 0 22.55-28.37 102.773 102.773 0 0 1-32.57 12.45c-27.075-28.79-75.164-17.474-86.559 20.369a51.339 51.339 0 0 0-.851 26.411A145.62 145.62 0 0 1 17.4 9.383C3.786 32.82 10.74 62.802 33.28 77.853A50.915 50.915 0 0 1 10 71.433v.65c.007 24.416 17.218 45.446 41.15 50.28a51.193 51.193 0 0 1-23.16.88c6.72 20.894 25.976 35.208 47.92 35.62a102.911 102.911 0 0 1-63.7 22 104.461 104.461 0 0 1-12.21-.74 145.208 145.208 0 0 0 78.62 23"
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
    width: { type: Number, default: 250 },
    height: { type: Number, default: 203.2 },
  },
  data() {
    return { ...defaultData };
  },
});
</script>
