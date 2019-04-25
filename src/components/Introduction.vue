<template>
  <section class="Introduction">
    <div class="Introduction__background" role="presentation">
      <span v-for="i in backgroundSplitCount" :key="i" class="Introduction__background-block" />
    </div>
    <div class="Introduction__inner">Loading{{ dotString }}</div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

type Data = { dotCount: number; finishedPromises: number; intervalID?: NodeJS.Timeout };
type Methods = {};
type Computed = { dotString: string; backgroundSplitCount: number };
type Props = { tasks: Promise<any>[] };

const defaultData: Data = { dotCount: 0, finishedPromises: 0 };
const maxDotCount = 3;

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return { ...defaultData };
  },
  computed: {
    dotString(): string {
      return [...Array(this.dotCount).keys()].map(() => '.').join('');
    },
    backgroundSplitCount(): number {
      return 12;
    },
  },
  mounted() {
    console.log('mounted!');
    if (this.intervalID) return;
    this.intervalID = setInterval(() => {
      this.dotCount = (this.dotCount + 1) % (maxDotCount + 1);
    }, 1000);

    this.tasks.forEach(promise =>
      promise.then(() => {
        this.finishedPromises += 1;
        if (this.finishedPromises === this.tasks.length) {
          this.$emit('on-finished');
        }
      }),
    );
  },
  beforeDestroy() {
    if (!this.intervalID) return;
    clearInterval(this.intervalID);
  },
});
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */

.Introduction {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #fff;
}

.Introduction__background {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  @include notSp {
    flex-direction: column;
  }
}

.Introduction__background-block {
  display: block;
  width: 100%;
  height: 100%;
  background: #ccc;
  transition: transform 600ms $easeInOutQuart;
}

.-wipe .Introduction__background-block {
  transform: translate3d(0, -100%, 0);

  @include notSp {
    transform: translate3d(-100%, 0, 0);
  }
}

.-wipe .Introduction__background-block:nth-child(2n) {
  transform: translate3d(0, 100%, 0);

  @include notSp {
    transform: translate3d(100%, 0, 0);
  }
}

.Introduction__background-block:first-child {
  border-color: transparent;
}

.Introduction__background-block:nth-child(2) {
  transition-delay: 90ms;
}

.Introduction__background-block:nth-child(3) {
  transition-delay: 110ms;
}

.Introduction__background-block:nth-child(4) {
  transition-delay: 180ms;
}

.Introduction__background-block:nth-child(5) {
  transition-delay: 140ms;
}

.Introduction__background-block:nth-child(6) {
  transition-delay: 190ms;
}

.Introduction__background-block:nth-child(7) {
  transition-delay: 200ms;
}

.Introduction__background-block:nth-child(8) {
  transition-delay: 120ms;
}

.Introduction__background-block:nth-child(9) {
  transition-delay: 70ms;
}

.Introduction__background-block:nth-child(10) {
  transition-delay: 80ms;
}

.Introduction__background-block:nth-child(11) {
  transition-delay: 160ms;
}

.Introduction__background-block:last-child {
  transition-delay: 40ms;
}

.Introduction__inner {
  z-index: 1;
}
</style>
