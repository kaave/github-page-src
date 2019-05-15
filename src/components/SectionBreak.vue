<template functional>
  <hr class="SectionBreak" />
</template>

<style lang="scss" scoped>
.SectionBreak {
  border: 0;
  padding: 0;
  margin: 15vw auto;
  width: 30vw;
  height: 1px;
  background: rgba($colorWhite, 0.8);

  @include notSp {
    margin: 50px auto;
    max-width: 200px;
  }
}
</style>
