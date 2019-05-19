<template>
  <section class="Introduction">
    <div class="Introduction__background" role="presentation">
      <span v-for="i in backgroundSplitCount" :key="i" ref="block" class="Introduction__background-block" />
    </div>
    <div class="Introduction__inner" :hidden="isAllOver">
      <p class="Introduction__title">kaave.github.io</p>
      <div class="Introduction__wave-parent">
        <span class="Introduction__wave" role="presentation" />
        <span class="Introduction__wave" role="presentation" />
        <span class="Introduction__wave" role="presentation" />
        <span class="Introduction__wave" role="presentation" />
        <span class="Introduction__wave" role="presentation" />
        <p class="Introduction__message">now initializing.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { TweenLite, Power3 as Quart } from 'gsap';

type Data = { finishedPromises: number; isAllOver: boolean };
type Methods = {};
type Computed = { backgroundSplitCount: number };
type Props = { tasks: Promise<any>[] };

const defaultData: Data = { finishedPromises: 0, isAllOver: false };

const wait = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

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
    backgroundSplitCount(): number {
      return 12;
    },
  },
  async mounted() {
    const transforms = this.$isMobile()
      ? ['translate3d(0, -100%, 0)', 'translate3d(0, 100%, 0)']
      : ['translate3d(-100% , 0,0)', 'translate3d(100%, 0, 0)'];
    await Promise.all(this.tasks);
    this.isAllOver = true;
    await wait(100);
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

    await wait(1000);
    this.$emit('on-finished');
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

$block-sizes: 12%, 12%, 2%, 1%, 9%, 22%, 2%, 8%, 12%, 4%, 3%, 15%;

@for $i from 1 through length($block-sizes) {
  $block-size: nth($block-sizes, $i);

  .Introduction__background-block:nth-child(#{$i}) {
    width: $block-size;

    @include notSp {
      width: 100%;
      height: $block-size;
    }
  }
}

.-loaded .Introduction__background-block {
  animation: introduction-block 600ms $easeOutExpo;
}

@keyframes introduction-block {
  from {
    background: $colorWhite;
    opacity: 1;
  }

  50% {
    background: $colorBlack;
    opacity: 1;
  }

  to {
    background: $colorWhite;
    opacity: 0;
  }
}

.Introduction__inner {
  z-index: 1;
  display: block;
  font-size: 5.357vw;
  transition: opacity 400ms;

  $pc-font-size: 2;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.Introduction__inner[hidden] {
  opacity: 0;
}

.Introduction__title {
  letter-spacing: 0.4em;
  width: 100%;
  text-align: center;
}

.Introduction__wave-parent {
  position: relative;
  width: 30vw;
  max-width: 7em;
  margin: 3vw auto auto;
  overflow: hidden;

  @include notSp {
    margin-top: 0.8em;
  }
}

.Introduction__wave {
  display: block;
  width: 100%;
  height: 0.5vw;
  padding: 0;
  margin: 1px 0 0;
  background: rgba($colorBlack, 0.8);
  animation: wave-animation 1.2s $easeInOutQuart infinite;
  transform: translate3d(-100%, 0, 0);

  @include notSp {
    height: 2px;
  }
}

@for $i from 1 through 5 {
  .Introduction__wave:nth-child(#{$i}) {
    animation-delay: $i * 60ms;
  }
}

@keyframes wave-animation {
  from {
    transform: translate3d(-100%, 0, 0);
  }

  to {
    transform: translate3d(100%, 0, 0);
  }
}

.Introduction__message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  font-size: 0.6em;
  background: $colorWhite;
  white-space: nowrap;
}
</style>
