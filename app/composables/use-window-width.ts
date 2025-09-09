export function useWindowWidth() {
  const width = ref(9999);

  function updateWidth() {
    const w = window.innerWidth;
    width.value = w;
  }

  onMounted(() => {
    width.value = window.innerWidth;
    window.addEventListener('resize', updateWidth);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth);
  });
  return width;
}