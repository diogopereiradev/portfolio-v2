<script lang="ts" setup></script>

<template>
  <div class="page--home">
    <HomeHeader />
    <HomeAbout />
    <HomeProjects />
    <HomeSkills />
  </div>
</template>

<style lang="scss" scoped>
  .page--home {
    display: flex;
    flex-direction: column;
    gap: 8rem;
    padding-bottom: 4rem;
  }
</style>