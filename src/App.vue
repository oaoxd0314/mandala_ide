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

const { hideMenu, showMenu } = useContextMenu();
const { showContextMenu, menuPositions } = storeToRefs(useContextMenuStore());
const { focusId } = storeToRefs(useElementFocusStore());
const { contextMenuItems } = useContextMenu();


/**
 * TODO: handle node focus element 
 */
const menuToggle = (e: MouseEvent) => {
  e.preventDefault();


  if (focusId.value) {
    console.log('focusId', focusId.value);
  }

  if (showContextMenu.value && e.button === 0 || focusId.value) {
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
