<!-- eslint-disable -->
<template>
  <div>
    <breadcrumb :routes="routes" />
    <main
      id="main"
      class="Main"
      role="main"
      v-observe-visibility="{ callback: visibilityChanged, intersection: { threshold: [0.4] }, once: true }"
    >
      <div class="Main__inner" :class="getVisibilityClass">
        <h2 class="header">entries</h2>
        <p class="desc">エントリー一覧です。</p>
        <section
          v-for="year in Object.keys(entries)
            .sort()
            .reverse()"
          :key="year"
          class="Year"
        >
          <h3 class="Year__header">{{ year }}</h3>
          <entry-list class="Year__entry-list" :entries="entries[year]" />
        </section>
      </div>
    </main>
  </div>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Main {
  z-index: 1;
  position: relative;
  padding-top: 10vw;

  @include notSp {
    padding-top: 5rem;
  }
}

.Main__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 4vw;

  @include notSp {
    max-width: $maxWidth;
    padding: 0 $horizontalPadding;
    margin: auto;
  }
}

.header {
  width: 100%;
  font-size: 7.5vw;
  line-height: 1;
  margin-bottom: 0.5em;
  opacity: 0;
  transition: opacity 300ms ease-out;

  $pc-font-size: 4;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    margin-bottom: 1.5em;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.-visible .header {
  opacity: 1;
  animation: show-header 1.2s $easeOutExpo forwards;
}

.desc {
  line-height: 1.6;

  $pc-font-size: 1.6;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.Year {
  width: 100%;
  margin-top: 20vw;

  @include notSp {
    margin-top: 10rem;
  }
}

.Year__header {
  position: relative;
  display: inline-block;
  font-size: 5.357vw;
  padding: 0 0.5em;
  margin-bottom: 0.5em;
  background: rgba($colorBrand, 0.3);

  $pc-font-size: 2.8;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: -1em;
    left: 0;
    display: block;
    width: 1em;
    height: 1px;
    background: currentColor;
  }
}

.Year__entry-list {
  width: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue';

import { Entry } from '~/value-objects/Entry';
import { Thumbnail } from '~/value-objects/Thumbnail';
import ContentSection from '~/components/About/ContentSection.vue';
import SectionBreak from '~/components/SectionBreak.vue';
import EntryList from '~/components/Common/EntryList.vue';
import Breadcrumb, { Route } from '~/components/Common/Breadcrumb.vue';

type KeyYearEntries = { [year: number]: Entry[] };

type Data = { isVisible: boolean };
type Methods = {
  getEntryListStyle: (thumbnail?: Thumbnail) => { backgroundImage?: string };
  visibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry) => void;
};
type Computed = { entries: KeyYearEntries; getVisibilityClass: string; routes: Route[] };
type Props = {};

const defaultData: Data = { isVisible: false };

const components = { ContentSection, SectionBreak, EntryList, Breadcrumb };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  computed: {
    entries() {
      const { entries }: { entries: Entry[] } = this.$store.state.entries;
      const sortedEntries: KeyYearEntries = entries
        .map(entry => ({ entry, year: entry.publish.getFullYear() }))
        .reduce(
          (tmp, { year, entry }) => ({
            ...tmp,
            [year]: [...(tmp[year] ? tmp[year] : []), entry],
          }),
          {},
        );
      return sortedEntries;
    },
    getVisibilityClass() {
      return this.isVisible ? '-visible' : '';
    },
    routes() {
      return [{ to: '/', desc: 'Top' }, { desc: 'entries' }];
    },
  },
  methods: {
    getEntryListStyle(thumbnail?: Thumbnail): { backgroundImage?: string } {
      return thumbnail ? { backgroundImage: `url('${thumbnail.url}')` } : {};
    },
    visibilityChanged(isVisible, entry) {
      if (!isVisible) return;

      this.isVisible = true;
    },
  },
});
</script>
