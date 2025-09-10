<script lang="ts" setup>
</script>

<template>
  <div class="component--projects">
    <div class="grid__container">
      <GridEffect thickness="1px" :box-width="60" :box-height="60" />
    </div> 
  </div>
</template>

<style lang="scss" scoped>
  .component--projects {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    @media screen and (max-width: 640px) {
      gap: 2.5rem;
    }
    .grid__container {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      width: 2568px;
      height: 600px;
      margin: 0 auto;
      overflow: hidden;
      z-index: 0;
      @media screen and (max-width: 2570px) {
        width: 100vw;
      }
      @media screen and (max-width: 900px) {
        height: unset;
        overflow: unset;
      }
    }
  }
</style>