<template>
  <div>
    <navigation-component />
    <main id="main" class="Main" role="main" hidden v-html="parsedEntries"></main>
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
import NavigationComponent from './Navigation/Index.vue';

const vuexGetters = mapGetters(['entered']);

type Data = { entries: EntryJson[] };
type Methods = { [x: string]: MutationMethod };
type Computed = { parsedEntries: Entry[] } | typeof vuexGetters;
type Props = {};

const defaultData: Data = { entries: [] };

const components = { NavigationComponent };

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
