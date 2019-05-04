<template>
  <section class="Introduction">
    <div class="Introduction__background" role="presentation">
      <span v-for="i in backgroundSplitCount" :key="i" ref="block" class="Introduction__background-block" />
    </div>
    <div class="Introduction__inner">Loading{{ dotString }}</div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { TweenLite, Power3 as Quart } from 'gsap';

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
    if (this.intervalID) return;
    this.intervalID = setInterval(() => (this.dotCount = (this.dotCount + 1) % (maxDotCount + 1)), 1000);

    const transforms = this.$isMobile()
      ? ['translate3d(0, -100%, 0)', 'translate3d(0, 100%, 0)']
      : ['translate3d(-100% , 0,0)', 'translate3d(100%, 0, 0)'];
    this.tasks.forEach(promise =>
      promise.then(() => {
        this.finishedPromises += 1;
        if (this.finishedPromises === this.tasks.length) {
          const blocks = this.$refs.block as HTMLElement[];
          blocks.forEach((block, i) =>
            setTimeout(() => {
              TweenLite.fromTo(
                block,
                0.6,
                {
                  backgroundColor: '#f0f0f0',
                  transform: `translate3d(0, 0, 0)`,
                },
                {
                  backgroundColor: '#111',
                  transform: transforms[i % 2],
                  ease: Quart.easeInOut,
                },
              );
            }, Math.floor(Math.random() * 150)),
          );
          setTimeout(() => this.$emit('on-finished'), 1000);
          if (!this.intervalID) return;
          clearInterval(this.intervalID);
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
  z-index: nth($zLevels, 10);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: $colorBlack;
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
  background: $colorWhite;
}

.Introduction__background-block:first-child {
  $block-size: 12%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(2) {
  $block-size: 12%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(3) {
  $block-size: 2%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(4) {
  $block-size: 1%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(5) {
  $block-size: 9%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(6) {
  $block-size: 22%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(7) {
  $block-size: 2%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(8) {
  $block-size: 8%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(9) {
  $block-size: 12%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(10) {
  $block-size: 4%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:nth-child(11) {
  $block-size: 3%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__background-block:last-child {
  $block-size: 15%;

  width: $block-size;

  @include notSp {
    width: 100%;
    height: $block-size;
  }
}

.Introduction__inner {
  z-index: 1;
  transition: all 600ms $easeOutExpo;
}

.-loaded .Introduction__inner {
  opacity: 0;
}
</style>
