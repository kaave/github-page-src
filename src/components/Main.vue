<!-- eslint-disable -->
<template>
  <main id="main" class="Main" role="main">
    <top-component />
    <hr class="SectionBreak" />
    <about-component />
    <hr class="SectionBreak" />
    <entries-component :entries="parsedEntries" />
    <hr class="SectionBreak" />
    <lts-component :lts="parsedLTs" />
  </main>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Main {
  z-index: 1;
  position: relative;
}

.SectionBreak {
  border: 0;
  padding: 0;
  margin: 15vw auto;
  width: 30vw;
  height: 1px;
  background: rgba($colorWhite, 0.8);

  @include notSp {
    margin: 50px auto;
    max-width: 200px;
  }
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
import TopComponent from './Top/Index.vue';
import AboutComponent from './About/Index.vue';
import EntriesComponent from './Entries/Index.vue';
import LtsComponent from './LTs/Index.vue';

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
