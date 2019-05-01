/* eslint-disable import/no-extraneous-dependencies */

// https://github.com/Akryum/vue-apollo/issues/54#issuecomment-302824058

import Vue from 'vue';
import MarkdownIt from 'markdown-it';

declare module 'vue/types/vue' {
  interface Vue {
    $apollo: any;
    $md: MarkdownIt;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    apollo?: {
      [key: string]: {
        query: string;
      };
    };
  }
}
