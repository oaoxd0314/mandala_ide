import { defineStore } from "pinia";
import { ref } from "vue";

export const useContextMenuStore = defineStore('contextMenu', () => {
    const showContextMenu = ref(false);
    const menuPositions = ref({ x: 0, y: 0 });

    return {
        showContextMenu,
        menuPositions
    };
});