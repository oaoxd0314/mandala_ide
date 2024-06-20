<template>
    <div
        ref="space"
        class="space-container"
    >
        <MandalaGrid
            v-for="grid in gridList"
            :key="grid.uid"
            ref="childComponentRef"
            :container="space"
            :grid="grid"
            class="drag-element"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import MandalaGrid from '@/components/MandalaGrid.vue';
import { useMandalaGrid } from '@/composables/useMandalaGrid';
import { useMandalaGridStore } from '@/stores/mandalaGridStore';

const { gridList } = storeToRefs(useMandalaGridStore());
const { setInitGridData } = useMandalaGrid();
const childComponentRef = ref<HTMLElement | null>(null);
const space = ref<HTMLElement | null>(null);

onMounted(() => {
  setInitGridData();
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