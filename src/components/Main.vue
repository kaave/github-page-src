<!-- eslint-disable -->
<template>
  <div>
    <navigation-component />
    <main id="main" class="Main" role="main">
      <top-component />
      <about-component />
    </main>
    <footer-component />
  </div>
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
import { Entry, EntryJson } from '../value-objects/Entry';
import NavigationComponent from './Navigation/Index.vue';
import TopComponent from './Top/Index.vue';
import AboutComponent from './About/Index.vue';
import FooterComponent from './Footer/Index.vue';

const vuexGetters = mapGetters(['entered']);

type Data = { entries: EntryJson[] };
type Methods = { [x: string]: MutationMethod };
type Computed = { parsedEntries: Entry[] } | typeof vuexGetters;
type Props = {};

const defaultData: Data = { entries: [] };

const components = { NavigationComponent, TopComponent, AboutComponent, FooterComponent };

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
