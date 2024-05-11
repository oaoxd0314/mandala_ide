<template>
  <div ref="space" class="space-container">
    <MandalaGrid ref="childComponentRef" :grid="rootGrid" @mousedown="(e) => handleMousedown(e, gridElement)"
      @mousemove="handleMouseMove" @mouseup="handleMouseUp" class="drag-element"
      :style="{ left: `${locate.x}px`, top: `${locate.y}px` }">
    </MandalaGrid>
  </div>

</template>

<script setup lang="ts">
import MandalaGrid from '@/components/MandalaGrid.vue';
import { useMandalaGridGrid } from '@/composables/useMandalaGrid'
import { useMouseDrag } from '@/composables/useMouseDrag'
import type { MandalaGridRef } from '@/components/interfaces/MandalaGrid'
import { computed, onMounted, ref } from 'vue';

const { rootGrid } = useMandalaGridGrid();
const { locate, handleMouseMove, handleMouseUp, handleMousedown, setInitLocate } = useMouseDrag();
const childComponentRef = ref<MandalaGridRef | null>(null);
const space = ref<HTMLElement | null>(null);

const gridElement = computed<HTMLElement | null>(() => {
  return childComponentRef.value?.gridElement ?? null;
});

onMounted(() => {
  if (space.value && gridElement.value) {
    const elOffsetWidth = gridElement.value.offsetWidth ?? 0;
    const elOffsetHeight = gridElement.value.offsetHeight ?? 0;
    const top = (space.value.clientHeight - elOffsetHeight) / 2
    const left = (space.value.clientWidth - elOffsetWidth) / 2

    setInitLocate(top, left);
  }
});

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