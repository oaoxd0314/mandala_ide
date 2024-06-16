<template>
  <div ref="space" class="space-container">
    <MandalaGrid :container="space" ref="childComponentRef" :grid="rootGrid" class="drag-element" />
    <MandalaGrid :container="space" ref="childComponentRef" :grid="rootGrid" class="drag-element" />
  </div>

  <ContextMenu v-if="showContextMenu" :closeMenu=hideMenu :menuPositions="menuPositions" :container="space"
    :items="contextMenuItems" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MandalaGrid from '@/components/MandalaGrid.vue';
import ContextMenu from '@/components/ContextMenu.vue'
import { useMandalaGridGrid } from '@/composables/useMandalaGrid'
import { contextMenuStore } from '@/stores/contextMenuStore';
import { storeToRefs } from 'pinia';
import { useContextMenu } from '@/composables/useContextMenu';

const { showContextMenu, menuPositions } = storeToRefs(contextMenuStore());
const { hideMenu } = useContextMenu();

const contextMenuItems = [
  { label: 'Option 1', action: () => console.log('Option 1 clicked') },
  { label: 'Option 2', action: () => console.log('Option 2 clicked') },
];

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