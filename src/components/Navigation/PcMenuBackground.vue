<!-- eslint-disable -->
<template>
  <div class="PcMenu__background" role="presentation">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.PcMenu__background {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue';

type Data = {};
type Methods = {};
type Computed = {};
type Props = {};

/* eslint-disable no-param-reassign */
function drawCanvas(context: CanvasRenderingContext2D, widthPx: number, heightPx: number) {
  context.fillStyle = 'hsla(0, 0%, 94.1%, .9)';

  let width = 0;
  let x = 0;
  while (x < widthPx) {
    x += width;
    width = Math.floor(Math.random() * 20) + 3;
    const height = (heightPx / 100) * (100 - Math.random() * Math.random() * 30);
    context.beginPath();
    context.rect(x, 0, width, height);
    context.fill();
  }
}
/* eslint-enable no-param-reassign */

export default Vue.extend<Data, Methods, Computed, Props>({
  mounted() {
    const { canvas } = this.$refs;
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    const widthPx = canvas.getBoundingClientRect().width * devicePixelRatio;
    const heightPx = canvas.getBoundingClientRect().height * devicePixelRatio;
    canvas.width = widthPx;
    canvas.height = heightPx;

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    drawCanvas(context, widthPx, heightPx);
  },
});
</script>
