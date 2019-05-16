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
      <article v-if="entry" class="Main__inner Article" :class="getVisibilityClass">
        <header class="Article__header Header" :style="thumbnailStyle">
          <div class="Header__inner">
            <p class="Header__date">{{ publish }}</p>
            <p class="Header__subject">{{ subject }}</p>
          </div>
        </header>
        <div class="Article__content Content" v-html="entryHtml" />
      </article>
    </main>
  </div>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Main {
  z-index: 1;
  position: relative;
  padding-top: 20vw;

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
  padding: 0;

  @include notSp {
    max-width: $maxWidth;
    margin: auto;
  }
}

.Header {
  position: relative;
  display: block;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.Header::before {
  content: '';
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-top: calc(100% / 16 * 9);
}

.Header__inner {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  font-size: 7.5vw;

  $pc-font-size: 4;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.Header__date {
  padding: 0.8em $horizontalPaddingSp 0.3em;
  font-size: 0.7em;
  width: 100%;
  background: rgba($colorBlack, 0.8);
}

.Header__subject {
  padding: 0 $horizontalPaddingSp 0.5em;
  line-height: 1.6;
  width: 100%;
  background: rgba($colorBlack, 0.8);
}

.Content {
  display: block;
  width: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue';
import dateFormat from 'date-fns/format';

import { Entry } from '~/value-objects/Entry';
import { Thumbnail } from '~/value-objects/Thumbnail';
import SectionBreak from '~/components/SectionBreak.vue';
import Breadcrumb, { Route } from '~/components/Common/Breadcrumb.vue';

type Data = { isVisible: boolean; entry?: Entry };
type Methods = {
  visibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry) => void;
};
type Computed = {
  getVisibilityClass: string;
  publish: string;
  subject: string;
  entryHtml: string;
  thumbnailStyle: { backgroundImage?: string };
};
type Props = {};

const defaultData: Data = { isVisible: false, entry: undefined };

const components = { SectionBreak, Breadcrumb };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  computed: {
    getVisibilityClass() {
      return this.isVisible ? '-visible' : '';
    },
    publish() {
      return this.entry ? dateFormat(this.entry.publish, 'MMM, D YYYY') : '';
    },
    subject() {
      return this.entry ? this.entry.subject : '';
    },
    entryHtml() {
      return this.entry ? this.entry.entryHtml : '';
    },
    thumbnailStyle() {
      return this.entry && this.entry.thumbnail ? { backgroundImage: `url('${this.entry.thumbnail.url}')` } : {};
    },
    routes() {
      return [{ to: '/', desc: 'Top' }, { to: '/entries', desc: 'entries' }, { desc: this.subject }];
    },
  },
  mounted() {
    const { ymd } = this.$route.params;
    const { entries }: { entries: Entry[] } = this.$store.state.entries;

    const entry = entries.find(({ publish }) => dateFormat(publish, 'YYYY-MM-DD') === ymd);
    if (!entry) {
      if (!this.$isServer) {
        window.location.href = '/404.html';
        return;
      }

      console.error(`not found entry: ${entry}`);
    }

    this.entry = entry;
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (!isVisible) return;

      this.isVisible = true;
    },
  },
  validate({ params }) {
    const { ymd } = params;

    return /^\d{4}-\d{2}-\d{2}$/.test(ymd);
  },
});
</script>
