<!-- eslint-disable -->
<template>
  <section class="Credits">
    <div class="Credits__inner">
      <h2 class="Credits__header">credits</h2>
      <copyright>@2019 kaave</copyright>
      <a href="/LICENSES" class="Credits__link" target="_blank" rel="noopener">dependency libraries</a>
    </div>
  </section>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Credits {
  position: relative;
  width: 100%;
}

.Credits__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 4vw;
}

.Credits__header {
  font-size: 7.5vw;
  line-height: 1;
  letter-spacing: 0.05em;
  margin-bottom: 0.5em;
}

.Credits__link {
  position: relative;
  display: inline-block;
  margin-top: 1em;
  font-size: 4.286vw;
  color: currentColor;

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }

  &::after {
    content: '';
    z-index: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background: rgba($colorWhite, 0.6);
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import dateFormat from 'date-fns/format';

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
