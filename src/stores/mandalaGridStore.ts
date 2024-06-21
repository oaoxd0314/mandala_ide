import { defineStore } from "pinia";
import { ref } from "vue";
import type { MandalaGridComponent } from '@/composables/useMandalaGrid';


export const useMandalaGridStore = defineStore('mandalaGrid', () => {

    const gridComponentList = ref<MandalaGridComponent[]>([]);

    return {
        gridComponentList
    };
});