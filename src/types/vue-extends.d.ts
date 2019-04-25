/* eslint-disable import/no-extraneous-dependencies */

// https://github.com/Akryum/vue-apollo/issues/54#issuecomment-302824058

import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $apollo: any;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    apollo?: any;
  }
}
