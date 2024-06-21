import { storeToRefs } from 'pinia';
import { useContextMenuStore } from '@/stores/contextMenuStore';

export const useContextMenu = () => {
    const { showContextMenu, menuPositions } = storeToRefs(useContextMenuStore());

    const showMenu = (x: number, y: number) => {
        showContextMenu.value = true;
        menuPositions.value = {
            x: x,
            y: y
        };
    };

    const hideMenu = () => {
        menuPositions.value = { x: 0, y: 0 };
        showContextMenu.value = false;
    };

    return {
        showMenu,
        hideMenu,
    };
};