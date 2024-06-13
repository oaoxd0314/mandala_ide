<template>
  <div ref="space" class="space-container">
    <MandalaGrid :container="space" ref="childComponentRef" :grid="rootGrid" class="drag-element" />
  </div>
</template>

<script setup lang="ts">
import MandalaGrid from '@/components/MandalaGrid.vue';
import { useMandalaGridGrid } from '@/composables/useMandalaGrid'
import { ref } from 'vue';

const { rootGrid } = useMandalaGridGrid();
const childComponentRef = ref<HTMLElement | null>(null);
const space = ref<HTMLElement | null>(null);

</script>

<style scoped>
.space-container {
  overflow: hidden;
  height: 100vh;
}

.drag-element {
  position: absolute;
}
</style>