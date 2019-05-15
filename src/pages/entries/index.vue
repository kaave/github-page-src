<!-- eslint-disable -->
<template>
  <main id="main" class="Main" role="main">
    <div class="Main__inner">
      <h2 class="header">entries</h2>
    </div>
  </main>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Main {
  z-index: 1;
  position: relative;
  padding-top: 20vw;

  @include notSp {
    padding-top: 5rem;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, MutationMethod } from 'vuex';

import ContentSection from '~/components/About/ContentSection.vue';
import SectionBreak from '~/components/SectionBreak.vue';

type Data = {};
type Methods = {};
type Computed = {};
type Props = {};

const defaultData: Data = {};

const components = { ContentSection, SectionBreak };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
});
</script>
