<template>
  <div>
    <header id="header" class="Header" role="banner">Header</header>
    <main id="main" class="Main" role="main" v-html="parsedEntries"></main>
    <footer id="footer" class="Footer">Footer</footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import EntriesQuery from '../apollo/query/entries.gql';
import { Entry, EntryJson } from '../value-objects/Entry';

type Data = { entries: EntryJson[] };
type Methods = {};
type Computed = { parsedEntries: Entry[] };
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
  },
  apollo: {
    entries: {
      query: EntriesQuery,
    },
  },
});
</script>
