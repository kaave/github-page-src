<!-- eslint-disable -->
<template>
  <section
    class="Section"
    v-observe-visibility="{ callback: visibilityChanged, intersection: { threshold: [0.4] }, once: true }"
  >
    <div class="inner" :class="getVisibilityClass">
      <h2 class="header">{{ title }}</h2>
      <p v-for="(s, i) in desc" :key="i" class="desc" v-html="nl2br(s)" />
    </div>
  </section>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Section {
  position: relative;
  display: block;
  width: 100%;
  color: $colorWhite;
}

.inner {
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
  font-size: 3.75vw;
  line-height: 1.8;
  opacity: 0;
  transition: opacity 300ms 400ms ease-out;

  $pc-font-size: 1.6;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.desc + .desc {
  margin-top: 1em;
}

.-visible .desc {
  opacity: 1;
}
</style>

<script lang="ts">
import Vue from 'vue';

type Data = { isVisible: boolean };
type Methods = {
  nl2br: (s: string) => string;
  visibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry) => void;
};
type Computed = { getVisibilityClass: string };
type Props = { title: string; desc: string[] };

const defaultData: Data = { isVisible: false };

const components = {};

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: { title: { type: String, default: '' }, desc: { type: Array, default: () => [] } },
  data() {
    return { ...defaultData };
  },
  computed: {
    getVisibilityClass() {
      return this.isVisible ? '-visible' : '';
    },
  },
  methods: {
    nl2br(s) {
      return s.replace(/[\r\n|\r|\n]/g, '<br>$&');
    },

    visibilityChanged(isVisible, entry) {
      if (!isVisible) return;

      this.isVisible = true;
    },
  },
});
</script>
