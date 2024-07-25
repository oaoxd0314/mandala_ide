<template>
    <div
        ref="space"
        class="space-container"
    >
        <MandalaGrid
            v-for="gridComponent in gridComponentList"
            :key="gridComponent.grid.girdId"
            ref="childComponentRef"
            :container="space"
            :grid="gridComponent.grid"
            :grid-layout="gridComponent.layout"
            class="drag-element"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import MandalaGrid from '@/components/MandalaGrid.vue';
import { useMandalaGrid } from '@/composables/useMandalaGrid';
import { useGridComponentStore } from '@/stores/gridComponentStore';

const { gridComponentList } = storeToRefs(useGridComponentStore());
const { setInitGridData } = useMandalaGrid();
const childComponentRef = ref<HTMLElement | null>(null);
const space = ref<HTMLElement | null>(null);

onMounted(() => {
  if(gridComponentList.value.length === 0) {
    setInitGridData();
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