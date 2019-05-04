<template>
  <div>
    <header id="header" class="Header" role="banner">Header</header>
    <main id="main" class="Main" role="main" v-html="parsedEntries"></main>
    <footer id="footer" class="Footer">
      <button @click="clickClick">click!</button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, MutationMethod } from 'vuex';

import { MutationKeys } from '../store';
import EntriesQuery from '../apollo/query/entries.gql';
import { Entry, EntryJson } from '../value-objects/Entry';

const vuexGetters = mapGetters(['entered']);

type Data = { entries: EntryJson[] };
type Methods = { [x: string]: MutationMethod };
type Computed = { parsedEntries: Entry[] } | typeof vuexGetters;
type Props = {};

const defaultData: Data = { entries: [] };

export default Vue.extend<Data, Methods, Computed, Props>({
  data() {
    return { ...defaultData };
  },
  computed: {
    parsedEntries() {
      return this.entries.map<Entry>(src => ({
        ...src,
        publish: new Date(src.publish),
        entry: this.$md.render(src.entry),
      }));
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
    },
  },
});
</script>
