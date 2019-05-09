<!-- eslint-disable -->
<template>
  <section class="Background" role="presentation">
    <div class="Background__inner" :style="carouselStyle">
      <distortion-carousel
        class="Background__carousel"
        :index="index"
        :image-urls="imageUrls"
        distortion-texture-url="/images/texture.jpg"
        :max-width="10000"
        :ratio="{ width: 16, height: 9 }"
        :move-threshold="0.3"
        :duration-sec="1.2"
        :easing="easing"
      />
    </div>
    <div class="Background__block" />
    <div class="Background__block" />
  </section>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Background {
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: #000c;
  }
}

.Background__inner {
  z-index: 0;
  position: relative;
  display: block;
  width: 100%;

  &::before {
    content: '';
    position: relative;
    display: block;
    width: 100%;
    height: 0%;
    padding-top: 100% / 16 * 9;
  }
}

.Background__carousel {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.Background__block {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
  background: #f003;
  animation: background-block-move 20s infinite alternate ease-in-out;

  &:last-of-type {
    background: #0f03;
    animation-delay: 8s;
  }
}

@keyframes background-block-move {
  from {
    transform: translate3d(-30%, 0, 0);
  }

  to {
    transform: translate3d(30%, 0, 0);
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Ease, Power3 as Quart } from 'gsap';
import debounce from 'lodash/debounce';

import DistortionCarousel from '@kaave/vue-disortion-carousel';

type CarouselStyle = { width: string; height: string; transform?: string };

type Data = {
  index: number;
  carouselWidth: number;
  carouselHeight: number;
  carouselTransform: string;
};
type Methods = { fitCanvas: () => void };
type Computed = {
  imageUrls: string[];
  easing: Ease;
  carouselStyle: CarouselStyle;
};
type Props = {};

const defaultData: Data = {
  index: 0,
  carouselWidth: (typeof window !== 'undefined' && window.innerWidth) || 0,
  carouselHeight: (typeof window !== 'undefined' && window.innerHeight) || 0,
  carouselTransform: '',
};
const components = { DistortionCarousel };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  data() {
    return { ...defaultData };
  },
  computed: {
    imageUrls() {
      return ['/images/d1.jpg', '/images/d2.jpg', '/images/d3.jpg'];
    },
    easing() {
      return Quart.easeInOut;
    },
    carouselStyle() {
      const result: CarouselStyle = {
        width: `${this.carouselWidth}px`,
        height: `${this.carouselHeight}px`,
      };

      if (this.carouselTransform) {
        result.transform = this.carouselTransform;
      }

      return result;
    },
  },
  mounted() {
    setInterval(() => (this.index = (this.index + 1) % this.imageUrls.length), 3000);
    window.addEventListener('resize', debounce(this.fitCanvas.bind(this), 200));
    this.fitCanvas();
  },
  methods: {
    fitCanvas() {
      const horizontalRate = 16;
      const verticalRate = 9;
      const rulerRate = horizontalRate / verticalRate;
      const currentRate = window.innerWidth / window.innerHeight;

      if (rulerRate > currentRate) {
        // 縦を合わせて、transformXで中央に持ってくる
        this.carouselWidth = (window.innerHeight * horizontalRate) / verticalRate;
        this.carouselHeight = window.innerHeight;
        this.carouselTransform = `translateX(-${(this.carouselWidth - window.innerWidth) / 2}px)`;
      } else {
        // 横を合わせて、transformYで中央に持ってくる
        this.carouselWidth = window.innerWidth;
        this.carouselHeight = (window.innerWidth * verticalRate) / horizontalRate;
        this.carouselTransform = `translateY(-${(this.carouselHeight - window.innerHeight) / 2}px)`;
      }
    },
  },
});
</script>
