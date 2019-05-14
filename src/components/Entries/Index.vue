<!-- eslint-disable -->
<template>
  <section
    class="Entries"
    v-observe-visibility="{ callback: visibilityChanged, intersection: { threshold: [0.4] }, once: true }"
  >
    <div class="Entries__inner" :class="getVisibilityClass">
      <h2 class="Entries__header">recent entries</h2>
      <ol class="Entries__list">
        <li v-for="{ status, id, publish, subject, thumbnail } in entries.slice(0, 3)" :key="id" class="Entries__cell">
          <nuxt-link :to="`/entries/${id}`" class="Entries__show" :style="getCellStyle(thumbnail)">
            <span
              v-for="key in ['top', 'right', 'bottom', 'left']"
              :key="key"
              class="Entries__show-border"
              :class="`-${key}`"
              role="presentation"
            ></span>
            <div class="Entries__show-inner">
              <div class="Entries__date">{{ getDateString(publish) }}</div>
              <div class="Entries__subject">{{ subject }}</div>
            </div>
          </nuxt-link>
        </li>
      </ol>
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

  &::after {
    content: '';
    z-index: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background: rgba($colorWhite, 0.6);
    transition: background-color 200ms $easeOutExpo;
  }
}

.-visible .Entries__link {
  opacity: 1;
}

.Entries__link:hover::after {
  background-color: rgba($colorWhite, 0.9);
}

.Entries__list {
  width: 100%;

  @include notSp {
    display: grid;
    grid-template:
      'cell1 cell2 cell3' auto /
      1fr 1fr 1fr;
    gap: 3%;
  }
}

.Entries__cell {
  line-height: 1.8;
  opacity: 0;
  transition: opacity 300ms ease-out;
}

.-visible .Entries__cell {
  opacity: 1;
}

@include sp {
  .Entries__cell:not(:first-child) {
    margin-top: 1em;
  }
}

@for $i from 1 through 3 {
  .Entries__cell:nth-child(#{$i}) {
    transition-delay: 400ms + $i * 100;

    @include notSp {
      grid-area: cell + $i;
    }
  }
}

.Entries__show {
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

.Entries__show-border {
  position: absolute;
  display: block;
  user-select: none;
  pointer-events: none;
  transition: transform 200ms $easeOutExpo;
  background: currentColor;
}

.Entries__show-border.-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  transform-origin: left center;
  transform: scale3d(0, 1, 1);
}

.Entries__show-border.-right {
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  transform-origin: top center;
  transform: scale3d(1, 0, 1);
}

.Entries__show-border.-bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  transform-origin: right center;
  transform: scale3d(0, 1, 1);
}

.Entries__show-border.-left {
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  transform-origin: bottom center;
  transform: scale3d(1, 0, 1);
}

.Entries__show:hover .Entries__show-border {
  transform: scale3d(1, 1, 1);
}

.Entries__show-inner {
  display: grid;
  grid-template:
    'Entries__date' auto
    'Entries__subject' 1fr /
    1fr;
  padding: 0 1vw;
  width: 100%;
  background-color: #0008;

  @include notSp {
    padding: 1.2em 1.5em;
    height: 100%;
  }
}

.Entries__date {
  grid-area: Entries__date;
  width: 100%;
  font-size: 3.75vw;
  padding: 0.5em 0;
  line-height: 1;

  $pc-font-size: 2;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    padding-top: 0;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.Entries__subject {
  grid-area: Entries__subject;
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

import { Entry } from '~/value-objects/Entry';
import { Thumbnail } from '~/value-objects/Thumbnail';

type Data = { isVisible: boolean };
type Methods = {
  getDateString(date: Date): string;
  getCellStyle(thumbnail?: Thumbnail): { backgroundImage?: string };
  visibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry) => void;
};
type Computed = { getVisibilityClass: string };
type Props = { entries: Entry[] };

const defaultData: Data = { isVisible: false };

const components = {};

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
    getDateString(date: Date): string {
      return dateFormat(date, 'MMM, D YYYY');
    },
    getCellStyle(thumbnail?: Thumbnail): { backgroundImage?: string } {
      if (!thumbnail) return {};

      return { backgroundImage: `url('${thumbnail.url}')` };
    },
    visibilityChanged(isVisible, entry) {
      if (!isVisible) return;

      this.isVisible = true;
    },
  },
});
</script>
