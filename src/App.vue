<template>
    <main @contextmenu="menuToggle">
        <!-- side menu -->
        <div>
            <button class="side-menu">
                |||
            </button>
        </div>


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
import { contextMenuStore } from '@/stores/contextMenuStore';
import { storeToRefs } from 'pinia';
const { hideMenu, showMenu } = useContextMenu();
const { showContextMenu, menuPositions } = storeToRefs(contextMenuStore());

const contextMenuItems = [
  { label: 'Create New Grid', action: () => console.log('Option 1 clicked') },
  { label: 'Option 2', action: () => console.log('Option 2 clicked') },
];

const menuToggle = (e: MouseEvent) => {
  e.preventDefault();

  if (showContextMenu.value && e.button === 0) {
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
