<!-- eslint-disable -->
<template>
  <div>
    <breadcrumb :routes="routes" />
    <main id="main" class="Main" role="main">
      <content-section
        class="About"
        title="about kaave.github.io"
        :desc="[
          `安部亨佑 a.k.a. kaaveによるWebサイト。
    主にWeb技術ネタをつらつらと思いつくままに。
    というより、当サイト自体が僕の実験場であります。`,
        ]"
      />
      <section-break />
      <content-section
        class="HowToCreate"
        title="how to create"
        :desc="[`nuxtを基盤に、GraphCMSで動的コンテンツつくってます。そのうちもうちょい書きます。`]"
      />
      <section-break />
      <content-section
        class="Profile"
        title="profile"
        :desc="[
          `アラフォーのソフトウェアエンジニアです。愛知県在住。静岡県出身。男性。異性愛者。身長181cm、体重68kg。`,
          `06年中小開発屋へ就職し業界入り。30前後までボサッと働いた後、Web系の案件に割り当てられ真面目化。
      下積みが長かったのでWeb系ソフトウェアエンジニアがやれることは一通りまぁなんとなくできますが、
      フロントエンドのことを考えているときが一番盛り上がります。
      この界隈はなんというかいつまでもインディー感がありますよね。`,
          `趣味は音楽鑑賞、自転車、健康法全般、筋トレ(自重)など。
      サッカー観戦も好きですが入れ込みすぎて脳汁大量分泌からの睡眠障害、体調不良を引き起こす危険なコンテンツなのでできるだけ触れないようにしています。
      贔屓のチームはアーセナルとジュビロ磐田。`,
        ]"
      />
    </main>
  </div>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Main {
  z-index: 1;
  position: relative;
  padding-top: 10vw;

  @include notSp {
    padding-top: 5rem;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, MutationMethod } from 'vuex';

import ContentSection from '~/components/About/ContentSection.vue';
import SectionBreak from '~/components/SectionBreak.vue';
import Breadcrumb, { Route } from '~/components/Common/Breadcrumb.vue';
import { getHead } from '~/common/getHead';

type Data = {};
type Methods = {};
type Computed = { routes: Route[] };
type Props = {};

const defaultData: Data = {};

const components = { ContentSection, SectionBreak, Breadcrumb };
const head = () =>
  getHead({
    title: { content: 'about | ' },
    description: { content: 'このページは当サイトの概要を説明しています。' },
  });

export default Vue.extend<Data, Methods, Computed, Props>({
  components,
  head,
  data() {
    return { ...defaultData };
  },
  computed: {
    routes() {
      return [{ to: '/', desc: 'Top' }, { desc: 'about' }];
    },
  },
});
</script>
