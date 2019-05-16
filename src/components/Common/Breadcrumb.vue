<!-- eslint-disable -->
<template>
  <nav class="Breadcrumb">
    <div class="Breadcrumb__inner">
      <ol class="List">
        <li class="Cell">
          <nuxt-link :to="`/`" class="Link">top</nuxt-link>
        </li>
        <li class="Cell">
          <nuxt-link :to="`/entries`" class="Link">entries</nuxt-link>
        </li>
        <li class="Cell">
          <span class="Current">entries</span>
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
  padding-top: 20vw;
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
  text-align: right;

  @include notSp {
    text-align: left;
  }
}

.List::before {
  content: '';
  z-index: 0;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, rgba($colorWhite, 0.8) 0%, rgba($colorWhite, 0) 80%);
  user-select: none;

  @include notSp {
    background: linear-gradient(to right, rgba($colorWhite, 0.8) 0%, rgba($colorWhite, 0) 80%);
  }
}

.Cell {
  position: relative;
  color: $colorBlack;
}

@include sp {
  .Cell + .Cell::after {
    content: '<';
    margin-left: 0.5em;
  }
}

@include notSp {
  .Cell + .Cell::before {
    content: '>';
    margin-right: 0.5em;
  }
}

.Cell:first-child {
  margin-right: 0.5em;

  @include notSp {
    margin-left: 0.5em;
    margin-right: auto;
  }
}

.Cell:nth-child(2) {
  margin-right: 0.5em;

  @include notSp {
    margin-left: 0.5em;
    margin-right: auto;
  }
}

.Cell:nth-child(3) {
  margin-right: 1em;

  @include notSp {
    margin-left: 1em;
    margin-right: auto;
  }
}

.Link {
  color: currentColor;
  font-style: italic;

  &,
  &:hover,
  &:active {
    text-decoration: none;
  }
}
</style>
