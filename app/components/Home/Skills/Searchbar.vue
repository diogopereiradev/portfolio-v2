<script lang="ts" setup>
  const emit = defineEmits<{
    (e: 'update:search', value: string): void
  }>();

  const value = ref('');

  watch(value, (newValue) => {
    emit('update:search', newValue);
  });
</script>

<template>
  <div class="component--searchbar">
    <Icon name="iconamoon:search-light" size="20" class="searchbar__icon" />
    <input
      v-model="value"
      type="text"
      :placeholder="$t('skills.searchbar.placeholder')"
      class="searchbar__input"
    />
  </div>
</template>

<style lang="scss" scoped>
  .component--searchbar {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--text);
    width: 100%;
    .searchbar__icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
    input {
      padding: 0 1rem 0 3rem;
      width: 100%;
      height: 3rem;
      border-radius: var(--radius);
      border: 1px solid var(--border-layout-o4);
      background-color: var(--background);
      color: var(--text-2);
      font-size: .875rem;
      font-weight: 500;
      outline: none;
      transition: .2s;
      &::placeholder {
        color: var(--text-4);
        font-size: .875rem;
        font-weight: 500;
      }
      &:focus-visible {
        border: 1px solid var(--primary);
      }
    }
  }
</style>