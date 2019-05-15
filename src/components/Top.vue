<!-- eslint-disable -->
<template>
  <main id="main" class="Main" role="main">
    <top-component />
    <section-break />
    <about-component />
    <section-break />
    <entries-component :entries="entries" />
    <section-break />
    <lts-component :lts="lts" />
  </main>
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
import { mapGetters, mapMutations, MutationMethod, ActionMethod } from 'vuex';

import { MutationKeys } from '../store';
import { Entry } from '../value-objects/Entry';
import { LT } from '../value-objects/LT';
import TopComponent from './Top/Top/Index.vue';
import AboutComponent from './Top/About/Index.vue';
import EntriesComponent from './Top/Entries/Index.vue';
import LtsComponent from './Top/LTs/Index.vue';
import SectionBreak from './SectionBreak.vue';

const vuexGetters = mapGetters(['entered']);

type Data = {};
type Methods = {
  [x: string]: MutationMethod | ActionMethod;
};
type Computed = { entries: Entry[]; lts: LT[] } | typeof vuexGetters;
type Props = {};

const defaultData: Data = {};

const components = {
  TopComponent,
  AboutComponent,
  EntriesComponent,
  LtsComponent,
  SectionBreak,
};

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  computed: {
    entries() {
      return this.$store.state.entries.entries;
    },
    lts() {
      return this.$store.state.lts.lts;
    },
    ...vuexGetters,
  },
  watch: {
    entered(val) {
      console.log(val);
    },
  },
  methods: {
    ...mapMutations({ clickClick: 'click' }),
  },
});
</script>
