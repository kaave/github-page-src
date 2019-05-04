import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $isMobile: () => boolean;
  }
}

Vue.prototype.$isMobile = () => window.innerWidth < 768;
