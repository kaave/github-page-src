<!-- eslint-disable -->
<template>
  <ul class="LTs__lts">
    <li v-for="(lts, i) in divideLTs" :key="i" class="LTs__lts-cell">
      <ul class="LTs__list">
        <li v-for="{ date, eventName, title, description, link } in lts" :key="title" class="LTs__cell">
          <a :href="link" class="LTs__show" target="_blank" rel="noopener">
            <span
              v-for="key in ['top', 'right', 'bottom', 'left']"
              :key="key"
              class="LTs__show-border"
              :class="`-${key}`"
              role="presentation"
            ></span>
            <div class="LTs__show-inner">
              <div class="LTs__date">{{ getDateString(date) }} @ {{ eventName }}</div>
              <div class="LTs__title">{{ title }}</div>
            </div>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.LTs__lts {
  width: 100%;
}

.LTs__lts-cell:not(:first-child) {
  margin-top: 1em;
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

import { LT } from '~/value-objects/LT';

type Data = {};
type Methods = {
  getDateString(date: Date): string;
  getLink(date: Date): string;
};
type Computed = { divideLTs: LT[][] };
type Props = { lts: LT[] };

const defaultData: Data = { isVisible: false };

const components = {};

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: {
    lts: { type: Array, default: () => [] },
  },
  data() {
    return { ...defaultData };
  },
  computed: {
    divideLTs() {
      const result: LT[][] = [];
      this.lts
        .map((lt, i) => ({ lt, index: Math.floor(i / 3) }))
        .forEach(({ lt, index: i }) => (result[i] = [...(result[i] ? result[i] : []), lt]));

      return result;
    },
  },
  methods: {
    getDateString(date: Date): string {
      return dateFormat(date, 'MMM, D YYYY');
    },
    getLink(date: Date): string {
      return dateFormat(date, 'YYYY-MM-DD');
    },
  },
});
</script>
