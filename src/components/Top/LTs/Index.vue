<!-- eslint-disable -->
<template>
  <section
    class="LTs"
    v-observe-visibility="{ callback: visibilityChanged, intersection: { threshold: [0.4] }, once: true }"
  >
    <div class="LTs__inner" :class="getVisibilityClass">
      <h2 class="LTs__header">recent lts</h2>
      <lt-list :lts="lts.slice(0, 3)" />
      <nuxt-link to="/lts" class="LTs__link">一覧はこちら 👉</nuxt-link>
    </div>
  </section>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.LTs {
  position: relative;
  width: 100%;
}

.LTs__inner {
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

.LTs__header {
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

.-visible .LTs__header {
  opacity: 1;
  animation: show-header 1.2s $easeOutExpo forwards;
}

.LTs__text {
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

.-visible .LTs__text {
  opacity: 1;
}

.LTs__link {
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

.-visible .LTs__link {
  opacity: 1;
}

.LTs__link:hover::after {
  transform: none;
}

.LTs__list {
  width: 100%;

  @include notSp {
    display: grid;
    grid-template:
      'cell1 cell2 cell3' auto /
      1fr 1fr 1fr;
    gap: 3%;
  }
}

.LTs__cell {
  line-height: 1.8;
  opacity: 0;
  transition: opacity 300ms ease-out;
}

.-visible .LTs__cell {
  opacity: 1;
}

@include sp {
  .LTs__cell:not(:first-child) {
    margin-top: 1em;
  }
}

@for $i from 1 through 3 {
  .LTs__cell:nth-child(#{$i}) {
    transition-delay: 400ms + $i * 100;

    @include notSp {
      grid-area: cell + $i;
    }
  }
}

.LTs__show {
  position: relative;
  display: block;
  width: 100%;
  color: #fff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }

  @include notSp {
    height: 100%;
  }
}

.LTs__show-border {
  position: absolute;
  display: block;
  user-select: none;
  pointer-events: none;
  transition: transform 200ms $easeOutExpo;
  background: currentColor;
}

.LTs__show-border.-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  transform-origin: left center;
  transform: scale3d(0, 1, 1);
}

.LTs__show-border.-right {
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  transform-origin: top center;
  transform: scale3d(1, 0, 1);
}

.LTs__show-border.-bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  transform-origin: right center;
  transform: scale3d(0, 1, 1);
}

.LTs__show-border.-left {
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  transform-origin: bottom center;
  transform: scale3d(1, 0, 1);
}

.LTs__show:hover .LTs__show-border {
  transform: scale3d(1, 1, 1);
}

.LTs__show-inner {
  display: grid;
  grid-template:
    'LTs__date' auto
    'LTs__title' 1fr /
    1fr;
  padding: 0 1vw;
  width: 100%;
  background-color: #0006;

  @include notSp {
    padding: 1.2em 1.5em;
    height: 100%;
  }
}

.LTs__date {
  grid-area: LTs__date;
  width: 100%;
  font-size: 3.75vw;
  padding: 0.5em 0;
  line-height: 1.2;

  $pc-font-size: 2;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    padding-top: 0;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.LTs__title {
  grid-area: LTs__title;
  width: 100%;

  $pc-font-size: 2.4;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    line-height: 1.6;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import dateFormat from 'date-fns/format';

import LtList from '~/components/Common/LTList.vue';
import { LT } from '~/value-objects/LT';

type Data = { isVisible: boolean };
type Methods = {
  getDateString(date: Date): string;
  visibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry) => void;
};
type Computed = { getVisibilityClass: string };
type Props = { lts: LT[] };

const defaultData: Data = { isVisible: false };

const components = { LtList };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: {
    lts: { type: Array, default: () => [] },
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
    getDateString(date: Date): string {
      return dateFormat(date, 'MMM, D YYYY');
    },
    visibilityChanged(isVisible, entry) {
      if (!isVisible) return;

      this.isVisible = true;
    },
  },
});
</script>
