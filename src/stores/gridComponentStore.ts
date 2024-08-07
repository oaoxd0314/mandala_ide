import { defineStore } from "pinia";
import { ref } from "vue";
import type { GridComponent } from '@/composables/useMandalaGrid';


export const useGridComponentStore = defineStore('mandalaGrid', () => {

    const gridComponentList = ref<GridComponent[]>([]);

    return {
        gridComponentList
    };
});