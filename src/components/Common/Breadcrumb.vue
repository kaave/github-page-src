<!-- eslint-disable -->
<template functional>
  <nav class="Breadcrumb">
    <div class="Breadcrumb__inner">
      <ol class="List">
        <li v-for="{ to, desc } in props.routes || []" :key="to" class="Cell">
          <nuxt-link v-if="to" :to="to" class="Link">{{ desc }}</nuxt-link>
          <span v-else class="Current">{{ desc }}</span>
        </li>
      </ol>
    </div>
  </nav>
</template>
<!-- eslint-enable -->

<style lang="scss" scoped>
.Breadcrumb {
  z-index: 1;
  position: relative;
  width: 100%;
  padding-top: 5vw;
  font-size: 3.75vw;

  $pc-font-size: 1.6;
  @include notSp {
    @include responsiveFontSize($pc-font-size);
    padding-top: 5rem;
  }

  @include maxSize {
    font-size: $pc-font-size + rem;
  }
}

.Breadcrumb__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0 $horizontalPaddingSp;

  @include notSp {
    max-width: $maxWidth;
    padding: 0 $horizontalPadding;
    margin: auto;
  }
}

.List {
  position: relative;
  width: 100%;
  padding: 0.3em;
}

.Cell {
  position: relative;
  color: $colorBlack;
}

.Cell + .Cell > *::before {
  content: '>';
  padding-right: 0.5em;
}

.Cell > * {
  display: inline-block;
  padding: 0 0.5em;
  line-height: 1;
  color: currentColor;
  background: rgba($colorWhite, 0.8);
}

.Cell:nth-child(2) > * {
  margin-left: 0.5em;
}

.Cell:nth-child(3) > * {
  margin-left: 1em;
}

.Link {
  font-style: italic;

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }
}
</style>

<script lang="ts">
export type Route = { to?: string; desc: string };
export default {};
</script>
