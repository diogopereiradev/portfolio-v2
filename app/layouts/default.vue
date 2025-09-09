<template>
  <div class="layout--default">
    <Navbar />
    <div class="layout__page">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .layout--default {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .layout__page {
      flex: 1;
    }
  }
</style>