<!-- eslint-disable -->
<template>
  <section
    class="Entries"
    v-observe-visibility="{ callback: visibilityChanged, intersection: { threshold: [0.4] }, once: true }"
  >
    <div class="Entries__inner" :class="getVisibilityClass">
      <h2 class="Entries__header">recent entries</h2>
      <entry-list :entries="entries.slice(0, 3)" />
      <nuxt-link to="/entries" class="Entries__link">一覧はこちら 👉</nuxt-link>
    </div>
  </section>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Entries {
  position: relative;
  width: 100%;
}

.Entries__inner {
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

.Entries__header {
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

.-visible .Entries__header {
  opacity: 1;
  animation: show-header 1.2s $easeOutExpo forwards;
}

.Entries__text {
  font-size: 3.75vw;
  line-height: 1.8;
  opacity: 0;
  transition: opacity 300ms 400ms ease-out;

  $pc-font-size: 1.6;
  @include notSp {
    line-height: 1.6;
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.-visible .Entries__text {
  opacity: 1;
}

.Entries__link {
  position: relative;
  display: inline-block;
  margin-top: 1em;
  font-size: 4.286vw;
  color: currentColor;
  opacity: 0;
  transition: opacity 300ms 400ms ease-out;
  overflow: hidden;

  $pc-font-size: 1.8;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    margin-top: 3em;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }

  &::before,
  &::after {
    content: '';
    z-index: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: $colorWhite;
  }

  &::before {
    opacity: 0.3;
  }

  &::after {
    transform: translate3d(-100%, 0, 0);
    transition: transform 400ms $easeOutExpo;
  }
}

.-visible .Entries__link {
  opacity: 1;
}

.Entries__link:hover::after {
  transform: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import dateFormat from 'date-fns/format';

import { Entry } from '~/value-objects/Entry';
import { Thumbnail } from '~/value-objects/Thumbnail';
import EntryList from '~/components/Common/EntryList.vue';

type Data = { isVisible: boolean };
type Methods = { visibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry) => void };
type Computed = { getVisibilityClass: string };
type Props = { entries: Entry[] };

const defaultData: Data = { isVisible: false };

const components = { EntryList };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: {
    entries: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return { ...defaultData };
  },
  computed: {
    getVisibilityClass() {
      return this.isVisible ? '-visible' : '';
    },
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (!isVisible) return;

      this.isVisible = true;
    },
  },
});
</script>
