<script lang="ts" setup>
  type Props = {
    boxWidth?: number;
    boxHeight?: number;
    thickness?: string;
  };
  defineProps<Props>();
</script>

<template>
  <div class="component--grid__effect__wrapper">
    <div
      class="component--grid__effect"
      :style="{
        backgroundSize: `${boxWidth || 50}px ${boxHeight || 50}px`,
      }"
    ></div>
    <div class="component--grid__effect__overlay"></div>
  </div>
</template>

<style lang="scss" scoped>
  .component--grid__effect__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .component--grid__effect {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-image: 
        linear-gradient(to right, var(--border-layout) v-bind('thickness'), transparent 1px),
        linear-gradient(to bottom, var(--border-layout) v-bind('thickness'), transparent 1px);
      z-index: 1;
    }
    .component--grid__effect__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background: radial-gradient(circle, transparent -50%, var(--background) 100%);
      z-index: 2;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 150px;
        background: linear-gradient(to bottom, var(--background), transparent);
      }
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 150px;
        background: linear-gradient(to top, var(--background), transparent);
      }
    }
  }
</style>