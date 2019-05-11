<!-- eslint-disable -->
<template>
  <section class="Entries">
    <div class="Entries__inner">
      <h2 class="Entries__header">recent entries</h2>
      <ol class="Entries__list">
        <li v-for="{ status, id, publish, subject, thumbnail } in entries.slice(0, 3)" :key="id" class="Entries__cell">
          <nuxt-link :to="`/entries/${id}`" class="Entries__show" :style="getCellStyle(thumbnail)">
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
}

.Entries__header {
  font-size: 7.5vw;
  line-height: 1;
  letter-spacing: 0.05em;
  margin-bottom: 0.5em;
}

.Entries__text {
  font-size: 3.75vw;
  line-height: 1.8;
}

.Entries__link {
  position: relative;
  display: inline-block;
  margin-top: 1em;
  font-size: 4.286vw;
  color: currentColor;

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
  }
}

.Entries__list {
  width: 100%;
}

.Entries__cell {
  line-height: 1.8;
}

.Entries__cell:not(:first-child) {
  margin-top: 1em;
}

.Entries__show {
  position: relative;
  display: block;
  width: 100%;
  color: #fff;
  background-size: cover;
  background-position: center;
  background-repeat: none;

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }
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
}

.Entries__date {
  grid-area: Entries__date;
  width: 100%;
  font-size: 3.75vw;
  padding: 0.5em 0;
  line-height: 1;
}

.Entries__subject {
  grid-area: Entries__subject;
  width: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue';
import dateFormat from 'date-fns/format';

import { Entry } from '~/value-objects/Entry';
import { Thumbnail } from '~/value-objects/Thumbnail';

type Data = {};
type Methods = { getDateString(date: Date): string; getCellStyle(thumbnail?: Thumbnail): { backgroundImage?: string } };
type Computed = {};
type Props = { entries: Entry[] };

const defaultData: Data = {};

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
  methods: {
    getDateString(date: Date): string {
      return dateFormat(date, 'MMM, D YYYY');
    },
    getCellStyle(thumbnail?: Thumbnail): { backgroundImage?: string } {
      if (!thumbnail) return {};

      return { backgroundImage: `url('${thumbnail.url}')` };
    },
  },
});
</script>
