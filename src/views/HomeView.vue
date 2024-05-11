<template>
  <div class="space-container">
    <MandalaGrid ref="dragElement" :grid="rootGrid" @mousedown="handleMousedown" @mousemove="handleMouseMove"
      @mouseup="handleMouseUp" class="drag-element" :style="{ left: `${pivotX}px`, top: `${pivotY}px` }">
    </MandalaGrid>
  </div>

</template>

<script setup lang="ts">
import MandalaGrid from '@/components/MandalaGrid.vue';
import { useMandalaGridGrid } from '@/composables/useMandalaGrid'
import { useMouseControl } from '@/composables/useMouseControl'

import { watch, onMounted, ref } from 'vue';

const dragElement = ref<HTMLElement | null>(null);
const { rootGrid, findGridByNode } = useMandalaGridGrid();
const { locate, handleMouseMove, handleMouseUp, handleMousedown } = useMouseControl();

const elementOffset = ref({
  width: 0,
  height: 0
})

const pivotX = ref(0);
const pivotY = ref(0);

watch(locate.value, () => {
  pivotX.value = locate.value.x - (elementOffset.value.width / 2);
  pivotY.value = locate.value.y - (elementOffset.value.height / 2);
})


onMounted(() => {
  dragElement.value = document.querySelector('.drag-element');
  if (dragElement.value) {
    elementOffset.value = {
      width: dragElement.value.offsetWidth,
      height: dragElement.value.offsetHeight
    }
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