<template>
    <main @contextmenu="menuToggle">
        <RouterView />

        <!-- global popup -->
        <ContextMenu
            v-if="showContextMenu"
            :close-menu="hideMenu"
            :menu-positions="menuPositions"
            :items="contextMenuItems"
        />
    </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import ContextMenu from '@/components/ContextMenu.vue';
import { useContextMenu } from '@/composables/useContextMenu';
import { useContextMenuStore } from '@/stores/contextMenuStore';
import { storeToRefs } from 'pinia';
import { useElementFocusStore } from '@/stores/elementFocusStore';
import { useGridComponentStore } from '@/stores/gridComponentStore';
import { useMandalaGrid } from '@/composables/useMandalaGrid';
import { MandalaGrid } from '@/core/MandalaGrid';
const { hideMenu, showMenu } = useContextMenu();
const { showContextMenu, menuPositions } = storeToRefs(useContextMenuStore());
const { focusElement } = storeToRefs(useElementFocusStore());
const gridComponentStore = useGridComponentStore();
const { createGridComponent } = useMandalaGrid();

const contextMenuItems = [
  { 
    label: 'Create New Grid', 
    action: (e:MouseEvent)=> appendNewGridComponent(e)
  },
];

const appendNewGridComponent = (e: MouseEvent) => {
  const layout = { top: e.clientY, left: e.clientX };
  const newGrid = new MandalaGrid('Exploratory');  

  const newGridComponent = createGridComponent(newGrid, layout);
  gridComponentStore.gridComponentList.push(newGridComponent);
};

/**
 * TODO: handle node focus element 
 */
const menuToggle = (e: MouseEvent) => {
  e.preventDefault();

  console.log('focusElement', focusElement.value,e);

  if (focusElement.value) {
    hideMenu();
    return;
  }

  if (showContextMenu.value && e.button === 0 || focusElement.value) {
    hideMenu();
    return;
  }

  showMenu(e.clientX, e.clientY);
};
</script>

<style scoped>
main {
  height: 100vh;
  position: relative;
}

.side-menu {
  margin: 16px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
