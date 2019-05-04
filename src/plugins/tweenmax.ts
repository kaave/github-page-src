import Vue from 'vue';
import { TweenLite } from 'gsap';

declare module 'vue/types/vue' {
  interface Vue {
    $tweenLite: TweenLite;
  }
}

Vue.prototype.$tweenLite = TweenLite;
