<!-- eslint-disable -->
<template>
  <ul class="Entries__entries">
    <li v-for="(entries, i) in divideEntries" :key="i" class="Entries__entries-cell">
      <ul class="Entries__list">
        <li v-for="{ id, thumbnail, publish, subject } in entries" :key="id" class="Entries__cell">
          <nuxt-link :to="`/entries/${getLink(publish)}`" class="Entries__show" :style="getCellStyle(thumbnail)">
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
      </ul>
    </li>
  </ul>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
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
import EntryList from '~/components/Common/EntryList.vue';

type Data = {};
type Methods = {
  getDateString(date: Date): string;
  getCellStyle(thumbnail?: Thumbnail): { backgroundImage?: string };
  getLink(date: Date): string;
};
type Computed = { divideEntries: Entry[][] };
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
    divideEntries() {
      const result: Entry[][] = [];
      this.entries
        .map((entry, i) => ({ entry, index: Math.floor(i / 3) }))
        .forEach(({ entry, index: i }) => (result[i] = [...(result[i] ? result[i] : []), entry]));

      return result;
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
    getLink(date: Date): string {
      return dateFormat(date, 'YYYY-MM-DD');
    },
  },
});
</script>
