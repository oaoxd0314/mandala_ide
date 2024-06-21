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
import { useElementFocusStore } from './stores/elementFocusStore';
import { useMandalaGrid } from './composables/useMandalaGrid';
const { hideMenu, showMenu } = useContextMenu();
const { showContextMenu, menuPositions } = storeToRefs(useContextMenuStore());
const { focusElement } = storeToRefs(useElementFocusStore());
const { appendNewGrid } = useMandalaGrid();

const contextMenuItems = [
  { label: 'Create New Grid', action: (e:MouseEvent)=>{
    appendNewGrid({top: e.clientY, left: e.clientX});
  }},
];

const menuToggle = (e: MouseEvent) => {
  e.preventDefault();

  // it's mean , if focusElement exist then 
  // 1. reset menu 
  // 2. don't care following code
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
