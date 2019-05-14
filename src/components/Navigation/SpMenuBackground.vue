<!-- eslint-disable -->
<template>
  <div class="SpMenu__background" role="presentation">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.SpMenu__background {
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

  let height = 0;
  let y = 0;
  while (y < heightPx) {
    y += height;
    height = Math.floor(Math.random() * 30) + 3;
    const width = (widthPx / 100) * (100 - Math.random() * Math.random() * 30);

    context.beginPath();
    context.rect(0, y, width, height);
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
