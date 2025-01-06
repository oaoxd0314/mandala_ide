import { storeToRefs } from 'pinia';
import { useContextMenuStore } from '@/stores/contextMenuStore';
import { useGridComponentStore } from '@/stores/gridComponentStore';
import { useMandalaGrid } from '@/composables/useMandalaGrid';
import { MandalaGrid } from '@/core/MandalaGrid';
import { computed } from 'vue';
import { useElementFocusStore } from '@/stores/elementFocusStore';




export const useContextMenu = () => {
    const { showContextMenu, menuPositions } = storeToRefs(useContextMenuStore());
    const gridComponentStore = useGridComponentStore();
    const { focusId } = storeToRefs(useElementFocusStore());
    const { createGridComponent } = useMandalaGrid();
    const contextMenuItems = computed(()=>{
        if(isNode(focusId.value)){
            return [
                { label: 'Node Actions', action: (e:MouseEvent) => {console.log(e,'node actions');} }
            ];
        }
        return mainMenuItems;
    }); 

    const isNode = (id?:string) => {
        return Boolean(id);
    };

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


    const mainMenuItems = [
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

    return {
        contextMenuItems,
        showMenu,
        hideMenu,
    };
};