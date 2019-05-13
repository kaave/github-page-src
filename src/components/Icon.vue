<!-- eslint-disable -->
<template>
  <component class="icon" :class="`-${iconKey}`" :is="`icon-${iconKey}`"></component>
</template>
<!-- eslint-enable -->

<script lang="ts">
import Vue from 'vue';

import IconFacebook from './Svg/IconFacebook.vue';
import IconGithub from './Svg/IconGithub.vue';
import IconTwitter from './Svg/IconTwitter.vue';
import IconWantedly from './Svg/IconWantedly.vue';

type Data = {};
type Methods = {};
type Computed = {};
type Props = { iconKey: string };

const defaultData: Data = {};

const components = { IconFacebook, IconGithub, IconTwitter, IconWantedly };

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  props: { iconKey: { type: String, default: 'facebook' } },
});
</script>

<style lang="scss" scoped>
.SNS__icon {
  width: 1.2em;
  height: 1.2em;

  &.-twitter {
    fill: #1da1f2;
  }

  &.-facebook {
    fill: #3b5998;
  }

  &.-github {
    fill: currentColor;
  }

  &.-wantedly {
    fill: #01a4bb;
  }
}
</style>
