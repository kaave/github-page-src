<!-- eslint-disable -->
<template>
  <main id="main" class="Main" role="main">
    <top-component />
    <section-break />
    <about-component />
    <section-break />
    <entries-component :entries="parsedEntries" />
    <section-break />
    <lts-component :lts="parsedLTs" />
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
import { mapGetters, mapMutations, MutationMethod } from 'vuex';

import { MutationKeys } from '../store';
import EntriesQuery from '../apollo/query/entries.gql';
import LTsQuery from '../apollo/query/lts.gql';
import { Entry, EntryJson } from '../value-objects/Entry';
import { LT, LTJson } from '../value-objects/LT';
import TopComponent from './Top/Top/Index.vue';
import AboutComponent from './Top/About/Index.vue';
import EntriesComponent from './Top/Entries/Index.vue';
import LtsComponent from './Top/LTs/Index.vue';
import SectionBreak from './SectionBreak.vue';

const vuexGetters = mapGetters(['entered']);

type Data = { entries: EntryJson[]; lts: LTJson[] };
type Methods = {
  [x: string]: MutationMethod;
};
type Computed = { parsedEntries: Entry[]; parsedLTs: LT[] } | typeof vuexGetters;
type Props = {};

const defaultData: Data = { entries: [], lts: [] };

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
    parsedEntries() {
      return this.entries.map<Entry>(src => ({
        ...src,
        publish: new Date(src.publish),
        entryHtml: this.$md.render(src.entry),
      }));
    },
    parsedLTs() {
      return this.lts.map<LT>(src => ({ ...src, date: new Date(src.date) }));
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
  apollo: {
    entries: {
      query: EntriesQuery,
      variables: {
        orderBy: 'publish_DESC',
      },
    },
    lts: {
      query: LTsQuery,
      variables: {
        orderBy: 'date_DESC',
      },
    },
  },
});
</script>
