<template>
  <div class="space-container">
    <MandalaGrid :grid="rootGrid" />
  </div>

</template>

<script setup lang="ts">
import MandalaGrid from '@/components/MandalaGrid.vue';
import { useMandalaGridGrid } from '@/composables/useMandalaGrid'

const { rootGrid, findGridByNode } = useMandalaGridGrid();

console.log(rootGrid.value)

</script>

<style scoped>
.space-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>