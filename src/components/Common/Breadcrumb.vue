<!-- eslint-disable -->
<template>
  <nav
    class="Breadcrumb"
    v-observe-visibility="{ callback: visibilityChanged, intersection: { threshold: [0.4] }, once: true }"
  >
    <div class="Breadcrumb__inner" :class="getVisibilityClass">
      <ol class="List">
        <li v-for="{ to, desc } in routes || []" :key="to" class="Cell">
          <nuxt-link v-if="to" :to="to" class="Link">{{ desc }}</nuxt-link>
          <span v-else class="Current">{{ desc }}</span>
        </li>
      </ol>
    </div>
  </nav>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Breadcrumb {
  z-index: 1;
  position: relative;
  width: 100%;
  padding-top: 5vw;
  font-size: 3.75vw;

  $pc-font-size: 1.6;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    padding-top: 5rem;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.Breadcrumb__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 $horizontalPaddingSp;

  @include notSp {
    max-width: $maxWidth;
    padding: 0 $horizontalPadding;
    margin: auto;
  }
}

.List {
  position: relative;
  width: 100%;
  padding: 0.3em;
}

.Cell {
  position: relative;
  color: $colorBlack;
}

.Cell + .Cell > *::before {
  content: '>';
  padding-right: 0.5em;
}

.Cell > * {
  position: relative;
  display: inline-block;
  padding: 0 0.5em;
  line-height: 1;
  color: currentColor;
  background: rgba($colorWhite, 0.8);
}

.Cell > *::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: $colorBlack;
  transform-origin: right;
  transition: transform 200ms 300ms $easeOutExpo;
}

.-visible .Cell > *::after {
  transform: scale3d(0, 1, 1);
}

.Cell:nth-child(2) > * {
  margin-left: 0.5em;
}

.Cell:nth-child(3) > * {
  margin-left: 1em;
}

.Link {
  font-style: italic;

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';

export type Route = { to?: string; desc: string };

type Data = { isVisible: boolean };
type Methods = {
  nl2br: (s: string) => string;
  visibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry) => void;
};
type Computed = { getVisibilityClass: string };
type Props = { routes: Route[] };

const defaultData: Data = { isVisible: false };

const components = {};

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: { routes: { type: Array, default: () => [] } },
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
