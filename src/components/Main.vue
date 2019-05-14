<!-- eslint-disable -->
<template>
  <div>
    <span role="presentation" class="PageTopHook" ref="hook"></span>
    <navigation-component :menus="menus" :snses="snses" :is-on-top="isOnTop" />
    <main id="main" class="Main" role="main">
      <top-component />
      <hr class="SectionBreak" />
      <about-component />
      <hr class="SectionBreak" />
      <entries-component :entries="parsedEntries" />
      <hr class="SectionBreak" />
      <lts-component :lts="parsedLTs" />
    </main>
    <footer-component :menus="menus" :snses="snses" />
  </div>
</template>
<!-- eslint-enable -->

<!--
v-observe-visibility="{ callback: visibilityChanged, intersection: { threshold: [0,0.1,1] }, once: false }"
-->

<style lang="scss" scoped>
.PageTopHook {
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  pointer-events: none;
  display: block;
  width: 1px;
  height: 1px;
  background: #f00;
}

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
import NavigationComponent from './Navigation/Index.vue';
import TopComponent from './Top/Index.vue';
import AboutComponent from './About/Index.vue';
import EntriesComponent from './Entries/Index.vue';
import LtsComponent from './LTs/Index.vue';
import FooterComponent from './Footer/Index.vue';

const vuexGetters = mapGetters(['entered']);

type Data = { entries: EntryJson[]; lts: LTJson[]; isOnTop: boolean };
type Methods = {
  [x: string]: MutationMethod;
};
type Computed =
  | { parsedEntries: Entry[]; parsedLTs: LT[]; menus: string[]; snses: { key: string; url: string; desc: string }[] }
  | typeof vuexGetters;
type Props = {};

const defaultData: Data = { entries: [], lts: [], isOnTop: true };

const components = {
  NavigationComponent,
  TopComponent,
  AboutComponent,
  EntriesComponent,
  LtsComponent,
  FooterComponent,
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
    menus() {
      return ['about', 'entries', 'lts'];
    },
    snses() {
      return [
        { key: 'twitter', url: 'https://twitter.com/junkjunctions', desc: '@junkjunctions' },
        { key: 'facebook', url: 'https://www.facebook.com/kyousuke.abe.9', desc: 'Kyousuke Abe' },
        { key: 'github', url: 'https://github.com/kaave', desc: 'kaave' },
        { key: 'wantedly', url: 'https://www.wantedly.com/users/57487254', desc: '安部亨佑' },
      ];
    },
    ...vuexGetters,
  },
  watch: {
    entered(val) {
      console.log(val);
    },
  },
  mounted() {
    const { hook } = this.$refs;
    if (!(hook instanceof HTMLElement)) return;

    const observer = new IntersectionObserver(
      event => event.forEach(entry => (this.isOnTop = entry.intersectionRatio === 1)),
      { threshold: [0, 1] },
    );
    observer.observe(hook);
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
