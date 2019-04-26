<template>
  <div class="Container">
    <introduction-component v-if="!isLoaded" :is-loaded="isLoaded" :tasks="tasks" @on-finished="onTaskFinished" />
    <header id="header" class="Header" role="banner">Header</header>
    <main id="main" class="Main" role="main" v-html="$md.render(entries[0].entry)"></main>
    <footer id="footer" class="Footer">Footer</footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import EntriesQuery from '../apollo/query/entries.gql';
import IntroductionComponent from '~/components/Introduction.vue';

type Entry = {
  status: string;
  id: string;
  publish: string;
  subject: string;
  entry: string;
};

type Data = {
  tasks: Promise<any>[];
  entries: Entry[];
  isLoaded: boolean;
};
type Methods = {};
type Computed = {};
type Props = {};

const tasks = [...Array(5).keys()].map(i => new Promise(resolve => setTimeout(resolve, i * 500)));
if (typeof window !== 'undefined') {
  tasks.push(new Promise(resolve => window.addEventListener('load', resolve)));
}
const defaultData: Data = { tasks, entries: [], isLoaded: false };
const components = { IntroductionComponent };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  mounted() {
    console.log(this.entries);
  },
  methods: {
    onTaskFinished() {
      this.isLoaded = true;
    },
  },
  apollo: {
    entries: {
      query: EntriesQuery,
    },
  },
});
</script>

<style lang="scss" scoped>
.Container {
  position: relative;
  display: block;
  width: 100%;
  min-height: 100vh;
}
</style>
